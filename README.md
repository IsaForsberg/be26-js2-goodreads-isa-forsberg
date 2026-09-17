# Good Reads

En förenklad Goodreads-klon, en one page app för att hålla koll på böcker du vill läsa och böcker du har läst.

## Om projektet

Good Reads är en personlig läslogg. Du lägger till böcker du är intresserad av, och när du har läst en bok kan du markera den som läst, sätta betyg (1–5 stjärnor) och skriva en kommentar om den. Appen håller reda på två hyllor:

- **Want to Read** — böcker du har lagt till men inte läst än
- **Have Read** — böcker du markerat som lästa, med betyg och kommentar

## Funktioner

- Lägg till en ny bok (titel + författare)
- Markera en bok som läst, den flyttar sig automatiskt till rätt hylla
- Sätt betyg på lästa böcker
- Skriv och spara en kommentar per läst bok
- Ta bort böcker från valfri hylla
- All data sparas i en firebasedatabas, så listan finns kvar mellan sidladdningar

## Teknik

- **Vite** + vanilla JavaScript (ES-moduler)
- **Firebase Realtime Database** som backend, via ett vanligt `fetch`-anrop mot Firebases REST-API
- **OOP**: varje bok representeras av en `Book`-instans med privata fält och kontrollerad åtkomst via getters/metoder

## Kom igång (för utvecklare)

1. Klona repot
2. Installera beroenden:
   ```
   npm install
   ```
3. Starta utvecklingsservern:
   ```
   npm run dev
   ```
4. Öppna länken som skrivs ut i terminalen (localhost)

Databas-URL:en till Firebase ligger direkt i `src/firebaserequest/getbooks.js` och återanvänds av de andra Firebase-anropen. Ingen nyckel eller liknande behövs.

## Filstruktur

- `src/main.js` — startpunkten: laddar in böckerna och kopplar på all interaktion
- `src/bookstate.js` — datalagret: håller bokdata i minnet, hämtar och mappar den från Firebase
- `src/eventhandlers.js` — hanterar användarens interaktioner (klick, formulär) och kopplar dem till rätt DOM-element
- `src/render.js` — bygger om listorna i DOM:en utifrån aktuell bokdata
- `src/Book.js` — `Book`-klassen
- `src/firebaserequest/` — ett anrop per fil (`getbooks.js`, `addbook.js`, `updatebook.js`, `deletebook.js`), alla mot samma Firebase-databas via REST
- `src/style.css` — styling
