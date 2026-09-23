// @title Låtstruktur-eksempel
// @by deg
// 124 BPM, A-moll. Akkorder: Am7 – Fmaj7 – C^7 – G (vi–IV–I–V)
// Viser hvordan lag legges i const og settes sammen med arrange().

setcps(124 / 60 / 4);

// --- Lag ---------------------------------------------------------------

const kick = s("bd*4").bank("RolandTR909").gain(1.0);

const clap = s("~ cp ~ cp").bank("RolandTR909").gain(0.8).room(0.2);

const hats = s("[~ hh]*4, ~ oh ~ oh")
  .bank("RolandTR909")
  .gain(0.5)
  .hpf(4000)
  .pan(0.6)
  .every(4, (x) => x.fast(2));

const bass = n("<0 -2 2 -1>") // grunntoner: A F C G i A-moll
  .scale("A1:minor")
  .struct("~ x ~ x")
  .s("gm_synth_bass_1")
  .lpf(600)
  .clip(0.8)
  .gain(0.8);

const keys = chord("<Am7 F^7 C^7 G>")
  .voicing()
  .struct("~ x ~ x")
  .s("gm_epiano1")
  .clip(0.4)
  .hpf(200)
  .room(0.5)
  .gain(0.45);

const pad = chord("<Am7 F^7 C^7 G>")
  .voicing()
  .s("gm_pad_warm")
  .attack(0.5)
  .release(1)
  .hpf(300)
  .lpf(sine.range(600, 2500).slow(16))
  .room(0.8)
  .size(0.8)
  .gain(0.35);

const lead = n("<0 2 4 2> ~ <7 4> [~ 5]")
  .scale("A4:minor")
  .s("gm_lead_6_voice")
  .off(1 / 8, (x) => x.add(note(7)).gain(0.4))
  .sometimes((x) => x.ply(2))
  .delay(0.3)
  .delaytime(0.375)
  .delayfeedback(0.35)
  .pan(0.4)
  .gain(0.7);

// --- Deler -------------------------------------------------------------

const intro = stack(pad, hats.gain(0.3));
const build = stack(kick, hats, pad, keys);
const drop = stack(kick, clap, hats, bass, keys, lead);
const brk = stack(pad, keys, lead.degradeBy(0.5));

arrange([4, intro], [8, build], [8, drop], [4, brk], [8, drop], [4, intro]);
