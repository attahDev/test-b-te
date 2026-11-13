"use client";

import { useEffect, useRef } from "react";

type Rgb = number[];
type AuroraCurtainsProps = { paused?: boolean; className?: string; palette?: [Rgb, Rgb, Rgb] };

const TEAL = [40, 214, 170];
const BLUE = [70, 128, 250];
const VIOLET = [150, 92, 240];
const SCALE = 0.25;
const STRIP = 2;

function mix(a: number[], b: number[], k: number) {
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

function ramp(p: number, [a, b, c]: Rgb[]) {
  return p < 0.5 ? mix(a, b, p * 2) : mix(b, c, (p - 0.5) * 2);
}

export default function AuroraCurtains({ paused = false, className = "", palette }: AuroraCurtainsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const wakeRef = useRef<() => void>(() => {});
  const targetRef = useRef<Rgb[]>(palette ?? [TEAL, BLUE, VIOLET]);

  useEffect(() => {
    targetRef.current = palette ?? [TEAL, BLUE, VIOLET];
    wakeRef.current();
  }, [palette]);

  useEffect(() => {
    pausedRef.current = paused;
    wakeRef.current();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let t = 22;
    const colors: Rgb[] = targetRef.current.map((color) => [...color]);
    let last = 0;
    let raf = 0;
    let visible = true;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = Math.max(40, Math.floor(rect.width * SCALE));
      h = Math.max(30, Math.floor(rect.height * SCALE));
      canvas!.width = w;
      canvas!.height = h;
      draw();
    }

    function blend(rate: number) {
      const target = targetRef.current;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) colors[i][j] += (target[i][j] - colors[i][j]) * rate;
    }

    function draw() {
      ctx!.globalCompositeOperation = "source-over";
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";
      const centre = 0.64 + 0.16 * Math.sin(t * 0.07);
      for (let layer = 0; layer < 2; layer++) {
        const off = layer * 1.7;
        const gain = layer === 0 ? 1.15 : 0.7;
        for (let x = 0; x < w; x += STRIP) {
          const u = x / w;
          const envelope = 0.16 + 0.84 * Math.exp(-((u - centre) ** 2) / (2 * 0.25 * 0.25));
          const rays =
            (0.5 + 0.5 * Math.sin(x * 0.34 + off + Math.sin(x * 0.05 + t * 0.55) * 3 + t * 0.35)) *
            (0.8 + 0.2 * Math.sin(x * 1.05 - t * 0.6 + off));
          const alpha = envelope * rays * rays * gain;
          if (alpha < 0.01) continue;
          const base = h * (0.52 + 0.09 * Math.sin(x * 0.02 + t * 0.22 + off));
          const height = h * (0.42 + 0.22 * Math.sin(x * 0.013 - t * 0.18 + off));
          const top = base - height;
          const bottom = base + h * 0.26;
          const [r, g, b] = ramp(0.5 + 0.5 * Math.sin(u * 2.4 + t * 0.07 + off), colors);
          const grad = ctx!.createLinearGradient(0, top, 0, bottom);
          grad.addColorStop(0, `rgba(${r | 0},${g | 0},${b | 0},0)`);
          grad.addColorStop(0.7, `rgba(${r | 0},${g | 0},${b | 0},${alpha})`);
          grad.addColorStop(1, `rgba(${r | 0},${g | 0},${b | 0},0)`);
          ctx!.fillStyle = grad;
          ctx!.fillRect(x, top, STRIP + 0.6, bottom - top);
        }
      }
    }

    function step(now: number) {
      raf = 0;
      if (!visible || reduced.matches || pausedRef.current) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      t += dt;
      last = now;
      blend(1 - Math.exp(-dt * 1.6));
      draw();
      raf = requestAnimationFrame(step);
    }

    function wake() {
      if (reduced.matches || pausedRef.current) { blend(1); if (w) draw(); return; }
      if (!raf && visible) { last = 0; raf = requestAnimationFrame(step); }
    }
    wakeRef.current = wake;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    reduced.addEventListener("change", wake);
    resize();
    wake();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      reduced.removeEventListener("change", wake);
      wakeRef.current = () => {};
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full blur-[14px] ${className}`}
    />
  );
}
