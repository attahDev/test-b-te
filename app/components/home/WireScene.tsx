// Canvas backdrop of a dotted rolling floor.
"use client";

import { useEffect, useRef } from "react";

export default function WireScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const holder = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !holder || !context) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let last = performance.now();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = holder.clientWidth;
      height = holder.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (now: number) => {
      const step = Math.min(0.05, (now - last) / 1000);
      last = now;
      const scrolled = window.scrollY;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const wide = width > 900;
      const unit = Math.min(width, height) / 900;
      const horizon = height * 0.3;
      const focal = 640 * unit * (wide ? 1 : 0.9);
      const drift = (now / 1000) * 0.5 + scrolled * 0.004;
      const gap = 0.8;
      const offset = drift % gap;
      for (let row = 0; row < 54; row++) {
        const z = 2 + row * gap - offset;
        const depth = focal / z;
        const fade = Math.min(1, (42 - z) / 24) * Math.min(1, (z - 1.6) / 2);
        for (let col = -24; col <= 24; col++) {
          const x = col * gap;
          const wave = Math.sin(x * 0.45 + (z + drift) * 0.5) * 0.22;
          const sx = width / 2 + x * depth;
          const sy = horizon + (1.9 - wave) * depth;
          if (sx < -10 || sx > width + 10 || sy > height + 10) continue;
          const size = Math.max(0.8, depth * 0.03);
          context.fillStyle = `rgba(90, 150, 255, ${0.9 * fade})`;
          context.fillRect(sx - size / 2, sy - size / 2, size * 1.6, size);
        }
      }

      context.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    const sizer = new ResizeObserver(resize);
    sizer.observe(holder);
    if (still) {
      draw(performance.now());
      return () => sizer.disconnect();
    }
    const watcher = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
    watcher.observe(holder);
    return () => {
      stop();
      sizer.disconnect();
      watcher.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
