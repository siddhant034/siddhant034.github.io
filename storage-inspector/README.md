# Storage Inspector

A privacy-first static utility to inspect, search, edit, delete, import, and export this page's `localStorage` and `sessionStorage`.

## Scope

Browser security restricts web pages to storage belonging to their own origin. This app therefore inspects storage for the deployed GitHub Pages origin only; it cannot inspect arbitrary tabs. Use DevTools or a browser extension for other origins.

## Run locally

Open `index.html` in a modern browser (some browsers restrict storage on `file:` URLs; serve this directory over localhost if needed).

No dependencies or network requests are required by the app.
## Smoke tests

Open `tests.html` from the same origin as `index.html`. The browser-based harness seeds disposable test keys and checks search, edit, delete, storage-area switching, and confirmed clearing. It removes its test data when finished. The harness requires a modern browser and does not send data anywhere.

## Browser limits

This is a static web app, so it can access only storage belonging to its own origin. It cannot read another tab's origin. Structured JSON values imported from a file are stored as JSON text, because Web Storage stores strings.
