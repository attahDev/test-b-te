"use client";

import { useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import Aurora from "../Aurora";
import Button from "../ui/Button";
import SectionLabel from "../ui/SectionLabel";

type Tool = { name: string; text?: string; parts?: string[] };
type Group = { id: string; label: string; upcoming?: boolean; tools: Tool[] };

const groups: Group[] = [
  {
    id: "ai",
    label: "AI and Business Tools",
    tools: [
      { name: "Market Research", text: "Industry and market findings for the idea, written for a founder rather than an analyst." },
      { name: "Pitch Deck", text: "Builds a themed investor deck from the idea and research, slide by slide." },
      { name: "Proposal Builder", text: "Drafts client and funding proposals from a short brief, ready to edit." },
      { name: "Idea Generator", text: "Turns a rough direction into a business concept you can look at, question and refine.", parts: ["Idea Engine"] },
      { name: "Brand Identity", text: "Logos and brand documents, exported as multi-page PDFs." },
      { name: "CV Builder", text: "AI-written CVs with ATS scoring and tailoring for each role, linked to the member's Skills Passport and matched opportunities." },
      { name: "Business Planner", text: "A structured plan with a roadmap to work through.", parts: ["Business Studio"] },
      { name: "Mentor AI" },
      { name: "Grant Writer" },
      { name: "Green Impact", parts: ["Green AI Advisor"] },
      { name: "Hall of Fame AI" },
      { name: "General Chatbot" },
      { name: "Career Intelligence", parts: ["Readiness", "Interview Prep", "Cover Letter"] },
    ],
  },
  {
    id: "learning",
    label: "Learning and Careers",
    tools: [
      { name: "Academy and Courses", parts: ["Enrollment", "Azure Learn", "Certificates"] },
      { name: "Career Paths" },
      { name: "Career Portfolio" },
      { name: "Career Mobility Analytics" },
      { name: "Opportunities", parts: ["Assistant", "Opportunity Insights"] },
    ],
  },
  {
    id: "community",
    label: "Community and Mentorship",
    tools: [
      { name: "Mentors", text: "Guidance from mentors, with sessions you can book.", parts: ["Find", "Groups", "Project Reviews", "Mentor Application"] },
      { name: "Community" },
      { name: "Network" },
      { name: "Events", text: "BTE events and programmes in one place.", parts: ["My Events", "Shareable event pages"] },
      { name: "Newsletter" },
      { name: "Video Conferencing" },
    ],
  },
  {
    id: "upcoming",
    label: "Upcoming",
    upcoming: true,
    tools: [{ name: "Financial Forecast" }, { name: "Investor Readiness" }, { name: "Business Model Canvas" }],
  },
];

const names = groups.flatMap((group) => group.tools.map((tool) => tool.name));

export default function GmbteToolsSection() {
  const [groupId, setGroupId] = useState(groups[0].id);
  const [index, setIndex] = useState(0);
  const group = groups.find((item) => item.id === groupId) ?? groups[0];
  const count = group.tools.length;
  const tool = group.tools[index];
  const next = group.tools[(index + 1) % count];

  function choose(id: string) {
    setGroupId(id);
    setIndex(0);
  }

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

  function spot(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
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
        <SectionLabel className="mb-5">GMBTE Platform</SectionLabel>
        <h2 id="gmbte-tools-title" className="max-w-[640px] text-3xl font-black leading-[1.02] tracking-tight md:text-5xl">
          What members can use
        </h2>
        <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/70 md:text-base">
          Every tool inside the GMBTE platform, grouped by what you need it for.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Tool groups">
          {groups.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === groupId}
              onClick={() => choose(item.id)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868] md:text-sm ${
                item.id === groupId
                  ? "border-[#E97868] bg-[#E97868] text-[#161415]"
                  : "border-white/20 text-white/80 hover:border-[#E97868] hover:text-white"
              }`}
            >
              {item.label}
              <span className="ml-2 font-mono text-[11px] opacity-70">{item.tools.length}</span>
            </button>
          ))}
        </div>

        <div
          className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,380px)_1fr]"
        >
          <div className="relative pl-7">
            <span aria-hidden="true" className="absolute bottom-3 left-[3px] top-3 w-px bg-white/15" />
            <span
              aria-hidden="true"
              style={{ "--p": index / Math.max(count - 1, 1) } as CSSProperties}
              className="gt-rail absolute bottom-3 left-[3px] top-3 w-px bg-[#E97868]"
            />
            <div role="tablist" aria-label={group.label} className="flex flex-col">
              {group.tools.map((item, n) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  id={`gmbte-tab-${n}`}
                  aria-selected={n === index}
                  aria-controls="gmbte-panel"
                  onClick={() => setIndex(n)}
                  onPointerEnter={(event) => event.pointerType === "mouse" && setIndex(n)}
                  className={`relative flex w-full items-center justify-between border-b border-white/10 py-3 text-left text-lg font-bold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868] md:text-xl ${
                    n === index ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  <span aria-hidden="true" className={`absolute -left-7 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full transition-all duration-500 ${n === index ? "scale-[1.7] bg-white shadow-[0_0_0_4px_rgb(233_120_104/0.35)]" : n < index ? "bg-[#E97868]" : "bg-white/25"}`} />
                  <span>
                    <span className="mr-4 font-mono text-xs text-[#E97868]">{String(n + 1).padStart(2, "0")}</span>
                    {item.name}
                  </span>
                  <span aria-hidden="true" className={`transition-all duration-300 ${n === index ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>→</span>
                  {n === index && <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full bg-[#E97868]" />}
                </button>
              ))}
            </div>
          </div>

          <div onPointerMove={tilt} onPointerLeave={settle} className="gt-panel relative overflow-hidden rounded-xl border border-white/10 bg-[#101216]/80 p-8 backdrop-blur-sm md:p-10 lg:sticky lg:top-24">
            <span key={`g${groupId}${index}`} aria-hidden="true" className="gt-ghost pointer-events-none absolute -right-2 -top-6 select-none text-[9rem] font-black leading-none text-white/[0.05] md:text-[13rem]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div key={`${groupId}${tool.name}`} id="gmbte-panel" role="tabpanel" aria-labelledby={`gmbte-tab-${index}`} className="panel-in relative min-h-[200px]">
              <span className={`inline-flex h-6 items-center rounded-full px-3 text-xs font-medium ${group.upcoming ? "border border-[#E97868] text-[#E97868]" : "bg-[#E97868] text-[#161415]"}`}>
                {group.upcoming ? "Upcoming" : group.label}
              </span>
              <h3 className="mt-6 text-2xl font-black tracking-tight md:text-4xl">{tool.name}</h3>
              {tool.text && <p className="mt-4 max-w-[480px] text-base leading-snug text-white/75 md:text-lg">{tool.text}</p>}
              {tool.parts && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {tool.parts.map((part) => (
                    <li key={part} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/85">{part}</li>
                  ))}
                </ul>
              )}
            </div>
            <p aria-hidden="true" className="relative mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} · {group.label}
            </p>
            <button
              type="button"
              onClick={() => setIndex((index + 1) % count)}
              className="relative mt-4 text-sm font-medium text-white/80 underline decoration-[#E97868] underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E97868]"
            >
              Next: {next.name}
            </button>
          </div>
        </div>

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
            {names.map((name) => (
              <span key={name} className="flex-none whitespace-nowrap">{name}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
