"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

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
  const track = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trackNode = track.current;
    const stripNode = strip.current;
    if (!trackNode || !stripNode) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(stripNode.children) as HTMLElement[];
    let travel = 0;
    let frame = 0;

    const measure = () => {
      travel = Math.max(0, stripNode.scrollWidth - window.innerWidth);
      trackNode.style.height = `${travel + window.innerHeight}px`;
    };

    const update = () => {
      frame = 0;
      const top = trackNode.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, -top / Math.max(1, travel)));
      stripNode.style.transform = `translate3d(${(-progress * travel).toFixed(1)}px, 0, 0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      if (backdrop.current) backdrop.current.style.transform = `translate3d(${(-progress * 9).toFixed(2)}%, 0, 0)`;
      const middle = window.innerWidth / 2;
      let nearest = 0;
      let nearestGap = Infinity;
      cards.forEach((card, index) => {
        const box = card.getBoundingClientRect();
        const gap = Math.abs(box.left + box.width / 2 - middle);
        card.style.setProperty("--k", Math.max(0, 1 - gap / (window.innerWidth * 0.5)).toFixed(3));
        if (gap < nearestGap) {
          nearestGap = gap;
          nearest = index;
        }
      });
      if (counter.current) counter.current.textContent = `0${nearest + 1} / 0${cards.length}`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={track} className="relative motion-reduce:h-auto">
      <div className="sticky top-0 isolate flex h-svh flex-col justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]">
          <div ref={backdrop} className="absolute -inset-x-[10%] inset-y-0 bg-cover bg-center opacity-[0.16]" style={{ backgroundImage: "url(/art/contours.svg)" }} />
        </div>

        <div className="flex items-end justify-between gap-6 px-6 pt-20 md:px-16 md:pt-24">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#E97868]">Why work with us</p>
            <p className="mt-4 max-w-[24ch] text-xl font-extralight leading-snug tracking-wide text-[#FAFAF9]/80 md:text-3xl">
              Eight things we build, run and stand behind.
            </p>
          </div>
          <span ref={counter} aria-hidden="true" className="hidden text-[11px] uppercase tracking-[0.3em] text-[#FAFAF9]/50 motion-reduce:hidden sm:block">
            01 / 0{reasons.length}
          </span>
        </div>

        <div className="mx-6 mt-6 h-px bg-white/10 md:mx-16 motion-reduce:hidden" aria-hidden="true">
          <span ref={bar} className="block h-full origin-left bg-[#E97868]" style={{ transform: "scaleX(0)" }} />
        </div>

        <div
          ref={strip}
          className="mt-8 flex w-max gap-5 px-6 will-change-transform md:mt-10 md:gap-7 md:px-16 motion-reduce:w-full motion-reduce:snap-x motion-reduce:overflow-x-auto"
        >
          {reasons.map((reason, index) => (
            <article
              key={reason.label}
              style={{ "--k": index === 0 ? 1 : 0.2 } as CSSProperties}
              className="why-card flex h-[min(58svh,520px)] w-[min(80vw,400px)] shrink-0 flex-col rounded-[14px] border border-white/10 bg-[#0b1224]/60 p-6 backdrop-blur-md md:p-8 motion-reduce:snap-start"
            >
              <span className="text-[56px] font-extralight leading-none tracking-[0.04em] text-[#E97868]/90 md:text-[72px]">0{index + 1}</span>
              <h3 className="mt-5 text-2xl font-extralight uppercase tracking-[0.12em] text-[#FAFAF9] md:text-3xl">{reason.label}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-[#FAFAF9]/80 md:text-base">{reason.claim}</p>
              <ul className="mt-auto space-y-2.5 text-[13px] leading-relaxed text-[#FAFAF9]/55 md:text-sm">
                {reason.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#E97868]" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
