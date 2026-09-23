// @title Støvete
// @by deg
// @minutes 3
// Lo-fi house, 116 BPM, A-moll. Am7 – Fmaj7 – C^7 – G7 | Am7 – Dm7 – E7 – Am7
// Lydbilde: dempet MPC-kick, støvete hihat, knust Rhodes, vinylknitring, jazzgitar-lick. Litt sløvt.

setcps(116 / 60 / 4);

const prog = chord("<Am7 F^7 C^7 G7 Am7 Dm7 E7 Am7>");

// --- Trommer ---------------------------------------------------------------

const kick = s("bd*4")
  .bank("AkaiMPC60")
  .n("<0 1>")
  .lpf(1400)
  .gain(0.9)
  .duckorbit(2)
  .duckattack(0.25)
  .duckdepth(0.35);

const snare = s("~ sd ~ sd")
  .bank("EmuSP12")
  .gain(0.35)
  .lpf(3500)
  .late(0.015)
  .room(0.3);

const hats = s("[~ hh]*4")
  .bank("EmuSP12")
  .n("<0 1>")
  .gain(0.3)
  .hpf(5000)
  .lpf(9000)
  .swingBy(0.06, 8)
  .pan(0.6)
  .sometimesBy(0.15, (x) => x.ply(2));

const openHat = s("~ ~ ~ [~ oh]")
  .bank("RolandTR808")
  .gain(0.15)
  .hpf(6000)
  .clip(0.5);

const vinyl = s("crackle*4").density(0.05).gain(0.18).hpf(2500);

// --- Bass ------------------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .struct("~ x ~ x")
  .s("gm_electric_bass_pick")
  .clip(0.6)
  .lpf(450)
  .gain(0.8)
  .every(8, (x) => x.struct("~ x ~ [x ~ x]"));

// --- Harmoni ---------------------------------------------------------------

const rhodes = prog
  .voicing()
  .struct("x ~ ~ x ~ ~ x ~")
  .s("gm_epiano1")
  .clip(1.1)
  .hpf(220)
  .lpf(sine.range(1200, 2200).slow(16))
  .crush(7)
  .velocity(rand.range(0.5, 0.8))
  .room(0.5)
  .orbit(2)
  .gain(0.45);

const pad = prog
  .voicing()
  .s("fmpiano")
  .clip(2)
  .attack(0.5)
  .release(1.5)
  .hpf(300)
  .lpf(1200)
  .crush(8)
  .room(0.8)
  .size(0.85)
  .orbit(2)
  .gain(0.2);

// --- Melodi ----------------------------------------------------------------

const lick = n("<~ 0 ~ 2> <4 ~ 2 ~> ~ <~ 4 7 ~>")
  .scale("A4:minor")
  .s("gm_electric_guitar_jazz")
  .clip(1.3)
  .degradeBy(0.3)
  .velocity(rand.range(0.5, 0.75))
  .lpf(2500)
  .delay(0.3)
  .delaytime(0.375)
  .delayfeedback(0.3)
  .room(0.6)
  .orbit(3)
  .pan(0.4)
  .gain(0.4);

// --- Deler -----------------------------------------------------------------

const intro = stack(vinyl, pad, rhodes.degradeBy(0.5), hats.gain(0.12));
const groove = stack(vinyl, kick, hats, bass, rhodes, pad);
const full = stack(vinyl, kick, snare, hats, openHat, bass, rhodes, pad, lick);
const brk = stack(vinyl, pad, rhodes.rev(), lick.degradeBy(0.5));

arrange([4, intro], [8, groove], [8, full], [4, brk], [8, full], [4, groove]);
