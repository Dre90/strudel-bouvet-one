---
description: "Use when choosing sounds/instruments for a Strudel pattern: which samples, drum machine banks, acoustic VCSL instruments, GM soundfonts or synths exist and when to use which. Lydkatalog for patterns/*.js."
applyTo: "patterns/**/*.js"
---
# Lydkatalog – hva som finnes og når det passer

Verifisert mot `soundMap` i vår Strudel-versjon (1.3.0). Alt her kan brukes rett i `s("…")`.
**Hovedregel: velg lyden som ligner mest på et ekte instrument for rollen. Synth bare når sjangeren krever det (sub-bass, pluck, pad) – ikke som standard.**

## 1. Trommer – samples

Standardnavn (fungerer uten bank, og med `.bank("…")`):

| Navn | Lyd | Navn | Lyd |
|---|---|---|---|
| `bd` | basstromme | `oh` | åpen hihat |
| `sd` | skarptromme | `cr` | crash |
| `rim` | rimshot | `rd` | ride |
| `cp` | klapp | `ht` `mt` `lt` | høy/mellom/lav tom |
| `hh` | lukket hihat | `sh` `cb` `tb` `perc` `misc` | shaker, cowbell, tamburin, perkusjon, diverse |

Flere varianter per navn: `s("hh:2")` eller `.n("0 1 2")`. Tall som er for høye går rundt.

**Bank-innhold** (`.bank("Navn")`, navn er case-insensitive):

| Bank | Karakter | Har |
|---|---|---|
| `RolandTR808` | rund, dyp, hiphop/lo-fi | bd cb cp cr hh ht lt mt oh perc rim sd sh – **ingen rd** |
| `RolandTR909` | hard, punchy, house/techno | bd cp cr hh ht lt mt oh rd rim sd – ingen cb/sh/tb |
| `RolandTR707` | ren, 80-talls pop | bd cb cp cr hh ht lt mt oh rim sd tb |
| `RolandTR505` | tynn, lo-fi charme | bd cb cp cr hh ht lt mt oh perc rd rim sd |
| `RolandTR626` | komplett, nøytral | alt inkl. rd sh tb perc |
| `LinnDrum` | varm 80-talls, funk/synthwave | bd cb cp cr hh ht lt mt oh perc rd rim sd sh tb |
| `AkaiLinn` | som LinnDrum, litt mørkere | bd cb cp cr hh ht lt mt oh rd sd sh tb |
| `AkaiMPC60` | boom-bap, knusete | bd cp cr hh ht lt misc mt oh perc rd rim sd |
| `EmuSP12` | 12-bit hiphop | bd cb cp cr hh ht lt misc mt oh perc rd rim sd |
| `OberheimDMX` | tørr, tight, 80-talls R&B | bd cp cr hh ht lt mt oh rd rim sd sh tb |
| `BossDR550` | allsidig, mange perc | alt inkl. sh tb perc misc |
| `CasioRZ1` | 8-bit, leketøy | bd cb cp cr hh ht lt mt rd rim sd |
| `RhythmAce` | orgel-trommemaskin, retro lounge | bd hh ht lt oh perc sd |
| `ViscoSpaceDrum` | rar, synth-perkusjon | bd cb hh ht lt misc mt oh perc rim sd |

141 banker totalt – disse er de nyttige. **Sjekk alltid at banken har lyden du bruker.**

## 2. Akustisk perkusjon (VCSL) – ekte instrumenter, uten bank

Uten tonehøyde, mange varianter (`:n` velger rundgang). Perfekt til lounge, lo-fi, latin-følelse, «organisk» hihat.

| Navn (varianter) | Bruk |
|---|---|
| `shaker_small`(16) `shaker_large`(6) `cabasa`(6) | shaker-lag i stedet for hihat |
| `hihat`(15) | ekte akustisk hihat |
| `snare_modern`(72) `snare_hi`(8) `snare_low`(20) | akustisk skarptromme |
| `bassdrum1`(8) `bassdrum2`(30) | akustisk basstromme (myk – bra til lounge) |
| `bongo`(28) `conga`(34) `cajon`(18) `darbuka`(20) `framedrum`(18) | håndtrommer |
| `clave`(6) `woodblock`(10) `slitdrum`(6) | tre-klikk |
| `tambourine`(7) `tambourine2`(7) `sleighbells`(6) | metallisk shaker |
| `clap`(10) | ekte klapp |
| `cowbell`(13) `agogo`(5) `triangles`(37) `fingercymbal` `belltree`(6) `marktrees`(6) `handbells`(3) | små bjeller/klang |
| `sus_cymbal`(25) `sus_cymbal2`(23) `gong`(7) | lange cymbaler/gong til overganger |
| `oceandrum`(3) `wineglass`(4) `wineglass_slow`(4) | atmosfære |
| `tom_stick` `tom_mallet` `tom2_*`(8) `timpani`(30) | tommer/pauker |
| `ka nam ta ki dhin na chaapu dhum tha …` | mridangam (indisk tromme) |

## 3. Akustiske toneinstrumenter (VCSL) – bruk med `note()`/`n().scale()`

Sample-baserte, tonet pr. tast. Klinger ekte. Bruk `.clip()` for lengde.

| Navn | Karakter | Passer til |
|---|---|---|
| `piano` | Salamander-piano, standard | alt |
| `steinway` | mørkere, fyldig flygel | lounge, jazz, ballader |
| `kawai` | lysere flygel | pop |
| `fmpiano` | DX7-aktig el-piano | lo-fi, R&B, 80-tall |
| `clavisynth` | clavinet/synth-tangent | funk |
| `vibraphone` `vibraphone_soft` `vibraphone_bowed` | vibrafon (myk = lounge) | lounge, jazz, ambient |
| `marimba` `balafon` `kalimba`…`kalimba5` `glockenspiel` `xylophone_*` | tre/metall-perkusjon med tone | lo-fi melodier, glitter |
| `harp` `folkharp` `psaltery_pluck` `dantranh` `strumstick` | strengeinstrumenter, plukk | intro, ambient, arpeggio |
| `tubularbells` `tubularbells2` `handchimes` | klokker | overganger, ambient |
| `sax` `sax_vib` `sax_stacc` `saxello` | saksofon | lounge-melodi (sparsomt!) |
| `harmonica` `harmonica_soft` `harmonica_vib` | munnspill | folk, lo-fi |
| `recorder_*` `ocarina*` | blokkfløyte/okarina | lekent, folk |
| `organ_4inch` `organ_8inch` `organ_full` `pipeorgan_*` | orgel | gospel, kirkelig |
| `super64*` | synth-lead-sample | retro |

## 4. GM-soundfonts – bredt utvalg, syntetisk-ish men brukbart

`gm_`-prefiks. Beste valg pr. rolle:

- **Tangenter**: `gm_piano` `gm_epiano1` (Rhodes) `gm_epiano2` (DX) `gm_vibraphone` `gm_marimba` `gm_kalimba` `gm_music_box` `gm_celesta`
- **Orgel**: `gm_drawbar_organ` `gm_rock_organ` `gm_accordion`
- **Gitar**: `gm_acoustic_guitar_nylon` `gm_acoustic_guitar_steel` `gm_electric_guitar_jazz` `gm_electric_guitar_clean` `gm_electric_guitar_muted`
- **Bass**: `gm_acoustic_bass` (kontrabass) `gm_electric_bass_finger` `gm_electric_bass_pick` `gm_fretless_bass` `gm_slap_bass_1` `gm_synth_bass_1` `gm_synth_bass_2`
- **Strykere**: `gm_string_ensemble_1` `gm_string_ensemble_2` `gm_synth_strings_1` `gm_violin` `gm_cello` `gm_pizzicato_strings` `gm_orchestral_harp`
- **Kor/stemme**: `gm_choir_aahs` `gm_voice_oohs` `gm_synth_choir`
- **Blås**: `gm_trumpet` `gm_muted_trumpet` `gm_trombone` `gm_french_horn` `gm_brass_section` `gm_alto_sax` `gm_tenor_sax` `gm_clarinet` `gm_flute` `gm_pan_flute` `gm_oboe`
- **Pads**: `gm_pad_new_age` `gm_pad_warm` `gm_pad_poly` `gm_pad_choir` `gm_pad_bowed` `gm_pad_halo` `gm_pad_sweep`
- **Lead**: `gm_lead_1_square` `gm_lead_2_sawtooth` `gm_lead_3_calliope` `gm_lead_6_voice` `gm_lead_8_bass_lead`
- **FX/etnisk**: `gm_fx_crystal` `gm_fx_atmosphere` `gm_fx_echoes` `gm_sitar` `gm_koto` `gm_steel_drums` `gm_taiko_drum`

Merk: navnene er **korte** (`gm_epiano1`, `gm_pad_warm`) – ikke `gm_electric_piano_1`.

## 5. Klassiske Dirt-samples (karakter/tekstur)

`casio`(3) `jazz`(8) `east`(9) `metal`(10) `insect`(3) `wind`(10) `crow`(4) `space`(18) `numbers`(9).
- `jazz:n` = korte jazz-trommeslag (bra som alternative hihats/snares i lo-fi).
- `east` = asiatisk perkusjon. `casio` = leketøy-toner. `space`/`wind`/`insect` = atmosfære.

## 6. Synther – bruk bevisst

| Synth | Når |
|---|---|
| `sine` | **sub-bass** (deep house, trap, EDM). Ellers nesten aldri alene. |
| `triangle` | myk pluck/lead som ikke skal stikke ut. Standard hvis `s()` mangler. |
| `square` | pluck med filterenvelope (`lpenv`), chiptune. |
| `sawtooth` | kun med kraftig `.lpf()`. Techno-bass, synthwave. |
| `supersaw` | bred trance/EDM-pad eller lead – **maks ett lag**. |
| `white` `pink` `brown` | støy-hihat/snare (elektronisk), sweeps. Bruk `hihat`/`shaker_small` når det skal høres ekte ut. |
| `crackle` | vinylknitring (`.density(0.05)`). Fint under lo-fi. |
| `z_*` (ZZFX) | 8-bit/glitch-effekter. |

Synth-parametre: `vib/vibmod`, `fm/fmh/fmdecay/fmsustain`, `penv/pdecay`, `lpf+lpenv+lpattack+lpdecay`, `unison/detune/spread` (supersaw), `noise(0.1)`, `tremolo/tremolodepth`.
**Worklet-lyder** (`supersaw`, `crush`, `coarse`, `shape`, `distort`, `tremolo`, `phaser`) lastes ved oppstart – appen venter på dem.

## 7. Sampler-verktøy

- `.n("0 2 1")` / `"hh:2"` – velg variant. Bytt variant med `<>` for liv: `s("hh*8").n("<0 1 2 1>")`.
- `.speed(0.9)` – langsommere/dypere (negativ = bakover). `.speed(rand.range(0.95, 1.05))` – naturlig variasjon.
- `.clip(0.5)` / `.legato()` – kutt lengde. `.cut(1)` – lukket hihat stopper åpen (`s("[oh hh]*4").cut(1)`).
- `.begin(0.1).end(0.6)` – utsnitt av sample.
- `.velocity(rand.range(0.6, 1))` – menneskelig dynamikk på ekte instrumenter.
- `.chop(8)` / `.striate(4)` / `.loopAt(2)` / `.fit()` – for lange samples/loops.

## 8. Anbefalte kombinasjoner per rolle (bakgrunnsmusikk)

| Rolle | Førstevalg | Alternativ |
|---|---|---|
| Kick | `bd` i passende bank | `bassdrum2` (akustisk, lounge) |
| Snare/backbeat | `sd`/`cp`/`rim` i bank | `snare_modern`, `clap`, `cajon` |
| Hihat | `hh` i bank med `.n("<0 1>")` | `hihat`, `shaker_small`, `jazz:n` |
| Ekstra perc | `shaker_small`, `tambourine`, `bongo`, `conga` | `perc` i bank |
| Bass | `gm_electric_bass_finger`, `gm_acoustic_bass` | `sine` (sub), `gm_synth_bass_1` |
| Akkorder | `gm_epiano1`, `fmpiano`, `steinway`, `gm_acoustic_guitar_nylon` | `piano`, `gm_drawbar_organ` |
| Pad | `gm_pad_warm`, `gm_string_ensemble_1`, `gm_choir_aahs` | `supersaw` (kun EDM) |
| Melodi | `vibraphone_soft`, `kalimba`, `gm_flute`, `harp` | `gm_electric_guitar_jazz`, `triangle` |
| Atmosfære | `crackle`, `wind`, `space`, `oceandrum`, `sus_cymbal` | `pink` med filter |
