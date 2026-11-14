"use client";

import { useEffect, useRef } from "react";
import { countryColors, type Stop } from "./locations";

export type GlobeMode = "intro" | "stop" | "finale";

type GlobeProps = {
  stops: Stop[];
  mode: GlobeMode;
  activeId: string;
  visibleIds: string[];
  onSelect: (id: string) => void;
};

const RAD = Math.PI / 180;
const ICE = "180,205,235";
const AUTO_SPIN = 7;

function toVec(lat: number, lon: number): [number, number, number] {
  const p = lat * RAD;
  const l = lon * RAD;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
}

function shortest(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

function pack(flat: number[], scale: number) {
  const out = new Float32Array((flat.length / 2) * 3);
  for (let i = 0; i < flat.length; i += 2) {
    const [x, y, z] = toVec(flat[i] / scale, flat[i + 1] / scale);
    out[(i / 2) * 3] = x;
    out[(i / 2) * 3 + 1] = y;
    out[(i / 2) * 3 + 2] = z;
  }
  return out;
}

export default function Globe({ stops, mode, activeId, visibleIds, onSelect }: GlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({ stops, mode, activeId, visibleIds, onSelect });
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    propsRef.current = { stops, mode, activeId, visibleIds, onSelect };
    wakeRef.current();
  }, [stops, mode, activeId, visibleIds, onSelect]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const font = getComputedStyle(document.body).fontFamily;
    let land = new Float32Array(0);
    const countries: Record<string, Float32Array> = {};
    let W = 0;
    let H = 0;
    let cx = 0;
    let cy = 0;
    let base = 0;
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
    let lastKey = "";
    const view = { lon: -30, lat: 24, zoom: 1 };
    let hits: { id: string; x: number; y: number }[] = [];

    fetch("/data/land-dots.json")
      .then((response) => response.json() as Promise<number[]>)
      .then((flat) => { land = pack(flat, 10); wake(); })
      .catch(() => {});
    fetch("/data/country-dots.json")
      .then((response) => response.json() as Promise<Record<string, number[]>>)
      .then((data) => {
        for (const key of Object.keys(data)) countries[key] = pack(data[key], 100);
        wake();
      })
      .catch(() => {});

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      W = Math.max(240, Math.floor(rect.width));
      H = Math.max(240, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      if (W >= 1024) {
        base = H * 0.46;
        cx = W * 0.72;
        cy = H * 0.5;
      } else {
        base = W * 0.5;
        cx = W / 2;
        cy = H * 0.22;
      }
      wake();
    }

    function targetView() {
      const { mode: m, stops: list, activeId: id } = propsRef.current;
      if (m === "stop") {
        const stop = list.find((item) => item.id === id);
        if (stop) return { lon: stop.lon, lat: stop.zoom > 2 ? stop.lat : Math.min(stop.lat * 0.8, 44), zoom: stop.zoom };
      }
      return { lon: null, lat: 22, zoom: m === "finale" ? 0.96 : 1 };
    }

    function rotate(x: number, y: number, z: number, cl: number, sl: number, cp: number, sp: number) {
      const x1 = x * cl - z * sl;
      const z1 = x * sl + z * cl;
      return [x1, y * cp - z1 * sp, y * sp + z1 * cp] as const;
    }

    function draw(now: number) {
      const t = now / 1000;
      const sway = reduced.matches ? 0 : Math.sin(t * 0.35) * 1.2;
      const lon = view.lon + sway;
      const cl = Math.cos(lon * RAD);
      const sl = Math.sin(lon * RAD);
      const cp = Math.cos(view.lat * RAD);
      const sp = Math.sin(view.lat * RAD);
      const R = base * view.zoom;
      const { stops: list, mode: m, activeId: active, visibleIds: shown } = propsRef.current;
      const activeStop = list.find((item) => item.id === active);
      const shownStops = list.filter((item) => shown.includes(item.id));

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);

      const body = ctx!.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(26,29,39,0.5)");
      body.addColorStop(0.7, "rgba(11,12,17,0.38)");
      body.addColorStop(1, "rgba(6,7,10,0.3)");
      ctx!.fillStyle = body;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
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
          if (pen) ctx!.lineTo(cx + x * R, cy - y * R);
          else { ctx!.moveTo(cx + x * R, cy - y * R); pen = true; }
        }
      }
      for (let lt = -60; lt <= 60; lt += 30) {
        let pen = false;
        for (let lg = -180; lg <= 180; lg += 4) {
          const v = toVec(lt, lg);
          const [x, y, z] = rotate(v[0], v[1], v[2], cl, sl, cp, sp);
          if (z <= 0) { pen = false; continue; }
          if (pen) ctx!.lineTo(cx + x * R, cy - y * R);
          else { ctx!.moveTo(cx + x * R, cy - y * R); pen = true; }
        }
      }
      ctx!.stroke();

      const dotR = Math.max(0.9, Math.min(2.6, (base / 237) * 1.15 * Math.pow(view.zoom, 0.45)));
      const buckets: number[][] = [[], [], [], []];
      for (let i = 0; i < land.length; i += 3) {
        const [x, y, z] = rotate(land[i], land[i + 1], land[i + 2], cl, sl, cp, sp);
        if (z <= 0.02) continue;
        const sx = cx + x * R;
        const sy = cy - y * R;
        if (sx < -4 || sy < -4 || sx > W + 4 || sy > H + 4) continue;
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

      const fineR = Math.max(0.7, Math.min(9, 0.34 * RAD * R * 0.62));
      const pulse = reduced.matches ? 1 : 0.88 + 0.12 * Math.sin(t * 2.2);
      for (const key of Object.keys(countries)) {
        const owners = shownStops.filter((item) => item.country === key);
        if (owners.length === 0) continue;
        const isActive = m === "stop" && activeStop?.country === key;
        const rgb = isActive ? activeStop!.rgb : countryColors[key as Stop["country"]];
        const strength = isActive ? 0.95 * pulse : m === "finale" ? 0.8 : 0.45;
        const pts = countries[key];
        for (let band = 0; band < 2; band++) {
          ctx!.fillStyle = `rgba(${rgb},${band === 0 ? strength * 0.55 : strength})`;
          ctx!.beginPath();
          for (let i = 0; i < pts.length; i += 3) {
            const [x, y, z] = rotate(pts[i], pts[i + 1], pts[i + 2], cl, sl, cp, sp);
            if (z <= 0.04) continue;
            const front = z > 0.5;
            if ((band === 0) === front) continue;
            const sx = cx + x * R;
            const sy = cy - y * R;
            ctx!.moveTo(sx + fineR, sy);
            ctx!.arc(sx, sy, fineR, 0, Math.PI * 2);
          }
          ctx!.fill();
        }
      }

      const hub = shownStops[0];
      if (hub && shownStops.length > 1) {
        const a = toVec(hub.lat, hub.lon);
        for (const stop of shownStops) {
          if (stop.id === hub.id) continue;
          const b = toVec(stop.lat, stop.lon);
          const dotAB = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
          const omega = Math.acos(dotAB);
          if (omega < 0.05) continue;
          const lift = 0.1 + omega * 0.22;
          const on = m === "finale" || stop.id === active;
          ctx!.lineWidth = on ? 1.6 : 1;
          ctx!.strokeStyle = `rgba(${stop.rgb},${on ? 0.85 : 0.3})`;
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
            if (pen) ctx!.lineTo(cx + x * R, cy - y * R);
            else { ctx!.moveTo(cx + x * R, cy - y * R); pen = true; }
          }
          ctx!.stroke();
          ctx!.setLineDash([]);
        }
      }

      hits = [];
      ctx!.textBaseline = "middle";
      const placed: number[][] = [];
      const ordered = [...shownStops].sort((a, b) => Number(b.id === active) - Number(a.id === active));
      for (const stop of ordered) {
        const v = toVec(stop.lat, stop.lon);
        const [x, y, z] = rotate(v[0], v[1], v[2], cl, sl, cp, sp);
        if (z <= 0.08) continue;
        const sx = cx + x * R;
        const sy = cy - y * R;
        const on = m === "stop" && stop.id === active;
        hits.push({ id: stop.id, x: sx, y: sy });
        if (!reduced.matches) {
          for (let ring = 0; ring < 2; ring++) {
            const phase = (t * 0.6 + ring * 0.5) % 1;
            ctx!.strokeStyle = `rgba(${stop.rgb},${(1 - phase) * (on ? 0.8 : 0.3)})`;
            ctx!.lineWidth = 1.5;
            ctx!.beginPath();
            ctx!.arc(sx, sy, 6 + phase * (on ? 30 : 14), 0, Math.PI * 2);
            ctx!.stroke();
          }
        }
        ctx!.beginPath();
        ctx!.arc(sx, sy, on ? 6 : 4, 0, Math.PI * 2);
        if (stop.status === "live") {
          ctx!.fillStyle = `rgb(${stop.rgb})`;
          ctx!.fill();
        } else {
          ctx!.fillStyle = "#0b0c11";
          ctx!.fill();
          ctx!.strokeStyle = `rgb(${stop.rgb})`;
          ctx!.lineWidth = 1.6;
          ctx!.stroke();
        }
        ctx!.font = `${on ? 700 : 500} ${on ? 13 : 11}px ${font}`;
        const label = stop.label.toUpperCase();
        const w = ctx!.measureText(label).width;
        const wantRight = stop.labelSide === "right";
        const fits = wantRight ? sx + 14 + w < W - 8 : sx - 14 - w > 8;
        const right = fits ? wantRight : !wantRight;
        const lx = right ? sx + 14 : sx - 14 - w;
        const ly = sy + (stop.labelSide === "left" ? -12 : 12);
        if (placed.some((box) => lx < box[2] && lx + w > box[0] && Math.abs(ly - box[1]) < 14)) continue;
        placed.push([lx, ly, lx + w]);
        ctx!.fillStyle = on ? "#FAFAF9" : "rgba(250,250,249,0.65)";
        ctx!.textAlign = "left";
        ctx!.fillText(label, lx, ly);
      }
    }

    function step(now: number) {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      const { mode: m, activeId: id } = propsRef.current;
      const target = targetView();
      const key = `${m}:${id}`;
      let settled = true;
      if (key !== lastKey) {
        lastKey = key;
        freeSpin = false;
      }
      const k = reduced.matches ? 1 : 1 - Math.exp(-dt * 2.4);
      if (dragging) {
        settled = false;
      } else if (freeSpin) {
        velocity *= Math.exp(-dt * 1.8);
        view.lon += velocity * dt;
        if (Math.abs(velocity) > 0.5) settled = false;
        else freeSpin = false;
      } else if (target.lon === null) {
        if (!reduced.matches) { view.lon += AUTO_SPIN * dt; settled = false; }
      } else {
        const dLon = shortest(view.lon, target.lon);
        view.lon += dLon * k;
        if (Math.abs(dLon) > 0.05) settled = false;
      }
      if (!dragging) {
        view.lat += (target.lat - view.lat) * k;
        view.zoom += (target.zoom - view.zoom) * k;
        if (Math.abs(target.lat - view.lat) > 0.05 || Math.abs(target.zoom - view.zoom) > 0.002) settled = false;
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
    <div ref={wrapRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive globe showing BTE locations. Scroll to move between places, or drag to turn the globe."
        className="absolute inset-0 h-full w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
      />
    </div>
  );
}
