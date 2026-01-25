import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Match {
  id: number;
  opponent: string;
  date: string;
  result: "won" | "lost";
  margin: string;
  rebelsScore: string;
  opponentScore: string;
  scorecardUrl: string;
}

// Real match data from CricClubs - TDCA 2025 Season - Second Division
const matches: Match[] = [
  {
    id: 1,
    opponent: "Mississauga Ramblers - Gold",
    date: "Sep 7, 2025",
    result: "lost",
    margin: "by 184 Runs",
    rebelsScore: "68/9 (19.4)",
    opponentScore: "252/8 (40.0)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=20486&clubId=1809",
  },
  {
    id: 2,
    opponent: "Vaughan - St Edmunds Canadians",
    date: "Aug 16, 2025",
    result: "lost",
    margin: "by 57 Runs",
    rebelsScore: "115/10 (31.2)",
    opponentScore: "172/10 (40.0)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=20201&clubId=1809",
  },
  {
    id: 3,
    opponent: "Bangla CC",
    date: "Aug 9, 2025",
    result: "lost",
    margin: "by 7 Wickets",
    rebelsScore: "56/10 (23.1)",
    opponentScore: "57/3 (11.5)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=20129&clubId=1809",
  },
  {
    id: 4,
    opponent: "Cd Hurricanes CC",
    date: "Jul 26, 2025",
    result: "lost",
    margin: "by 143 Runs",
    rebelsScore: "39/5 (16.0)",
    opponentScore: "182/10 (29.5)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19967&clubId=1809",
  },
  {
    id: 5,
    opponent: "Durham Strikers CC",
    date: "Jul 20, 2025",
    result: "won",
    margin: "by 8 Runs",
    rebelsScore: "148/10 (39.3)",
    opponentScore: "140/10 (37.1)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19913&clubId=1809",
  },
  {
    id: 6,
    opponent: "Ajax CC",
    date: "Jul 19, 2025",
    result: "lost",
    margin: "by 17 Runs",
    rebelsScore: "118/10 (26.3)",
    opponentScore: "135/10 (35.3)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19877&clubId=1809",
  },
  {
    id: 7,
    opponent: "MS Boys Sports Club",
    date: "Jul 5, 2025",
    result: "lost",
    margin: "by 74 Runs",
    rebelsScore: "155/10 (37.3)",
    opponentScore: "229/10 (39.5)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19717&clubId=1809",
  },
  {
    id: 8,
    opponent: "MISSISSAUGA RAMBLERS - MAROON",
    date: "Jun 28, 2025",
    result: "lost",
    margin: "by 88 Runs",
    rebelsScore: "146/10 (34.0)",
    opponentScore: "234/10 (36.5)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19618&clubId=1809",
  },
  {
    id: 9,
    opponent: "Durham Strikers CC",
    date: "Jun 22, 2025",
    result: "lost",
    margin: "by 27 Runs",
    rebelsScore: "155/10 (34.2)",
    opponentScore: "182/10 (36.1)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19597&clubId=1809",
  },
  {
    id: 10,
    opponent: "Wolfpack CC",
    date: "Jun 15, 2025",
    result: "lost",
    margin: "by 9 Wickets",
    rebelsScore: "99/10 (28.3)",
    opponentScore: "100/1 (23.5)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19534&clubId=1809",
  },
  {
    id: 11,
    opponent: "CTS / United Rebels Cricket Club",
    date: "Jun 7, 2025",
    result: "won",
    margin: "by 63 Runs",
    rebelsScore: "144/10 (32.0)",
    opponentScore: "81/10 (28.4)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19406&clubId=1809",
  },
  {
    id: 12,
    opponent: "Vaughan - St Edmunds Canadians",
    date: "Jun 1, 2025",
    result: "lost",
    margin: "by 40 Runs",
    rebelsScore: "110/10 (31.2)",
    opponentScore: "150/10 (39.5)",
    scorecardUrl: "https://cricclubs.com/TDCA/viewScorecard.do?matchId=19388&clubId=1809",
  },
];

export const MatchesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const wins = matches.filter(m => m.result === "won").length;
  const losses = matches.filter(m => m.result === "lost").length;

  return (
    <section id="matches" className="section-padding bg-card" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-semibold tracking-widest text-sm">TDCA 2025 SEASON</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            MATCH <span className="text-gradient-gold">RESULTS</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Second Division • Season Record: <span className="text-green-400 font-semibold">{wins}W</span> - <span className="text-red-400 font-semibold">{losses}L</span>
          </p>
        </motion.div>

        {/* Match Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match, index) => (
            <motion.a
              key={match.id}
              href={match.scorecardUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + (index % 6) * 0.05 }}
              className={`bg-background border rounded-lg p-4 hover:scale-[1.02] transition-all cursor-pointer group ${
                match.result === "won"
                  ? "border-green-500/30 hover:border-green-500/60"
                  : "border-red-500/30 hover:border-red-500/60"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm font-bold text-foreground truncate" title={match.opponent}>
                    vs {match.opponent}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{match.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      match.result === "won"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {match.result.toUpperCase()}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gold font-semibold">Rebels</span>
                  <span className="text-foreground">{match.rebelsScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{match.opponent.split(" ")[0]}</span>
                  <span className="text-muted-foreground">{match.opponentScore}</span>
                </div>
              </div>
              
              <p className={`text-xs mt-2 font-medium ${
                match.result === "won" ? "text-green-400" : "text-red-400"
              }`}>
                {match.result === "won" ? "Won" : "Lost"} {match.margin}
              </p>
            </motion.a>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10"
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="font-display tracking-wide border-primary/50 hover:bg-primary/10"
            onClick={() => window.open("https://cricclubs.com/TDCA/teamResults.do?teamId=4044&clubId=1809", "_blank")}
          >
            <Trophy className="mr-2 h-5 w-5" />
            View Full Results on CricClubs
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
