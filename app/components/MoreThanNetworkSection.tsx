"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: "/homepage/intellectual-property.png",
    title: "Intellectual Property",
    tone: "blue",
  },
  {
    icon: "/homepage/digital-infrastructure.svg",
    title: "Digital Infrastructure",
    tone: "dark",
  },
  {
    icon: "/homepage/community-infrastructure.svg",
    title: "Community Infrastructure",
    tone: "light",
  },
  {
    icon: "/homepage/partnership-infrastructure.svg",
    title: "Partnership Infrastructure",
    tone: "blue",
  },
  {
    icon: "/homepage/recognition-infrastructure.svg",
    title: "Recognition Infrastructure",
    tone: "dark",
  },
  {
    icon: "/homepage/knowledge-infrastructure.svg",
    title: "Knowledge Infrastructure",
    tone: "light",
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

    const cards = Array.from(
      carousel.querySelectorAll<HTMLElement>("[data-carousel-card]"),
    );
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const currentPosition = carousel.scrollLeft;
    const carouselLeft = carousel.getBoundingClientRect().left;
    const positions = cards.map((card) =>
      Math.min(maxScrollLeft, card.getBoundingClientRect().left - carouselLeft + currentPosition),
    );
    const nextIndex =
      direction === 1
        ? positions.findIndex((position) => position > currentPosition + 8)
        : positions.findLastIndex((position) => position < currentPosition - 8);
    const targetCard = cards[nextIndex];
    const endGutter = Number.parseFloat(getComputedStyle(carousel).paddingRight) || 0;
    const finalCard = cards[cards.length - 1];
    const finalCardRight = finalCard.getBoundingClientRect().right - carouselLeft + currentPosition;
    const nextPosition = positions[nextIndex] ?? maxScrollLeft;
    const target =
      !targetCard || nextIndex === cards.length - 1 ||
      (direction === 1 && finalCardRight - (nextPosition + carousel.clientWidth) <= endGutter)
        ? direction === 1
          ? maxScrollLeft
          : 0
        : positions[nextIndex];

    carousel.scrollTo({
      left: target,
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
          <h2 className="text-[36px] font-black leading-[0.98] tracking-[0.025em] text-[#333333] md:text-[48px]">
            <span className="relative mx-auto block w-fit pb-3">
              MORE THAN A
              <Image
                src="/homepage/red-underline.png"
                alt=""
                aria-hidden="true"
                width={100}
                height={24}
                className="absolute bottom-0 left-[3%] h-3 w-[40%] object-fill"
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
          className="flex w-full snap-x snap-mandatory gap-7 overflow-x-auto pb-2 pr-[clamp(48px,6.7vw,100px)] [scroll-padding-right:clamp(48px,6.7vw,100px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={updateScrollControls}
        >
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              data-carousel-card
              className={`flex h-[334px] w-[248px] shrink-0 ${index === pillars.length - 1 ? "snap-end" : "snap-start"} flex-col px-[19px] pb-[18px] pt-6 ${
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
