import "@strudel/repl";
import { createSetlist, setlists, fadeMaster } from "./setlist.js";
import { createVisualizer } from "./visualizer.js";

// Alle patterns lastes som rå tekst, slik at fila ser ut nøyaktig som på strudel.cc.
const patternModules = import.meta.glob("../patterns/*.js", {
  query: "?raw",
  import: "default",
});

const toggleBtn = document.getElementById("toggle");
const select = document.getElementById("pattern");
const setlistBtn = document.getElementById("setlist");
const setlistSelect = document.getElementById("setlist-select");
const nextBtn = document.getElementById("next");
const statusEl = document.getElementById("status");
const errorEl = document.getElementById("error");
const replHost = document.getElementById("repl");

const names = Object.keys(patternModules)
  .map((p) => p.match(/\/([^/]+)\.js$/)[1])
  .sort();

for (const name of names) {
  const opt = document.createElement("option");
  opt.value = name;
  opt.textContent = name;
  select.append(opt);
}

function currentName() {
  const fromHash = decodeURIComponent(location.hash.slice(1));
  return names.includes(fromHash) ? fromHash : names[0];
}

async function loadCode(name) {
  const loader = patternModules[`../patterns/${name}.js`];
  return loader ? await loader() : "";
}

const repl = document.createElement("strudel-editor");
repl.setAttribute("code", await loadCode(currentName()));
replHost.append(repl);
select.value = currentName();

const editor = () => repl.editor;
let playing = false;
let audioReady;

// Strudel laster AudioWorklets (crush, supersaw, tremolo …) først ved mousedown, og asynkront.
// Vi gjør det eksplisitt så første evaluering (også via Cmd+Enter) ikke går før de er klare.
// initAudio blir global etter prebake (evalScope av @strudel/webaudio).
function ensureAudio() {
  audioReady ??= (async () => {
    await editor()?.prebaked;
    await globalThis.initAudio?.();
  })();
  return audioReady;
}

function setStatus(text) {
  statusEl.textContent = text;
}

function showError(err) {
  if (!err) {
    errorEl.hidden = true;
    errorEl.textContent = "";
    return;
  }
  errorEl.hidden = false;
  errorEl.textContent = String(err?.message ?? err);
}

async function evaluateCurrent() {
  const ed = editor();
  if (!ed) return;
  setStatus("Laster lyd …");
  await ensureAudio();
  fadeMaster(1, 0.1);
  await ed.evaluate();
  // evaluate() kaster ikke; feilen ligger i repl-state. Forrige gyldige pattern spiller videre.
  const err = ed.repl?.state?.evalError;
  if (err) {
    showError(err);
    setStatus(`Feil i ${currentName()} – forrige versjon spiller videre`);
  } else {
    showError(null);
    setStatus(`Spiller: ${currentName()} – ${new Date().toLocaleTimeString()}`);
  }
}

// Kjøretidsfeil (f.eks. sample som ikke er lastet enda) rapporteres via Strudels logger, ikke evaluate().
// Disse er ofte forbigående, så de skjules igjen etter litt.
let runtimeErrorTimer;
document.addEventListener("strudel.log", (e) => {
  const { message, type } = e.detail ?? {};
  if (type !== "error" && !/error/i.test(message ?? "")) return;
  showError(message);
  clearTimeout(runtimeErrorTimer);
  runtimeErrorTimer = setTimeout(() => showError(null), 5000);
});

let suppressHashHandler = false;

async function switchTo(name) {
  const ed = editor();
  if (!ed) return;
  if (currentName() !== name) {
    suppressHashHandler = true;
    location.hash = name;
    select.value = name;
  }
  ed.setCode(await loadCode(name));
  if (playing) await evaluateCurrent();
  else setStatus(`Lastet: ${name}`);
}

function setPlayingUI(on) {
  playing = on;
  toggleBtn.textContent = on ? "■ Stopp" : "▶ Start";
  toggleBtn.classList.toggle("playing", on);
}

const setlist = createSetlist({ loadCode, switchTo, onStatus: setStatus });

for (const { id, name, songs } of Object.values(setlists)) {
  const opt = document.createElement("option");
  opt.value = id;
  opt.textContent = `${name} (${songs.length})`;
  setlistSelect.append(opt);
}
setlistSelect.value = setlist.current?.id ?? "";
setlistSelect.addEventListener("change", () => {
  const wasActive = setlist.active;
  if (wasActive) stopSetlist();
  setlist.select(setlistSelect.value);
  if (wasActive) startSetlist();
  else setStatus(`Setliste valgt: ${setlist.current.name}`);
});

async function startSetlist() {
  setPlayingUI(true);
  setlistBtn.classList.add("active");
  setlistBtn.textContent = "■ Stopp setliste";
  nextBtn.hidden = false;
  await setlist.start();
}

function stopSetlist() {
  setlist.stop();
  setlistBtn.classList.remove("active");
  setlistBtn.textContent = "▶ Spill setliste";
  nextBtn.hidden = true;
}

setlistBtn.addEventListener("click", () => {
  if (setlist.active) {
    stopSetlist();
    fadeMaster(1, 0.3);
    setStatus(`Setliste av – spiller ${currentName()}`);
  } else {
    startSetlist();
  }
});

nextBtn.addEventListener("click", () => setlist.next());

// --- Visualizer ------------------------------------------------------------

const vizWrap = document.getElementById("viz-wrap");
const viz = createVisualizer(document.getElementById("viz"), {
  onIdle: (idle) => vizWrap.classList.toggle("idle", idle),
});
const vizModeBtn = document.getElementById("viz-mode");
const vizToggleBtn = document.getElementById("viz-toggle");

vizModeBtn.addEventListener("click", () => {
  viz.next();
  vizModeBtn.textContent = `✨ ${viz.modeName}`;
});
setInterval(() => (vizModeBtn.textContent = `✨ ${viz.modeName}`), 1000);

vizToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("viz-hidden");
  localStorage.setItem(
    "viz-hidden",
    document.body.classList.contains("viz-hidden"),
  );
});
if (localStorage.getItem("viz-hidden") === "true")
  document.body.classList.add("viz-hidden");

// Stopp planleggingen og fade master ned, så lange samples og reverb-haler ikke henger igjen.
function stopAll() {
  stopSetlist();
  editor()?.stop();
  fadeMaster(0, 0.5);
  setPlayingUI(false);
  setStatus("Stoppet");
}

toggleBtn.addEventListener("click", async () => {
  const ed = editor();
  if (!ed) return;
  if (playing) {
    stopAll();
  } else {
    setPlayingUI(true);
    await evaluateCurrent();
  }
});

select.addEventListener("change", () => {
  location.hash = select.value;
});

window.addEventListener("hashchange", () => {
  if (suppressHashHandler) {
    suppressHashHandler = false;
    return;
  }
  // Manuelt bytte avbryter setlista
  if (setlist.active) stopSetlist();
  select.value = currentName();
  switchTo(currentName());
});

document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
    e.preventDefault();
    setPlayingUI(true);
    evaluateCurrent();
  }
  if ((e.metaKey || e.ctrlKey) && e.key === ".") {
    e.preventDefault();
    stopAll();
  }
});

// Når en pattern-fil lagres i VS Code: oppdater editoren og re-evaluer uten page reload.
// (Vite-pluginen i vite.config.js sender denne hendelsen i stedet for vanlig HMR.)
if (import.meta.hot) {
  import.meta.hot.on("strudel:pattern-changed", async ({ name, code }) => {
    if (name !== currentName()) return;
    editor()?.setCode(code);
    if (playing) await evaluateCurrent();
    else setStatus(`Oppdatert: ${name}`);
  });
}
