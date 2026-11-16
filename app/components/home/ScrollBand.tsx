import Image from "next/image";
import ScrollVar from "../ui/ScrollVar";

const words = ["Technology", "Skills", "Enterprise", "Ownership"];

export default function ScrollBand() {
  return (
    <ScrollVar mode="pin" className="band relative h-[320svh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div className="band-frame absolute inset-0">
          <Image src="/homepage/architectural-background.png" alt="" fill sizes="100vw" className="band-image object-cover" />
          <div className="absolute inset-0 bg-[#070b16]/45" />
        </div>
        <div className="relative z-10 px-6 text-center">
          <p className="band-kicker text-[11px] uppercase tracking-[0.32em] text-[#E97868]">From community to ownership</p>
          <ul className="mt-8 flex flex-col items-center gap-2 md:gap-4">
            {words.map((word, index) => (
              <li
                key={word}
                style={{ "--s": index } as React.CSSProperties}
                className="band-word text-4xl font-extralight uppercase leading-none tracking-[0.14em] md:text-7xl lg:text-8xl"
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollVar>
  );
}
