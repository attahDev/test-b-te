import Image from "next/image";
import Button from "../ui/Button";

export default function PrincipleSection() {
  return (
    <section className="overflow-hidden bg-[#FAFAF9] py-8 md:py-10">
      <div className="relative mx-auto flex min-h-[260px] w-[calc(100%-3rem)] max-w-[1200px] items-center justify-center overflow-hidden bg-[#1D1D1D] px-5 py-10 text-center md:min-h-[310px] md:px-16">
        <Image
          src="/homepage/architectural-background.png"
          alt=""
          fill
          className="object-cover opacity-40"
        />
          <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161415]/65 to-[#161415]/35" />
        <div className="relative z-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#FAFAF9]/75">
            Leave No One Behind
          </p>
          <h2 className="text-3xl font-black leading-tight text-[#FAFAF9] md:text-5xl">
            Principle: Community Ownership
          </h2>
          <Image
            src="/homepage/red-underline.png"
            alt=""
            aria-hidden="true"
            width={180}
            height={24}
            className="mx-auto mb-6 mt-1 h-5 w-40 object-fill"
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="#" size="medium">
              Work with BTE <span aria-hidden="true">↗</span>
            </Button>
            <Button href="/ecosystem" variant="secondary" size="medium">
              Our Ecosystem <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
