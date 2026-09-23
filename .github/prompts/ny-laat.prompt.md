---
description: "Lag en ny låt/pattern fra en beskrivelse (sjanger, stemning, tempo)"
name: "Ny låt"
argument-hint: "f.eks. rolig lo-fi i 80 BPM, eller mørk techno i A-moll"
agent: "agent"
---

Lag en ny Strudel-fil i `patterns/` basert på beskrivelsen: ${input:beskrivelse:Beskriv låten (sjanger, stemning, tempo, toneart)}

Følg [komposisjon](../instructions/komposisjon.instructions.md) og [sjangre](../instructions/sjangre.instructions.md).

Krav:

- Finn neste ledige nummer i `patterns/` (NN-kort-navn.js).
- Øverst: `// @title`, `// @by`, og en kommentar med BPM, toneart og akkordprogresjon.
- Hvert lag i egen `const` (drums, bass, keys, lead …), satt sammen med `stack()` eller `arrange()`.
- Minst fire lag med variasjon (`<>`, `.every`, `.sometimes`) i hvert.
- Bruk kun funksjoner fra funksjonslista. Ikke finn på funksjoner.
- Nivåer etter miks-tabellen; ingen `.room` på kick/bass.

Til slutt: si hvilket filnavn brukeren skal velge i dropdown (`#NN-navn`), og hva som kan justeres neste gang.
