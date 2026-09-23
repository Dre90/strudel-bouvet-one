# Strudel-prosjekt – instruksjoner for Copilot

Dette prosjektet lager musikk med [Strudel](https://strudel.cc) (JavaScript-port av TidalCycles).
Filene i `patterns/*.js` er Strudel-koder som evalueres direkte i nettleseren via `@strudel/repl`.

Denne fila dekker **syntaks**. Andre instruksjonsfiler:
- [lyder.instructions.md](instructions/lyder.instructions.md) – **lydkatalog**: alle samples, banker, akustiske instrumenter, GM og synther, og hva som passer til hva. **Les denne før du velger lyder.**
- [komposisjon.instructions.md](instructions/komposisjon.instructions.md) – harmoni, melodi, struktur, miks, og hva slags musikk vi lager (bakgrunnsmusikk).
- [sjangre.instructions.md](instructions/sjangre.instructions.md) – tempo, trommer og lydvalg per sjanger.

Referanseeksempler: `patterns/03-song-structure.js` (struktur), `patterns/07-soft-lounge.js` (akustiske samples).

## Når du blir bedt om å lage/endre musikk

- Skriv eller endre en fil i `patterns/`. Filnavn: `NN-kort-beskrivelse.js` (tosifret nummer, kebab-case).
- Fila skal inneholde **ren Strudel-kode uten `import`/`export`**. Alle funksjoner (`note`, `s`, `stack` …) er globale.
- Start alltid med metadata-kommentarer: `// @title …` og `// @by …`.
- Sett tempo med `setcps(x)` (cycles per sekund). 120 BPM i 4/4 = `setcps(0.5)`. Formel: `setcps(bpm / 60 / 4)`.
- Siste uttrykk i fila er det som spilles. Bruk `stack(...)` for å legge lag oppå hverandre.
- Ikke finn på funksjonsnavn. Bruk bare funksjoner fra lista under eller som du er sikker på finnes i Strudel.
- **Lydvalg:** Strudel har hundrevis av samples og ekte instrumenter (se lydkatalogen). Bruk samples/GM/akustiske instrumenter som standard. Synther (`sine`, `sawtooth`, `supersaw`, støy, FM) kun der sjangeren faktisk krever det – typisk sub-bass eller én pad/pluck.
- Hold det spillbart: én endring om gangen når du redigerer. Aldri fjern `setcps` uten grunn.
- Setlist-metadata (valgfritt): `// @minutes 5` sier hvor lenge låten spilles i setliste-modus.

## Mini-notasjon (inne i doble anførselstegn)

| Syntaks                  | Betydning                                       |
| ------------------------ | ----------------------------------------------- |
| `"bd sd hh"`             | Sekvens – deler en cycle likt mellom elementene |
| `"~"`                    | Pause                                           |
| `"bd*4"`                 | Gjenta 4 ganger innen samme tid                 |
| `"bd/2"`                 | Strekk over 2 cycles                            |
| `"[bd sd] hh"`           | Undergruppe (tar én plass)                      |
| `"<bd sd>"`              | Alterner – én per cycle                         |
| `"bd, hh*2"`             | Polyfoni – lag som spilles samtidig             |
| `"bd(3,8)"`              | Euklidsk rytme (3 slag over 8 steg)             |
| `"bd? sd"` / `"hh?0.2"`   | 50 % / 20 % sjanse for å spille                 |
| `"bd:3"`                 | Sample nr. 3 i banken                           |
| `"c@3 e"`                | Forleng – c varer 3 enheter, e varer 1          |
| `"c!3 e"`                | Repeter som separate hendelser (c c c e)        |
| `"bd \| sd \| hh"`        | Tilfeldig valg per cycle                        |
| `"bd . hh hh . sd"`      | Punktum = gruppering                            |
| `"c e g"` / `"c4 e4 g4"` | Notenavn (oktav valgfri)                        |
| `"0 2 4"`                | Tall – brukes med `n()` + `.scale()`            |

Enkle anførselstegn (`'C minor'`) er vanlige strenger, **ikke** mini-notasjon.

## Vanlige funksjoner

**Lyd / kilde**

- `s("bd")` – sample eller synth. Trommer: `bd sd hh oh cp rim lt mt ht cr rd sh cb tb perc`. Akustiske instrumenter: `piano steinway vibraphone kalimba harp shaker_small bongo …` (se lydkatalog). Synther: `sine square sawtooth triangle supersaw`.
- `.bank("RolandTR808")` / `"RolandTR909"` / `"LinnDrum"` / `"AkaiMPC60"` / `"OberheimDMX"` … – trommemaskin-bank. Innhold: TR808 `bd cb cp cr hh ht lt mt oh perc rim sd sh` (**ingen `rd`**); TR909 `bd cp cr hh ht lt mt oh rd rim sd`; LinnDrum `bd cb cp cr hh ht lt mt oh perc rd rim sd sh tb`. Full liste i lydkatalogen.
- `.n("<0 1 2>")` på samples – velg variant (gir liv til hihat/shaker). `.velocity(rand.range(0.6, 1))` – menneskelig dynamikk.
- Støy som lydkilde: `s("white")`, `s("pink")`, `s("brown")` (hardt → mykt) – bra til hihat/snare med `.decay(0.05).sustain(0)`. `s("crackle").density(0.05)` – vinylknitring. `.noise(0.1)` legger støy på en synth.
- Synth-parametre: `.vib(4).vibmod(0.3)` – vibrato (Hz, dybde i halvtoner). `.fm(2).fmh(3).fmdecay(0.2).fmsustain(0)` – FM-syntese (hele tall = naturlig, desimaler = metallisk). `.penv(12).pdecay(0.1)` – pitch-envelope. `.lpf(500).lpenv(3).lpattack(0.01).lpdecay(0.2)` – filter-envelope (pluck). `s("supersaw").unison(5).detune(0.2).spread(0.7)` – bred supersaw. `.tremolo(4).tremolodepth(0.5)`.
- ZZFX-synth: `s("z_sine")`, `z_sawtooth`, `z_square`, `z_triangle` med `.zdelay(0.2)`, `.slide(1)`, `.zcrush(0.3)`.
- Merk: `supersaw`, `crush`, `coarse`, `shape`, `distort`, `tremolo` bruker AudioWorklets som lastes ved første ekte klikk – første lyd kan mangle, det er normalt.
- `note("c e g")` – toner. `n("0 2 4").scale("C4:minor")` – skala-relative toner.
- GM-instrumenter (bruk **nøyaktig** disse navnene): tangenter `gm_piano gm_epiano1 gm_epiano2 gm_vibraphone gm_marimba gm_xylophone gm_kalimba gm_music_box`; orgel `gm_drawbar_organ gm_rock_organ`; gitar `gm_acoustic_guitar_nylon gm_acoustic_guitar_steel gm_electric_guitar_jazz gm_electric_guitar_clean`; bass `gm_acoustic_bass gm_electric_bass_finger gm_fretless_bass gm_slap_bass_1 gm_synth_bass_1 gm_synth_bass_2`; strykere `gm_violin gm_cello gm_string_ensemble_1 gm_synth_strings_1`; kor `gm_choir_aahs gm_voice_oohs gm_synth_choir`; blås `gm_trumpet gm_trombone gm_french_horn gm_brass_section gm_alto_sax gm_tenor_sax gm_clarinet gm_flute gm_pan_flute`; lead `gm_lead_1_square gm_lead_2_sawtooth gm_lead_3_calliope gm_lead_6_voice gm_lead_8_bass_lead`; pad `gm_pad_new_age gm_pad_warm gm_pad_poly gm_pad_choir gm_pad_halo gm_pad_sweep`; fx `gm_fx_crystal gm_fx_atmosphere gm_fx_echoes gm_fx_sci_fi`; annet `gm_sitar gm_koto gm_steel_drums gm_taiko_drum`.
  Merk: det heter `gm_epiano1` (ikke `gm_electric_piano_1`) og `gm_pad_warm` (ikke `gm_pad_2_warm`).
- Skalaer: `"C4:major"`, `"A3:minor"`, `"D4:dorian"`, `"E3:minor:pentatonic"`, `"F4:mixolydian"`.

**Tid / struktur**

- `setcps(0.5)` – tempo.
- `.slow(2)` / `.fast(2)` – strekk / komprimer.
- `.rev()` – reverser. `.jux(rev)` – reverser bare i høyre kanal.
- `.every(4, x => x.fast(2))` / `.firstOf(4, …)` – hvert 4. cycle (første). `.lastOf(4, …)` – hvert 4. cycle (siste) = fill før ny del.
- `.sometimes(x => x.speed(2))` / `.rarely(...)` / `.often(...)` / `.sometimesBy(0.3, ...)` – per hendelse. `.someCyclesBy(0.3, …)` – per cycle.
- `.degradeBy(0.3)` – dropp 30 % av hendelsene.
- `.off(1/8, x => x.add(note(12)))` – kopi forskjøvet i tid. `.superimpose(x => x.add(7))` – kopi uten forskyvning. `.echo(3, 1/8, 0.6)` – 3 ekko med avtagende volum.
- `.ply(2)` – dobler hver hendelse. `.swingBy(0.1, 8)` – swing på hver 8. del.
- `.struct("x ~ x x")` – påfør rytmestruktur. Bruk `x`/`~` (eller `1`/`0`) – **ikke** `"0 ~ 0"`, siden `0` betyr «av».
- `.mask("<1 1 1 0>")` – mute i takter med 0. `.when("<0 1>", fn)` – bruk fn når 1.
- `.late(0.25)` / `.early(0.25)` – forskyv.
- `stack(a, b, c)` – lag samtidig. `cat(a, b)` – etter hverandre (én per cycle). `seq(a, b)` – etter hverandre innen én cycle.
- `arrange([4, a], [2, b])` – a i 4 cycles, så b i 2.
- `"<0 1>".pick([a, b])` – velg pattern etter indeks (variasjon av hele deler).

**Effekter**

- `.gain(0.8)` – volum. `.velocity(0.7)`.
- `.pan(0.2)` – 0 venstre, 1 høyre. `.pan(sine)` – automatisert.
- `.lpf(800)` / `.hpf(200)` – filter. `.lpq(10)` – resonans.
- `.room(0.5).size(0.8)` – reverb. `.delay(0.5).delaytime(0.25).delayfeedback(0.4)`. Kortform: `.delay("0.5:0.25:0.4")`, `.room("0.5:0.8")`.
- **Orbit:** delay/reverb er globale per orbit (standard 1). Lag med ulike reverb-innstillinger bør ha ulik `.orbit(2)` – f.eks. pad på orbit 2, melodi på orbit 3. Kick/bass uten reverb kan bli på 1.
- `.attack(0.1).decay(0.2).sustain(0.5).release(0.3)` – ADSR (synther, virker også på samples). Kortform `.adsr("0.1:0.2:0.5:0.3")`.
- `.speed(2)` – sample-hastighet (negativ = bakover). `.begin(0.25).end(0.75)` – utsnitt. `.cut(1)` – stopper forrige sample i samme gruppe.
- `.crush(4)` – bitreduksjon. `.distort(0.5)`. `.coarse(8)`. `.compressor("-20:20:10:0.002:0.02")`.
- `.vowel("a e i o")`. `.phaser(2)`. `.shape(0.3)`.
- `.clip(0.5)` / `.legato(0.5)` – lengde på hver tone.
- `.duckorbit(2).duckattack(0.2).duckdepth(0.6)` på kick – sidechain: demper alt på orbit 2 ved hvert kick.

**Signaler (kontinuerlige verdier til modulasjon)**

- `sine`, `cosine`, `saw`, `square`, `tri`, `rand`, `perlin`.
- `.range(200, 2000)` – skaler signal. `.slow(4)` – tempo på signalet.
- Eks: `.lpf(sine.range(300, 3000).slow(8))`.

**Tonalt**

- `.scale("C4:minor")`, `.transpose(12)`, `.add(note(7))`, `.scaleTranspose(2)` – flytt innen skalaen.
- `chord("<C^7 Am7 Dm7 G7>").voicing()` – akkordvoicing. `.anchor("c4")` / `.mode("below")` styrer register.
- `chord("…").rootNotes(2)` – grunntoner i oktav 2 (bass som følger akkordene automatisk).
- `chord("…").voicing().arp("0 1 2 3")` – arpeggio av akkorden.

## Eksempler

Enkel trommeloop:

```js
setcps(0.5);
stack(s("bd ~ bd ~"), s("~ hh ~ hh").gain(0.7), s("~ ~ sd ~")).bank(
  "RolandTR808",
);
```

Melodi + bass + trommer:

```js
setcps(0.55);
stack(
  n("<0 2 4 3> [5 7] <4 2> 0*2").scale("C4:minor").s("gm_epiano1").room(0.4),
  n("<0 0 3 4>").scale("C2:minor").s("gm_synth_bass_1").lpf(600),
  s("bd*2, ~ hh*2, ~ ~ sd ~").bank("RolandTR909"),
);
```

Ambient pad med filtermodulasjon:

```js
setcps(0.3);
stack(
  chord("<Am7 Dm7 Fmaj7 E7>")
    .voicing()
    .s("gm_pad_warm")
    .room(0.9)
    .size(0.9)
    .lpf(sine.range(400, 2500).slow(16)),
  n("0 ~ 4 ~ 7 ~ 2 ~")
    .scale("A3:minor")
    .s("gm_xylophone")
    .degradeBy(0.4)
    .delay(0.5)
    .pan(rand),
);
```

Techno:

```js
setcps(0.54);
stack(
  s("bd*4").bank("RolandTR909").gain(1.1),
  s("~ hh").bank("RolandTR909").fast(2).gain(0.6).pan(sine.range(0.3, 0.7)),
  s("~ ~ cp ~")
    .bank("RolandTR909")
    .room(0.3)
    .sometimes((x) => x.speed(1.5)),
  note("a1 a1 a1 [a1 c2]")
    .s("sawtooth")
    .lpf(saw.range(200, 1200).slow(4))
    .lpq(8)
    .decay(0.15)
    .sustain(0),
);
```

## Arbeidsflyt

- `npm run dev` starter Vite på http://localhost:5173. Velg pattern i dropdown eller via `#filnavn` i URL.
- Lagring av en fil i `patterns/` re-evaluerer koden i nettleseren automatisk uten reload.
- Syntaksfeil vises i rødt panel i nettleseren; forrige gyldige pattern spiller videre.
