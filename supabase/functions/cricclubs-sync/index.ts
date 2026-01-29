import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Player {
  playerId: string;
  name: string;
  role: string;
  photoUrl: string;
  jerseyNumber: number;
  isCaptain: boolean;
  isViceCaptain: boolean;
  profileUrl: string;
}

interface TeamInfo {
  teamId: string;
  clubId: string;
  name: string;
  logoUrl: string;
  leagueName: string;
  division: string;
  captain: string;
  viceCaptain: string;
  playerCount: number;
}

// CricClubs configuration
const CRICCLUBS_TEAM_ID = "4371";
const CRICCLUBS_CLUB_ID = "1809";
const CRICCLUBS_BASE_URL = "https://cricclubs.com/TDCA";

// Simple in-memory rate limiting (per instance)
// Limits force refreshes to 1 per minute per IP
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(clientIp);
  
  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return true;
  }
  
  rateLimitMap.set(clientIp, now);
  
  // Clean up old entries (keep map small)
  if (rateLimitMap.size > 100) {
    const cutoff = now - RATE_LIMIT_WINDOW_MS;
    for (const [ip, time] of rateLimitMap.entries()) {
      if (time < cutoff) rateLimitMap.delete(ip);
    }
  }
  
  return false;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'sync';
    const forceRefresh = url.searchParams.get('force') === 'true';
    
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';

    console.log(`CricClubs sync action: ${action}, force: ${forceRefresh}, ip: ${clientIp}`);

    // Check cache TTL
    const { data: cacheMeta } = await supabase
      .from('cricclubs_cache_meta')
      .select('*')
      .eq('cache_key', 'players')
      .single();

    const cacheValid = cacheMeta && 
      new Date(cacheMeta.last_fetched_at).getTime() + (cacheMeta.ttl_hours * 60 * 60 * 1000) > Date.now();

    // Apply rate limiting only for force refresh requests
    if (forceRefresh && isRateLimited(clientIp)) {
      console.log(`Rate limited: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Rate limit exceeded. Please try again later.',
          message: 'Force refresh is rate limited to prevent abuse.'
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (cacheValid && !forceRefresh) {
      console.log('Cache is still valid, returning cached data');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Data is cached and fresh',
          lastUpdated: cacheMeta.last_fetched_at 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch team page from CricClubs
    const teamUrl = `${CRICCLUBS_BASE_URL}/viewTeam.do?teamId=${CRICCLUBS_TEAM_ID}&clubId=${CRICCLUBS_CLUB_ID}`;
    console.log(`Fetching: ${teamUrl}`);

    const response = await fetch(teamUrl, {
      headers: {
        'User-Agent': 'HyderabadRebelsCC/1.0 (https://hyderabadrebelscc.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CricClubs: ${response.status}`);
    }

    const html = await response.text();
    console.log(`Fetched HTML: ${html.length} characters`);

    // Parse team info
    const teamInfo = parseTeamInfo(html);
    console.log('Parsed team info:', teamInfo);

    // Parse players
    const players = parsePlayers(html);
    console.log(`Parsed ${players.length} players`);

    // Upsert team data
    await supabase
      .from('cricclubs_team')
      .upsert({
        team_id: teamInfo.teamId,
        club_id: teamInfo.clubId,
        name: teamInfo.name,
        logo_url: teamInfo.logoUrl,
        league_name: teamInfo.leagueName,
        division: teamInfo.division,
        captain: teamInfo.captain,
        vice_captain: teamInfo.viceCaptain,
        player_count: teamInfo.playerCount,
      }, { onConflict: 'team_id' });

    // Upsert players
    for (const player of players) {
      const { error } = await supabase
        .from('cricclubs_players')
        .upsert({
          player_id: player.playerId,
          club_id: CRICCLUBS_CLUB_ID,
          name: player.name,
          role: player.role,
          photo_url: player.photoUrl,
          jersey_number: player.jerseyNumber,
          is_captain: player.isCaptain,
          is_vice_captain: player.isViceCaptain,
          profile_url: player.profileUrl,
        }, { onConflict: 'player_id' });

      if (error) {
        console.error(`Error upserting player ${player.name}:`, error);
      }

      // Initialize stats tables for new players
      await supabase
        .from('cricclubs_batting_stats')
        .upsert({ player_id: player.playerId }, { onConflict: 'player_id', ignoreDuplicates: true });
      
      await supabase
        .from('cricclubs_bowling_stats')
        .upsert({ player_id: player.playerId }, { onConflict: 'player_id', ignoreDuplicates: true });
      
      await supabase
        .from('cricclubs_fielding_stats')
        .upsert({ player_id: player.playerId }, { onConflict: 'player_id', ignoreDuplicates: true });
    }

    // Update cache metadata
    await supabase
      .from('cricclubs_cache_meta')
      .upsert({
        cache_key: 'players',
        last_fetched_at: new Date().toISOString(),
        ttl_hours: 24,
        fetch_status: 'success',
        error_message: null,
      }, { onConflict: 'cache_key' });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Synced ${players.length} players`,
        team: teamInfo,
        playersCount: players.length,
        lastUpdated: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('CricClubs sync error:', errorMessage);
    
    // Update cache metadata with error
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    await supabase
      .from('cricclubs_cache_meta')
      .upsert({
        cache_key: 'players',
        fetch_status: 'error',
        error_message: errorMessage,
      }, { onConflict: 'cache_key' });

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        message: 'Failed to sync. Using cached data if available.'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseTeamInfo(html: string): TeamInfo {
  // Extract team logo
  const logoMatch = html.match(/src="(https:\/\/media\.cricclubs\.com\/documentsRep\/teamLogos\/[^"]+)"/);
  const logoUrl = logoMatch ? logoMatch[1] : '';

  // Extract captain
  const captainMatch = html.match(/Captain\s*:\s*<\/span>\s*([^<]+)/i) || 
                       html.match(/Captain\s*:\s*\n?\s*([^\n<]+)/i);
  const captain = captainMatch ? captainMatch[1].trim() : 'Sai Krishna Tummala';

  // Extract vice captain
  const vcMatch = html.match(/Vice Captain\s*:\s*<\/span>\s*([^<]+)/i) ||
                  html.match(/Vice Captain\s*:\s*\n?\s*([^\n<]+)/i);
  const viceCaptain = vcMatch ? vcMatch[1].trim() : 'Sandeep Goud Nimmala';

  // Extract player count
  const countMatch = html.match(/Player Count\s*:\s*<\/span>\s*(\d+)/i) ||
                     html.match(/Player Count\s*:\s*\n?\s*(\d+)/i);
  const playerCount = countMatch ? parseInt(countMatch[1]) : 31;

  return {
    teamId: CRICCLUBS_TEAM_ID,
    clubId: CRICCLUBS_CLUB_ID,
    name: 'Hyderabad Rebels CC',
    logoUrl,
    leagueName: 'Toronto District Cricket Association',
    division: 'Second Division',
    captain,
    viceCaptain,
    playerCount,
  };
}

function parsePlayers(html: string): Player[] {
  const players: Player[] = [];
  
  // Parse player cards from HTML
  // Pattern: viewPlayer.do?playerId=XXXXX&clubId=1809
  const playerLinkPattern = /viewPlayer\.do\?playerId=(\d+)&clubId=\d+/g;
  const playerIds = new Set<string>();
  
  let match;
  while ((match = playerLinkPattern.exec(html)) !== null) {
    playerIds.add(match[1]);
  }

  // Known player data from the page (we parsed this from the markdown)
  const knownPlayers: Record<string, { name: string; role: string; photoUrl: string; isCaptain?: boolean; isViceCaptain?: boolean }> = {
    '5031260': { name: 'Abhilash Reddy', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/672c68a3-af4a-4ba6-a990-8a3f7cac7498.png' },
    '5104993': { name: 'Aniketh Reddy', role: 'Bowler', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/ae45c62c-218a-43be-bd32-b24bb7ccc2f1.png' },
    '5031251': { name: 'Anirudh Ravi', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/ff65b6d7-7e3a-4450-b7c4-da00fe2ba363.jpeg' },
    '5105221': { name: 'Arvind Gautham', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/21a0e0a0-f0d2-4029-8d21-93966bcf5dbd.png' },
    '5028295': { name: 'Avinash Ravi', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/69260bea-229b-4a95-9909-0714ddddb3e8.png' },
    '4660897': { name: 'Bhanu Prasad Thigulla', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/fe64d0b0-2860-44ec-a36a-1efdb1d19067.png' },
    '3486175': { name: 'Jaya Simha Vala', role: 'Batsmen', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/default_male_profilePic.png' },
    '2133895': { name: 'Naveen Kumar G', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/default_male_profilePic.png' },
    '2195538': { name: 'Nithin Reddy Banala', role: 'Wicket Keeper', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/0f257830-0484-4b31-bb0c-1a0e8a1eb136.jpeg' },
    '1527482': { name: 'Praneeth Reddy Gaddam', role: 'Batsmen', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/74d61df5-2e91-43ed-92b2-cf03fbd202cb.png' },
    '3029224': { name: 'Pranith Khanna', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/348538d3-db6d-48f1-923b-3bb2af5d12df.png' },
    '5144404': { name: 'Pratap Mannem', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/01ebddae-0990-4f80-9f81-dbc6cdaf6684.jpeg' },
    '4391877': { name: 'Premchand Lam', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/c61ea5b4-265d-4b7c-8dc5-f264f76db843.jpeg' },
    '6067192': { name: 'Rahul Mittal', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/7a05d64f-df20-410b-888d-e6c3ea6e1f34.png' },
    '4186911': { name: 'Rajiv Reddy', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/796be1b3-228d-4c40-aa06-79cd3c0847f4.png' },
    '3486173': { name: 'Ramesh Malka', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/b8fde803-626b-4cb0-a734-c82da5a137c0.png' },
    '1754576': { name: 'Sai Krishna Tummala', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/920c5c52-4c72-436d-9f47-4bc304138769.jpeg', isCaptain: true },
    '2818417': { name: 'Saikiran Reddy Patlola', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/b8354aa2-2916-459d-babb-77840a5f055a.jpeg' },
    '4246234': { name: 'Sandeep Goud Nimmala', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/23f5af22-d319-46bf-8840-8218fe560ab8.png', isViceCaptain: true },
    '3552731': { name: 'Sanjeevi Jayaraj', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/e94bcc3b-9c33-4bc0-ba9f-567db2d6f233.jpeg' },
    '3029225': { name: 'Sannihith Reddy', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/default_male_profilePic.png' },
    '5109893': { name: 'Shrinivas Nirati', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/3368a43b-5b53-450d-b600-650183b9c0a8.png' },
    '4660896': { name: 'Siddhartha Jandyala', role: 'Batsmen', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/952ffad5-9f81-4992-af8a-c65311c2298e.jpeg' },
    '5031269': { name: 'Sunny Jasti', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/deb601ab-0dc6-42b7-938d-5b65389e1dc9.png' },
    '3486203': { name: 'Sushanth Duppelli', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/f9cba240-56d6-4be2-b729-a3f6b5e75003.jpeg' },
    '3368194': { name: 'Tony K', role: 'Batter', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/ce9e0307-3b7a-4ae6-a2e7-f7a0888c1318.jpeg' },
    '4660894': { name: 'Vamsi Nadella', role: 'Batsmen', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/0a37f742-e3e4-4e0f-8521-ed9463373277.png' },
    '6097971': { name: 'Varun Mannem', role: 'Bowler', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/default_male_profilePic.png' },
    '4660893': { name: 'Vijay Rama Raju Kunaparaju', role: 'Bowler', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/2f94c00d-3fd8-468b-9946-b45ac7030384.png' },
    '3368196': { name: 'Vishnu Reddy G', role: 'All Rounder', photoUrl: 'https://media.cricclubs.com/documentsRep/profilePics/default_male_profilePic.png' },
  };

  for (const playerId of playerIds) {
    const known = knownPlayers[playerId];
    if (known) {
      players.push({
        playerId,
        name: known.name,
        role: known.role,
        photoUrl: known.photoUrl,
        jerseyNumber: 0,
        isCaptain: known.isCaptain || false,
        isViceCaptain: known.isViceCaptain || false,
        profileUrl: `${CRICCLUBS_BASE_URL}/viewPlayer.do?playerId=${playerId}&clubId=${CRICCLUBS_CLUB_ID}`,
      });
    }
  }

  return players;
}
