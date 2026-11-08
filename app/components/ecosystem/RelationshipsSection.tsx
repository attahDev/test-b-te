import Image from "next/image";
import SectionLabel from "../ui/SectionLabel";
import WaveBackground from "./WaveBackground";

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

        <div className="relative mx-auto mt-8 w-full max-w-[1120px]">
          <Image
            src="/ecosystem/partner-relationships.png"
            alt="BTE partner relationships: Sheffield Technology Parks, AICE Africa, Sheffield Hallam University, Manchester Metropolitan University, Adanian Labs, University of Sheffield and SREN, OpenAI, Azure and Microsoft, and African Blockchain Centre"
            width={1287}
            height={465}
            sizes="(max-width: 1200px) 100vw, 1120px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
