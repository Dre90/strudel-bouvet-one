// Setliste: spiller låter etter hverandre med myk overgang.
// Varighet per låt leses fra `// @minutes N` i pattern-fila (ellers defaultMinutes).

const setlistModules = import.meta.glob("../setlists/*.json", {
  eager: true,
  import: "default",
});

export const setlists = Object.fromEntries(
  Object.entries(setlistModules)
    .map(([path, data]) => {
      const id = path.match(/\/([^/]+)\.json$/)[1];
      return [
        id,
        {
          id,
          name: data.name ?? id,
          crossfadeSeconds: 6,
          defaultMinutes: 5,
          ...data,
        },
      ];
    })
    .sort(([a], [b]) => a.localeCompare(b)),
);

const masterGain = () =>
  globalThis.getSuperdoughAudioController?.().output?.destinationGain?.gain;
const ctx = () => globalThis.getAudioContext?.();

// Fader master-volumet. Brukes både til overganger i setlista og til å kutte haler ved Stopp.
export function fadeMaster(to, seconds) {
  const g = masterGain();
  const ac = ctx();
  if (!g || !ac) return Promise.resolve();
  const now = ac.currentTime;
  g.cancelScheduledValues(now);
  g.setValueAtTime(Math.max(g.value, 0.0001), now);
  g.exponentialRampToValueAtTime(Math.max(to, 0.0001), now + seconds);
  return new Promise((r) => setTimeout(r, seconds * 1000));
}

export function createSetlist({ loadCode, switchTo, onStatus }) {
  let active = false;
  let index = -1;
  let songTimer;
  let tickTimer;
  let songEndsAt = 0;
  let setlist = Object.values(setlists)[0];
  let songs = setlist?.songs ?? [];
  let run = 0; // økes ved stop/next/select så pågående async-kjeder avbrytes

  const fade = fadeMaster;

  function clearTimers() {
    clearTimeout(songTimer);
    clearInterval(tickTimer);
  }

  async function minutesFor(name) {
    const code = await loadCode(name);
    const m = code.match(/^\/\/\s*@minutes\s+([\d.]+)/m);
    return m ? parseFloat(m[1]) : setlist.defaultMinutes;
  }

  function remaining() {
    return Math.max(0, Math.round((songEndsAt - Date.now()) / 1000));
  }

  function tick() {
    const next = songs[(index + 1) % songs.length];
    const s = remaining();
    onStatus(
      `${setlist.name} ${index + 1}/${songs.length}: ${songs[index]} · ${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} igjen · neste: ${next}`,
    );
  }

  async function playIndex(i, { fadeIn = true } = {}) {
    const myRun = run;
    index = i % songs.length;
    const name = songs[index];
    await switchTo(name);
    if (myRun !== run) return;
    if (fadeIn) await fade(1, setlist.crossfadeSeconds / 2);
    const minutes = await minutesFor(name);
    if (myRun !== run) return;
    songEndsAt = Date.now() + minutes * 60_000;
    clearTimers();
    songTimer = setTimeout(
      advance,
      minutes * 60_000 - (setlist.crossfadeSeconds / 2) * 1000,
    );
    tickTimer = setInterval(tick, 1000);
    tick();
  }

  async function advance() {
    if (!active) return;
    const myRun = ++run;
    clearTimers();
    await fade(0, setlist.crossfadeSeconds / 2);
    if (myRun !== run || !active) return;
    await playIndex(index + 1);
  }

  return {
    get active() {
      return active;
    },
    get current() {
      return setlist;
    },
    select(id) {
      if (!setlists[id]) return;
      run++;
      setlist = setlists[id];
      songs = setlist.songs;
    },
    async start() {
      if (!songs.length) return;
      run++;
      active = true;
      fadeMaster(1, 0.1);
      await playIndex(0, { fadeIn: false });
    },
    async next() {
      if (active) await advance();
    },
    stop() {
      active = false;
      run++;
      clearTimers();
    },
  };
}
