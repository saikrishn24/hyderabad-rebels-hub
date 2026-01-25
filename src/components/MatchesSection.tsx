import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Trophy, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Match {
  id: number;
  opponent: string;
  date: string;
  result: "won" | "lost" | "abandoned";
  margin: string;
  rebelsScore: string;
  opponentScore: string;
  scorecardUrl: string;
}

interface League {
  id: string;
  name: string;
  shortName: string;
  division: string;
  format: string;
  resultsUrl: string;
  matches: Match[];
}

// TDCA 2025 Season - Second Division (40-over format)
const tdcaMatches: Match[] = [
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

// Lakeshore Cricket League 2025 - 1st Division (T20 format)
const lclMatches: Match[] = [
  {
    id: 1,
    opponent: "Kingfishers, Eagles CC",
    date: "Aug 30, 2025",
    result: "lost",
    margin: "by 8 Wickets",
    rebelsScore: "136/7 (20.0)",
    opponentScore: "140/2 (18.1)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4876&clubId=4063",
  },
  {
    id: 2,
    opponent: "United Kashmiri Phoenix",
    date: "Aug 20, 2025",
    result: "won",
    margin: "by 3 Wickets",
    rebelsScore: "149/7 (19.4)",
    opponentScore: "148/3 (20.0)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4847&clubId=4063",
  },
  {
    id: 3,
    opponent: "GSC Warriors",
    date: "Aug 14, 2025",
    result: "lost",
    margin: "by 6 Wickets",
    rebelsScore: "139/8 (20.0)",
    opponentScore: "140/4 (16.4)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4822&clubId=4063",
  },
  {
    id: 4,
    opponent: "Dragons, Eagles CC",
    date: "Aug 1, 2025",
    result: "won",
    margin: "by 14 Runs",
    rebelsScore: "131/8 (20.0)",
    opponentScore: "117/7 (18.3)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4765&clubId=4063",
  },
  {
    id: 5,
    opponent: "CANPR",
    date: "Jul 28, 2025",
    result: "won",
    margin: "by 96 Runs",
    rebelsScore: "254/8 (20.0)",
    opponentScore: "158/7 (19.0)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4748&clubId=4063",
  },
  {
    id: 6,
    opponent: "Tigers, Eagles CC",
    date: "Jul 21, 2025",
    result: "lost",
    margin: "by 32 Runs",
    rebelsScore: "125/10 (19.4)",
    opponentScore: "157/6 (20.0)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4721&clubId=4063",
  },
  {
    id: 7,
    opponent: "Backyard Cricket Club",
    date: "Jul 11, 2025",
    result: "won",
    margin: "by 95 Runs",
    rebelsScore: "208/7 (20.0)",
    opponentScore: "113/9 (19.0)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4682&clubId=4063",
  },
  {
    id: 8,
    opponent: "Chola Cricket Club",
    date: "Jul 1, 2025",
    result: "won",
    margin: "by 91 Runs",
    rebelsScore: "191/9 (20.0)",
    opponentScore: "100/9 (20.0)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4636&clubId=4063",
  },
  {
    id: 9,
    opponent: "Royal Cricket Academy",
    date: "Jun 27, 2025",
    result: "lost",
    margin: "by 7 Wickets",
    rebelsScore: "73/10 (15.3)",
    opponentScore: "74/3 (11.4)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4622&clubId=4063",
  },
  {
    id: 10,
    opponent: "Vaughan Super Kings",
    date: "Jun 13, 2025",
    result: "won",
    margin: "by 35 Runs",
    rebelsScore: "161/8 (20.0)",
    opponentScore: "126/5 (20.0)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4564&clubId=4063",
  },
  {
    id: 11,
    opponent: "Warriors, Eagles CC",
    date: "Jun 4, 2025",
    result: "won",
    margin: "by 7 Wickets",
    rebelsScore: "128/3 (14.0)",
    opponentScore: "127/9 (18.4)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4529&clubId=4063",
  },
  {
    id: 12,
    opponent: "Dream Crest United First",
    date: "May 22, 2025",
    result: "abandoned",
    margin: "Match Abandoned",
    rebelsScore: "-",
    opponentScore: "0/0 (0.0)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4472&clubId=4063",
  },
  {
    id: 13,
    opponent: "Hamilton Rams",
    date: "May 6, 2025",
    result: "won",
    margin: "by 32 Runs",
    rebelsScore: "147/6 (20.0)",
    opponentScore: "115/10 (19.3)",
    scorecardUrl: "https://cricclubs.com/LakeshoreCricket/viewScorecard.do?matchId=4420&clubId=4063",
  },
];

// Toronto Super Cricket League 2025 - The Hundred format
const tsclMatches: Match[] = [
  {
    id: 1,
    opponent: "Mailam Cricket Club",
    date: "Sep 10, 2025",
    result: "lost",
    margin: "by 5 Wickets",
    rebelsScore: "134/5 (100)",
    opponentScore: "135/5 (95)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1200&clubId=1003702",
  },
  {
    id: 2,
    opponent: "Durham Maple Leafs",
    date: "Aug 13, 2025",
    result: "lost",
    margin: "by 33 Runs",
    rebelsScore: "93/6 (100)",
    opponentScore: "126/7 (100)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1190&clubId=1003702",
  },
  {
    id: 3,
    opponent: "Toronto Rebels Cricket Club",
    date: "Aug 6, 2025",
    result: "lost",
    margin: "by 5 Wickets",
    rebelsScore: "106/8 (100)",
    opponentScore: "107/5 (94)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1187&clubId=1003702",
  },
  {
    id: 4,
    opponent: "Scarborough Nepali Cricket Club",
    date: "Jul 30, 2025",
    result: "lost",
    margin: "by 4 Wickets",
    rebelsScore: "94/10 (88)",
    opponentScore: "98/6 (80)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1183&clubId=1003702",
  },
  {
    id: 5,
    opponent: "Toronto Rebels Cricket Club",
    date: "Jul 9, 2025",
    result: "abandoned",
    margin: "Abandoned (D/L)",
    rebelsScore: "121/7 (84)",
    opponentScore: "23/2 (17)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1178&clubId=1003702",
  },
  {
    id: 6,
    opponent: "Mailam Cricket Club",
    date: "Jun 25, 2025",
    result: "won",
    margin: "by 4 Wickets",
    rebelsScore: "129/6 (98)",
    opponentScore: "128/8 (100)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1174&clubId=1003702",
  },
  {
    id: 7,
    opponent: "CTS Toronto",
    date: "Jun 11, 2025",
    result: "lost",
    margin: "by 167 Runs",
    rebelsScore: "62/10 (97)",
    opponentScore: "229/3 (100)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1171&clubId=1003702",
  },
  {
    id: 8,
    opponent: "Victoria Park CC",
    date: "May 28, 2025",
    result: "abandoned",
    margin: "Match Abandoned",
    rebelsScore: "-",
    opponentScore: "0/0 (0)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1167&clubId=1003702",
  },
  {
    id: 9,
    opponent: "SD Strikers",
    date: "May 21, 2025",
    result: "abandoned",
    margin: "Match Abandoned",
    rebelsScore: "-",
    opponentScore: "0/0 (0)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1164&clubId=1003702",
  },
  {
    id: 10,
    opponent: "Durham Maple Leafs",
    date: "May 7, 2025",
    result: "lost",
    margin: "by 66 Runs",
    rebelsScore: "81/8 (95)",
    opponentScore: "147/8 (100)",
    scorecardUrl: "https://cricclubs.com/TorontoSuperCricketLeague/viewScorecard.do?matchId=1161&clubId=1003702",
  },
];

const leagues: League[] = [
  {
    id: "lcl",
    name: "Lakeshore Cricket League",
    shortName: "LCL T20",
    division: "1st Division",
    format: "T20",
    resultsUrl: "https://cricclubs.com/LakeshoreCricket/teamResults.do?teamId=1077&league=113&clubId=4063",
    matches: lclMatches,
  },
  {
    id: "tscl",
    name: "Toronto Super Cricket League",
    shortName: "TSCL 100",
    division: "The Hundred",
    format: "100-Ball",
    resultsUrl: "https://cricclubs.com/TorontoSuperCricketLeague/teamResults.do?teamId=257&clubId=1003702",
    matches: tsclMatches,
  },
  {
    id: "tdca",
    name: "Toronto District Cricket Association",
    shortName: "TDCA",
    division: "Second Division",
    format: "40-Over",
    resultsUrl: "https://cricclubs.com/TDCA/teamResults.do?teamId=4044&clubId=1809",
    matches: tdcaMatches,
  },
];

const MatchCard = ({ match, index, isInView }: { match: Match; index: number; isInView: boolean }) => (
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
        : match.result === "abandoned"
        ? "border-muted-foreground/30 hover:border-muted-foreground/60"
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
              : match.result === "abandoned"
              ? "bg-muted text-muted-foreground"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {match.result.toUpperCase()}
        </span>
        <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
    
    {match.result !== "abandoned" && (
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
    )}
    
    <p className={`text-xs mt-2 font-medium ${
      match.result === "won" 
        ? "text-green-400" 
        : match.result === "abandoned"
        ? "text-muted-foreground"
        : "text-red-400"
    }`}>
      {match.result === "won" ? "Won" : match.result === "abandoned" ? "" : "Lost"} {match.margin}
    </p>
  </motion.a>
);

export const MatchesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLeague, setActiveLeague] = useState("lcl");

  const _currentLeague = leagues.find(l => l.id === activeLeague) || leagues[0];

  return (
    <section id="matches" className="section-padding bg-card" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-gold font-semibold tracking-widest text-sm">2025 SEASON</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            MATCH <span className="text-gradient-gold">RESULTS</span>
          </h2>
        </motion.div>

        {/* League Tabs */}
        <Tabs value={activeLeague} onValueChange={setActiveLeague} className="w-full">
          <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 mb-6">
            {leagues.map(league => (
              <TabsTrigger key={league.id} value={league.id} className="font-display">
                {league.shortName}
              </TabsTrigger>
            ))}
          </TabsList>

          {leagues.map(league => {
            const leagueWins = league.matches.filter(m => m.result === "won").length;
            const leagueLosses = league.matches.filter(m => m.result === "lost").length;
            const leagueAbandoned = league.matches.filter(m => m.result === "abandoned").length;

            return (
              <TabsContent key={league.id} value={league.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* League Info */}
                  <div className="text-center mb-8">
                    <h3 className="text-lg font-semibold text-foreground">{league.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {league.division} • {league.format} • Record:{" "}
                      <span className="text-green-400 font-semibold">{leagueWins}W</span>
                      {" - "}
                      <span className="text-red-400 font-semibold">{leagueLosses}L</span>
                      {leagueAbandoned > 0 && (
                        <>
                          {" - "}
                          <span className="text-muted-foreground font-semibold">{leagueAbandoned}A</span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Match Results Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {league.matches.map((match, index) => (
                      <MatchCard key={match.id} match={match} index={index} isInView={isInView} />
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
                      onClick={() => window.open(league.resultsUrl, "_blank")}
                    >
                      <Trophy className="mr-2 h-5 w-5" />
                      View Full {league.shortName} Results
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
