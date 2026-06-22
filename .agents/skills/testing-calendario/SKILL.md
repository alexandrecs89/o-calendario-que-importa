---
name: testing-calendario
description: Test the O Calendário Que Importa web app end-to-end. Use when verifying calendar, filters, badges, modals, or player data changes.
---

# Testing O Calendário Que Importa

## Dev Server

```bash
cd /home/ubuntu/repos/o-calendario-que-importa
python3 -m http.server 8080
```

The app is a static site (HTML/CSS/JS). No build step needed. Access at `http://localhost:8080`.

## Key Test Scenarios

### 1. Multi-Category Badges
- Players can belong to multiple categories (e.g., `categories: ["idolo", "ex_jogador"]`)
- The `getEventCategories(event)` helper in `js/app.js` returns `event.categories || [event.category]`
- Verify badges render correctly in:
  - "Aconteceu Hoje" cards
  - Event modal (click any event)
  - Calendar day cells

### 2. Filter Logic
- Filter buttons: Todos, Título, Clássico, Marco, Ídolo, Jogador, Ex-Jogador, Recorde, Comunidade
- Multi-category events appear in ALL matching filters (e.g., Ralf appears in both Ídolo AND Ex-Jogador)
- Single-category events only appear in their own filter
- "Todos" shows everything

### 3. Calendar & Aconteceu Hoje
- Calendar shows events for the current month with category icons
- "Aconteceu Hoje" shows events that happened on today's date in previous years
- Player birthdays show "Parabéns!" button if `playerStatus: "vivo"`
- Parabéns counter persists via localStorage

### 4. Event Modal
- Click any event (in calendar or Aconteceu Hoje) to open modal
- Modal shows: date, title, category badges, description, action buttons
- Action buttons: "Sugerir vídeo" / "Assistir vídeo", "Sugerir reportagem" / "Ver reportagem", "Reportar erro"
- Buttons with existing URLs open links; without URLs they prompt for suggestions (saved to localStorage)

### 5. Timeline
- Navigate years with arrows or click year dots
- Shows events for the selected year with category badges

### 6. Search
- Search bar at top-right accepts event names, player names, dates
- Note: search might be accent-sensitive ("Chicao" won't find "Chicão")

## Testing Tips

- **Date-dependent tests**: "Aconteceu Hoje" content changes daily. Check `js/events.js` to find events matching today's date.
- **Filter verification**: When a filter is active, verify BOTH what appears AND what is correctly hidden.
- **Multi-category verification**: Best tested on dates where both multi-category and single-category players have events (e.g., June 9 has Ralf [idolo+ex_jogador] and Danilo Avelar [ex_jogador only]).
- **localStorage**: Clear localStorage to reset Parabéns counters and community suggestions.
- **Backward compatibility**: Always verify that non-player filters (Título, Clássico, Marco, Recorde) still work correctly after any player-related changes.

## File Structure

- `index.html` — Main HTML with filter buttons
- `js/app.js` — Application logic (rendering, filtering, modals)
- `js/events.js` — Event database (179 events)
- `css/style.css` — Styles (monocromatic theme)
- `img/` — Logo, favicon, Sócrates icon

## Devin Secrets Needed

None — this is a static site with no backend or API keys.
