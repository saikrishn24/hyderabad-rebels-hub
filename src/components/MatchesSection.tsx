import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Match {
  id: number;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  type: "upcoming" | "completed";
  result?: "won" | "lost" | "draw";
  score?: { rebels: string; opponent: string };
}

const matches: Match[] = [
  {
    id: 1,
    opponent: "Secunderabad Strikers",
    date: "Feb 8, 2025",
    time: "9:00 AM",
    venue: "LB Stadium, Hyderabad",
    type: "upcoming",
  },
  {
    id: 2,
    opponent: "Cyberabad Warriors",
    date: "Feb 15, 2025",
    time: "2:00 PM",
    venue: "HITEX Grounds",
    type: "upcoming",
  },
  {
    id: 3,
    opponent: "Gachibowli Giants",
    date: "Feb 22, 2025",
    time: "9:00 AM",
    venue: "Gachibowli Stadium",
    type: "upcoming",
  },
  {
    id: 4,
    opponent: "Jubilee Hills XI",
    date: "Jan 25, 2025",
    time: "9:00 AM",
    venue: "KBR Park Grounds",
    type: "completed",
    result: "won",
    score: { rebels: "186/4", opponent: "142/10" },
  },
  {
    id: 5,
    opponent: "Banjara Kings",
    date: "Jan 18, 2025",
    time: "2:00 PM",
    venue: "Fateh Maidan",
    type: "completed",
    result: "won",
    score: { rebels: "205/6", opponent: "178/9" },
  },
  {
    id: 6,
    opponent: "Charminar Challengers",
    date: "Jan 11, 2025",
    time: "9:00 AM",
    venue: "Nizam College Grounds",
    type: "completed",
    result: "lost",
    score: { rebels: "156/10", opponent: "158/3" },
  },
];

const upcomingMatches = matches.filter((m) => m.type === "upcoming");
const recentResults = matches.filter((m) => m.type === "completed");

export const MatchesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="matches" className="section-padding bg-card" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold tracking-widest text-sm">FIXTURES & RESULTS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            MATCH <span className="text-gradient-gold">SCHEDULE</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Matches */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Calendar className="h-6 w-6 text-gold" />
              Upcoming Fixtures
            </h3>
            <div className="space-y-4">
              {upcomingMatches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="bg-background border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-display text-lg font-bold text-foreground">Rebels vs {match.opponent}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {match.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {match.time}
                        </span>
                      </div>
                    </div>
                    <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full">
                      UPCOMING
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {match.venue}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Results */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Recent Results
            </h3>
            <div className="space-y-4">
              {recentResults.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className={`bg-background border rounded-lg p-5 ${
                    match.result === "won"
                      ? "border-green-500/30"
                      : match.result === "lost"
                      ? "border-red-500/30"
                      : "border-border"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-display text-lg font-bold text-foreground">Rebels vs {match.opponent}</p>
                      <p className="text-sm text-muted-foreground mt-1">{match.date}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        match.result === "won"
                          ? "bg-green-500/20 text-green-400"
                          : match.result === "lost"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {match.result?.toUpperCase()}
                    </span>
                  </div>
                  {match.score && (
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gold font-semibold">Rebels: {match.score.rebels}</span>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-muted-foreground">{match.opponent.split(" ")[0]}: {match.score.opponent}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="font-display tracking-wide border-primary/50 hover:bg-primary/10">
            View Full Schedule
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
