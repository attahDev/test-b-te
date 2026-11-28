import type { CSSProperties } from "react";
import Button from "../ui/Button";
import ScrollVar from "../ui/ScrollVar";
import HeroVideo from "./HeroVideo";

export default function HeroSection() {
  return (
    <section className="relative min-h-svh overflow-hidden">
      <ScrollVar mode="leave" className="hero relative flex min-h-svh flex-col justify-center">
      <HeroVideo />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,9,13,0.55),rgba(11,9,13,0.3)_55%,rgba(11,9,13,0.1))] md:bg-[linear-gradient(to_right,rgba(11,9,13,0.78),rgba(11,9,13,0.25)_55%,transparent)]" />
      
      <div className="hero-copy relative z-10 mx-auto w-full max-w-[1300px] px-6 pb-16 pt-32 md:px-16">
        <h1 style={{ "--d": 1 } as CSSProperties} className="enter max-w-[16ch] text-4xl font-extralight uppercase leading-[1.05] tracking-[0.12em] text-[#FAFAF9] sm:text-5xl lg:text-6xl">
          More than a network
        </h1>
        <p style={{ "--d": 2 } as CSSProperties} className="enter mt-8 max-w-[46ch] text-[15px] font-light leading-relaxed text-[#FAFAF9]/70 md:mt-10 md:text-lg">
          BTE connects Black talent to the networks, skills, technology and capital that compound into community ownership.
        </p>
        <div style={{ "--d": 3 } as CSSProperties} className="enter mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
          <Button href="/contact" size="large" className="max-sm:min-h-10 max-sm:px-3.5 max-sm:py-2.5 max-sm:text-[10.5px] max-sm:tracking-[0.1em]">
            Work with BTE <span className="text-xs">↗</span>
          </Button>
          <Button href="/ecosystem" variant="secondarySubtle" size="large" className="max-sm:min-h-10 max-sm:px-3.5 max-sm:py-2.5 max-sm:text-[10.5px] max-sm:tracking-[0.1em]">
            Our ecosystem <span className="text-xs">↗</span>
          </Button>
        </div>
      </div>

      </ScrollVar>
    </section>
  );
}
