"use client";

import { useState } from "react";
import Button from "../ui/Button";
import SectionLabel from "../ui/SectionLabel";
import WakeList from "../ui/WakeList";
import ToolNetwork from "./ToolNetwork";
import { toolGroups, type ToolGroup } from "./platformLayers";

function ToolGroupScene({ group }: { group: ToolGroup }) {
  const [active, setActive] = useState(0);

  const items = group.tools.map((tool) => ({
    key: tool.name,
    title: tool.name,
    meta: group.upcoming ? "Coming soon" : undefined,
    text: tool.note,
    extra: tool.parts ? <p className="mt-3 text-sm text-[#FAFAF9]/50">{tool.parts.join(" / ")}</p> : undefined,
  }));

  return (
    <div className="grid gap-10 border-t border-white/10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <h3 className="text-3xl font-extralight uppercase leading-[1.1] tracking-[0.1em] md:text-5xl">{group.title}</h3>
        <p className="mt-4 text-xs uppercase tracking-[0.28em] text-[#E97868]">
          {group.upcoming ? `${group.tools.length} on the way` : `${group.tools.length} tools`}
        </p>
        <div className="mt-10 hidden max-w-[340px] lg:block">
          <ToolNetwork count={group.tools.length} active={active} />
        </div>
      </div>
      <WakeList items={items} size="small" onActive={setActive} />
    </div>
  );
}

export default function PlatformToolsSection() {
  return (
    <section id="platform-tools" aria-labelledby="platform-tools-title" className="px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto w-full max-w-[1300px]">
        <SectionLabel className="mb-8">BTE Platform</SectionLabel>
        <h2 id="platform-tools-title" className="max-w-[16ch] text-4xl font-extralight uppercase leading-[1.1] tracking-[0.1em] md:text-6xl">
          What members can use
        </h2>

        <div className="mt-16">
          {toolGroups.map((group) => (
            <ToolGroupScene key={group.id} group={group} />
          ))}
        </div>

        <div className="border-t border-white/10 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">Insight</p>
          <h3 className="mt-5 max-w-[20ch] text-2xl font-extralight uppercase leading-[1.15] tracking-[0.1em] md:text-4xl">
            Black Business Intelligence Index
          </h3>
          <p className="mt-4 max-w-[48ch] text-base text-[#FAFAF9]/65">Index reports on Black-owned businesses, starting with Greater Manchester.</p>
          <div className="mt-10">
            <Button href="/contact" variant="primary" size="large">
              Get access <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
