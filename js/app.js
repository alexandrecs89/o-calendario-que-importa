/* ===== Club Calendar Platform — Config-driven ===== */
(function () {
  "use strict";

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
    if (activeEl) activeEl.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });

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
    renderAll();
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
    renderAll();
  }

  init();
})();
