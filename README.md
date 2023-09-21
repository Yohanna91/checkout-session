# Checkout Session with Stripe

Detta projekt är en Butik applikation som är byggt med Node.js/Express backend och React.js frontend tillsammans med Stripe biblioteket för betalningar.

UI är byggt med Tailwind CSS och alla komponenter hittas på `./components`.

Teknologier/Packages som används är:

- React.js/Typescript
- Stripe
- Express
- Cors
- Tailwind CSS
- Async Await

För att starta Servern:

1. Navigera till `./server` i terminalen
2. Hämta alla packages med `npm install`
3. Kör servern nu med `npm run start`

Efter det startar du React:

1. Navigera till `./client` i terminalen
2. Hämta alla packages med `npm install`
3. Kör projektet med `npm run dev`

Nu kan du öppna butik applikationen på
**localhost:5173**

### Övrigt

- Observera att flera saker som JSX element är inte typade då Vite tillkom med `@types/react` och `@types/react-dom`  så det räcker bara med att 
importera in React som vanligt i varje component så typar den JSX.

- Om du vill testa med din egna Stripe account. Ändra `publishable_key` i projektet till din egna.