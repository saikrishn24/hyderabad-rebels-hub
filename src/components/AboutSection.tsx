import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Target, Users, Trophy, Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every match, every practice, and every moment on the field.",
  },
  {
    icon: Users,
    title: "Team Spirit",
    description: "United as one, we believe that together we can overcome any challenge.",
  },
  {
    icon: Trophy,
    title: "Victory",
    description: "Our hunger for victory drives us to push beyond our limits every single day.",
  },
  {
    icon: Star,
    title: "Integrity",
    description: "We play fair, respect our opponents, and uphold the spirit of cricket.",
  },
];

interface TopScorer {
  name: string;
  runs: number;
  matches: number;
  avg: number;
}

interface TopBowler {
  name: string;
  wickets: number;
  matches: number;
  econ: number;
}

// Fallback data when database stats are empty
const fallbackScorers: TopScorer[] = [
  { name: "Aravind Reddy", runs: 342, matches: 14, avg: 28.5 },
  { name: "Karthik Srinivas", runs: 298, matches: 12, avg: 27.1 },
  { name: "Prashanth Kumar", runs: 267, matches: 15, avg: 22.3 },
];

const fallbackBowlers: TopBowler[] = [
  { name: "Vijay Mohan", wickets: 18, matches: 13, econ: 6.2 },
  { name: "Ravi Teja", wickets: 15, matches: 14, econ: 7.1 },
  { name: "Suresh Babu", wickets: 12, matches: 11, econ: 6.8 },
];

const seasonStats = {
  matchesPlayed: 35,
  wins: 11,
  losses: 20,
  abandoned: 4,
  leagues: ["TDCA", "LCL", "TSCL"],
};

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [topScorers, setTopScorers] = useState<TopScorer[]>(fallbackScorers);
  const [topBowlers, setTopBowlers] = useState<TopBowler[]>(fallbackBowlers);
  const [loading, setLoading] = useState(true);
  const [isFromDatabase, setIsFromDatabase] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch top scorers
        const { data: battingData } = await supabase
          .from('cricclubs_batting_stats')
          .select(`
            runs,
            matches,
            average,
            player_id
          `)
          .gt('runs', 0)
          .order('runs', { ascending: false })
          .limit(3);

        // Fetch top bowlers
        const { data: bowlingData } = await supabase
          .from('cricclubs_bowling_stats')
          .select(`
            wickets,
            matches,
            economy,
            player_id
          `)
          .gt('wickets', 0)
          .order('wickets', { ascending: false })
          .limit(3);

        // If we have batting stats, get player names
        if (battingData && battingData.length > 0) {
          const playerIds = battingData.map(b => b.player_id);
          const { data: players } = await supabase
            .from('cricclubs_players')
            .select('player_id, name')
            .in('player_id', playerIds);

          const playerMap = new Map(players?.map(p => [p.player_id, p.name]) || []);
          
          const scorers: TopScorer[] = battingData.map(b => ({
            name: playerMap.get(b.player_id) || 'Unknown',
            runs: b.runs || 0,
            matches: b.matches || 0,
            avg: Number(b.average) || 0,
          }));
          
          setTopScorers(scorers);
          setIsFromDatabase(true);
        }

        // If we have bowling stats, get player names
        if (bowlingData && bowlingData.length > 0) {
          const playerIds = bowlingData.map(b => b.player_id);
          const { data: players } = await supabase
            .from('cricclubs_players')
            .select('player_id, name')
            .in('player_id', playerIds);

          const playerMap = new Map(players?.map(p => [p.player_id, p.name]) || []);
          
          const bowlers: TopBowler[] = bowlingData.map(b => ({
            name: playerMap.get(b.player_id) || 'Unknown',
            wickets: b.wickets || 0,
            matches: b.matches || 0,
            econ: Number(b.economy) || 0,
          }));
          
          setTopBowlers(bowlers);
          setIsFromDatabase(true);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep fallback data on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="about" className="section-padding bg-card" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-widest text-sm">WHO WE ARE</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            ABOUT THE <span className="text-gradient-orange">REBELS</span>
          </h2>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Founded in 2023, the <span className="text-foreground font-semibold">Hyderabad Rebels Cricket Club</span> emerged from a shared passion for cricket and a burning desire to compete at the highest level. Based in Scarborough, Ontario, what started as a group of cricket enthusiasts has quickly evolved into one of the GTA's most competitive cricket teams.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Training at Ellesmere Reservoir Park, our journey has been marked by relentless dedication, countless hours of practice, and an unwavering commitment to excellence. We bring the spirit of Hyderabad cricket to Canada, combining passion with skill.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-background border border-border rounded-lg p-6 text-center hover-lift"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Season Stats & Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 via-background to-primary/5 border border-border rounded-xl p-8"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-8 text-foreground">
            <Trophy className="inline-block mr-2 h-6 w-6 text-primary" />
            2025 Season Highlights
          </h3>
          
          {/* Season Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-background/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-display font-bold text-foreground">{seasonStats.matchesPlayed}</p>
              <p className="text-xs text-muted-foreground">Matches Played</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-display font-bold text-accent">{seasonStats.wins}</p>
              <p className="text-xs text-muted-foreground">Victories</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-display font-bold text-destructive">{seasonStats.losses}</p>
              <p className="text-xs text-muted-foreground">Losses</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4 text-center">
              <p className="text-3xl font-display font-bold text-gold">{seasonStats.leagues.length}</p>
              <p className="text-xs text-muted-foreground">Leagues</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading stats...</span>
            </div>
          ) : (
            <>
              {!isFromDatabase && (
                <p className="text-center text-xs text-muted-foreground mb-4">
                  * Displaying season summary stats
                </p>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Top Scorers */}
                <div>
                  <h4 className="font-display text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                    <Star className="h-5 w-5 text-gold" />
                    Top Run Scorers
                  </h4>
                  <div className="space-y-3">
                    {topScorers.map((player, index) => (
                      <motion.div
                        key={player.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        className="flex items-center justify-between bg-background/50 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? "bg-gold text-background" : 
                            index === 1 ? "bg-muted text-foreground" : 
                            "bg-secondary text-secondary-foreground"
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-medium text-foreground">{player.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gold">{player.runs}</p>
                          <p className="text-xs text-muted-foreground">{player.matches} matches • Avg {player.avg.toFixed(1)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Top Bowlers */}
                <div>
                  <h4 className="font-display text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Top Wicket Takers
                  </h4>
                  <div className="space-y-3">
                    {topBowlers.map((player, index) => (
                      <motion.div
                        key={player.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        className="flex items-center justify-between bg-background/50 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? "bg-primary text-primary-foreground" : 
                            index === 1 ? "bg-muted text-foreground" : 
                            "bg-secondary text-secondary-foreground"
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-medium text-foreground">{player.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{player.wickets}</p>
                          <p className="text-xs text-muted-foreground">{player.matches} matches • Econ {player.econ.toFixed(1)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};
