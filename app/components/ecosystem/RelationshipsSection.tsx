// Relationships: header plus two counter-scrolling strips of partner logos and names.
import Image from "next/image";
import SectionLabel from "../ui/SectionLabel";
import WaveBackground from "./WaveBackground";

type Partner = { name: string; role?: string; logo?: string; mark?: string };

const partners: Partner[] = [
  { name: "Sheffield Technology Parks", role: "Collaborator" },
  { name: "AICE Africa", role: "Collaborator" },
  { name: "Sheffield Hallam University", role: "Collaborator" },
  { name: "Manchester Metropolitan University", role: "Collaborator" },
  { name: "Adanian Labs" },
  { name: "University of Sheffield / SREN" },
  { name: "OpenAI", mark: "OA" },
  { name: "Azure / Microsoft", mark: "AM" },
  { name: "African Blockchain Centre" },
];

const rows = [partners, [...partners.slice(5), ...partners.slice(0, 5)]];

function initials(name: string) {
  return name
    .replace(/\/.*/, "")
    .split(" ")
    .filter((word) => word.length > 2 || word === word.toUpperCase())
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  return (
    <div className="partner-card flex flex-none items-center gap-4 border border-[#161415]/15 bg-white px-5 py-4">
      <span
        className={`grid h-14 w-14 flex-none place-items-center overflow-hidden rounded-full text-base font-black ${
          index % 3 === 0 ? "bg-[#171516] text-white" : index % 3 === 1 ? "bg-[#DFEAF2] text-[#171516]" : "bg-[#F1F0EF] text-[#171516]"
        }`}
      >
        {partner.logo ? (
          <Image src={partner.logo} alt="" width={56} height={56} className="h-full w-full object-contain p-2" />
        ) : (
          partner.mark ?? initials(partner.name)
        )}
      </span>
      <span className="whitespace-nowrap">
        <span className="block text-lg font-semibold leading-tight tracking-[-0.02em]">{partner.name}</span>
        {partner.role && <span className="block text-sm text-[#161415]/60">{partner.role}</span>}
      </span>
    </div>
  );
}

export default function RelationshipsSection() {
  return (
    <section
      aria-labelledby="relationships-title"
      className="relative isolate overflow-hidden bg-[#fafafa] py-16 text-[#161415] md:py-20"
    >
      <WaveBackground />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-14">
        <div className="relative min-h-[190px] pr-32 sm:min-h-[185px] sm:pr-44 md:min-h-[205px]">
          <SectionLabel className="mb-4">Our Relationships</SectionLabel>
          <h2 id="relationships-title" className="text-4xl font-extrabold leading-none tracking-[-0.055em] sm:text-5xl">
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
      </div>

      <ul className="sr-only">
        {partners.map((partner) => (
          <li key={partner.name}>{partner.name}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="mt-8 flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="partner-strip marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className={`partner-track marquee-track ${rowIndex === 1 ? "partner-reverse" : ""}`}>
                {row.map((partner, index) => (
                  <PartnerCard key={partner.name} partner={partner} index={index + rowIndex} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
