"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { MeshPhongMaterial } from "three";
import Globe2D, { type GlobeMode } from "./Globe";
import { countryColors, type Stop } from "./locations";

type SceneProps = {
  stops: Stop[];
  mode: GlobeMode;
  activeId: string;
  visibleIds: string[];
  onSelect: (id: string) => void;
};

type GlobeApi = ReturnType<typeof import("globe.gl").default extends new (...args: never[]) => infer T ? () => T : never>;
type Country = { properties: { key: Stop["country"] | null } };

function hasWebGl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function GlobeScene(props: SceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeApi | null>(null);
  const propsRef = useRef(props);
  const refreshRef = useRef<(ms: number) => void>(() => {});
  const supported = useSyncExternalStore(() => () => {}, hasWebGl, () => true);
  const [loadFailed, setFailed] = useState(false);
  const failed = !supported || loadFailed;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    propsRef.current = props;
    refreshRef.current(1600);
  }, [props]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reducedMotion-canAnimate: reduce)");
    let disposed = false;
    let started = false;
    let visible = true;
    let resizeWatcher: ResizeObserver | null = null;

    function fitToHost(globe: GlobeApi) {
      const width = host!.clientWidth;
      const height = host!.clientHeight;
      globe.width(width).height(height);
      globe.globeOffset(width >= 1024 ? [0.22 * width, 0] : [0, -0.28 * height]);
    }

    async function start() {
      started = true;
      try {
        const [{ default: GlobeGL }, countries] = await Promise.all([
          import("globe.gl"),
          fetch("/data/countries.json").then((response) => response.json()),
        ]);
        if (disposed) return;

        const globe = new GlobeGL(host!, { rendererConfig: { antialias: true, alpha: true, powerPreference: "high-performance" } }) as unknown as GlobeApi;
        globe
          .backgroundColor("rgba(0,0,0,0)")
          .showAtmosphere(true)
          .atmosphereAltitude(0.2)
          .polygonsData(countries.features)
          .polygonsTransitionDuration(600)
          .onPointClick((point: object) => propsRef.current.onSelect((point as Stop).id));

        const material = globe.globeMaterial() as MeshPhongMaterial;
        material.color.set("#0b0d13");
        material.emissive.set("#04050a");
        material.shininess = 6;
        material.transparent = true;
        material.opacity = 0.85;

        const controls = globe.controls();
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotateSpeed = 0.7;
        controls.rotateSpeed = 0.6;

        globeRef.current = globe;
        fitToHost(globe);
        resizeWatcher = new ResizeObserver(() => fitToHost(globe));
        resizeWatcher.observe(host!);
        refreshRef.current = refresh;
        refresh(0);
        if (!visible) globe.pauseAnimation();
        setReady(true);
      } catch {
        if (!disposed) setFailed(true);
      }
    }

    function refresh(ms: number) {
      const globe = globeRef.current;
      if (!globe) return;
      const { stops, mode, activeId, visibleIds } = propsRef.current;
      const canAnimate = !reducedMotion.matches;
      const shown = stops.filter((item) => visibleIds.includes(item.id));
      const active = mode === "stop" ? stops.find((item) => item.id === activeId) : undefined;
      const lit = (key: string) => shown.some((item) => item.country === key);

      const keyOf = (country: object) => (country as Country).properties.key;
      const colorOf = (key: Stop["country"]) => (active && active.country === key ? active.rgb : countryColors[key]);
      globe
        .polygonCapColor((country: object) => {
          const key = keyOf(country);
          if (!key || !lit(key)) return "rgba(30,38,56,0.95)";
          return `rgba(${colorOf(key)},${active?.country === key ? 0.9 : mode === "finale" ? 0.75 : 0.5})`;
        })
        .polygonSideColor((country: object) => {
          const key = keyOf(country);
          return key && lit(key) ? `rgba(${colorOf(key)},0.35)` : "rgba(30,38,56,0.6)";
        })
        .polygonStrokeColor((country: object) => {
          const key = keyOf(country);
          return key && lit(key) ? `rgba(${colorOf(key)},1)` : "rgba(150,170,200,0.3)";
        })
        .polygonAltitude((country: object) => {
          const key = keyOf(country);
          if (key && active?.country === key) return 0.014;
          return key && lit(key) ? 0.006 : 0.003;
        });

      globe.atmosphereColor(active ? active.hex : "#6f9bff");

      globe
        .pointsData(shown)
        .pointLat("lat")
        .pointLng("lon")
        .pointAltitude(0.016)
        .pointRadius((d: object) => ((d as Stop).id === active?.id ? 0.42 : 0.28))
        .pointColor((d: object) => `rgb(${(d as Stop).rgb})`);

      const hub = shown[0];
      const arcs = hub ? shown.filter((item) => item.id !== hub.id && Math.hypot(item.lat - hub.lat, item.lon - hub.lon) > 3) : [];
      globe
        .arcsData(arcs.map((item) => ({ sLat: hub.lat, sLng: hub.lon, eLat: item.lat, eLng: item.lon, rgb: item.rgb })))
        .arcStartLat("sLat")
        .arcStartLng("sLng")
        .arcEndLat("eLat")
        .arcEndLng("eLng")
        .arcColor((d: object) => [`rgba(${hub.rgb},0.9)`, `rgba(${(d as { rgb: string }).rgb},0.9)`])
        .arcStroke(0.4)
        .arcAltitudeAutoScale(0.35)
        .arcDashLength(0.5)
        .arcDashGap(0.25)
        .arcDashAnimateTime(canAnimate ? 2800 : 0);

      const ringTargets = mode === "finale" ? shown : active ? [active] : [];
      globe
        .ringsData(canAnimate ? ringTargets : [])
        .ringLat("lat")
        .ringLng("lon")
        .ringColor((d: object) => (t: number) => `rgba(${(d as Stop).rgb},${1 - t})`)
        .ringMaxRadius(mode === "finale" ? 2.4 : active?.country === "ng" ? 4 : 2.2)
        .ringPropagationSpeed(1.6)
        .ringRepeatPeriod(1500);

      globe.controls().autoRotate = mode !== "stop" && canAnimate;
      const current = globe.pointOfView();
      globe.pointOfView(
        active
          ? { lat: active.lat, lng: active.lon, altitude: active.alt }
          : { lat: 20, lng: current.lng, altitude: mode === "finale" ? 1.75 : 1.65 },
        canAnimate ? ms : 0,
      );
    }

    const visibilityWatcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !started) start();
      const globe = globeRef.current;
      if (!globe) return;
      if (visible) globe.resumeAnimation();
      else globe.pauseAnimation();
    }, { rootMargin: "900px 0px" });
    visibilityWatcher.observe(host);

    const onMotionChange = () => refreshRef.current(0);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      disposed = true;
      visibilityWatcher.disconnect();
      resizeWatcher?.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
      const globe = globeRef.current;
      globeRef.current = null;
      refreshRef.current = () => {};
      if (globe) {
        globe.pauseAnimation();
        (globe as unknown as { _destructor: () => void })._destructor();
      }
      host.replaceChildren();
    };
  }, []);

  if (failed) return <Globe2D {...props} />;

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Interactive 3D globe showing BTE locations. Scroll to move between places, or drag to turn the globe."
      className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
