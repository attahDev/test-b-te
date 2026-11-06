"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: "/homepage/Frame 427319145 (1).png",
    title: "Intellectual Property",
    tone: "blue",
  },
  {
    icon: "/homepage/Frame 427319146.svg",
    title: "Digital Infrastructure",
    tone: "dark",
  },
  {
    icon: "/homepage/Frame 427319121.svg",
    title: "Community Infrastructure",
    tone: "light",
  },
  {
    icon: "/homepage/Frame 427319145.svg",
    title: "Partnership Infrastructure",
    tone: "blue",
  },
  {
    icon: "/homepage/Research — insight from evidence.png",
    title: "Research Infrastructure",
    tone: "dark",
  },
];

export default function MoreThanNetworkSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollBackward, setCanScrollBackward] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  function updateScrollControls() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setCanScrollBackward(carousel.scrollLeft > 1);
    setCanScrollForward(
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
    );
  }

  function scrollCards(direction: -1 | 1) {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>("[data-carousel-card]");
    if (!carousel || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    updateScrollControls();
    const resizeObserver = new ResizeObserver(updateScrollControls);
    resizeObserver.observe(carousel);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className="overflow-hidden bg-[#FAFAF9] pb-16 pt-20 text-[#161415] md:pb-16 md:pt-[88px]">
      <div className="mx-auto w-full max-w-[1400px] pl-[clamp(24px,6.7vw,100px)]">
        <header className="mb-[60px] mr-6 text-center md:mb-[64px]">
          <h2 className="text-[36px] font-black leading-[0.98] tracking-[-0.045em] text-[#333333] md:text-[48px]">
            <span className="relative mx-auto block w-fit pb-2">
              MORE THAN A
              <Image
                src="/homepage/Vector 18.png"
                alt=""
                aria-hidden="true"
                width={180}
                height={24}
                className="absolute bottom-0 left-1/2 h-3 w-[46%] -translate-x-1/2 object-fill"
              />
            </span>
            <span className="block">NETWORK.</span>
          </h2>
          <p className="mt-4 text-sm font-medium text-[#777777] md:mt-3">
            Get the one you think fits best for you and your team.
          </p>
        </header>

        <div
          ref={carouselRef}
          aria-label="More than a network cards"
          className="flex w-[calc(100%+clamp(24px,6.7vw,100px))] snap-x snap-mandatory gap-7 overflow-x-auto pb-2 pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={updateScrollControls}
        >
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              data-carousel-card
              className={`flex h-[334px] w-[248px] shrink-0 snap-start flex-col px-[19px] pb-[18px] pt-6 ${
                pillar.tone === "dark"
                  ? "bg-[#171516] text-[#FAFAF9]"
                  : pillar.tone === "light"
                    ? "bg-[#F1F0EF] text-[#171516]"
                    : "bg-[#DFEAF2] text-[#171516]"
              }`}
            >
              <div className="flex h-[218px] shrink-0 items-center justify-center">
                <Image
                  src={pillar.icon}
                  alt=""
                  aria-hidden="true"
                  width={156}
                  height={156}
                  className="h-[148px] w-[148px] object-contain"
                />
              </div>
              <h3 className="mt-auto text-[20px] leading-[1.14]">
                <span className="font-bold">{pillar.title.split(" ")[0]}</span>
                <br />
                <span>{pillar.title.split(" ").slice(1).join(" ")}</span>
              </h3>
            </article>
          ))}
        </div>

        <div className="mt-7 mr-6 flex gap-4">
          <button
            type="button"
            aria-label="Show previous cards"
            disabled={!canScrollBackward}
            onClick={() => scrollCards(-1)}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#171516]/40 text-[21px] leading-none text-[#171516] transition-colors hover:bg-[#171516] hover:text-white disabled:cursor-default disabled:text-[#171516]/40 disabled:hover:bg-transparent disabled:hover:text-[#171516]/40"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Show next cards"
            disabled={!canScrollForward}
            onClick={() => scrollCards(1)}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#171516]/70 text-[21px] leading-none text-[#171516] transition-colors hover:bg-[#171516] hover:text-white disabled:cursor-default disabled:text-[#171516]/40 disabled:hover:bg-transparent disabled:hover:text-[#171516]/40"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
