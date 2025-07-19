-- Add skills, interests, and history to profiles for AI Mentor
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS skills JSONB;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS interests JSONB;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS history TEXT; 