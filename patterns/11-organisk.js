// @title Organisk
// @by deg
// @minutes 3
// Organic house, 120 BPM, D-dorisk. Dm7 – G7 – Dm7 – Bb^7 | Dm9 – Am7 – G7 – Dm7
// Lydbilde: håndperkusjon (bongo, conga, shaker, clave), kalimba-hook, varm pad, el-bass. Bonobo-aktig.

setcps(120 / 60 / 4)

const prog = chord("<Dm7 G7 Dm7 Bb^7 Dm9 Am7 G7 Dm7>")

// --- Trommer ---------------------------------------------------------------

const kick = s("bd*4")
  .bank("RolandTR909")
  .lpf(1600)
  .gain(0.85)
  .duckorbit(2).duckattack(0.3).duckdepth(0.4)

const hats = s("[~ hh]*4")
  .bank("RolandTR808")
  .n("<0 1 2>")
  .gain(0.25)
  .hpf(6000)
  .pan(0.6)

const bongo = s("~ bongo [~ bongo] ~, bongo:6 ~ ~ [bongo:9 bongo:11]")
  .n("<0 2 4 1>")
  .gain(0.3)
  .lpf(3500)
  .velocity(rand.range(0.6, 0.9))
  .pan(0.3)
  .someCyclesBy(0.3, x => x.degradeBy(0.4))

const conga = s("~ ~ conga ~, ~ ~ ~ [~ conga:12]")
  .n("<3 6 9>")
  .gain(0.28)
  .lpf(3000)
  .pan(0.7)
  .degradeBy(0.2)

const shaker = s("shaker_large*8")
  .n("<0 1 2 3>")
  .gain("0.12 0.2 0.15 0.22")
  .hpf(4000)
  .pan(0.45)

const clave = s("~ ~ ~ clave, [~ clave] ~ ~ ~")
  .n("<0 2>")
  .gain(0.18)
  .room(0.4)
  .degradeBy(0.35)

// --- Bass ------------------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .struct("x ~ [~ x] ~ x ~ ~ [~ x]")
  .s("gm_electric_bass_finger")
  .clip(0.8)
  .lpf(500)
  .gain(0.8)

// --- Harmoni ---------------------------------------------------------------

const keys = prog
  .voicing()
  .struct("~ ~ x ~ ~ x ~ ~")
  .s("gm_epiano1")
  .clip(1)
  .hpf(250)
  .lpf(2500)
  .velocity(rand.range(0.4, 0.7))
  .room(0.5)
  .orbit(2)
  .gain(0.35)

const pad = prog
  .voicing()
  .s("gm_pad_warm")
  .attack(1).release(2)
  .hpf(300)
  .lpf(sine.range(500, 1400).slow(24))
  .room(0.85).size(0.9)
  .orbit(2)
  .gain(0.22)

// --- Melodi ----------------------------------------------------------------

const kalimba = n("<0 2 4 2 0 ~ 4 ~> [~ <7 4>] <2 ~> [<4 2> ~]")
  .scale("D4:dorian")
  .s("kalimba")
  .n("<0 1 2 3>")
  .clip(1.2)
  .degradeBy(0.2)
  .velocity(rand.range(0.5, 0.85))
  .delay(0.35).delaytime(0.375).delayfeedback(0.4)
  .room(0.6)
  .orbit(3)
  .pan(0.55)
  .gain(0.45)
  .every(8, x => x.add(n(7)))

const flute = n("<~ ~ ~ 4> ~ <~ 2> ~")
  .scale("D5:dorian")
  .s("gm_pan_flute")
  .clip(1.5)
  .attack(0.05)
  .degradeBy(0.4)
  .lpf(3000)
  .room(0.7)
  .orbit(3)
  .pan(0.4)
  .gain(0.3)

// --- Deler -----------------------------------------------------------------

const intro = stack(pad, shaker, bongo.degradeBy(0.5), kalimba.degradeBy(0.5))
const groove = stack(kick, hats, shaker, bongo, bass, keys, pad)
const full = stack(kick, hats, shaker, bongo, conga, clave, bass, keys, pad, kalimba)
const brk = stack(pad, bongo, conga, shaker, kalimba, flute)

arrange(
  [4, intro],
  [8, groove],
  [8, full],
  [4, brk],
  [8, full],
  [4, groove],
)
