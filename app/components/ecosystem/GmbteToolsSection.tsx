"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import Aurora from "../Aurora";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import PlatformIcon from "./PlatformIcon";
import { toolGroups, toolTones } from "./platformLayers";

const tileNames = toolGroups.flatMap((group) => group.tools.map((tool) => tool.name));
const liveCount = toolGroups.filter((group) => !group.upcoming).reduce((total, group) => total + group.tools.length, 0);
const upcomingCount = toolGroups.filter((group) => group.upcoming).reduce((total, group) => total + group.tools.length, 0);

function tileStyle(order: number, tone = "#E97868") {
  return { "--i": order, "--tone": tone } as CSSProperties;
}

function Group({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <section aria-label={title} className="rounded-xl border border-white/10 bg-white/[0.025] p-3 md:p-4">
      <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#E97868]">
        {title} · {count}
      </h3>
      {children}
    </section>
  );
}

export default function GmbteToolsSection() {
  function spot(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
  }

  const groupStarts = toolGroups.map((_, index) => toolGroups.slice(0, index).reduce((total, group) => total + group.tools.length, 0) + 1);

  return (
    <section
      id="gmbte-tools"
      aria-labelledby="gmbte-tools-title"
      className="relative isolate overflow-hidden bg-[#08090d] px-6 py-16 text-white sm:px-10 md:py-24 lg:px-14"
    >
      <div className="absolute inset-0 -z-10">
        <Aurora tone="warm" />
      </div>

      <div className="mx-auto w-full max-w-[1200px]">
        <SectionLabel className="mb-5">GMBTE Platform</SectionLabel>
        <h2 id="gmbte-tools-title" className="max-w-[640px] text-3xl font-black leading-[1.02] tracking-tight md:text-5xl">
          What members can use
        </h2>
        <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/70 md:text-base">
          Every tool inside the GMBTE platform, grouped by what you need it for.
        </p>

        <Reveal threshold={0.08} className="mt-10 rounded-2xl border border-white/10 bg-[#0b0d14]/85 p-3 backdrop-blur-sm md:p-5">
          <div className="board-tile mb-4 flex flex-col gap-1 px-1 md:flex-row md:items-end md:justify-between" style={tileStyle(0)}>
            <div>
              <p className="text-lg font-bold md:text-xl">GMBTE platform</p>
              <p className="text-xs text-white/55 md:text-sm">Your intelligent guide to opportunities, growth and impact.</p>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">{liveCount} tools · {upcomingCount} coming soon</p>
          </div>

          <div className="flex flex-col gap-3">
            {toolGroups.map((group, groupIndex) => (
              <Group key={group.id} title={group.title} count={group.tools.length}>
                <ul className={`grid gap-2 ${group.columns}`}>
                  {group.tools.map((tool, order) => (
                    <li
                      key={tool.name}
                      style={tileStyle(groupStarts[groupIndex] + order, toolTones[(order + groupIndex) % toolTones.length])}
                      className={`board-tile flex flex-col items-center gap-2 rounded-lg border bg-white/[0.035] px-3 py-4 text-center ${group.upcoming ? "border-dashed border-white/25" : "border-white/10"}`}
                    >
                      <PlatformIcon name={tool.icon} className="h-7 w-7 text-[var(--tone)]" />
                      <span className="text-sm font-semibold leading-tight text-white">{tool.name}</span>
                      {tool.note && <span className="text-[11px] leading-snug text-white/50">{tool.note}</span>}
                      {tool.parts && (
                        <span className="mt-auto flex flex-wrap justify-center gap-1.5 pt-1">
                          {tool.parts.map((part) => (
                            <span key={part} className="rounded-full border border-white/20 px-2.5 py-0.5 text-[10px] text-white/80">{part}</span>
                          ))}
                        </span>
                      )}
                      {group.upcoming && <span className="mt-auto rounded-full border border-[#E97868] px-3 py-0.5 text-[10px] font-medium text-[#E97868]">Coming soon</span>}
                    </li>
                  ))}
                </ul>
              </Group>
            ))}
          </div>
        </Reveal>

        <article onPointerMove={spot} className="spot-card mt-12 flex min-h-36 flex-col justify-between rounded-md bg-[#B04333] p-6 text-white md:min-h-40">
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

      <div className="marquee mt-14 text-sm font-medium text-white/45" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-track">
            {tileNames.map((name) => (
              <span key={name} className="flex-none whitespace-nowrap">{name}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
