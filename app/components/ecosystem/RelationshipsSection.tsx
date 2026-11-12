import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import WaveBackground from "./WaveBackground";

const groups = [
  {
    letter: "B",
    partners: [
      { name: "Sheffield Technology Parks", role: "Collaborator" },
      { name: "AICE Africa", role: "Collaborator" },
      { name: "Sheffield Hallam University", role: "Collaborator" },
    ],
  },
  {
    letter: "T",
    partners: [
      { name: "Manchester Metropolitan University", role: "Collaborator" },
      { name: "Adanian Labs", role: "" },
    ],
  },
  {
    letter: "E",
    partners: [
      { name: "University of Sheffield / SREN", role: "" },
      { name: "OpenAI", role: "" },
      { name: "Azure / Microsoft", role: "" },
      { name: "African Blockchain Centre", role: "" },
    ],
  },
];

export default function RelationshipsSection() {
  return (
    <section
      aria-labelledby="relationships-title"
      className="relative isolate overflow-hidden bg-[#fafafa] px-6 py-16 text-[#161415] sm:px-10 md:py-20 lg:px-14"
    >
      <WaveBackground />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="relative min-h-[190px] pr-32 sm:min-h-[185px] sm:pr-44 md:min-h-[205px]">
          <SectionLabel className="mb-4">
            Our Relationships
          </SectionLabel>
          <h2
            id="relationships-title"
            className="text-4xl font-extrabold leading-none tracking-[-0.055em] sm:text-5xl"
          >
            Relationships
          </h2>
          <p className="mt-3 max-w-[470px] text-sm leading-[1.4] text-[#292929] sm:text-base">
            We connect communities, industry and institutions to turn shared
            ambition into skills, enterprise and greater ownership in the
            digital economy.
          </p>

          <Image
            src="/ecosystem/ownership-rings.png"
            alt=""
            aria-hidden="true"
            width={150}
              height={150}
            className="absolute right-0 top-0"
          />
        </div>

        <Reveal threshold={0.15} className="mt-10">
          <h3 className="sr-only">
            BTE partner relationships: Sheffield Technology Parks, AICE Africa, Sheffield Hallam University,
            Manchester Metropolitan University, Adanian Labs, University of Sheffield and SREN, OpenAI,
            Azure and Microsoft, and African Blockchain Centre
          </h3>
          <ul className="grid gap-4 md:grid-cols-3">
            {groups.map((group, gi) => (
              <li
                key={group.letter}
                style={{ "--g": gi } as CSSProperties}
                className="rel-card relative isolate flex min-h-[340px] flex-col overflow-hidden border border-[#161415]/15 bg-white p-6 md:min-h-[520px] md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="rel-letter pointer-events-none mb-8 block select-none text-[170px] font-black leading-[0.78] md:text-[210px]"
                >
                  {group.letter}
                </span>
                <ul className="mt-auto flex flex-col">
                  {group.partners.map((partner, pi) => (
                    <li
                      key={partner.name}
                      style={{ "--i": gi * 3 + pi } as CSSProperties}
                      className="rel-row border-t border-[#161415]/15 py-4 first:border-t-0"
                    >
                      <p className="text-xl font-semibold leading-tight tracking-[-0.02em] md:text-2xl">{partner.name}</p>
                      {partner.role && <p className="mt-1 text-sm text-[#161415]/60">{partner.role}</p>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
