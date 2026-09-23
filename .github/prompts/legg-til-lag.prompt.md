---
description: "Legg til ett nytt lag (melodi, bass, pad, perkusjon …) i den åpne pattern-fila uten å endre resten"
name: "Legg til lag"
argument-hint: "f.eks. en enkel melodi i oktav 5, eller åpen hihat på offbeat"
agent: "agent"
---

Legg til ett nytt lag i den aktive fila (${file}): ${input:lag:Hva slags lag? (instrument, rolle, register)}

Følg [komposisjon](../instructions/komposisjon.instructions.md).

Krav:

- Les fila først. Bruk **samme** `setcps`, toneart/skala og akkordprogresjon som allerede finnes.
- Nytt lag som egen `const` med beskrivende navn, lagt inn i eksisterende `stack()`/`arrange()`.
- Ikke endre eksisterende lag. Ikke fjern `setcps`.
- Registeret må ikke kollidere med eksisterende lag (sjekk oktaver, bruk `.hpf` ved behov).
- Sett gain etter miks-tabellen slik at det nye laget ikke dominerer.

Forklar i én setning hva laget gjør musikalsk.
