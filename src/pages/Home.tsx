import { motion } from "framer-motion";
import { Calendar, Trophy, Users, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import hydRebelsLogo from "@/assets/hyd-rebels-logo.jpg";
import staLogo from "@/assets/sponsors/sta-logo.jpeg";

const quickStats = [
  { value: "35", label: "Matches Played" },
  { value: "11", label: "Victories" },
  { value: "3", label: "Leagues" },
  { value: "22", label: "Team Members" },
];

const quickLinks = [
  { 
    icon: Users, 
    title: "View Squad", 
    description: "Meet our talented players", 
    href: "/squad",
    color: "from-primary/20 to-primary/5 border-primary/30"
  },
  { 
    icon: BarChart3, 
    title: "Statistics", 
    description: "Leaderboards & records", 
    href: "/stats",
    color: "from-gold/20 to-gold/5 border-gold/30"
  },
  { 
    icon: Calendar, 
    title: "Matches", 
    description: "Schedule & results", 
    href: "/matches",
    color: "from-accent/20 to-accent/5 border-accent/30"
  },
  { 
    icon: Trophy, 
    title: "Achievements", 
    description: "Our journey & milestones", 
    href: "/stats#achievements",
    color: "from-green-500/20 to-green-500/5 border-green-500/30"
  },
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-sm font-medium text-primary tracking-wider">
              ESTABLISHED 2023 • SCARBOROUGH, ON
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <img 
              src={hydRebelsLogo} 
              alt="HYD Rebels CC Logo" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto rounded-full border-4 border-primary/30 shadow-glow"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-none"
          >
            <span className="text-foreground">HYDERABAD</span>
            <br />
            <span className="text-gradient-orange">REBELS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-medium tracking-wide"
          >
            RISE. REBEL. REIGN.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10"
          >
            Dominating the local cricket scene with passion, skill, and an unbreakable team spirit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/matches">
              <Button size="lg" className="font-display text-lg tracking-wide px-8 shadow-glow">
                <Calendar className="mr-2 h-5 w-5" />
                VIEW FIXTURES
              </Button>
            </Link>
            <Link to="/stats">
              <Button
                variant="outline"
                size="lg"
                className="font-display text-lg tracking-wide px-8 border-primary/50 text-primary hover:bg-primary/10"
              >
                <Trophy className="mr-2 h-5 w-5" />
                OUR ACHIEVEMENTS
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary font-semibold tracking-widest text-sm">EXPLORE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
              QUICK <span className="text-gradient-orange">ACCESS</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={link.href}
                  className={`block h-full bg-gradient-to-br ${link.color} border rounded-xl p-6 hover:scale-105 transition-transform`}
                >
                  <link.icon className="h-10 w-10 text-foreground mb-4" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{link.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-primary">
                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-gold font-semibold tracking-widest text-sm">WHO WE ARE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6 text-foreground">
              ABOUT THE <span className="text-gradient-orange">REBELS</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Founded in 2023, the Hyderabad Rebels Cricket Club emerged from a shared passion for cricket 
              and a burning desire to compete at the highest level. Based in Scarborough, Ontario, we bring 
              the spirit of Hyderabad cricket to Canada.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/squad">
                <Button variant="outline" className="font-display">
                  Meet Our Squad
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="font-display">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proud Sponsors Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-gold font-semibold tracking-widest text-sm">OUR PARTNERS</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
              PROUD <span className="text-gradient-gold">SPONSORS</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="border border-gold bg-gold/10 rounded-xl p-8 text-center hover:scale-105 transition-transform max-w-sm">
              <div className="w-32 h-32 rounded-lg bg-white flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <img src={staLogo} alt="Scarborough Telugu Association" className="w-full h-full object-contain p-2" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Scarborough Telugu Association</h3>
              <span className="text-sm font-semibold text-gold">Title Sponsor</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link to="/sponsors">
              <Button variant="outline" className="font-display border-gold/50 text-gold hover:bg-gold/10">
                Become a Sponsor
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
