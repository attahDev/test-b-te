import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import WhyWorkWithUs from "./WhyWorkWithUs";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto w-full max-w-[1300px]">
        <Reveal>
          <SectionLabel className="fade-up mb-10">Who we are</SectionLabel>
          <h2 className="fade-up max-w-[22ch] text-3xl font-extralight uppercase leading-[1.15] tracking-[0.1em] sm:text-5xl lg:text-6xl" style={{ "--i": 1 } as React.CSSProperties}>
            Black Tech Expo was created to do more than run events.
          </h2>
          <p className="fade-up mt-10 max-w-[56ch] text-lg font-light leading-relaxed text-[#FAFAF9]/70 md:text-2xl" style={{ "--i": 2 } as React.CSSProperties}>
            We build and connect the people, technology, programmes, partnerships and infrastructure needed to help communities and organisations participate in the digital economy.
          </p>
          <div className="fade-up mt-10" style={{ "--i": 3 } as React.CSSProperties}>
            <Button href="/contact" size="large">
              Work with BTE <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </Reveal>

        <WhyWorkWithUs />
      </div>
    </section>
  );
}
