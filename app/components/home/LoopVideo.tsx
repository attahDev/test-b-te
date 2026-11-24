"use client";

import { useEffect, useRef } from "react";

type Props = { className?: string; src?: string; poster?: string };

export default function LoopVideo({ className = "", src = "/video/night-sky.mp4", poster = "/video/night-sky.jpg" }: Props) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      node.pause();
      return;
    }
    const watcher = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) node.play().catch(() => undefined);
      else node.pause();
    });
    watcher.observe(node);
    return () => watcher.disconnect();
  }, []);

  return (
    <video
      ref={video}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
