import { motion } from "framer-motion";
import { useState } from "react";

 import { Mail, MapPin, Send, Instagram, UserPlus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

 const socialLinks = [
   { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/hydrebels_cricketclub", color: "hover:text-pink-500" },
 ];

const skills = [
  { id: "batting", label: "Batting" },
  { id: "bowling", label: "Bowling" },
  { id: "wicketkeeping", label: "Wicket Keeping" },
  { id: "allrounder", label: "All-Rounder" },
  { id: "fielding", label: "Fielding Specialist" },
];

const Contact = () => {
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [joinForm, setJoinForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    selectedSkills: [] as string[],
    message: "",
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isJoinSubmitting, setIsJoinSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);

    try {
      const subject = encodeURIComponent(contactForm.subject || `Contact from ${contactForm.name}`);
      const body = encodeURIComponent(
        `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
      );
      window.open(`mailto:rebels.hyd@gmail.com?subject=${subject}&body=${body}`, '_blank');

      toast.success("Opening email client... You can also DM us on Instagram @hydrebels_cricketclub!");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please email us directly at rebels.hyd@gmail.com");
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const handleSkillToggle = (skillId: string) => {
    setJoinForm((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skillId)
        ? prev.selectedSkills.filter((id) => id !== skillId)
        : [...prev.selectedSkills, skillId],
    }));
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (joinForm.selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }

    setIsJoinSubmitting(true);

    try {
      const skillLabels = joinForm.selectedSkills
        .map((id) => skills.find((s) => s.id === id)?.label)
        .join(", ");

      const subject = encodeURIComponent(`Join Team Request from ${joinForm.name}`);
      const body = encodeURIComponent(
        `=== JOIN THE TEAM REQUEST ===\n\nName: ${joinForm.name}\nEmail: ${joinForm.email}\nPhone: ${joinForm.phone}\nPlaying Experience: ${joinForm.experience}\n\nSpecial Skills: ${skillLabels}\n\nAdditional Message:\n${joinForm.message}`
      );
      window.open(`mailto:rebels.hyd@gmail.com?subject=${subject}&body=${body}`, "_blank");

      toast.success("Opening email client... You can also DM us on Instagram @hydrebels_cricketclub!");
      setJoinForm({
        name: "",
        email: "",
        phone: "",
        experience: "",
        selectedSkills: [],
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please email us directly at rebels.hyd@gmail.com");
    } finally {
      setIsJoinSubmitting(false);
    }
  };

  const openInstagramDM = () => {
    window.open("https://www.instagram.com/hydrebels_cricketclub", "_blank");
  };

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
            <span className="text-primary font-semibold tracking-widest text-sm">GET IN TOUCH</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
              CONTACT <span className="text-gradient-orange">US</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Have questions, want to join the team, or connect with us? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-display text-2xl font-bold mb-8 text-foreground">Reach Out</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href="mailto:rebels.hyd@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors">
                      rebels.hyd@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground font-medium">
                      Scarborough, Ontario<br />
                      Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Practice Ground</p>
                    <p className="text-foreground font-medium">
                      Ellesmere Reservoir Park<br />
                      Scarborough, ON
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h4 className="font-display text-lg font-bold mb-4 text-foreground">Follow Us</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground transition-colors ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Forms */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="contact">Send a Message</TabsTrigger>
                  <TabsTrigger value="join">Join the Team</TabsTrigger>
                </TabsList>

                <TabsContent value="contact">
                  <form onSubmit={handleContactSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8">
                    <h3 className="font-display text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="contact-name" className="text-sm text-muted-foreground mb-2 block">
                          Your Name
                        </label>
                        <Input
                          id="contact-name"
                          type="text"
                          placeholder="John Doe"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="text-sm text-muted-foreground mb-2 block">
                          Email Address
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="john@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="contact-subject" className="text-sm text-muted-foreground mb-2 block">
                        Subject
                      </label>
                      <Input
                        id="contact-subject"
                        type="text"
                        placeholder="How can we help?"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="contact-message" className="text-sm text-muted-foreground mb-2 block">
                        Message
                      </label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell us more about your inquiry..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-background border-border resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 font-display tracking-wide shadow-glow"
                        disabled={isContactSubmitting}
                      >
                        {isContactSubmitting ? "Sending..." : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send via Email
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={openInstagramDM}
                        className="flex-1 font-display tracking-wide border-primary/50 hover:bg-primary/10"
                      >
                        DM on Instagram
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="join">
                  <form onSubmit={handleJoinSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <UserPlus className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground">Player Registration</h3>
                        <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="join-name" className="text-sm text-muted-foreground mb-2 block">
                            Full Name *
                          </label>
                          <Input
                            id="join-name"
                            type="text"
                            placeholder="Your full name"
                            value={joinForm.name}
                            onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                            required
                            className="bg-background border-border"
                          />
                        </div>
                        <div>
                          <label htmlFor="join-email" className="text-sm text-muted-foreground mb-2 block">
                            Email Address *
                          </label>
                          <Input
                            id="join-email"
                            type="email"
                            placeholder="your@email.com"
                            value={joinForm.email}
                            onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                            required
                            className="bg-background border-border"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="join-phone" className="text-sm text-muted-foreground mb-2 block">
                            Phone Number *
                          </label>
                          <Input
                            id="join-phone"
                            type="tel"
                            placeholder="+1 (XXX) XXX-XXXX"
                            value={joinForm.phone}
                            onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                            required
                            className="bg-background border-border"
                          />
                        </div>
                        <div>
                          <label htmlFor="join-experience" className="text-sm text-muted-foreground mb-2 block">
                            Playing Experience *
                          </label>
                          <Input
                            id="join-experience"
                            type="text"
                            placeholder="e.g., 5 years, Club level"
                            value={joinForm.experience}
                            onChange={(e) => setJoinForm({ ...joinForm, experience: e.target.value })}
                            required
                            className="bg-background border-border"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-sm text-muted-foreground mb-3 block">
                        <Zap className="inline h-4 w-4 mr-1 text-primary" />
                        Your Special Skills * (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                         {skills.map((skill) => {
                           const isSelected = joinForm.selectedSkills.includes(skill.id);
                           return (
                             <div
                               key={skill.id}
                               role="button"
                               tabIndex={0}
                               onClick={() => handleSkillToggle(skill.id)}
                               onKeyDown={(e) => {
                                 if (e.key === 'Enter' || e.key === ' ') {
                                   e.preventDefault();
                                   handleSkillToggle(skill.id);
                                 }
                               }}
                               className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all select-none ${
                                 isSelected
                                   ? "bg-primary/10 border-primary/50 text-primary"
                                   : "bg-background border-border text-muted-foreground hover:border-primary/30"
                               }`}
                             >
                               <div
                                 className={`h-4 w-4 shrink-0 rounded-sm border flex items-center justify-center ${
                                   isSelected
                                     ? "bg-primary border-primary text-primary-foreground"
                                     : "border-primary"
                                 }`}
                               >
                                 {isSelected && (
                                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                     <polyline points="20 6 9 17 4 12" />
                                   </svg>
                                 )}
                               </div>
                               <span className="text-sm font-medium">
                                 {skill.label}
                               </span>
                             </div>
                           );
                         })}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="join-message" className="text-sm text-muted-foreground mb-2 block">
                        Tell us more about yourself (optional)
                      </label>
                      <Textarea
                        id="join-message"
                        placeholder="Share your cricket journey, achievements, or anything else..."
                        value={joinForm.message}
                        onChange={(e) => setJoinForm({ ...joinForm, message: e.target.value })}
                        rows={4}
                        className="bg-background border-border resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 font-display tracking-wide shadow-glow"
                        disabled={isJoinSubmitting}
                      >
                        {isJoinSubmitting ? "Sending..." : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Submit Application
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={openInstagramDM}
                        className="flex-1 font-display tracking-wide border-primary/50 hover:bg-primary/10"
                      >
                        DM on Instagram
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
