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
  "Scarborough Cricket League Champions 2024",
  "GTA Summer Cup Winners 2024",
  "Best Team Award - Ontario Cricket Tournament 2024",
  "Runners-up - Toronto Cricket Championship 2023",
  "Fair Play Award 2023, 2024",
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

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 via-background to-primary/5 border border-border rounded-xl p-8"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-6 text-foreground">
            <Trophy className="inline-block mr-2 h-6 w-6 text-primary" />
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
                <Star className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
