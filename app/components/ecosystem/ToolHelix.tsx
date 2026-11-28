"use client";

// Pinned tool group: cards rise from the bottom of the screen and settle into a grid, one after another, as you scroll.
import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import WakeList from "../ui/WakeList";
import type { ToolGroup } from "./platformLayers";
import { toolIconPath } from "./toolIcons";

const SCREENS_PER_TOOL = 0.3;
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(notify: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

export default function ToolHelix({ group }: { group: ToolGroup }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const still = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED).matches, () => true);
  const count = group.tools.length;
  const columns = count <= 6 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  useEffect(() => {
    if (still) return;
    const node = wrapper.current;
    const target = stage.current;
    if (!node || !target) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -box.top / Math.max(1, box.height - window.innerHeight)));
      target.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [still, count]);

  if (still) {
    return (
      <div className="grid gap-10 border-t border-white/10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <h3 className="text-3xl font-extralight uppercase leading-[1.1] tracking-[0.1em] md:text-3xl">{group.title}</h3>
        <WakeList
          size="small"
          items={group.tools.map((item) => ({ key: item.name, title: item.name, text: item.note }))}
        />
      </div>
    );
  }

  return (
    <div ref={wrapper} className="relative border-t border-white/10" style={{ height: `${count * SCREENS_PER_TOOL * 100 + 120}svh` }}>
      <div
        ref={stage}
        className="sticky top-0 flex h-svh flex-col justify-center gap-5 overflow-hidden pt-24 pb-6 lg:gap-8 lg:pt-28"
        style={{ "--n": count, "--p": 0 } as CSSProperties}
      >
        <div className="flex items-end justify-between gap-6">
          <h3 className="text-xl font-extralight uppercase leading-[1.1] tracking-[0.12em] md:text-3xl">{group.title}</h3>
          {group.upcoming && <p className="shrink-0 text-xs uppercase tracking-[0.28em] text-[#E97868]">On the way</p>}
        </div>

        <ul className={`grid min-h-0 grid-cols-2 content-start gap-2.5 sm:gap-3 lg:gap-4 ${columns}`}>
          {group.tools.map((item, index) => (
            <li
              key={item.name}
              style={{ "--i": index } as CSSProperties}
              className="tool-card flex min-h-[76px] items-start gap-3 rounded-[12px] border border-white/[0.09] bg-white/[0.03] p-3 sm:min-h-[96px] sm:p-4 lg:min-h-[124px] lg:flex-col lg:gap-4"
            >
              <span className="tool-icon grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-white/70 lg:h-11 lg:w-11">
                <svg viewBox="0 0 24 24" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={toolIconPath(item.name)} />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-light uppercase leading-snug tracking-[0.14em] text-[#FAFAF9] sm:text-xs">{item.name}</span>
                {item.note && <span className="mt-1.5 hidden text-[13px] font-extralight leading-snug text-[#FAFAF9]/60 lg:line-clamp-2 lg:block">{item.note}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
