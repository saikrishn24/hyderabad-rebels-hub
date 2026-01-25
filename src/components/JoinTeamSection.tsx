import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { UserPlus, Send, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const skills = [
  { id: "batting", label: "Batting" },
  { id: "bowling", label: "Bowling" },
  { id: "wicketkeeping", label: "Wicket Keeping" },
  { id: "allrounder", label: "All-Rounder" },
  { id: "fielding", label: "Fielding Specialist" },
];

export const JoinTeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    selectedSkills: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSkillToggle = (skillId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skillId)
        ? prev.selectedSkills.filter((id) => id !== skillId)
        : [...prev.selectedSkills, skillId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }

    setIsSubmitting(true);

    try {
      const skillLabels = formData.selectedSkills
        .map((id) => skills.find((s) => s.id === id)?.label)
        .join(", ");

      const subject = encodeURIComponent(`Join Team Request from ${formData.name}`);
      const body = encodeURIComponent(
        `=== JOIN THE TEAM REQUEST ===\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPlaying Experience: ${formData.experience}\n\nSpecial Skills: ${skillLabels}\n\nAdditional Message:\n${formData.message}`
      );
      window.open(`mailto:rebels.hyd@gmail.com?subject=${subject}&body=${body}`, "_blank");

      toast.success("Opening email client... You can also DM us on Instagram @hydrebels_cricketclub!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        selectedSkills: [],
        message: "",
      });
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
    <section id="join" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold tracking-widest text-sm">BECOME A REBEL</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 text-foreground">
            JOIN THE <span className="text-gradient-orange">TEAM</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Think you have what it takes? We're always looking for talented cricketers to strengthen our squad.
            Fill out the form below and let us know about your skills!
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Player Registration</h3>
                <p className="text-sm text-muted-foreground">Tell us about yourself</p>
              </div>
            </div>

            {/* Personal Details */}
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
              </div>
            </div>

            {/* Skills Selection */}
            <div className="mb-6">
              <label className="text-sm text-muted-foreground mb-3 block">
                <Zap className="inline h-4 w-4 mr-1 text-primary" />
                Your Special Skills * (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => handleSkillToggle(skill.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.selectedSkills.includes(skill.id)
                        ? "bg-primary/10 border-primary/50 text-primary"
                        : "bg-background border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <Checkbox
                      id={skill.id}
                      checked={formData.selectedSkills.includes(skill.id)}
                      onCheckedChange={() => handleSkillToggle(skill.id)}
                      className="pointer-events-none"
                    />
                    <label htmlFor={skill.id} className="text-sm font-medium cursor-pointer">
                      {skill.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Message */}
            <div className="mb-6">
              <label htmlFor="join-message" className="text-sm text-muted-foreground mb-2 block">
                Tell us more about yourself (optional)
              </label>
              <Textarea
                id="join-message"
                placeholder="Share your cricket journey, achievements, or anything else you'd like us to know..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="bg-background border-border resize-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                size="lg"
                className="flex-1 font-display tracking-wide shadow-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
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
        </motion.div>
      </div>
    </section>
  );
};
