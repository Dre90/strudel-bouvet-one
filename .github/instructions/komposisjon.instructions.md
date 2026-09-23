---
description: "Use when composing, writing or improving music in Strudel: chord progressions, melody, bassline, drum patterns, song structure/arrangement, mixing levels. Grunnleggende musikkteori og komposisjon for patterns/*.js."
applyTo: "patterns/**/*.js"
---

# Komposisjon i Strudel

Syntaks og funksjonsliste ligger i [copilot-instructions.md](../copilot-instructions.md). Lydvalg i [lyder.instructions.md](./lyder.instructions.md). Denne fila handler om _hva_ du skal skrive, ikke _hvordan_.

## Hva slags musikk vi lager

**Bakgrunnsmusikk til konferansepauser, kontor, sosiale settinger.** Den skal kunne stå på i 30 minutter uten at noen blir sliten eller distrahert.

Det betyr:

- **Rolig energi.** 80–122 BPM. Ingen drops som krever oppmerksomhet. Oppbygginger skal være myke.
- **Organisk lydbilde.** Ekte instrumenter (piano, epiano, vibrafon, kontrabass, gitar, shaker, bongo) foran synther. Synth er greit som sub-bass eller én pad – ikke som hovedstemme.
- **Ingen skarpe transienter.** Lavpass på kick (`.lpf(1500–3000)`), dempet clap/snare, hihat med `.hpf` og lav gain. Ikke hvit støy-hihat med mindre den er svak.
- **Lite melodi, mye harmoni.** Melodilinjer skal være sparsomme (`degradeBy(0.3+)`, mange `~`) og i mellomregister. Akkorder og pad bærer låten.
- **Varme akkorder.** `^7`, `m7`, `m9`, `add9`. Unngå rene power-chords og dominant-7 uten oppløsning.
- **Variasjon uten drama.** Lag kommer og går over 8–16 takter. `arrange()` med intro/groove/full/break er standard – men «full» skal fortsatt være behagelig.
- **Loopbar.** Låten sløyfer i setliste-modus; slutten skal kunne gå rett inn i starten (avslutt med et rolig parti).
- **Kort.** `// @minutes 3` er standard. 3 minutter × 10 låter = 30 min sett. Lengre enn 4 min blir repetitivt.
- **Menneskelig.** `.velocity(rand.range(0.6, 0.9))`, `.swingBy`, `.n("<0 1 2>")` på samples, `.late(0.01)` på snare. Perfekt kvantisert = kaldt.

### Mot repetisjon

- **8-takters progresjon, ikke 4.** `chord("<A A A A B B B B>")` der B er en variant (f.eks. bytt ut to akkorder). Bygg alle lag fra samme `prog`.
- Melodimotiv med `<>` over 8 takter: `n("<0 2 ~ 4 ~ 2 0 ~> …")`.
- `.someCyclesBy(0.2–0.3, x => x.degradeBy(0.4))` på perkusjon og arpeggio – noen takter tynnere.
- `.every(8, …)` / `.lastOf(8, …)` – fills og oktavsprang.
- Sakte filtersveip `.lpf(sine.range(…).slow(16–32))` på pad/arp.
- `arrange()` med 4–5 deler der lag kommer og går.

### Setliste-flyt

En setliste skal holde **én stil**. Ikke hopp mellom lounge/hiphop/house – det bryter stemningen. Varier _innen_ stilen (instrumenter, toneart, 110–122 BPM) og ordne låtene så tempo og energi endrer seg gradvis: rolig åpning → litt mer driv → roligst til slutt. Nabotonearter (F→C→G, Am→Em→Dm) gir mykere overganger.

Sjangre som passer: chill house, deep house, lo-fi hiphop, downtempo, nu-jazz/lounge, bossa/latin-lounge, ambient, chill EDM (half-time). Se [sjangre.instructions.md](./sjangre.instructions.md).

## Arbeidsmåte

1. Velg **tempo, toneart og sjanger** først (se [sjangre.instructions.md](./sjangre.instructions.md)). Skriv det som kommentar øverst.
2. Bygg i denne rekkefølgen: trommer → bass → akkorder → melodi → effekter/variasjon.
3. Legg hvert lag i en `const` med beskrivende navn, og sett dem sammen til slutt med `stack()` eller `arrange()`.
4. Én cycle = én takt (4/4) med mindre annet er sagt. Hold alle lag i samme cycle-lengde, bruk `<...>` for progresjoner over flere takter.

```js
// Mal
// @minutes 5
setcps(0.5); // 120 BPM
const drums = s("bd*2, ~ hh*2, ~ ~ sd ~").bank("RolandTR909").lpf(3000);
const shaker = s("shaker_small*8").n("<0 1 2 1>").gain(0.3).hpf(3000);
const bass = n("<0 0 5 3>")
  .scale("C2:minor")
  .s("gm_electric_bass_finger")
  .lpf(600);
const keys = chord("<Cm7 Cm7 Fm7 Ab^7>")
  .voicing()
  .s("gm_epiano1")
  .room(0.4)
  .orbit(2);
const lead = n("<0 2 4 3> ~ <4 2> ~")
  .scale("C4:minor")
  .s("vibraphone_soft")
  .degradeBy(0.3)
  .orbit(3);
stack(drums, shaker, bass, keys, lead);
```

## Harmoni

- Velg toneart og hold deg i skalaen. Bruk `n(...).scale("X:mode")` for melodi og bass, `chord("...").voicing()` for akkorder – da blir alt automatisk i samme toneart.
- Akkordnavn i `chord()`: `C`, `Cm`, `C7`, `Cm7`, `C^7` (maj7), `Cm9`, `C^9`, `Csus4`, `Cdim7`, `Ch7` (halvdim). Bruk `^7`/`m7`/`m9` for varmere klang (jazz, lo-fi, R&B).
- Akkorder over flere takter: `chord("<Am7 Dm7 G7 C^7>")` – én akkord per cycle. Innen én takt: `chord("Am7 Dm7")`.
- Bassen skal spille **grunntonen** i akkorden. Enten `chord("...").rootNotes(2)` eller skala-tall som matcher: Am→0, Dm→3, G→6, C→2 i A-moll.

**Progresjoner etter stemning** (skala-trinn, deretter eksempel i én toneart):

| Stemning          | Trinn            | Eksempel                       | Passer til             |
| ----------------- | ---------------- | ------------------------------ | ---------------------- |
| Lys, pop          | I–V–vi–IV        | `C G Am F`                     | pop, house             |
| Melankolsk        | vi–IV–I–V        | `Am F C G`                     | pop, indie             |
| Mørk, drivende    | i–VI–III–VII     | `Am F C G` (i moll-perspektiv) | techno, synthwave      |
| Enkel moll        | i–iv–v–i         | `Am Dm Em Am`                  | ambient, dark          |
| Jazzy/lo-fi       | ii7–V7–Imaj7–vi7 | `Dm7 G7 C^7 Am7`               | lo-fi, jazz, R&B       |
| Statisk/hypnotisk | i (én akkord)    | `Cm7`                          | techno, minimal, drone |
| Blues             | I7–IV7–V7        | `C7 F7 G7`                     | blues, funk            |
| Sløv/varm         | Imaj7–vi7–ii7–V7 | `F^7 Dm7 Gm7 C7`               | lo-fi, neo-soul        |

## Melodi

- Bruk skala-tall med `n()`: `0` = grunntone, `2` = ters, `4` = kvint, `7` = oktav. Land på `0`, `2` eller `4` på sterke slag.
- Lag et **motiv** (2–4 toner) og gjenta det med små endringer, ikke helt nye toner hver takt. `<>` er verktøyet: `n("<0 0 2 3> 4 <2 4>")`.
- Pauser (`~`) er like viktige som toner. Ikke fyll alle 16-deler.
- Bevegelse: for det meste trinnvis (0→1→2), med enkelte sprang (0→4) for effekt.
- Variasjon uten nye toner: `.every(4, x => x.add(note(12)))`, `.off(1/8, x => x.add(note(7)).gain(0.5))`, `.sometimes(x => x.ply(2))`, `.degradeBy(0.2)`.
- Register: melodi i oktav 4–5, akkorder 3–4, bass 1–2. Unngå at melodi og akkorder ligger i samme oktav.

## Bass

- Spill grunntonen, følg akkordskiftene. Rytme viktigere enn tonevalg.
- Enkle mønstre: `"0 ~ 0 ~"`, `"0*2 ~ 0 [~ 0]"`, `"0 [~ 0] 0 0"`, offbeat house: `"~ 0 ~ 0"`.
- Legg på `.lpf(400–800)` for å holde bassen ren. Kort tone med `.decay(0.2).sustain(0)` eller `.clip(0.8)`.
- Oktavsprang for liv: `"0 0 7 0"` eller `.sometimes(x => x.add(note(12)))`.

## Trommer

- Grunnform: kick på 1 og 3, snare/clap på 2 og 4, hihat imellom. Bygg derfra.
- Skriv lag med komma: `s("bd ~ bd ~, ~ sd ~ sd, hh*8")`.
- Variasjon: `.every(4, x => x.fast(2))` (fill), `"bd*2 <bd [bd bd]>"`, `hh*8` → `"hh*8?"` (tilfeldige hull), `.sometimes(x => x.speed(1.2))`.
- Swing/groove: `.swingBy(0.1, 8)` på hihat, eller `.late(0.01)` på snare for laid-back-følelse.
- Åpen hihat på offbeat (`"~ oh"`) gir house/disco-følelse. Ride/perkusjon (`rim`, `cp`, `mt`) fyller ut.

## Struktur / arrangement

Ikke la alt spille hele tiden. Bygg opp og ned.

```js
const intro = stack(keys, hats);
const verse = stack(drums, bass, keys);
const drop = stack(drums, bass, keys, lead);
arrange([4, intro], [8, verse], [8, drop], [4, verse]); // antall cycles per del
```

- Alternativ: mute et lag i visse takter med `.mask("<1 1 1 0>")` (stille i hver 4. takt) eller `.mask("<0 0 1 1>")` (kommer inn etter 2 takter).
- Fills/overganger før en ny del: `.every(8, x => x.fast(2))` eller `.lastOf(8, x => x.ply(2))`.
- Filter-sveip for spenning: `.lpf(saw.range(200, 4000).slow(8))`.
- Typisk lengde: intro 4, vers 8, drop/refreng 8, break 4, drop 8, outro 4 cycles.

## Miks (nivåer og plassering)

| Lag          | gain     | Filter                          | Plassering                     | Orbit |
| ------------ | -------- | ------------------------------- | ------------------------------ | ----- |
| Kick         | 0.9–1.0  | `.lpf(1500–3000)` for mykhet    | midt                           | 1     |
| Bass         | 0.7–0.9  | `.lpf(500–800)`                 | midt                           | 1     |
| Snare/clap   | 0.5–0.8  | `.lpf(4000–6000)`               | midt, `.room(0.2–0.3)`         | 1     |
| Hihat/shaker | 0.25–0.5 | `.hpf(3000–5000)`               | `.pan(0.6)`                    | 1     |
| Akkorder     | 0.35–0.5 | `.hpf(200)` unngå basskollisjon | `.room(0.4+)`                  | 2     |
| Pad          | 0.2–0.35 | `.hpf(300)`, `.lpf(sine…)`      | bredt, `.room(0.7+)`           | 2     |
| Melodi       | 0.4–0.6  | –                               | `.pan(0.4)`, `.delay`, `.room` | 3     |

- Alt over 1.0 klipper lett når mange lag stables. Start lavt og løft det som mangler.
- Reverb (`.room`) på pad og melodi, **ikke** på kick og bass.
- **Orbit:** delay/reverb deles per orbit. Lag med ulik `.room`/`.delay` må ha ulik `.orbit(n)`, ellers overstyrer de hverandre.
- Delay på melodi: `.delay(0.3).delaytime(0.375).delayfeedback(0.4)` (3/16 = dotted eighth).

## Vanlige feil å unngå

- For mange toner samtidig → grøt. Færre lag, mer plass.
- Bass og akkorder i samme oktav → mudder. Bruk `.hpf(200)` på akkorder.
- Ingen variasjon → kjedelig etter 4 takter. Minst én `<>`, `.every` eller `.sometimes` per lag.
- Melodi som ikke matcher akkordene: bruk **samme skala** i `n().scale()` og velg akkorder fra den skalaen.
