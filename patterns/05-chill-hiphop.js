// @title Kaffekø
// @by deg
// @minutes 5
// Chill / lo-fi hiphop, 84 BPM, C-moll. Akkorder: Cm9 – Ab^7 – Fm7 – G7 (i–VI–iv–V)
// Lydbilde: MPC-trommer, Rhodes, kontrabass, vinylknitring, jazz-samples som perc, kalimba-melodi.

setcps(84 / 60 / 4)

// --- Trommer ---------------------------------------------------------------

const kick = s("bd ~ [~ bd] ~")
  .bank("AkaiMPC60")
  .n("<0 1>")
  .lpf(1500)
  .gain(0.95)
  .swingBy(0.08, 8)

const snare = s("~ sd ~ sd")
  .bank("AkaiMPC60")
  .n("<0 1 2 1>")
  .gain(0.6)
  .lpf(4000)
  .late(0.02)                          // laid-back
  .room(0.3)

const hats = s("hh*8")
  .bank("RolandTR808")
  .n("<0 1 0 2>")
  .gain("0.3 0.15 0.25 0.15")
  .hpf(5000)
  .swingBy(0.1, 8)
  .degradeBy(0.15)
  .pan(0.6)

// Jazz-tromme-samples som ekstra perkusjon
const jazzPerc = s("~ jazz:3 ~ [~ jazz:5]")
  .gain(0.25)
  .hpf(1500)
  .degradeBy(0.3)
  .pan(0.4)

const vinyl = s("crackle*4")
  .density(0.06)
  .gain(0.2)
  .hpf(2000)

// --- Harmoni og bass -------------------------------------------------------

const bass = n("0 ~ [~ 0] 0")
  .add(n("<0 5 3 4>"))                 // C  Ab  F  G
  .scale("C1:minor")
  .s("gm_acoustic_bass")
  .clip(0.9)
  .lpf(500)
  .gain(0.85)
  .every(4, x => x.struct("x ~ x [~ x]"))

const keys = chord("<Cm9 Ab^7 Fm7 G7>")
  .voicing()
  .struct("x ~ [~ x] ~")
  .s("gm_epiano1")
  .clip(0.9)
  .hpf(220)
  .lpf(1800)
  .crush(7)                            // lo-fi-slitasje
  .room(0.5)
  .orbit(2)
  .gain(0.45)
  .velocity(rand.range(0.6, 0.9))

const pad = chord("<Cm9 Ab^7 Fm7 G7>")
  .voicing()
  .s("gm_pad_warm")
  .attack(1).release(1.5)
  .hpf(300)
  .lpf(1200)
  .room(0.8).size(0.85)
  .orbit(2)
  .gain(0.18)

// --- Melodi ----------------------------------------------------------------

const lead = n("<0 ~ 2 ~> ~ <4 ~ 3 2> [~ <0 7>]")
  .scale("C4:minor")
  .s("kalimba")
  .n("<0 1 2>")
  .clip(1.2)
  .degradeBy(0.25)
  .velocity(rand.range(0.5, 0.8))
  .delay(0.3).delaytime(0.375).delayfeedback(0.35)
  .room(0.5)
  .orbit(3)
  .pan(0.4)
  .gain(0.5)

// --- Deler -----------------------------------------------------------------

const intro = stack(vinyl, keys, pad, hats.gain(0.12))
const verse = stack(vinyl, kick, snare, hats, bass, keys, pad)
const hook = stack(vinyl, kick, snare, hats, jazzPerc, bass, keys, pad, lead)
const brk = stack(vinyl, keys.rev(), pad, lead.degradeBy(0.5), hats.degradeBy(0.5))

arrange(
  [4, intro],
  [8, verse],
  [8, hook],
  [4, brk],
  [8, hook],
  [4, verse],
)
