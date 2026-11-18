// Canvas backdrop of a dotted rolling floor with a rotating wireframe object per service.
"use client";

import { useEffect, useRef } from "react";

type Point = [number, number, number];
type Line = Point[];

const GOLDEN = (1 + Math.sqrt(5)) / 2;

function box(cx: number, cy: number, cz: number, w: number, h: number, d: number): Line[] {
  const [x0, x1, y0, y1, z0, z1] = [cx - w / 2, cx + w / 2, cy - h / 2, cy + h / 2, cz - d / 2, cz + d / 2];
  const front: Line = [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [x0, y0, z1]];
  const back: Line = [[x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z0]];
  const links: Line[] = [[[x0, y0, z0], [x0, y0, z1]], [[x1, y0, z0], [x1, y0, z1]], [[x1, y1, z0], [x1, y1, z1]], [[x0, y1, z0], [x0, y1, z1]]];
  return [front, back, ...links];
}

function buildSheets(): Line[] {
  const lines: Line[] = [];
  for (let i = 0; i < 4; i++) lines.push(...box(i * 0.16 - 0.24, -i * 0.1 + 0.15, i * 0.46 - 0.7, 2.2, 2.9, 0.06));
  for (let row = 0; row < 6; row++) {
    const y = 0.9 - row * 0.38;
    lines.push([[-0.8 + 0.4, y, 0.78], [0.75 - (row % 3) * 0.3, y, 0.78]]);
  }
  lines.push(...box(0.35, -0.95, 0.82, 0.7, 0.5, 0.02));
  return lines;
}

function buildNetwork(): Line[] {
  const raw: Point[] = [];
  for (const a of [-1, 1]) for (const b of [-GOLDEN, GOLDEN]) {
    raw.push([0, a, b], [a, b, 0], [b, 0, a]);
  }
  const radius = 1.7;
  const nodes = raw.map(([x, y, z]) => {
    const length = Math.hypot(x, y, z);
    return [(x / length) * radius, (y / length) * radius, (z / length) * radius] as Point;
  });
  const lines: Line[] = [];
  const shortest = 2 * radius / Math.hypot(1, GOLDEN) * 1.02;
  nodes.forEach((p, i) => {
    nodes.slice(i + 1).forEach((q) => {
      if (Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < shortest) lines.push([p, q]);
    });
    lines.push([[0, 0, 0], p]);
    const s = 0.14;
    lines.push([[p[0] - s, p[1], p[2]], [p[0] + s, p[1], p[2]]], [[p[0], p[1] - s, p[2]], [p[0], p[1] + s, p[2]]], [[p[0], p[1], p[2] - s], [p[0], p[1], p[2] + s]]);
  });
  return lines;
}

function buildGlobe(): Line[] {
  const lines: Line[] = [];
  const radius = 1.8;
  for (let lat = -60; lat <= 60; lat += 30) {
    const ring: Line = [];
    const phi = (lat * Math.PI) / 180;
    for (let k = 0; k <= 48; k++) {
      const theta = (k / 48) * Math.PI * 2;
      ring.push([radius * Math.cos(phi) * Math.cos(theta), radius * Math.sin(phi), radius * Math.cos(phi) * Math.sin(theta)]);
    }
    lines.push(ring);
  }
  for (let m = 0; m < 10; m++) {
    const theta = (m / 10) * Math.PI * 2;
    const meridian: Line = [];
    for (let k = 0; k <= 32; k++) {
      const phi = -Math.PI / 2 + (k / 32) * Math.PI;
      meridian.push([radius * Math.cos(phi) * Math.cos(theta), radius * Math.sin(phi), radius * Math.cos(phi) * Math.sin(theta)]);
    }
    lines.push(meridian);
  }
  return lines;
}

const shapes: Line[][] = [buildSheets(), buildNetwork(), buildGlobe()];

export default function WireScene({ active }: { active: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    const holder = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !holder || !context) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fades = [1, 0, 0];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let spin = 0.6;
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
      spin += step * 0.22;
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

      const center = [wide ? width * 0.23 : width * 0.5, wide ? height * 0.5 : height * 0.3];
      const bob = Math.sin(now / 1800) * 10 * unit;
      shapes.forEach((lines, index) => {
        fades[index] += ((index === activeRef.current ? 1 : 0) - fades[index]) * Math.min(1, step * 4);
        const strength = fades[index];
        if (strength < 0.02) return;
        const turn = spin + scrolled * 0.0012 + index;
        const [sinT, cosT, tilt] = [Math.sin(turn), Math.cos(turn), 0.42];
        const [sinX, cosX] = [Math.sin(tilt), Math.cos(tilt)];
        const lift = (1 - strength) * 40 * unit;
        const project = ([px, py, pz]: Point) => {
          const rx = px * cosT + pz * sinT;
          const rz = -px * sinT + pz * cosT;
          const ry = py * cosX - rz * sinX;
          const rz2 = py * sinX + rz * cosX;
          const scale = (focal * (wide ? 0.72 : 0.9)) / (rz2 + 6);
          return [center[0] + rx * scale, center[1] + ry * scale + bob + lift] as const;
        };
        context.strokeStyle = `rgba(110, 165, 255, ${0.8 * strength * (wide ? 1 : 0.6)})`;
        context.shadowColor = "rgba(70, 130, 255, 0.9)";
        context.shadowBlur = 7;
        context.lineWidth = 1;
        context.beginPath();
        lines.forEach((line) => {
          line.forEach((point, i) => {
            const [sx, sy] = project(point);
            if (i === 0) context.moveTo(sx, sy);
            else context.lineTo(sx, sy);
          });
        });
        context.stroke();
        context.shadowBlur = 0;
      });
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
      fades[0] = 1;
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
