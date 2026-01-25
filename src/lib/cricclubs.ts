import { supabase } from "@/integrations/supabase/client";

export interface Player {
  id: string;
  player_id: string;
  name: string;
  role: string | null;
  photo_url: string | null;
  jersey_number: number | null;
  is_captain: boolean | null;
  is_vice_captain: boolean | null;
  profile_url: string | null;
  updated_at: string;
}

export interface BattingStats {
  player_id: string;
  matches: number;
  innings: number;
  runs: number;
  balls: number;
  average: number;
  strike_rate: number;
  fours: number;
  sixes: number;
  highest_score: string | null;
  not_outs: number;
  fifties: number;
  hundreds: number;
}

export interface BowlingStats {
  player_id: string;
  matches: number;
  innings: number;
  overs: number;
  maidens: number;
  runs_conceded: number;
  wickets: number;
  economy: number;
  average: number;
  strike_rate: number;
  best_figures: string | null;
  five_wickets: number;
}

export interface FieldingStats {
  player_id: string;
  catches: number;
  stumpings: number;
  run_outs: number;
}

export interface TeamInfo {
  team_id: string;
  name: string;
  logo_url: string | null;
  league_name: string | null;
  division: string | null;
  captain: string | null;
  vice_captain: string | null;
  player_count: number | null;
  updated_at: string;
}

export interface CacheStatus {
  lastUpdated: string | null;
  isStale: boolean;
  status: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from('cricclubs_players')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }

  return data || [];
}

export async function getPlayerById(playerId: string): Promise<Player | null> {
  const { data, error } = await supabase
    .from('cricclubs_players')
    .select('*')
    .eq('player_id', playerId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching player:', error);
    return null;
  }

  return data;
}

export async function getPlayerStats(playerId: string): Promise<{
  batting: BattingStats | null;
  bowling: BowlingStats | null;
  fielding: FieldingStats | null;
}> {
  const [battingResult, bowlingResult, fieldingResult] = await Promise.all([
    supabase.from('cricclubs_batting_stats').select('*').eq('player_id', playerId).maybeSingle(),
    supabase.from('cricclubs_bowling_stats').select('*').eq('player_id', playerId).maybeSingle(),
    supabase.from('cricclubs_fielding_stats').select('*').eq('player_id', playerId).maybeSingle(),
  ]);

  return {
    batting: battingResult.data,
    bowling: bowlingResult.data,
    fielding: fieldingResult.data,
  };
}

export async function getTeamInfo(): Promise<TeamInfo | null> {
  const { data, error } = await supabase
    .from('cricclubs_team')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching team info:', error);
    return null;
  }

  return data;
}

export async function getCacheStatus(): Promise<CacheStatus> {
  const { data, error } = await supabase
    .from('cricclubs_cache_meta')
    .select('*')
    .eq('cache_key', 'players')
    .maybeSingle();

  if (error || !data) {
    return { lastUpdated: null, isStale: true, status: 'unknown' };
  }

  const lastFetched = new Date(data.last_fetched_at);
  const ttlMs = (data.ttl_hours || 24) * 60 * 60 * 1000;
  const isStale = Date.now() - lastFetched.getTime() > ttlMs;

  return {
    lastUpdated: data.last_fetched_at,
    isStale,
    status: data.fetch_status || 'unknown',
  };
}

export async function syncCricClubsData(force: boolean = false): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/cricclubs-sync?force=${force}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await response.json();
    return { success: result.success, message: result.message || 'Sync completed' };
  } catch (error) {
    console.error('Error syncing data:', error);
    return { success: false, message: 'Failed to sync data' };
  }
}

export function getRoleColor(role: string | null): string {
  const roleColors: Record<string, string> = {
    'Batter': 'bg-gold/20 text-gold border-gold/30',
    'Bowler': 'bg-primary/20 text-primary border-primary/30',
    'All Rounder': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Wicket Keeper': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };
  return roleColors[role || ''] || 'bg-muted text-muted-foreground border-border';
}
