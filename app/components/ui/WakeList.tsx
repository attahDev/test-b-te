"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type WakeItem = { key: string; title: string; text?: string; meta?: string; extra?: ReactNode };

type WakeListProps = {
  items: WakeItem[];
  size?: "large" | "small";
  onActive?: (index: number) => void;
  className?: string;
};

export default function WakeList({ items, size = "large", onActive, className = "" }: WakeListProps) {
  const [active, setActive] = useState(-1);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      setActive(-2);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = rows.current.indexOf(entry.target as HTMLLIElement);
          if (index < 0) continue;
          setActive(index);
          onActive?.(index);
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    rows.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, [onActive, items.length]);

  const titleSize = size === "large" ? "text-3xl sm:text-5xl lg:text-6xl" : "text-xl sm:text-2xl lg:text-3xl";

  return (
    <ol className={className}>
      {items.map((item, index) => {
        const lit = active === -2 || active === index;
        return (
          <li
            key={item.key}
            ref={(node) => {
              rows.current[index] = node;
            }}
            data-lit={lit ? "true" : "false"}
            className="wake-row py-5 sm:py-7"
          >
            <h3 className={`wake-title font-light uppercase leading-[1.05] tracking-[0.08em] ${titleSize}`}>{item.title}</h3>
            {(item.text || item.meta || item.extra) && (
              <div className="wake-body">
                <div>
                  {item.meta && <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[#E97868]">{item.meta}</p>}
                  {item.text && <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-[#FAFAF9]/75 sm:text-lg">{item.text}</p>}
                  {item.extra}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
