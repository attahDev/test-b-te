import Image from "next/image";
import Button from "../ui/Button";
import SectionLabel from "../ui/SectionLabel";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      <Image
        src="/homepage/architectural-background.png"
        alt=""
        fill
        priority
        className="object-cover opacity-[0.12] mix-blend-screen"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#070b16]" />

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 pb-16 pt-32 md:px-16">
        <SectionLabel className="mb-10">Welcome to BTE</SectionLabel>
        <h1 className="max-w-[16ch] text-[2.6rem] font-extralight uppercase leading-[1.05] tracking-[0.12em] text-[#FAFAF9] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
          More than a network
        </h1>
        <p className="mt-10 max-w-[46ch] text-base font-light leading-relaxed text-[#FAFAF9]/70 md:text-xl">
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
    </section>
  );
}
