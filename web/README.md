# Java Quest Tracker — Web

This is the web build of Java Quest Tracker using Vite + React + TypeScript.

## Scripts
- `npm run dev` — start local dev server
- `npm run build` — typecheck and build for production
- `npm run preview` — preview the production build locally
- `npm test` — run unit tests with Vitest
- `npm run coverage` — run tests with coverage report

## Testing
- Test runner: Vitest (configured in `vite.config.ts` under `test` key)
- DOM environment: jsdom
- Utilities: React Testing Library + jest-dom matchers
- Setup file: `src/setupTests.ts`
