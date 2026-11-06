import Image from "next/image";
import Link from "next/link";

const categories = [
  { label: "Technology", icon: "/homepage/Technology — connected digital platforms (1).png" },
  { label: "Innovation", icon: "/homepage/Innovation — ideas into opportunity.png" },
  { label: "Skills", icon: "/homepage/Skills — learning and progression.png" },
  { label: "Enterprise", icon: "/homepage/Enterprise — tools for business growth.png" },
  { label: "AI", icon: "/homepage/AI — connected intelligence.png" },
  { label: "Web3", icon: "/homepage/Web3 — distributed digital ownership.png" },
  { label: "Research", icon: "/homepage/Research — insight from evidence.png" },
  { label: "Community", icon: "/homepage/Community — shared participation and ownership.png" },
];

export default function WhoWeAreSection() {
  return (
    <section className="overflow-hidden bg-[#FAFAF9] pb-20 pt-[70px] text-[#161415] md:pb-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="mb-[38px] flex items-center gap-1 lg:ml-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E97868] text-xs text-[#E97868]">
            ✳
          </span>
          <span className="inline-flex h-6 items-center rounded-full bg-[#E97868] px-3 text-xs font-medium text-[#161415]">
            Who We Are
          </span>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[40%_1fr] lg:gap-30">
          <div className="relative flex justify-center lg:justify-start">
            <Image
              src="/homepage/Frame5311.png"
              alt=""
              aria-hidden="true"
              width={180}
              height={240}
              className="absolute -left-14 -top-13 z-0 hidden h-[250px] w-[180px] object-fill lg:block"
            />
            <Image
              src="/homepage/whoweare_image.png"
              alt="Black Tech Expo community member speaking at an event"
              width={360}
              height={390}
              className="h-[390px] w-[360px] max-w-full object-fill lg:ml-[142px]"
            />
          </div>

          <div className="max-w-[520px]">
            <h2 className="text-[32px] font-black leading-[1.05] tracking-[-0.055em] md:text-[36px]">
              <span className="text-[#A43E30]">Black Tech Expo</span> was
              <br className="hidden lg:block" /> created to do more than run
              <br className="hidden lg:block" /> events.
            </h2>
            <p className="mt-5 text-lg leading-[1.4] text-[#252323] md:text-[22px]">
              We Build And Connect The People, Technology, Programmes,
              Partnerships And Infrastructure Needed To Help Communities And
              Organisations Participate In The Digital Economy.
            </p>
            <Link
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B04333] px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#923327]"
            >
              Work with BTE <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <p className="mb-6 text-base">Why Work With Us?</p>
          <div className="grid grid-cols-4 gap-x-3 gap-y-5 lg:grid-cols-8">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="flex flex-col items-center gap-2 text-center text-base font-semibold leading-tight text-[#161415] md:text-lg"
              >
                <Image
                  src={cat.icon}
                  alt={cat.label}
                  width={52}
                  height={52}
                  className="h-11 w-11 object-contain md:h-12 md:w-12"
                />
                <span>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
