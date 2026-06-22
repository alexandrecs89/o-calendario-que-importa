---
name: testing-calendario-corinthians
description: Test the O Calendário Que Importa platform end-to-end. Use when verifying calendar UI, event modals, interactive buttons, localStorage persistence, or any visual/functional changes.
---

# Testing O Calendário Que Importa

## Dev Server

Start the local dev server from the repo root:

```bash
cd /home/ubuntu/repos/o-calendario-que-importa
python3 -m http.server 8080 &
```

The app runs at `http://localhost:8080`. No build step needed — it's a static HTML/CSS/JS site.

## Deployed Preview

The site may also be deployed at `https://o-calendario-que-importa-ovdueduv.devinapps.com`. Use `deploy frontend` with `dir` set to the repo root to redeploy.

## Key Files

- `index.html` — Main page structure
- `js/app.js` — Application logic (calendar rendering, modals, event listeners, localStorage)
- `js/events.js` — Event database (all historical events, player birthdays, deaths)
- `css/style.css` — All styling
- `img/logo.png` — Project logo
- `img/socrates.png` — Sócrates icon used for Ídolo category

## Testing Strategy

### Calendar Navigation
- Use ◀ / ▶ buttons to navigate months
- Click on day cells with events to see event cards
- Click event cards to open the detail modal

### Event Modal Testing
The modal shows event details and action buttons. Key combinations to test:

| Scenario | Video field | News field | Error button |
|----------|------------|------------|-------------|
| Both URLs exist | "Assistir vídeo" `<a>` link | "Ver reportagem" `<a>` link | "Reportar erro" `<button>` |
| Only videoUrl | "Assistir vídeo" `<a>` link | "Sugerir reportagem" `<button>` | "Reportar erro" `<button>` |
| Only newsUrl | "Sugerir vídeo" `<button>` | "Ver reportagem" `<a>` link | "Reportar erro" `<button>` |
| Neither URL | "Sugerir vídeo" `<button>` | "Sugerir reportagem" `<button>` | "Reportar erro" `<button>` |

### Sample Events for Testing
- **Both videoUrl + newsUrl:** Libertadores 2012 (id:42) — July 4
- **Only videoUrl:** Final Libertadores ida (id:58) — June 27
- **Neither:** Any player birthday, e.g. Ralf (id:314) — June 9

### Interactive Button Testing
The buttons use `window.prompt()` for user input. In automated environments, `prompt()` may be blocked. Workaround: override `prompt` via browser console before clicking:

```javascript
// Simulate user submitting a value
var orig = window.prompt;
window.prompt = function() { return "https://youtube.com/test"; };
document.querySelector('.event-action--suggest-video').click();
window.prompt = orig;
```

To simulate cancel:
```javascript
window.prompt = function() { return null; };
```

### localStorage Keys
Verify persistence after interactions:
- `corinthians_error_reports` — Error reports by event ID
- `corinthians_video_suggestions` — Video URL suggestions by event ID  
- `corinthians_news_suggestions` — News URL suggestions by event ID
- `corinthians_parabens` — Birthday "Parabéns" counts by event ID
- `corinthians_community_events` — User-added community events

Check via console: `localStorage.getItem('corinthians_video_suggestions')`

### "Aconteceu Hoje" Section
Shows events matching today's date (month+day) in other years. Player birthdays of living players show a "Parabéns!" button with a counter.

### Filters & Search
- Category filter buttons above the calendar (Todos, Título, Clássico, Marco, Ídolo, Recorde, Comunidade)
- Search bar accepts event names, player names, dates
- Note: search may be accent-sensitive ("Chicao" won't find "Chicão")

### Timeline
The timeline at the bottom shows events from 1910 to present. Navigate with ◀◀/◀/▶/▶▶ buttons or click year dots.

## Devin Secrets Needed
None — this is a static site with no authentication required.
