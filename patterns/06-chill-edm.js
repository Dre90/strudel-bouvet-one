// @title Skyline
// @by deg
// @minutes 3
// Chill EDM (half-time), 100 BPM, A-moll. A: Am7 – F^7 – C^7 – G  B: Am7 – Dm7 – F^7 – E7
// Lydbilde: 909-trommer, kalimba-pluck, kor-pad, piano, fløyte. Synth kun som sine-sub.

setcps(100 / 60 / 4);

const prog = chord("<Am7 F^7 C^7 G Am7 Dm7 F^7 E7>"); // 8 takter: A + B

// --- Trommer ---------------------------------------------------------------

const kick = s("bd ~ ~ bd ~ ~ bd ~")
  .bank("RolandTR909")
  .lpf(3000)
  .gain(0.95)
  .duckorbit(2)
  .duckattack(0.35)
  .duckdepth(0.4);

const clap = s("~ ~ cp ~ ~ ~ cp ~")
  .bank("RolandTR909")
  .gain(0.45)
  .lpf(6000)
  .room(0.4)
  .late(0.01);

const hats = s("hh*8")
  .bank("RolandTR909")
  .n("<0 1 2 1>")
  .gain("0.35 0.18 0.28 0.18")
  .hpf(5000)
  .pan(sine.range(0.35, 0.65).slow(4))
  .ply("<1 1 1 2>");

const shaker = s("shaker_small*8")
  .n("<0 1 2 3>")
  .gain("0.1 0.18")
  .hpf(4000)
  .pan(0.35);

// --- Bass ------------------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .s("gm_electric_bass_finger")
  .struct("x ~ ~ x ~ ~ x ~")
  .clip(0.8)
  .lpf(500)
  .gain(0.8);

const sub = prog
  .rootNotes(1)
  .s("sine")
  .struct("x ~ ~ x ~ ~ x ~")
  .decay(0.5)
  .sustain(0.5)
  .release(0.1)
  .lpf(150)
  .gain(0.4);

// --- Harmoni ---------------------------------------------------------------

const pad = prog
  .voicing()
  .s("gm_choir_aahs")
  .attack(0.8)
  .release(1.5)
  .hpf(250)
  .lpf(sine.range(800, 2000).slow(16))
  .room(0.7)
  .size(0.8)
  .orbit(2)
  .gain(0.25);

const piano = prog
  .voicing()
  .struct("x ~ ~ ~ ~ ~ [~ x] ~")
  .s("gm_piano")
  .clip(1.5)
  .hpf(250)
  .velocity(rand.range(0.4, 0.7))
  .room(0.5)
  .orbit(2)
  .gain(0.35);

const pluck = prog
  .voicing()
  .arp("0 [~ 2] 1 [~ 3] 2 [~ 1] 0 [~ 2]")
  .s("gm_kalimba")
  .clip(0.6)
  .delay(0.3)
  .delaytime(0.1875)
  .delayfeedback(0.3)
  .orbit(3)
  .pan(0.4)
  .gain(0.35)
  .degradeBy(0.1);

// --- Melodi ----------------------------------------------------------------

const lead = n("<0 4 7 4> ~ <7 9> ~ <4 2> ~ ~ ~")
  .scale("A4:minor")
  .s("gm_flute")
  .clip(1.5)
  .attack(0.05)
  .lpf(3000)
  .room(0.6)
  .delay(0.4)
  .delaytime(0.375)
  .delayfeedback(0.4)
  .orbit(4)
  .jux((x) => x.rev().gain(0.5))
  .gain(0.4)
  .degradeBy(0.2);

// Myk oppbygging: cymbal-swell i stedet for støy-sweep
const swell = s("sus_cymbal")
  .n("<0 5 10>")
  .slow(4)
  .attack(2)
  .release(0.5)
  .lpf(4000)
  .hpf(500)
  .gain(0.12);

// --- Deler -----------------------------------------------------------------

const intro = stack(pad, hats.gain(0.12), shaker);
const build = stack(kick, hats, shaker, pad, piano, pluck, swell);
const drop = stack(
  kick,
  clap,
  hats,
  shaker,
  bass,
  sub,
  pad,
  piano,
  pluck,
  lead,
);
const brk = stack(pad, piano, pluck.degradeBy(0.4), lead.degradeBy(0.5));

arrange(
  [4, intro],
  [4, build],
  [8, drop],
  [4, brk],
  [4, build],
  [8, drop],
  [4, intro],
);
