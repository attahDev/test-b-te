"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import Reveal from "../ui/Reveal";
import SectionLabel from "../ui/SectionLabel";
import WaveBackground from "./WaveBackground";

const REDUCED = "(prefers-reduced-motion: reduce)";

const groups = [
  { num: "01", name: "Community Ownership", band: "B", color: "linear-gradient(90deg,#5d90bd,#2f6f9e)", text: "The point of the whole model. Communities hold equity, intellectual property and a real say in what gets built, and every layer below exists to serve that." },
  { num: "02", name: "Data", band: "T", color: "linear-gradient(90deg,#8d8c8c,#4a4949)", text: "Structured, protected and governed data, so information is useful, secure and stays under the control of the people it belongs to." },
  { num: "03", name: "Cloud, Code & AI", band: "E", color: "linear-gradient(90deg,#e5766a,#9c3326)", text: "Cloud is the foundation, code is how we build on it, and AI turns it into intelligent solutions that communities can actually use." },
];

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const layers: { name: string; note?: string; group: number; icon: ReactNode }[] = [
  { name: "Community Ownership", group: 0, icon: <g {...stroke}><circle cx="16" cy="16" r="12" /><circle cx="16" cy="16" r="7" /><circle cx="16" cy="16" r="2" fill="currentColor" /></g> },
  { name: "Data", note: "Structured, Protected, Governed", group: 1, icon: <g {...stroke}><ellipse cx="16" cy="8" rx="9" ry="3.5" /><path d="M7 8v8c0 2 4 3.5 9 3.5s9-1.5 9-3.5V8M7 16v8c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-8" /></g> },
  { name: "AI", note: "Intelligence", group: 2, icon: <g {...stroke}><circle cx="16" cy="16" r="3" /><path d="M16 4v6M16 22v6M4 16h6M22 16h6M7.5 7.5l4.2 4.2M20.3 20.3l4.2 4.2M24.5 7.5l-4.2 4.2M11.7 20.3l-4.2 4.2" /></g> },
  { name: "Code", note: "Build", group: 2, icon: <g {...stroke}><path d="M11 9l-7 7 7 7M21 9l7 7-7 7M18 6l-4 20" /></g> },
  { name: "Cloud", note: "Foundation", group: 2, icon: <g {...stroke}><path d="M9 24a6 6 0 01-.6-12A8 8 0 0124 13.5 5.3 5.3 0 0123 24z" /></g> },
];

function subscribe(notify: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

export default function TechnologyModelSection() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED).matches, () => true);

  useEffect(() => {
    if (reduced || held) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % groups.length), 4500);
    return () => clearInterval(timer);
  }, [reduced, held]);

  const group = groups[active];

  return (
    <section
      aria-labelledby="technology-model-title"
      className="relative isolate overflow-hidden bg-[#fafafa] px-6 pb-16 pt-14 text-[#161415] sm:px-10 md:px-14 md:pt-16 lg:px-16"
    >
      <WaveBackground />

      <Reveal threshold={0.15} className="relative z-10 mx-auto max-w-[1200px]">
        <div className="max-w-[530px]">
          <SectionLabel className="mb-5">Our Technology Model</SectionLabel>
          <h2 id="technology-model-title" className="text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] sm:text-4xl">
            The Technology Model
          </h2>
          <p className="mt-3 max-w-[480px] text-sm leading-[1.25] text-[#292929] sm:text-base">
            We build on cloud foundations, bring ideas to life through code and
            apply AI to create intelligent solutions. We underpin it all with
            structured, protected and governed data—keeping community ownership
            at the heart of what we build.
          </p>
        </div>

        <div
          className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-6"
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
        >
          <div>
            <div className="tech-disc relative mx-auto h-[230px] w-full max-w-[520px] sm:h-[264px]">
              <span aria-hidden="true" className="tech-sphere absolute right-0 top-0 h-full aspect-square rounded-full" />
              {groups.map((item, index) => (
                <div key={item.name} className="tech-row relative z-10 flex h-1/3 items-center" style={{ "--i": index } as CSSProperties}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={index === active}
                    data-on={index === active}
                    className="tech-pill flex flex-none items-center gap-2 rounded-full border border-[#161415]/30 bg-white py-1.5 pl-1.5 pr-3 text-left text-[11px] font-extrabold uppercase leading-tight tracking-tight sm:gap-3 sm:pr-5 sm:text-sm"
                  >
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-[#161415] text-[10px] text-white sm:h-7 sm:w-7 sm:text-xs">{item.num}</span>
                    {item.name}
                  </button>
                  <span aria-hidden="true" className="tech-line relative mx-1 h-px flex-1 bg-[#161415]/30" />
                  <span
                    aria-hidden="true"
                    data-on={index === active}
                    style={{ background: item.color }}
                    className="tech-band relative grid h-[44px] w-[44%] max-w-[250px] flex-none place-items-center rounded-[50%] text-xl font-black text-white shadow-md sm:h-[56px] sm:text-2xl"
                  >
                    {item.band}
                  </span>
                </div>
              ))}
            </div>

            <div aria-live="polite" className="mx-auto mt-8 max-w-[520px]">
              <div key={active} className="model-panel border-l-2 border-[#d85643] pl-4">
                <p className="text-lg font-bold tracking-[-0.02em]">
                  <span className="mr-2 text-[#d85643]">{group.num}</span>
                  {group.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#292929] sm:text-base">{group.text}</p>
              </div>
            </div>
          </div>

          <ol className="tech-stack relative mx-auto flex w-full max-w-[520px] flex-col">
            {layers.map((layer, index) => {
              const on = layer.group === active;
              return (
                <li
                  key={layer.name}
                  style={{ "--i": layers.length - 1 - index, zIndex: layers.length - index } as CSSProperties}
                  className="tech-layer -mt-6 flex items-center first:mt-0"
                  data-on={on}
                >
                  <button
                    type="button"
                    onClick={() => setActive(layer.group)}
                    aria-label={`${layer.name}${layer.note ? `, ${layer.note}` : ""}`}
                    className="flex w-full items-center gap-2 text-left sm:gap-6"
                  >
                    <span className="tech-tile-wrap relative block h-[96px] w-[190px] flex-none sm:h-[112px] sm:w-[224px]">
                      <span className="tech-tile absolute left-1/2 top-1/2 block h-[128px] w-[128px] sm:h-[150px] sm:w-[150px]" />
                      <svg viewBox="0 0 32 32" aria-hidden="true" className="tech-icon absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-[60%] sm:h-11 sm:w-11">
                        {layer.icon}
                      </svg>
                    </span>
                    <span className="tech-label">
                      <span className="block text-xs font-extrabold uppercase tracking-tight sm:text-sm">{layer.name}</span>
                      {layer.note && <span className="block text-xs italic text-[#161415]/55 sm:text-[13px]">{layer.note}</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
