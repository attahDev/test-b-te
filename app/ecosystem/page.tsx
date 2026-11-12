import BuildWithUsSection from "@/app/components/ecosystem/BuildWithUsSection";
import EcosystemHeroSection from "@/app/components/ecosystem/HeroSection";
import GmbteToolsSection from "@/app/components/ecosystem/GmbteToolsSection";
import ModelSection from "@/app/components/ecosystem/ModelSection";
import RelationshipsSection from "@/app/components/ecosystem/RelationshipsSection";
import TechnologyModelSection from "@/app/components/ecosystem/TechnologyModelSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function EcosystemPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#08090d] text-white">
      <Navbar />
      <EcosystemHeroSection />
      <ModelSection />
      <TechnologyModelSection />
      <GmbteToolsSection />
      <RelationshipsSection />
      <BuildWithUsSection />
      <Footer />
    </main>
  );
}
