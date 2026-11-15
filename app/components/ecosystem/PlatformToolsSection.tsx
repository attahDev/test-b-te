"use client";

import type { CSSProperties, PointerEvent } from "react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import { toolGroups } from "./platformLayers";

const toolNames = toolGroups.flatMap((group) => group.tools.map((tool) => tool.name));

export default function PlatformToolsSection() {
  function spot(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
  }

    return (
    <section id="platform-tools" aria-labelledby="platform-tools-title" className="relative overflow-hidden bg-white px-6 py-16 text-[#161415] sm:px-10 md:py-24 lg:px-14">
      <div className="mx-auto w-full max-w-[1100px]">
        <SectionLabel className="mb-5">BTE Platform</SectionLabel>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="platform-tools-title" className="max-w-[640px] text-3xl font-black leading-[1.02] tracking-tight md:text-5xl">
            What members can use
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-12">
          {toolGroups.map((group) => (
            <Reveal key={group.id} threshold={0.08}>
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-[#161415]/15 pb-3">
                <h3 className="text-xl font-bold md:text-2xl">{group.title}</h3>
                <span className="text-sm text-[#161415]/50">{group.upcoming ? `${group.tools.length} on the way` : `${group.tools.length} tools`}</span>
              </div>

              <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {group.tools.map((tool, order) => (
                  <li
                    key={tool.name}
                    style={{ "--i": order } as CSSProperties}
                    className={`tool-row flex min-h-[112px] flex-col rounded-md border bg-[#faf9f8] p-3.5 sm:min-h-[132px] sm:p-5 ${group.upcoming ? "border-dashed border-[#161415]/25" : "border-[#161415]/10"}`}
                  >
                    {group.upcoming && <span className="text-xs text-[#B04333]">Coming soon</span>}
                    <h4 className="text-base font-semibold leading-snug sm:text-lg">{tool.name}</h4>
                    {tool.note && <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-[#161415]/60 sm:mt-1.5 sm:line-clamp-none sm:text-sm">{tool.note}</p>}
                    {tool.parts && <p className="mt-auto pt-3 text-xs text-[#161415]/75 sm:pt-4 sm:text-[13px]">{tool.parts.join(" / ")}</p>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <article onPointerMove={spot} className="spot-card mt-16 flex min-h-36 flex-col justify-between rounded-md bg-[#B04333] p-6 text-white md:min-h-40">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/75">Insight</span>
          <div>
            <h3 className="text-xl font-bold leading-tight md:text-2xl">Black Business Intelligence Index</h3>
            <p className="mt-2 max-w-[48ch] text-sm leading-snug text-white/85">Index reports on Black-owned businesses, starting with Greater Manchester.</p>
          </div>
        </article>

        <div className="mt-10">
          <Button href="/contact" variant="primary" size="large">
            Get access <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>

      <div className="marquee mt-14 text-sm font-medium text-[#161415]/40" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-track">
            {toolNames.map((name) => (
              <span key={name} className="flex-none whitespace-nowrap">{name}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
