import Navbar from "@/app/components/shared/Navbar";
import HeroSection from "@/app/components/home/HeroSection";
import WhoWeAreSection from "@/app/components/home/WhoWeAreSection";
import WhatWeDoSection from "@/app/components/home/WhatWeDoSection";
import GlobeSection from "@/app/components/home/GlobeSection";
import MoreThanNetworkSection from "@/app/components/home/MoreThanNetworkSection";
import PrincipleSection from "@/app/components/home/PrincipleSection";
import Footer from "@/app/components/shared/Footer";

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
