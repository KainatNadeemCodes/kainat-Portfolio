import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import SectionExplore from "@/components/SectionExplore";
import About from "@/components/About";
import FlagshipProjects from "@/components/FlagshipProjects";
import FeaturedHackathons from "@/components/FeaturedHackathons";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <Hero />

        <ProofStrip />

        <SectionExplore />

        <About />

        <FlagshipProjects />

        <FeaturedHackathons />

        <Contact />
      </div>
    </PageTransition>
  );
};

export default Index;
