"use client";

// Canvas night sky with three parallax star layers, a tinted glow per stage and the odd shooting star.
import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";

type Props = { progress: MutableRefObject<number> };

const tints = [
  [70, 120, 255],
  [120, 95, 255],
  [200, 95, 175],
  [233, 120, 104],
];

export default function StarField({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const holder = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !holder || !context) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = window.innerWidth < 700 ? 190 : 380;
    const stars = Array.from({ length: total }, () => {
      const depth = [0.25, 0.55, 1][Math.floor(Math.random() * 3)];
      return { x: Math.random(), y: Math.random(), depth, phase: Math.random() * 6.28, speed: 0.6 + Math.random() * 1.6, warm: Math.random() < 0.12 };
    });
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let streak = { age: 99, x: 0, y: 0 };
    let nextStreak = 2.5;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = holder.clientWidth;
      height = holder.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const tintAt = (p: number) => {
      const spot = Math.min(2.999, Math.max(0, p * 3));
      const from = tints[Math.floor(spot)];
      const to = tints[Math.floor(spot) + 1];
      const mix = spot - Math.floor(spot);
      return from.map((value, i) => Math.round(value + (to[i] - value) * mix));
    };

    const draw = (time: number) => {
      const seconds = time / 1000;
      const p = progress.current;
      context.clearRect(0, 0, width, height);
      const [r, g, b] = tintAt(p);

      const glow = context.createRadialGradient(width * 0.5, height * 0.52, 0, width * 0.5, height * 0.52, Math.max(width, height) * 0.55);
      glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.22)`);
      glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.07)`);
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const floor = context.createLinearGradient(0, height * 0.6, 0, height);
      floor.addColorStop(0, "rgba(0, 0, 0, 0)");
      floor.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.14)`);
      context.fillStyle = floor;
      context.fillRect(0, height * 0.6, width, height * 0.4);

      for (const star of stars) {
        const shift = (p * 520 * star.depth) % height;
        const y = (((star.y * height - shift) % height) + height) % height;
        const x = (star.x * width + Math.sin(seconds * 0.05 + star.phase) * 6 * star.depth + width) % width;
        const twinkle = still ? 0.8 : 0.55 + 0.45 * Math.sin(seconds * star.speed + star.phase);
        const size = 0.6 + star.depth * 1.5;
        context.fillStyle = star.warm ? `rgba(255, 200, 170, ${twinkle})` : `rgba(210, 225, 255, ${twinkle * (0.45 + star.depth * 0.55)})`;
        context.beginPath();
        context.arc(x, y, size, 0, 6.283);
        context.fill();
      }

      if (!still) {
        if (seconds > nextStreak) {
          streak = { age: 0, x: width * (0.2 + Math.random() * 0.7), y: height * Math.random() * 0.4 };
          nextStreak = seconds + 5 + Math.random() * 6;
        }
        streak.age += 0.016;
        if (streak.age < 0.7) {
          const travel = streak.age * 900;
          const headX = streak.x - travel;
          const headY = streak.y + travel * 0.42;
          const tail = context.createLinearGradient(headX, headY, headX + 140, headY - 59);
          tail.addColorStop(0, "rgba(255, 255, 255, 0.9)");
          tail.addColorStop(1, "rgba(255, 255, 255, 0)");
          context.strokeStyle = tail;
          context.lineWidth = 1.4;
          context.beginPath();
          context.moveTo(headX, headY);
          context.lineTo(headX + 140, headY - 59);
          context.stroke();
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
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
      draw(0);
      return () => sizer.disconnect();
    }
    const watcher = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
    watcher.observe(holder);
    return () => {
      stop();
      sizer.disconnect();
      watcher.disconnect();
    };
  }, [progress]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
