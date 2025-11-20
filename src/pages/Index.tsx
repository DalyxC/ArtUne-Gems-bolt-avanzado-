import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import HowItWorks from "@/components/HowItWorks";
import FeaturedArtists from "@/components/FeaturedArtists";
import TrustSection from "@/components/TrustSection";
import CommunitySection from "@/components/CommunitySection";
import TechnologySection from "@/components/TechnologySection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <FeaturedArtists />
      <TrustSection />
      <CommunitySection />
      <TechnologySection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
