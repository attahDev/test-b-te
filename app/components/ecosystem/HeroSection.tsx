// First screen of the ecosystem page: looping moonlit night sky, headline and a scroll cue.
import LoopVideo from "../home/LoopVideo";
import Button from "../ui/Button";
import ScrollVar from "../ui/ScrollVar";
import SectionLabel from "../ui/SectionLabel";

export default function EcosystemHeroSection() {
  return (
    <section className="relative min-h-svh overflow-hidden">
      <ScrollVar mode="leave" className="hero relative isolate flex min-h-svh flex-col justify-center">
        <LoopVideo src="/video/moon.mp4" poster="/video/moon.jpg" className="hero-image object-[70%_center] [mask-image:linear-gradient(to_bottom,#000_60%,transparent_98%)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,9,13,0.7),rgba(11,9,13,0.25)_55%,rgba(11,9,13,0.1))] md:bg-[linear-gradient(to_right,rgba(11,9,13,0.8),rgba(11,9,13,0.25)_55%,transparent)]" />

        <div className="hero-copy relative z-10 mx-auto w-full max-w-[1300px] px-6 pb-16 pt-32 md:px-16">
          <SectionLabel className="mb-10">Our ecosystem</SectionLabel>
          <h1 className="max-w-[20ch] text-3xl font-extralight uppercase leading-[1.1] tracking-[0.14em] text-[#FAFAF9] sm:text-4xl lg:text-5xl">
            A network built to share ownership
          </h1>
          <p className="mt-8 max-w-[48ch] text-[15px] font-light leading-relaxed text-[#FAFAF9]/70 md:mt-10 md:text-lg">
            Governments, universities, companies, investors and communities working in one system, so skills, technology and capital reach the people who build with them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
            <Button href="/contact" size="large" className="max-sm:min-h-10 max-sm:px-3.5 max-sm:py-2.5 max-sm:text-[10.5px] max-sm:tracking-[0.1em]">
              Work with BTE <span className="text-xs">↗</span>
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
