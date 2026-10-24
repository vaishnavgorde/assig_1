# Fresh Basket — React + TypeScript + Redux Toolkit

A responsive grocery basket assignment with automatic special-offer calculations and unit tests.

## Tech stack
- React + TypeScript + Vite
- Redux Toolkit and React Redux for basket state
- Vitest and Testing Library dependencies for tests
- Responsive custom CSS and Lucide icons

## Business rules
1. Bread: £1.10
2. Milk: £0.50
3. Cheese: £0.90 — buy one, get one free (one free for each pair)
4. Soup: £0.60 — each soup gives 50% off one bread, up to the number of bread items in the basket
5. Butter: £1.20 — one-third off each butter

Currency is represented as integer pence throughout calculations. Discounts are calculated per applicable product line. Butter's one-third discount is rounded to the nearest penny per unit.

## Run locally
Requires Node.js 20+ (Node 22 recommended).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Run tests and production build
```bash
npm test
npm run build
npm run preview
```

## Project structure
```text
src/
  app/                 Redux store and typed hooks
  components/          Product list, basket, offer cards
  features/
    basket/             Redux slice and pure bill calculation
    products/           Product catalogue
  utils/                Currency formatting
  __tests__/            Pricing and reducer unit tests
  App.tsx
  main.tsx
  styles.css
```

## Why this structure?
- UI components render state and dispatch actions; they do not own basket state.
- Pricing logic is isolated in a pure function and is easy to test.
- Redux Toolkit uses Immer, so reducer code can use concise mutation-style updates safely.
- Prices are stored in pence to avoid floating-point arithmetic errors.
- Product data, basket state, and bill calculation are separated by responsibility.

## Deployment
### Netlify
1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

### Firebase Hosting (alternative)
```bash
npm install -g firebase-tools
firebase login
npm run build
firebase init hosting
```
Choose `dist` as the public directory and configure it as a single-page app (rewrite all URLs to `/index.html`), then run:
```bash
firebase deploy
```

## GitHub
```bash
git init
git add .
git commit -m "Build grocery basket assignment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/grocery-basket-assignment.git
git push -u origin main
```
Replace the remote URL with your own repository URL. Do not commit secrets or `.env` files.

## Scope notes
The nice-to-have Firestore persistence is not enabled in this version because it requires a Firebase project and configuration. The app is ready to run locally and deploy as a static site; add Firestore only if you want persistent baskets across devices/sessions.
