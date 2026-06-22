/**
 * Analytics Module — Phase 3B
 * Tracks user interactions for understanding platform usage.
 * Uses localStorage for local metrics + Cloudflare Web Analytics for traffic.
 * No external dependencies or backend required.
 */
(function () {
  "use strict";

  const ANALYTICS_KEY = (window.CLUB_CONFIG ? CLUB_CONFIG.storagePrefix : "corinthians") + "_analytics";

  /* ---------- Storage ---------- */
  function loadAnalytics() {
    try { return JSON.parse(localStorage.getItem(ANALYTICS_KEY)) || getDefaults(); }
    catch { return getDefaults(); }
  }

  function saveAnalytics(data) {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  }

  function getDefaults() {
    return {
      events_viewed: {},      // { eventId: count }
      filters_used: {},       // { filterId: count }
      searches: [],           // last 50 search terms
      quiz_completions: 0,
      quiz_total_score: 0,
      quiz_total_questions: 0,
      reactions_given: 0,
      comments_posted: 0,
      shares: 0,
      sessions: 0,
      first_visit: new Date().toISOString(),
      last_visit: new Date().toISOString(),
      pages_per_session: [],  // last 20 sessions
    };
  }

  /* ---------- Track Functions ---------- */
  const Analytics = {
    _data: null,

    init() {
      this._data = loadAnalytics();
      this._data.sessions = (this._data.sessions || 0) + 1;
      this._data.last_visit = new Date().toISOString();
      this._currentPageViews = 0;
      saveAnalytics(this._data);
    },

    trackEventView(eventId) {
      if (!this._data) this.init();
      if (!this._data.events_viewed) this._data.events_viewed = {};
      this._data.events_viewed[eventId] = (this._data.events_viewed[eventId] || 0) + 1;
      this._currentPageViews = (this._currentPageViews || 0) + 1;
      saveAnalytics(this._data);
    },

    trackFilterUse(filterId) {
      if (!this._data) this.init();
      if (!this._data.filters_used) this._data.filters_used = {};
      this._data.filters_used[filterId] = (this._data.filters_used[filterId] || 0) + 1;
      saveAnalytics(this._data);
    },

    trackSearch(term) {
      if (!this._data) this.init();
      if (!this._data.searches) this._data.searches = [];
      this._data.searches.push({ term, date: new Date().toISOString() });
      // Keep last 100 searches
      if (this._data.searches.length > 100) {
        this._data.searches = this._data.searches.slice(-100);
      }
      saveAnalytics(this._data);
    },

    trackQuizCompletion(score, total) {
      if (!this._data) this.init();
      this._data.quiz_completions = (this._data.quiz_completions || 0) + 1;
      this._data.quiz_total_score = (this._data.quiz_total_score || 0) + score;
      this._data.quiz_total_questions = (this._data.quiz_total_questions || 0) + total;
      saveAnalytics(this._data);
    },

    trackReaction() {
      if (!this._data) this.init();
      this._data.reactions_given = (this._data.reactions_given || 0) + 1;
      saveAnalytics(this._data);
    },

    trackComment() {
      if (!this._data) this.init();
      this._data.comments_posted = (this._data.comments_posted || 0) + 1;
      saveAnalytics(this._data);
    },

    trackShare() {
      if (!this._data) this.init();
      this._data.shares = (this._data.shares || 0) + 1;
      saveAnalytics(this._data);
    },

    /* ---------- Metrics Getters ---------- */
    getTopEvents(limit = 10) {
      if (!this._data) this.init();
      const entries = Object.entries(this._data.events_viewed || {});
      return entries.sort((a, b) => b[1] - a[1]).slice(0, limit);
    },

    getTopFilters(limit = 10) {
      if (!this._data) this.init();
      const entries = Object.entries(this._data.filters_used || {});
      return entries.sort((a, b) => b[1] - a[1]).slice(0, limit);
    },

    getRecentSearches(limit = 20) {
      if (!this._data) this.init();
      return (this._data.searches || []).slice(-limit);
    },

    getQuizStats() {
      if (!this._data) this.init();
      const completions = this._data.quiz_completions || 0;
      const totalScore = this._data.quiz_total_score || 0;
      const totalQuestions = this._data.quiz_total_questions || 0;
      return {
        completions,
        averageScore: completions > 0 ? (totalScore / completions).toFixed(1) : 0,
        averagePercent: totalQuestions > 0 ? ((totalScore / totalQuestions) * 100).toFixed(0) : 0,
      };
    },

    getSummary() {
      if (!this._data) this.init();
      return {
        totalSessions: this._data.sessions || 0,
        totalEventViews: Object.values(this._data.events_viewed || {}).reduce((a, b) => a + b, 0),
        uniqueEventsViewed: Object.keys(this._data.events_viewed || {}).length,
        totalSearches: (this._data.searches || []).length,
        totalReactions: this._data.reactions_given || 0,
        totalComments: this._data.comments_posted || 0,
        totalShares: this._data.shares || 0,
        quizCompletions: this._data.quiz_completions || 0,
        firstVisit: this._data.first_visit,
        lastVisit: this._data.last_visit,
      };
    },

    /* Export all data (for future backend sync) */
    exportData() {
      return this._data;
    }
  };

  // Initialize on load
  Analytics.init();

  // Expose globally
  window.CalendarioAnalytics = Analytics;
})();
