"use client";

import { useState } from "react";
import SectionLabel from "../ui/SectionLabel";
import WakeList from "../ui/WakeList";

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

  return (
    <section id="what-we-do" className="px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto grid w-full max-w-[1300px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>What we do</SectionLabel>
          <p className="mt-8 max-w-[26ch] text-xl font-extralight leading-snug tracking-wide text-[#FAFAF9]/80 md:text-2xl">
            Three ways we help communities get started and keep going.
          </p>
          <div className="mt-12 hidden items-end gap-6 lg:flex" aria-hidden="true">
            <span className="text-[88px] font-extralight leading-none tracking-[0.04em] text-[#E97868]/90">0{active + 1}</span>
            <div className="mb-3 flex flex-col gap-2">
              {items.map((item, index) => (
                <span
                  key={item.key}
                  className={`block h-px transition-all duration-500 ${index === active ? "w-16 bg-[#E97868]" : "w-8 bg-white/25"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <WakeList items={items} onActive={setActive} />
      </div>
    </section>
  );
}
