"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const layersByPage: Record<string, string[]> = {
  "/": ["smoke-a", "smoke-b"],
  "/ecosystem": ["smoke-aurora", "smoke-b"],
  "/contact": ["smoke-waves", "smoke-a"],
};

export default function PageSmoke() {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  const layers = layersByPage[path] ?? layersByPage["/"];

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const room = document.documentElement.scrollHeight - window.innerHeight;
      node.style.setProperty("--pp", room > 0 ? (window.scrollY / room).toFixed(4) : "0");
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
  }, [path]);

  return (
    <div ref={ref} aria-hidden="true" className="canvas">
      {layers.map((name) => (
        <div key={name} className={`smoke ${name}`} />
      ))}
    </div>
  );
}
