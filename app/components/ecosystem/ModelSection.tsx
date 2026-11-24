"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ChessScene from "./ChessScene";
import SectionLabel from "../ui/SectionLabel";

const REDUCED = "(prefers-reduced-motion: reduce)";

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
  const [stage, setStage] = useState(0);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED).matches, () => true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = section.offsetHeight - window.innerHeight;
      const p = distance > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance)) : 1;
      setStage(Math.min(steps.length, Math.floor(p * (steps.length + 1))));
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
    if (!section || reduced) { setStage(index + 1); return; }
    const distance = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((index + 1.5) / (steps.length + 1)) * distance, behavior: "smooth" });
  }

  const active = reduced && stage === 0 ? 0 : stage - 1;
  const step = active >= 0 ? steps[active] : null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ecosystem-model-title"
      className="relative h-[400svh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden text-white motion-reduce:static motion-reduce:min-h-svh motion-reduce:py-16">
        <div className="relative mx-auto grid min-h-0 w-full max-w-[1280px] flex-1 grid-rows-[1fr_auto] gap-5 px-6 pb-8 pt-[12svh] sm:px-10 lg:grid-cols-[42%_1fr] lg:grid-rows-1 lg:gap-14 lg:px-12 lg:py-[12svh]">
          <div className="flex min-h-0 flex-col">
            <SectionLabel className="mb-4">Our Model</SectionLabel>
            <h2 id="ecosystem-model-title" className="text-2xl font-extralight uppercase leading-[1.1] tracking-[0.1em] sm:text-4xl lg:text-5xl">
              From Community
              <br />
              to Capacity
            </h2>

            <div className="mt-5 flex items-center gap-1.5 lg:mt-8" aria-hidden="true">
              {steps.map((item, index) => (
                <span key={item.title} className={`h-px flex-1 transition-colors duration-700 ${index <= active ? "bg-[#e8776a]" : "bg-white/15"}`} />
              ))}
            </div>

            <div className="mt-5 lg:mt-8" aria-live="polite">
              <div key={active} className="model-panel">
                {step ? (
                  <>
                    <p className="flex items-baseline gap-3">
                      <span className="text-4xl font-light leading-none text-[#e8776a] lg:text-6xl">0{active + 1}</span>
                      <span className="text-2xl font-bold tracking-[-0.03em] lg:text-3xl">{step.title}</span>
                    </p>
                    <p className="mt-3 max-w-[460px] text-[13px] leading-relaxed text-white/75 sm:text-sm lg:mt-4 lg:text-base">{step.text}</p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold tracking-[-0.03em] lg:text-3xl">Seven steps, one board</p>
                    <p className="mt-3 max-w-[460px] text-[13px] leading-relaxed text-white/75 sm:text-sm lg:mt-4 lg:text-base">
                      Every step of the model is a piece on the board, from the pawn that starts it to the king at the end. Scroll to move in on each one.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex h-[38svh] min-h-0 min-w-0 flex-col lg:h-auto">
            <div className="min-h-0 flex-1">
              <ChessScene active={active} />
            </div>
            <ol className="mt-2 flex items-center justify-between gap-1 sm:gap-2">
              {steps.map((item, index) => (
                <li key={item.title} className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => jump(index)}
                    aria-current={index === active ? "step" : undefined}
                    aria-label={`Step ${index + 1}: ${item.title}`}
                    className={`flex w-full flex-col items-center gap-2 py-2 text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-[#e8776a] sm:text-[11px] ${index === active ? "text-white" : "text-white/35 hover:text-white/70"}`}
                  >
                    <span className={`block h-px w-full transition-colors duration-500 ${index === active ? "bg-[#e8776a]" : "bg-white/20"}`} />
                    <span className="sm:hidden">0{index + 1}</span>
                    <span className="hidden truncate sm:block">{item.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
