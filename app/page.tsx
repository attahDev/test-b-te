import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import WhoWeAreSection from "@/app/components/WhoWeAreSection";
import WhatWeDoSection from "@/app/components/WhatWeDoSection";
import GlobeSection from "@/app/components/GlobeSection";
import MoreThanNetworkSection from "@/app/components/MoreThanNetworkSection";
import PrincipleSection from "@/app/components/PrincipleSection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-[#161415] text-[#FAFAF9]">
      <Navbar />
      <HeroSection />
      <WhoWeAreSection />
      <WhatWeDoSection />
      <GlobeSection />
      <MoreThanNetworkSection />
      <PrincipleSection />
      <Footer />
    </div>
  );
}
