-- Engagement Logs Demo Table Migration

CREATE TABLE IF NOT EXISTS public.engagement_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.participants(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'checkin', 'poll', 'download', 'nfc_scan', etc.
  points INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
