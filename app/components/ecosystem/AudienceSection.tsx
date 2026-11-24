"use client";

// Pinned "Who we work with" stage: audience list on the left, image that swaps as you scroll on the right
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

const audiences = [
  { number: "01", image: "/art/savanna-sunset.webp", label: "Government & Public Sector", text: "We help public bodies and agencies connect with Black-led technology talent, run programmes with local communities, and turn policy goals into projects people can see." },
  { number: "02", image: "/art/misty-mountains.webp", label: "University & Education", text: "Universities and colleges partner with us on learning areas, mentoring and placements that carry students from the classroom into real technology careers." },
  { number: "03", image: "/art/wireframe-terrain.webp", label: "Technology Companies", text: "Technology companies find early talent, test products with real communities and build partnerships that open up new markets and new hires." },
  { number: "04", image: "/art/dusk-clouds.webp", label: "Investor & Funders", text: "Investors and funders get a clear route to founders and community projects with real traction, backed by the support structures that help them grow." },
  { number: "05", image: "/art/orbital-rings.webp", label: "Corporate", text: "Corporate partners work with us on supplier diversity, skills pipelines and sponsorship that reaches communities they have struggled to reach alone." },
  { number: "06", image: "/art/fireflies.webp", label: "Startups & Founders", text: "Startups and founders get mentoring, tools and introductions, from first idea to first customer, alongside people who have done it before." },
  { number: "07", image: "/art/mudcloth.webp", label: "Community Organisations", text: "Community organisations bring local reach and trust; we bring programmes, tools and a wider network, so good work travels further." },
  { number: "08", image: "/art/desert-dunes.webp", label: "Ecosystems & International Partners", text: "International partners and ecosystems link with us to share knowledge, exchange talent and build bridges between Black tech communities across regions." },
];

export default function AudienceSection() {
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
    <section aria-labelledby="audience-title" className="relative text-white">
      <div ref={track} className="relative lg:h-[560svh] motion-reduce:lg:h-auto">
        <div className="relative isolate overflow-hidden px-6 pb-16 pt-28 md:px-16 lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:py-0 motion-reduce:lg:static motion-reduce:lg:h-auto motion-reduce:lg:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[#0b090d]">
            {audiences.map((audience, index) => (
              <Image
                key={audience.number}
                src={audience.image}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className={`object-cover object-[75%_center] transition-all duration-[1100ms] ease-out ${index === active ? "scale-100 opacity-70" : "scale-110 opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,9,13,0.92),rgba(11,9,13,0.55)_45%,rgba(11,9,13,0.15))] max-lg:bg-[#0b090d]/70" />
            <div className="absolute inset-0 [background:linear-gradient(to_bottom,#0b090d,transparent_14%,transparent_86%,#0b090d)]" />
          </div>

          <div className="mx-auto grid w-full max-w-[1300px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">Our partners</p>
              <h2 id="audience-title" className="mt-4 text-[clamp(1.5rem,2.6vw,2.3rem)] font-extralight uppercase leading-[1.15] tracking-[0.16em]">
                Who we work with
              </h2>

              <ul className="mt-8 hidden flex-col lg:flex">
                {audiences.map((audience, index) => (
                  <li key={audience.number}>
                    <button
                      type="button"
                      onClick={() => jump(index)}
                      aria-current={index === active}
                      className={`group flex w-full items-center gap-5 py-1.5 text-left text-[12px] uppercase tracking-[0.2em] transition-colors duration-500 ${index === active ? "text-[#FAFAF9]" : "text-white/35 hover:text-white/65"}`}
                    >
                      <span className={`block h-px transition-all duration-500 ${index === active ? "w-14 bg-[#E97868]" : "w-6 bg-white/25"}`} />
                      <span className="w-6 text-[11px] tabular-nums">{audience.number}</span>
                      {audience.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <Button variant="secondarySubtle" href="/contact" size="large">
                  Work with BTE <span className="text-xs">↗</span>
                </Button>
              </div>
            </div>

            <div className="relative hidden min-h-[320px] lg:block">
              {audiences.map((audience, index) => (
                <div
                  key={audience.number}
                  aria-hidden={index !== active}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${index === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#E97868]">{audience.number} / 0{audiences.length}</p>
                  <h3 className="mt-4 max-w-[16ch] text-[clamp(1.3rem,2.2vw,2rem)] font-extralight uppercase leading-[1.1] tracking-[0.12em]">{audience.label}</h3>
                  <p className="mt-5 max-w-[42ch] text-base font-extralight leading-relaxed tracking-wide text-[#FAFAF9]/80">{audience.text}</p>
                </div>
              ))}
            </div>

            <ul className="flex flex-col gap-4 lg:hidden">
              {audiences.map((audience) => (
                <li key={audience.number} className="relative flex min-h-[170px] items-end overflow-hidden rounded-[12px] border border-white/[0.08] p-5">
                  <Image src={audience.image} alt="" fill sizes="100vw" className="object-cover opacity-50" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b090d]/85 to-transparent" />
                  <div className="relative">
                    <p className="text-[13px] uppercase tracking-[0.2em]">
                      <span className="mr-4 text-[11px] text-[#E97868]">{audience.number}</span>
                      {audience.label}
                    </p>
                    <p className="mt-3 text-sm font-extralight leading-relaxed text-[#FAFAF9]/75">{audience.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
