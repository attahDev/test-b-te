"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import AuroraCurtains from "./AuroraCurtains";
import GlobeScene from "./globe/GlobeScene";
import { introAurora, introBg, stops } from "./globe/locations";
import SectionLabel from "./ui/SectionLabel";

const REDUCED = "(prefers-reduced-motion: reduce)";
const STAGES = stops.length + 2;
const VH_PER_STAGE = 85;

function subscribe(notify: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

function Pending({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded border border-dashed border-white/25 px-2 py-0.5 text-xs text-white/50">
      {children}
    </span>
  );
}

export default function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED).matches, () => true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = section.offsetHeight - window.innerHeight;
      const p = distance > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance)) : 0;
      setStage(Math.min(STAGES - 1, Math.floor(p * STAGES)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  function jump(index: number) {
    const section = sectionRef.current;
    if (!section || reduced) { setStage(index); return; }
    const distance = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((index + 0.5) / STAGES) * distance, behavior: "smooth" });
  }

  const mode = stage === 0 ? "intro" : stage === STAGES - 1 ? "finale" : "stop";
  const stop = mode === "stop" ? stops[stage - 1] : null;
  const activeId = stop ? stop.id : stops[0].id;
  const visibleIds = mode === "intro" ? [] : mode === "finale" ? stops.map((item) => item.id) : stops.slice(0, stage).map((item) => item.id);
  const palette = stop ? stop.aurora : introAurora;
  const bg = stop ? stop.bg : introBg;
  const accent = stop ? stop.hex : "#E97868";

  const rail = [{ label: "Welcome" }, ...stops.map((item) => ({ label: item.label })), { label: "Full globe" }];

  return (
    <section
      id="locations"
      ref={sectionRef}
      aria-labelledby="locations-title"
      style={reduced ? undefined : { height: `${STAGES * VH_PER_STAGE + 100}svh` }}
      className="relative bg-[#08090B]"
    >
      <div className="sticky top-0 isolate flex h-svh flex-col overflow-hidden motion-reduce:static motion-reduce:min-h-svh motion-reduce:py-14">
        <div aria-hidden="true" className="tour-bg absolute inset-0 -z-10" style={{ backgroundColor: bg }} />
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image src="/homepage/starfield-background.png" alt="" fill sizes="100vw" className="object-cover opacity-40 mix-blend-screen" />
          <AuroraCurtains palette={palette} paused={reduced} className="opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_30%,rgba(5,6,8,0.7)_100%)]" />
        </div>

        <GlobeScene stops={stops} mode={mode} activeId={activeId} visibleIds={visibleIds} onSelect={(id) => jump(stops.findIndex((item) => item.id === id) + 1)} />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,6,8,0.88)_0%,rgba(5,6,8,0.62)_42%,transparent_62%)] lg:bg-[linear-gradient(to_right,rgba(5,6,8,0.82)_0%,rgba(5,6,8,0.55)_34%,transparent_56%)]" />

        <div className="pointer-events-none relative mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col px-6 pb-16 pt-6 md:px-12 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10 lg:pb-20 lg:pt-10">
          <div aria-hidden="true" className="h-[40svh] flex-none lg:hidden" />
          <div aria-live="polite" className="pointer-events-auto min-h-0 flex-1 lg:flex-none">
            <div key={stage} className="panel-in">
              {mode === "intro" && (
                <>
                  <SectionLabel className="mb-4">Locations</SectionLabel>
                  <h2 id="locations-title" className="text-3xl font-black leading-[1.02] tracking-tight text-[#FAFAF9] md:text-5xl">
                    Welcome to Black Tech Expo
                  </h2>
                  <p className="mt-4 max-w-[480px] text-sm leading-relaxed text-[#FAFAF9]/75 md:text-base">
                    We build and connect the people, technology and partnerships that help communities take part in the digital economy. Scroll to visit each place we work.
                  </p>
                  <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-[#FAFAF9]/55">
                    <span aria-hidden="true" className="tour-cue">↓</span>
                    {reduced ? "Use the steps below" : "Scroll to begin the tour"}
                  </p>
                </>
              )}

              {stop && (
                <>
                  <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em]" style={{ color: accent }}>
                    <span aria-hidden="true" className="h-px w-8" style={{ background: accent }} />
                    Stop {stage} of {stops.length} · {stop.status === "live" ? "Live" : "Opening soon"}
                  </p>
                  <h2 id="locations-title" className="mt-3 text-2xl font-black leading-[1.05] tracking-tight text-[#FAFAF9] md:text-4xl">
                    {stop.name}
                  </h2>
                  <p className="mt-2 hidden max-w-[480px] text-sm leading-snug text-[#FAFAF9]/70 md:block">{stop.line}</p>

                  {stop.stats.length > 0 && (
                    <dl className="mt-4 grid max-w-[480px] grid-cols-3 gap-3 border-y border-white/10 py-3 [@media(max-height:700px)]:hidden md:[@media(max-height:700px)]:grid">
                      {stop.stats.map((stat) => (
                        <div key={stat.label}>
                          <dd className="text-xl font-black leading-none text-[#FAFAF9] md:text-3xl">{stat.number}</dd>
                          <dt className="mt-1 text-[11px] text-[#FAFAF9]/60">{stat.label}</dt>
                        </div>
                      ))}
                    </dl>
                  )}

                  <dl className="mt-4 grid max-w-[520px] gap-3 text-sm md:gap-4">
                    <div>
                      <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: accent }}>Address</dt>
                      <dd>{stop.office ? <span className="text-[#FAFAF9]/85">{stop.office}</span> : <Pending>Address to be confirmed</Pending>}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: accent }}>What is here</dt>
                      <dd className="flex flex-col items-start gap-1">
                        {stop.has.map((line) => <span key={line} className="text-[#FAFAF9]/85">{line}</span>)}
                        {stop.has.length === 0 && <Pending>To be confirmed</Pending>}
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: accent }}>What has been done</dt>
                      <dd className="flex flex-col items-start gap-1">
                        {stop.done.map((line) => <span key={line} className="text-[#FAFAF9]/85">{line}</span>)}
                        {stop.done.length === 0 && <Pending>To be confirmed</Pending>}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-5">
                    {stop.href ? (
                      <a
                        href={stop.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: accent }}
                        className="site-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[#0b0c0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Visit site <span aria-hidden="true" className="text-xs">↗</span>
                      </a>
                    ) : (
                      <span className="inline-flex rounded-full border border-dashed border-white/25 px-5 py-2.5 text-sm text-white/50">Site link to follow</span>
                    )}
                  </div>
                </>
              )}

              {mode === "finale" && (
                <>
                  <SectionLabel className="mb-4">The network</SectionLabel>
                  <h2 id="locations-title" className="text-3xl font-black leading-[1.02] tracking-tight text-[#FAFAF9] md:text-5xl">
                    One network, growing place by place
                  </h2>
                  <p className="mt-4 max-w-[480px] text-sm leading-relaxed text-[#FAFAF9]/75 md:text-base">
                    Two programmes are live in the UK today, with Nigeria and Ireland opening next. Drag the globe to look around, or pick a place to revisit.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {stops.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => jump(index + 1)}
                        style={{ borderColor: item.hex, color: item.hex }}
                        className="rounded-full border px-4 py-2 text-sm transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <ol aria-label="Tour progress" className="pointer-events-auto absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2 px-4 md:bottom-6 md:gap-3">
          {rail.map((item, index) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => jump(index)}
                aria-current={index === stage ? "step" : undefined}
                aria-label={`Go to ${item.label}`}
                className="tour-dot group flex flex-col items-center gap-1.5 px-1 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span
                  data-on={index === stage}
                  style={index === stage ? { backgroundColor: accent } : undefined}
                  className="block h-1.5 w-8 rounded-full bg-white/25 transition-all duration-500 data-[on=true]:w-12 md:w-12 md:data-[on=true]:w-16"
                />
                <span className={`hidden text-[11px] transition-colors md:block ${index === stage ? "text-white" : "text-white/45 group-hover:text-white/75"}`}>{item.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
