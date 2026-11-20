"use client";

import { useEffect, useRef, useState } from "react";
import StarField from "./StarField";

const words = ["Technology", "Skills", "Enterprise", "Ownership"];

export default function ScrollBand() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
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
      progress.current = value;
      if (line.current) line.current.style.transform = `scaleX(${value.toFixed(4)})`;
      setActive(Math.min(words.length - 1, Math.floor(value * words.length)));
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
    <div ref={track} className="relative h-[320svh] motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-6 motion-reduce:static motion-reduce:min-h-svh motion-reduce:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]">
          <StarField progress={progress} />
        </div>

        <p className="text-[11px] uppercase tracking-[0.34em] text-[#E97868]">From community to ownership</p>

        <div className="relative mt-8 h-[clamp(4rem,11vw,9rem)] w-full max-w-[1200px] motion-reduce:h-auto">
          {words.map((word, index) => {
            const state = index === active ? "on" : index < active ? "past" : "next";
            return (
              <h2
                key={word}
                aria-hidden={index !== active}
                data-state={state}
                className="band-word absolute inset-0 flex items-center justify-center text-center text-[clamp(2.2rem,8.2vw,7rem)] font-extralight uppercase leading-none tracking-[0.14em] text-[#FAFAF9] motion-reduce:static motion-reduce:py-2"
              >
                {word}
              </h2>
            );
          })}
        </div>

        <div className="absolute inset-x-6 bottom-[10svh] mx-auto max-w-[640px] motion-reduce:hidden" aria-hidden="true">
          <div className="relative h-px bg-white/15">
            <span ref={line} className="absolute inset-0 origin-left bg-[#E97868]" style={{ transform: "scaleX(0)" }} />
            <div className="absolute inset-x-0 -top-[5px] flex justify-between">
              {words.map((word, index) => (
                <span key={word} className="relative">
                  <span className={`block h-[11px] w-[11px] rounded-full border transition-all duration-500 ${index <= active ? "scale-110 border-[#E97868] bg-[#E97868] shadow-[0_0_14px_rgba(233,120,104,0.8)]" : "border-white/30 bg-[#070b16]"}`} />
                  <span className={`absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.24em] transition-colors duration-500 ${index === active ? "text-[#FAFAF9]" : "text-white/35"}`}>
                    0{index + 1}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
