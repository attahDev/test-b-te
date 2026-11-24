"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.pause();
  }, []);

  return (
    <video
      ref={video}
      aria-hidden="true"
      className="hero-image absolute inset-0 h-full w-full object-cover object-[68%_bottom] opacity-90 md:object-center [mask-image:linear-gradient(to_bottom,#000_55%,transparent_97%)]"
      src="/video/night-sky.mp4"
      poster="/video/night-sky.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
