"use client";

// Pinned "Who we work with" stage: audience list on the left, image that swaps as you scroll on the right
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Backdrop from "@/app/components/ui/Backdrop";
import Button from "../ui/Button";

const audiences = [
  { number: "01", image: "/art/savanna-sunset.webp", label: "Government & Public Sector" },
  { number: "02", image: "/art/misty-mountains.webp", label: "University & Education" },
  { number: "03", image: "/art/wireframe-terrain.webp", label: "Technology Companies" },
  { number: "04", image: "/art/dusk-clouds.webp", label: "Investor & Funders" },
  { number: "05", image: "/art/orbital-rings.webp", label: "Corporate" },
  { number: "06", image: "/art/fireflies.webp", label: "Startups & Founders" },
  { number: "07", image: "/art/mudcloth.webp", label: "Community Organisations" },
  { number: "08", image: "/art/desert-dunes.webp", label: "Ecosystems & International Partners" },
];

export default function EcosystemHeroSection() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = track.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth < 1024) return;
      const box = node.getBoundingClientRect();
      const progress = -box.top / Math.max(1, box.height - window.innerHeight);
      setActive(Math.min(audiences.length - 1, Math.max(0, Math.floor(progress * audiences.length))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const jump = (index: number) => {
    const node = track.current;
    if (!node || window.innerWidth < 1024) return;
    const room = node.offsetHeight - window.innerHeight;
    window.scrollTo({ top: node.offsetTop + (room * (index + 0.5)) / audiences.length, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="ecosystem-hero-title" className="relative text-white">
      <div ref={track} className="relative lg:h-[560svh] motion-reduce:lg:h-auto">
        <div className="relative isolate overflow-hidden px-6 pb-16 pt-28 md:px-16 lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:py-0 motion-reduce:lg:static motion-reduce:lg:h-auto motion-reduce:lg:py-28">
          <Backdrop name="moonlit-sea" strength={1} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_38%,#08060a_92%)]" />

          <div className="mx-auto grid w-full max-w-[1300px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">Our ecosystem</p>
              <h1 id="ecosystem-hero-title" className="mt-5 text-[clamp(2.4rem,5.2vw,4.6rem)] font-extralight uppercase leading-[1.05] tracking-[0.12em]">
                Who we work with
              </h1>

              <ul className="mt-10 hidden flex-col gap-1 lg:flex">
                {audiences.map((audience, index) => (
                  <li key={audience.number}>
                    <button
                      type="button"
                      onClick={() => jump(index)}
                      aria-current={index === active}
                      className={`group flex w-full items-center gap-5 py-2 text-left text-[13px] uppercase tracking-[0.22em] transition-colors duration-500 ${index === active ? "text-[#FAFAF9]" : "text-white/35 hover:text-white/65"}`}
                    >
                      <span className={`block h-px transition-all duration-500 ${index === active ? "w-14 bg-[#E97868]" : "w-6 bg-white/25"}`} />
                      <span className="w-6 text-[11px] tabular-nums">{audience.number}</span>
                      {audience.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button variant="secondarySubtle" href="/contact" size="large">
                  Work with BTE <span className="text-xs">↗</span>
                </Button>
              </div>
            </div>

            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0d0b10] shadow-[0_30px_80px_rgba(0,0,0,0.7)] lg:block">
              {audiences.map((audience, index) => (
                <Image
                  key={audience.number}
                  src={audience.image}
                  alt=""
                  fill
                  sizes="45vw"
                  priority={index === 0}
                  className={`object-cover transition-all duration-[900ms] ease-out ${index === active ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                />
              ))}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b090d]/85 via-[#0b090d]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">{audiences[active].number} / 0{audiences.length}</p>
                <p className="max-w-[16ch] text-right text-2xl font-extralight uppercase leading-tight tracking-[0.14em]">{audiences[active].label}</p>
              </div>
            </div>

            <ul className="flex flex-col gap-4 lg:hidden">
              {audiences.map((audience) => (
                <li key={audience.number} className="relative flex h-[110px] items-end overflow-hidden rounded-[12px] border border-white/[0.08] p-5">
                  <Image src={audience.image} alt="" fill sizes="100vw" className="object-cover opacity-50" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b090d]/85 to-transparent" />
                  <p className="relative text-[13px] uppercase tracking-[0.2em]">
                    <span className="mr-4 text-[11px] text-[#E97868]">{audience.number}</span>
                    {audience.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
