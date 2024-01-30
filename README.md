# Mobil e-shop med Stripe (Examensarbete)

Detta projekt är en Butik applikation som är byggt med Node.js/Express backend och React.js frontend tillsammans med Stripe biblioteket för betalningar.

UI är byggt med Tailwind CSS och alla komponenter hittas på `./components`.

Teknologier/Packages som används är:

- React.js/Typescript
- Stripe
- Express
- MongoDB för databas och Mongoose (ORM)
- Cors
- Tailwind CSS
- Async Await

För att starta Servern:

1. Navigera till `./server` i terminalen
2. Hämta alla packages med `npm install`
3. Kör servern nu med `npm run dev`

Efter det startar du React:

1. Navigera till `./client` i terminalen
2. Hämta alla packages med `npm install`
3. Kör projektet med `npm run dev`

Nu kan du öppna butik applikationen på
**localhost:5173**

Servern körs på
**localhost:3000**

## Obligatoriska moment som jag valt (3st)

- En egendesignat databas med minst två tabeller. Ska vara normaliserad till lämplig nivå och lämpliga constraints i form av foreign keys etc. används.

_MongoDB databas består utav 2 tabeller (Users & Orders)_

- Koppling till en betallösning

_Projektet använder Stripe för betallösningar_

- Routing och snygga url:er. Alla anrop går via en dispatcher (index.php) och controllers hanterar url-strukturen. Eller liknande, inga anrop till specifika .php-filer.

_React router dom hantering av URL:er och i server används express med params för att hantera unika URL:er_

- Inloggning via OAuth, Google eller liknande tillämpas.

_Implementerat inloggning från grund i Express där lösenordhantering görs med bcrypt och användare sparas och hämtas från MongoDB atlas moln databas_
