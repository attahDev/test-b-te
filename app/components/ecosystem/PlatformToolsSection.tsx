"use client";

import Button from "../ui/Button";
import ToolHelix from "./ToolHelix";
import { toolGroups } from "./platformLayers";

export default function PlatformToolsSection() {
  return (
    <section id="platform-tools" aria-labelledby="platform-tools-title" className="relative isolate px-6 py-20 md:px-16 md:py-24">
      <div className="relative mx-auto w-full max-w-[1300px]">
        <h2 id="platform-tools-title" className="max-w-[16ch] text-3xl font-extralight uppercase leading-[1.15] tracking-[0.1em] md:text-5xl">
          What members can use
        </h2>

        <div className="mt-16">
          {toolGroups.map((group) => (
            <ToolHelix key={group.id} group={group} />
          ))}
        </div>

        <div className="border-t border-white/10 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">Insight</p>
          <h3 className="mt-5 max-w-[20ch] text-2xl font-extralight uppercase leading-[1.15] tracking-[0.1em] md:text-3xl">
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
