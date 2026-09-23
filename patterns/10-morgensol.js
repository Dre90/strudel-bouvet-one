// @title Morgensol
// @by deg
// @minutes 3
// Soft house, 118 BPM, F-dur. A: F^7 – Am7 – Dm7 – Bb^7 (I–iii–vi–IV)  B: Gm7 – C7 – F^7 – Bb^7
// Lydbilde: myk 909-kick m/ sidechain, nylongitar-plukk, piano-akkorder, marimba-hook, shaker/rim.

setcps(118 / 60 / 4);

// 8 takter: A-del (4) + B-del (4) – gir mindre repetisjon enn én 4-takters runde
const prog = chord("<F^7 Am7 Dm7 Bb^7 Gm7 C7 F^7 Bb^7>");

// --- Trommer ---------------------------------------------------------------

const kick = s("bd*4")
  .bank("RolandTR909")
  .lpf(1800)
  .gain(0.9)
  .duckorbit(2)
  .duckattack(0.3)
  .duckdepth(0.45); // sidechain: akkorder pumper mykt

const clap = s("~ cp ~ cp")
  .bank("RolandTR808")
  .gain(0.35)
  .lpf(4500)
  .room(0.3)
  .late(0.01);

const hats = s("[~ hh]*4")
  .bank("RolandTR707")
  .n("<0 1>")
  .gain(0.28)
  .hpf(6000)
  .pan(0.6)
  .velocity("<0.8 0.6 0.9 0.7>");

const shaker = s("shaker_small*8")
  .n("<0 1 2 3 4 5 6 7>")
  .gain("0.14 0.22")
  .hpf(4000)
  .pan(0.4)
  .someCyclesBy(0.2, (x) => x.degradeBy(0.4));

const rim = s("~ ~ ~ [~ rim]")
  .bank("RolandTR808")
  .gain(0.2)
  .room(0.4)
  .degradeBy(0.3);

// --- Bass ------------------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .struct("~ x ~ x")
  .s("gm_electric_bass_finger")
  .clip(0.7)
  .lpf(550)
  .gain(0.8)
  .every(4, (x) => x.struct("~ x ~ [x x]"));

// --- Harmoni ---------------------------------------------------------------

const piano = prog
  .voicing()
  .struct("~ x ~ [~ x]")
  .s("gm_piano")
  .clip(0.6)
  .hpf(250)
  .lpf(3000)
  .velocity(rand.range(0.45, 0.7))
  .room(0.5)
  .orbit(2)
  .gain(0.38);

const guitar = prog
  .voicing()
  .arp("<0 1 2 1 3 2 1 0>*2")
  .s("gm_acoustic_guitar_nylon")
  .clip(0.5)
  .hpf(300)
  .velocity(rand.range(0.4, 0.7))
  .room(0.4)
  .orbit(2)
  .pan(0.35)
  .gain(0.3)
  .someCyclesBy(0.25, (x) => x.degradeBy(0.3));

const pad = prog
  .voicing()
  .s("gm_pad_warm")
  .attack(0.8)
  .release(1.5)
  .hpf(300)
  .lpf(sine.range(600, 1500).slow(16))
  .room(0.8)
  .size(0.85)
  .orbit(2)
  .gain(0.2);

// --- Melodi ----------------------------------------------------------------

const hook = n("<0 ~ 2 ~ 4 ~ 2 0> <~ 4 ~ 7> ~ <2 ~ 4 ~>")
  .scale("F5:major")
  .s("marimba")
  .clip(1)
  .degradeBy(0.2)
  .velocity(rand.range(0.5, 0.8))
  .delay(0.3)
  .delaytime(0.375)
  .delayfeedback(0.35)
  .room(0.6)
  .orbit(3)
  .pan(0.6)
  .gain(0.4);

// --- Deler -----------------------------------------------------------------

const intro = stack(pad, guitar, shaker);
const groove = stack(kick, hats, shaker, bass, piano, pad);
const full = stack(
  kick,
  clap,
  hats,
  shaker,
  rim,
  bass,
  piano,
  guitar,
  pad,
  hook,
);
const brk = stack(pad, guitar, hook.degradeBy(0.5), shaker);

arrange([4, intro], [8, groove], [8, full], [4, brk], [8, full], [4, groove]);
