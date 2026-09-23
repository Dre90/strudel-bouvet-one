// @title Nattbuss
// @by deg
// @minutes 5
// Downtempo, 88 BPM, G-moll. Akkorder: Gm7 – Eb^7 – Cm7 – D7 (i–VI–iv–V)
// Lydbilde: DMX-trommer, el-bass, jazzgitar, klokkespill, strykere. Én synth: sine som sub under bassen.

setcps(88 / 60 / 4)

// --- Trommer ---------------------------------------------------------------

const kick = s("bd ~ ~ bd ~ ~ [~ bd] ~")
  .bank("OberheimDMX")
  .lpf(1800)
  .gain(0.95)

const snare = s("~ ~ sd ~ ~ ~ sd ~")
  .bank("OberheimDMX")
  .n("<0 1>")
  .gain(0.55)
  .lpf(5000)
  .room(0.4)
  .late(0.02)

const hats = s("hh*8")
  .bank("OberheimDMX")
  .n("<0 1>")
  .gain("0.28 0.14 0.22 0.14")
  .hpf(5000)
  .swingBy(0.08, 8)
  .pan(0.6)
  .sometimesBy(0.15, x => x.ply(2))

const tamb = s("~ tambourine ~ tambourine")
  .n("<0 2 4>")
  .gain(0.2)
  .hpf(4000)
  .pan(0.35)
  .degradeBy(0.2)

// --- Harmoni og bass -------------------------------------------------------

const bass = n("0 ~ ~ 0 ~ [~ 0] ~ ~")
  .add(n("<0 5 3 4>"))                 // G  Eb  C  D
  .scale("G1:minor")
  .s("gm_electric_bass_finger")
  .clip(0.9)
  .lpf(500)
  .gain(0.85)

const sub = n("0 ~ ~ 0 ~ [~ 0] ~ ~")
  .add(n("<0 5 3 4>"))
  .scale("G1:minor")
  .s("sine")
  .decay(0.4).sustain(0.3).release(0.1)
  .lpf(150)
  .gain(0.35)

const guitar = chord("<Gm7 Eb^7 Cm7 D7>")
  .voicing()
  .struct("~ x ~ ~ ~ x ~ [~ x]")
  .s("gm_electric_guitar_jazz")
  .clip(1.2)
  .hpf(250)
  .lpf(2500)
  .room(0.5)
  .orbit(2)
  .gain(0.4)
  .velocity(rand.range(0.5, 0.8))

const strings = chord("<Gm7 Eb^7 Cm7 D7>")
  .voicing()
  .s("gm_string_ensemble_1")
  .attack(1).release(1.5)
  .lpf(sine.range(500, 1200).slow(24))
  .hpf(300)
  .room(0.8).size(0.9)
  .orbit(2)
  .gain(0.2)

// --- Melodi ----------------------------------------------------------------

const bells = n("<0 ~ 4 ~> ~ ~ <2 ~ 7 ~>")
  .scale("G4:minor")
  .s("handchimes")
  .clip(2)
  .degradeBy(0.25)
  .velocity(rand.range(0.4, 0.7))
  .delay(0.4).delaytime(0.75).delayfeedback(0.4)
  .room(0.8)
  .orbit(3)
  .pan(rand)
  .gain(0.35)

const lead = n("<0 2 ~ 4> ~ <~ 3> <4 7 ~ 2>")
  .scale("G3:minor")
  .s("gm_electric_guitar_jazz")
  .clip(1.2)
  .lpf(2000)
  .degradeBy(0.35)
  .room(0.6)
  .delay(0.3).delaytime(0.375).delayfeedback(0.3)
  .orbit(3)
  .pan(0.4)
  .gain(0.45)

// --- Deler -----------------------------------------------------------------

const intro = stack(strings, bells, hats.gain(0.1))
const verse = stack(kick, snare, hats, bass, sub, guitar, strings)
const hook = stack(kick, snare, hats, tamb, bass, sub, guitar, strings, bells, lead)
const brk = stack(strings, bells, bass.degradeBy(0.5), guitar.degradeBy(0.5))

arrange(
  [4, intro],
  [8, verse],
  [8, hook],
  [4, brk],
  [8, hook],
  [4, verse],
  [4, intro],
)
