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

export default function EcosystemSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isZoomed = isHovered || isFocused || isPinned;

  return (
    <section className="relative overflow-hidden bg-[#08090B] py-12 md:py-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage/image 4.png"
          alt=""
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[#08090B]/35" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-2 flex items-center gap-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E97868] text-xs text-[#E97868]">
            ✳
          </span>
          <span className="inline-flex items-center rounded-full bg-[#E97868] px-3 py-1 text-xs font-medium text-[#161415]">
            What We Have Built
          </span>
        </div>

        <h2 className="mb-2 text-3xl font-black leading-tight text-[#FAFAF9] md:text-4xl">
          The UK Ecosystem
        </h2>

        <div className="flex justify-center overflow-visible pb-8 pt-2">
          <div className="relative w-full max-w-[390px] overflow-visible">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-[14%] rounded-full bg-blue-500/50 blur-3xl transition-opacity duration-500 ${
                isZoomed ? "opacity-90" : "opacity-45"
              }`}
            />
            <button
              type="button"
              aria-label="Zoom the UK ecosystem globe to show its location badges"
              aria-expanded={isZoomed}
              onPointerEnter={() => setIsHovered(true)}
              onPointerLeave={() => setIsHovered(false)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onClick={() => setIsPinned((pinned) => !pinned)}
              className="group relative block w-full cursor-zoom-in rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              <Image
                src="/homepage/Globe1.png"
                alt=""
                aria-hidden="true"
                width={600}
                height={600}
                className={`relative z-10 h-auto w-full transform-gpu transition-transform duration-700 ease-out ${
                  isZoomed ? "scale-110" : "scale-100"
                }`}
              />
              <span
                className={`absolute left-[62%] top-[38%] z-20 -translate-y-1/2 whitespace-nowrap rounded-full border border-blue-200/80 bg-[#10263B]/95 px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.8)] transition-all duration-500 md:text-xs ${
                  isZoomed
                    ? "translate-x-0 scale-100 opacity-100"
                    : "-translate-x-2 scale-75 opacity-0"
                }`}
              >
                UK Ecosystem
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-y border-white/25">
        <div className="mx-auto grid max-w-[1200px] grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-white/20 px-4 py-3 last:border-r-0 md:px-8"
            >
              <p className="text-3xl font-black leading-none text-[#FAFAF9] md:text-4xl">
                {stat.number}
              </p>
              <p className="mt-1 text-xs text-[#FAFAF9]/80 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 flex w-full max-w-[1200px] flex-wrap justify-center gap-2 px-6 md:px-12">
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
