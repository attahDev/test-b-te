import SectionLabel from "../ui/SectionLabel";
import WakeList from "../ui/WakeList";

const audiences = [
  "Government and public sector",
  "University and education",
  "Technology companies",
  "Investors and funders",
  "Corporate",
  "Startups and founders",
  "Community organisations",
  "Ecosystems and international partners",
];

const items = audiences.map((name, index) => ({
  key: name,
  title: name,
  meta: String(index + 1).padStart(2, "0"),
}));

export default function EcosystemHeroSection() {
  return (
    <section aria-labelledby="ecosystem-hero-title" className="px-6 pb-24 pt-40 md:px-16 md:pb-32 md:pt-48">
      <div className="mx-auto grid w-full max-w-[1300px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel className="mb-8">Our ecosystem</SectionLabel>
          <h1 id="ecosystem-hero-title" className="text-4xl font-extralight uppercase leading-[1.1] tracking-[0.1em] sm:text-5xl lg:text-6xl">
            Who we work with
          </h1>
          <p className="mt-8 max-w-[36ch] text-base font-light leading-relaxed text-[#FAFAF9]/65 md:text-lg">
            Eight kinds of partner help us turn shared ambition into skills, enterprise and ownership.
          </p>
        </div>
        <WakeList items={items} size="small" />
      </div>
    </section>
  );
}
