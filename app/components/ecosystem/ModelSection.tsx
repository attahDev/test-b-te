"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionLabel from "../ui/SectionLabel";

// How far below its final position the staircase starts (fully off-screen)
const START_OFFSET_SVH = 80;
// Fraction of the scroll that drives the slide; the rest is a short "rest" at the end
const REVEAL_END = 0.85;

export default function ModelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotion.matches) return;

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollDistance = section.offsetHeight - window.innerHeight;
      const nextProgress =
        scrollDistance > 0
          ? Math.min(
              1,
              Math.max(
                0,
                -section.getBoundingClientRect().top / scrollDistance,
              ),
            )
          : 1;
      setProgress(nextProgress);
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // 0 -> 1 over the first 85% of the scroll, then holds at 1
  const reveal = Math.min(1, progress / REVEAL_END);
  const offset = (1 - reveal) * START_OFFSET_SVH;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ecosystem-model-title"
      className="relative h-[210svh] overflow-clip bg-[#08090d] motion-reduce:h-svh"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-[#08090d] text-white">
        <Image
          src="/homepage/architectural-background.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-55"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/55"
        />
        <Image
          src="/ecosystem/dots.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-35 mix-blend-screen"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 42% 58%, transparent 15%, rgba(8,9,13,.35) 60%, #08090d 100%)",
          }}
        />
       

        <div className="relative mx-auto h-full w-full max-w-[1440px] px-6 pt-[8svh] sm:px-10 lg:px-16">
          <div className="relative z-10">
            <SectionLabel className="mb-5">Our Model</SectionLabel>
            <h2
              id="ecosystem-model-title"
              className="max-w-[620px] text-4xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-6xl"
            >
              From Community
              <br />
              to Capacity
            </h2>
          </div>
        </div>

        {/* Outer wrapper: positioning + centering (never animated) */}
        <div className="pointer-events-none absolute inset-x-0 top-[27%] flex justify-center">
          {/* Inner wrapper: slides up from below as you scroll */}
          <div
            className="w-[min(700px,85vw)] [transform:translate3d(0,var(--ty),0)] motion-reduce:[transform:none] sm:w-[min(720px,56vw)]"
            style={
              {
                "--ty": `${offset}svh`,
                willChange: "transform",
              } as React.CSSProperties
            }
          >
            <Image
              src="/ecosystem/staircase.png"
              alt="Seven-step model: Community, Access, Skills, Technology, Enterprise, Investment, and Ownership"
              width={550}
              height={420}
              sizes="(max-width: 540px) 92vw, 56vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
