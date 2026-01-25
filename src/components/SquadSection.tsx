import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";

interface Player {
  name: string;
  role: string;
  specialty: string;
  matches: number;
  runs?: number;
  wickets?: number;
  average?: number;
  isCaptain?: boolean;
}

const players: Player[] = [
  { name: "Rahul Sharma", role: "Batsman", specialty: "Opening Batsman", matches: 48, runs: 1856, average: 42.5, isCaptain: true },
  { name: "Vikram Reddy", role: "All-rounder", specialty: "Batting All-rounder", matches: 45, runs: 1234, wickets: 38 },
  { name: "Arjun Rao", role: "Bowler", specialty: "Fast Bowler", matches: 42, wickets: 67, average: 18.2 },
  { name: "Karthik Naidu", role: "Batsman", specialty: "Middle Order", matches: 40, runs: 987, average: 35.6 },
  { name: "Mohammed Ali", role: "Bowler", specialty: "Spin Bowler", matches: 38, wickets: 54, average: 21.4 },
  { name: "Suresh Kumar", role: "Wicketkeeper", specialty: "Keeper-Batsman", matches: 50, runs: 765, average: 28.3 },
  { name: "Praneeth Varma", role: "All-rounder", specialty: "Bowling All-rounder", matches: 35, runs: 456, wickets: 42 },
  { name: "Aditya Singh", role: "Batsman", specialty: "Finisher", matches: 30, runs: 654, average: 38.9 },
];

const roleColors: Record<string, string> = {
  "Batsman": "bg-gold/20 text-gold border-gold/30",
  "Bowler": "bg-primary/20 text-primary border-primary/30",
  "All-rounder": "bg-green-500/20 text-green-400 border-green-500/30",
  "Wicketkeeper": "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export const SquadSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="squad" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold tracking-widest text-sm">THE WARRIORS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            MEET THE <span className="text-gradient-crimson">SQUAD</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A team of passionate cricketers united by their love for the game and commitment to excellence.
          </p>
        </motion.div>

        {/* Players Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player, index) => (
            <motion.div
              key={player.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group relative bg-card-gradient border border-border rounded-xl overflow-hidden hover-lift"
            >
              {/* Captain Badge */}
              {player.isCaptain && (
                <div className="absolute top-3 right-3 z-10 bg-gold text-secondary-foreground text-xs font-bold px-2 py-1 rounded">
                  CAPTAIN
                </div>
              )}

              {/* Avatar Area */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-background/80 border-2 border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{player.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{player.specialty}</p>
                
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${roleColors[player.role]}`}>
                  {player.role}
                </span>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Matches</p>
                    <p className="font-display text-lg font-bold text-foreground">{player.matches}</p>
                  </div>
                  {player.runs && (
                    <div>
                      <p className="text-xs text-muted-foreground">Runs</p>
                      <p className="font-display text-lg font-bold text-gold">{player.runs}</p>
                    </div>
                  )}
                  {player.wickets && (
                    <div>
                      <p className="text-xs text-muted-foreground">Wickets</p>
                      <p className="font-display text-lg font-bold text-primary">{player.wickets}</p>
                    </div>
                  )}
                  {player.average && (
                    <div>
                      <p className="text-xs text-muted-foreground">Average</p>
                      <p className="font-display text-lg font-bold text-foreground">{player.average}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
