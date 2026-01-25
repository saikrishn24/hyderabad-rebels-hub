import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const leagues2026 = [
  { name: "Lakeshore Cricket League", shortName: "LCL", format: "T20" },
  { name: "Toronto Super Cricket League", shortName: "TSCL", format: "100-Ball" },
  { name: "Toronto District Cricket Association", shortName: "TDCA", format: "40-Over" },
];

export const UpcomingFixturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fixtures" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold tracking-widest text-sm">2026 SEASON</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            UPCOMING <span className="text-gradient-orange">FIXTURES</span>
          </h2>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Fixtures Coming Soon
            </h3>
            
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The 2026 season schedules are being finalized. We're gearing up to compete in all three leagues again this year!
            </p>

            {/* Leagues for 2026 */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-4">Competing in 2026:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {leagues2026.map((league) => (
                  <div
                    key={league.shortName}
                    className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full"
                  >
                    <span className="text-sm font-semibold text-primary">{league.shortName}</span>
                    <span className="text-xs text-muted-foreground ml-2">({league.format})</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="font-display tracking-wide border-primary/50 hover:bg-primary/10"
              onClick={() => window.open("https://www.instagram.com/hydrebels_cricketclub", "_blank")}
            >
              <Bell className="mr-2 h-5 w-5" />
              Follow for Updates
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
