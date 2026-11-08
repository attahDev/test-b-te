"use client";

import Image from "next/image";
import { useState } from "react";

const stats = [
  { number: "17+", label: "AI Agents" },
  { number: "15+", label: "Mentors" },
  { number: "6+", label: "Learning Areas" },
];

const badges = [
  "Digital Platform",
  "Community Infrastructure",
  "Events",
  "Research",
  "Recognition",
];

// The numbered markers are part of the artwork; overlay matching hit targets.
const locations = [
  { label: "Greater Manchester", number: "01", x: 18, y: 35.5 },
  { label: "Location 3", number: "3", x: 67.5, y: 27.2 },
  { label: "Location 36", number: "36", x: 69.6, y: 42.2 },
  { label: "Location 2", number: "2", x: 80.9, y: 41 },
  { label: "Location 26", number: "26", x: 30.4, y: 49.1 },
  { label: "Location 2", number: "2", x: 22.9, y: 74.9 },
  { label: "Location 9", number: "9", x: 30.9, y: 76.2 },
  { label: "Location 5", number: "5", x: 68.1, y: 76.2 },
];

export default function EcosystemSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isZoomed = isHovered || isFocused || isPinned;
  const [active, setActive] = useState(0);
  const selected = locations[active];

  return (
    <section
      id="ecosystem"
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setIsHovered(false);
          setIsFocused(false);
        }
      }}
      className="relative overflow-hidden bg-[#08090B] py-12 md:py-16"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage/starfield-background.png"
          alt=""
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[#08090B]/35" />
      </div>

      <div className="relative z-10 mx-auto h-[600px] w-full max-w-[1440px] px-6 md:h-[700px] md:px-16">
        <div className="mb-2 flex items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E97868] text-xs text-[#E97868]">
            ✳
          </span>
          <span className="inline-flex items-center rounded-full bg-[#E97868] px-3 py-1 text-xs font-medium text-[#161415]">
            What We Have Built
          </span>
        </div>

        <h2 className="relative z-20 mb-2 text-3xl font-black leading-tight text-[#FAFAF9] md:text-4xl">
          The UK Ecosystem
        </h2>

        <div
          className={`absolute transform-gpu transition-[left,top,width,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            isZoomed
              ? "left-[calc(100%-460px)] top-32 w-[540px] sm:left-[calc(100%-696px)] sm:top-12 sm:w-[760px] lg:left-[calc(100%-960px)] lg:-top-8 lg:w-[1000px]"
              : "left-1/2 top-[190px] w-[280px] -translate-x-1/2 sm:top-[210px] sm:w-[360px] lg:top-[220px] lg:w-[420px]"
          }`}
        >
          <div className="relative w-full overflow-visible" onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsPinned(false);
              setIsHovered(false);
              setIsFocused(false);
              event.currentTarget.querySelector<HTMLElement>(":focus")?.blur();
            }
          }}>
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-[14%] rounded-full bg-blue-500/50 blur-3xl transition-opacity duration-500 ${
                isZoomed ? "opacity-90" : "opacity-45"
              }`}
            />
            <div className="relative transform-gpu transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none" style={{ transform: `scale(${isZoomed ? 1.15 : 1})`, transformOrigin: `${selected.x}% ${selected.y}%` }}>
            <button
              type="button"
              aria-label="Zoom the UK ecosystem globe to show its location badges"
              aria-pressed={isPinned}
              onPointerEnter={() => setIsHovered(true)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onClick={() => setIsPinned((pinned) => !pinned)}
              className="group relative block w-full cursor-zoom-in rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              <Image
                src="/homepage/ecosystem-globe-markers.png"
                alt=""
                aria-hidden="true"
                width={600}
                height={600}
                sizes="(min-width: 1024px) 1150px, (min-width: 640px) 874px, 621px"
                className="relative h-auto w-full"
              />
            </button>
            {locations.map((location, index) => (
              <button
                key={index}
                type="button"
                aria-label={`${location.label}, marker ${index + 1}`}
                aria-pressed={active === index}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") { setActive(index); setIsHovered(true); } }}
                onFocus={() => { setActive(index); setIsFocused(true); }}
                onBlur={() => setIsFocused(false)}
                onClick={() => { setActive(index); setIsPinned(true); }}
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                className={`absolute z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-500 focus-visible:outline-2 focus-visible:outline-[#E97868] ${isZoomed ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[9px] font-bold ${active === index ? "border-white bg-[#E97868] text-black ring-4 ring-white/20" : "border-transparent text-transparent"}`}>{location.number}</span>
              </button>
            ))}
            <div aria-hidden="true" className={`pointer-events-none absolute z-30 transition-opacity duration-500 ${isZoomed ? "opacity-100" : "opacity-0"}`} style={{ left: `${selected.x}%`, top: `${selected.y}%` }}>
              <span className={`absolute -translate-y-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-[10px] font-medium text-black ${selected.x > 65 ? "right-5" : "left-5"}`}>{selected.label}</span>
              {active === 0 && <p className="absolute right-6 hidden w-40 -translate-y-1/2 text-right text-xs leading-snug text-white sm:block">The parent brand and<br />intellectual property.</p>}
            </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-30 -mt-20 border-y border-white/35 bg-black/95">
        <div className="mx-auto grid max-w-[1200px] grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-white/20 px-4 py-3 last:border-r-0 md:px-8"
            >
              <p className="text-4xl font-black leading-none tracking-tight text-[#FAFAF9] md:text-6xl">
                {stat.number}
              </p>
              <p className="mt-1 text-xs text-[#FAFAF9]/80 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`relative z-10 mx-auto mt-10 flex w-full max-w-[1200px] flex-wrap justify-center gap-2 px-6 transition-opacity duration-500 md:px-12 ${isZoomed ? "opacity-100" : "opacity-0"}`}>
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-md bg-[#242326] px-3 py-2 text-[10px] font-medium text-[#FAFAF9] md:text-xs"
            >
              {badge}
            </span>
          ))}
      </div>
    </section>
  );
}
