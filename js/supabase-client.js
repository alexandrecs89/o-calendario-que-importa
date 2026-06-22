/**
 * Supabase Client — Phase 3C
 * Cloud backend for shared data (reactions, comments, quiz, etc.)
 * Falls back to localStorage when offline or when Supabase is unavailable.
 */
(function () {
  "use strict";

  const SUPABASE_URL = window.SUPABASE_CONFIG?.url || "";
  const SUPABASE_ANON_KEY = window.SUPABASE_CONFIG?.anonKey || "";

  let _supabase = null;
  let _initialized = false;
  let _online = false;

  function getClient() {
    if (_supabase) return _supabase;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    if (typeof window.supabase === "undefined") return null;
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return _supabase;
  }

  async function checkConnection() {
    const client = getClient();
    if (!client) return false;
    try {
      const { error } = await client.from("reactions").select("count", { count: "exact", head: true });
      _online = !error;
    } catch {
      _online = false;
    }
    _initialized = true;
    return _online;
  }

  /* ========== REACTIONS ========== */
  async function getReactions(eventId) {
    const client = getClient();
    if (!client || !_online) return null; // fallback to localStorage
    try {
      const { data, error } = await client
        .from("reactions")
        .select("reaction_id, count")
        .eq("event_id", eventId);
      if (error) return null;
      const result = {};
      (data || []).forEach(r => { result[r.reaction_id] = r.count; });
      return result;
    } catch { return null; }
  }

  async function incrementReaction(eventId, reactionId) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { data, error } = await client.rpc("increment_reaction", {
        p_event_id: eventId,
        p_reaction_id: reactionId,
      });
      if (error) return null;
      return data;
    } catch { return null; }
  }

  /* ========== COMMENTS ========== */
  async function getComments(eventId) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { data, error } = await client
        .from("comments")
        .select("id, text, author_name, created_at")
        .eq("event_id", eventId)
        .order("created_at", { ascending: true });
      if (error) return null;
      return data;
    } catch { return null; }
  }

  async function addComment(eventId, text, authorName) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { data, error } = await client
        .from("comments")
        .insert({ event_id: eventId, text, author_name: authorName || "Fiel Anônimo" })
        .select();
      if (error) return null;
      return data;
    } catch { return null; }
  }

  /* ========== QUIZ SCORES ========== */
  async function getTopScores(limit = 20) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { data, error } = await client
        .from("quiz_scores")
        .select("player_name, score, total, percentage, created_at")
        .order("percentage", { ascending: false })
        .order("created_at", { ascending: true })
        .limit(limit);
      if (error) return null;
      return data;
    } catch { return null; }
  }

  async function saveQuizScore(playerName, score, total) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { data, error } = await client
        .from("quiz_scores")
        .insert({ player_name: playerName || "Fiel Anônimo", score, total })
        .select();
      if (error) return null;
      return data;
    } catch { return null; }
  }

  /* ========== COMMUNITY EVENTS ========== */
  async function getCommunityEvents() {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { data, error } = await client
        .from("community_events")
        .select("*")
        .eq("status", "approved")
        .order("date", { ascending: true });
      if (error) return null;
      return data;
    } catch { return null; }
  }

  async function submitCommunityEvent(event) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { data, error } = await client
        .from("community_events")
        .insert({
          title: event.title,
          date: event.date,
          category: event.category,
          description: event.description,
          submitted_by: event.submittedBy || "Fiel Anônimo",
        })
        .select();
      if (error) return null;
      return data;
    } catch { return null; }
  }

  /* ========== ERROR REPORTS ========== */
  async function reportError(eventId, message) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { error } = await client
        .from("error_reports")
        .insert({ event_id: eventId, message });
      return !error;
    } catch { return null; }
  }

  /* ========== VIDEO SUGGESTIONS ========== */
  async function suggestVideo(eventId, url) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { error } = await client
        .from("video_suggestions")
        .insert({ event_id: eventId, url });
      return !error;
    } catch { return null; }
  }

  /* ========== NEWS SUGGESTIONS ========== */
  async function suggestNews(eventId, url) {
    const client = getClient();
    if (!client || !_online) return null;
    try {
      const { error } = await client
        .from("news_suggestions")
        .insert({ event_id: eventId, url });
      return !error;
    } catch { return null; }
  }

  /* ========== PUBLIC API ========== */
  window.SupabaseBackend = {
    init: checkConnection,
    isOnline: () => _online,
    isInitialized: () => _initialized,

    // Reactions
    getReactions,
    incrementReaction,

    // Comments
    getComments,
    addComment,

    // Quiz
    getTopScores,
    saveQuizScore,

    // Community Events
    getCommunityEvents,
    submitCommunityEvent,

    // Reports & Suggestions
    reportError,
    suggestVideo,
    suggestNews,
  };
})();
