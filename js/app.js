/* ===== O Calendário Que Importa — v2 ===== */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  const MONTHS = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const CAT_LABELS = {
    titulo: "Título", classico: "Clássico", marco: "Marco",
    idolo: "Ídolo", recorde: "Recorde", comunidade: "Comunidade",
  };

  /* SVG icons per category — filled/solid style with clear outlines */
  const CAT_ICONS = {
    titulo: `<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M5 1h14v2H5V1zm-2 3h18v2h-1v6c0 1.1-.4 2.1-1 2.8V22h-2v-6H7v6H5v-7.2c-.6-.7-1-1.7-1-2.8V6H3V4zm4 2v6c0 1.7 1.3 3 3 3h4c1.7 0 3-1.3 3-3V6H7z"/></svg>`,
    classico: `<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12 6l1.5 3.5L17 10.2l-2.5 2.8.5 3.5L12 15l-3 1.5.5-3.5L7 10.2l3.5-.7z"/></svg>`,
    marco: `<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M5 2v20h2v-7c0 0 1.5-1 4.5-1s4 1.5 7 1.5c1 0 1.5-.2 1.5-.2V3.5S19 4.5 17 4.5c-3 0-4-1.5-7-1.5C7.5 3 7 3.5 7 3.5V2H5z"/></svg>`,
    idolo: `<img class="cat-icon cat-icon--img" src="img/socrates.png" alt="Ídolo"/>`,
    recorde: `<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><path d="M16 1a7 7 0 0 1 5.75 11H22l-4 4-4-4h2.27A5 5 0 1 0 11 7H9a7 7 0 0 1 7-7zM8 23a7 7 0 0 1-5.75-11H2l4-4 4 4H7.73A5 5 0 1 0 13 17h2a7 7 0 0 1-7 7z"/></svg>`,
    comunidade: `<svg class="cat-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.5"><circle cx="9" cy="7" r="3.5"/><circle cx="17" cy="7" r="2.5"/><path d="M1 19v-1c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v1H1z"/><path d="M17 19v-1c0-1.5-.5-2.8-1.3-4 .7-.3 1.5-.5 2.3-.5h1c2.8 0 5 2.2 5 5v.5h-7z"/></svg>`,
  };

  function catIcon(cat) { return CAT_ICONS[cat] || ""; }

  function pad(n) { return String(n).padStart(2, "0"); }
  function fmtDate(iso) {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }
  function fmtDateShort(iso) {
    const [, m, d] = iso.split("-");
    return `${d}/${m}`;
  }

  /* ---------- Data ---------- */
  const STORAGE_KEY = "corinthians_community_events";
  function loadCommunity() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveCommunity(ev) { localStorage.setItem(STORAGE_KEY, JSON.stringify(ev)); }
  function allEvents() { return [...CORINTHIANS_EVENTS, ...loadCommunity()]; }

  /* ---------- State ---------- */
  let curMonth = new Date().getMonth();
  let curYear = new Date().getFullYear();
  let tlYear = 2012; // start at a glorious year
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
    return allEvents().filter(e => activeFilter === "all" || e.category === activeFilter);
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
    monthTitle.textContent = `${MONTHS[curMonth]} ${curYear}`;

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
          (dayEvents.length > 3 ? `<div class="calendar__day-more">+${dayEvents.length - 3} mais</div>` : "") +
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
    todayLabel.textContent = `${pad(d)} de ${MONTHS[m]}`;

    const events = eventsForMonthDay(m, d);

    if (events.length === 0) {
      otdCards.innerHTML = '<p class="empty-msg">Nenhum evento registrado para esta data.</p>';
      return;
    }

    otdCards.innerHTML = events
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(e => {
        const year = parseInt(e.date.split("-")[0]);
        const ago = today.getFullYear() - year;
        return `
          <div class="otd-card" data-id="${e.id}">
            <div class="otd-card__year">${year}</div>
            <div class="otd-card__ago">há ${ago} ano${ago !== 1 ? "s" : ""}</div>
            <div class="otd-card__title">${e.title}</div>
            <span class="otd-card__cat">${catIcon(e.category)}${CAT_LABELS[e.category] || e.category}</span>
            <div class="otd-card__desc">${e.description.slice(0, 140)}${e.description.length > 140 ? "…" : ""}</div>
          </div>`;
      }).join("");

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
    for (let y = 1910; y <= currentYear; y++) {
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

    // Scroll active year into view
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
      timelineEvents.innerHTML = '<div class="timeline__empty">Nenhum evento registrado para este ano.</div>';
      return;
    }

    timelineEvents.innerHTML = events.map(e => `
      <div class="tl-item" data-id="${e.id}">
        <div class="tl-item__date">${fmtDate(e.date)}</div>
        <div class="tl-item__title">${e.title}</div>
        <span class="tl-item__cat">${catIcon(e.category)}${CAT_LABELS[e.category] || e.category}</span>
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
          <div class="event-detail__related-title">Também nesta data</div>
          ${related.map(e => `
            <div class="event-detail__related-item" data-id="${e.id}">
              <strong>${e.date.split("-")[0]}</strong> — ${e.title}
            </div>`).join("")}
        </div>`;
    }

    eventModalContent.innerHTML = `
      <div class="event-detail__icon">${catIcon(event.category)}</div>
      <div class="event-detail__date">${fmtDate(event.date)}</div>
      <div class="event-detail__title">${event.title}</div>
      <span class="event-detail__cat">${catIcon(event.category)}${CAT_LABELS[event.category] || event.category}</span>
      <div class="event-detail__desc">${event.description}</div>
      ${relatedHtml}
    `;

    eventModal.classList.remove("hidden");

    eventModalContent.querySelectorAll(".event-detail__related-item").forEach(item => {
      item.addEventListener("click", () => {
        const ev = allEvents().find(e => e.id == item.dataset.id);
        if (ev) openEventModal(ev);
      });
    });
  }

  function openDayModal(events, day) {
    eventModalContent.innerHTML = `
      <div class="event-detail__date">${pad(day)}/${pad(curMonth + 1)} — Todos os anos</div>
      <div class="event-detail__title">${events.length} eventos nesta data</div>
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
      searchResults.innerHTML = '<div class="search-results__item"><span class="search-results__item-title">Nenhum resultado</span></div>';
    } else {
      searchResults.innerHTML = results.map(e => `
        <div class="search-results__item" data-id="${e.id}">
          <div class="search-results__item-title">${e.title}</div>
          <div class="search-results__item-meta">${fmtDate(e.date)} · ${CAT_LABELS[e.category] || e.category}</div>
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

  /* ---------- Event Listeners ---------- */
  $("#prevMonth").addEventListener("click", prevMonth);
  $("#nextMonth").addEventListener("click", nextMonth);
  $("#prevYear").addEventListener("click", () => { tlYear = Math.max(1910, tlYear - 1); renderTimeline(); });
  $("#nextYear").addEventListener("click", () => { tlYear = Math.min(new Date().getFullYear(), tlYear + 1); renderTimeline(); });
  $("#prevDecade").addEventListener("click", () => { tlYear = Math.max(1910, tlYear - 10); renderTimeline(); });
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

  $$("#filterButtons .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => setFilter(btn.dataset.category));
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

  /* ---------- Inject icons into filter buttons ---------- */
  $$("#filterButtons .filter-btn").forEach(btn => {
    const cat = btn.dataset.category;
    if (cat !== "all" && CAT_ICONS[cat]) {
      btn.innerHTML = `<span class="filter-btn__icon">${CAT_ICONS[cat]}</span>${CAT_LABELS[cat] || btn.textContent}`;
    }
  });

  /* ---------- Init ---------- */
  renderAll();
})();
