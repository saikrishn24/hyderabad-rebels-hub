import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Handshake, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const sponsors = [
  { name: "TechNova Solutions", tier: "Title Sponsor" },
  { name: "Hyderabad Motors", tier: "Gold Sponsor" },
  { name: "Green Valley Foods", tier: "Gold Sponsor" },
  { name: "Metro Sports Gear", tier: "Silver Sponsor" },
  { name: "City Hospital", tier: "Silver Sponsor" },
  { name: "Deccan Airlines", tier: "Bronze Sponsor" },
];

const tierColors: Record<string, string> = {
  "Title Sponsor": "border-gold bg-gold/10 text-gold",
  "Gold Sponsor": "border-gold/50 bg-gold/5 text-gold",
  "Silver Sponsor": "border-muted-foreground/50 bg-muted/20 text-muted-foreground",
  "Bronze Sponsor": "border-primary/30 bg-primary/5 text-primary",
};

export const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sponsors" className="section-padding bg-card" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold tracking-widest text-sm">OUR PARTNERS</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            PROUD <span className="text-gradient-gold">SPONSORS</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            We're grateful to our sponsors who believe in our vision and support our journey.
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className={`border rounded-xl p-8 text-center hover-lift ${tierColors[sponsor.tier]}`}
            >
              <div className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{sponsor.name}</h3>
              <span className="text-sm font-semibold">{sponsor.tier}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-primary/20 via-background to-gold/20 border border-border rounded-xl p-8 md:p-12 text-center"
        >
          <Handshake className="h-12 w-12 text-gold mx-auto mb-4" />
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Become a Sponsor
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Partner with Hyderabad Rebels and get your brand in front of passionate cricket fans. 
            We offer flexible sponsorship packages for businesses of all sizes.
          </p>
          <Button size="lg" className="font-display tracking-wide shadow-glow">
            Partner With Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
