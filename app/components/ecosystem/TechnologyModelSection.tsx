import Image from "next/image";
import SectionLabel from "../ui/SectionLabel";
import WaveBackground from "./WaveBackground";

export default function TechnologyModelSection() {
  return (
    <section
      aria-labelledby="technology-model-title"
      className="relative isolate overflow-hidden bg-[#fafafa] px-6 pb-10 pt-14 text-[#161415] sm:px-10 md:px-14 md:pt-16 lg:px-16"
    >
      <WaveBackground />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="max-w-[530px]">
          <SectionLabel className="mb-5">Our Technology Model</SectionLabel>
          <h2
            id="technology-model-title"
            className="text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] sm:text-4xl"
          >
            The Technology Model
          </h2>
          <p className="mt-3 max-w-[480px] text-sm leading-[1.25] text-[#292929] sm:text-base">
            We build on cloud foundations, bring ideas to life through code and
            apply AI to create intelligent solutions. We underpin it all with
            structured, protected and governed data—keeping community ownership
            at the heart of what we build.
          </p>
        </div>

        <div className="relative mx-auto mt-6 w-full max-w-[900px] md:-mt-28">
          <Image
            src="/ecosystem/technology-model.png"
            alt="Technology model showing community ownership, data, cloud, code and AI around a BTE foundation"
            width={1183}
            height={837}
            sizes="(max-width: 960px) 90vw, 900px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
