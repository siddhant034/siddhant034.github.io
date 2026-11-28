# Command Menu

A dependency-free, keyboard-first command menu demo.

## Live demo

After GitHub Pages publishes this folder: https://siddhant034.github.io/command-menu/

## Features

- Open with the button or Ctrl/⌘ K
- Search titles, descriptions, groups, and keywords
- Grouped command results
- Arrow Up/Down, Home/End, Enter, and Escape
- Focus moves to search on open and returns to the previous element on close
- Tab and Shift+Tab stay within the open dialog
- Empty search state, selected-option announcement, focus-visible styles
- Click outside to dismiss

## Run locally

Serve the portfolio root with any static server and visit `/command-menu/`.

## Manual smoke checklist

1. Open with button and verify search receives focus.
2. Open with Ctrl K and Meta K.
3. Filter commands; confirm groups update and empty state appears.
4. Navigate with arrows/Home/End; Enter executes the highlighted command.
5. Escape and outside click close; focus returns to the invoking control.
6. Use keyboard only and verify focus outline.

This is a focused interaction demo, not a framework-specific npm package yet.