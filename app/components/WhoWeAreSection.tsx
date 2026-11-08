import Image from "next/image";
import Button from "./ui/Button";
import SectionLabel from "./ui/SectionLabel";

const categories = [
  { label: "Technology", icon: "/homepage/technology-icon.png" },
  { label: "Innovation", icon: "/homepage/innovation-icon.png" },
  { label: "Skills", icon: "/homepage/skills-icon.png" },
  { label: "Enterprise", icon: "/homepage/enterprise-icon.png" },
  { label: "AI", icon: "/homepage/ai-icon.png" },
  { label: "Web3", icon: "/homepage/web3-icon.png" },
  { label: "Research", icon: "/homepage/research-icon.png" },
  { label: "Community", icon: "/homepage/community-icon.png" },
];

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="overflow-hidden bg-[#FAFAF9] pb-20 pt-[70px] text-[#161415] md:pb-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <SectionLabel className="mb-[38px] lg:ml-12">Who We Are</SectionLabel>

        <div className="grid items-center gap-8 lg:grid-cols-[40%_1fr] lg:gap-30">
          <div className="relative flex justify-center lg:justify-start">
            <Image
              src="/homepage/community-decoration.png"
              alt=""
              aria-hidden="true"
              width={180}
              height={240}
              className="absolute -left-14 -top-13 z-0 hidden h-[250px] w-[180px] object-fill lg:block"
            />
            <Image
              src="/homepage/community-panel.png"
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
            <Button href="#" size="large" className="mt-6">
              Work with BTE <span aria-hidden="true">↗</span>
            </Button>
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
