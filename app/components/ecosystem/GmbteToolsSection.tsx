"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import Aurora from "../Aurora";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import PlatformIcon from "./PlatformIcon";
import { agentTones, agents, controlCentre, ecosystem, platformTools, productivity } from "./platformLayers";

const tileNames = [...platformTools, ...productivity].map((item) => item.name);

function tileStyle(order: number, tone = "#E97868") {
  return { "--i": order, "--tone": tone } as CSSProperties;
}

function Layer({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section aria-label={`Layer ${number}: ${title}`} className="rounded-xl border border-white/10 bg-white/[0.025] p-3 md:p-4">
      <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#E97868]">
        Layer {number} – {title}
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

  const platformStart = ecosystem.length;
  const agentStart = platformStart + platformTools.length;
  const productivityStart = agentStart + agents.length;
  const controlStart = productivityStart + productivity.length + 1;

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
          Five layers inside one platform, from the places members gather to the controls that keep it safe.
        </p>

        <Reveal threshold={0.08} className="mt-10 rounded-2xl border border-white/10 bg-[#0b0d14]/85 p-3 backdrop-blur-sm md:p-5">
          <div className="board-tile mb-4 flex flex-col gap-1 px-1 md:flex-row md:items-end md:justify-between" style={tileStyle(0)}>
            <div>
              <p className="text-lg font-bold md:text-xl">Member dashboard</p>
              <p className="text-xs text-white/55 md:text-sm">Your intelligent guide to opportunities, growth and impact.</p>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">5 layers · {agents.length} AI agents</p>
          </div>

          <div className="flex flex-col gap-3">
            <Layer number={1} title="Platform ecosystem">
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
                {ecosystem.map((item, order) => (
                  <li key={item.name} style={tileStyle(order)} className="board-tile flex flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-2 py-3 text-center">
                    <PlatformIcon name={item.icon} className="h-6 w-6 text-[var(--tone)]" />
                    <span className="text-[11px] leading-tight text-white/85">{item.name}</span>
                  </li>
                ))}
              </ul>
            </Layer>

            <Layer number={2} title="Platform tools">
              <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
                {platformTools.map((item, order) => (
                  <li key={item.name} style={tileStyle(platformStart + order, agentTones[order % agentTones.length])} className="board-tile flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-4 text-center">
                    <PlatformIcon name={item.icon} className="h-7 w-7 text-[var(--tone)]" />
                    <span className="text-xs font-semibold leading-tight text-white">{item.name}</span>
                    <span className="text-[11px] leading-snug text-white/50">{item.note}</span>
                  </li>
                ))}
              </ul>
            </Layer>

            <Layer number={3} title={`AI agents (${agents.length})`}>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {agents.map((item, order) => (
                  <li key={item.name} style={tileStyle(agentStart + order, agentTones[order % agentTones.length])} className="board-tile flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-4 text-center">
                    <PlatformIcon name={item.icon} className="h-8 w-8 text-[var(--tone)]" />
                    <span className="text-xs font-semibold leading-tight text-white">
                      {order + 1}. {item.name}
                    </span>
                    <span className="text-[11px] leading-snug text-white/50">{item.note}</span>
                    <span className="mt-auto rounded-md bg-[var(--tone)]/20 px-5 py-1 text-[11px] font-medium text-white">Chat</span>
                  </li>
                ))}
              </ul>
            </Layer>

            <Layer number={4} title="AI productivity & business tools">
              <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
                {productivity.map((item, order) => (
                  <li key={item.name} style={tileStyle(productivityStart + order, agentTones[(order + 2) % agentTones.length])} className="board-tile flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-3">
                    <div className="flex items-center gap-2">
                      <PlatformIcon name={item.icon} className="h-6 w-6 flex-none text-[var(--tone)]" />
                      <span className="text-xs font-semibold leading-tight text-white">{item.name}</span>
                    </div>
                    <span className="text-[11px] leading-snug text-white/50">{item.note}</span>
                    <span className="mt-auto self-start rounded-md bg-white/10 px-4 py-1 text-[11px] font-medium text-white">Launch</span>
                  </li>
                ))}
                <li style={tileStyle(productivityStart + productivity.length)} className="board-tile flex flex-col gap-2 rounded-lg border border-dashed border-white/20 p-3">
                  <div className="flex items-center gap-2">
                    <PlatformIcon name="grid" className="h-6 w-6 flex-none text-[var(--tone)]" />
                    <span className="text-xs font-semibold leading-tight text-white">View All Tools</span>
                  </div>
                  <span className="text-[11px] leading-snug text-white/50">Explore all AI productivity tools in one place.</span>
                  <span className="mt-auto self-start rounded-md bg-white/10 px-4 py-1 text-[11px] font-medium text-white">Open Hub</span>
                </li>
              </ul>
            </Layer>

            <Layer number={5} title="Control centre">
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
                {controlCentre.map((item, order) => (
                  <li key={item.name} style={tileStyle(controlStart + order)} className="board-tile flex flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.035] px-2 py-3 text-center">
                    <PlatformIcon name={item.icon} className="h-5 w-5 text-[var(--tone)]" />
                    <span className="text-[11px] leading-tight text-white/75">{item.name}</span>
                  </li>
                ))}
              </ul>
            </Layer>
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
