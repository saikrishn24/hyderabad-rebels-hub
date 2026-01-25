-- Add restrictive RLS policies for INSERT, UPDATE, DELETE on all cricclubs tables
-- The edge function uses service role which bypasses RLS, so these deny public writes

-- cricclubs_batting_stats
CREATE POLICY "No public inserts on batting stats" 
ON public.cricclubs_batting_stats 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "No public updates on batting stats" 
ON public.cricclubs_batting_stats 
FOR UPDATE 
USING (false);

CREATE POLICY "No public deletes on batting stats" 
ON public.cricclubs_batting_stats 
FOR DELETE 
USING (false);

-- cricclubs_bowling_stats
CREATE POLICY "No public inserts on bowling stats" 
ON public.cricclubs_bowling_stats 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "No public updates on bowling stats" 
ON public.cricclubs_bowling_stats 
FOR UPDATE 
USING (false);

CREATE POLICY "No public deletes on bowling stats" 
ON public.cricclubs_bowling_stats 
FOR DELETE 
USING (false);

-- cricclubs_fielding_stats
CREATE POLICY "No public inserts on fielding stats" 
ON public.cricclubs_fielding_stats 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "No public updates on fielding stats" 
ON public.cricclubs_fielding_stats 
FOR UPDATE 
USING (false);

CREATE POLICY "No public deletes on fielding stats" 
ON public.cricclubs_fielding_stats 
FOR DELETE 
USING (false);

-- cricclubs_players
CREATE POLICY "No public inserts on players" 
ON public.cricclubs_players 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "No public updates on players" 
ON public.cricclubs_players 
FOR UPDATE 
USING (false);

CREATE POLICY "No public deletes on players" 
ON public.cricclubs_players 
FOR DELETE 
USING (false);

-- cricclubs_team
CREATE POLICY "No public inserts on team" 
ON public.cricclubs_team 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "No public updates on team" 
ON public.cricclubs_team 
FOR UPDATE 
USING (false);

CREATE POLICY "No public deletes on team" 
ON public.cricclubs_team 
FOR DELETE 
USING (false);

-- cricclubs_cache_meta
CREATE POLICY "No public inserts on cache meta" 
ON public.cricclubs_cache_meta 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "No public updates on cache meta" 
ON public.cricclubs_cache_meta 
FOR UPDATE 
USING (false);

CREATE POLICY "No public deletes on cache meta" 
ON public.cricclubs_cache_meta 
FOR DELETE 
USING (false);