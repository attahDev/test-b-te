"use client";

// Canvas solid chessboard: the board turns so the active step's piece sits front and centre.
import { useEffect, useRef } from "react";

type Point = [number, number, number];
type Face = Point[];
type Piece = {
  profile: [number, number][];
  bands?: [number, number][][];
  boxes?: [number, number, number, number, number, number][];
  spikes?: [number, number, number, number, number][];
  outline?: [number, number][];
};

const TAU = Math.PI * 2;
const SIDES = 20;
const LIGHT: Point = [-0.45, 0.75, 0.5];
const COLORS = { still: [201, 203, 212], active: [238, 128, 112] };

const pawn: Piece = { profile: [[0.38, 0], [0.38, 0.08], [0.26, 0.16], [0.16, 0.5], [0.26, 0.56], [0.2, 0.62], [0.24, 0.72], [0.22, 0.82], [0.14, 0.9], [0, 0.94]] };

const ringOf = (radius: number, height: number, count: number, size: number) =>
  Array.from({ length: count }, (_, i) => {
    const a = (i / count) * TAU;
    return [Math.cos(a) * radius, height, Math.sin(a) * radius, size, size * 2.4] as [number, number, number, number, number];
  });

const pieces: Piece[] = [
  pawn,
  {
    profile: [[0.4, 0], [0.4, 0.08], [0.3, 0.18], [0.26, 0.28], [0, 0.28]],
    outline: [[-0.22, 0.28], [-0.2, 0.6], [-0.1, 0.85], [-0.12, 1], [0, 1.15], [0.1, 1.2], [0.2, 1], [0.34, 0.82], [0.36, 0.72], [0.2, 0.76], [0.1, 0.7], [0.2, 0.5], [0.24, 0.28]],
  },
  { profile: [[0.4, 0], [0.4, 0.08], [0.28, 0.18], [0.14, 0.6], [0.3, 0.7], [0.14, 0.78], [0.16, 0.9], [0.22, 1.05], [0.16, 1.22], [0.06, 1.34], [0, 1.4]] },
  { ...pawn, bands: [[[0.66, 0.46], [0.66, 0.54], [0.5, 0.54], [0.5, 0.46], [0.66, 0.46]]] },
  {
    profile: [[0.42, 0], [0.42, 0.08], [0.3, 0.18], [0.22, 0.65], [0.34, 0.72], [0.34, 1], [0.26, 1], [0.26, 0.92], [0, 0.92]],
    boxes: [0, 1, 2, 3].map((i) => [Math.cos((i / 4) * TAU) * 0.3, 1.07, Math.sin((i / 4) * TAU) * 0.3, 0.1, 0.07, 0.1]),
  },
  {
    profile: [[0.44, 0], [0.44, 0.08], [0.3, 0.2], [0.15, 0.8], [0.3, 0.9], [0.14, 0.98], [0.22, 1.2], [0.34, 1.42], [0.2, 1.44], [0.1, 1.5], [0, 1.52]],
    spikes: ringOf(0.28, 1.42, 8, 0.05),
  },
  {
    profile: [[0.46, 0], [0.46, 0.08], [0.32, 0.2], [0.16, 0.9], [0.32, 1], [0.15, 1.08], [0.24, 1.3], [0.32, 1.5], [0.18, 1.52], [0, 1.54]],
    boxes: [[0, 1.68, 0, 0.05, 0.16, 0.05], [0, 1.74, 0, 0.14, 0.04, 0.05]],
  },
];

const at = (radius: number, height: number, a: number): Point => [Math.cos(a) * radius, height, Math.sin(a) * radius];

function lathe(profile: [number, number][]): Face[] {
  const faces: Face[] = [];
  for (let i = 0; i < profile.length - 1; i++) {
    const [r1, h1] = profile[i];
    const [r2, h2] = profile[i + 1];
    for (let s = 0; s < SIDES; s++) {
      const a = (s / SIDES) * TAU;
      const b = ((s + 1) / SIDES) * TAU;
      faces.push([at(r1, h1, a), at(r1, h1, b), at(r2, h2, b), at(r2, h2, a)]);
    }
  }
  return faces;
}

function box([cx, cy, cz, sx, sy, sz]: number[]): Face[] {
  const c = (x: number, y: number, z: number): Point => [cx + x * sx, cy + y * sy, cz + z * sz];
  return [
    [c(-1, -1, 1), c(1, -1, 1), c(1, 1, 1), c(-1, 1, 1)],
    [c(-1, -1, -1), c(-1, 1, -1), c(1, 1, -1), c(1, -1, -1)],
    [c(-1, 1, -1), c(-1, 1, 1), c(1, 1, 1), c(1, 1, -1)],
    [c(-1, -1, -1), c(1, -1, -1), c(1, -1, 1), c(-1, -1, 1)],
    [c(-1, -1, -1), c(-1, -1, 1), c(-1, 1, 1), c(-1, 1, -1)],
    [c(1, -1, -1), c(1, 1, -1), c(1, 1, 1), c(1, -1, 1)],
  ];
}

function spike([cx, cy, cz, size, rise]: number[]): Face[] {
  const base: Point[] = [[cx - size, cy, cz - size], [cx + size, cy, cz - size], [cx + size, cy, cz + size], [cx - size, cy, cz + size]];
  const tip: Point = [cx, cy + rise, cz];
  return base.map((p, i) => [p, base[(i + 1) % 4], tip]);
}

function extrude(outline: [number, number][]): Face[] {
  const depth = 0.13;
  const faces: Face[] = [outline.map(([x, y]) => [x, y, depth] as Point), outline.map(([x, y]) => [x, y, -depth] as Point)];
  outline.forEach(([x, y], i) => {
    const [nx, ny] = outline[(i + 1) % outline.length];
    faces.push([[x, y, depth], [nx, ny, depth], [nx, ny, -depth], [x, y, -depth]]);
  });
  return faces;
}

const solids: Face[][] = pieces.map((piece) => [
  ...lathe(piece.profile),
  ...(piece.bands ?? []).flatMap(lathe),
  ...(piece.boxes ?? []).flatMap(box),
  ...(piece.spikes ?? []).flatMap(spike),
  ...(piece.outline ? extrude(piece.outline) : []),
]);

const lightLength = Math.hypot(...LIGHT);

function brightness(face: Face): number {
  const [a, b, c] = face;
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  let n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const size = Math.hypot(n[0], n[1], n[2]) || 1;
  n = n.map((value) => value / size);
  const facing = n[2] < 0 && Math.abs(n[2]) > 0.2 ? -1 : 1;
  const lit = (facing * (n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2])) / lightLength;
  return 0.3 + 0.7 * Math.max(0, Math.abs(lit) * 0.6 + lit * 0.4);
}

const shades = solids.map((faces) => faces.map(brightness));

export default function ChessScene({ active, className = "" }: { active: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = pieces.length;
    const goalFor = (i: number) => (i === activeRef.current ? 2.1 : 1.05);
    const scales: number[] = pieces.map((_, i) => goalFor(i));
    let yaw = (-activeRef.current / count) * TAU;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const pitch = 0.62;
    const distance = 13;
    const project = (x: number, y: number, z: number): [number, number, number] => {
      const depth = distance - y * Math.sin(pitch) - z * Math.cos(pitch);
      const focal = Math.min(width * 1.05, height * 1.5);
      const viewY = y * Math.cos(pitch) - z * Math.sin(pitch);
      return [width / 2 + (focal * x) / depth, height * 0.58 - (focal * viewY) / depth, depth];
    };
    const turn = (x: number, z: number): [number, number] => [x * Math.cos(yaw) + z * Math.sin(yaw), -x * Math.sin(yaw) + z * Math.cos(yaw)];
    const path = (points: [number, number, number][]) => {
      context.beginPath();
      points.forEach(([x, y], k) => (k ? context.lineTo(x, y) : context.moveTo(x, y)));
      context.closePath();
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visible || !width) return;
      const target = (-activeRef.current / count) * TAU;
      const delta = ((((target - yaw + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
      yaw += reduced ? delta : delta * 0.07;
      scales.forEach((value, i) => {
        scales[i] = reduced ? goalFor(i) : value + (goalFor(i) - value) * 0.08;
      });

      context.clearRect(0, 0, width, height);
      context.lineJoin = "round";

      const corners: [number, number][] = [[-4, -4], [4, -4], [4, 4], [-4, 4]];
      corners.forEach(([x, z], i) => {
        const [nx, nz] = corners[(i + 1) % 4];
        const quad = [[x, 0, z], [nx, 0, nz], [nx, -0.35, nz], [x, -0.35, z]].map(([px, py, pz]) => {
          const [rx, rz] = turn(px, pz);
          return project(rx, py, rz);
        });
        path(quad);
        context.fillStyle = "#07050a";
        context.fill();
      });

      for (let i = -4; i < 4; i++) {
        for (let j = -4; j < 4; j++) {
          const quad = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([x, z]) => {
            const [rx, rz] = turn(x, z);
            return project(rx, 0, rz);
          });
          path(quad);
          context.fillStyle = (i + j) & 1 ? "#19151d" : "#25202a";
          context.fill();
        }
      }
      const edge = corners.map(([x, z]) => {
        const [rx, rz] = turn(x, z);
        return project(rx, 0, rz);
      });
      path(edge);
      context.strokeStyle = "rgba(255,255,255,0.12)";
      context.lineWidth = 1;
      context.stroke();

      const placed = pieces.map((_, i) => {
        const a = (i / count) * TAU;
        const [cx, cz] = turn(Math.sin(a) * 2.7, Math.cos(a) * 2.7);
        return { i, cx, cz, scale: scales[i], isActive: i === activeRef.current };
      });

      placed.forEach(({ cx, cz, scale, isActive }) => {
        const centre = project(cx, 0, cz);
        const reach = (project(cx + 0.9 * scale, 0, cz)[0] - centre[0]) * 1.1;
        context.save();
        context.translate(centre[0], centre[1]);
        context.scale(1, 0.55);
        const glow = context.createRadialGradient(0, 0, 0, 0, 0, reach);
        glow.addColorStop(0, isActive ? "rgba(232,119,106,0.5)" : "rgba(0,0,0,0.55)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(0, 0, reach, 0, TAU);
        context.fill();
        context.restore();
      });

      const drawn: { points: [number, number, number][]; depth: number; fill: string }[] = [];
      placed.forEach(({ i, cx, cz, scale, isActive }) => {
        const [r, g, b] = isActive ? COLORS.active : COLORS.still;
        const fade = isActive ? 1 : Math.min(1, Math.max(0.55, 0.8 + cz * 0.06));
        solids[i].forEach((face, f) => {
          const light = shades[i][f] * fade;
          const points = face.map(([x, y, z]) => project(cx + x * scale, y * scale, cz + z * scale));
          const depth = points.reduce((sum, p) => sum + p[2], 0) / points.length;
          drawn.push({ points, depth, fill: `rgb(${Math.round(r * light)},${Math.round(g * light)},${Math.round(b * light)})` });
        });
      });
      drawn.sort((p, q) => q.depth - p.depth);
      context.lineWidth = 0.6;
      drawn.forEach(({ points, fill }) => {
        path(points);
        context.fillStyle = fill;
        context.strokeStyle = fill;
        context.fill();
        context.stroke();
      });
    };

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
