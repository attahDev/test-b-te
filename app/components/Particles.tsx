// Canvas field of slow glowing motes with depth layers, cursor drift and repel; pauses off screen.
"use client";

import { useEffect, useRef } from "react";

type ParticlesProps = { className?: string; paused?: boolean };

const COLOURS = [
  [233, 120, 104],
  [180, 205, 235],
  [250, 250, 249],
  [96, 150, 240],
  [60, 220, 180],
];

type Mote = { x: number; y: number; z: number; r: number; vx: number; vy: number; phase: number; speed: number; colour: number };

export default function Particles({ className = "", paused = false }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    pausedRef.current = paused;
    wakeRef.current();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sprites = COLOURS.map(([r, g, b]) => {
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 64;
      const sctx = sprite.getContext("2d")!;
      const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
      grad.addColorStop(0.25, `rgba(${r},${g},${b},0.55)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 64, 64);
      return sprite;
    });

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let visible = true;
    let motes: Mote[] = [];
    const pointer = { x: -9999, y: -9999, px: 0, py: 0, tx: 0, ty: 0 };

    function seed() {
      const count = Math.round(Math.min(150, Math.max(36, (w * h) / 11000)));
      motes = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 1.4 + z * 3.6,
          vx: (Math.random() - 0.5) * 6,
          vy: -(4 + z * 12),
          phase: Math.random() * Math.PI * 2,
          speed: 0.25 + Math.random() * 0.7,
          colour: [0, 1, 2, 3, 4, 4, 3, 1][Math.floor(Math.random() * 8)],
        };
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      seed();
      draw(performance.now());
    }

    function draw(now: number) {
      const t = now / 1000;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      pointer.px += (pointer.tx - pointer.px) * 0.06;
      pointer.py += (pointer.ty - pointer.py) * 0.06;
      for (const m of motes) {
        const twinkle = reduced.matches ? 0.8 : 0.55 + 0.45 * Math.sin(t * m.speed * 2 + m.phase);
        const sx = m.x + Math.sin(t * m.speed + m.phase) * (6 + m.z * 10) - pointer.px * (8 + m.z * 36);
        const sy = m.y - pointer.py * (8 + m.z * 36);
        const size = m.r * 6;
        ctx!.globalAlpha = (0.25 + m.z * 0.55) * twinkle;
        ctx!.drawImage(sprites[m.colour], sx - size / 2, sy - size / 2, size, size);
      }
      ctx!.globalAlpha = 1;
    }

    function step(now: number) {
      raf = 0;
      if (!visible || reduced.matches || pausedRef.current) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      for (const m of motes) {
        m.x += m.vx * dt * (0.4 + m.z);
        m.y += m.vy * dt;
        const dx = m.x - pointer.x;
        const dy = m.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150 && d2 > 1) {
          const d = Math.sqrt(d2);
          const push = ((150 - d) / 150) * 46 * dt * (0.4 + m.z);
          m.x += (dx / d) * push;
          m.y += (dy / d) * push;
        }
        if (m.y < -20) { m.y = h + 20; m.x = Math.random() * w; }
        if (m.x < -20) m.x = w + 20;
        else if (m.x > w + 20) m.x = -20;
      }
      draw(now);
      raf = requestAnimationFrame(step);
    }

    function wake() {
      if (reduced.matches || pausedRef.current) { draw(performance.now()); return; }
      if (!raf && visible) { last = 0; raf = requestAnimationFrame(step); }
    }

    function onPointer(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.tx = (pointer.x / rect.width - 0.5) * 2;
      pointer.ty = (pointer.y / rect.height - 0.5) * 2;
    }
    function onLeave() {
      pointer.x = pointer.y = -9999;
      pointer.tx = pointer.ty = 0;
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    wakeRef.current = wake;
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    reduced.addEventListener("change", wake);
    resize();
    wake();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      reduced.removeEventListener("change", wake);
      wakeRef.current = () => {};
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
