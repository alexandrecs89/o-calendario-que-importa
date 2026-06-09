/* ===== O Calendário Que Importa — Main App ===== */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  const MONTHS_PT = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const CAT_LABELS = {
    titulo: "🏆 Título",
    classico: "⚔️ Clássico",
    marco: "📌 Marco",
    idolo: "⭐ Ídolo",
    recorde: "📊 Recorde",
    comunidade: "👥 Comunidade",
  };

  function pad(n) { return String(n).padStart(2, "0"); }
  function dateKey(d) { return `${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
  function fmtDate(iso) {
    const [y,m,d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }

  /* ---------- Data Layer ---------- */
  const STORAGE_KEY = "corinthians_community_events";

  function loadCommunityEvents() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
  }

  function saveCommunityEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  function getAllEvents() {
    return [...CORINTHIANS_EVENTS, ...loadCommunityEvents()];
  }

  /* ---------- State ---------- */
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let timelineYear = new Date().getFullYear();
  let activeCategory = "all";
  let activeView = "calendar"; // "calendar" | "timeline"

  /* ---------- DOM references ---------- */
  const calendarDays = $("#calendarDays");
  const monthTitle = $("#monthTitle");
  const onThisDayCards = $("#onThisDayCards");
  const searchInput = $("#searchInput");
  const searchResults = $("#searchResults");
  const calendarView = $("#calendarView");
  const timelineView = $("#timelineView");
  const timelineContent = $("#timelineContent");
  const yearTitle = $("#yearTitle");
  const eventSidebar = $("#eventSidebar");
  const sidebarContent = $("#sidebarContent");
  const modalOverlay = $("#modalOverlay");

  /* ---------- On This Day ---------- */
  function renderOnThisDay() {
    const today = new Date();
    const key = dateKey(today);
    const events = getAllEvents().filter(e => {
      const [,m,d] = e.date.split("-");
      return `${m}-${d}` === key;
    });

    if (events.length === 0) {
      onThisDayCards.innerHTML = '<p class="on-this-day__empty">Nenhum evento registrado para hoje.</p>';
      return;
    }

    onThisDayCards.innerHTML = events.map(e => {
      const year = parseInt(e.date.split("-")[0]);
      const ago = today.getFullYear() - year;
      return `
        <div class="on-this-day__card" data-id="${e.id}">
          <div class="on-this-day__card-year">${year}</div>
          <div class="on-this-day__card-ago">há ${ago} ano${ago !== 1 ? "s" : ""}</div>
          <div class="on-this-day__card-title">${e.title}</div>
          <div class="on-this-day__card-desc">${e.description.slice(0, 120)}${e.description.length > 120 ? "…" : ""}</div>
        </div>
      `;
    }).join("");

    onThisDayCards.querySelectorAll(".on-this-day__card").forEach(card => {
      card.addEventListener("click", () => {
        const ev = getAllEvents().find(e => e.id == card.dataset.id);
        if (ev) openSidebar(ev);
      });
    });
  }

  /* ---------- Calendar Rendering ---------- */
  function renderCalendar() {
    monthTitle.textContent = `${MONTHS_PT[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrev = new Date(currentYear, currentMonth, 0).getDate();

    const events = getAllEvents().filter(e =>
      activeCategory === "all" || e.category === activeCategory
    );

    const eventsByDate = {};
    events.forEach(e => {
      const [ey, em, ed] = e.date.split("-").map(Number);
      const k = `${ey}-${pad(em)}-${pad(ed)}`;
      if (!eventsByDate[k]) eventsByDate[k] = [];
      eventsByDate[k].push(e);
    });

    let html = "";
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      html += `<div class="calendar__day calendar__day--other-month"><span class="calendar__day-number">${d}</span></div>`;
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${pad(currentMonth+1)}-${pad(d)}`;
      const dayEvents = eventsByDate[dateStr] || [];

      // Also find events from OTHER years that happened on this day/month
      const monthDayKey = `${pad(currentMonth+1)}-${pad(d)}`;
      const historicalEvents = events.filter(e => {
        const [ey, em, ed] = e.date.split("-");
        return `${em}-${ed}` === monthDayKey && parseInt(ey) !== currentYear;
      });

      const allDayEvents = [...dayEvents, ...historicalEvents];
      const uniqueEvents = [...new Map(allDayEvents.map(e => [e.id, e])).values()];

      const isToday = dateStr === todayStr;
      const hasEvent = uniqueEvents.length > 0;

      const classes = [
        "calendar__day",
        isToday ? "calendar__day--today" : "",
        hasEvent ? "calendar__day--has-event" : "",
      ].filter(Boolean).join(" ");

      const dots = uniqueEvents.slice(0, 5).map(e =>
        `<span class="calendar__day-dot calendar__day-dot--${e.category}"></span>`
      ).join("");

      html += `
        <div class="${classes}" data-date="${dateStr}" data-md="${monthDayKey}">
          <span class="calendar__day-number">${d}</span>
          <div class="calendar__day-dots">${dots}</div>
        </div>
      `;
    }

    // Fill remaining cells
    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let d = 1; d <= remaining; d++) {
      html += `<div class="calendar__day calendar__day--other-month"><span class="calendar__day-number">${d}</span></div>`;
    }

    calendarDays.innerHTML = html;

    // Click events on calendar days
    calendarDays.querySelectorAll(".calendar__day--has-event").forEach(el => {
      el.addEventListener("click", () => {
        const md = el.dataset.md;
        const events = getAllEvents().filter(e => {
          if (activeCategory !== "all" && e.category !== activeCategory) return false;
          const [, em, ed] = e.date.split("-");
          return `${em}-${ed}` === md;
        });
        if (events.length === 1) {
          openSidebar(events[0]);
        } else if (events.length > 1) {
          openSidebarMultiple(events, md);
        }
      });
    });
  }

  /* ---------- Timeline Rendering ---------- */
  function renderTimeline() {
    yearTitle.textContent = timelineYear;

    const events = getAllEvents()
      .filter(e => {
        const ey = parseInt(e.date.split("-")[0]);
        return ey === timelineYear && (activeCategory === "all" || e.category === activeCategory);
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    if (events.length === 0) {
      timelineContent.innerHTML = '<div class="timeline__empty">Nenhum evento encontrado para este ano.</div>';
      return;
    }

    timelineContent.innerHTML = events.map(e => `
      <div class="timeline__item" data-id="${e.id}">
        <div class="timeline__item-date">${fmtDate(e.date)}</div>
        <div class="timeline__item-title">${e.title}</div>
        <span class="timeline__item-cat cat--${e.category}">${CAT_LABELS[e.category] || e.category}</span>
      </div>
    `).join("");

    timelineContent.querySelectorAll(".timeline__item").forEach(item => {
      item.addEventListener("click", () => {
        const ev = getAllEvents().find(e => e.id == item.dataset.id);
        if (ev) openSidebar(ev);
      });
    });
  }

  /* ---------- Sidebar ---------- */
  function openSidebar(event) {
    const relatedEvents = getAllEvents().filter(e => {
      if (e.id === event.id) return false;
      const [, em, ed] = e.date.split("-");
      const [, em2, ed2] = event.date.split("-");
      return em === em2 && ed === ed2;
    });

    let relatedHtml = "";
    if (relatedEvents.length > 0) {
      relatedHtml = `
        <div class="event-sidebar__section">
          <h4>Também nesta data</h4>
          ${relatedEvents.map(e => `
            <div class="event-sidebar__related-item" data-id="${e.id}">
              <strong>${e.date.split("-")[0]}</strong> — ${e.title}
            </div>
          `).join("")}
        </div>
      `;
    }

    sidebarContent.innerHTML = `
      <div class="event-sidebar__date">${fmtDate(event.date)}</div>
      <div class="event-sidebar__title">${event.title}</div>
      <span class="event-sidebar__cat cat--${event.category}">${CAT_LABELS[event.category] || event.category}</span>
      <div class="event-sidebar__desc">${event.description}</div>
      ${relatedHtml}
    `;

    eventSidebar.classList.remove("hidden");

    // Related item click
    sidebarContent.querySelectorAll(".event-sidebar__related-item").forEach(item => {
      item.addEventListener("click", () => {
        const ev = getAllEvents().find(e => e.id == item.dataset.id);
        if (ev) openSidebar(ev);
      });
    });
  }

  function openSidebarMultiple(events, md) {
    const [m, d] = md.split("-");
    sidebarContent.innerHTML = `
      <div class="event-sidebar__date">${d}/${m} — Todos os anos</div>
      <div class="event-sidebar__title">${events.length} eventos nesta data</div>
      <div class="event-sidebar__section">
        ${events
          .sort((a, b) => a.date.localeCompare(b.date))
          .map(e => `
            <div class="event-sidebar__related-item" data-id="${e.id}">
              <strong>${e.date.split("-")[0]}</strong> — ${e.title}
              <br><span style="font-size:0.75rem;color:var(--gray-light)">${e.description.slice(0,80)}…</span>
            </div>
          `).join("")}
      </div>
    `;
    eventSidebar.classList.remove("hidden");

    sidebarContent.querySelectorAll(".event-sidebar__related-item").forEach(item => {
      item.addEventListener("click", () => {
        const ev = getAllEvents().find(e => e.id == item.dataset.id);
        if (ev) openSidebar(ev);
      });
    });
  }

  /* ---------- Search ---------- */
  function handleSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (q.length < 2) {
      searchResults.classList.add("hidden");
      return;
    }

    const results = getAllEvents().filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.date.includes(q)
    ).slice(0, 15);

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-results__item"><span class="search-results__item-title">Nenhum resultado encontrado</span></div>';
    } else {
      searchResults.innerHTML = results.map(e => `
        <div class="search-results__item" data-id="${e.id}">
          <div class="search-results__item-title">${e.title}</div>
          <div class="search-results__item-date">${fmtDate(e.date)}</div>
          <span class="search-results__item-cat cat--${e.category}">${CAT_LABELS[e.category] || e.category}</span>
        </div>
      `).join("");
    }

    searchResults.classList.remove("hidden");

    searchResults.querySelectorAll(".search-results__item[data-id]").forEach(item => {
      item.addEventListener("click", () => {
        const ev = getAllEvents().find(e => e.id == item.dataset.id);
        if (ev) {
          openSidebar(ev);
          searchResults.classList.add("hidden");
          searchInput.value = "";

          // Navigate to the event's date
          const [ey, em] = ev.date.split("-").map(Number);
          if (activeView === "calendar") {
            currentYear = ey;
            currentMonth = em - 1;
            renderCalendar();
          } else {
            timelineYear = ey;
            renderTimeline();
          }
        }
      });
    });
  }

  /* ---------- Add Event Modal ---------- */
  function openModal() { modalOverlay.classList.remove("hidden"); }
  function closeModal() { modalOverlay.classList.add("hidden"); }

  function handleAddEvent(e) {
    e.preventDefault();
    const title = $("#eventTitle").value.trim();
    const date = $("#eventDate").value;
    const category = $("#eventCategory").value;
    const description = $("#eventDescription").value.trim();

    if (!title || !date) return;

    const communityEvents = loadCommunityEvents();
    const newEvent = {
      id: Date.now(),
      date,
      title,
      category,
      description: description || "Evento adicionado pela comunidade.",
      community: true,
    };
    communityEvents.push(newEvent);
    saveCommunityEvents(communityEvents);

    closeModal();
    $("#addEventForm").reset();
    renderAll();
  }

  /* ---------- Filter & View Toggle ---------- */
  function setActiveFilter(cat) {
    activeCategory = cat;
    $$(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.category === cat));
    renderCalendar();
    renderTimeline();
  }

  function setActiveView(view) {
    activeView = view;
    $$(".view-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    calendarView.classList.toggle("hidden", view !== "calendar");
    timelineView.classList.toggle("hidden", view !== "timeline");
  }

  /* ---------- Navigation ---------- */
  function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  }
  function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  }
  function prevYear() { timelineYear--; renderTimeline(); }
  function nextYear() { timelineYear++; renderTimeline(); }

  /* ---------- Render All ---------- */
  function renderAll() {
    renderOnThisDay();
    renderCalendar();
    renderTimeline();
  }

  /* ---------- Event Listeners ---------- */
  $("#prevMonth").addEventListener("click", prevMonth);
  $("#nextMonth").addEventListener("click", nextMonth);
  $("#prevYear").addEventListener("click", prevYear);
  $("#nextYear").addEventListener("click", nextYear);
  $("#closeSidebar").addEventListener("click", () => eventSidebar.classList.add("hidden"));
  $("#addEventBtn").addEventListener("click", openModal);
  $("#cancelModal").addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
  $("#addEventForm").addEventListener("submit", handleAddEvent);

  searchInput.addEventListener("input", handleSearch);
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add("hidden");
    }
  });

  $$("#filterButtons .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => setActiveFilter(btn.dataset.category));
  });

  $$("#calendarViewBtn").forEach(btn => btn.addEventListener("click", () => setActiveView("calendar")));
  $$("#timelineViewBtn").forEach(btn => btn.addEventListener("click", () => setActiveView("timeline")));
  // Also handle click from the direct selectors
  if ($("#calendarViewBtn")) $("#calendarViewBtn").addEventListener("click", () => setActiveView("calendar"));
  if ($("#timelineViewBtn")) $("#timelineViewBtn").addEventListener("click", () => setActiveView("timeline"));

  /* ---------- Keyboard shortcuts ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      eventSidebar.classList.add("hidden");
      closeModal();
      searchResults.classList.add("hidden");
    }
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  /* ---------- Init ---------- */
  renderAll();
})();
