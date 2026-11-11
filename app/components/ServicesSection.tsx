// Tools and services section: spotlight cards that follow the pointer and a slow marquee of tool names.
"use client";

import { useRef } from "react";
import SectionLabel from "./ui/SectionLabel";

type Service = { group: string; title: string; text: string; span: string; tone?: "red" };

const services: Service[] = [
  { group: "Build", title: "Pitch Deck Builder", text: "Turns a business idea into a themed slide deck you can present.", span: "lg:col-span-5" },
  { group: "Build", title: "Proposal Builder", text: "Drafts client and funding proposals from a short brief.", span: "lg:col-span-4" },
  { group: "Build", title: "Business Plan", text: "A structured plan with a roadmap to work through.", span: "lg:col-span-3" },
  { group: "Build", title: "Brand Identity", text: "Logos and brand documents for a new business.", span: "lg:col-span-3" },
  { group: "Build", title: "Idea Generator", text: "Starting points for founders who have the drive and not yet the idea.", span: "lg:col-span-4" },
  { group: "Insight", title: "Market Research", text: "Industry and market data, summarised for a founder rather than an analyst.", span: "lg:col-span-5" },
  { group: "Connect", title: "My Mentor", text: "Guidance from mentors, with sessions you can book.", span: "lg:col-span-4" },
  { group: "Connect", title: "Events", text: "BTE events and programmes in one place.", span: "lg:col-span-3" },
  { group: "Insight", title: "Black Business Intelligence Index", text: "Index reports on Black-owned businesses, starting with Greater Manchester.", span: "lg:col-span-5", tone: "red" },
];

export default function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  function track(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    gridRef.current?.querySelectorAll<HTMLElement>("[data-spot]").forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  }

  const names = services.map((service) => service.title);

  return (
    <section id="services" aria-labelledby="services-title" className="overflow-hidden bg-[#F1F0EF] py-16 text-[#161415] md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <SectionLabel className="mb-5">Tools And Services</SectionLabel>
        <h2 id="services-title" className="max-w-[640px] text-3xl font-black leading-[1.02] tracking-tight md:text-5xl">
          What members can use
        </h2>
        <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-[#161415]/70 md:text-base">
          The tools sit inside one membership. Use them to build, to find out, and to connect.
        </p>

        <div ref={gridRef} onPointerMove={track} className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-12">
          {services.map((service) => (
            <article
              key={service.title}
              data-spot
              className={`spot-card flex min-h-44 flex-col justify-between rounded-md p-6 md:min-h-52 ${service.span} ${
                service.tone === "red" ? "bg-[#B04333] text-white" : "bg-[#161415] text-[#FAFAF9]"
              }`}
            >
              <span className={`text-[11px] font-medium uppercase tracking-[0.18em] ${service.tone === "red" ? "text-white/75" : "text-[#E97868]"}`}>
                {service.group}
              </span>
              <div>
                <h3 className="text-xl font-bold leading-tight md:text-2xl">{service.title}</h3>
                <p className={`mt-2 max-w-[34ch] text-sm leading-snug ${service.tone === "red" ? "text-white/85" : "text-[#FAFAF9]/65"}`}>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="marquee mt-14 text-sm font-medium text-[#161415]/55" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-track">
            {names.map((name) => (
              <span key={name} className="flex-none whitespace-nowrap">{name}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
