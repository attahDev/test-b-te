"use client";

// Canvas wireframe chessboard: the board turns so the active step's piece sits front and centre.
import { useEffect, useRef } from "react";

type Point = [number, number, number];
type Piece = {
  profile: [number, number][];
  lines?: [Point, Point][];
  rings?: [number, number][];
  outline?: [number, number][];
};

const TAU = Math.PI * 2;
const CORAL = "232,119,106";
const SIDES = 16;

const pawn: Piece = { profile: [[0.38, 0], [0.38, 0.08], [0.26, 0.16], [0.16, 0.5], [0.26, 0.56], [0.2, 0.62], [0.24, 0.72], [0.22, 0.82], [0.14, 0.9], [0, 0.94]] };

const polar = (radius: number, height: number, count: number, rise: number): [Point, Point][] =>
  Array.from({ length: count }, (_, i) => {
    const a = (i / count) * TAU;
    return [[Math.cos(a) * radius, height, Math.sin(a) * radius], [Math.cos(a) * radius, height + rise, Math.sin(a) * radius]] as [Point, Point];
  });

const pieces: Piece[] = [
  pawn,
  {
    profile: [[0.4, 0], [0.4, 0.08], [0.3, 0.18], [0.26, 0.28]],
    outline: [[-0.22, 0.28], [-0.2, 0.6], [-0.1, 0.85], [-0.12, 1], [0, 1.15], [0.1, 1.2], [0.2, 1], [0.34, 0.82], [0.36, 0.72], [0.2, 0.76], [0.1, 0.7], [0.2, 0.5], [0.24, 0.28]],
  },
  { profile: [[0.4, 0], [0.4, 0.08], [0.28, 0.18], [0.14, 0.6], [0.3, 0.7], [0.14, 0.78], [0.16, 0.9], [0.22, 1.05], [0.16, 1.22], [0.06, 1.34], [0, 1.4]] },
  { ...pawn, rings: [[0.58, 0.5]] },
  {
    profile: [[0.42, 0], [0.42, 0.08], [0.3, 0.18], [0.22, 0.65], [0.34, 0.72], [0.34, 1], [0.26, 1], [0.26, 0.92]],
    lines: polar(0.34, 1, 6, 0.14),
  },
  {
    profile: [[0.44, 0], [0.44, 0.08], [0.3, 0.2], [0.15, 0.8], [0.3, 0.9], [0.14, 0.98], [0.22, 1.2], [0.34, 1.42], [0.2, 1.44], [0.1, 1.5], [0, 1.52]],
    lines: polar(0.34, 1.42, 8, 0.14),
  },
  {
    profile: [[0.46, 0], [0.46, 0.08], [0.32, 0.2], [0.16, 0.9], [0.32, 1], [0.15, 1.08], [0.24, 1.3], [0.32, 1.5], [0.18, 1.52], [0, 1.54]],
    lines: [[[0, 1.54, 0], [0, 1.92, 0]], [[-0.14, 1.76, 0], [0.14, 1.76, 0]]],
  },
];

const ringAngle = (index: number, count: number) => (index / count) * TAU;

function pieceSegments(piece: Piece): [Point, Point][] {
  const segments: [Point, Point][] = [];
  const at = (radius: number, height: number, a: number): Point => [Math.cos(a) * radius, height, Math.sin(a) * radius];
  piece.profile.forEach(([radius, height], i) => {
    if (radius > 0.001) {
      for (let s = 0; s < SIDES; s++) segments.push([at(radius, height, (s / SIDES) * TAU), at(radius, height, ((s + 1) / SIDES) * TAU)]);
    }
    const next = piece.profile[i + 1];
    if (next) for (let s = 0; s < SIDES; s += 2) segments.push([at(radius, height, (s / SIDES) * TAU), at(next[0], next[1], (s / SIDES) * TAU)]);
  });
  piece.rings?.forEach(([radius, height]) => {
    for (let s = 0; s < 24; s++) segments.push([at(radius, height, (s / 24) * TAU), at(radius, height, ((s + 1) / 24) * TAU)]);
  });
  piece.lines?.forEach((line) => segments.push(line));
  if (piece.outline) {
    const depth = 0.13;
    piece.outline.forEach(([x, y], i) => {
      const [nx, ny] = piece.outline![(i + 1) % piece.outline!.length];
      segments.push([[x, y, depth], [nx, ny, depth]], [[x, y, -depth], [nx, ny, -depth]], [[x, y, depth], [x, y, -depth]]);
    });
  }
  return segments;
}

const shapes = pieces.map(pieceSegments);

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
    const scales = pieces.map((_, i) => (i === activeRef.current ? 2.1 : 1.05));
    let yaw = -ringAngle(activeRef.current, count);
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
    const turn = (x: number, z: number, angle: number): [number, number] => [x * Math.cos(angle) + z * Math.sin(angle), -x * Math.sin(angle) + z * Math.cos(angle)];

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visible || !width) return;
      const target = -ringAngle(activeRef.current, count);
      const delta = ((((target - yaw + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
      yaw += reduced ? delta : delta * 0.07;
      scales.forEach((value, i) => {
        const goal = i === activeRef.current ? 2.1 : 1.05;
        scales[i] = reduced ? goal : value + (goal - value) * 0.08;
      });

      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      for (let i = -4; i < 4; i++) {
        for (let j = -4; j < 4; j++) {
          if ((i + j) & 1) continue;
          const quad = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([x, z]) => {
            const [rx, rz] = turn(x, z, yaw);
            return project(rx, 0, rz);
          });
          context.beginPath();
          quad.forEach(([x, y], k) => (k ? context.lineTo(x, y) : context.moveTo(x, y)));
          context.closePath();
          context.fillStyle = "rgba(255,255,255,0.035)";
          context.fill();
        }
      }
      context.beginPath();
      for (let k = -4; k <= 4; k++) {
        const lines: [number, number, number, number][] = [[k, -4, k, 4], [-4, k, 4, k]];
        lines.forEach(([x1, z1, x2, z2]) => {
          const [ax, az] = turn(x1, z1, yaw);
          const [bx, bz] = turn(x2, z2, yaw);
          const a = project(ax, 0, az);
          const b = project(bx, 0, bz);
          context.moveTo(a[0], a[1]);
          context.lineTo(b[0], b[1]);
        });
      }
      context.strokeStyle = "rgba(255,255,255,0.09)";
      context.stroke();

      const order = pieces
        .map((_, i) => {
          const a = ringAngle(i, count);
          const [cx, cz] = turn(Math.sin(a) * 2.7, Math.cos(a) * 2.7, yaw);
          return { i, cx, cz };
        })
        .sort((p, q) => p.cz - q.cz);

      order.forEach(({ i, cx, cz }) => {
        const isActive = i === activeRef.current;
        const scale = scales[i];
        const shade = Math.min(1, Math.max(0.25, 0.75 + cz * 0.12));
        const color = isActive ? `rgba(${CORAL},1)` : `rgba(255,255,255,${(0.42 * shade).toFixed(3)})`;

        context.beginPath();
        for (let s = 0; s <= 40; s++) {
          const a = (s / 40) * TAU;
          const p = project(cx + Math.cos(a) * 0.6 * scale, 0, cz + Math.sin(a) * 0.6 * scale);
          if (s) context.lineTo(p[0], p[1]);
          else context.moveTo(p[0], p[1]);
        }
        context.strokeStyle = isActive ? `rgba(${CORAL},0.7)` : "rgba(255,255,255,0.12)";
        context.stroke();

        context.beginPath();
        shapes[i].forEach(([from, to]) => {
          const a = project(cx + from[0] * scale, from[1] * scale, cz + from[2] * scale);
          const b = project(cx + to[0] * scale, to[1] * scale, cz + to[2] * scale);
          context.moveTo(a[0], a[1]);
          context.lineTo(b[0], b[1]);
        });
        context.shadowColor = isActive ? `rgba(${CORAL},0.9)` : "transparent";
        context.shadowBlur = isActive ? 14 : 0;
        context.strokeStyle = color;
        context.stroke();
        context.shadowBlur = 0;
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
