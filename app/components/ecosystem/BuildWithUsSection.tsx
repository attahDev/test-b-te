import Image from "next/image";
import Button from "../ui/Button";

export default function BuildWithUsSection() {
  return (
    <section
      aria-labelledby="build-with-us-title"
      className="relative isolate overflow-hidden bg-[#fafafa] px-6 py-16 text-[#161415] sm:px-10 md:px-[5.2%] md:pb-24 md:pt-[109px]"
    >
      {/* This CTA has corner waves, unlike the top-left waves in the other sections. */}
      <Image
        src="/ecosystem/wave-background.png"
        alt=""
        aria-hidden="true"
        width={1440}
        height={900}
        sizes="(max-width: 768px) 700px, 1100px"
        className="pointer-events-none absolute -right-64 -top-56 z-0 h-auto w-[700px] max-w-none rotate-180 select-none md:-right-32 md:-top-[300px] md:w-[1100px]"
      />
      <Image
        src="/ecosystem/wave-background.png"
        alt=""
        aria-hidden="true"
        width={1440}
        height={900}
        sizes="(max-width: 768px) 700px, 1100px"
        className="pointer-events-none absolute -left-32 top-[45%] z-0 h-auto w-[700px] max-w-none select-none md:-left-12 md:top-[35%] md:w-[1100px]"
      />

      <div className="relative z-10 mx-auto flex min-h-[399px] max-w-[1290px] items-center justify-center overflow-hidden bg-[#0a0b0d] px-6 py-16 text-center text-white sm:px-12 md:px-20">
        <Image
          src="/homepage/architectural-background.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 1440px) 90vw, 1290px"
          className="pointer-events-none object-cover object-left brightness-[0.2] md:object-fill"
        />
        <div className="relative z-10 mx-auto w-full max-w-[970px]">
          <h2
            id="build-with-us-title"
            className="relative inline-block text-3xl font-extrabold leading-none tracking-[-0.055em] sm:text-4xl"
          >
            Build With Us
            <svg aria-hidden="true" viewBox="0 0 120 15" className="absolute -bottom-4 -left-3 h-4 w-28 fill-none stroke-[#B04333] stroke-[7]">
              <path d="M5 10 Q56 0 115 10" strokeLinecap="round" />
            </svg>
          </h2>
          <p className="mx-auto mt-8 max-w-[960px] text-base leading-[1.25] tracking-[-0.025em] text-white/80 sm:text-xl md:text-2xl">
            Whether you’re a government, university, technology company,
            investor, founder or community organisation: Let’s build the
            infrastructure for a more inclusive digital economy.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Button href="/#contact" variant="primary" size="large">
              Work with BTE <span aria-hidden="true">↗</span>
            </Button>
            <Button href="/ecosystem#technology-model-title" variant="secondary" size="large">
              Explore the Ecosystem <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
