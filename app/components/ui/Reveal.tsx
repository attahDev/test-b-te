"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = { children: ReactNode; className?: string; threshold?: number };

export default function Reveal({ children, className = "", threshold = 0.25 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShown(true);
      io.disconnect();
    }, { threshold });
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-own-reveal="" data-in={shown ? "true" : undefined} className={className}>
      {children}
    </div>
  );
}
