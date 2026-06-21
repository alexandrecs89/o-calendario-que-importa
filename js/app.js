/* ===== Club Calendar Platform — Config-driven ===== */
(function () {
  "use strict";

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const CFG = CLUB_CONFIG;
  const L = CFG.labels;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  /* ---------- Build lookups from config ---------- */
  const CAT_LABELS = {};
  const CAT_ICONS = {};
  CFG.categories.forEach(c => {
    CAT_LABELS[c.id] = c.label;
    CAT_ICONS[c.id] = c.icon === "img"
      ? `<img class="cat-icon cat-icon--img" src="${c.img}" alt="${c.label}"/>`
      : c.svg;
  });

  function catIcon(cat) { return CAT_ICONS[cat] || ""; }

  /* Helper: get all categories for an event (supports multi-category) */
  function getEventCategories(event) {
    return event.categories || [event.category];
  }

  function pad(n) { return String(n).padStart(2, "0"); }
  function fmtDate(iso) {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  /* ---------- Data ---------- */
  const STORAGE_KEY = `${CFG.storagePrefix}_community_events`;
  const PARABENS_KEY = `${CFG.storagePrefix}_parabens`;
  const ERRORS_KEY = `${CFG.storagePrefix}_error_reports`;
  const VIDEO_SUGGESTIONS_KEY = `${CFG.storagePrefix}_video_suggestions`;
  const NEWS_SUGGESTIONS_KEY = `${CFG.storagePrefix}_news_suggestions`;
  const REACTIONS_KEY = `${CFG.storagePrefix}_reactions`;
  const COMMENTS_KEY = `${CFG.storagePrefix}_comments`;
  const ENGAGEMENT_KEY = `${CFG.storagePrefix}_engagement`;
  const QUIZ_KEY = `${CFG.storagePrefix}_quiz_scores`;

  let clubEvents = []; // loaded from JSON

  function loadCommunity() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveCommunity(ev) { localStorage.setItem(STORAGE_KEY, JSON.stringify(ev)); }
  function allEvents() { return [...clubEvents, ...loadCommunity()]; }

  function loadParabens() {
    try { return JSON.parse(localStorage.getItem(PARABENS_KEY)) || {}; }
    catch { return {}; }
  }
  function saveParabens(data) { localStorage.setItem(PARABENS_KEY, JSON.stringify(data)); }
  function getParabensCount(eventId) { return loadParabens()[eventId] || 0; }
  function incrementParabens(eventId) {
    const data = loadParabens();
    data[eventId] = (data[eventId] || 0) + 1;
    saveParabens(data);
    return data[eventId];
  }

  /* ---------- Error reports & suggestions (localStorage) ---------- */
  function loadStore(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; }
    catch { return {}; }
  }
  function saveStore(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

  function reportError(eventId, message) {
    const data = loadStore(ERRORS_KEY);
    if (!data[eventId]) data[eventId] = [];
    data[eventId].push({ message, date: new Date().toISOString() });
    saveStore(ERRORS_KEY, data);
  }

  function suggestVideo(eventId, url) {
    const data = loadStore(VIDEO_SUGGESTIONS_KEY);
    if (!data[eventId]) data[eventId] = [];
    data[eventId].push({ url, date: new Date().toISOString() });
    saveStore(VIDEO_SUGGESTIONS_KEY, data);
  }

  function suggestNews(eventId, url) {
    const data = loadStore(NEWS_SUGGESTIONS_KEY);
    if (!data[eventId]) data[eventId] = [];
    data[eventId].push({ url, date: new Date().toISOString() });
    saveStore(NEWS_SUGGESTIONS_KEY, data);
  }

  /* ---------- Reactions ---------- */
  function loadReactions() { return loadStore(REACTIONS_KEY); }
  function getReactions(eventId) { return loadReactions()[eventId] || {}; }
  function toggleReaction(eventId, reactionId) {
    const data = loadReactions();
    if (!data[eventId]) data[eventId] = {};
    data[eventId][reactionId] = (data[eventId][reactionId] || 0) + 1;
    saveStore(REACTIONS_KEY, data);
    addEngagementPoints(1);
    return data[eventId][reactionId];
  }

  /* ---------- Comments ---------- */
  function loadComments() { return loadStore(COMMENTS_KEY); }
  function getComments(eventId) { return loadComments()[eventId] || []; }
  function addComment(eventId, text) {
    const data = loadComments();
    if (!data[eventId]) data[eventId] = [];
    data[eventId].push({ text, date: new Date().toISOString() });
    saveStore(COMMENTS_KEY, data);
    addEngagementPoints(3);
    return data[eventId];
  }

  /* ---------- Engagement ---------- */
  function loadEngagement() {
    try { return JSON.parse(localStorage.getItem(ENGAGEMENT_KEY)) || { points: 0 }; }
    catch { return { points: 0 }; }
  }
  function saveEngagement(data) { localStorage.setItem(ENGAGEMENT_KEY, JSON.stringify(data)); }
  function addEngagementPoints(pts) {
    const data = loadEngagement();
    data.points = (data.points || 0) + pts;
    saveEngagement(data);
    renderEngagement();
    return data.points;
  }
  function getEngagementLevel() {
    const pts = loadEngagement().points || 0;
    const levels = L.engagementLevels;
    let lvl = levels[0];
    for (const l of levels) {
      if (pts >= l.min) lvl = l;
    }
    const nextLvl = levels.find(l => l.min > pts);
    return { ...lvl, points: pts, next: nextLvl };
  }

  /* ---------- Quiz ---------- */
  function loadQuizScores() {
    try { return JSON.parse(localStorage.getItem(QUIZ_KEY)) || []; }
    catch { return []; }
  }
  function saveQuizScore(score, total) {
    const scores = loadQuizScores();
    scores.push({ score, total, date: new Date().toISOString() });
    localStorage.setItem(QUIZ_KEY, JSON.stringify(scores));
    addEngagementPoints(score * 2);
  }
  function generateQuizQuestions(count) {
    const events = clubEvents.filter(e => e.description && e.description.length > 20);
    const shuffled = events.sort(() => Math.random() - 0.5).slice(0, count * 3);
    const questions = [];
    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const correct = shuffled[i];
      const wrongPool = events.filter(e => e.id !== correct.id);
      const wrongs = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
      const type = Math.random() > 0.5 ? "year" : "title";
      if (type === "year") {
        const correctYear = correct.date.split("-")[0];
        const options = [correctYear];
        for (const w of wrongs) {
          const y = w.date.split("-")[0];
          if (!options.includes(y)) options.push(y);
          if (options.length >= 4) break;
        }
        while (options.length < 4) {
          const y = String(1910 + Math.floor(Math.random() * 116));
          if (!options.includes(y)) options.push(y);
        }
        questions.push({
          question: `Em que ano aconteceu: "${correct.title}"?`,
          options: options.sort(() => Math.random() - 0.5),
          correct: correctYear,
        });
      } else {
        const options = [correct.title];
        for (const w of wrongs) {
          if (!options.includes(w.title)) options.push(w.title);
          if (options.length >= 4) break;
        }
        const year = correct.date.split("-")[0];
        questions.push({
          question: `O que aconteceu em ${fmtDate(correct.date)}?`,
          options: options.sort(() => Math.random() - 0.5),
          correct: correct.title,
        });
      }
    }
    return questions;
  }

  /* ---------- State ---------- */
  let curMonth = new Date().getMonth();
  let curYear = new Date().getFullYear();
  let tlYear = CFG.defaultTimelineYear;
  let activeFilter = "all";

  /* ---------- DOM refs ---------- */
  const calendarDays = $("#calendarDays");
  const monthTitle = $("#monthTitle");
  const todayLabel = $("#todayDateLabel");
  const otdCards = $("#onThisDayCards");
  const yearLabel = $("#yearLabel");
  const timelineTrack = $("#timelineTrack");
  const timelineEvents = $("#timelineEvents");
  const searchInput = $("#searchInput");
  const searchResults = $("#searchResults");
  const eventModal = $("#eventModal");
  const eventModalContent = $("#eventModalContent");
  const addModal = $("#addModal");

  /* ---------- Helpers ---------- */
  function filtered() {
    return allEvents().filter(e => activeFilter === "all" || getEventCategories(e).includes(activeFilter));
  }

  function eventsForMonthDay(m, d) {
    const key = `${pad(m + 1)}-${pad(d)}`;
    return filtered().filter(e => {
      const [, em, ed] = e.date.split("-");
      return `${em}-${ed}` === key;
    });
  }

  /* ---------- Calendar ---------- */
  function renderCalendar() {
    monthTitle.textContent = `${L.months[curMonth]} ${curYear}`;

    const firstDow = new Date(curYear, curMonth, 1).getDay();
    const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();
    const daysInPrev = new Date(curYear, curMonth, 0).getDate();

    const today = new Date();
    const todayKey = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

    let html = "";

    // Previous month padding
    for (let i = firstDow - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      html += `<div class="calendar__day calendar__day--other"><span class="calendar__day-number">${d}</span></div>`;
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${curYear}-${pad(curMonth + 1)}-${pad(d)}`;
      const dayEvents = eventsForMonthDay(curMonth, d);
      const isToday = dateStr === todayKey;
      const has = dayEvents.length > 0;

      const cls = [
        "calendar__day",
        isToday ? "calendar__day--today" : "",
        has ? "calendar__day--has-events" : "",
      ].filter(Boolean).join(" ");

      let eventsHtml = "";
      if (has) {
        const show = dayEvents.slice(0, 3);
        eventsHtml = '<div class="calendar__day-events">' +
          show.map(e =>
            `<div class="calendar__day-event calendar__day-event--${e.category}" title="${e.title}"><span class="cat-icon-inline">${catIcon(e.category)}</span>${e.title}</div>`
          ).join("") +
          (dayEvents.length > 3 ? `<div class="calendar__day-more">${L.moreEvents.replace("{n}", dayEvents.length - 3)}</div>` : "") +
          '</div>';
      }

      html += `<div class="${cls}" data-day="${d}"><span class="calendar__day-number">${d}</span>${eventsHtml}</div>`;
    }

    // Next month padding
    const total = firstDow + daysInMonth;
    const rem = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= rem; d++) {
      html += `<div class="calendar__day calendar__day--other"><span class="calendar__day-number">${d}</span></div>`;
    }

    calendarDays.innerHTML = html;

    calendarDays.querySelectorAll(".calendar__day--has-events").forEach(el => {
      el.addEventListener("click", () => {
        const d = parseInt(el.dataset.day);
        const events = eventsForMonthDay(curMonth, d);
        if (events.length === 1) openEventModal(events[0]);
        else if (events.length > 1) openDayModal(events, d);
      });
    });
  }

  /* ---------- On This Day ---------- */
  function renderOnThisDay() {
    const today = new Date();
    const d = today.getDate();
    const m = today.getMonth();
    todayLabel.textContent = `${pad(d)} de ${L.months[m]}`;

    const events = eventsForMonthDay(m, d);

    if (events.length === 0) {
      otdCards.innerHTML = `<p class="empty-msg">${L.onThisDayEmpty}</p>`;
      return;
    }

    otdCards.innerHTML = events
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(e => {
        const year = parseInt(e.date.split("-")[0]);
        const ago = today.getFullYear() - year;
        const agoText = ago === 1 ? L.yearsAgo.replace("{n}", ago) : L.yearsAgoPlural.replace("{n}", ago);
        const showParabens = e.type === "aniversario" && e.playerStatus === "vivo";
        const count = showParabens ? getParabensCount(e.id) : 0;
        const parabensHtml = showParabens
          ? `<div class="otd-card__parabens">
               <button class="parabens-btn" data-event-id="${e.id}" title="${L.parabensSend}">
                 <span class="parabens-btn__icon">🎂</span>
                 <span class="parabens-btn__label">${L.parabensBtn}</span>
                 <span class="parabens-btn__count">${count}</span>
               </button>
             </div>`
          : "";
        return `
          <div class="otd-card" data-id="${e.id}">
            <div class="otd-card__year">${year}</div>
            <div class="otd-card__ago">${agoText}</div>
            <div class="otd-card__title">${e.title}</div>
            <div class="otd-card__cats">${getEventCategories(e).map(cat => `<span class="otd-card__cat">${catIcon(cat)}${CAT_LABELS[cat] || cat}</span>`).join('')}</div>
            <div class="otd-card__desc">${e.description.slice(0, 140)}${e.description.length > 140 ? "…" : ""}</div>
            ${parabensHtml}
          </div>`;
      }).join("");

    otdCards.querySelectorAll(".parabens-btn").forEach(btn => {
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const eventId = btn.dataset.eventId;
        const newCount = incrementParabens(eventId);
        btn.querySelector(".parabens-btn__count").textContent = newCount;
        btn.classList.add("parabens-btn--clicked");
        setTimeout(() => btn.classList.remove("parabens-btn--clicked"), 600);
      });
    });

    otdCards.querySelectorAll(".otd-card").forEach(card => {
      card.addEventListener("click", () => {
        const ev = allEvents().find(e => e.id == card.dataset.id);
        if (ev) openEventModal(ev);
      });
    });
  }

  /* ---------- Timeline ---------- */
  function renderTimelineTrack() {
    const currentYear = new Date().getFullYear();
    let html = "";
    for (let y = CFG.timelineStartYear; y <= currentYear; y++) {
      const hasEvents = filtered().some(e => parseInt(e.date.split("-")[0]) === y);
      const isActive = y === tlYear;
      const isDecade = y % 10 === 0;
      const cls = [
        "timeline__track-year",
        hasEvents ? "timeline__track-year--has-events" : "",
        isActive ? "timeline__track-year--active" : "",
        isDecade ? "timeline__track-year--decade" : "",
      ].filter(Boolean).join(" ");
      const label = isDecade ? String(y).slice(-2) : "";
      html += `<div class="${cls}" data-year="${y}" title="${y}">${label}</div>`;
    }
    timelineTrack.innerHTML = html;

    const activeEl = timelineTrack.querySelector(".timeline__track-year--active");
    if (activeEl) {
      const trackRect = timelineTrack.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      timelineTrack.scrollLeft += (elRect.left + elRect.width / 2) - (trackRect.left + trackRect.width / 2);
    }

    timelineTrack.querySelectorAll(".timeline__track-year").forEach(el => {
      el.addEventListener("click", () => {
        tlYear = parseInt(el.dataset.year);
        renderTimeline();
      });
    });
  }

  function renderTimelineEvents() {
    yearLabel.textContent = tlYear;

    const events = filtered()
      .filter(e => parseInt(e.date.split("-")[0]) === tlYear)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (events.length === 0) {
      timelineEvents.innerHTML = `<div class="timeline__empty">${L.timelineEmpty}</div>`;
      return;
    }

    timelineEvents.innerHTML = events.map(e => `
      <div class="tl-item" data-id="${e.id}">
        <div class="tl-item__date">${fmtDate(e.date)}</div>
        <div class="tl-item__title">${e.title}</div>
        <div class="tl-item__cats">${getEventCategories(e).map(cat => `<span class="tl-item__cat">${catIcon(cat)}${CAT_LABELS[cat] || cat}</span>`).join('')}</div>
      </div>
    `).join("");

    timelineEvents.querySelectorAll(".tl-item").forEach(item => {
      item.addEventListener("click", () => {
        const ev = allEvents().find(e => e.id == item.dataset.id);
        if (ev) openEventModal(ev);
      });
    });
  }

  function renderTimeline() {
    renderTimelineTrack();
    renderTimelineEvents();
  }

  /* ---------- Event Modal ---------- */
  function openEventModal(event) {
    const related = allEvents().filter(e => {
      if (e.id === event.id) return false;
      const [, em, ed] = e.date.split("-");
      const [, em2, ed2] = event.date.split("-");
      return em === em2 && ed === ed2;
    });

    let relatedHtml = "";
    if (related.length > 0) {
      relatedHtml = `
        <div style="margin-top:1.5rem">
          <div class="event-detail__related-title">${L.alsoOnThisDate}</div>
          ${related.map(e => `
            <div class="event-detail__related-item" data-id="${e.id}">
              <strong>${e.date.split("-")[0]}</strong> — ${e.title}
            </div>`).join("")}
        </div>`;
    }

    const videoHtml = event.videoUrl
      ? `<a href="${event.videoUrl}" target="_blank" rel="noopener" class="event-action event-action--video">
           <svg class="event-action__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
           ${L.watchVideo}
         </a>`
      : `<button class="event-action event-action--suggest-video" data-event-id="${event.id}">
           <svg class="event-action__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
           ${L.suggestVideo}
         </button>`;

    const newsHtml = event.newsUrl
      ? `<a href="${event.newsUrl}" target="_blank" rel="noopener" class="event-action event-action--news">
           <svg class="event-action__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h7v2H7zm0 4h10v2H7zm0 4h10v2H7z"/></svg>
           ${L.readNews}
         </a>`
      : `<button class="event-action event-action--suggest-news" data-event-id="${event.id}">
           <svg class="event-action__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h7v2H7zm0 4h10v2H7zm0 4h10v2H7z"/></svg>
           ${L.suggestNews}
         </button>`;

    eventModalContent.innerHTML = `
      <div class="event-detail__icon">${catIcon(event.category)}</div>
      <div class="event-detail__date">${fmtDate(event.date)}</div>
      <div class="event-detail__title">${event.title}</div>
      <div class="event-detail__cats">${getEventCategories(event).map(cat => `<span class="event-detail__cat">${catIcon(cat)}${CAT_LABELS[cat] || cat}</span>`).join('')}</div>
      <div class="event-detail__desc">${event.description}</div>
      <div class="event-detail__actions">
        ${videoHtml}
        ${newsHtml}
        <button class="event-action event-action--error" data-event-id="${event.id}">
          <svg class="event-action__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
          ${L.reportError}
        </button>
        <button class="event-action event-action--share" data-event-title="${event.title}" data-event-date="${event.date}">
          <svg class="event-action__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
          Compartilhar
        </button>
      </div>
      ${buildReactionsHtml(event.id)}
      ${buildCommentsHtml(event.id)}
      ${relatedHtml}
    `;

    eventModal.classList.remove("hidden");

    /* Bind related items */
    eventModalContent.querySelectorAll(".event-detail__related-item").forEach(item => {
      item.addEventListener("click", () => {
        const ev = allEvents().find(e => e.id == item.dataset.id);
        if (ev) openEventModal(ev);
      });
    });

    /* Bind report error */
    const errBtn = eventModalContent.querySelector(".event-action--error");
    if (errBtn) {
      errBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const msg = prompt(L.reportErrorPrompt);
        if (msg && msg.trim()) {
          reportError(errBtn.dataset.eventId, msg.trim());
          errBtn.textContent = L.reportErrorDone;
          errBtn.disabled = true;
          errBtn.classList.add("event-action--submitted");
        }
      });
    }

    /* Bind suggest video */
    const vidBtn = eventModalContent.querySelector(".event-action--suggest-video");
    if (vidBtn) {
      vidBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const url = prompt(L.suggestVideoPrompt);
        if (url && url.trim()) {
          suggestVideo(vidBtn.dataset.eventId, url.trim());
          vidBtn.textContent = L.suggestVideoDone;
          vidBtn.disabled = true;
          vidBtn.classList.add("event-action--submitted");
        }
      });
    }

    /* Bind suggest news */
    const newsBtn = eventModalContent.querySelector(".event-action--suggest-news");
    if (newsBtn) {
      newsBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const url = prompt(L.suggestNewsPrompt);
        if (url && url.trim()) {
          suggestNews(newsBtn.dataset.eventId, url.trim());
          newsBtn.textContent = L.suggestNewsDone;
          newsBtn.disabled = true;
          newsBtn.classList.add("event-action--submitted");
        }
      });
    }

    /* Bind reactions & comments */
    bindReactions(eventModalContent);
    bindComments(eventModalContent);

    /* Bind share button */
    const shareBtn = eventModalContent.querySelector(".event-action--share");
    if (shareBtn) {
      shareBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        const title = shareBtn.dataset.eventTitle;
        const date = shareBtn.dataset.eventDate;
        const text = `${title} (${fmtDate(date)}) — ${CFG.name}`;
        const url = window.location.href;

        if (navigator.share) {
          navigator.share({ title: CFG.name, text, url }).catch(() => {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
            shareBtn.textContent = "Copiado!";
            setTimeout(() => { shareBtn.innerHTML = `<svg class="event-action__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg> Compartilhar`; }, 2000);
          }).catch(() => {
            copyFallback(`${text}\n${url}`, shareBtn);
          });
        } else {
          copyFallback(`${text}\n${url}`, shareBtn);
        }
      });
    }
  }

  /* ---------- Reactions & Comments HTML builders ---------- */
  function buildReactionsHtml(eventId) {
    const reactions = getReactions(eventId);
    const reactionsConfig = L.reactions || [];
    if (reactionsConfig.length === 0) return "";
    return `
      <div class="reactions" data-event-id="${eventId}">
        <div class="reactions__title">${L.reactionsTitle}</div>
        <div class="reactions__buttons">
          ${reactionsConfig.map(r => {
            const count = reactions[r.id] || 0;
            return `<button class="reactions__btn" data-reaction="${r.id}" title="${r.label}">
              <span class="reactions__emoji">${r.emoji}</span>
              <span class="reactions__count">${count || ""}</span>
            </button>`;
          }).join("")}
        </div>
      </div>`;
  }

  function buildCommentsHtml(eventId) {
    const comments = getComments(eventId);
    const commentsList = comments.length > 0
      ? comments.map(c => {
          const d = new Date(c.date);
          const dateStr = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
          return `<div class="comments__item">
            <div class="comments__text">${escapeHtml(c.text)}</div>
            <div class="comments__date">${dateStr}</div>
          </div>`;
        }).join("")
      : `<p class="comments__empty">${L.commentsEmpty}</p>`;
    return `
      <div class="comments" data-event-id="${eventId}">
        <div class="comments__title">${L.commentsTitle}</div>
        <div class="comments__list">${commentsList}</div>
        <div class="comments__form">
          <input type="text" class="comments__input" placeholder="${L.commentsPlaceholder}" maxlength="280" />
          <button class="comments__send btn btn--primary btn--sm">${L.commentsSend}</button>
        </div>
      </div>`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function bindReactions(container) {
    const reactionsEl = container.querySelector(".reactions");
    if (!reactionsEl) return;
    const eventId = reactionsEl.dataset.eventId;
    reactionsEl.querySelectorAll(".reactions__btn").forEach(btn => {
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const rid = btn.dataset.reaction;
        const count = toggleReaction(eventId, rid);
        btn.querySelector(".reactions__count").textContent = count;
        btn.classList.add("reactions__btn--active");
        setTimeout(() => btn.classList.remove("reactions__btn--active"), 300);
      });
    });
  }

  function bindComments(container) {
    const commentsEl = container.querySelector(".comments");
    if (!commentsEl) return;
    const eventId = commentsEl.dataset.eventId;
    const input = commentsEl.querySelector(".comments__input");
    const sendBtn = commentsEl.querySelector(".comments__send");
    if (!input || !sendBtn) return;
    const submit = () => {
      const text = input.value.trim();
      if (!text) return;
      const comments = addComment(eventId, text);
      input.value = "";
      const list = commentsEl.querySelector(".comments__list");
      const d = new Date();
      const dateStr = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
      const empty = list.querySelector(".comments__empty");
      if (empty) empty.remove();
      list.insertAdjacentHTML("beforeend", `
        <div class="comments__item comments__item--new">
          <div class="comments__text">${escapeHtml(text)}</div>
          <div class="comments__date">${dateStr}</div>
        </div>`);
      list.scrollTop = list.scrollHeight;
    };
    sendBtn.addEventListener("click", (ev) => { ev.stopPropagation(); submit(); });
    input.addEventListener("keydown", (ev) => { if (ev.key === "Enter") { ev.stopPropagation(); submit(); } });
    input.addEventListener("click", (ev) => ev.stopPropagation());
  }

  function openDayModal(events, day) {
    eventModalContent.innerHTML = `
      <div class="event-detail__date">${pad(day)}/${pad(curMonth + 1)} — Todos os anos</div>
      <div class="event-detail__title">${L.eventsOnDate.replace("{count}", events.length)}</div>
      <div style="margin-top:1rem">
        ${events.sort((a, b) => a.date.localeCompare(b.date)).map(e => `
          <div class="event-detail__related-item" data-id="${e.id}">
            <strong>${e.date.split("-")[0]}</strong> — ${e.title}
          </div>`).join("")}
      </div>
    `;
    eventModal.classList.remove("hidden");

    eventModalContent.querySelectorAll(".event-detail__related-item").forEach(item => {
      item.addEventListener("click", () => {
        const ev = allEvents().find(e => e.id == item.dataset.id);
        if (ev) openEventModal(ev);
      });
    });
  }

  /* ---------- Search ---------- */
  function handleSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) { searchResults.classList.add("hidden"); return; }

    const results = allEvents().filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.date.includes(q)
    ).slice(0, 12);

    if (results.length === 0) {
      searchResults.innerHTML = `<div class="search-results__item"><span class="search-results__item-title">${L.noResults}</span></div>`;
    } else {
      searchResults.innerHTML = results.map(e => `
        <div class="search-results__item" data-id="${e.id}">
          <div class="search-results__item-title">${e.title}</div>
          <div class="search-results__item-meta">${fmtDate(e.date)} · ${getEventCategories(e).map(cat => CAT_LABELS[cat] || cat).join(' · ')}</div>
        </div>`).join("");
    }
    searchResults.classList.remove("hidden");

    searchResults.querySelectorAll(".search-results__item[data-id]").forEach(item => {
      item.addEventListener("click", () => {
        const ev = allEvents().find(e => e.id == item.dataset.id);
        if (ev) {
          openEventModal(ev);
          searchResults.classList.add("hidden");
          searchInput.value = "";
        }
      });
    });
  }

  /* ---------- Add Event ---------- */
  function handleAdd(e) {
    e.preventDefault();
    const title = $("#eventTitle").value.trim();
    const date = $("#eventDate").value;
    const category = $("#eventCategory").value;
    const description = $("#eventDescription").value.trim();
    if (!title || !date) return;

    const community = loadCommunity();
    community.push({
      id: Date.now(),
      date, title, category,
      description: description || "Evento adicionado pela comunidade.",
      community: true,
    });
    saveCommunity(community);
    addModal.classList.add("hidden");
    $("#addEventForm").reset();
    renderAll();
  }

  /* ---------- Filters ---------- */
  function setFilter(cat) {
    activeFilter = cat;
    $$(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.category === cat));
    const scrollY = window.scrollY;
    renderAll();
    window.scrollTo(0, scrollY);
  }

  /* ---------- Navigation ---------- */
  function prevMonth() {
    curMonth--;
    if (curMonth < 0) { curMonth = 11; curYear--; }
    renderCalendar();
  }
  function nextMonth() {
    curMonth++;
    if (curMonth > 11) { curMonth = 0; curYear++; }
    renderCalendar();
  }

  /* ---------- Render All ---------- */
  function renderAll() {
    renderCalendar();
    renderOnThisDay();
    renderTimeline();
  }

  /* ---------- Dynamic page setup from config ---------- */
  function setupFromConfig() {
    // Title & meta
    document.title = CFG.meta.title;

    // Header
    $(".header__logo").src = CFG.logo;
    $(".header__logo").alt = CFG.name;
    $(".header__title").textContent = CFG.name;
    $(".header__subtitle").textContent = CFG.slogan;
    searchInput.placeholder = L.searchPlaceholder;
    $("#addEventBtn").textContent = L.addEventBtn;

    // Favicon
    const faviconEl = $('link[rel="icon"]');
    if (faviconEl) faviconEl.href = CFG.favicon;

    // Footer
    $(".footer p:first-child").textContent = CFG.footer.line1;
    $(".footer .footer__small").textContent = CFG.footer.line2;

    // On This Day section
    const otdTitle = $("#onThisDayTitle");
    if (otdTitle) otdTitle.textContent = L.onThisDayPrefix;
    const otdSub = $("#onThisDaySubtitle");
    if (otdSub) otdSub.textContent = L.onThisDaySubtitle;

    // Timeline title and subtitle
    const tlTitle = $(".timeline-section .section-title");
    if (tlTitle) tlTitle.textContent = L.timelineTitle;
    const tlSub = $(".timeline-section .section-subtitle");
    if (tlSub) tlSub.textContent = L.timelineSubtitle.replace("{startYear}", CFG.timelineStartYear);

    // Filters — build dynamically
    const filterContainer = $("#filterButtons");
    filterContainer.innerHTML = `<button class="filter-btn active" data-category="all">${L.allFilter}</button>` +
      CFG.categories.map(c =>
        `<button class="filter-btn" data-category="${c.id}">${c.labelPlural || c.label}</button>`
      ).join("");

    // Add event modal — category options
    const catSelect = $("#eventCategory");
    if (catSelect) {
      catSelect.innerHTML = CFG.categories.map(c =>
        `<option value="${c.id}" ${c.id === "comunidade" ? "selected" : ""}>${c.label}</option>`
      ).join("");
    }

    // Weekdays
    const weekdaysEl = $(".calendar__weekdays");
    if (weekdaysEl) {
      weekdaysEl.innerHTML = L.weekdays.map(d => `<span>${d}</span>`).join("");
    }

    // Theme CSS
    if (CFG.theme) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CFG.theme;
      document.head.appendChild(link);
    }
  }

  /* ---------- Event Listeners ---------- */
  function bindListeners() {
    $("#prevMonth").addEventListener("click", prevMonth);
    $("#nextMonth").addEventListener("click", nextMonth);
    $("#prevYear").addEventListener("click", () => { tlYear = Math.max(CFG.timelineStartYear, tlYear - 1); renderTimeline(); });
    $("#nextYear").addEventListener("click", () => { tlYear = Math.min(new Date().getFullYear(), tlYear + 1); renderTimeline(); });
    $("#prevDecade").addEventListener("click", () => { tlYear = Math.max(CFG.timelineStartYear, tlYear - 10); renderTimeline(); });
    $("#nextDecade").addEventListener("click", () => { tlYear = Math.min(new Date().getFullYear(), tlYear + 10); renderTimeline(); });

    $("#closeEventModal").addEventListener("click", () => eventModal.classList.add("hidden"));
    eventModal.addEventListener("click", (e) => { if (e.target === eventModal) eventModal.classList.add("hidden"); });

    $("#addEventBtn").addEventListener("click", () => addModal.classList.remove("hidden"));
    $("#closeAddModal").addEventListener("click", () => addModal.classList.add("hidden"));
    $("#cancelAdd").addEventListener("click", () => addModal.classList.add("hidden"));
    addModal.addEventListener("click", (e) => { if (e.target === addModal) addModal.classList.add("hidden"); });
    $("#addEventForm").addEventListener("submit", handleAdd);

    searchInput.addEventListener("input", handleSearch);
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add("hidden");
      }
    });

    // Filter clicks (delegated since buttons are rebuilt dynamically)
    $("#filterButtons").addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (btn) setFilter(btn.dataset.category);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        eventModal.classList.add("hidden");
        addModal.classList.add("hidden");
        searchResults.classList.add("hidden");
      }
      if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  /* ---------- Inject icons into filter buttons ---------- */
  function injectFilterIcons() {
    $$("#filterButtons .filter-btn").forEach(btn => {
      const cat = btn.dataset.category;
      if (cat !== "all" && CAT_ICONS[cat]) {
        btn.innerHTML = `<span class="filter-btn__icon">${CAT_ICONS[cat]}</span>${btn.textContent}`;
      }
    });
  }

  /* ---------- Donations ---------- */
  function setupDonations() {
    const cfg = CFG.donations;
    if (!cfg || !cfg.enabled) {
      const section = $("#donationSection");
      if (section) section.style.display = "none";
      return;
    }

    const title = $("#donationTitle");
    const subtitle = $("#donationSubtitle");
    const btn = $("#donateBtn");
    const thanks = $("#donationThanks");
    const modal = $("#donationModal");
    const closeBtn = $("#closeDonationModal");
    const methodsEl = $("#donationMethods");

    if (title) title.textContent = cfg.title;
    if (subtitle) subtitle.textContent = cfg.subtitle;
    if (btn) btn.textContent = cfg.cta;
    if (thanks) thanks.textContent = cfg.thanks;

    if (methodsEl && cfg.methods) {
      methodsEl.innerHTML = cfg.methods.map(m => {
        const info = m.key ? `Chave: ${m.key}` : "Chave Pix será configurada em breve";
        return `<div class="donation-modal__method">
          <div class="donation-modal__method-label">${m.label}</div>
          <div class="donation-modal__method-info">${info}</div>
        </div>`;
      }).join("");
    }

    if (btn && modal) {
      btn.addEventListener("click", () => modal.classList.remove("hidden"));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    }
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
      });
    }
  }

  /* ---------- Share (clipboard fallback for HTTP) ---------- */
  function copyFallback(text, btn) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;left:-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (_) { /* best-effort */ }
    document.body.removeChild(ta);
    btn.textContent = "Copiado!";
    setTimeout(() => { btn.innerHTML = `<svg class="event-action__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg> Compartilhar`; }, 2000);
  }

  /* ---------- Quiz ---------- */
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;

  function setupQuiz() {
    if (!CFG.quiz || !CFG.quiz.enabled) {
      const section = $("#quizSection");
      if (section) section.style.display = "none";
      return;
    }
    const title = $("#quizTitle");
    const subtitle = $("#quizSubtitle");
    if (title) title.textContent = L.quizTitle;
    if (subtitle) subtitle.textContent = L.quizSubtitle;

    const startBtn = $("#quizStartBtn");
    if (startBtn) {
      startBtn.textContent = L.quizStart;
      startBtn.addEventListener("click", startQuiz);
    }
    renderEngagement();
  }

  function startQuiz() {
    quizQuestions = generateQuizQuestions(CFG.quiz.questionsPerRound || 10);
    quizIndex = 0;
    quizScore = 0;
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const content = $("#quizContent");
    if (!content || quizIndex >= quizQuestions.length) { renderQuizResult(); return; }
    const q = quizQuestions[quizIndex];
    content.innerHTML = `
      <div class="quiz__progress">${quizIndex + 1} / ${quizQuestions.length}</div>
      <div class="quiz__question">${q.question}</div>
      <div class="quiz__options">
        ${q.options.map(o => `<button class="quiz__option" data-answer="${escapeHtml(o)}">${o}</button>`).join("")}
      </div>
      <div class="quiz__feedback hidden" id="quizFeedback"></div>
    `;
    content.querySelectorAll(".quiz__option").forEach(btn => {
      btn.addEventListener("click", () => handleQuizAnswer(btn, q));
    });
  }

  function handleQuizAnswer(btn, question) {
    const content = $("#quizContent");
    const feedback = content.querySelector("#quizFeedback");
    const isCorrect = btn.dataset.answer === question.correct;

    content.querySelectorAll(".quiz__option").forEach(b => {
      b.disabled = true;
      if (b.dataset.answer === question.correct) b.classList.add("quiz__option--correct");
      else if (b === btn && !isCorrect) b.classList.add("quiz__option--wrong");
    });

    if (isCorrect) quizScore++;
    feedback.textContent = isCorrect ? L.quizCorrect : `${L.quizWrong} ${question.correct}`;
    feedback.className = `quiz__feedback ${isCorrect ? "quiz__feedback--correct" : "quiz__feedback--wrong"}`;

    setTimeout(() => {
      quizIndex++;
      renderQuizQuestion();
    }, 2500);
  }

  function renderQuizResult() {
    const content = $("#quizContent");
    if (!content) return;
    saveQuizScore(quizScore, quizQuestions.length);
    const pct = Math.round((quizScore / quizQuestions.length) * 100);
    let message = "";
    if (pct >= 90) message = "Impressionante! Voc\u00ea \u00e9 uma lenda!";
    else if (pct >= 70) message = "Muito bom! Voc\u00ea conhece o Tim\u00e3o!";
    else if (pct >= 50) message = "Nada mal! Continue estudando a hist\u00f3ria!";
    else message = "Estude mais sobre o Corinthians!";

    content.innerHTML = `
      <div class="quiz__result">
        <div class="quiz__result-score">${quizScore} / ${quizQuestions.length}</div>
        <div class="quiz__result-pct">${pct}%</div>
        <div class="quiz__result-msg">${message}</div>
        <div class="quiz__result-actions">
          <button class="btn btn--primary" id="quizPlayAgain">${L.quizPlayAgain}</button>
          <button class="btn btn--ghost" id="quizShareResult">${L.quizShare}</button>
        </div>
        <div class="quiz__engagement" id="engagementWidget"></div>
      </div>
    `;
    content.querySelector("#quizPlayAgain").addEventListener("click", startQuiz);
    content.querySelector("#quizShareResult").addEventListener("click", () => {
      const text = `${L.quizScore.replace("{score}", quizScore).replace("{total}", quizQuestions.length)} no ${L.quizTitle}! ${message} ${window.location.href}`;
      if (navigator.share) {
        navigator.share({ title: L.quizTitle, text }).catch(() => {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          content.querySelector("#quizShareResult").textContent = "Copiado!";
        });
      }
    });
    renderEngagement();
  }

  /* ---------- Engagement ---------- */
  function renderEngagement() {
    const widget = $("#engagementWidget");
    if (!widget) return;
    const lvl = getEngagementLevel();
    const nextPts = lvl.next ? lvl.next.min : lvl.points;
    const progress = lvl.next ? Math.min(100, Math.round(((lvl.points - lvl.min) / (lvl.next.min - lvl.min)) * 100)) : 100;
    widget.innerHTML = `
      <div class="engagement">
        <div class="engagement__icon">${lvl.icon}</div>
        <div class="engagement__info">
          <div class="engagement__level">${lvl.title}</div>
          <div class="engagement__points">${lvl.points} pontos</div>
          <div class="engagement__bar">
            <div class="engagement__bar-fill" style="width:${progress}%"></div>
          </div>
          ${lvl.next ? `<div class="engagement__next">${lvl.next.min - lvl.points} pts para ${lvl.next.title} ${lvl.next.icon}</div>` : `<div class="engagement__next">N\u00edvel m\u00e1ximo!</div>`}
        </div>
      </div>`;
  }

  /* ---------- Push Notifications ---------- */
  function setupNotifications() {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;
    if (Notification.permission === "default") {
      const banner = document.createElement("div");
      banner.className = "notification-banner";
      banner.innerHTML = `
        <p>Ative as notifica\u00e7\u00f5es para receber lembretes di\u00e1rios sobre efem\u00e9rides corinthianas!</p>
        <button class="btn btn--primary btn--sm" id="notifAllow">Ativar</button>
        <button class="btn btn--ghost btn--sm" id="notifDismiss">\u2715</button>`;
      document.body.appendChild(banner);
      banner.querySelector("#notifAllow").addEventListener("click", async () => {
        const result = await Notification.requestPermission();
        banner.remove();
        if (result === "granted") scheduleNotification();
      });
      banner.querySelector("#notifDismiss").addEventListener("click", () => banner.remove());
    } else if (Notification.permission === "granted") {
      scheduleNotification();
    }
  }

  function scheduleNotification() {
    const now = new Date();
    const mm = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());
    const todayEvents = allEvents().filter(e => {
      const parts = e.date.split("-");
      return parts[1] === mm && parts[2] === dd;
    });
    if (todayEvents.length > 0 && !sessionStorage.getItem("notif_shown")) {
      sessionStorage.setItem("notif_shown", "1");
      new Notification(L.onThisDayPrefix + `${dd}/${mm}`, {
        body: todayEvents.slice(0, 3).map(e => e.title).join(", "),
        icon: CFG.logo,
        tag: "aconteceu-hoje",
      });
    }
  }

  /* ---------- PWA Install ---------- */
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = $("#pwaInstall");
    if (banner) banner.classList.remove("hidden");
  });

  function bindPWAInstall() {
    const installBtn = $("#pwaInstallBtn");
    const dismissBtn = $("#pwaInstallDismiss");
    const banner = $("#pwaInstall");
    if (installBtn) {
      installBtn.addEventListener("click", () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
        }
        if (banner) banner.classList.add("hidden");
      });
    }
    if (dismissBtn) {
      dismissBtn.addEventListener("click", () => {
        if (banner) banner.classList.add("hidden");
      });
    }
  }

  /* ---------- Init ---------- */
  async function init() {
    setupFromConfig();
    bindListeners();

    // Load events from JSON
    try {
      const resp = await fetch(CFG.eventsUrl);
      clubEvents = await resp.json();
    } catch (err) {
      console.warn("Failed to load events from JSON, falling back to global", err);
      // Fallback: if CORINTHIANS_EVENTS global still exists (legacy)
      if (typeof CORINTHIANS_EVENTS !== "undefined") {
        clubEvents = CORINTHIANS_EVENTS;
      }
    }

    injectFilterIcons();
    bindPWAInstall();
    setupDonations();
    setupQuiz();
    setupNotifications();
    renderAll();
    window.scrollTo(0, 0);
  }

  init();
})();
