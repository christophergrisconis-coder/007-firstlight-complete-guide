# 007 First Light 100% Completion Guide Tracker

A polished, data-driven companion site for tracking 100% completion progress in **007 First Light**.

## What this includes

- 18 mission slots with mission-by-mission completion tracking
- Full walkthrough structure placeholders for each mission (easy to replace with verified route notes)
- 92 collectible records in the data layer:
  - 36 Playing Cards
  - 23 Intel / MI6 Files
  - 14 Mementos
  - 10 Postcards
  - 9 Legacy Items
- Challenge support per mission
- Achievement/trophy support with computed unlock progress
- Collectible lookup with filters (type, mission, search, found-only)
- Global completion percentage and category progress
- Local progress persistence (browser `localStorage`)

## Project structure

- `index.html`: app shell
- `styles.css`: responsive visual design
- `app/data.js`: missions, collectibles, challenges, achievements, totals
- `app/store.js`: state load/save/reset
- `app/progress.js`: all computed progress logic and filters
- `app/ui.js`: render functions/components
- `app/main.js`: app wiring and event handling

## Data-driven behavior

All counters and percentages are computed from structured records in `app/data.js`.
No UI counter is hardcoded independently.

## Running locally

This build is intentionally no-build and dependency-free.

1. Open `index.html` in a browser, or use VS Code Live Server.
2. Check/uncheck progress items to update mission/global totals instantly.
3. Use **Reset Local Progress** to clear browser-stored tracker state.

## Placeholder policy

Some route details and precise pickup location notes are intentionally marked as placeholders in the data layer where verified details are still pending. Expand these fields later without changing UI logic.

## Real gameplay background images

Background image slots are ready for approved gameplay screenshots.

Use the filename map in `assets/backgrounds/README.md` and add your own licensed images:

- Mission backgrounds: `assets/backgrounds/missions/m01.jpg` through `assets/backgrounds/missions/m18.jpg`
- Section backgrounds: files in `assets/backgrounds/pages/`

The app will automatically switch mission background when you select a different mission.
