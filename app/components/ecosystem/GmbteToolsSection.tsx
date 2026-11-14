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

        <div className="mt-14 flex flex-col gap-14">
          {toolGroups.map((group, groupIndex) => (
            <Reveal key={group.id} threshold={0.1} className="border-t border-white/20 pt-5">
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-bold md:text-2xl">{group.title}</h3>
                <span className="font-mono text-xs text-white/45">{pad(group.tools.length)}</span>
              </div>

              <ul>
                {group.tools.map((tool, order) => (
                  <li
                    key={tool.name}
                    style={{ "--i": order } as CSSProperties}
                    className="tool-row grid grid-cols-[2.25rem_1fr] gap-x-3 border-b border-white/10 px-2 py-4 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-x-6"
                  >
                    <span className="tool-num pt-1 font-mono text-xs text-white/35">{pad(groupOffsets[groupIndex] + order + 1)}</span>
                    <div>
                      <span className={`tool-name block text-lg font-semibold leading-snug md:text-xl ${group.upcoming ? "text-white/60" : ""}`}>{tool.name}</span>
                      {group.upcoming && <span className="mt-1 block text-xs font-medium uppercase tracking-[0.14em] text-[#E97868]">Coming soon</span>}
                    </div>
                    <div className="col-start-2 mt-1 md:col-start-3 md:mt-0">
                      {tool.note && <p className="text-sm leading-relaxed text-white/60">{tool.note}</p>}
                      {tool.parts && (
                        <p className={`text-sm text-white/80 ${tool.note ? "mt-1.5" : ""}`}>
                          {tool.parts.map((part, index) => (
                            <span key={part}>
                              {index > 0 && <span className="px-2 text-[#E97868]">/</span>}
                              {part}
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
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
