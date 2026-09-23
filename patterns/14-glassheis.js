// @title Glassheis
// @by deg
// @minutes 3
// Melodisk house, 120 BPM, E-moll. Em7 – C^7 – G – D | Em7 – Bm7 – C^7 – D
// Lydbilde: piano-arpeggio, strykere, myk kick, shaker, kalimba. Ben Böhmer-lett, men rolig.

setcps(120 / 60 / 4)

const prog = chord("<Em7 C^7 G D Em7 Bm7 C^7 D>")

// --- Trommer ---------------------------------------------------------------

const kick = s("bd*4")
  .bank("RolandTR909")
  .lpf(2000)
  .gain(0.9)
  .duckorbit(2).duckattack(0.3).duckdepth(0.5)

const clap = s("~ cp ~ cp")
  .bank("RolandTR909")
  .gain(0.3)
  .lpf(5000)
  .room(0.4)

const hats = s("[~ hh]*4")
  .bank("RolandTR909")
  .n("<0 1 2 3>")
  .gain(0.28)
  .hpf(6000)
  .pan(0.6)

const shaker = s("shaker_small*8")
  .n("<0 1 2 3>")
  .gain("0.12 0.2")
  .hpf(4000)
  .pan(0.4)

const ride = s("~ ~ rd ~")
  .bank("RolandTR909")
  .gain(0.12)
  .hpf(7000)
  .degradeBy(0.4)

// --- Bass ------------------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .struct("~ x ~ x")
  .s("gm_electric_bass_finger")
  .clip(0.7)
  .lpf(500)
  .gain(0.8)

const sub = prog
  .rootNotes(1)
  .struct("x ~ ~ ~")
  .s("sine")
  .decay(0.6).sustain(0.4).release(0.1)
  .lpf(120)
  .gain(0.35)

// --- Harmoni ---------------------------------------------------------------

const arp = prog
  .voicing()
  .arp("<0 1 2 3 2 1>*4")
  .s("gm_piano")
  .clip(0.5)
  .hpf(300)
  .lpf(sine.range(1500, 3500).slow(16))
  .velocity(rand.range(0.45, 0.7))
  .room(0.5)
  .orbit(2)
  .pan(sine.range(0.35, 0.65).slow(8))
  .gain(0.35)

const strings = prog
  .voicing()
  .s("gm_string_ensemble_1")
  .attack(1.2).release(2)
  .hpf(350)
  .lpf(sine.range(600, 1500).slow(24))
  .room(0.85).size(0.9)
  .orbit(2)
  .gain(0.2)

const choir = prog
  .voicing()
  .add(note(12))
  .s("gm_choir_aahs")
  .attack(1.5).release(2)
  .hpf(500)
  .lpf(1800)
  .room(0.9).size(0.9)
  .orbit(2)
  .gain(0.1)

// --- Melodi ----------------------------------------------------------------

const kalimba = n("<0 2 ~ 4 ~ 2 0 ~> ~ <4 ~ 7 ~> [~ <2 4>]")
  .scale("E5:minor")
  .s("gm_kalimba")
  .clip(0.8)
  .degradeBy(0.25)
  .delay(0.35).delaytime(0.375).delayfeedback(0.4)
  .room(0.6)
  .orbit(3)
  .pan(0.55)
  .gain(0.35)

// --- Deler -----------------------------------------------------------------

const intro = stack(strings, arp.degradeBy(0.4), shaker)
const build = stack(kick, hats, shaker, bass, arp, strings)
const full = stack(kick, clap, hats, shaker, ride, bass, sub, arp, strings, choir, kalimba)
const brk = stack(strings, choir, arp.degradeBy(0.3), kalimba)

arrange(
  [4, intro],
  [8, build],
  [8, full],
  [4, brk],
  [8, full],
  [4, build],
)
