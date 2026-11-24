import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "../ui/Reveal";

const pillars = [
  { icon: "/homepage/intellectual-property.png", title: "Intellectual Property", tile: "bg-[#DFEAF2]" },
  { icon: "/homepage/digital-infrastructure.svg", title: "Digital Infrastructure", tile: "bg-[#171516]" },
  { icon: "/homepage/community-infrastructure.svg", title: "Community Infrastructure", tile: "bg-[#F1F0EF]" },
  { icon: "/homepage/partnership-infrastructure.svg", title: "Partnership Infrastructure", tile: "bg-[#F1F0EF]" },
  { icon: "/homepage/recognition-infrastructure.svg", title: "Recognition Infrastructure", tile: "bg-[#DFEAF2]" },
  { icon: "/homepage/knowledge-infrastructure.svg", title: "Knowledge Infrastructure", tile: "bg-[#171516]" },
];

export default function MoreThanNetworkSection() {
  return (
    <section id="network" className="relative overflow-hidden px-0 py-20 text-[#FAFAF9] md:py-28">
      <Reveal
        threshold={0.15}
        className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 md:px-12 lg:grid-cols-[36%_1fr] lg:gap-14"
      >
        <header className="lg:sticky lg:top-28 lg:self-start">
          <p className="net-fade mb-5 flex items-center gap-3 text-base">
            <span aria-hidden="true" className="h-px w-8 bg-[#B04333]" />
            What we build on
          </p>
          <h2 className="net-fade text-[32px] font-extralight uppercase leading-[1.1] tracking-[0.08em] text-[#FAFAF9] md:text-[38px] lg:text-[36px] xl:text-[38px]">
            <span className="relative block w-fit whitespace-nowrap pb-3">
              MORE THAN A
              <Image
                src="/homepage/red-underline.png"
                alt=""
                aria-hidden="true"
                width={100}
                height={24}
                className="net-underline absolute bottom-0 left-[3%] h-3 w-[40%] object-fill"
              />
            </span>
            <span className="block">NETWORK.</span>
          </h2>
          <p className="net-fade mt-5 max-w-[340px] text-base font-medium leading-snug text-[#FAFAF9]/60" style={{ "--i": 1 } as CSSProperties}>
            Six layers of infrastructure that turn connections into lasting opportunity.
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-3">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              style={{ "--i": index } as CSSProperties}
              className="net-card group relative flex flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm md:p-4"
            >
              <span className="net-num font-mono text-xs tracking-[0.2em] text-[#FAFAF9]/45">0{index + 1}</span>
              <div className={`net-icon mt-3 flex aspect-[4/3] items-center justify-center rounded-[12px] p-4 ${pillar.tile}`}>
                <Image
                  src={pillar.icon}
                  alt=""
                  aria-hidden="true"
                  width={156}
                  height={156}
                  className="h-full max-h-[130px] w-auto max-w-full object-contain"
                />
              </div>
              <h3 className="net-title mt-4 text-base leading-[1.15] text-[#FAFAF9] md:text-lg">
                <span className="font-semibold">{pillar.title.split(" ")[0]}</span>
                <br />
                <span className="font-extralight tracking-[0.04em] text-[#FAFAF9]/75">{pillar.title.split(" ").slice(1).join(" ")}</span>
              </h3>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
