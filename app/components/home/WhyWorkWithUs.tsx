"use client";

import { useEffect, useRef } from "react";

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

const icons: Record<string, string> = {
  Technology: "M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4",
  Innovation: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
  Skills: "M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5",
  Enterprise: "M3 8h18v11H3zM9 8V5h6v3M3 13h18",
  AI: "M12 3l2 5.5L19.5 10 14 12l-2 5.5L10 12l-5.5-2L10 8.5zM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z",
  Web3: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  Research: "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM15.5 15.5L21 21M8 12.5l2-2.5 1.8 1.5L14 9",
  Community: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.5 2.5 0 1 0 0-5M17.5 14c2.2.4 3.5 2.4 3.5 5",
};

export default function WhyWorkWithUs() {
  const track = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trackNode = track.current;
    const deckNode = deck.current;
    if (!trackNode || !deckNode) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(deckNode.children) as HTMLElement[];
    const count = cards.length;
    let frame = 0;

    const measure = () => {
      trackNode.style.height = `${window.innerHeight * (1 + (count - 1) * 0.62)}px`;
    };

    const update = () => {
      frame = 0;
      const room = trackNode.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -trackNode.getBoundingClientRect().top / Math.max(1, room)));
      const position = progress * (count - 1);
      cards.forEach((card, index) => {
        const gap = index - position;
        if (gap <= 0) {
          const peel = Math.min(1, -gap);
          card.style.transform = `translate3d(${(peel * -14).toFixed(2)}%, ${(peel * -62).toFixed(2)}%, 0) rotate(${(peel * -9).toFixed(2)}deg) scale(${(1 - peel * 0.04).toFixed(3)})`;
          card.style.opacity = String(Math.max(0, 1 - peel * 1.15).toFixed(3));
        } else {
          const depth = Math.min(gap, 4);
          card.style.transform = `translate3d(0, ${(depth * 15).toFixed(1)}px, 0) scale(${(1 - depth * 0.05).toFixed(3)})`;
          card.style.opacity = String(Math.max(0, 1 - Math.max(0, gap - 2.6) * 0.8).toFixed(3));
        }
        card.style.zIndex = String(count - index);
      });
      if (bar.current) bar.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      if (backdrop.current) backdrop.current.style.transform = `translate3d(${(-progress * 9).toFixed(2)}%, 0, 0)`;
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
    <div ref={track} className="relative">
      <div className="sticky top-0 isolate flex h-svh flex-col justify-center overflow-hidden px-6 pb-8 pt-24 md:px-16 motion-reduce:static motion-reduce:h-auto motion-reduce:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]">
          <div ref={backdrop} className="absolute -inset-x-[10%] inset-y-0 bg-cover bg-center opacity-[0.16]" style={{ backgroundImage: "url(/art/contours.svg)" }} />
        </div>

        <div className="mx-auto grid w-full max-w-[1300px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="max-w-[20ch] text-2xl font-extralight leading-snug tracking-wide text-[#FAFAF9]/80 md:text-4xl">
              Eight things we build, run and stand behind.
            </p>
            <div className="mt-8 hidden items-center gap-5 motion-reduce:hidden sm:flex" aria-hidden="true">
              <span className="block h-px w-40 bg-white/10">
                <span ref={bar} className="block h-full origin-left bg-[#E97868]" style={{ transform: "scaleX(0)" }} />
              </span>
            </div>
          </div>

          <div ref={deck} className="relative mx-auto h-[min(60svh,470px)] w-full max-w-[520px] motion-reduce:grid motion-reduce:h-auto motion-reduce:gap-5">
            {reasons.map((reason, index) => (
              <article
                key={reason.label}
                style={{ zIndex: reasons.length - index }}
                className="absolute inset-0 flex flex-col rounded-[16px] border border-white/15 bg-[#151118] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] will-change-transform md:p-8 motion-reduce:static motion-reduce:min-h-[340px]"
              >
                <div className="flex items-start justify-end">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10 text-[#E97868] md:h-12 md:w-12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icons[reason.label]} />
                  </svg>
                </div>
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
    </div>
  );
}
