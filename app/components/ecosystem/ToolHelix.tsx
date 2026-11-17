"use client";

import Backdrop from "@/app/components/ui/Backdrop";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import WakeList from "../ui/WakeList";
import type { ToolGroup } from "./platformLayers";
import { toolIconPath } from "./toolIcons";

const SCREENS_PER_TOOL = 0.34;

export default function ToolHelix({ group }: { group: ToolGroup }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const count = group.tools.length;
  const span = Math.max(1, count - 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const node = wrapper.current;
    const target = stage.current;
    if (!node || !target) return;
    let frame = 0;
    let current = 0;
    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -box.top / Math.max(1, box.height - window.innerHeight)));
      target.style.setProperty("--p", progress.toFixed(4));
      const next = Math.round(progress * span);
      if (next !== current) {
        current = next;
        setActive(next);
      }
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
  }, [span]);

  const tool = group.tools[active];

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
    <div ref={wrapper} className="relative border-t border-white/10" style={{ height: `${count * SCREENS_PER_TOOL * 100 + 100}svh` }}>
      <div
        ref={stage}
        className="helix-stage sticky top-0 isolate grid h-svh grid-rows-[auto_1fr] items-center gap-4 overflow-hidden pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-1 lg:gap-12 lg:pt-0"
        style={{ "--span": span, "--p": 0 } as CSSProperties}
      >
        <Backdrop name="orbital-rings" strength={0.75} fade="both" />
        <div className="relative z-10 max-lg:text-center">
          <h3 className="text-2xl font-extralight uppercase leading-[1.1] tracking-[0.1em] md:text-3xl">{group.title}</h3>
          <p className="mt-3 text-xs uppercase tracking-[0.28em] text-[#E97868]">
            {group.upcoming ? "On the way" : `${String(active + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`}
          </p>
          <div key={tool.name} className="helix-copy mt-8 max-lg:hidden">
            <p className="text-xl font-light uppercase tracking-[0.1em] md:text-2xl">{tool.name}</p>
            {tool.note && <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-[#FAFAF9]/70 md:text-base">{tool.note}</p>}
            {tool.parts && <p className="mt-3 text-sm text-[#FAFAF9]/50">{tool.parts.join(" / ")}</p>}
          </div>
        </div>

        <div className="helix relative h-full min-h-0">
          <div aria-hidden="true" className="helix-strand absolute inset-0" />
          {group.tools.map((item, index) => (
            <div
              key={item.name}
              data-front={index === active ? "true" : "false"}
              style={{ "--i": index } as CSSProperties}
              className="helix-item"
            >
              <span className="helix-tile">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={toolIconPath(item.name)} />
                </svg>
              </span>
              <span className="helix-name">{item.name}</span>
            </div>
          ))}
        </div>

        <div key={`${tool.name}-m`} className="helix-copy relative z-10 px-6 pb-8 text-center lg:hidden">
          <p className="text-lg font-light uppercase tracking-[0.1em]">{tool.name}</p>
          {tool.note && <p className="mx-auto mt-2 max-w-[34ch] text-sm leading-relaxed text-[#FAFAF9]/70">{tool.note}</p>}
        </div>
      </div>
    </div>
  );
}
