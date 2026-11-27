# Storage Inspector

A privacy-first static utility to inspect, search, edit, delete, import, and export this page's `localStorage` and `sessionStorage`.

## Scope

Browser security restricts web pages to storage belonging to their own origin. This app inspects storage for the deployed GitHub Pages origin only; it cannot inspect arbitrary tabs. Use DevTools or a browser extension for other origins.

## Run locally

Open `index.html` in a modern browser (some browsers restrict storage on `file:` URLs; serve this directory over localhost if needed). No dependencies or network requests are required by the app.

## Automated browser tests

Run the Playwright end-to-end suite locally:

```sh
npm install
npx playwright install chromium
npm test
```

The suite runs Chromium against a local static server and covers add/search/edit/delete, independent storage areas, JSON import validation, export download, clear confirmation/cancel/Escape, and accessible labels/keyboard activation. Test keys use a dedicated prefix and are removed after each test. The GitHub Actions workflow runs these checks on changes to this folder and uploads an HTML report on completion.

## Manual browser smoke tests

Open [tests.html](tests.html) from the same origin as `index.html` for a dependency-free smoke check. It runs in a same-origin iframe and cleans up its temporary keys.

## Browser limits

A static web app can access only storage belonging to its own origin. It cannot read another tab's origin. Structured JSON values imported from a file are stored as JSON text because Web Storage stores strings.
