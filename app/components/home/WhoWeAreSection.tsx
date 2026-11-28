import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import WhyWorkWithUs from "./WhyWorkWithUs";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are">
      <div className="px-6 pb-12 pt-16 md:px-16 md:pb-16 md:pt-24">
        <div className="mx-auto w-full max-w-[1300px]">
          <Reveal>
            <SectionLabel className="fade-up mb-8">Who we are</SectionLabel>
            <h2 className="fade-up max-w-[26ch] text-2xl font-extralight uppercase leading-[1.2] tracking-[0.1em] sm:text-3xl lg:text-4xl" style={{ "--i": 1 } as React.CSSProperties}>
              Black Tech Expo was created to do more than run events.
            </h2>
            <p className="fade-up mt-8 max-w-[56ch] text-base font-light leading-relaxed text-[#FAFAF9]/70 md:text-lg" style={{ "--i": 2 } as React.CSSProperties}>
              We build and connect the people, technology, programmes, partnerships and infrastructure needed to help communities and organisations participate in the digital economy.
            </p>
            <div className="fade-up mt-8" style={{ "--i": 3 } as React.CSSProperties}>
              <Button href="/contact">
                Work with BTE <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
      <WhyWorkWithUs />
    </section>
  );
}
