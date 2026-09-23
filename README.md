# strudel-home-made

Lokal Strudel-arbeidsflate: skriv musikk som kode i VS Code, hør den i nettleseren.

## Kom i gang

```sh
npm install
npm run dev
```

Nettleseren åpner http://localhost:5173. Trykk **Start** (nettleseren krever et klikk før lyd).

## Bruk

- Patterns ligger i `patterns/*.js`. Velg aktiv fil i dropdown, eller via URL (`#02-melody-bass`).
- Lagre en fil i VS Code → koden re-evalueres umiddelbart uten at siden lastes på nytt.
- Ny fil i `patterns/` → siden lastes på nytt én gang og fila dukker opp i dropdown (trykk Start igjen).
- Syntaksfeil vises i rødt panel; forrige gyldige versjon spiller videre.
- «sound … not found» betyr enten at instrumentnavnet er feil (se lista i `.github/copilot-instructions.md`), eller at soundfonten fortsatt lastes – da forsvinner meldingen av seg selv.
- Snarveier i nettleseren: `Cmd/Ctrl+Enter` evaluer, `Cmd/Ctrl+.` stopp.

## Setlister (automatisk bytte)

Velg setliste i dropdown og trykk **▶ Spill setliste**. Den starter alltid fra første låt. Hver låt spilles så lenge `// @minutes N` i fila sier (standard `defaultMinutes`), så fades lyden ned, neste låt lastes og fades opp igjen (`crossfadeSeconds`). Statuslinja viser nedtelling og neste låt. **⏭ Neste** hopper videre med en gang. Bytter du låt manuelt i dropdown, slås setlista av.

Setlister ligger i `setlists/*.json` – én fil per liste, f.eks. [setlists/bouvet-one.json](setlists/bouvet-one.json):

```json
{
  "name": "Bouvet One",
  "crossfadeSeconds": 6,
  "defaultMinutes": 5,
  "songs": ["07-soft-lounge", "05-chill-hiphop", "..."]
}
```

Lag en ny fil i `setlists/` for en ny setliste – den dukker opp i dropdown etter reload.

## Prompts (skriv `/` i chat)

- `/ny-laat` – lag en ny låt fra en beskrivelse (sjanger, stemning, tempo).
- `/legg-til-lag` – legg til ett lag i den åpne fila.
- `/arranger` – gi fila struktur (intro, oppbygging, drop, break).
- `/endre` – én konkret endring (toneart, tempo, lyd).

## Lag musikk med AI

Be Copilot i VS Code, f.eks.: _«Lag en ny fil i patterns/ med en rolig lo-fi hiphop-loop i 85 BPM»_.

Kunnskapen Copilot bruker ligger i `.github/`:
- `copilot-instructions.md` – Strudel-syntaks og funksjoner (alltid lastet).
- `instructions/lyder.instructions.md` – lydkatalog: alle samples, banker, akustiske instrumenter, GM, synther.
- `instructions/komposisjon.instructions.md` – hva slags musikk vi lager (bakgrunnsmusikk), harmoni, miks, struktur.
- `instructions/sjangre.instructions.md` – tempo, trommer og lydvalg per sjanger.

## Lisens

Strudel er AGPL-3.0. Dette prosjektet følger samme lisens.
