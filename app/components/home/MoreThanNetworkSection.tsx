"use client";

import { useState } from "react";
import LayerStack from "./LayerStack";
import SectionLabel from "../ui/SectionLabel";
import WakeList from "../ui/WakeList";

const layers = [
  "Intellectual Property",
  "Digital Infrastructure",
  "Community Infrastructure",
  "Partnership Infrastructure",
  "Recognition Infrastructure",
  "Knowledge Infrastructure",
];

const items = layers.map((name, index) => ({
  key: name,
  title: name,
  meta: `Layer ${String(index + 1).padStart(2, "0")}`,
}));

export default function MoreThanNetworkSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="network" className="px-6 py-28 md:px-16 md:py-40">
      <div className="mx-auto grid w-full max-w-[1300px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <header className="lg:sticky lg:top-32 lg:self-start">
          <SectionLabel>What we build on</SectionLabel>
          <h2 className="mt-8 text-4xl font-extralight uppercase leading-[1.1] tracking-[0.1em] md:text-5xl">More than a network</h2>
          <p className="mt-6 max-w-[34ch] text-base font-light leading-relaxed text-[#FAFAF9]/65 md:text-lg">
            Six layers of infrastructure that turn connections into lasting opportunity.
          </p>
          <div className="mt-12 hidden lg:block">
            <LayerStack count={items.length} active={active} />
          </div>
        </header>
        <WakeList items={items} onActive={setActive} />
      </div>
    </section>
  );
}
