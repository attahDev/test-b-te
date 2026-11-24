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
  const track = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = track.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const room = node.offsetHeight - window.innerHeight;
      const value = Math.min(1, Math.max(0, -node.getBoundingClientRect().top / Math.max(1, room)));
      if (line.current) line.current.style.transform = `scaleY(${value.toFixed(4)})`;
      setActive(Math.min(steps.length - 1, Math.floor(value * steps.length)));
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
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(index);
      return;
    }
    const room = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: node.offsetTop + (room * (index + 0.5)) / steps.length, behavior: "smooth" });
  };

  return (
    <div ref={track} className="relative h-[320svh] motion-reduce:h-auto">
      <div className="sticky top-0 isolate flex h-svh items-center overflow-hidden px-6 md:px-16 motion-reduce:static motion-reduce:min-h-svh motion-reduce:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]">
          <LoopVideo className="-scale-x-100 object-[40%_top] opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,9,13,0.85),rgba(11,9,13,0.35)_60%,rgba(11,9,13,0.55))]" />
        </div>

        <div className="mx-auto grid w-full max-w-[1300px] gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-8 text-[11px] uppercase tracking-[0.34em] text-[#E97868]">From community to ownership</p>
            <ol className="flex flex-col gap-1 md:gap-2">
              {steps.map((step, index) => (
                <li key={step.word}>
                  <button
                    type="button"
                    onClick={() => jump(index)}
                    aria-current={index === active}
                    className="band-line group flex w-full items-baseline gap-4 text-left md:gap-6"
                    data-on={index === active}
                  >
                    <span className="w-7 shrink-0 text-[11px] tracking-[0.24em] text-[#E97868] transition-opacity duration-500 data-[on=false]:opacity-0 md:w-9 md:text-xs" data-on={index === active}>
                      0{index + 1}
                    </span>
                    <span className="band-word-text block text-[clamp(2.1rem,7.4vw,6.4rem)] font-extralight uppercase leading-[1.04] tracking-[0.1em]">{step.word}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative min-h-[150px] lg:min-h-[190px] lg:pb-4" aria-live="polite">
            {steps.map((step, index) => (
              <div
                key={step.word}
                aria-hidden={index !== active}
                className={`absolute inset-x-0 top-0 transition-all duration-700 lg:top-auto lg:bottom-0 ${index === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"}`}
              >
                <span aria-hidden="true" className="mb-5 block h-px w-12 bg-[#E97868]" />
                <p className="max-w-[40ch] text-sm font-light leading-relaxed text-[#FAFAF9]/75 md:text-base">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-[8svh] right-6 top-[8svh] hidden w-px bg-white/10 motion-reduce:hidden md:right-16 md:block" aria-hidden="true">
          <span ref={line} className="absolute inset-0 origin-top bg-[#E97868]" style={{ transform: "scaleY(0)" }} />
        </div>
      </div>
    </div>
  );
}
