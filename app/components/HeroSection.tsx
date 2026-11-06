import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#161415]">
      {/* Background wave pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage/imgi_29_aYePB90YXLCxVj72_adrien-olichon-_UuN_2ixJvA-unsplash 1.png"
          alt=""
          fill
          className="object-cover opacity-25"
          priority
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#161415]/40 via-transparent to-[#161415]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 pt-28 pb-12">
        {/* Welcome badge */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[#B04333] text-lg">✦</span>
          <span className="inline-flex items-center rounded-full bg-[#B04333] px-3 py-1 text-xs font-medium text-white">
            Welcome To BTE
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-[#FAFAF9] leading-[0.95] tracking-tight italic max-w-none">
          More Than A Network
        </h1>

        {/* Scribble decoration */}
        <div className="absolute top-24 right-[12%] w-16 h-16 md:w-20 md:h-20">
          <Image
            src="/homepage/Vector 18.png"
            alt=""
            width={80}
            height={80}
            className="opacity-70"
          />
        </div>

        {/* Content row */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12">
          {/* Video card */}
          <div className="w-full md:w-[48%] lg:w-[44%]">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#222]">
              <Image
                src="/homepage/whoweare_image.png"
                alt="BTE Event Video"
                fill
                className="object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Video overlay controls */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="white"
                  >
                    <rect x="5" y="4" width="4" height="12" rx="1" />
                    <rect x="11" y="4" width="4" height="12" rx="1" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 text-xs text-white/70 font-mono">
                VID-9BALJBJ
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white/70">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                  <path d="M6.5 0.5H1.5C0.948 0.5 0.5 0.948 0.5 1.5v9c0 0.552 0.448 1 1 1h5c0.552 0 1-0.448 1-1v-9c0-0.552-0.448-1-1-1z" />
                </svg>
                YouTube
              </div>
            </div>
          </div>

          {/* Right side content */}
          <div className="flex flex-col items-start gap-5 md:w-[43%]">
            <p className="text-[#FAFAF9]/80 text-base md:text-lg max-w-md leading-relaxed">
              BTE connects Black talent to the networks, skills, technology and
              capital that compound into community ownership.
            </p>

            {/* CTA buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-[#B04333] px-4 py-2 text-xs font-medium text-white hover:bg-[#923327] transition-colors"
              >
                Work with BTE <span className="text-xs">↗</span>
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-[#FAFAF9]/30 px-4 py-2 text-xs font-medium text-[#FAFAF9] hover:bg-[#FAFAF9]/10 transition-colors"
              >
                Our Ecosystem <span className="text-xs">↗</span>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-3 mt-2">
              {/* Avatar group */}
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#B04333] border-2 border-[#161415]" />
                <div className="w-8 h-8 rounded-full bg-[#E5E5E5] border-2 border-[#161415]" />
                <div className="w-8 h-8 rounded-full bg-[#923327] border-2 border-[#161415]" />
                <div className="w-8 h-8 rounded-full bg-[#B04333]/60 border-2 border-[#161415]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#FAFAF9]">357K+</p>
                <p className="text-xs text-[#FAFAF9]/60">
                  Startup Owners And Founders
                </p>
              </div>
            </div>
          </div>

          {/* Circular icon - target/bullseye */}
          <div className="hidden lg:block absolute bottom-20 right-16">
            <Image
              src="/homepage/Frame 427319121.svg"
              alt="BTE Target Icon"
              width={140}
              height={140}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
