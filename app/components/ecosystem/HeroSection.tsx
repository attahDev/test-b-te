import Image from "next/image";
import Button from "../ui/Button";

const audiences = [
  {
    number: "01.",
    label: "Government &\nPublic Sector",
    position: "md:left-[21.1%] md:top-[21%]",
    tone: "bg-[#5a3434]/45",
    accent: "bg-[#ff4764]",
  },
  {
    number: "02.",
    label: "University &\nEducation",
    position: "md:left-[4.2%] md:top-[31.2%]",
    tone: "bg-[#3d282a]/55",
    accent: "bg-[#3b82f6]",
  },
  {
    number: "03.",
    label: "Technology\nCompanies",
    position: "md:left-[21.1%] md:top-[39.3%]",
    tone: "bg-[#2a2325]/70",
    accent: "bg-[#3b82f6]",
  },
  {
    number: "04.",
    label: "Investor &\nFunders",
    position: "md:left-[33.4%] md:top-[60.3%]",
    tone: "bg-[#1e2736]/75",
    accent: "bg-[#ff4764]",
  },
  {
    number: "05.",
    label: "Corporate",
    position: "md:left-[50.4%] md:top-[60.3%]",
    tone: "bg-[#1a1c22]/80",
    accent: "bg-[#ff4764]",
  },
  {
    number: "06.",
    label: "Startups &\nFounders",
    position: "md:left-[62.7%] md:top-[21%]",
    tone: "bg-[#1f293a]/70",
    accent: "bg-[#ff4764]",
  },
  {
    number: "07.",
    label: "Community\nOrganisations",
    position: "md:left-[62.7%] md:top-[39.3%]",
    tone: "bg-[#1d222b]/75",
    accent: "bg-[#3b82f6]",
  },
  {
    number: "08.",
    label: "Ecosystems &\nInternational\nPartners",
    position: "md:left-[79.6%] md:top-[32.4%]",
    tone: "bg-[#181a20]/80",
    accent: "bg-[#3b82f6]",
  },
];

export default function EcosystemHeroSection() {
  return (
    <section
      aria-labelledby="ecosystem-hero-title"
      className="relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#07080a] text-white"
    >
      {/* Background Red & Blue Diagonal Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 34% 48% at 34% 26%, rgba(180, 72, 68, 0.42) 0%, rgba(120, 42, 42, 0.18) 45%, transparent 75%),
            radial-gradient(ellipse 28% 45% at 22% 58%, rgba(145, 58, 54, 0.22) 0%, transparent 70%),
            radial-gradient(ellipse 32% 48% at 63% 38%, rgba(38, 78, 145, 0.36) 0%, rgba(22, 45, 88, 0.15) 50%, transparent 75%),
            linear-gradient(180deg, #07080a 0%, #090a0f 50%, #07080a 100%)
          `,
        }}
      />

      {/* Vertical Ribbed Glass / Blinds Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.06) 18px, rgba(0,0,0,0.55) 34px, rgba(0,0,0,0.85) 44px)",
          maskImage:
            "radial-gradient(ellipse 52% 65% at 48% 44%, black 20%, rgba(0,0,0,0.4) 65%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 52% 65% at 48% 44%, black 20%, rgba(0,0,0,0.4) 65%, transparent 90%)",
        }}
      />

      {/* Outer Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,#050608_92%)]"
      />

      {/* Stage Container */}
      <div className="relative z-10 w-full max-w-[1280px] px-4 py-12 md:px-0 md:py-0">
        <div className="relative w-full max-md:mx-auto max-md:grid max-md:max-w-[500px] max-md:grid-cols-2 max-md:gap-3 md:aspect-[4/3]">
          {/* Center Hero Photo Card - Width slightly expanded to 24% & height reduced to 37.5% */}
          <article className="relative overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#0c0d12] shadow-[0_24px_70px_rgba(0,0,0,0.75)] max-md:col-span-2 max-md:mb-2 max-md:h-[340px] max-md:w-full md:absolute md:left-[38.0%] md:top-[21%] md:z-10 md:h-[37.5%] md:w-[24.0%]">
            <Image
              src="/homepage/community-panel.png"
              alt="Three Black technology community members on a panel"
              fill
              sizes="(max-width: 767px) 100vw, 25vw"
              className="object-cover object-center brightness-[0.82] contrast-[1.05]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/80" />

            {/* Heading positioned in the lower-middle area with increased font size */}
            <div className="absolute inset-x-0 top-[42%] flex flex-col items-center px-3 text-center">
              <h1
                id="ecosystem-hero-title"
                className="text-[32px] font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-[36px] md:text-[clamp(1.6rem,2.6vw,2.5rem)]"
              >
                Who We
                <br />
                Work With
              </h1>
            </div>

            {/* Pill Button anchored near the bottom with slightly larger text */}
            <div className="absolute inset-x-0 bottom-[8%] flex justify-center px-3">
             <Button variant="secondarySubtle" href="#" size="large">
                  Work with BTE <span className="text-xs">↗</span>
                </Button>
            </div>
          </article>

          {/* 8 Audience Cards - Width increased to w-[16.2%], height reduced to h-[16.5%], and font size increased */}
          {audiences.map((audience) => (
            <article
              key={audience.number}
              className={`relative flex flex-col justify-between overflow-hidden rounded-[10px] border border-white/[0.07] p-4 shadow-[0_14px_34px_rgba(0,0,0,0.45)] backdrop-blur-xl ${audience.tone} max-md:min-h-[120px] max-md:w-full md:absolute ${audience.position} md:z-20 md:h-[16.5%] md:w-[16.2%] md:p-[1.35%]`}
            >
              {/* Subtle top-left inner highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[10px] bg-gradient-to-br from-white/[0.05] to-transparent"
              />

              {/* Top Row: Number & Glowing Status Dot */}
              <div className="relative z-10 flex w-full items-center justify-between">
                <span className="text-[11px] font-medium leading-none tracking-[-0.02em] text-white/70 md:text-[clamp(0.62rem,0.8vw,0.8rem)]">
                  {audience.number}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-[6px] w-[6px] rounded-full ${audience.accent} shadow-[0_0_8px_currentColor]`}
                />
              </div>

              {/* Bottom Row: Multi-line Audience Label with larger font size */}
              <h2 className="relative z-10 whitespace-pre-line text-left text-[15px] font-medium leading-[1.14] tracking-[-0.025em] text-white/95 md:pb-[2%] md:text-[clamp(0.78rem,1.08vw,1.1rem)]">
                {audience.label}
              </h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
