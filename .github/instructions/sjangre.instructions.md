---
description: "Use when the user asks for music in a specific genre or style (house, techno, lo-fi, hiphop, trap, drum and bass, ambient, synthwave, funk, jazz, pop). Tempo, drum pattern, sound choice and feel per genre for Strudel."
applyTo: "patterns/**/*.js"
---

# Sjanger-oppskrifter

Bruk sammen med [komposisjon.instructions.md](./komposisjon.instructions.md). Alle eksempler er startpunkter – tilpass etter ønske.
Tempo: `setcps(bpm / 60 / 4)`.

| Sjanger           | BPM     | setcps     | Trommer (mini-notasjon)                                                             | Bank / lyder              | Kjennetegn                                                                                          |
| ----------------- | ------- | ---------- | ----------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| **Chill house**   | 115–122 | 0.48–0.51  | `bd*4, ~ cp ~ cp, [~ hh]*4` + `shaker_small*8`                                      | TR909 kick `.lpf(2500)`, TR808 clap, `shaker_small` | `gm_epiano1`-stabs med `^7`/`m7`, `gm_electric_bass_finger` offbeat, `gm_pad_warm` lav, `vibraphone_soft` sparsomt |
| **Deep house**    | 118–124 | 0.49–0.52  | `bd*4, [~ hh]*4, ~ oh ~ oh, rim(3,8)`                                               | RolandTR909 / TR808       | `sine` sub + `gm_epiano1`/`gm_drawbar_organ`-stabs med `.struct`, `gm_pad_warm`, `m9`-akkorder, `.room(0.8)` |
| **Lo-fi hiphop**  | 70–90   | 0.29–0.375 | `bd ~ [~ bd] ~, ~ sd ~ sd, hh*4` + `.swingBy(0.1, 8)`                               | RolandTR808 / AkaiMPC60 / EmuSP12 | `gm_epiano1`/`fmpiano` med `^7`/`m9`, `.crush(6)`, `.lpf(2000)`, `crackle`, `jazz:n` som ekstra perc, `gm_acoustic_bass` |
| **Downtempo**     | 85–95   | 0.35–0.40  | `bd ~ ~ bd ~ ~ [~ bd] ~, ~ ~ sd ~ ~ ~ sd ~, hh*8`                                   | RolandTR808 / OberheimDMX | Tung, treg groove, `gm_electric_guitar_jazz`, `handchimes`/`tubularbells`, `gm_string_ensemble_1` pad |
| **Soft lounge / nu-jazz** | 90–105 | 0.375–0.44 | `bassdrum2 ~ ~ [~ bassdrum2], ~ rim ~ rim, hihat*4` + `.swingBy(0.12, 4)`   | akustisk: `bassdrum2` `hihat` `snare_modern` `shaker_small` | `steinway`/`gm_piano` med `ii7–V7–Imaj7`, `gm_acoustic_bass` walking, `vibraphone_soft`, `sax_vib` sparsomt, `gm_string_ensemble_1` |
| **Bossa / latin-lounge** | 120–135 | 0.50–0.56 | `bassdrum2 ~ bassdrum2 ~, rim(3,8), shaker_small*8, ~ clave ~ [~ clave]` + `bongo`/`conga` | akustisk VCSL           | `gm_acoustic_guitar_nylon` akkorder `.struct("x ~ x [~ x]")`, `gm_acoustic_bass` `"0 ~ 4 ~"`, `gm_flute` melodi, `^7`/`m7`/`6`-akkorder |
| **Chill EDM (half-time)** | 95–105 | 0.40–0.44 | `bd ~ ~ bd ~ ~ bd ~, ~ ~ cp ~ ~ ~ cp ~, hh*8`                                 | RolandTR909               | `sine` sub, `gm_pad_warm`/`supersaw` (én!) pad, `gm_kalimba`/`gm_music_box` pluck, `gm_choir_aahs`, myke oppbygginger |
| Ambient           | 60–80   | 0.25–0.33  | ingen eller `shaker_small?*4` med `.gain(0.2)`                                      | `gm_pad_warm`, `gm_flute`, `harp`, `handchimes` | Lange akkorder (`.slow(2)`), `.room(0.9).size(0.9)`, `.lpf(sine.range(...).slow(16))`, `.degradeBy`, `wind`/`oceandrum` |
| House             | 120–128 | 0.50–0.53  | `bd*4, ~ cp ~ cp, [~ hh]*4, ~ oh ~ oh`                                              | RolandTR909               | Firetakt-kick, åpen hihat på offbeat, akkord-stabs, offbeat-bass                                    |
| Techno            | 128–140 | 0.53–0.58  | `bd*4, ~ ~ cp ~, hh*8, rim(3,8)`                                                    | RolandTR909               | Én akkord/tone, filtersveip, `sawtooth`-bass, hypnotisk repetisjon                                  |
| Minimal / deep    | 120–124 | 0.50–0.52  | `bd*4, hh(5,8), ~ sd ~ ~`                                                           | RolandTR808               | Få elementer, sub-bass, mye `.room`, små `.sometimes`-variasjoner                                   |
| Boom bap / hiphop | 85–95   | 0.35–0.40  | `bd ~ ~ bd ~ ~ bd ~, ~ ~ sd ~ ~ ~ sd ~, hh*8`                                       | RolandTR808 / AkaiMPC60   | Tung kick/snare, sample-følelse, `.speed(0.9)`                                                      |
| Trap              | 130–150 | 0.54–0.62  | `bd ~ ~ ~ ~ ~ bd ~, ~ ~ ~ ~ sd ~ ~ ~, hh*16` + `hh` med `.sometimes(x => x.ply(2))` | RolandTR808               | Half-time-følelse, 808-kick med `.lpf(300)`, hihat-ruller, mørk moll                                |
| Drum & bass       | 170–176 | 0.71–0.73  | `bd ~ ~ ~ ~ ~ [~ bd] ~, ~ ~ sd ~ ~ ~ sd ~, hh*16`                                   | RolandTR909               | Rask break, sub-bass (`sine` oktav 1), pads med `.room(0.8)`                                        |
| Synthwave         | 100–118 | 0.42–0.49  | `bd ~ bd ~, ~ sd ~ sd, hh*8`                                                        | LinnDrum                  | `sawtooth`-arpeggio (`.arp("0 1 2 3")` på akkorder), `supersaw`-pad, i–VI–III–VII                   |
| Funk              | 100–115 | 0.42–0.48  | `bd ~ [~ bd] ~, ~ sd ~ [sd sd], hh*16` med `.gain("1 0.6 0.8 0.6")`                 | RolandTR808 / akustisk    | Synkopert bass (`"0 ~ [~ 0] 0 [~ 7]"`), korte akkord-stabs (`.clip(0.3)`), `7`-akkorder             |
| Jazz (enkel)      | 110–140 | 0.46–0.58  | `~ hh ~ hh, rd*4` + `.swingBy(0.15, 4)`                                             | –                         | `gm_piano` med `ii7–V7–Imaj7`, walking bass (`"0 2 4 5"` i skala), `.velocity(rand.range(0.5, 1))`  |
| Pop               | 100–120 | 0.42–0.50  | `bd ~ bd ~, ~ cp ~ cp, hh*8`                                                        | RolandTR909 / LinnDrum    | I–V–vi–IV, klar melodi i oktav 4–5, `gm_piano` + `gm_pad_warm`                                      |

## Sjangerdetaljer

**Soft house (vår hussjanger – referanse: Spotify «Soft Lounge»)** – 110–122 BPM, dur eller dorisk, alltid `^7`/`m7`/`m9`. Oppskrift som fungerer (se `patterns/10–15`):
- `const prog = chord("<A A A A B B B B>")` – **8 takter** med A- og B-del, ikke 4. Alle lag bygges fra `prog` (`.voicing()`, `.rootNotes(2)`, `.arp()`), så alt følger akkordene.
- Kick `bd*4` TR909/LinnDrum `.lpf(1500–2200)` + `.duckorbit(2).duckattack(0.3).duckdepth(0.4)` – myk sidechain-pumping på akkordlagene (orbit 2).
- Bass `prog.rootNotes(2).struct("~ x ~ x").s("gm_electric_bass_finger").lpf(500)`.
- Akkorder: `gm_epiano1`/`gm_epiano2`/`gm_piano` med `.struct("~ x ~ [~ x]")`, eller `gm_acoustic_guitar_nylon`/`gm_electric_guitar_muted` stabs, eller `.arp("<0 1 2 3 2 1>*2")` på piano/harpe.
- Pad: `gm_pad_warm`/`gm_string_ensemble_1`/`gm_choir_aahs` lavt (0.15–0.25) med sakte `.lpf(sine…slow(16–24))`.
- Perkusjon: `shaker_small`/`shaker_large` med `.n("<0 1 2 3>")`, `bongo`/`conga` sparsomt, `rim`/`tambourine`.
- Hook: `marimba`, `kalimba`, `vibraphone`, `gm_flute`, `harp` – `<>`-motiv over 8 takter, `degradeBy(0.2–0.3)`, delay 3/16.
- Varianter: **balearic/nu-disco** (LinnDrum, `gm_electric_guitar_muted`, funky bass, C-dur), **organic** (håndperkusjon, kalimba, dorisk), **lo-fi house** (MPC/SP12, `crush(7)`, `crackle`), **melodisk** (piano-arp, strykere, kor), **sunset** (110 BPM, DX-piano, fløyte, harpe).

**Chill house** – bass på offbeat: `n("~ 0 ~ 0").scale("F1:major").s("gm_electric_bass_finger").lpf(600)`. Stabs: `chord("<F^7 Dm7 Gm7 C7>").voicing().struct("~ x ~ [~ x]").s("gm_epiano1").clip(0.5)`. Shaker: `s("shaker_small*8").n("<0 1 2 3>").gain("0.2 0.3")`.

**Soft lounge** – trommer som en jazztrio: `s("bassdrum2 ~ ~ [~ bassdrum2]").n("<0 3>")`, `s("hihat*4").n("<0 1 2 1>").swingBy(0.12, 4)`, `s("~ rim ~ rim").bank("RolandTR808")`. Walking bass: `n("<[0 ~ 4 ~]!3 [0 2 4 5]>").add(n("<0 5 1 4>")).scale("Bb1:major").s("gm_acoustic_bass")`.

**Bossa** – klassisk clave-mønster `"~ clave ~ [~ clave], clave ~ ~ clave"`, gitar `chord("<Am7 D7 Gm7 C7>").voicing().struct("x ~ x [~ x] ~ x ~ x").s("gm_acoustic_guitar_nylon").clip(0.6)`.

**Lo-fi** – nøkkelen er ufullkommenhet: `.crush(6)`, `.speed(0.98)`, `.velocity(rand.range(0.6, 0.9))`, vinylknitring `s("crackle*4").density(0.06).gain(0.2)`. Bruk `jazz:n` som alternativ perc.

**House** – bass på offbeat: `n("~ 0 ~ 0").scale("A1:minor")`. Akkord-stab: `chord("<Am7 Am7 Dm7 Em7>").voicing().struct("~ x ~ x").clip(0.3)`.

**Techno** – ett bassriff som gjentas: `note("a1*4").s("sawtooth").lpf(saw.range(200, 2000).slow(16)).lpq(6).decay(0.12).sustain(0)`. Break hver 8. takt: `.mask("<1 1 1 1 1 1 1 0>")` på kick og bass.

**Trap** – 808-bass: `note("<a1 a1 f1 g1>").s("sine").lpf(200).decay(0.5).sustain(0.2).gain(0.9)`. Hihat-ruller: `s("hh*8").sometimesBy(0.3, x => x.ply(3))`.

**Ambient** – ingen faste slag. `chord("<Am9 Fmaj7 C^7 G>").voicing().slow(2).s("gm_pad_warm").attack(1).release(2).room(0.9).size(0.95)`. Melodi-fragmenter (`harp`, `handchimes`, `gm_flute`) med `.degradeBy(0.5)` og `.delay(0.6)`.

**Synthwave** – arpeggio: `chord("<Am F C G>").voicing().arp("0 1 2 3 2 1").fast(2).s("sawtooth").lpf(1500).decay(0.2).sustain(0)`.

## Når sjangeren ikke er nevnt

Spør ikke – velg noe som passer stemningsordene i prompten. Standard for dette prosjektet er **bakgrunnsmusikk** (se komposisjon), så hold deg til de fete radene i tabellen:

- «rolig», «chill», «kveld», «kaffe» → lo-fi, soft lounge eller downtempo
- «pause», «konferanse», «bakgrunn» → chill house eller soft lounge
- «sommer», «strand», «varm» → bossa / latin-lounge
- «energisk», «fest», «dans» → deep house eller house
- «mørk», «hard», «industriell» → techno
- «glad», «lys» → pop med I–V–vi–IV
- «retro», «80-tall» → synthwave
- «svevende», «meditasjon» → ambient
