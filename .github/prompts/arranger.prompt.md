---
description: "Gi den åpne pattern-fila mer variasjon og en arrangert struktur (intro, oppbygging, drop, break, outro)"
name: "Arranger"
argument-hint: "f.eks. 32 takter med intro og drop, eller bare mer variasjon"
agent: "agent"
---

Gjør den aktive fila (${file}) mer levende: ${input:oensker:Hva vil du ha? (lengde, deler, hvor mye variasjon)}

Følg struktur-avsnittet i [komposisjon](../instructions/komposisjon.instructions.md).

Fremgangsmåte:

1. Les fila. Hvis lagene ikke ligger i egne `const`, refaktorer dem til det først – uten å endre lyden.
2. Lag deler (`intro`, `verse`, `drop`, `break`, `outro`) som `stack()` av utvalgte lag.
3. Sett dem sammen med `arrange([n, del], …)`, eller bruk `.mask("<…>")` på enkeltlag om det er enklere.
4. Legg inn minst én fill/overgang før nye deler (`.lastOf(n, …)` eller `.every(n, …)`) og ett filtersveip.
5. Behold `setcps`, toneart og alle eksisterende lyder.

Oppsummer strukturen som en liste: del – antall cycles – hvilke lag.
