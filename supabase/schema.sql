-- ============================================
-- O Calendário Que Importa — Supabase Schema
-- Phase 3C: Cloud Backend
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. REACTIONS
-- Aggregated emoji reactions per event.
-- Each user can react multiple times (no auth required).
-- ============================================
CREATE TABLE reactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id INTEGER NOT NULL,
  reaction_id TEXT NOT NULL, -- 'fire', 'heart', 'cry', 'muscle', 'trophy'
  count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id, reaction_id)
);

-- Index for fast event lookups
CREATE INDEX idx_reactions_event ON reactions(event_id);

-- ============================================
-- 2. COMMENTS (Memórias da Fiel)
-- User-submitted memories per event.
-- ============================================
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id INTEGER NOT NULL,
  author_name TEXT DEFAULT 'Fiel Anônimo',
  text TEXT NOT NULL,
  status TEXT DEFAULT 'approved', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_comments_event ON comments(event_id);
CREATE INDEX idx_comments_status ON comments(status);

-- ============================================
-- 3. QUIZ SCORES
-- Global quiz leaderboard.
-- ============================================
CREATE TABLE quiz_scores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  player_name TEXT DEFAULT 'Fiel Anônimo',
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  percentage NUMERIC(5,2) GENERATED ALWAYS AS (ROUND((score::NUMERIC / NULLIF(total, 0)) * 100, 2)) STORED,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_quiz_scores_percentage ON quiz_scores(percentage DESC);

-- ============================================
-- 4. COMMUNITY EVENTS
-- User-submitted events (require moderation).
-- ============================================
CREATE TABLE community_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  submitted_by TEXT DEFAULT 'Fiel Anônimo',
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_community_events_status ON community_events(status);

-- ============================================
-- 5. ERROR REPORTS
-- Reports about incorrect event data.
-- ============================================
CREATE TABLE error_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_error_reports_event ON error_reports(event_id);

-- ============================================
-- 6. VIDEO SUGGESTIONS
-- Suggested videos for events.
-- ============================================
CREATE TABLE video_suggestions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_video_suggestions_event ON video_suggestions(event_id);

-- ============================================
-- 7. NEWS SUGGESTIONS
-- Suggested news articles for events.
-- ============================================
CREATE TABLE news_suggestions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_news_suggestions_event ON news_suggestions(event_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Public read, public insert, no update/delete.
-- Admin operations via service_role key only.
-- ============================================

-- Enable RLS on all tables
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_suggestions ENABLE ROW LEVEL SECURITY;

-- REACTIONS: anyone can read and upsert
CREATE POLICY "reactions_select" ON reactions FOR SELECT USING (true);
CREATE POLICY "reactions_insert" ON reactions FOR INSERT WITH CHECK (true);
CREATE POLICY "reactions_update" ON reactions FOR UPDATE USING (true);

-- COMMENTS: anyone can read approved, anyone can insert
CREATE POLICY "comments_select" ON comments FOR SELECT USING (status = 'approved');
CREATE POLICY "comments_insert" ON comments FOR INSERT WITH CHECK (true);

-- QUIZ SCORES: anyone can read and insert
CREATE POLICY "quiz_select" ON quiz_scores FOR SELECT USING (true);
CREATE POLICY "quiz_insert" ON quiz_scores FOR INSERT WITH CHECK (true);

-- COMMUNITY EVENTS: anyone can read approved, anyone can insert
CREATE POLICY "community_events_select" ON community_events FOR SELECT USING (status = 'approved');
CREATE POLICY "community_events_insert" ON community_events FOR INSERT WITH CHECK (true);

-- ERROR REPORTS: insert only (no public read)
CREATE POLICY "error_reports_insert" ON error_reports FOR INSERT WITH CHECK (true);

-- VIDEO SUGGESTIONS: insert only (no public read)
CREATE POLICY "video_suggestions_insert" ON video_suggestions FOR INSERT WITH CHECK (true);

-- NEWS SUGGESTIONS: insert only (no public read)
CREATE POLICY "news_suggestions_insert" ON news_suggestions FOR INSERT WITH CHECK (true);

-- ============================================
-- HELPER FUNCTION: Increment reaction count
-- Used via RPC from the frontend.
-- ============================================
CREATE OR REPLACE FUNCTION increment_reaction(p_event_id INTEGER, p_reaction_id TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO reactions (event_id, reaction_id, count)
  VALUES (p_event_id, p_reaction_id, 1)
  ON CONFLICT (event_id, reaction_id)
  DO UPDATE SET count = reactions.count + 1;

  SELECT count INTO new_count FROM reactions
  WHERE event_id = p_event_id AND reaction_id = p_reaction_id;

  RETURN new_count;
END;
$$;
