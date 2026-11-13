"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import SectionLabel from "../ui/SectionLabel";

const REDUCED = "(prefers-reduced-motion: reduce)";
const TOPS = ["#6f9fd0", "#8a8887", "#e8776a", "#8a8887", "#6f9fd0", "#8a8887", "#e8776a"];

const steps = [
  { title: "Community", text: "Everything starts with people. We bring founders, students, professionals and neighbours together around a shared ambition to take part in the digital economy." },
  { title: "Access", text: "We open doors to rooms, networks, tools and information that were out of reach, so more people can start from the same place." },
  { title: "Skills", text: "Practical programmes, mentoring and learning areas turn curiosity into capability people can use at work and in business." },
  { title: "Technology", text: "Hands-on time with AI, Web3 and digital tools, so communities build real products and services instead of only using them." },
  { title: "Enterprise", text: "Ideas and skills become ventures. We support founders to shape, launch and sell, with practical tools along the way." },
  { title: "Investment", text: "We connect founders with funders, partners and institutions, so promising ventures have the capital and backing to grow." },
  { title: "Ownership", text: "The destination: communities hold equity, intellectual property and a real say in the infrastructure they help build." },
];

function subscribe(notify: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

export default function ModelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED).matches, () => true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = section.offsetHeight - window.innerHeight;
      const p = distance > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance)) : 1;
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  function jump(index: number) {
    const section = sectionRef.current;
    if (!section || reduced) { setActive(index); return; }
    const distance = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((index + 0.5) / steps.length) * distance, behavior: "smooth" });
  }

  const step = steps[active];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ecosystem-model-title"
      className="relative h-[340svh] bg-[#08090d] motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-[#08090d] text-white motion-reduce:static motion-reduce:min-h-svh motion-reduce:py-16">
        <Image src="/homepage/architectural-background.png" alt="" aria-hidden="true" fill sizes="100vw" className="pointer-events-none object-cover object-center opacity-55" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/60" />
        <Image src="/ecosystem/dots.png" alt="" aria-hidden="true" fill sizes="100vw" className="pointer-events-none object-cover opacity-35 mix-blend-screen" />

        <div className="relative mx-auto grid min-h-0 w-full max-w-[1280px] flex-1 grid-rows-[auto_1fr] gap-4 px-6 pb-6 pt-[10svh] sm:px-10 lg:grid-cols-[42%_1fr] lg:grid-rows-1 lg:gap-14 lg:px-12 lg:py-[12svh]">
          <div className="flex min-h-0 flex-col">
            <SectionLabel className="mb-4">Our Model</SectionLabel>
            <h2 id="ecosystem-model-title" className="text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              From Community
              <br />
              to Capacity
            </h2>

            <div className="mt-5 lg:mt-10" aria-live="polite">
              <div key={active} className="model-panel">
                <p className="flex items-baseline gap-3">
                  <span className="text-5xl font-black leading-none text-[#e8776a] lg:text-7xl">0{active + 1}</span>
                  <span className="text-2xl font-bold tracking-[-0.03em] lg:text-3xl">{step.title}</span>
                </p>
                <p className="mt-3 max-w-[460px] text-sm leading-relaxed text-white/75 lg:mt-4 lg:text-base">{step.text}</p>
              </div>
            </div>
            <p className="mt-auto hidden pt-6 font-mono text-xs text-white/40 lg:block">
              {reduced ? "Select a step" : "Scroll, or select a step"}
            </p>
          </div>

          <ol className="flex min-h-0 items-end gap-1.5 sm:gap-2.5 lg:gap-3">
            {steps.map((item, index) => {
              const risen = reduced || index <= active;
              const isActive = index === active;
              return (
                <li key={item.title} className="flex h-full min-w-0 flex-1 items-end">
                  <button
                    type="button"
                    onClick={() => jump(index)}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`Step ${index + 1}: ${item.title}`}
                    data-risen={risen}
                    data-active={isActive}
                    style={{ height: `${22 + (index * 78) / (steps.length - 1)}%` }}
                    className="model-step group relative flex w-full flex-col justify-between overflow-hidden border border-white/10 p-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8776a] sm:p-3"
                  >
                    <span aria-hidden="true" className="model-cap absolute inset-x-0 top-0 h-2.5 sm:h-3.5" style={{ background: TOPS[index] }} />
                    <span className="relative mt-3 text-xs font-black text-[#161415]/70 sm:mt-4 sm:text-lg">0{index + 1}</span>
                    <span className="relative hidden text-xs font-bold leading-tight text-[#161415] xl:block">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
