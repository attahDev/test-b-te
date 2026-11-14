"use client";

import type { CSSProperties, PointerEvent } from "react";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import { toolGroups } from "./platformLayers";

const toolNames = toolGroups.flatMap((group) => group.tools.map((tool) => tool.name));
const liveCount = toolGroups.filter((group) => !group.upcoming).reduce((total, group) => total + group.tools.length, 0);

function pad(number: number) {
  return String(number).padStart(2, "0");
}

export default function GmbteToolsSection() {
  function spot(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
  }

  const groupOffsets = toolGroups.map((_, index) => toolGroups.slice(0, index).reduce((total, group) => total + group.tools.length, 0));

  return (
    <section id="gmbte-tools" aria-labelledby="gmbte-tools-title" className="relative overflow-hidden bg-[#141213] px-6 py-16 text-[#FAFAF9] sm:px-10 md:py-24 lg:px-14">
      <div className="mx-auto w-full max-w-[1100px]">
        <SectionLabel className="mb-5">GMBTE Platform</SectionLabel>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="gmbte-tools-title" className="max-w-[640px] text-3xl font-black leading-[1.02] tracking-tight md:text-5xl">
            What members can use
          </h2>
          <p className="max-w-[360px] text-sm leading-relaxed text-white/60 md:text-right md:text-base">
            Every tool inside the platform, grouped by what you need it for. {liveCount} live, {toolGroups[toolGroups.length - 1].tools.length} on the way.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-12">
          {toolGroups.map((group, groupIndex) => (
            <Reveal key={group.id} threshold={0.08}>
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/15 pb-3">
                <h3 className="text-xl font-bold md:text-2xl">{group.title}</h3>
                <span className="text-sm text-white/45">{group.upcoming ? `${group.tools.length} on the way` : `${group.tools.length} tools`}</span>
              </div>

              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {group.tools.map((tool, order) => (
                  <li
                    key={tool.name}
                    style={{ "--i": order } as CSSProperties}
                    className={`tool-row flex min-h-[132px] flex-col rounded-md border bg-[#1b1819] p-5 ${group.upcoming ? "border-dashed border-white/25" : "border-white/10"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-xs text-white/35">{pad(groupOffsets[groupIndex] + order + 1)}</span>
                      {group.upcoming && <span className="text-xs text-[#E97868]">Coming soon</span>}
                    </div>
                    <h4 className="mt-3 text-lg font-semibold leading-snug">{tool.name}</h4>
                    {tool.note && <p className="mt-1.5 text-sm leading-relaxed text-white/60">{tool.note}</p>}
                    {tool.parts && <p className="mt-auto pt-4 text-[13px] text-white/75">{tool.parts.join(" / ")}</p>}
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

      <div className="marquee mt-14 text-sm font-medium text-white/40" aria-hidden="true">
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
