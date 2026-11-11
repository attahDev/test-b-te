import Image from "next/image";
import HeroBackdrop from "./HeroBackdrop";
import Button from "./ui/Button";
import SectionLabel from "./ui/SectionLabel";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#161415]">
      
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage/architectural-background.png"
          alt=""
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <HeroBackdrop />

      
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#161415]/70 via-transparent to-[#161415]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 pt-28 pb-12">
        {/* Welcome badge */}
        <SectionLabel className="mb-8">Welcome To BTE</SectionLabel>

        {/* Main heading */}
        <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-[#FAFAF9] leading-[0.95] tracking-tight max-w-none">
          More Than A Network
        </h1>

        <div className="absolute top-35 right-[22%] z-0 w-16 h-16 md:w-30 md:h-30">
          <Image
            src="/homepage/brush-accent.png"
            alt=""
            width={110}
            height={110}
            className="opacity-70"
          />
        </div>

        {/* Content row */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12">
          {/* Video card */}
          <div className="w-full md:w-[48%] lg:w-[44%]">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#222]">
              <Image
                src="/homepage/community-panel.png"
                alt="BTE Event Video"
                fill
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          {/* Right side content */}
          <div className="flex flex-col items-start gap-5 md:w-[43%] md:self-stretch md:justify-between">
            <div className="flex flex-col items-start gap-5">
              <p className="text-[#FAFAF9]/80 text-base md:text-lg max-w-md leading-relaxed">
                BTE connects Black talent to the networks, skills, technology
                and capital that compound into community ownership.
              </p>

              {/* CTA buttons */}
              <div className="flex items-center gap-4">
                <Button href="#" size="large">
                  Work with BTE <span className="text-xs">↗</span>
                </Button>
                <Button href="/ecosystem" variant="secondarySubtle" size="large">
                  Our Ecosystem <span className="text-xs">↗</span>
                </Button>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-3 mt-2">
              {/* Avatar group */}
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#B04333] border-2 border-[#161415]" />
                <div className="w-8 h-8 rounded-full bg-[#E5E5E5] border-2 border-[#161415]" />
                <div className="w-8 h-8 rounded-full bg-[#923327] border-2 border-[#161415]" />
                <div className="w-8 h-8 rounded-full bg-[#B04333]/60 border-2 border-[#161415]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#FAFAF9]">357K+</p>
                <p className="text-xs text-[#FAFAF9]/60">
                  Startup Owners And Founders
                </p>
              </div>
            </div>
          </div>

          {/* Circular icon - target/bullseye */}
          <div className="hidden lg:block absolute bottom-20 right-16">
            <Image
              src="/homepage/target-decoration.png"
              alt="BTE Target Icon"
              width={140}
              height={140}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
