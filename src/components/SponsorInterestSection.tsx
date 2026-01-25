import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Handshake, Send, Building2, Users, Trophy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const benefits = [
  { icon: Eye, title: "Brand Visibility", description: "Logo on jerseys, banners, and all digital platforms" },
  { icon: Users, title: "Community Reach", description: "Connect with passionate cricket fans across Ontario" },
  { icon: Trophy, title: "Event Presence", description: "Recognition at all matches and team events" },
];

export const SponsorInterestSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    company: "", 
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Open email client with pre-filled content
      const subject = encodeURIComponent(`Sponsorship Interest from ${formData.company || formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:rebels.hyd@gmail.com?subject=${subject}&body=${body}`, '_blank');

      toast.success("Opening email client... You can also DM us on Instagram!");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please email us directly at rebels.hyd@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openInstagramDM = () => {
    window.open("https://www.instagram.com/hydrebels_cricketclub", "_blank");
  };

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
          <span className="text-gold font-semibold tracking-widest text-sm">PARTNERSHIP OPPORTUNITIES</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            BECOME A <span className="text-gradient-gold">SPONSOR</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Partner with Hyderabad Rebels and get your brand in front of passionate cricket fans. 
            We're looking for sponsors who share our passion for the game.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-background border border-border rounded-xl p-6 text-center hover-lift"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Interest Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-gold/10 via-background to-primary/10 border border-gold/30 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Handshake className="h-8 w-8 text-gold" />
              <h3 className="font-display text-2xl font-bold text-foreground">Express Your Interest</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sponsor-name" className="text-sm text-muted-foreground mb-2 block">
                    Your Name *
                  </label>
                  <Input
                    id="sponsor-name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label htmlFor="sponsor-email" className="text-sm text-muted-foreground mb-2 block">
                    Email Address *
                  </label>
                  <Input
                    id="sponsor-email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sponsor-company" className="text-sm text-muted-foreground mb-2 block">
                  Company/Organization
                </label>
                <Input
                  id="sponsor-company"
                  type="text"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label htmlFor="sponsor-message" className="text-sm text-muted-foreground mb-2 block">
                  Message *
                </label>
                <Textarea
                  id="sponsor-message"
                  placeholder="Tell us about your interest in sponsoring the team..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-background border-border resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 font-display tracking-wide shadow-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Interest
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={openInstagramDM}
                  className="flex-1 font-display tracking-wide border-gold/50 text-gold hover:bg-gold/10"
                >
                  <Building2 className="mr-2 h-5 w-5" />
                  DM on Instagram
                </Button>
              </div>
            </form>

            <p className="text-center text-muted-foreground text-sm mt-6">
              Or email us directly at{" "}
              <a href="mailto:rebels.hyd@gmail.com" className="text-gold hover:underline">
                rebels.hyd@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
