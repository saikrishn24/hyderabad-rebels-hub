import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp, Award, Target, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const seasonStats = {
  matchesPlayed: 35,
  wins: 11,
  losses: 20,
  abandoned: 4,
  leagues: ["TDCA", "LCL", "TSCL"],
};

const achievements = [
  {
    icon: Medal,
    title: "LCL Semi-Finalists",
    description: "Reached the Semi-Finals in Lakeshore Cricket League T20 1st Division",
    highlight: true,
  },
  {
    icon: TrendingUp,
    title: "3rd in Points Table",
    description: "Finished 3rd in the LCL T20 league standings",
    highlight: true,
  },
  {
    icon: Award,
    title: "Top Performances",
    description: "Multiple match-winning performances across all three leagues",
    highlight: false,
  },
  {
    icon: Trophy,
    title: "3 League Debut",
    description: "Successfully competed in TDCA, LCL, and TSCL in our debut season",
    highlight: false,
  },
];

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

const Statistics = () => {
  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-gold font-semibold tracking-widest text-sm">OUR JOURNEY</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
              STATISTICS & <span className="text-gradient-gold">ACHIEVEMENTS</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A look at our performance, milestones, and the values that drive us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Season Summary */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/10 via-background to-primary/5 border border-border rounded-xl p-8"
          >
            <h2 className="font-display text-2xl font-bold text-center mb-8 text-foreground">
              <Trophy className="inline-block mr-2 h-6 w-6 text-primary" />
              2025 Season Summary
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background/50 rounded-lg p-6 text-center">
                <p className="text-4xl font-display font-bold text-foreground">{seasonStats.matchesPlayed}</p>
                <p className="text-sm text-muted-foreground mt-1">Matches Played</p>
              </div>
              <div className="bg-background/50 rounded-lg p-6 text-center">
                <p className="text-4xl font-display font-bold text-accent">{seasonStats.wins}</p>
                <p className="text-sm text-muted-foreground mt-1">Victories</p>
              </div>
              <div className="bg-background/50 rounded-lg p-6 text-center">
                <p className="text-4xl font-display font-bold text-destructive">{seasonStats.losses}</p>
                <p className="text-sm text-muted-foreground mt-1">Losses</p>
              </div>
              <div className="bg-background/50 rounded-lg p-6 text-center">
                <p className="text-4xl font-display font-bold text-gold">{seasonStats.leagues.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Leagues</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-gold font-semibold tracking-widest text-sm">MILESTONES</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
              OUR <span className="text-gradient-gold">ACHIEVEMENTS</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={achievement.highlight ? "border-gold/40 bg-gradient-to-br from-gold/5 to-transparent" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        achievement.highlight
                          ? "bg-gold/10 border border-gold/30"
                          : "bg-primary/10 border border-primary/30"
                      }`}>
                        <achievement.icon className={`h-6 w-6 ${achievement.highlight ? "text-gold" : "text-primary"}`} />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold text-foreground mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboards Coming Soon */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-semibold tracking-widest text-sm">PLAYER STATS</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
              TOP <span className="text-gradient-orange">PERFORMERS</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Stats Update Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Individual player leaderboards with top run scorers, wicket takers, 
                  best economy, and strike rates will be available shortly.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-semibold tracking-widest text-sm">WHO WE ARE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
              OUR <span className="text-gradient-orange">VALUES</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-gold font-semibold tracking-widest text-sm">OUR STORY</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6 text-foreground">
              ABOUT THE <span className="text-gradient-orange">REBELS</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Founded in 2023, the <span className="text-foreground font-semibold">Hyderabad Rebels Cricket Club</span> emerged 
              from a shared passion for cricket and a burning desire to compete at the highest level. Based in Scarborough, Ontario, 
              what started as a group of cricket enthusiasts has quickly evolved into one of the GTA's most competitive cricket teams.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Training at Ellesmere Reservoir Park, our journey has been marked by relentless dedication, countless hours of practice, 
              and an unwavering commitment to excellence. We bring the spirit of Hyderabad cricket to Canada, combining passion with skill.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
