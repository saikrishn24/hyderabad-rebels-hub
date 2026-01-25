import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CricClubsSquadSection } from "@/components/CricClubsSquadSection";
import { MatchesSection } from "@/components/MatchesSection";
import { UpcomingFixturesSection } from "@/components/UpcomingFixturesSection";
import { GallerySection } from "@/components/GallerySection";
import { JoinTeamSection } from "@/components/JoinTeamSection";
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
      <UpcomingFixturesSection />
      <GallerySection />
      <JoinTeamSection />
      <SponsorInterestSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
