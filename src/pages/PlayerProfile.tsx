import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, ExternalLink, Trophy, Target, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  getPlayerById, 
  getPlayerStats, 
  getRoleColor,
  type Player,
  type BattingStats,
  type BowlingStats,
  type FieldingStats
} from "@/lib/cricclubs";

const PlayerProfile = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [stats, setStats] = useState<{
    batting: BattingStats | null;
    bowling: BowlingStats | null;
    fielding: FieldingStats | null;
  }>({ batting: null, bowling: null, fielding: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playerId) {
      loadPlayerData();
    }
  }, [playerId]);

  const loadPlayerData = async () => {
    if (!playerId) return;
    setLoading(true);
    try {
      const [playerData, statsData] = await Promise.all([
        getPlayerById(playerId),
        getPlayerStats(playerId),
      ]);
      setPlayer(playerData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading player:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading player...</p>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Player Not Found</h2>
          <p className="text-muted-foreground mb-6">The player you're looking for doesn't exist.</p>
          <Link to="/squad">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Squad
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <Link to="/squad" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Squad
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Player Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-muted border-2 border-primary/30">
                {player.photo_url && !player.photo_url.includes('default_male') ? (
                  <img 
                    src={player.photo_url} 
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-20 w-20 text-primary" />
                  </div>
                )}
              </div>
              {player.is_captain && (
                <div className="absolute -top-2 -right-2 bg-gold text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  CAPTAIN
                </div>
              )}
              {player.is_vice_captain && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  VICE CAPTAIN
                </div>
              )}
            </motion.div>

            {/* Player Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {player.name}
              </h1>
              <span className={`inline-block text-sm font-semibold px-4 py-1.5 rounded-full border ${getRoleColor(player.role)}`}>
                {player.role || 'Player'}
              </span>

              {player.jersey_number && (
                <p className="mt-4 text-muted-foreground">
                  Jersey #{player.jersey_number}
                </p>
              )}

              {player.profile_url && (
                <a
                  href={player.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on CricClubs
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Batting Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Trophy className="h-5 w-5 text-gold" />
                    Batting Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.batting && (stats.batting.matches ?? 0) > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Matches</span>
                        <span className="font-semibold">{stats.batting.matches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Innings</span>
                        <span className="font-semibold">{stats.batting.innings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Runs</span>
                        <span className="font-semibold text-gold">{stats.batting.runs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Highest Score</span>
                        <span className="font-semibold">{stats.batting.highest_score || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average</span>
                        <span className="font-semibold">{(stats.batting.average ?? 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Strike Rate</span>
                        <span className="font-semibold">{(stats.batting.strike_rate ?? 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">4s / 6s</span>
                        <span className="font-semibold">{stats.batting.fours ?? 0} / {stats.batting.sixes ?? 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">50s / 100s</span>
                        <span className="font-semibold">{stats.batting.fifties ?? 0} / {stats.batting.hundreds ?? 0}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No batting statistics available</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Bowling Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Target className="h-5 w-5 text-primary" />
                    Bowling Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.bowling && (stats.bowling.matches ?? 0) > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Matches</span>
                        <span className="font-semibold">{stats.bowling.matches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Innings</span>
                        <span className="font-semibold">{stats.bowling.innings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Overs</span>
                        <span className="font-semibold">{stats.bowling.overs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Wickets</span>
                        <span className="font-semibold text-primary">{stats.bowling.wickets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best Figures</span>
                        <span className="font-semibold">{stats.bowling.best_figures || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Economy</span>
                        <span className="font-semibold">{(stats.bowling.economy ?? 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average</span>
                        <span className="font-semibold">{(stats.bowling.average ?? 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">5 Wickets</span>
                        <span className="font-semibold">{stats.bowling.five_wickets ?? 0}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No bowling statistics available</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Fielding Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Shield className="h-5 w-5 text-accent" />
                    Fielding Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.fielding ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Catches</span>
                        <span className="font-semibold">{stats.fielding.catches ?? 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stumpings</span>
                        <span className="font-semibold">{stats.fielding.stumpings ?? 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Run Outs</span>
                        <span className="font-semibold">{stats.fielding.run_outs ?? 0}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No fielding statistics available</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayerProfile;
