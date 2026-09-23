// @title Hotellbar
// @by deg
// @minutes 5
// Soft lounge / nu-jazz, 96 BPM, Bb-dur. Akkorder: Bb^7 – Gm7 – Cm7 – F7 (Imaj7–vi7–ii7–V7)
// Lydbilde: akustisk jazztrio (flygel, kontrabass, myke trommer) + vibrafon og litt saksofon.

setcps(96 / 60 / 4);

// --- Trommer (akustiske VCSL-samples) --------------------------------------

const kick = s("bassdrum2 ~ ~ [~ bassdrum2]").n("<0 3 5 3>").lpf(900).gain(0.7);

const rim = s("~ rim ~ rim")
  .bank("RolandTR808")
  .gain(0.3)
  .room(0.3)
  .late(0.015);

const hats = s("hihat*4")
  .n("<0 1 2 1>")
  .gain("0.3 0.18")
  .hpf(3000)
  .swingBy(0.12, 4)
  .velocity(rand.range(0.6, 0.9))
  .pan(0.6);

const ride = s("rd*4")
  .bank("RolandTR909") // TR808 har ingen ride
  .gain(0.15)
  .hpf(6000)
  .swingBy(0.12, 4)
  .degradeBy(0.25)
  .pan(0.4);

const shaker = s("shaker_small*8")
  .n("<0 2 4 6>")
  .gain("0.12 0.2")
  .hpf(4000)
  .swingBy(0.12, 8)
  .pan(0.35);

// --- Harmoni og bass -------------------------------------------------------

const bass = n("<[0 ~ [~ 4] ~]!3 [0 [~ 2] 4 [~ 5]]>") // hver 4. takt: walking-fill
  .add(n("<0 5 1 4>")) // Bb  G  C  F
  .scale("Bb1:major")
  .s("gm_acoustic_bass")
  .clip(0.9)
  .lpf(700)
  .gain(0.8)
  .velocity(rand.range(0.7, 0.95));

const piano = chord("<Bb^7 Gm7 Cm7 F7>")
  .voicing()
  .struct("~ x ~ [~ x]")
  .s("steinway")
  .clip(0.8)
  .hpf(250)
  .velocity(rand.range(0.45, 0.75))
  .room(0.5)
  .orbit(2)
  .gain(0.4)
  .swingBy(0.1, 4);

const strings = chord("<Bb^7 Gm7 Cm7 F7>")
  .voicing()
  .add(note(12))
  .s("gm_string_ensemble_1")
  .attack(1.2)
  .release(1.5)
  .lpf(sine.range(700, 1400).slow(16))
  .hpf(350)
  .room(0.9)
  .size(0.9)
  .orbit(2)
  .gain(0.15);

// --- Melodi ----------------------------------------------------------------

const vibes = n("<0 ~ 2 ~> ~ <4 ~ 6 ~> [~ <2 4>]")
  .scale("Bb4:major")
  .s("vibraphone_soft")
  .clip(1.5)
  .degradeBy(0.3)
  .velocity(rand.range(0.5, 0.8))
  .delay(0.3)
  .delaytime(0.5)
  .delayfeedback(0.3)
  .room(0.7)
  .orbit(3)
  .pan(0.35)
  .gain(0.45)
  .swingBy(0.1, 4);

const sax = n("<~ ~ 4 ~> ~ ~ <~ 2 ~ 0>")
  .scale("Bb3:major")
  .s("sax_vib")
  .clip(1.2)
  .degradeBy(0.4)
  .velocity(rand.range(0.4, 0.6))
  .lpf(3000)
  .room(0.6)
  .orbit(3)
  .pan(0.6)
  .gain(0.3);

// --- Deler -----------------------------------------------------------------

const intro = stack(strings, hats.gain(0.1), piano.degradeBy(0.4));
const verse = stack(kick, rim, hats, shaker, bass, piano, strings);
const solo = stack(kick, rim, hats, ride, shaker, bass, piano, strings, vibes);
const saxPart = stack(kick, rim, hats, shaker, bass, piano, strings, sax);
const outro = stack(strings, piano, vibes.degradeBy(0.5), hats.gain(0.1));

arrange([4, intro], [8, verse], [8, solo], [8, saxPart], [8, solo], [4, outro]);
