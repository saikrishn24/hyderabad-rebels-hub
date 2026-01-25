-- Create tables for CricClubs data caching

-- Team info cache
CREATE TABLE public.cricclubs_team (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id TEXT NOT NULL UNIQUE,
  club_id TEXT NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  league_name TEXT,
  division TEXT,
  captain TEXT,
  vice_captain TEXT,
  player_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Players cache
CREATE TABLE public.cricclubs_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id TEXT NOT NULL UNIQUE,
  club_id TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  photo_url TEXT,
  jersey_number INTEGER DEFAULT 0,
  is_captain BOOLEAN DEFAULT false,
  is_vice_captain BOOLEAN DEFAULT false,
  profile_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Batting stats cache
CREATE TABLE public.cricclubs_batting_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES public.cricclubs_players(player_id) ON DELETE CASCADE,
  matches INTEGER DEFAULT 0,
  innings INTEGER DEFAULT 0,
  runs INTEGER DEFAULT 0,
  balls INTEGER DEFAULT 0,
  average DECIMAL(6,2) DEFAULT 0,
  strike_rate DECIMAL(6,2) DEFAULT 0,
  fours INTEGER DEFAULT 0,
  sixes INTEGER DEFAULT 0,
  highest_score TEXT,
  not_outs INTEGER DEFAULT 0,
  fifties INTEGER DEFAULT 0,
  hundreds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(player_id)
);

-- Bowling stats cache
CREATE TABLE public.cricclubs_bowling_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES public.cricclubs_players(player_id) ON DELETE CASCADE,
  matches INTEGER DEFAULT 0,
  innings INTEGER DEFAULT 0,
  overs DECIMAL(6,1) DEFAULT 0,
  maidens INTEGER DEFAULT 0,
  runs_conceded INTEGER DEFAULT 0,
  wickets INTEGER DEFAULT 0,
  economy DECIMAL(5,2) DEFAULT 0,
  average DECIMAL(6,2) DEFAULT 0,
  strike_rate DECIMAL(6,2) DEFAULT 0,
  best_figures TEXT,
  five_wickets INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(player_id)
);

-- Fielding stats cache
CREATE TABLE public.cricclubs_fielding_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES public.cricclubs_players(player_id) ON DELETE CASCADE,
  catches INTEGER DEFAULT 0,
  stumpings INTEGER DEFAULT 0,
  run_outs INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(player_id)
);

-- Cache metadata for TTL tracking
CREATE TABLE public.cricclubs_cache_meta (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT NOT NULL UNIQUE,
  last_fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ttl_hours INTEGER DEFAULT 24,
  fetch_status TEXT DEFAULT 'success',
  error_message TEXT
);

-- Enable RLS (data is public read, admin write)
ALTER TABLE public.cricclubs_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cricclubs_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cricclubs_batting_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cricclubs_bowling_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cricclubs_fielding_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cricclubs_cache_meta ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view)
CREATE POLICY "Anyone can view team" ON public.cricclubs_team FOR SELECT USING (true);
CREATE POLICY "Anyone can view players" ON public.cricclubs_players FOR SELECT USING (true);
CREATE POLICY "Anyone can view batting stats" ON public.cricclubs_batting_stats FOR SELECT USING (true);
CREATE POLICY "Anyone can view bowling stats" ON public.cricclubs_bowling_stats FOR SELECT USING (true);
CREATE POLICY "Anyone can view fielding stats" ON public.cricclubs_fielding_stats FOR SELECT USING (true);
CREATE POLICY "Anyone can view cache meta" ON public.cricclubs_cache_meta FOR SELECT USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_cricclubs_team_updated_at
  BEFORE UPDATE ON public.cricclubs_team
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cricclubs_players_updated_at
  BEFORE UPDATE ON public.cricclubs_players
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cricclubs_batting_stats_updated_at
  BEFORE UPDATE ON public.cricclubs_batting_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cricclubs_bowling_stats_updated_at
  BEFORE UPDATE ON public.cricclubs_bowling_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cricclubs_fielding_stats_updated_at
  BEFORE UPDATE ON public.cricclubs_fielding_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();