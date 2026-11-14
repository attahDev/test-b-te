import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";

const items = [
  {
    num: "01",
    title: "BUSINESS REGISTRATION AND COMPLIANCE",
    desc: "Navigate UK business registration, tax requirements and legal compliance with expert guidance tailored to your needs.",
  },
  {
    num: "02",
    title: "MENTORSHIP AND COMMUNITY SUPPORT",
    desc: "Connect with experienced entrepreneurs and industry leaders who understand your journey and are committed to your success.",
  },
  {
    num: "03",
    title: "UK AND INTERNATIONAL BUSINESS SETUP",
    desc: "Expand your reach locally and globally with support for multi-market business structures and international trade opportunities.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="relative overflow-hidden bg-[#101010] py-12 md:py-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage/architectural-background.png"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#101010]/55" />
      </div>

      <Reveal
        threshold={0.2}
        className="relative z-10 mx-auto grid w-full max-w-[1200px] gap-8 px-6 md:px-12 lg:grid-cols-[29%_1fr] lg:gap-8"
      >
        <div className="wwd-photo min-h-[320px] overflow-hidden md:min-h-[440px] lg:mt-14 lg:min-h-[456px]">
          <div className="wwd-drift h-full min-h-[320px] md:min-h-[440px] lg:min-h-[456px]">
            <Image
              src="/homepage/community-panel.png"
              alt="Black Tech Expo members collaborating"
              width={600}
              height={800}
              className="wwd-img h-full min-h-[320px] w-full object-cover md:min-h-[440px] lg:min-h-[456px]"
            />
          </div>
        </div>

        <div>
          <div className="wwd-fade">
            <SectionLabel className="mb-8">What We Do</SectionLabel>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {items.slice(0, 2).map((item, index) => (
              <article
                key={item.num}
                style={{ "--i": index } as CSSProperties}
                className="wwd-card relative flex min-h-36 items-end overflow-hidden bg-[#F1F0EF] px-4 pb-4 pt-5 md:min-h-36 md:px-5"
              >
                <span
                  aria-hidden="true"
                  className={`wwd-num absolute -bottom-5 left-5 text-7xl font-black leading-none md:text-8xl ${
                    item.num === "02"
                      ? "text-[#E97868]/35"
                      : "text-[#D85643]"
                  }`}
                >
                  {item.num}
                </span>
                <div className="wwd-body relative ml-auto w-[53%]">
                  <h3 className="text-left text-base font-black leading-tight text-[#161415] md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-[1.35] text-[#161415]/75">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}

            <article
              style={{ "--i": 2 } as CSSProperties}
              className="wwd-card relative flex min-h-28 items-end overflow-hidden bg-[#F1F0EF] px-4 pb-4 pt-5 md:col-span-2 md:min-h-24 md:items-center md:px-5"
            >
              <span
                aria-hidden="true"
                className="wwd-num absolute -bottom-5 left-5 text-7xl font-black leading-none text-[#D85643] md:static md:mr-8 md:text-8xl"
              >
                {items[2].num}
              </span>
              <div className="wwd-body relative ml-auto w-[61%] md:ml-0 md:flex-1">
                <h3 className="text-base font-black leading-tight text-[#161415] md:text-lg">
                  {items[2].title}
                </h3>
                <p className="mt-2 text-xs leading-[1.35] text-[#161415]/75">
                  {items[2].desc}
                </p>
              </div>
            </article>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
