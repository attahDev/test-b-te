"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type KeyboardEvent } from "react";
import Reveal from "./ui/Reveal";

type Reason = {
  label: string;
  icon: string;
  claim: string;
  points: string[];
};

const reasons: Reason[] = [
  {
    label: "Technology",
    icon: "/homepage/technology-icon.png",
    claim: "Platforms built for the community, not borrowed from it.",
    points: [
      "GMBTE brings members, mentors and partners onto one platform",
      "AI agents and business tools sit in the same place as the community",
      "Digital products and programmes are designed and run by our own team",
    ],
  },
  {
    label: "Innovation",
    icon: "/homepage/innovation-icon.png",
    claim: "Ideas get tested, shaped and taken further.",
    points: [
      "Turn a rough direction into a business concept you can question and refine",
      "Pitch decks, proposals and business plans drafted with AI, ready to edit",
      "Programmes that give new ideas a real place to be tried",
    ],
  },
  {
    label: "Skills",
    icon: "/homepage/skills-icon.png",
    claim: "Learning and career support that follows the member.",
    points: [
      "Academy courses with certificates at the end",
      "Career paths, CV building and interview preparation",
      "Fellowship and mentoring for the next step up",
    ],
  },
  {
    label: "Enterprise",
    icon: "/homepage/enterprise-icon.png",
    claim: "Practical help for founders and organisations.",
    points: [
      "Business planning, proposals and investor decks",
      "Grant writing and funding opportunities in one view",
      "Introductions to partners, investors and public bodies",
    ],
  },
  {
    label: "AI",
    icon: "/homepage/ai-icon.png",
    claim: "AI agents that guide members through the platform.",
    points: [
      "More than a dozen agents covering careers, founders, fellowships and funding",
      "Tools for research, proposals, grants and investor decks",
      "Guidance on privacy, security and responsible AI built in",
    ],
  },
  {
    label: "Web3",
    icon: "/homepage/web3-icon.png",
    claim: "Verifiable achievements and trusted digital identity.",
    points: [
      "A talent passport that keeps achievements and evidence together",
      "Privacy, security and compliance handled from the start",
      "Hall of Fame records that last",
    ],
  },
  {
    label: "Research",
    icon: "/homepage/research-icon.png",
    claim: "Evidence about Black-owned business and talent.",
    points: [
      "The Black Business Intelligence Index, starting with Greater Manchester",
      "Surveys, polls and research projects members can join",
      "Reports and insights shared with partners",
    ],
  },
  {
    label: "Community",
    icon: "/homepage/community-icon.png",
    claim: "People who open doors for each other.",
    points: [
      "Mentors you can book and groups you can join",
      "Events and programmes across the UK, with Nigeria and Ireland next",
      "A network of founders, students, professionals and partners",
    ],
  },
];

export default function WhyWorkWithUs() {
  const [selected, setSelected] = useState(0);
  const reason = reasons[selected];

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (selected + step + reasons.length) % reasons.length;
    setSelected(nextIndex);
    document.getElementById(`reason-tab-${nextIndex}`)?.focus();
  }

  return (
    <Reveal className="mt-20" threshold={0.35}>
      <p className="who-fade mb-7 flex items-center gap-3 text-base">
        <span aria-hidden="true" className="h-px w-8 bg-[#B04333]" />
        Why Work With Us?
      </p>

      <div className="relative">
        <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-7 z-0 hidden h-px bg-[#161415]/12 lg:block">
          <span className="who-line block h-full w-full bg-[#B04333]/70" />
        </div>
        <ul role="tablist" aria-label="Why work with us" onKeyDown={onKeyDown} className="relative z-10 grid grid-cols-4 gap-x-2 gap-y-7 lg:grid-cols-8">
          {reasons.map((item, index) => (
            <li key={item.label} role="presentation" className="who-cat" style={{ "--i": index } as CSSProperties}>
              <button
                type="button"
                role="tab"
                id={`reason-tab-${index}`}
                aria-selected={index === selected}
                aria-controls="reason-panel"
                tabIndex={index === selected ? 0 : -1}
                onClick={() => setSelected(index)}
                className="flex w-full flex-col items-center gap-3 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B04333]"
              >
                <span className="who-cat-icon">
                  <span className="who-cat-ring relative grid h-14 w-14 place-items-center rounded-full bg-[#FAFAF9]">
                    <Image src={item.icon} alt="" aria-hidden="true" width={64} height={64} className="h-9 w-9 object-contain" />
                  </span>
                </span>
                <span className="who-cat-label text-[13px] font-semibold leading-tight sm:text-base md:text-lg">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        id="reason-panel"
        role="tabpanel"
        aria-labelledby={`reason-tab-${selected}`}
        className="who-fade mt-10 rounded-2xl border border-[#161415]/10 bg-white p-6 shadow-[0_10px_30px_rgb(0_0_0/0.05)] md:p-8"
        style={{ "--d": 200 } as CSSProperties}
      >
        <div key={reason.label} className="panel-in grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#B04333]">
              {String(selected + 1).padStart(2, "0")} / {String(reasons.length).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{reason.label}</h3>
            <p className="mt-3 max-w-[420px] text-lg leading-snug text-[#252323] md:text-xl">{reason.claim}</p>
            <Link
              href="/ecosystem"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#B04333] underline decoration-[#B04333]/40 underline-offset-4 transition-colors hover:text-[#8f3326] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B04333]"
            >
              See the ecosystem <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ol className="flex flex-col">
            {reason.points.map((point, index) => (
              <li key={point} className="flex gap-4 border-t border-[#161415]/10 py-4 first:border-t-0 first:pt-0 last:pb-0">
                <span className="font-mono text-sm text-[#B04333]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-base leading-snug text-[#252323]">{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}
