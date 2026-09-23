// @title Siste sol
// @by deg
// @minutes 3
// Sunset soft house, 110 BPM, G-dur. G^7 – Bm7 – Em7 – C^7 | Am7 – D7 – G^7 – C^7
// Lydbilde: DX-piano, fløyte, harpe, myk kick, shaker og rim. Rolig – passer som åpning eller avslutning.

setcps(110 / 60 / 4)

const prog = chord("<G^7 Bm7 Em7 C^7 Am7 D7 G^7 C^7>")

// --- Trommer ---------------------------------------------------------------

const kick = s("bd*4")
  .bank("RolandTR909")
  .lpf(1500)
  .gain(0.8)
  .duckorbit(2).duckattack(0.35).duckdepth(0.4)

const rim = s("~ rim ~ rim")
  .bank("RolandTR808")
  .gain(0.25)
  .room(0.4)
  .late(0.01)

const hats = s("[~ hh]*4")
  .bank("RolandTR808")
  .n("<0 1 2>")
  .gain(0.22)
  .hpf(6000)
  .pan(0.6)

const shaker = s("shaker_small*8")
  .n("<0 2 4 6 1 3 5 7>")
  .gain("0.1 0.18")
  .hpf(4000)
  .pan(0.4)
  .someCyclesBy(0.2, x => x.degradeBy(0.5))

// --- Bass ------------------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .struct("x ~ ~ x ~ ~ x ~")
  .s("gm_electric_bass_finger")
  .clip(0.9)
  .lpf(500)
  .gain(0.75)

// --- Harmoni ---------------------------------------------------------------

const keys = prog
  .voicing()
  .struct("x ~ ~ [~ x] ~ ~ x ~")
  .s("gm_epiano2")
  .clip(1.2)
  .hpf(250)
  .lpf(2800)
  .velocity(rand.range(0.45, 0.7))
  .room(0.6)
  .orbit(2)
  .gain(0.38)

const harp = prog
  .voicing()
  .arp("<0 2 1 3>*2")
  .s("harp")
  .clip(1.5)
  .hpf(400)
  .velocity(rand.range(0.4, 0.65))
  .room(0.7)
  .orbit(2)
  .pan(0.35)
  .gain(0.25)
  .someCyclesBy(0.3, x => x.degradeBy(0.4))

const pad = prog
  .voicing()
  .s("gm_pad_warm")
  .attack(1.2).release(2)
  .hpf(300)
  .lpf(sine.range(500, 1300).slow(24))
  .room(0.9).size(0.9)
  .orbit(2)
  .gain(0.2)

// --- Melodi ----------------------------------------------------------------

const flute = n("<~ 0 ~ 2 ~ 4 ~ 2> ~ <~ ~ 4 7> <2 ~>")
  .scale("G5:major")
  .s("gm_flute")
  .clip(1.5)
  .attack(0.08)
  .degradeBy(0.3)
  .velocity(rand.range(0.4, 0.7))
  .lpf(3500)
  .delay(0.3).delaytime(0.5).delayfeedback(0.3)
  .room(0.7)
  .orbit(3)
  .pan(0.55)
  .gain(0.35)

// --- Deler -----------------------------------------------------------------

const intro = stack(pad, harp, shaker)
const groove = stack(kick, hats, shaker, bass, keys, pad)
const full = stack(kick, rim, hats, shaker, bass, keys, harp, pad, flute)
const brk = stack(pad, harp, flute.degradeBy(0.5), shaker)

arrange(
  [4, intro],
  [8, groove],
  [8, full],
  [4, brk],
  [8, full],
  [4, intro],
)
