import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { User, RefreshCw, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  getPlayers, 
  syncCricClubsData, 
  getCacheStatus, 
  getRoleColor,
  type Player,
  type CacheStatus
} from "@/lib/cricclubs";
import { toast } from "sonner";

const roleFilters = ['All', 'Batter', 'Bowler', 'All Rounder', 'Wicket Keeper'];

export const CricClubsSquadSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [cacheStatus, setCacheStatus] = useState<CacheStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [players, searchQuery, roleFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [playersData, status] = await Promise.all([
        getPlayers(),
        getCacheStatus(),
      ]);
      
      setPlayers(playersData);
      setCacheStatus(status);

      // If no data or stale, trigger sync
      if (playersData.length === 0 || status.isStale) {
        await handleSync(false);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load player data');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (showToast: boolean = true) => {
    setSyncing(true);
    try {
      const result = await syncCricClubsData(true);
      if (result.success) {
        if (showToast) toast.success(result.message);
        // Reload data after sync
        const [playersData, status] = await Promise.all([
          getPlayers(),
          getCacheStatus(),
        ]);
        setPlayers(playersData);
        setCacheStatus(status);
      } else {
        if (showToast) toast.error(result.message);
      }
    } catch {
      if (showToast) toast.error('Failed to sync data');
    } finally {
      setSyncing(false);
    }
  };

  const filterPlayers = () => {
    let filtered = [...players];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== 'All') {
      filtered = filtered.filter(p => p.role === roleFilter);
    }

    setFilteredPlayers(filtered);
  };

  const formatLastUpdated = (dateStr: string | null) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section id="squad" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-semibold tracking-widest text-sm">THE WARRIORS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            MEET THE <span className="text-gradient-orange">SQUAD</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Our talented roster competing in the Toronto District Cricket Association.
          </p>
          
          {/* Cache status */}
          {cacheStatus && (
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Last updated: {formatLastUpdated(cacheStatus.lastUpdated)}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSync(true)}
                disabled={syncing}
                className="h-7 px-2"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${syncing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {roleFilters.map((role) => (
              <Button
                key={role}
                variant={roleFilter === role ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter(role)}
                className="text-xs"
              >
                {role}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Loading players...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">
              {players.length === 0 
                ? 'No players found. Click refresh to sync from CricClubs.'
                : 'No players match your search criteria.'}
            </p>
          </div>
        )}

        {/* Players Grid */}
        {!loading && filteredPlayers.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player, index) => (
              <motion.div
                key={player.player_id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + (index % 8) * 0.05 }}
                className="group relative bg-card-gradient border border-border rounded-xl overflow-hidden hover-lift"
              >
                {/* Captain/VC Badge */}
                {player.is_captain && (
                  <div className="absolute top-3 right-3 z-10 bg-gold text-secondary-foreground text-xs font-bold px-2 py-1 rounded">
                    CAPTAIN
                  </div>
                )}
                {player.is_vice_captain && (
                  <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                    VICE CAPTAIN
                  </div>
                )}

                {/* Avatar Area */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center overflow-hidden">
                  {player.photo_url && !player.photo_url.includes('default_male') ? (
                    <img 
                      src={player.photo_url} 
                      alt={player.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-24 h-24 rounded-full bg-background/80 border-2 border-primary/50 flex items-center justify-center ${player.photo_url && !player.photo_url.includes('default_male') ? 'hidden' : ''}`}>
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground mb-1 truncate" title={player.name}>
                    {player.name}
                  </h3>
                  
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${getRoleColor(player.role)}`}>
                    {player.role || 'Player'}
                  </span>

                  {/* CricClubs Link */}
                  {player.profile_url && (
                    <a
                      href={player.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View on CricClubs
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Player count */}
        {!loading && filteredPlayers.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-8 text-sm text-muted-foreground"
          >
            Showing {filteredPlayers.length} of {players.length} players
          </motion.p>
        )}
      </div>
    </section>
  );
};
