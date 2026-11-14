"use client";

import { useEffect, useRef } from "react";

type AuroraProps = { tone?: "warm" | "cool"; className?: string };

export default function Aurora({ tone = "warm", className = "" }: AuroraProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      node.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" data-tone={tone} className={`aurora ${className}`}>
      <span className="aurora-band aurora-band-a" />
      <span className="aurora-band aurora-band-b" />
      <span className="aurora-band aurora-band-c" />
    </div>
  );
}
