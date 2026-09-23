// @title Dypt vann
// @by deg
// @minutes 3
// Deep house, 121 BPM, E-moll. A: Em9 – C^7 – Am7 – Bm7  B: Em9 – G^7 – Am7 – D7
// Lydbilde: 909-trommer, shaker/conga, orgel-stabs, Rhodes-pad, harpe-glitter. Én synth: sine-sub.

setcps(121 / 60 / 4);

const prog = chord("<Em9 C^7 Am7 Bm7 Em9 G^7 Am7 D7>"); // 8 takter: A + B

// --- Trommer ---------------------------------------------------------------

const kick = s("bd*4")
  .bank("RolandTR909")
  .lpf(2500)
  .gain(0.95)
  .duckorbit(2)
  .duckattack(0.3)
  .duckdepth(0.45);

const clap = s("~ cp ~ cp").bank("RolandTR909").gain(0.4).lpf(6000).room(0.3);

const hats = s("[~ hh]*4")
  .bank("RolandTR909")
  .n("<0 1 2 3>")
  .gain(0.35)
  .hpf(5000)
  .pan(0.6)
  .velocity("<0.8 0.6 0.9 0.7>");

const openHat = s("~ oh ~ oh")
  .bank("RolandTR909")
  .gain(0.18)
  .hpf(6000)
  .clip(0.5)
  .pan(0.4);

const shaker = s("shaker_large*8")
  .n("<0 1 2 3>")
  .gain("0.12 0.2")
  .hpf(5000)
  .jux(rev);

const conga = s("~ [~ conga] ~ ~, ~ ~ ~ [conga:10 ~]")
  .n("<0 3 6>")
  .gain(0.25)
  .lpf(3000)
  .pan(0.3)
  .degradeBy(0.25);

// --- Bass ------------------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .struct("~ x ~ x")
  .s("gm_electric_bass_finger")
  .clip(0.7)
  .lpf(500)
  .gain(0.8)
  .every(8, (x) => x.struct("~ x ~ [x x]"));

const sub = prog
  .rootNotes(1)
  .struct("~ x ~ x")
  .s("sine")
  .decay(0.3)
  .sustain(0.5)
  .release(0.05)
  .lpf(150)
  .gain(0.4);

// --- Harmoni ---------------------------------------------------------------

const stabs = prog
  .voicing()
  .struct("~ x ~ [~ x]")
  .s("gm_drawbar_organ")
  .clip(0.3)
  .hpf(250)
  .lpf(2500)
  .room(0.4)
  .orbit(2)
  .gain(0.3)
  .every(4, (x) => x.struct("~ x [~ x] ~"));

const pad = prog
  .voicing()
  .s("gm_epiano1")
  .clip(1.5)
  .attack(0.5)
  .release(1.5)
  .hpf(300)
  .lpf(sine.range(800, 1600).slow(32))
  .room(0.8)
  .size(0.85)
  .orbit(2)
  .gain(0.25);

// --- Melodi ----------------------------------------------------------------

const glitter = n("<0 4 7 4> ~ <2 ~> <7 9 ~ 4>")
  .scale("E5:minor")
  .s("harp")
  .clip(2)
  .degradeBy(0.4)
  .velocity(rand.range(0.4, 0.7))
  .delay(0.3)
  .delaytime(0.375)
  .delayfeedback(0.35)
  .room(0.9)
  .orbit(3)
  .pan(rand)
  .gain(0.3);

const wind = s("wind")
  .n("<0 3 6>")
  .slow(8)
  .lpf(sine.range(400, 2500).slow(16))
  .hpf(300)
  .gain(0.08);

// --- Deler -----------------------------------------------------------------

const intro = stack(wind, pad, hats.gain(0.12), shaker);
const groove = stack(wind, kick, hats, openHat, shaker, bass, sub, stabs, pad);
const full = stack(
  wind,
  kick,
  clap,
  hats,
  openHat,
  shaker,
  conga,
  bass,
  sub,
  stabs,
  pad,
  glitter,
);
const brk = stack(wind, pad, stabs.rev(), glitter, shaker, conga);

arrange([4, intro], [8, groove], [8, full], [4, brk], [8, full], [8, groove]);
