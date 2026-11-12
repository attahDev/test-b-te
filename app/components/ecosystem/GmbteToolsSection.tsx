// Tools and services: the GMBTE journey (self-touring list and tilting panel), the extra membership cards, and a marquee of every name.
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
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

type Extra = { group: string; title: string; text: string; span: string; red?: boolean };

const extras: Extra[] = [
  { group: "Build", title: "Business Plan", text: "A structured plan with a roadmap to work through.", span: "lg:col-span-3" },
  { group: "Connect", title: "My Mentor", text: "Guidance from mentors, with sessions you can book.", span: "lg:col-span-3" },
  { group: "Connect", title: "Events", text: "BTE events and programmes in one place.", span: "lg:col-span-2" },
  { group: "Insight", title: "Black Business Intelligence Index", text: "Index reports on Black-owned businesses, starting with Greater Manchester.", span: "lg:col-span-4", red: true },
];

const names = [...tools.map((item) => item.name), ...extras.map((item) => item.title)];

const CYCLE = 5500;

export default function GmbteToolsSection() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);
  const tool = tools[index];
  const next = tools[(index + 1) % tools.length];
  const auto = inView && !held;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % tools.length), CYCLE);
    return () => window.clearTimeout(timer);
  }, [auto, index]);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    const style = event.currentTarget.style;
    style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
    style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    style.setProperty("--mx", `${x * 100}%`);
    style.setProperty("--my", `${y * 100}%`);
  }

  function track(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    extrasRef.current?.querySelectorAll<HTMLElement>("[data-spot]").forEach((card) => {
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - box.left}px`);
      card.style.setProperty("--my", `${event.clientY - box.top}px`);
    });
  }

  function settle(event: PointerEvent<HTMLDivElement>) {
    const style = event.currentTarget.style;
    ["--ry", "--rx", "--mx", "--my"].forEach((name) => style.removeProperty(name));
  }

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
        <SectionLabel className="mb-5">Tools And Services</SectionLabel>
        <h2 id="gmbte-tools-title" className="max-w-[640px] text-3xl font-black leading-[1.02] tracking-tight md:text-5xl">
          From first idea to funded venture
        </h2>
        <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/70 md:text-base">
          The tools inside the GMBTE platform. Use them in order, or pick the one you need.
        </p>

        <div
          ref={rootRef}
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
          className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]"
        >
          <div className="relative pl-7">
            <span aria-hidden="true" className="absolute bottom-3 left-[3px] top-3 w-px bg-white/15" />
            <span
              aria-hidden="true"
              style={{ "--p": index / (tools.length - 1) } as CSSProperties}
              className="gt-rail absolute bottom-3 left-[3px] top-3 w-px bg-[#E97868]"
            />
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
                  className={`relative flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-xl font-bold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868] ${
                    n === index ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span aria-hidden="true" className={`absolute -left-7 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full transition-all duration-500 ${n === index ? "scale-[1.7] bg-white shadow-[0_0_0_4px_rgb(233_120_104/0.35)]" : n < index ? "bg-[#E97868]" : "bg-white/25"}`} />
                  <span>
                    <span className="mr-4 font-mono text-xs text-[#E97868]">0{n + 1}</span>
                    {item.name}
                  </span>
                  <span aria-hidden="true" className={`transition-all duration-300 ${n === index ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>→</span>
                  {n === index && <span key={index} aria-hidden="true" className={`gt-bar absolute bottom-[-1px] left-0 h-px w-full bg-[#E97868] ${auto ? "gt-bar-run" : ""}`} />}
                </button>
              ))}
            </div>
          </div>

          <div onPointerMove={tilt} onPointerLeave={settle} className="gt-panel relative overflow-hidden rounded-xl border border-white/10 bg-[#101216]/80 p-8 backdrop-blur-sm md:p-10">
            <span key={`g${index}`} aria-hidden="true" className="gt-ghost pointer-events-none absolute -right-2 -top-6 select-none text-[9rem] font-black leading-none text-white/[0.05] md:text-[13rem]">
              0{index + 1}
            </span>
            <div key={tool.name} id="gmbte-panel" role="tabpanel" aria-labelledby={`gmbte-tab-${index}`} className="panel-in relative min-h-[170px]">
              <span className="inline-flex h-6 items-center rounded-full bg-[#E97868] px-3 text-xs font-medium text-[#161415]">{tool.stage}</span>
              <h3 className="mt-6 text-2xl font-black tracking-tight md:text-4xl">{tool.name}</h3>
              <p className="mt-4 max-w-[480px] text-base leading-snug text-white/75 md:text-lg">{tool.text}</p>
            </div>
            <ol aria-hidden="true" className="relative mt-8 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em]">
              {tools.map((item, n) => (
                <li key={item.name} className={`transition-colors duration-500 ${n <= index ? "text-[#E97868]" : "text-white/30"}`}>
                  {item.stage}
                  {n < tools.length - 1 && <span className="ml-2 text-white/25">→</span>}
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setIndex((index + 1) % tools.length)}
              className="relative mt-6 text-sm font-medium text-white/80 underline decoration-[#E97868] underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
            >
              Next: {next.name}
            </button>
          </div>
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">Also inside the membership</p>
        <div ref={extrasRef} onPointerMove={track} className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-12">
          {extras.map((item) => (
            <article
              key={item.title}
              data-spot
              className={`spot-card flex min-h-44 flex-col justify-between rounded-md p-6 md:min-h-52 ${item.span} ${
                item.red ? "bg-[#B04333] text-white" : "border border-white/10 bg-[#101216]/80 text-[#FAFAF9] backdrop-blur-sm"
              }`}
            >
              <span className={`text-[11px] font-medium uppercase tracking-[0.18em] ${item.red ? "text-white/75" : "text-[#E97868]"}`}>{item.group}</span>
              <div>
                <h3 className="text-xl font-bold leading-tight md:text-2xl">{item.title}</h3>
                <p className={`mt-2 max-w-[34ch] text-sm leading-snug ${item.red ? "text-white/85" : "text-[#FAFAF9]/65"}`}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/contact" variant="primary" size="large">
            Get access <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>

      <div className="marquee mt-14 text-sm font-medium text-white/45" aria-hidden="true">
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
