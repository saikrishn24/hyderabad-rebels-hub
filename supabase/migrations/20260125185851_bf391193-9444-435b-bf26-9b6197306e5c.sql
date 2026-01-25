-- Remove public SELECT access from cricclubs_cache_meta table
-- This table contains internal system information (cache keys, error messages, statuses)
-- that should only be accessible by backend services using the service role

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Anyone can view cache meta" ON public.cricclubs_cache_meta;

-- Create a restrictive policy that denies all public reads
-- Service role bypasses RLS, so the edge function can still read/write
CREATE POLICY "No public reads on cache meta" 
ON public.cricclubs_cache_meta 
FOR SELECT 
USING (false);