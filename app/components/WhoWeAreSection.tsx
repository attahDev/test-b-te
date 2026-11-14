import Image from "next/image";
import type { CSSProperties } from "react";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";
import WhyWorkWithUs from "./WhyWorkWithUs";

function Words({ text, start }: { text: string; start: number }) {
  return text.split(" ").map((word, index) => (
    <span key={`${start}-${index}`}>
      <span className="who-word">
        <span style={{ "--i": start + index } as CSSProperties}>{word}</span>
      </span>{" "}
    </span>
  ));
}

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="overflow-hidden bg-[#FAFAF9] pb-20 pt-[70px] text-[#161415] md:pb-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <SectionLabel className="mb-[38px] lg:ml-12">Who We Are</SectionLabel>

        <Reveal className="grid items-center gap-8 lg:grid-cols-[40%_1fr] lg:gap-30">
          <div className="relative flex justify-center lg:justify-start">
            <div aria-hidden="true" className="who-drift-b absolute -left-14 -top-13 z-0 hidden h-[234px] w-[180px] lg:block">
              <Image
                src="/homepage/community-decoration.png"
                alt=""
                width={231}
                height={301}
                className="h-full w-full object-contain"
              />
              <span className="who-ripple" />
              <span className="who-ripple" style={{ animationDelay: "1.8s" }} />
            </div>
            <div className="who-drift-a relative z-10 lg:ml-[142px]">
              <Image
                src="/homepage/community-panel.png"
                alt="Black Tech Expo community member speaking at an event"
                width={412}
                height={430}
                className="who-photo h-auto w-[360px] max-w-full"
              />
            </div>
          </div>

          <div className="max-w-[520px]">
            <h2 className="text-[32px] font-black leading-[1.05] tracking-[-0.055em] md:text-[36px]">
              <span className="relative inline-block text-[#A43E30]">
                <Words text="Black Tech Expo" start={0} />
                <svg aria-hidden="true" viewBox="0 0 240 12" preserveAspectRatio="none" className="who-underline pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full overflow-visible">
                  <path pathLength={1} d="M3 8 C 60 2, 150 2, 237 6" fill="none" stroke="#B04333" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <Words text="was" start={3} />
              <br className="hidden lg:block" />
              <Words text="created to do more than run" start={4} />
              <br className="hidden lg:block" />
              <Words text="events." start={10} />
            </h2>
            <p className="who-fade mt-5 text-lg leading-[1.4] text-[#252323] md:text-[22px]" style={{ "--d": 650 } as CSSProperties}>
              We Build And Connect The People, Technology, Programmes,
              Partnerships And Infrastructure Needed To Help Communities And
              Organisations Participate In The Digital Economy.
            </p>
            <div className="who-fade" style={{ "--d": 800 } as CSSProperties}>
              <Button href="/contact" size="large" className="mt-6">
                Work with BTE <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </div>
        </Reveal>

        <WhyWorkWithUs />
      </div>
    </section>
  );
}
