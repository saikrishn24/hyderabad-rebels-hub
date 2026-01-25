import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CricClubsSquadSection } from "@/components/CricClubsSquadSection";
import { MatchesSection } from "@/components/MatchesSection";
import { GallerySection } from "@/components/GallerySection";
import { SponsorInterestSection } from "@/components/SponsorInterestSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CricClubsSquadSection />
      <MatchesSection />
      <GallerySection />
      <SponsorInterestSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
