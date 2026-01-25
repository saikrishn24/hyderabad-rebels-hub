import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, Trophy, Star } from "lucide-react";

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

const achievements = [
  "Hyderabad Premier League Champions 2023",
  "Corporate Cricket Cup Winners 2022",
  "Best Team Award - HPCL Tournament 2023",
  "Runners-up - City Cricket Championship 2024",
  "Fair Play Award 2022, 2023",
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <span className="text-gold font-semibold tracking-widest text-sm">WHO WE ARE</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            ABOUT THE <span className="text-gradient-gold">REBELS</span>
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
            Founded in 2020, the <span className="text-foreground font-semibold">Hyderabad Rebels Cricket Club</span> emerged from a shared passion for cricket and a burning desire to compete at the highest level. What started as a group of friends playing weekend cricket has evolved into one of Hyderabad's most formidable cricket teams.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our journey has been marked by relentless dedication, countless hours of practice, and an unwavering commitment to excellence. Today, we stand proud as multiple-time champions, but our hunger for success remains as strong as ever.
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

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 via-background to-gold/10 border border-border rounded-xl p-8"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-6 text-foreground">
            <Trophy className="inline-block mr-2 h-6 w-6 text-gold" />
            Our Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3 bg-background/50 rounded-lg p-4"
              >
                <Star className="h-5 w-5 text-gold flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
