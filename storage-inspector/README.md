# Storage Inspector

A privacy-first static utility to inspect, search, edit, delete, import, and export this page's `localStorage` and `sessionStorage`.

## Scope

Browser security restricts web pages to storage belonging to their own origin. This app therefore inspects storage for the deployed GitHub Pages origin only; it cannot inspect arbitrary tabs. Use DevTools or a browser extension for other origins.

## Run locally

Open `index.html` in a modern browser (some browsers restrict storage on `file:` URLs; serve this directory over localhost if needed).

No dependencies or network requests are required by the app.
