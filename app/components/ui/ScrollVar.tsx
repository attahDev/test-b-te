"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollVarProps = {
  mode?: "pass" | "leave" | "pin";
  className?: string;
  children: ReactNode;
};

export default function ScrollVar({ mode = "pass", className = "", children }: ScrollVarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--p", mode === "leave" ? "0" : "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = node.getBoundingClientRect();
      const view = window.innerHeight;
      let progress: number;
      if (mode === "leave") progress = -box.top / view;
      else if (mode === "pin") progress = -box.top / Math.max(1, box.height - view);
      else progress = (view - box.top) / (view + box.height);
      node.style.setProperty("--p", Math.min(1, Math.max(0, progress)).toFixed(4));
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
  }, [mode]);

  return (
    <div ref={ref} className={className} style={{ "--p": mode === "leave" ? 0 : 1 } as React.CSSProperties}>
      {children}
    </div>
  );
}
