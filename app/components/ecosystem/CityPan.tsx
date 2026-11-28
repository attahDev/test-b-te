"use client";

// Scroll-scrubbed aerial pan of Manchester: draws a blend of two neighbouring frames to a cover-fit canvas
import { useEffect, useRef } from "react";

type Props = { progress: { current: number }; from: number; to: number; className?: string };

const frameCount = 106;
const framePath = (index: number) => `/pan/f${String(index + 1).padStart(3, "0")}.webp`;
const frames: (HTMLImageElement | null)[] = Array.from({ length: frameCount }, () => null);
let loading = false;

function loadFrames() {
  if (loading) return;
  loading = true;
  let next = 0;
  const pull = () => {
    if (next >= frameCount) return;
    const index = next;
    next += 1;
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      frames[index] = image;
      pull();
    };
    image.onerror = pull;
    image.src = framePath(index);
  };
  for (let lane = 0; lane < 4; lane += 1) pull();
}

function nearest(index: number) {
  for (let step = 0; step < frameCount; step += 1) {
    const before = frames[index - step];
    if (before) return before;
    const after = frames[index + step];
    if (after) return after;
  }
  return null;
}

export default function CityPan({ progress, from, to, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    loadFrames();
    let width = 0;
    let height = 0;
    let lastKey = "";
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      canvas.width = width;
      canvas.height = height;
      lastKey = "";
    };

    const paint = (image: HTMLImageElement, alpha: number) => {
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.globalAlpha = alpha;
      context.drawImage(image, (width - drawWidth) * 0.5, (height - drawHeight) * 0.5, drawWidth, drawHeight);
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const t = reduced ? (from + to) / 2 : from + (to - from) * Math.min(1, Math.max(0, progress.current));
      const position = Math.min(frameCount - 1, Math.max(0, t * (frameCount - 1)));
      const index = Math.floor(position);
      const blend = position - index;
      const key = `${index}:${blend.toFixed(2)}:${frames[index] ? 1 : 0}:${frames[index + 1] ? 1 : 0}`;
      if (key === lastKey) return;
      const base = nearest(index);
      if (!base) return;
      lastKey = key;
      context.globalAlpha = 1;
      paint(base, 1);
      const upper = frames[Math.min(frameCount - 1, index + 1)];
      if (upper && upper !== base && blend > 0.02) paint(upper, blend);
      context.globalAlpha = 1;
    };

    resize();
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, [progress, from, to]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full ${className}`} />;
}
