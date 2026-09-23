// @title Pauselounge
// @by deg
// @minutes 3
// Chill house, 118 BPM, F-dur. A: F^7 – Dm7 – Gm7 – C7  B: Bb^7 – Am7 – Gm7 – C7
// Lydbilde: myk 909-kick, 808-clap, shaker og bongo, el-bass på offbeat, Rhodes-stabs, varm pad, vibrafon.
// Pattern effects i bruk: ply, jux(rev), add, off (nestet), slow med flere tempoer.

setcps(118 / 60 / 4)

const prog = chord("<F^7 Dm7 Gm7 C7 Bb^7 Am7 Gm7 C7>")   // 8 takter: A + B

// --- Trommer ---------------------------------------------------------------

const kick = s("bd*4")
  .bank("RolandTR909")
  .lpf(2000)
  .gain(0.9)
  .duckorbit(2).duckattack(0.3).duckdepth(0.4)

const clap = s("~ cp ~ cp")
  .bank("RolandTR808")
  .gain(0.4)
  .lpf(5000)
  .room(0.3)
  .late(0.01)

const hats = s("[~ hh]*4")
  .bank("RolandTR909")
  .n("<0 1 2 1>")
  .gain(0.3)
  .hpf(5000)
  .pan(0.6)
  .velocity("<0.8 0.6 0.9 0.7>")
  .ply("<1 1 2 1 1 [1 2] 1 1>")        // ply: dobler hihat i utvalgte takter

const openHat = s("~ oh ~ oh")
  .bank("RolandTR909")
  .gain(0.2)
  .hpf(6000)
  .clip(0.6)
  .pan(0.4)
  .degradeBy(0.1)

const shaker = s("shaker_small*8")
  .n("<0 1 2 3 4 5 6 7>")
  .gain("0.15 0.25 0.2 0.3")
  .hpf(4000)
  .jux(rev)                            // jux: venstre rett, høyre reversert → bred groove
  .every(8, x => x.degradeBy(0.5))

const bongo = s("~ ~ [~ bongo] ~, ~ bongo:4 ~ [bongo:7 ~]")
  .n("<0 2 5>")
  .gain(0.25)
  .lpf(3000)
  .pan(0.3)
  .degradeBy(0.3)

// --- Harmoni og bass -------------------------------------------------------

const bass = prog
  .rootNotes(2)
  .struct("~ x ~ x")
  .s("gm_electric_bass_finger")
  .lpf(550)
  .clip(0.7)
  .gain(0.8)
  .every(4, x => x.struct("~ x ~ [x x]"))
  .off(1/8, x => x.add(note(12)).gain(0.25).lpf(900))   // off: svak oktav-kopi en åttendedel etter

const keys = prog
  .voicing()
  .struct("~ x ~ [~ x]")
  .s("gm_epiano1")
  .clip(0.5)
  .hpf(250)
  .lpf(2500)
  .room(0.5)
  .orbit(2)
  .gain(0.4)
  .add(note("<0 0 0 <-12 0>>"))        // add: hver 4. runde faller stabbene en oktav (annenhver gang)
  .every(8, rev)                       // rev: snur rytmen i stabbene hver 8. takt

const pad = prog
  .voicing()
  .s("gm_pad_warm")
  .attack(0.8).release(1.5)
  .hpf(300)
  .lpf(sine.range(700, 1800).slow(32))
  .room(0.8).size(0.85)
  .orbit(2)
  .gain(0.28)

// --- Melodi ----------------------------------------------------------------

const lead = n("<0 ~ 4 ~> ~ <2 ~ 4 7> ~".add("<0 0 2 -3 3 2 2 -3>"))   // add på skalatrinn: motivet flyttes med akkordene
  .scale("F5:major")
  .s("vibraphone_soft")
  .clip(1.5)
  .degradeBy(0.3)
  .velocity(rand.range(0.5, 0.8))
  .off(1/8, x => x.add(n(2)).gain(0.5)          // off nestet: ters etter 1/8 …
    .off(1/8, y => y.add(n(2)).gain(0.3)))      // … og kvint enda 1/8 senere
  .delay(0.35).delaytime(0.375).delayfeedback(0.4)
  .room(0.6)
  .orbit(3)
  .jux(x => x.rev().gain(0.6))          // jux: speilvendt, dempet kopi i høyre kanal
  .gain(0.4)

// Polyrytmisk glitter: samme frase i to tempoer samtidig (slow "2,3")
const sparkle = n("0 2 4 7")
  .scale("F5:major")
  .s("gm_music_box")
  .slow("2,3")
  .degradeBy(0.4)
  .hpf(1500)
  .room(0.9).size(0.9)
  .orbit(4)
  .pan(rand)
  .gain(0.15)

// --- Deler -----------------------------------------------------------------

const intro = stack(pad, hats.gain(0.15), shaker, sparkle)
const groove = stack(kick, hats, openHat, shaker, bass, keys, pad)
const full = stack(kick, clap, hats, openHat, shaker, bongo, bass, keys, pad, lead)
const breakdown = stack(pad, keys.rev(), shaker, bongo, sparkle, lead.degradeBy(0.5))

arrange(
  [4, intro],
  [8, groove],
  [8, full],
  [4, breakdown],
  [8, full],
  [4, groove],
)
