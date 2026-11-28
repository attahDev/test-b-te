"use client";

// First screen of the ecosystem page: a globe that zooms in as you scroll until it lands on an aerial city
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import Button from "../ui/Button";
import SectionLabel from "../ui/SectionLabel";

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false });

export default function EcosystemHeroSection() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const node = track.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      progress.current = Math.min(1, Math.max(0, -box.top / Math.max(1, box.height - window.innerHeight)));
      node.style.setProperty("--p", progress.current.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative">
      <div ref={track} className="relative h-[340svh] motion-reduce:h-svh" style={{ "--p": 0 } as CSSProperties}>
        <div className="sticky top-0 isolate flex h-svh flex-col justify-center overflow-hidden bg-[#0b090d]">
          <div className="globe-layer absolute inset-0">
            <GlobeScene progress={progress} />
          </div>
          <Image src="/art/city-night.webp" alt="" fill sizes="100vw" priority className="globe-city object-cover object-[75%_center] opacity-0" />
          <div aria-hidden="true" className="globe-shade absolute inset-0 bg-[linear-gradient(to_right,rgba(11,9,13,0.92),rgba(11,9,13,0.55)_45%,rgba(11,9,13,0.15))] max-lg:bg-[#0b090d]/70" />

          <div className="globe-copy relative z-10 mx-auto w-full max-w-[1300px] px-6 pb-16 pt-32 md:px-16">
            <div className="enter mb-10" style={{ "--d": 0 } as CSSProperties}><SectionLabel>Our ecosystem</SectionLabel></div>
            <h1 style={{ "--d": 1 } as CSSProperties} className="enter max-w-[20ch] text-3xl font-extralight uppercase leading-[1.1] tracking-[0.14em] text-[#FAFAF9] sm:text-4xl lg:text-5xl">
              A network built to share ownership
            </h1>
            <p style={{ "--d": 2 } as CSSProperties} className="enter mt-8 max-w-[48ch] text-[15px] font-light leading-relaxed text-[#FAFAF9]/70 md:mt-10 md:text-lg">
              Governments, universities, companies, investors and communities working in one system, so skills, technology and capital reach the people who build with them.
            </p>
            <div style={{ "--d": 3 } as CSSProperties} className="enter mt-8 flex flex-wrap items-center gap-3 md:mt-10 md:gap-4">
              <Button href="/contact" size="large" className="max-sm:min-h-10 max-sm:px-3.5 max-sm:py-2.5 max-sm:text-[10.5px] max-sm:tracking-[0.1em]">
                Work with BTE <span className="text-xs">↗</span>
              </Button>
            </div>
          </div>

          <div aria-hidden="true" className="globe-copy absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex">
            Scroll
            <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
