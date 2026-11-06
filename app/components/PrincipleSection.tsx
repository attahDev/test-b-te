import Image from "next/image";
import Link from "next/link";

export default function PrincipleSection() {
  return (
    <section className="overflow-hidden bg-[#FAFAF9] py-8 md:py-10">
      <div className="relative mx-auto flex min-h-[260px] w-[calc(100%-3rem)] max-w-[1200px] items-center justify-center overflow-hidden bg-[#1D1D1D] px-5 py-10 text-center md:min-h-[310px] md:px-16">
        <Image
          src="/homepage/imgi_29_aYePB90YXLCxVj72_adrien-olichon-_UuN_2ixJvA-unsplash 1.png"
          alt=""
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161415]/65 to-[#161415]/35" />
        <div className="relative z-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#FAFAF9]/75">
            Leave No One Behind
          </p>
          <h2 className="text-3xl font-black leading-tight text-[#FAFAF9] md:text-5xl">
            Principle: Community Ownership
          </h2>
          <Image
            src="/homepage/Vector 18.png"
            alt=""
            aria-hidden="true"
            width={180}
            height={24}
            className="mx-auto mb-6 mt-1 h-5 w-40 object-fill"
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[#B04333] px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#923327]"
            >
              Work with BTE <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-[#FAFAF9]/50 px-5 py-2.5 text-xs font-medium text-[#FAFAF9] transition-colors hover:bg-[#FAFAF9]/10"
            >
              Our Ecosystem <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
