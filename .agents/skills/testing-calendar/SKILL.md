---
name: testing-calendar
description: Test the O Calendário Que Importa platform end-to-end. Use when verifying calendar, search, filters, timeline, player events, or Parabéns button changes.
---

# Testing: O Calendário Que Importa

Static HTML/CSS/JS platform — no build step, no framework.

## Dev Server

```bash
cd /home/ubuntu/repos/o-calendario-que-importa
python3 -m http.server 8080 &
```

Access at `http://localhost:8080`.

## Key Files

- `index.html` — entry point, header with logo and favicon link
- `js/events.js` — all event data (titles, players, dates, categories)
- `js/app.js` — rendering logic, filters, search, Parabéns button, timeline
- `css/style.css` — monocromatic (black/white/gray) styles
- `img/logo.png` — clock-themed project logo
- `img/socrates.png` — Sócrates icon for Ídolo category

## What to Test

### 1. Logo & Favicon
- Header logo should be `img/logo.png` (clock-themed, not Wikipedia SVG)
- Favicon should be `favicon.ico` (generated from logo)

### 2. "Aconteceu Hoje" Section
- Located between calendar and timeline
- Shows events matching today's month/day across all years
- Player birthdays of living players (`type: "aniversario"`, `playerStatus: "vivo"`) show a "Parabéns!" button
- Parabéns counter persists via `localStorage` key `corinthians_parabens`

### 3. Calendar Grid
- Monthly view with cards per day
- Each event shows category icon (Sócrates silhouette for Ídolo)
- Navigation via ◀/▶ buttons changes month

### 4. Search
- **Accent-sensitive**: JavaScript `.includes()` does not normalize accents
- "Chicao" will NOT find "Chicão" — must type exact accents
- To test search with accents, copy-paste from a known source or use accent keys
- Search covers title and description fields

### 5. Category Filters
- 6 categories: Títulos, Clássicos, Marcos, Ídolos, Recordes, Comunidade
- Clicking a filter hides all other categories from calendar
- "Todos" button resets to show all

### 6. Timeline
- Spans 1910 to current year
- Navigation: ◀◀ (decade back), ◀ (year back), ▶ (year forward), ▶▶ (decade forward)
- Can also click year markers on the horizontal bar to jump directly
- Historical players from 1920s-1930s may require many clicks to reach — clicking year markers on the bar is faster

## Common Pitfalls

- **Timeline navigation is slow via buttons**: Each ◀◀ jumps ~10 years. To reach early years (1910-1930), click directly on the year marker in the timeline bar instead of using buttons
- **Today's date matters**: "Aconteceu Hoje" content depends on the current system date. Player birthdays only show Parabéns if today matches their birth month/day
- **localStorage state**: Previous test runs may have leftover Parabéns counts. Clear localStorage if testing from a clean state: `localStorage.removeItem('corinthians_parabens')`
- **Community events**: Stored in `localStorage` key `corinthians_community_events`. These persist across sessions

## Devin Secrets Needed

No secrets required — this is a fully static site with no API calls or authentication.
