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

type Shape = { lines: Line[]; nodes: Point[] };

function buildSheets(): Shape {
  const lines: Line[] = [];
  const nodes: Point[] = [];
  for (let i = 0; i < 4; i++) {
    const [cx, cy, cz] = [i * 0.16 - 0.24, -i * 0.1 + 0.15, i * 0.46 - 0.7];
    lines.push(...box(cx, cy, cz, 2.2, 2.9, 0.06));
    for (let c = 1; c < 6; c++) lines.push([[cx - 1.1 + (c * 2.2) / 6, cy - 1.45, cz + 0.03], [cx - 1.1 + (c * 2.2) / 6, cy + 1.45, cz + 0.03]]);
    for (let r = 1; r < 8; r++) lines.push([[cx - 1.1, cy - 1.45 + (r * 2.9) / 8, cz + 0.03], [cx + 1.1, cy - 1.45 + (r * 2.9) / 8, cz + 0.03]]);
    nodes.push([cx - 1.1, cy + 1.45, cz], [cx + 1.1, cy + 1.45, cz], [cx - 1.1, cy - 1.45, cz], [cx + 1.1, cy - 1.45, cz]);
  }
  return { lines, nodes };
}

function icosphere(radius: number, levels: number): { vertices: Point[]; edges: [number, number][] } {
  const seed: Point[] = [];
  for (const a of [-1, 1]) for (const b of [-GOLDEN, GOLDEN]) seed.push([0, a, b], [a, b, 0], [b, 0, a]);
  const unit = (p: Point): Point => {
    const length = Math.hypot(p[0], p[1], p[2]);
    return [(p[0] / length) * radius, (p[1] / length) * radius, (p[2] / length) * radius];
  };
  const vertices = seed.map(unit);
  const reach = 2 * radius / Math.hypot(1, GOLDEN) * 1.02;
  let faces: [number, number, number][] = [];
  for (let i = 0; i < vertices.length; i++) for (let j = i + 1; j < vertices.length; j++) for (let k = j + 1; k < vertices.length; k++) {
    const close = (u: number, v: number) => Math.hypot(vertices[u][0] - vertices[v][0], vertices[u][1] - vertices[v][1], vertices[u][2] - vertices[v][2]) < reach;
    if (close(i, j) && close(j, k) && close(i, k)) faces.push([i, j, k]);
  }
  for (let level = 0; level < levels; level++) {
    const cache = new Map<string, number>();
    const middle = (u: number, v: number) => {
      const key = u < v ? `${u}-${v}` : `${v}-${u}`;
      const found = cache.get(key);
      if (found !== undefined) return found;
      vertices.push(unit([(vertices[u][0] + vertices[v][0]) / 2, (vertices[u][1] + vertices[v][1]) / 2, (vertices[u][2] + vertices[v][2]) / 2]));
      cache.set(key, vertices.length - 1);
      return vertices.length - 1;
    };
    const next: [number, number, number][] = [];
    faces.forEach(([u, v, w]) => {
      const [uv, vw, wu] = [middle(u, v), middle(v, w), middle(w, u)];
      next.push([u, uv, wu], [v, vw, uv], [w, wu, vw], [uv, vw, wu]);
    });
    faces = next;
  }
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  faces.forEach(([u, v, w]) => [[u, v], [v, w], [w, u]].forEach(([x, y]) => {
    const key = x < y ? `${x}-${y}` : `${y}-${x}`;
    if (!seen.has(key)) {
      seen.add(key);
      edges.push([x, y]);
    }
  }));
  return { vertices, edges };
}

function buildNetwork(): Shape {
  const outer = icosphere(1.8, 1);
  const inner = icosphere(0.85, 0);
  const lines: Line[] = [];
  outer.edges.forEach(([u, v]) => lines.push([outer.vertices[u], outer.vertices[v]]));
  inner.edges.forEach(([u, v]) => lines.push([inner.vertices[u], inner.vertices[v]]));
  for (let i = 0; i < 12; i++) lines.push([inner.vertices[i], outer.vertices[i]]);
  return { lines, nodes: [...outer.vertices, ...inner.vertices] };
}

function buildGlobe(): Shape {
  const lines: Line[] = [];
  const nodes: Point[] = [];
  const radius = 1.8;
  const onSphere = (phi: number, theta: number): Point => [radius * Math.cos(phi) * Math.cos(theta), radius * Math.sin(phi), radius * Math.cos(phi) * Math.sin(theta)];
  for (let lat = -75; lat <= 75; lat += 15) {
    const ring: Line = [];
    for (let k = 0; k <= 64; k++) ring.push(onSphere((lat * Math.PI) / 180, (k / 64) * Math.PI * 2));
    lines.push(ring);
  }
  for (let m = 0; m < 24; m++) {
    const meridian: Line = [];
    for (let k = 0; k <= 48; k++) meridian.push(onSphere(-Math.PI / 2 + (k / 48) * Math.PI, (m / 24) * Math.PI * 2));
    lines.push(meridian);
  }
  for (let lat = -60; lat <= 60; lat += 30) for (let m = 0; m < 24; m += 4) nodes.push(onSphere((lat * Math.PI) / 180, ((m + (lat / 30 + 2) % 2 * 2) / 24) * Math.PI * 2));
  return { lines, nodes };
}

const shapes: Shape[] = [buildSheets(), buildNetwork(), buildGlobe()];

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

      const center = [wide ? width * 0.4 : width * 0.5, wide ? height * 0.5 : height * 0.42];
      const bob = Math.sin(now / 1800) * 10 * unit;
      shapes.forEach(({ lines, nodes }, index) => {
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
          const scale = (focal * (wide ? 0.85 : 0.9)) / (rz2 + 6);
          return [center[0] + rx * scale, center[1] + ry * scale + bob + lift, rz2, scale] as const;
        };
        const dim = strength * (wide ? 1 : 0.7);
        const alphas = [0.9, 0.5, 0.2];
        const paths = [new Path2D(), new Path2D(), new Path2D()];
        lines.forEach((line) => {
          let [px, py, pz] = project(line[0]);
          for (let i = 1; i < line.length; i++) {
            const [sx, sy, sz] = project(line[i]);
            const depth = (pz + sz) / 2;
            const bucket = depth < -0.6 ? 0 : depth < 0.7 ? 1 : 2;
            paths[bucket].moveTo(px, py);
            paths[bucket].lineTo(sx, sy);
            [px, py, pz] = [sx, sy, sz];
          }
        });
        context.lineWidth = 0.9;
        paths.forEach((path, bucket) => {
          context.strokeStyle = `rgba(120, 175, 255, ${alphas[bucket] * dim})`;
          context.shadowColor = "rgba(70, 130, 255, 0.9)";
          context.shadowBlur = bucket === 0 ? 8 : 0;
          context.stroke(path);
        });
        context.shadowBlur = 0;
        nodes.forEach((node) => {
          const [sx, sy, sz, scale] = project(node);
          const near = Math.min(1, Math.max(0.2, 1 - (sz + 2) / 4));
          const radius = Math.max(1.1, scale * 0.045) * (0.6 + near * 0.6);
          context.fillStyle = `rgba(200, 225, 255, ${near * dim})`;
          context.shadowColor = "rgba(90, 150, 255, 1)";
          context.shadowBlur = near > 0.6 ? 10 : 0;
          context.beginPath();
          context.arc(sx, sy, radius, 0, Math.PI * 2);
          context.fill();
        });
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
