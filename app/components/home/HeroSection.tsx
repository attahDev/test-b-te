import Image from "next/image";
import Button from "../ui/Button";
import ScrollVar from "../ui/ScrollVar";
import SectionLabel from "../ui/SectionLabel";

export default function HeroSection() {
  return (
    <section className="relative min-h-svh overflow-hidden">
      <ScrollVar mode="leave" className="hero relative flex min-h-svh flex-col justify-center">
      <Image
        src="/art/savanna-sunset.webp"
        alt=""
        fill
        priority
        className="hero-image object-cover opacity-75 brightness-90 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_96%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,11,22,0.78),rgba(7,11,22,0.25)_55%,transparent)]" />
      
      <div className="hero-copy relative z-10 mx-auto w-full max-w-[1300px] px-6 pb-16 pt-32 md:px-16">
        <SectionLabel className="mb-10">Welcome to BTE</SectionLabel>
        <h1 className="max-w-[16ch] text-4xl font-extralight uppercase leading-[1.05] tracking-[0.12em] text-[#FAFAF9] sm:text-5xl lg:text-6xl">
          More than a network
        </h1>
        <p className="mt-10 max-w-[46ch] text-base font-light leading-relaxed text-[#FAFAF9]/70 md:text-lg">
          BTE connects Black talent to the networks, skills, technology and capital that compound into community ownership.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact" size="large">
            Work with BTE <span className="text-xs">↗</span>
          </Button>
          <Button href="/ecosystem" variant="secondarySubtle" size="large">
            Our ecosystem <span className="text-xs">↗</span>
          </Button>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex">
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
      </ScrollVar>
    </section>
  );
}
