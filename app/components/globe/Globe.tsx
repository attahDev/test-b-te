// Canvas globe: dotted land, graticule, great-circle arcs, pulsing markers, eased focus and drag rotation.
"use client";

import { useEffect, useRef } from "react";
import { hubId, type Region } from "./locations";

type GlobeProps = {
  regions: Region[];
  activeId: string;
  onSelect: (id: string) => void;
  onInteract: () => void;
};

const RAD = Math.PI / 180;
const CORAL = "233,120,104";
const ICE = "180,205,235";

function toVec(lat: number, lon: number): [number, number, number] {
  const p = lat * RAD;
  const l = lon * RAD;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
}

function shortest(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

export default function Globe({ regions, activeId, onSelect, onInteract }: GlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({ regions, activeId, onSelect, onInteract });
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    propsRef.current = { regions, activeId, onSelect, onInteract };
    wakeRef.current();
  }, [regions, activeId, onSelect, onInteract]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const font = getComputedStyle(document.body).fontFamily;
    let land = new Float32Array(0);
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    let visible = true;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;
    let velocity = 0;
    let freeSpin = false;
    let lastActive = "";
    const view = { lon: -1.8, lat: 30, zoom: 1 };
    let hits: { id: string; x: number; y: number }[] = [];

    fetch("/data/land-dots.json")
      .then((response) => response.json() as Promise<number[]>)
      .then((flat) => {
        const out = new Float32Array((flat.length / 2) * 3);
        for (let i = 0; i < flat.length; i += 2) {
          const [x, y, z] = toVec(flat[i] / 10, flat[i + 1] / 10);
          out[(i / 2) * 3] = x;
          out[(i / 2) * 3 + 1] = y;
          out[(i / 2) * 3 + 2] = z;
        }
        land = out;
        wake();
      })
      .catch(() => {});

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      size = Math.max(240, Math.floor(rect.width));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = size * dpr;
      canvas!.height = size * dpr;
      canvas!.style.height = `${size}px`;
      wake();
    }

    function targetFor(id: string) {
      const region = propsRef.current.regions.find((item) => item.id === id);
      if (!region) return null;
      return { lon: region.lon, lat: Math.min(region.lat * 0.75, 42), zoom: region.zoom };
    }

    function rotate(x: number, y: number, z: number, cl: number, sl: number, cp: number, sp: number) {
      const x1 = x * cl - z * sl;
      const z1 = x * sl + z * cl;
      return [x1, y * cp - z1 * sp, y * sp + z1 * cp] as const;
    }

    function draw(now: number) {
      const t = now / 1000;
      const sway = reduced.matches ? 0 : Math.sin(t * 0.35) * 1.6;
      const lon = view.lon + sway;
      const cl = Math.cos(lon * RAD);
      const sl = Math.sin(lon * RAD);
      const cp = Math.cos(view.lat * RAD);
      const sp = Math.sin(view.lat * RAD);
      const R = size * 0.37 * view.zoom;
      const c = size / 2;
      const { regions: list, activeId: active } = propsRef.current;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, size, size);

      const body = ctx!.createRadialGradient(c - R * 0.3, c - R * 0.35, R * 0.1, c, c, R);
      body.addColorStop(0, "#1a1d27");
      body.addColorStop(0.7, "#0b0c11");
      body.addColorStop(1, "#06070a");
      ctx!.fillStyle = body;
      ctx!.beginPath();
      ctx!.arc(c, c, R, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.lineWidth = 1;
      ctx!.strokeStyle = `rgba(${ICE},0.07)`;
      ctx!.beginPath();
      for (let lg = -180; lg < 180; lg += 30) {
        let pen = false;
        for (let lt = -90; lt <= 90; lt += 4) {
          const v = toVec(lt, lg);
          const [x, y, z] = rotate(v[0], v[1], v[2], cl, sl, cp, sp);
          if (z <= 0) { pen = false; continue; }
          if (pen) ctx!.lineTo(c + x * R, c - y * R);
          else { ctx!.moveTo(c + x * R, c - y * R); pen = true; }
        }
      }
      for (let lt = -60; lt <= 60; lt += 30) {
        let pen = false;
        for (let lg = -180; lg <= 180; lg += 4) {
          const v = toVec(lt, lg);
          const [x, y, z] = rotate(v[0], v[1], v[2], cl, sl, cp, sp);
          if (z <= 0) { pen = false; continue; }
          if (pen) ctx!.lineTo(c + x * R, c - y * R);
          else { ctx!.moveTo(c + x * R, c - y * R); pen = true; }
        }
      }
      ctx!.stroke();

      const lit = list.map((region) => ({ id: region.id, v: toVec(region.lat, region.lon), on: region.id === active }));
      const buckets: number[][] = [[], [], [], []];
      const glow: number[] = [];
      const dotR = Math.max(0.9, Math.min(2.4, (size / 640) * 1.15 * Math.pow(view.zoom, 0.45)));
      const reach = Math.cos((9 + 3 * Math.sin(t * 1.4)) * RAD);
      for (let i = 0; i < land.length; i += 3) {
        const [x, y, z] = rotate(land[i], land[i + 1], land[i + 2], cl, sl, cp, sp);
        if (z <= 0.02) continue;
        const sx = c + x * R;
        const sy = c - y * R;
        if (sx < -4 || sy < -4 || sx > size + 4 || sy > size + 4) continue;
        let near = false;
        for (const item of lit) {
          if (item.on && land[i] * item.v[0] + land[i + 1] * item.v[1] + land[i + 2] * item.v[2] > reach) { near = true; break; }
        }
        if (near) { glow.push(sx, sy, z); continue; }
        buckets[Math.min(3, Math.floor(z * 4))].push(sx, sy);
      }
      const alphas = [0.16, 0.3, 0.46, 0.62];
      for (let b = 0; b < 4; b++) {
        ctx!.fillStyle = `rgba(${ICE},${alphas[b]})`;
        ctx!.beginPath();
        const pts = buckets[b];
        for (let i = 0; i < pts.length; i += 2) {
          ctx!.moveTo(pts[i] + dotR, pts[i + 1]);
          ctx!.arc(pts[i], pts[i + 1], dotR, 0, Math.PI * 2);
        }
        ctx!.fill();
      }
      ctx!.fillStyle = `rgba(${CORAL},0.95)`;
      ctx!.beginPath();
      for (let i = 0; i < glow.length; i += 3) {
        const r = dotR * (1.15 + glow[i + 2] * 0.35);
        ctx!.moveTo(glow[i] + r, glow[i + 1]);
        ctx!.arc(glow[i], glow[i + 1], r, 0, Math.PI * 2);
      }
      ctx!.fill();

      const hub = list.find((region) => region.id === hubId);
      if (hub) {
        const a = toVec(hub.lat, hub.lon);
        for (const region of list) {
          if (region.id === hub.id) continue;
          const b = toVec(region.lat, region.lon);
          const dotAB = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
          const omega = Math.acos(dotAB);
          if (omega < 1e-3) continue;
          const lift = 0.1 + omega * 0.22;
          const isActive = region.id === active || hub.id === active;
          ctx!.lineWidth = isActive ? 1.6 : 1;
          ctx!.strokeStyle = `rgba(${CORAL},${isActive ? 0.85 : 0.35})`;
          ctx!.setLineDash([5, 7]);
          ctx!.lineDashOffset = reduced.matches ? 0 : -t * 14;
          ctx!.beginPath();
          let pen = false;
          for (let s = 0; s <= 56; s++) {
            const u = s / 56;
            const k1 = Math.sin((1 - u) * omega) / Math.sin(omega);
            const k2 = Math.sin(u * omega) / Math.sin(omega);
            const rr = 1 + lift * Math.sin(Math.PI * u);
            const [x, y, z] = rotate(
              (a[0] * k1 + b[0] * k2) * rr,
              (a[1] * k1 + b[1] * k2) * rr,
              (a[2] * k1 + b[2] * k2) * rr,
              cl, sl, cp, sp,
            );
            if (z <= 0.04) { pen = false; continue; }
            if (pen) ctx!.lineTo(c + x * R, c - y * R);
            else { ctx!.moveTo(c + x * R, c - y * R); pen = true; }
          }
          ctx!.stroke();
          ctx!.setLineDash([]);
        }
      }

      hits = [];
      ctx!.textBaseline = "middle";
      for (const region of list) {
        const v = toVec(region.lat, region.lon);
        const [x, y, z] = rotate(v[0], v[1], v[2], cl, sl, cp, sp);
        if (z <= 0.08) continue;
        const sx = c + x * R;
        const sy = c - y * R;
        const on = region.id === active;
        hits.push({ id: region.id, x: sx, y: sy });
        if (!reduced.matches) {
          for (let ring = 0; ring < 2; ring++) {
            const phase = (t * 0.6 + ring * 0.5) % 1;
            ctx!.strokeStyle = `rgba(${CORAL},${(1 - phase) * (on ? 0.7 : 0.3)})`;
            ctx!.lineWidth = 1.5;
            ctx!.beginPath();
            ctx!.arc(sx, sy, 6 + phase * (on ? 26 : 16), 0, Math.PI * 2);
            ctx!.stroke();
          }
        }
        ctx!.beginPath();
        ctx!.arc(sx, sy, on ? 6 : 4.5, 0, Math.PI * 2);
        if (region.status === "live") {
          ctx!.fillStyle = `rgb(${CORAL})`;
          ctx!.fill();
        } else {
          ctx!.fillStyle = "#0b0c11";
          ctx!.fill();
          ctx!.strokeStyle = `rgb(${CORAL})`;
          ctx!.lineWidth = 1.6;
          ctx!.stroke();
        }
        ctx!.font = `${on ? 700 : 500} ${on ? 13 : 11}px ${font}`;
        const label = region.name.toUpperCase();
        const w = ctx!.measureText(label).width;
        const wantRight = region.labelSide === "right";
        const fits = wantRight ? sx + 14 + w < size - 8 : sx - 14 - w > 8;
        const right = fits ? wantRight : !wantRight;
        ctx!.fillStyle = on ? "#FAFAF9" : "rgba(250,250,249,0.6)";
        ctx!.textAlign = right ? "left" : "right";
        ctx!.fillText(label, right ? sx + 14 : sx - 14, sy - (on ? 12 : 10));
      }
    }

    function step(now: number) {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      const targetView = targetFor(propsRef.current.activeId);
      let settled = true;
      if (propsRef.current.activeId !== lastActive) {
        lastActive = propsRef.current.activeId;
        freeSpin = false;
      }
      if (dragging) {
        settled = false;
      } else if (freeSpin) {
        velocity *= Math.exp(-dt * 1.8);
        view.lon += velocity * dt;
        if (Math.abs(velocity) > 0.5) settled = false;
        else freeSpin = false;
      } else if (targetView) {
        const k = reduced.matches ? 1 : 1 - Math.exp(-dt * 2.6);
        const dLon = shortest(view.lon, targetView.lon);
        view.lon += dLon * k;
        view.lat += (targetView.lat - view.lat) * k;
        view.zoom += (targetView.zoom - view.zoom) * k;
        if (Math.abs(dLon) > 0.05 || Math.abs(targetView.lat - view.lat) > 0.05 || Math.abs(targetView.zoom - view.zoom) > 0.002) settled = false;
      }
      draw(now);
      if (!reduced.matches || !settled) raf = requestAnimationFrame(step);
    }

    function wake() {
      if (!raf && visible) {
        last = 0;
        raf = requestAnimationFrame(step);
      }
    }
    wakeRef.current = wake;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.05 });
    io.observe(wrap);
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    function onDown(event: PointerEvent) {
      dragging = true;
      moved = 0;
      velocity = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas!.setPointerCapture(event.pointerId);
      wake();
    }
    function onMove(event: PointerEvent) {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved > 4) propsRef.current.onInteract();
      const perPx = 0.32 / view.zoom;
      view.lon -= dx * perPx;
      view.lat = Math.max(-60, Math.min(60, view.lat + dy * perPx));
      velocity = (-dx * perPx) * 60;
      freeSpin = true;
    }
    function onUp(event: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      if (moved <= 4) {
        const rect = canvas!.getBoundingClientRect();
        const px = event.clientX - rect.left;
        const py = event.clientY - rect.top;
        const hit = hits.find((item) => Math.hypot(item.x - px, item.y - py) < 26);
        freeSpin = false;
        if (hit) propsRef.current.onSelect(hit.id);
      }
      if (reduced.matches) velocity = 0;
      wake();
    }
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    reduced.addEventListener("change", wake);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      reduced.removeEventListener("change", wake);
      wakeRef.current = () => {};
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive globe showing BTE locations. Use the location buttons beside it to choose a place."
        className="absolute inset-0 h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      />
    </div>
  );
}
