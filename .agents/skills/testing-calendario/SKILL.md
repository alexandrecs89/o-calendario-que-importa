---
name: testing-calendario
description: Test the "O Calendário Que Importa" platform end-to-end. Use when verifying UI, events, PWA, donations, engagement features, or any feature changes.
---

# Testing: O Calendário Que Importa

## Quick Start

```bash
cd /home/ubuntu/repos/o-calendario-que-importa
python3 -m http.server 8080 &
# Open http://localhost:8080 in Chrome
```

## Devin Secrets Needed

None — static frontend with no authentication.

## Key Test Areas

### 1. Events Data
- Verify event count via console: `fetch('data/events.json').then(r=>r.json()).then(d=>console.log('Event count:', d.length))`
- Search is accent-sensitive — use accented terms to match titles (e.g., "Gaviões" not "Gavioes")
- Timeline navigation: click year dots or use JS `document.querySelector('[title="YEAR"]').click()`
- Calendar shows events grouped by day-of-month across all years — cells may truncate when multiple events share a date
- 7 categories: titulo, classico, marco, idolo, ex_jogador, jogador, recorde
- Events can have multiple categories (e.g., Ralf = idolo + ex_jogador)

### 2. PWA (Eixo 3)
- Check manifest: `document.querySelector('link[rel="manifest"]')` should exist
- Check SW: console should show "SW: registered"
- Install banner: "Instale o app para acesso offline!" should be visible at bottom
- The "Compartilhar" button was fixed — now uses direct event binding with stopPropagation. Re-test if modal closing issues reappear.

### 3. Donations (Eixo 4)
- Donation section: scroll to bottom, look for "APOIE ESTE PROJETO"
- **Known issue:** The "Fazer uma doação" button might not respond to direct UI clicks. If so, trigger via console: `document.getElementById('donateBtn').click()`
- Modal should show: title "Apoie o Calendário", Pix method, "Obrigado" message
- Close via ✕ button

### 4. Multi-Category Players
- Ralf should show 2 badges: Ídolo + Ex-Jogador
- Danilo Avelar should show only: Ex-Jogador
- Filtro "Ídolo" should include Ralf but exclude Avelar
- Filtro "Jogador" should show only current squad

### 5. Event Modal Actions
- "Reportar erro" → prompt → saves to localStorage
- "Assistir vídeo" / "Sugerir vídeo" → depends on videoUrl presence
- "Ver reportagem" / "Sugerir reportagem" → depends on newsUrl presence

### 6. Engagement Features (Phase 2)

#### Emoji Reactions
- Open event modal → "Reações" section below action buttons
- 5 emoji buttons: fire, heart, cry, muscle, trophy
- Each click increments counter by 1 (no toggle/decrement — always adds)
- Data persists in localStorage key `corinthians_reactions`
- Each reaction awards 1 engagement point

#### Community Comments ("Memórias da Fiel")
- Below reactions in event modal
- Empty state: "Seja o primeiro a compartilhar uma memória!"
- Submit via input + "Enviar" button
- Comments show text + ISO date
- Data persists in localStorage key `corinthians_comments`
- Each comment awards 3 engagement points

#### Quiz Corinthiano
- Scroll to quiz section below timeline
- "Começar Quiz" button starts 10 random questions from events DB
- Questions auto-advance after 1.5s (`setTimeout` at `app.js:1015`)
- **Testing tip:** Feedback (green/red button colors, "Correto!"/"Errado!" text) flashes for only 1.5s. Screenshots during this window are hard to capture. Verify feedback mechanism by reading source code at `app.js:997-1015` if UI capture misses it.
- Results screen shows: score (X/10), percentage, motivational message, "Jogar Novamente" + "Compartilhar Resultado" buttons
- Quiz score × 2 = engagement points awarded
- Data persists in localStorage key `corinthians_quiz_scores`

#### Engagement / Gamification Widget
- Located inside quiz start view (`#engagementWidget`)
- Shows: level icon, level title, points count, progress bar, "X pts para [next level]"
- 5 tiers: Torcedor Iniciante (0), Fiel de Carteirinha (10), Mosqueteiro (30), Bando de Loucos (60), Lenda da Fiel (100)
- **Known issue:** Widget only renders in quiz start view. After completing quiz, `renderEngagement()` is called but `#engagementWidget` DOM element no longer exists (replaced by quiz result HTML). Widget won't show updated points post-quiz.
- Data persists in localStorage key `corinthians_engagement`

#### OG / Twitter Card Meta Tags
- Verify via `curl -s http://localhost:8080 | grep -E 'og:|twitter:'`
- Or via console: `document.querySelector('meta[property="og:title"]').content`
- Expected: og:title contains "Memória Corinthiana", og:image contains "logo.png", twitter:card = "summary_large_image"

#### Notification Permission Banner
- Appears at top of page on fresh load (if notifications not already granted/denied)
- Text about daily efemérides reminders + "Ativar" button + close "✕" button
- Clicking ✕ dismisses banner
- Uses Service Worker for push notifications

## Testing Tips

- The site is purely static HTML/CSS/JS — no backend, no auth, no API keys
- Config is in `js/config.js` — CLUB_CONFIG object controls all text/theming
- Events are in `data/events.json` — 498 events as of latest
- Use DevTools console for data verification, but prefer UI interactions for functional testing
- When clicking buttons that seem unresponsive, try programmatic clicks via console as a workaround — but note this as a bug
- Today's date events appear in "Aconteceu em [date]" section — useful for testing birthday/Parabéns features
- Multi-category badges render as separate `<span>` elements inside event cards
- The app uses localStorage for persistence. Key prefixes: `corinthians_reactions`, `corinthians_comments`, `corinthians_engagement`, `corinthians_quiz_scores`, plus community events, video/news suggestions, error reports
- **Cache issues:** After deploying new code, always do Ctrl+Shift+R (hard refresh) to clear cached JS/CSS. Old cached `config.js` can cause Phase 2 labels to appear as `undefined`.
- **DevTools keyboard shortcuts** (F12, Ctrl+Shift+J) may not work via computer-use tool. Use `curl` or shell commands for data verification instead.

## Recording Guidelines

- Maximize browser before recording: `sudo apt-get install -y wmctrl 2>/dev/null; wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz`
- Use structured annotations: setup → test_start → assertion
- Keep assertions under 80 characters, consolidated (not granular per UI element)
