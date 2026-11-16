"use client";

import WakeList from "../ui/WakeList";

type Reason = {
  label: string;
  claim: string;
  points: string[];
};

const reasons: Reason[] = [
  {
    label: "Technology",
    claim: "Platforms built for the community, not borrowed from it.",
    points: [
      "Black Tech Expo brings members, mentors and partners onto one platform",
      "AI agents and business tools sit in the same place as the community",
      "Digital products and programmes are designed and run by our own team",
    ],
  },
  {
    label: "Innovation",
    claim: "Ideas get tested, shaped and taken further.",
    points: [
      "Turn a rough direction into a business concept you can question and refine",
      "Pitch decks, proposals and business plans drafted with AI, ready to edit",
      "Programmes that give new ideas a real place to be tried",
    ],
  },
  {
    label: "Skills",
    claim: "Learning and career support that follows the member.",
    points: [
      "Academy courses with certificates at the end",
      "Career paths, CV building and interview preparation",
      "Fellowship and mentoring for the next step up",
    ],
  },
  {
    label: "Enterprise",
    claim: "Practical help for founders and organisations.",
    points: [
      "Business planning, proposals and investor decks",
      "Grant writing and funding opportunities in one view",
      "Introductions to partners, investors and public bodies",
    ],
  },
  {
    label: "AI",
    claim: "AI agents that guide members through the platform.",
    points: [
      "More than a dozen agents covering careers, founders, fellowships and funding",
      "Tools for research, proposals, grants and investor decks",
      "Guidance on privacy, security and responsible AI built in",
    ],
  },
  {
    label: "Web3",
    claim: "Verifiable achievements and trusted digital identity.",
    points: [
      "A talent passport that keeps achievements and evidence together",
      "Privacy, security and compliance handled from the start",
      "Hall of Fame records that last",
    ],
  },
  {
    label: "Research",
    claim: "Evidence about Black-owned business and talent.",
    points: [
      "The Black Business Intelligence Index, starting with Greater Manchester",
      "Surveys, polls and research projects members can join",
      "Reports and insights shared with partners",
    ],
  },
  {
    label: "Community",
    claim: "People who open doors for each other.",
    points: [
      "Mentors you can book and groups you can join",
      "Events and programmes across the UK, with Nigeria and Ireland next",
      "A network of founders, students, professionals and partners",
    ],
  },
];

export default function WhyWorkWithUs() {
  const items = reasons.map((reason) => ({
    key: reason.label,
    title: reason.label,
    text: reason.claim,
    extra: (
      <ul className="mt-4 max-w-[52ch] space-y-2 text-sm leading-relaxed text-[#FAFAF9]/55 sm:text-base">
        {reason.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#E97868]" />
            {point}
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <div className="mt-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#E97868]">Why work with us</p>
        <p className="mt-5 max-w-[22ch] text-2xl font-extralight leading-snug tracking-wide text-[#FAFAF9]/80 md:text-3xl">
          Eight things we build, run and stand behind.
        </p>
      </div>
      <WakeList items={items} size="small" />
    </div>
  );
}
