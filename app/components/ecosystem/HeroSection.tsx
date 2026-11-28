"use client";

// Ecosystem opening: a globe dives into a slow aerial pan of Manchester, and the partner list appears on that same pinned stage
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Button from "../ui/Button";
import LoopVideo from "../home/LoopVideo";
import SectionLabel from "../ui/SectionLabel";
import { audiences } from "./audiences";

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false });

const heroShare = 0.3;
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function EcosystemHeroSection() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [listOn, setListOn] = useState(false);

  useEffect(() => {
    const node = track.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const overall = clamp(-box.top / Math.max(1, box.height - window.innerHeight));
      const wide = window.innerWidth >= 1024;
      const hero = wide ? clamp(overall / heroShare) : overall;
      progress.current = hero;
      node.style.setProperty("--p", hero.toFixed(4));
      if (!wide) return;
      setListOn(hero > 0.85);
      setActive(Math.min(audiences.length - 1, Math.floor(clamp((overall - heroShare) / (1 - heroShare)) * audiences.length)));
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

  const jump = (index: number) => {
    const node = track.current;
    if (!node || window.innerWidth < 1024) return;
    const room = node.offsetHeight - window.innerHeight;
    const top = node.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + room * (heroShare + ((1 - heroShare) * (index + 0.5)) / audiences.length), behavior: "smooth" });
  };

  return (
    <section className="relative text-white">
      <div ref={track} className="relative h-[300svh] motion-reduce:h-svh lg:h-[900svh] motion-reduce:lg:h-svh" style={{ "--p": 0 } as CSSProperties}>
        <div className="sticky top-0 isolate flex h-svh flex-col justify-center overflow-hidden bg-[#0b090d]">
          <div className="globe-layer absolute inset-0">
            <GlobeScene progress={progress} />
          </div>
          <div className="globe-city absolute inset-0 opacity-0">
            <LoopVideo src="/video/city-pan.mp4" poster="/video/city-pan.jpg" />
          </div>
          <div aria-hidden="true" className="globe-shade absolute inset-0 bg-[linear-gradient(to_right,rgba(11,9,13,0.92),rgba(11,9,13,0.55)_45%,rgba(11,9,13,0.15))] max-lg:bg-[#0b090d]/70" />
          <div aria-hidden="true" className="absolute inset-0 [background:linear-gradient(to_bottom,transparent_86%,#0b090d)]" />

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

          <div className={`aud-in absolute inset-0 z-10 hidden items-center px-6 md:px-16 lg:flex motion-reduce:lg:hidden ${listOn ? "pointer-events-auto" : "pointer-events-none"}`}>
            <div className="mx-auto grid w-full max-w-[1300px] gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">Our partners</p>
                <h2 id="audience-title" className="mt-4 text-[clamp(1.5rem,2.6vw,2.3rem)] font-extralight uppercase leading-[1.15] tracking-[0.16em]">
                  Who we work with
                </h2>
                <ul className="mt-8 flex flex-col">
                  {audiences.map((audience, index) => (
                    <li key={audience.number}>
                      <button
                        type="button"
                        onClick={() => jump(index)}
                        aria-current={index === active}
                        className={`flex w-full items-center gap-5 py-1.5 text-left text-[12px] uppercase tracking-[0.2em] transition-colors duration-500 ${index === active ? "text-[#FAFAF9]" : "text-white/35 hover:text-white/65"}`}
                      >
                        <span className={`block h-px transition-all duration-500 ${index === active ? "w-14 bg-[#E97868]" : "w-6 bg-white/25"}`} />
                        <span className="w-6 text-[11px] tabular-nums">{audience.number}</span>
                        {audience.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <Button variant="secondarySubtle" href="/contact" size="large">
                    Work with BTE <span className="text-xs">↗</span>
                  </Button>
                </div>
              </div>

              <div className="relative min-h-[320px]">
                {audiences.map((audience, index) => (
                  <div
                    key={audience.number}
                    aria-hidden={index !== active}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${index === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">{audience.number} / 0{audiences.length}</p>
                    <h3 className="mt-4 max-w-[16ch] text-[clamp(1.3rem,2.2vw,2rem)] font-extralight uppercase leading-[1.1] tracking-[0.12em]">{audience.label}</h3>
                    <p className="mt-5 max-w-[42ch] text-base font-extralight leading-relaxed tracking-wide text-[#FAFAF9]/80">{audience.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0b090d] px-6 pb-16 pt-12 md:px-16 lg:hidden motion-reduce:lg:block">
        <div className="mx-auto max-w-[1300px]">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">Our partners</p>
          <h2 className="mt-4 text-[clamp(1.5rem,5vw,2.3rem)] font-extralight uppercase leading-[1.15] tracking-[0.16em]">Who we work with</h2>
          <ul className="mt-10 flex flex-col gap-10">
            {audiences.map((audience) => (
              <li key={audience.number} className="border-t border-white/[0.12] pt-6 md:grid md:grid-cols-[0.8fr_1.2fr] md:gap-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">{audience.number} / 0{audiences.length}</p>
                  <h3 className="mt-3 text-[clamp(1.1rem,3vw,1.5rem)] font-extralight uppercase leading-[1.15] tracking-[0.14em]">{audience.label}</h3>
                </div>
                <p className="mt-4 text-[15px] font-extralight leading-relaxed tracking-wide text-[#FAFAF9]/75 md:mt-0">{audience.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button variant="secondarySubtle" href="/contact" size="large">
              Work with BTE <span className="text-xs">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
