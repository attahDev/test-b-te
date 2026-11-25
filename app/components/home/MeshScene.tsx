// WebGL orbit-system meshes for "What we do": a glowing core, tilted rings and travelling nodes, one form per service.
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const BLUE = 0x6ea5ff;
const SOFT = 0xb9d4ff;
const CORAL = 0xff8f7e;

type Fade = { material: THREE.Material & { opacity: number }; base: number };

function glowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d")!;
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(190,215,255,0.85)");
  gradient.addColorStop(0.5, "rgba(90,150,255,0.18)");
  gradient.addColorStop(1, "rgba(90,150,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export default function MeshScene({ active }: { active: number }) {
  const holder = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const host = holder.current;
    if (!host) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const sprite = glowTexture();
    const disposables: { dispose: () => void }[] = [sprite];

    const fades: Fade[][] = [[], [], []];
    const track = <T extends THREE.Material & { opacity: number }>(index: number, material: T, base: number) => {
      material.transparent = true;
      material.opacity = base;
      fades[index].push({ material, base });
      disposables.push(material);
      return material;
    };
    const lineMaterial = (index: number, color: number, base: number) => track(index, new THREE.LineBasicMaterial({ color, blending: THREE.AdditiveBlending, depthWrite: false }), base);
    const pointMaterial = (index: number, color: number, size: number, base = 1) =>
      track(index, new THREE.PointsMaterial({ color, size, map: sprite, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }), base);

    const groups = [0, 1, 2].map(() => {
      const group = new THREE.Group();
      scene.add(group);
      return group;
    });

    const wire = (index: number, geometry: THREE.BufferGeometry, color: number, base: number) => {
      const edges = new THREE.WireframeGeometry(geometry);
      disposables.push(geometry, edges);
      return new THREE.LineSegments(edges, lineMaterial(index, color, base));
    };

    const fill = (index: number, geometry: THREE.BufferGeometry, base: number) => {
      disposables.push(geometry);
      return new THREE.Mesh(geometry, track(index, new THREE.MeshBasicMaterial({ color: 0x0a1330, depthWrite: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }), base));
    };

    const nodesOf = (index: number, positions: THREE.Vector3[], color: number, size: number) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(positions);
      disposables.push(geometry);
      return new THREE.Points(geometry, pointMaterial(index, color, size));
    };

    const uniqueVertices = (geometry: THREE.BufferGeometry) => {
      const attribute = geometry.getAttribute("position");
      const seen = new Map<string, THREE.Vector3>();
      for (let i = 0; i < attribute.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(attribute, i);
        seen.set(`${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`, v);
      }
      return [...seen.values()];
    };

    const orbiters: { points: THREE.Points; radius: number; speed: number; offset: number; plane: THREE.Group; count: number }[] = [];
    const ring = (index: number, radius: number, tiltX: number, tiltZ: number, color: number, speed: number, count: number) => {
      const plane = new THREE.Group();
      plane.rotation.set(tiltX, 0, tiltZ);
      const path: THREE.Vector3[] = [];
      for (let i = 0; i <= 160; i++) path.push(new THREE.Vector3(Math.cos((i / 160) * Math.PI * 2) * radius, 0, Math.sin((i / 160) * Math.PI * 2) * radius));
      const geometry = new THREE.BufferGeometry().setFromPoints(path);
      disposables.push(geometry);
      plane.add(new THREE.Line(geometry, lineMaterial(index, color, 0.45)));
      const nodes = new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(count * 3), 3));
      disposables.push(nodes);
      const points = new THREE.Points(nodes, pointMaterial(index, color === CORAL ? CORAL : SOFT, 0.34));
      plane.add(points);
      groups[index].add(plane);
      orbiters.push({ points, radius, speed, offset: Math.random() * 6, plane, count });
    };

    const ico = new THREE.IcosahedronGeometry(1.5, 2);
    groups[0].add(fill(0, new THREE.IcosahedronGeometry(1.49, 2), 0.7));
    groups[0].add(wire(0, ico.clone(), BLUE, 0.75));
    groups[0].add(wire(0, new THREE.IcosahedronGeometry(0.8, 1), SOFT, 0.35));
    groups[0].add(nodesOf(0, uniqueVertices(ico), SOFT, 0.2));
    groups[0].add(nodesOf(0, uniqueVertices(new THREE.IcosahedronGeometry(1.5, 0)), CORAL, 0.42));
    ring(0, 2.15, 0.5, 0.2, BLUE, 0.35, 5);
    ring(0, 2.55, -0.9, 0.5, CORAL, -0.25, 3);
    ring(0, 1.95, 1.3, -0.4, BLUE, 0.5, 4);

    const knotGeometry = new THREE.TorusKnotGeometry(1.15, 0.36, 240, 18, 2, 3);
    groups[1].add(fill(1, new THREE.TorusKnotGeometry(1.15, 0.355, 240, 18, 2, 3), 0.65));
    groups[1].add(wire(1, knotGeometry, BLUE, 0.6));
    const knotPath = new THREE.TorusKnotGeometry(1.15, 0.001, 120, 3, 2, 3);
    const spine = uniqueVertices(knotPath).filter((_, i) => i % 3 === 0);
    disposables.push(knotPath);
    groups[1].add(nodesOf(1, spine, SOFT, 0.3));
    ring(1, 2.3, 0.7, 0, BLUE, 0.4, 6);
    ring(1, 2.7, -0.6, 0.6, CORAL, -0.3, 4);

    const sphere = new THREE.SphereGeometry(1.5, 32, 22);
    groups[2].add(fill(2, new THREE.SphereGeometry(1.48, 32, 22), 0.75));
    const grid: THREE.Vector3[] = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      const phi = (lat * Math.PI) / 180;
      for (let k = 0; k < 96; k++) {
        const a = (k / 96) * Math.PI * 2;
        const b = ((k + 1) / 96) * Math.PI * 2;
        grid.push(new THREE.Vector3(Math.cos(phi) * Math.cos(a), Math.sin(phi), Math.cos(phi) * Math.sin(a)).multiplyScalar(1.5), new THREE.Vector3(Math.cos(phi) * Math.cos(b), Math.sin(phi), Math.cos(phi) * Math.sin(b)).multiplyScalar(1.5));
      }
    }
    for (let m = 0; m < 24; m++) {
      const a = (m / 24) * Math.PI * 2;
      for (let k = 0; k < 48; k++) {
        const p1 = -Math.PI / 2 + (k / 48) * Math.PI;
        const p2 = -Math.PI / 2 + ((k + 1) / 48) * Math.PI;
        grid.push(new THREE.Vector3(Math.cos(p1) * Math.cos(a), Math.sin(p1), Math.cos(p1) * Math.sin(a)).multiplyScalar(1.5), new THREE.Vector3(Math.cos(p2) * Math.cos(a), Math.sin(p2), Math.cos(p2) * Math.sin(a)).multiplyScalar(1.5));
      }
    }
    const gridGeometry = new THREE.BufferGeometry().setFromPoints(grid);
    disposables.push(gridGeometry, sphere);
    groups[2].add(new THREE.LineSegments(gridGeometry, lineMaterial(2, BLUE, 0.5)));
    const cities = [[51.5, -0.1], [6.5, 3.4], [40.7, -74], [25.2, 55.3], [-26.2, 28], [1.35, 103.8], [-23.5, -46.6], [35.7, 139.7]].map(([lat, lon]) => {
      const phi = (lat * Math.PI) / 180;
      const theta = (lon * Math.PI) / 180;
      return new THREE.Vector3(Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta)).multiplyScalar(1.5);
    });
    groups[2].add(nodesOf(2, cities, CORAL, 0.5));
    [[0, 1], [0, 2], [1, 4], [0, 3], [3, 5], [2, 6], [5, 7], [2, 7]].forEach(([from, to]) => {
      const a = cities[from];
      const b = cities[to];
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(1.5 + a.distanceTo(b) * 0.38);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
      disposables.push(geometry);
      groups[2].add(new THREE.Line(geometry, lineMaterial(2, CORAL, 0.8)));
    });
    ring(2, 2.25, 0.35, 0.1, BLUE, 0.3, 4);
    ring(2, 2.6, -1.0, 0.3, CORAL, -0.22, 3);

    const strength = [1, 0, 0];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let last = performance.now();
    let spin = 0.4;

    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.aspect = aspect;
      const wide = width > 900;
      camera.position.set(0, 0.6, Math.max(11.8, (wide ? 9.6 : 11.4) / aspect));
      camera.lookAt(0, 0, 0);
      const shiftX = wide ? width * 0.1 : 0;
      const shiftY = wide ? 0 : -height * 0.02;
      camera.setViewOffset(width, height, shiftX, shiftY, width, height);
      camera.updateProjectionMatrix();
    };

    const render = (now: number) => {
      const step = Math.min(0.05, (now - last) / 1000);
      last = now;
      spin += step * 0.22;
      groups.forEach((group, index) => {
        strength[index] += ((index === activeRef.current ? 1 : 0) - strength[index]) * Math.min(1, step * 4);
        const value = strength[index];
        group.visible = value > 0.02;
        if (!group.visible) return;
        group.rotation.y = spin + window.scrollY * 0.0012 + index;
        group.rotation.x = 0.35;
        group.position.y = Math.sin(now / 1800) * 0.08 + (1 - value) * -0.5;
        group.scale.setScalar(0.88 + 0.12 * value);
        fades[index].forEach(({ material, base }) => {
          material.opacity = base * value;
        });
      });
      orbiters.forEach((orbit) => {
        const attribute = orbit.points.geometry.getAttribute("position") as THREE.BufferAttribute;
        for (let i = 0; i < orbit.count; i++) {
          const angle = orbit.offset + now / 1000 * orbit.speed + (i / orbit.count) * Math.PI * 2;
          attribute.setXYZ(i, Math.cos(angle) * orbit.radius, 0, Math.sin(angle) * orbit.radius);
        }
        attribute.needsUpdate = true;
      });
      renderer.render(scene, camera);
    };

    const loop = (now: number) => {
      render(now);
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
    sizer.observe(host);
    let watcher: IntersectionObserver | null = null;
    if (still) render(performance.now());
    else {
      watcher = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
      watcher.observe(host);
    }
    return () => {
      stop();
      sizer.disconnect();
      watcher?.disconnect();
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={holder} className="absolute inset-0" />;
}
