import Navbar from "@/app/components/shared/Navbar";
import HeroSection from "@/app/components/home/HeroSection";
import WhoWeAreSection from "@/app/components/home/WhoWeAreSection";
import InkDivider from "@/app/components/ui/InkDivider";
import ScrollBand from "@/app/components/home/ScrollBand";
import WhatWeDoSection from "@/app/components/home/WhatWeDoSection";
import GlobeSection from "@/app/components/home/GlobeSection";
import MoreThanNetworkSection from "@/app/components/home/MoreThanNetworkSection";
import PrincipleSection from "@/app/components/home/PrincipleSection";
import Footer from "@/app/components/shared/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 text-[#FAFAF9]">
      <Navbar />
      <HeroSection />
      <WhoWeAreSection />
      <ScrollBand />
      <WhatWeDoSection />
      <InkDivider variant="a" />
      <GlobeSection />
      <MoreThanNetworkSection />
      <InkDivider variant="b" />
      <PrincipleSection />
      <Footer />
    </div>
  );
}
