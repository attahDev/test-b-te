"use client";

import SectionLabel from "../ui/SectionLabel";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import WireScene from "./WireScene";

const MeshScene = dynamic(() => import("./MeshScene"), { ssr: false });

const items = [
  {
    key: "registration",
    title: "Business registration and compliance",
    text: "Navigate UK business registration, tax requirements and legal compliance with expert guidance tailored to your needs.",
  },
  {
    key: "mentorship",
    title: "Mentorship and community support",
    text: "Connect with experienced entrepreneurs and industry leaders who understand your journey and are committed to your success.",
  },
  {
    key: "setup",
    title: "UK and international business setup",
    text: "Expand your reach locally and globally with support for multi-market business structures and international trade opportunities.",
  },
];

export default function WhatWeDoSection() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = track.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const progress = -box.top / Math.max(1, box.height - window.innerHeight);
      setActive(Math.min(items.length - 1, Math.max(0, Math.floor(progress * items.length))));
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
    window.scrollTo({ top: node.offsetTop + (room * (index + 0.5)) / items.length, behavior: "smooth" });
  };

  return (
    <section id="what-we-do" className="relative">
      <div ref={track} className="relative h-[330svh] motion-reduce:h-auto">
        <div className="sticky top-0 isolate flex h-svh flex-col overflow-hidden px-6 pb-10 pt-28 md:px-16 motion-reduce:static motion-reduce:min-h-svh">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]">
            <WireScene />
            <MeshScene active={active} />
          </div>

          <div className="mx-auto flex w-full max-w-[1300px] flex-1 flex-col justify-between gap-8 lg:grid lg:grid-cols-[0.8fr_1fr_1.1fr] lg:items-center lg:gap-10">
            <div>
              <SectionLabel>What we do</SectionLabel>
              <p className="mt-6 max-w-[22ch] text-lg font-extralight leading-snug tracking-wide text-[#FAFAF9]/80 md:text-xl">
                Three ways we help communities get started and keep going.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {items.map((item, index) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => jump(index)}
                      aria-current={index === active}
                      className={`flex items-center gap-4 text-left text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ${index === active ? "text-[#FAFAF9]" : "text-white/35 hover:text-white/65"}`}
                    >
                      <span className={`block h-px transition-all duration-500 ${index === active ? "w-12 bg-[#E97868]" : "w-6 bg-white/25"}`} />
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block" />

            <div className="relative min-h-[250px] lg:min-h-[300px]" aria-live="polite">
              {items.map((item, index) => (
                <div
                  key={item.key}
                  aria-hidden={index !== active}
                  className={`absolute inset-x-0 top-0 transition-all duration-700 lg:top-1/2 lg:-translate-y-1/2 ${index === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
                >
                  <h2 className="text-2xl font-extralight uppercase leading-[1.1] tracking-[0.1em] text-[#FAFAF9] sm:text-3xl lg:text-4xl">{item.title}</h2>
                  <p className="mt-5 max-w-[44ch] text-base font-light leading-relaxed text-[#FAFAF9]/70 md:text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
