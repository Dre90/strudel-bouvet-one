---
description: "Gjør én konkret endring i den åpne pattern-fila (bytt akkorder, endre tempo, gjør bassen tyngre, mer swing …)"
name: "Endre"
argument-hint: "f.eks. bytt til D-moll, eller gjør trommene mer lo-fi"
agent: "agent"
---

Gjør denne endringen i den aktive fila (${file}): ${input:endring:Hva skal endres?}

Regler:

- Én musikalsk endring om gangen. Ikke rydd, omstrukturer eller «forbedre» noe annet.
- Hvis toneart endres: oppdater **alle** `scale()`, `chord()` og `note()`-verdier så de henger sammen. Oppdater også kommentaren øverst.
- Hvis tempo endres: bruk `setcps(bpm / 60 / 4)` og skriv BPM i kommentar.
- Se [komposisjon](../instructions/komposisjon.instructions.md) for hvordan endringen gjøres musikalsk riktig.
- Kun funksjoner fra funksjonslista.

Svar med én setning om hva som ble endret og hvorfor det påvirker lyden slik.
