import Image from "next/image";
import SectionLabel from "./ui/SectionLabel";

const items = [
  {
    num: "01",
    title: "BUILD",
    desc: "We develop technology platforms, digital products, programmes and innovation infrastructure.",
  },
  {
    num: "02",
    title: "CONNECT",
    desc: "We connect founders, businesses, universities, investors, governments, professionals and communities.",
  },
  {
    num: "03",
    title: "DEVELOP",
    desc: "We create pathways into skills, entrepreneurship, employment, investment and technology.",
  },
  {
    num: "04",
    title: "RESEARCH",
    desc: "We develop technology platforms, digital products, programmes and innovation infrastructure.",
  },
  {
    num: "05",
    title: "CREATE OPPORTUNITY",
    desc: "We turn relationships, technology and infrastructure into practical opportunities.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="relative overflow-hidden bg-[#101010] py-12 md:py-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage/architectural-background.png"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#101010]/55" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] gap-8 px-6 md:px-12 lg:grid-cols-[29%_1fr] lg:gap-8">
        <div className="min-h-[320px] overflow-hidden md:min-h-[440px] lg:mt-14 lg:min-h-[456px]">
          <Image
            src="/homepage/community-panel.png"
            alt="Black Tech Expo members collaborating"
            width={600}
            height={800}
            className="h-full min-h-[320px] w-full object-cover grayscale md:min-h-[440px] lg:min-h-[456px]"
          />
        </div>

        <div>
          <SectionLabel className="mb-8">What We Do</SectionLabel>

          <div className="grid gap-3 md:grid-cols-2">
            {items.slice(0, 4).map((item) => (
              <article
                key={item.num}
                className="relative flex min-h-36 items-end overflow-hidden bg-[#F1F0EF] px-4 pb-4 pt-5 md:min-h-36 md:px-5"
              >
                <span
                  className={`absolute -bottom-5 left-5 text-7xl font-black leading-none md:text-8xl ${
                    item.num === "02" || item.num === "03"
                      ? "text-[#E97868]/35"
                      : "text-[#D85643]"
                  }`}
                >
                  {item.num}
                </span>
                <div className="relative ml-auto w-[53%]">
                  <h3 className="text-left text-base font-black leading-tight text-[#161415] md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-[1.35] text-[#161415]/75">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}

            <article className="relative flex min-h-28 items-end overflow-hidden bg-[#F1F0EF] px-4 pb-4 pt-5 md:col-span-2 md:min-h-24 md:items-center md:px-5">
              <span className="absolute -bottom-5 left-5 text-7xl font-black leading-none text-[#D85643] md:static md:mr-8 md:text-8xl">
                {items[4].num}
              </span>
              <div className="relative ml-auto w-[61%] md:ml-0 md:flex-1">
                <h3 className="text-base font-black leading-tight text-[#161415] md:text-lg">
                  {items[4].title}
                </h3>
                <p className="mt-2 text-xs leading-[1.35] text-[#161415]/75">
                  {items[4].desc}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
