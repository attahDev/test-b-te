"use client";

// Night-lights Earth for the ecosystem hero: network arcs, then a scroll-driven dive toward Manchester
import * as THREE from "three";
import { useEffect, useRef } from "react";

type Props = { progress: { current: number } };

const cities: [number, number][] = [[6.5, 3.4], [51.5, -0.1], [40.7, -74], [-1.3, 36.8], [-26.2, 28], [25.2, 55.3], [30, 31.2], [19, 72.8], [14.7, -17.4], [-4.3, 15.3], [48.9, 2.4], [53.48, -2.24], [-23.5, -46.6], [1.35, 103.8]];
const links: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 5], [6, 5], [3, 7], [8, 12], [9, 0], [10, 6], [11, 0], [11, 2], [11, 5], [7, 13], [1, 11]];
const start = { lat: 8, lon: 14 };
const manchester = { lat: 53.48, lon: -2.24 };

function toVector(lat: number, lon: number) {
  const phi = THREE.MathUtils.degToRad(lon + 180);
  const flat = Math.cos(THREE.MathUtils.degToRad(lat));
  return new THREE.Vector3(-Math.cos(phi) * flat, Math.sin(THREE.MathUtils.degToRad(lat)), Math.sin(phi) * flat);
}

function arcPoints(from: THREE.Vector3, to: THREE.Vector3, steps: number) {
  const angle = from.angleTo(to);
  const lift = Math.min(0.32, 0.1 + angle * 0.12);
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const point = new THREE.Vector3().addScaledVector(from, Math.sin((1 - t) * angle)).addScaledVector(to, Math.sin(t * angle)).divideScalar(Math.sin(angle));
    points.push(point.multiplyScalar(1 + lift * Math.sin(Math.PI * t)));
  }
  return points;
}

export default function GlobeScene({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.005, 30);
    const globe = new THREE.Group();
    scene.add(globe);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T) => {
      disposables.push(item);
      return item;
    };

    const bodyMaterial = track(new THREE.ShaderMaterial({
      vertexShader: "varying vec3 vNormal; varying vec3 vView; void main(){ vNormal = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vView = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",
      fragmentShader: "varying vec3 vNormal; varying vec3 vView; void main(){ float facing = clamp(dot(vNormal, vView), 0.0, 1.0); vec3 deep = mix(vec3(0.004,0.012,0.03), vec3(0.01,0.03,0.07), pow(facing, 1.4)); float rim = pow(1.0 - facing, 3.2); gl_FragColor = vec4(deep + vec3(0.1,0.32,0.75) * rim * 0.75, 1.0); }",
    }));
    const body = new THREE.Mesh(track(new THREE.SphereGeometry(1, 128, 96)), bodyMaterial);
    globe.add(body);

    const lightsMaterial = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(1.9, 1.7, 1.45), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    const lights = new THREE.Mesh(track(new THREE.SphereGeometry(1.001, 128, 96)), lightsMaterial);
    globe.add(lights);
    const texture = new THREE.TextureLoader().load("/art/earth-night.jpg", () => {
      canvas.style.opacity = "1";
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    track(texture);
    lightsMaterial.map = texture;

    const atmosphereMaterial = track(new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader: "varying vec3 vNormal; void main(){ vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: "varying vec3 vNormal; uniform float strength; void main(){ float glow = pow(max(0.0, 0.68 - dot(vNormal, vec3(0.0,0.0,1.0))), 3.2); gl_FragColor = vec4(0.22,0.5,1.0,1.0) * glow * strength; }",
      uniforms: { strength: { value: 1.35 } },
    }));
    const atmosphere = new THREE.Mesh(track(new THREE.SphereGeometry(1.1, 96, 64)), atmosphereMaterial);
    scene.add(atmosphere);

    const arcMaterial = track(new THREE.LineBasicMaterial({ color: 0x4f9bff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    const curves = links.map(([a, b]) => arcPoints(toVector(...cities[a]), toVector(...cities[b]), 64));
    curves.forEach((points) => {
      const line = new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(points)), arcMaterial);
      globe.add(line);
    });
    const pulseMaterial = track(new THREE.PointsMaterial({ color: 0xcfe6ff, size: 4.5, sizeAttenuation: false, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    const pulseGeometry = track(new THREE.BufferGeometry());
    const pulsePositions = new Float32Array(curves.length * 3);
    pulseGeometry.setAttribute("position", new THREE.BufferAttribute(pulsePositions, 3));
    const pulses = new THREE.Points(pulseGeometry, pulseMaterial);
    pulses.frustumCulled = false;
    globe.add(pulses);
    const nodeMaterial = track(new THREE.PointsMaterial({ color: 0xffffff, size: 5, sizeAttenuation: false, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    const nodeGeometry = track(new THREE.BufferGeometry().setFromPoints(cities.map(([lat, lon]) => toVector(lat, lon).multiplyScalar(1.004))));
    globe.add(new THREE.Points(nodeGeometry, nodeMaterial));

    const starPositions = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i += 1) {
      const direction = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().multiplyScalar(12);
      starPositions.set([direction.x, direction.y, direction.z], i * 3);
    }
    const starGeometry = track(new THREE.BufferGeometry());
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = track(new THREE.PointsMaterial({ color: 0x9db8ff, size: 1.4, sizeAttenuation: false, transparent: true, opacity: 0.55 }));
    scene.add(new THREE.Points(starGeometry, starMaterial));

    let width = 1;
    let height = 1;
    const resize = () => {
      width = Math.max(1, host.clientWidth);
      height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
    };

    const spin = new THREE.Quaternion();
    const pitchQuat = new THREE.Quaternion();
    const yawQuat = new THREE.Quaternion();
    const xAxis = new THREE.Vector3(1, 0, 0);
    const yAxis = new THREE.Vector3(0, 1, 0);
    const smooth = (value: number) => value * value * (3 - 2 * value);

    const draw = (time: number) => {
      const scroll = Math.min(1, Math.max(0, progress.current));
      const zoom = smooth(Math.min(1, scroll / 0.5));
      const lat = THREE.MathUtils.lerp(start.lat, manchester.lat, zoom);
      const lon = THREE.MathUtils.lerp(start.lon, manchester.lon, zoom) + (reduced ? 0 : Math.sin(time / 9000) * 2 * (1 - zoom));
      const facing = toVector(lat, lon);
      const yaw = Math.atan2(-facing.x, facing.z);
      const flatZ = facing.z * Math.cos(yaw) - facing.x * Math.sin(yaw);
      const pitch = Math.atan2(facing.y, flatZ);
      yawQuat.setFromAxisAngle(yAxis, yaw);
      pitchQuat.setFromAxisAngle(xAxis, pitch);
      spin.copy(pitchQuat).multiply(yawQuat);
      globe.quaternion.copy(spin);

      const wide = width / height > 0.85;
      const screenRadius = wide ? 0.7 * height : 0.62 * width;
      const k = (screenRadius / (height / 2)) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const farDistance = Math.sqrt(1 + 1 / (k * k));
      const distance = 1.3 + (farDistance - 1.3) * Math.pow(1 - zoom, 1.9);
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      const shiftX = (wide ? 0.18 * width : 0) * (1 - zoom);
      const shiftY = (wide ? 0.5 * height : 0.42 * height) * (1 - zoom);
      camera.setViewOffset(width, height, -shiftX, -shiftY, width, height);
      camera.updateProjectionMatrix();

      const arcFade = Math.max(0, 1 - zoom * 1.5);
      arcMaterial.opacity = 0.55 * arcFade;
      pulseMaterial.opacity = arcFade;
      nodeMaterial.opacity = arcFade;
      starMaterial.opacity = 0.55 * (1 - zoom);
      atmosphereMaterial.uniforms.strength.value = 1.35 * (1 - zoom * 0.9);
      atmosphere.scale.setScalar(1);
      curves.forEach((points, index) => {
        const t = (time / 5200 + index * 0.173) % 1;
        const point = points[Math.floor(t * (points.length - 1))];
        pulsePositions.set([point.x, point.y, point.z], index * 3);
      });
      pulseGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    resize();
    let frame = 0;
    let visible = true;
    const loop = (time: number) => {
      frame = visible ? requestAnimationFrame(loop) : 0;
      draw(time);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame && !reduced) frame = requestAnimationFrame(loop);
    });
    observer.observe(host);
    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener("resize", onResize);
    if (reduced) draw(0);
    else frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, [progress]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000" />;
}
