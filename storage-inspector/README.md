# Storage Inspector

A privacy-first static utility to inspect, search, edit, delete, import, and export this page's `localStorage` and `sessionStorage`.

## Scope

Browser security restricts web pages to storage belonging to their own origin. This app inspects storage for the deployed GitHub Pages origin only; it cannot inspect arbitrary tabs. Use DevTools or a browser extension for other origins.

## Run locally

Open `index.html` in a modern browser (some browsers restrict storage on `file:` URLs; serve this directory over localhost if needed). No dependencies or network requests are required by the app.

## Browser smoke tests

Open [tests.html](tests.html) from the same origin as `index.html`. The test harness uses a same-origin iframe and disposable keys to verify search, edit, delete, JSON import/export action, switching storage areas, and clear confirmation/clearing. It reports a pass/fail summary and cleans up its test data.

The suite exercises real browser Web Storage and requires a modern browser. It does not send test data anywhere.

## Browser limits

A static web app can access only storage belonging to its own origin. It cannot read another tab's origin. Structured JSON values imported from a file are stored as JSON text because Web Storage stores strings.
