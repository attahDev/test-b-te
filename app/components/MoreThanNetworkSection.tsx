// "More than a network": the six infrastructure pillars as an interlocking collage of tall, wide and standard tiles.
import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "./ui/Reveal";

const pillars = [
  { icon: "/homepage/intellectual-property.png", title: "Intellectual Property", tone: "blue", place: "row-span-2 md:col-start-1 md:row-start-1 md:row-span-3", tilt: "-1.4deg", lift: "6px" },
  { icon: "/homepage/digital-infrastructure.svg", title: "Digital Infrastructure", tone: "dark", place: "col-span-2 md:col-start-2 md:row-start-1 md:row-span-2", tilt: "1deg", lift: "-4px" },
  { icon: "/homepage/community-infrastructure.svg", title: "Community Infrastructure", tone: "light", place: "row-span-2 md:col-start-2 md:row-start-3", tilt: "-0.8deg", lift: "10px" },
  { icon: "/homepage/partnership-infrastructure.svg", title: "Partnership Infrastructure", tone: "light", place: "row-span-2 md:col-start-1 md:row-start-4 md:row-span-3", tilt: "1.3deg", lift: "-6px" },
  { icon: "/homepage/recognition-infrastructure.svg", title: "Recognition Infrastructure", tone: "blue", place: "row-span-2 md:col-start-3 md:row-start-3", tilt: "1.6deg", lift: "0px" },
  { icon: "/homepage/knowledge-infrastructure.svg", title: "Knowledge Infrastructure", tone: "dark", place: "col-span-2 md:col-start-2 md:row-start-5 md:row-span-2", tilt: "-1.1deg", lift: "8px" },
];

const tones = {
  dark: "bg-[#171516] text-[#FAFAF9]",
  light: "bg-[#F1F0EF] text-[#171516]",
  blue: "bg-[#DFEAF2] text-[#171516]",
};

export default function MoreThanNetworkSection() {
  return (
    <section id="network" className="overflow-hidden bg-[#FAFAF9] py-20 text-[#161415] md:py-24">
      <Reveal
        threshold={0.15}
        className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 md:px-12 lg:grid-cols-[36%_1fr] lg:gap-14"
      >
        <header className="lg:sticky lg:top-28 lg:self-start">
          <p className="net-fade mb-5 flex items-center gap-3 text-base">
            <span aria-hidden="true" className="h-px w-8 bg-[#B04333]" />
            What we build on
          </p>
          <h2 className="net-fade text-[40px] font-black leading-[0.98] tracking-[0.02em] text-[#333333] md:text-[48px] lg:text-[44px] xl:text-[48px]">
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
          <p className="net-fade mt-5 max-w-[340px] text-base font-medium leading-snug text-[#777777]" style={{ "--i": 1 } as CSSProperties}>
            Six layers of infrastructure that turn connections into lasting opportunity.
          </p>
        </header>

        <ul className="grid auto-rows-[140px] grid-flow-dense grid-cols-2 gap-3 md:auto-rows-[140px] md:grid-cols-3 md:gap-4">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.title}
              style={{ "--i": index, "--r": pillar.tilt, "--y": pillar.lift } as CSSProperties}
              className={`net-card @container relative overflow-hidden p-4 shadow-[0_6px_18px_rgb(0_0_0/0.06)] md:p-5 ${pillar.place} ${tones[pillar.tone as keyof typeof tones]}`}
            >
              <div className="grid h-full grid-rows-[auto_1fr_auto] @[300px]:grid-cols-2 @[300px]:grid-rows-[auto_1fr]">
                <span className="net-num font-mono text-xs opacity-50">0{index + 1}</span>
                <div className="net-icon flex min-h-0 items-center justify-center py-2 @[300px]:col-start-2 @[300px]:row-span-2 @[300px]:row-start-1">
                  <Image
                    src={pillar.icon}
                    alt=""
                    aria-hidden="true"
                    width={156}
                    height={156}
                    className="h-full max-h-[160px] w-auto max-w-full object-contain"
                  />
                </div>
                <h3 className="net-title self-end text-base leading-[1.14] @[300px]:col-start-1 @[300px]:row-start-2 md:text-xl">
                  <span className="font-bold">{pillar.title.split(" ")[0]}</span>
                  <br />
                  <span>{pillar.title.split(" ").slice(1).join(" ")}</span>
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
