"use client";

import { useEffect, useRef, useState } from "react";
import LoopVideo from "./LoopVideo";

const steps = [
  { word: "Technology", text: "Hands-on time with AI, Web3 and digital tools, so communities build real products and services instead of only using them." },
  { word: "Skills", text: "Practical programmes, mentoring and learning areas turn curiosity into capability people can use at work and in business." },
  { word: "Enterprise", text: "Ideas and skills become ventures. We support founders to shape, launch and sell, with practical tools along the way." },
  { word: "Ownership", text: "The destination: communities hold equity, intellectual property and a real say in the infrastructure they help build." },
];

export default function ScrollBand() {
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const [lit, setLit] = useState<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(steps.map((_, index) => index));
      return;
    }
    const watcher = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          setLit((current) => {
            const without = current.filter((value) => value !== index);
            return entry.isIntersecting ? [...without, index] : without;
          });
        });
      },
      { rootMargin: "-32% 0px -32% 0px" },
    );
    rows.current.forEach((row) => row && watcher.observe(row));
    return () => watcher.disconnect();
  }, []);

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <LoopVideo src="/video/nebula.mp4" poster="/video/nebula.jpg" className="opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,9,13,0.5),rgba(11,9,13,0.2)_50%,rgba(11,9,13,0.6))]" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[1300px] px-6 pb-[18svh] pt-[22svh] md:px-16">
        <p className="text-[11px] uppercase tracking-[0.34em] text-[#E97868] lg:absolute lg:left-16 lg:top-[calc(22svh+1.2rem)]">From community to ownership</p>

        <ol className="mt-10 flex flex-col gap-[14svh] lg:mt-0 lg:gap-[18svh]">
          {steps.map((step, index) => {
            const on = lit.includes(index);
            const right = index % 2 === 0;
            return (
              <li
                key={step.word}
                ref={(node) => {
                  rows.current[index] = node;
                }}
                data-index={index}
                data-on={on}
                data-side={right ? "right" : "left"}
                className={`band-row flex ${right ? "lg:justify-end" : "lg:justify-start"}`}
              >
                <div className={`w-full lg:w-[62%] ${right ? "" : "lg:ml-[6%]"}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] tracking-[0.3em] text-[#E97868]">0{index + 1}</span>
                    <span aria-hidden="true" className="band-rule h-px w-16 bg-[#E97868]" />
                  </div>
                  <h2 className="band-title mt-4 text-[clamp(2.2rem,6.4vw,5.6rem)] font-extralight uppercase leading-[1.02] tracking-[0.1em]">{step.word}</h2>
                  <p className="band-text mt-6 max-w-[42ch] text-sm font-light leading-relaxed text-[#FAFAF9]/75 md:text-base">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
