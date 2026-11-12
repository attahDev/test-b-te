// GMBTE platform tools: a tool list with a detail panel.
"use client";

import { useState } from "react";
import Aurora from "../Aurora";
import Button from "../ui/Button";
import SectionLabel from "../ui/SectionLabel";

const tools = [
  { name: "Idea Generator", stage: "Start", text: "Turns a rough direction into a business concept you can look at, question and refine." },
  { name: "Market Research", stage: "Validate", text: "Industry and market findings for the idea, written for a founder rather than an analyst." },
  { name: "Proposal Builder", stage: "Plan", text: "Drafts client and funding proposals from a short brief, ready to edit." },
  { name: "Pitch Deck Builder", stage: "Pitch", text: "Builds a themed investor deck from the idea and research, slide by slide." },
  { name: "Brand Identity", stage: "Brand", text: "Logos and brand documents, exported as multi-page PDFs." },
  { name: "CV Builder", stage: "Career", text: "AI-written CVs with ATS scoring and tailoring for each role, linked to the member's Skills Passport and matched opportunities." },
];

export default function GmbteToolsSection() {
  const [index, setIndex] = useState(0);
  const tool = tools[index];

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
        <SectionLabel className="mb-5">GMBTE Tools</SectionLabel>
        <h2 id="gmbte-tools-title" className="max-w-[640px] text-3xl font-black leading-[1.02] tracking-tight md:text-5xl">
          From first idea to funded venture
        </h2>
        <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/70 md:text-base">
          The tools inside the GMBTE platform. Use them in order, or pick the one you need.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
          <div role="tablist" aria-label="GMBTE tools" className="flex flex-col">
            {tools.map((item, n) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                id={`gmbte-tab-${n}`}
                aria-selected={n === index}
                aria-controls="gmbte-panel"
                onClick={() => setIndex(n)}
                onPointerEnter={(event) => event.pointerType === "mouse" && setIndex(n)}
                className={`flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-xl font-bold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868] ${
                  n === index ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                <span>
                  <span className="mr-4 font-mono text-xs text-[#E97868]">0{n + 1}</span>
                  {item.name}
                </span>
                <span aria-hidden="true" className={`transition-all duration-300 ${n === index ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>→</span>
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#101216]/80 p-8 backdrop-blur-sm md:p-10">
            <div key={tool.name} id="gmbte-panel" role="tabpanel" aria-labelledby={`gmbte-tab-${index}`} className="panel-in min-h-[170px]">
              <span className="inline-flex h-6 items-center rounded-full bg-[#E97868] px-3 text-xs font-medium text-[#161415]">{tool.stage}</span>
              <h3 className="mt-6 text-2xl font-black tracking-tight md:text-4xl">{tool.name}</h3>
              <p className="mt-4 max-w-[480px] text-base leading-snug text-white/75 md:text-lg">{tool.text}</p>
            </div>

          </div>
        </div>

        <div className="mt-10">
          <Button href="/#contact" variant="primary" size="large">
            Get access <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
