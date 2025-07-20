
-- Create events table (if not exists, enhance existing)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  organizer_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table (enhance existing)
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  session_type TEXT DEFAULT 'workshop',
  capacity INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create participants table (enhance existing)
CREATE TABLE IF NOT EXISTS public.participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  engagement_score INTEGER DEFAULT 0,
  attendance_score INTEGER DEFAULT 0,
  participation_score INTEGER DEFAULT 0,
  resource_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'checked_in', 'active', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create engagement_logs table (enhance existing)
CREATE TABLE IF NOT EXISTS public.engagement_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES public.participants(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('checkin', 'checkout', 'poll_response', 'resource_download', 'question_ask', 'feedback', 'networking_connect')),
  points INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table for tracking downloads
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  resource_type TEXT DEFAULT 'document' CHECK (resource_type IN ('document', 'video', 'audio', 'link')),
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create live_metrics table for real-time tracking
CREATE TABLE IF NOT EXISTS public.live_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  metric_type TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Users can view all events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Organizers can manage their events" ON public.events FOR ALL USING (auth.uid() = organizer_id);

-- RLS Policies for sessions
CREATE POLICY "Users can view all sessions" ON public.sessions FOR SELECT USING (true);
CREATE POLICY "Event organizers can manage sessions" ON public.sessions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = sessions.event_id AND events.organizer_id = auth.uid())
);

-- RLS Policies for participants
CREATE POLICY "Users can view participants of events they're part of" ON public.participants FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM public.events WHERE events.id = participants.event_id AND events.organizer_id = auth.uid())
);
CREATE POLICY "Users can insert themselves as participants" ON public.participants FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Event organizers can update participant scores" ON public.participants FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = participants.event_id AND events.organizer_id = auth.uid())
);

-- RLS Policies for engagement_logs
CREATE POLICY "Users can view their own engagement logs" ON public.engagement_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.participants WHERE participants.id = engagement_logs.participant_id AND participants.user_id = auth.uid())
);
CREATE POLICY "Users can insert their own engagement logs" ON public.engagement_logs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.participants WHERE participants.id = engagement_logs.participant_id AND participants.user_id = auth.uid())
);

-- RLS Policies for resources
CREATE POLICY "Users can view all resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Event organizers can manage resources" ON public.resources FOR ALL USING (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = resources.event_id AND events.organizer_id = auth.uid())
);

-- RLS Policies for live_metrics
CREATE POLICY "Users can view live metrics for events they're part of" ON public.live_metrics FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = live_metrics.event_id AND events.organizer_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.participants WHERE participants.event_id = live_metrics.event_id AND participants.user_id = auth.uid())
);
CREATE POLICY "Event organizers can insert live metrics" ON public.live_metrics FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.events WHERE events.id = live_metrics.event_id AND events.organizer_id = auth.uid())
);

-- Update engagement scores trigger
CREATE OR REPLACE FUNCTION update_engagement_score()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.participants
  SET 
    engagement_score = (
      SELECT COALESCE(SUM(points), 0)
      FROM public.engagement_logs el
      WHERE el.participant_id = NEW.participant_id
    ),
    updated_at = NOW()
  WHERE id = NEW.participant_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating engagement scores
DROP TRIGGER IF EXISTS update_engagement_score_trigger ON public.engagement_logs;
CREATE TRIGGER update_engagement_score_trigger
  AFTER INSERT ON public.engagement_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_engagement_score();

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.engagement_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sessions;

-- Set replica identity for realtime updates
ALTER TABLE public.engagement_logs REPLICA IDENTITY FULL;
ALTER TABLE public.participants REPLICA IDENTITY FULL;
ALTER TABLE public.live_metrics REPLICA IDENTITY FULL;
ALTER TABLE public.sessions REPLICA IDENTITY FULL;

-- Insert sample data for demo
INSERT INTO public.events (name, description, start_date, end_date, location, organizer_id) VALUES
('Tech Conference 2024', 'Annual technology conference with latest trends', NOW() + INTERVAL '1 day', NOW() + INTERVAL '3 days', 'Convention Center', auth.uid()),
('AI Workshop Series', 'Hands-on workshops about artificial intelligence', NOW() + INTERVAL '1 week', NOW() + INTERVAL '1 week' + INTERVAL '2 days', 'Tech Hub', auth.uid())
ON CONFLICT DO NOTHING;
