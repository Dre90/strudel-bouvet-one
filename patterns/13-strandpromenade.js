// @title Strandpromenade
// @by deg
// @minutes 3
// Soft nu-disco / balearic, 114 BPM, C-dur. C^7 – Em7 – Am7 – F^7 | Dm7 – G7 – C^7 – F^7
// Lydbilde: dempet gitar-stabs, funky fingerbass, LinnDrum, vibrafon, strykere. Solfylt og lett.

setcps(114 / 60 / 4);

const prog = chord("<C^7 Em7 Am7 F^7 Dm7 G7 C^7 F^7>");

// --- Trommer ---------------------------------------------------------------

const kick = s("bd ~ bd ~, ~ ~ ~ [~ bd]")
  .bank("LinnDrum")
  .lpf(2200)
  .gain(0.85)
  .duckorbit(2)
  .duckattack(0.25)
  .duckdepth(0.35);

const clap = s("~ cp ~ cp").bank("LinnDrum").gain(0.35).lpf(5000).room(0.35);

const hats = s("hh*8")
  .bank("LinnDrum")
  .n("<0 1>")
  .gain("0.3 0.15 0.22 0.15")
  .hpf(5500)
  .pan(0.6);

const openHat = s("~ oh ~ oh")
  .bank("LinnDrum")
  .gain(0.18)
  .hpf(6000)
  .clip(0.5)
  .pan(0.4);

const tamb = s("tambourine*4")
  .n("<0 2 4 6>")
  .gain(0.15)
  .hpf(5000)
  .pan(0.35)
  .degradeBy(0.2);

// --- Bass ------------------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .struct("x ~ [~ x] ~ x [~ x] ~ x")
  .s("gm_electric_bass_finger")
  .clip(0.55)
  .lpf(600)
  .gain(0.8)
  .velocity(rand.range(0.7, 0.95))
  .sometimesBy(0.2, (x) => x.add(note(12)).gain(0.6));

// --- Harmoni ---------------------------------------------------------------

const stabs = prog
  .voicing()
  .struct("~ x ~ [x ~] ~ x ~ ~")
  .s("gm_electric_guitar_muted")
  .clip(0.35)
  .hpf(300)
  .lpf(3500)
  .velocity(rand.range(0.5, 0.8))
  .room(0.3)
  .orbit(2)
  .pan(0.35)
  .gain(0.4);

const keys = prog
  .voicing()
  .struct("~ ~ x ~ ~ ~ [~ x] ~")
  .s("gm_epiano2")
  .clip(0.8)
  .hpf(250)
  .room(0.5)
  .orbit(2)
  .pan(0.6)
  .gain(0.3);

const strings = prog
  .voicing()
  .add(note(12))
  .s("gm_string_ensemble_1")
  .attack(1)
  .release(1.5)
  .hpf(400)
  .lpf(sine.range(800, 1600).slow(16))
  .room(0.8)
  .size(0.85)
  .orbit(2)
  .gain(0.15);

// --- Melodi ----------------------------------------------------------------

const vibes = n("<0 ~ 4 ~> [~ <2 4>] <~ 7> <2 ~ 0 ~>")
  .scale("C5:major")
  .s("vibraphone")
  .clip(1.2)
  .degradeBy(0.3)
  .velocity(rand.range(0.5, 0.8))
  .delay(0.3)
  .delaytime(0.375)
  .delayfeedback(0.35)
  .room(0.6)
  .orbit(3)
  .pan(0.5)
  .gain(0.4);

// --- Deler -----------------------------------------------------------------

const intro = stack(strings, keys, hats.gain(0.1));
const groove = stack(kick, hats, bass, stabs, keys, strings);
const full = stack(
  kick,
  clap,
  hats,
  openHat,
  tamb,
  bass,
  stabs,
  keys,
  strings,
  vibes,
);
const brk = stack(strings, keys, stabs.degradeBy(0.5), vibes);

arrange([4, intro], [8, groove], [8, full], [4, brk], [8, full], [4, groove]);
