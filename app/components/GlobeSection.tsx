// Locations section: spinning globe that tours BTE regions, with a detail panel per region and site.
"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Aurora from "./Aurora";
import Globe from "./globe/Globe";
import { regions } from "./globe/locations";
import SectionLabel from "./ui/SectionLabel";

const TOUR_MS = 7000;
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReduced(notify: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

function Pending({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded border border-dashed border-white/25 px-2 py-1 text-xs text-white/50">
      {children}
    </span>
  );
}

export default function GlobeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(regions[0].id);
  const [siteIndex, setSiteIndex] = useState(0);
  const [tourChoice, setTourChoice] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => true);
  const tour = tourChoice ?? !reduced;
  const setTour = useCallback((next: boolean) => setTourChoice(next), []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!tour || !inView) return;
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const index = regions.findIndex((region) => region.id === current);
        return regions[(index + 1) % regions.length].id;
      });
      setSiteIndex(0);
    }, TOUR_MS);
    return () => window.clearInterval(id);
  }, [tour, inView]);

  const select = useCallback((id: string) => {
    setActiveId(id);
    setSiteIndex(0);
    setTour(false);
  }, [setTour]);
  const stopTour = useCallback(() => setTour(false), [setTour]);

  const region = regions.find((item) => item.id === activeId) ?? regions[0];
  const site = region.sites[Math.min(siteIndex, region.sites.length - 1)];

  return (
    <section
      id="locations"
      ref={sectionRef}
      aria-labelledby="locations-title"
      className="relative isolate overflow-hidden bg-[#08090B] py-16 md:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <Image src="/homepage/starfield-background.png" alt="" fill sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-[#08090B]/55" />
        <Aurora tone="cool" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <SectionLabel className="mb-5">Locations</SectionLabel>
        <h2 id="locations-title" className="max-w-[640px] text-3xl font-black leading-[1.02] tracking-tight text-[#FAFAF9] md:text-5xl">
          Where BTE Works
        </h2>
        <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-[#FAFAF9]/70 md:text-base">
          Two programmes run in the UK today. Nigeria and Ireland are next. Drag the globe, or pick a place.
        </p>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-[620px]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.30)_0%,rgba(176,67,51,0.14)_55%,transparent_72%)] blur-2xl" />
            <Globe regions={regions} activeId={activeId} onSelect={select} onInteract={stopTour} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Choose a location">
              {regions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === activeId}
                  onClick={() => select(item.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868] ${
                    item.id === activeId
                      ? "border-[#E97868] bg-[#E97868] text-[#161415]"
                      : "border-white/25 text-[#FAFAF9]/80 hover:border-white/60 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span className={`text-[10px] font-medium uppercase tracking-wider ${item.id === activeId ? "text-[#161415]/70" : "text-[#E97868]"}`}>
                    {item.status === "live" ? "Live" : "Soon"}
                  </span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setTour(!tour)}
                className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-[#FAFAF9]/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]"
              >
                <span aria-hidden="true">{tour ? "❚❚" : "▶"}</span>
                {tour ? "Pause tour" : "Start tour"}
              </button>
            </div>

            <div key={`${region.id}-${siteIndex}`} aria-live="polite" className="panel-in mt-6 rounded-xl border border-white/10 bg-[#101216]/80 p-6 backdrop-blur-sm md:p-8">
              <p className="text-sm text-[#FAFAF9]/70">{region.line}</p>

              {region.sites.length > 1 && (
                <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={`${region.name} programmes`}>
                  {region.sites.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={index === siteIndex}
                      onClick={() => { setSiteIndex(index); setTour(false); }}
                      className={`rounded-md px-3 py-2 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868] ${
                        index === siteIndex ? "bg-white/15 text-white" : "bg-white/5 text-[#FAFAF9]/65 hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}

              <h3 className="mt-6 text-xl font-bold text-[#FAFAF9] md:text-2xl">{site.name}</h3>

              {region.stats.length > 0 && (
                <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-white/10 py-4">
                  {region.stats.map((stat) => (
                    <div key={stat.label}>
                      <dd className="order-1 text-2xl font-black leading-none text-[#FAFAF9] md:text-3xl">{stat.number}</dd>
                      <dt className="mt-1 text-[11px] text-[#FAFAF9]/60">{stat.label}</dt>
                    </div>
                  ))}
                </dl>
              )}

              <dl className="mt-5 grid gap-5 text-sm">
                <div>
                  <dt className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#E97868]">Office</dt>
                  <dd>{site.office ? <span className="text-[#FAFAF9]/85">{site.office}</span> : <Pending>Address to be confirmed</Pending>}</dd>
                </div>
                <div>
                  <dt className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#E97868]">What is here</dt>
                  <dd className="flex flex-col items-start gap-2">
                    {site.has.map((line) => <span key={line} className="text-[#FAFAF9]/85">{line}</span>)}
                    {site.has.length === 0 && <Pending>To be confirmed</Pending>}
                  </dd>
                </div>
                <div>
                  <dt className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#E97868]">What has been done</dt>
                  <dd className="flex flex-col items-start gap-2">
                    {site.done.map((line) => <span key={line} className="text-[#FAFAF9]/85">{line}</span>)}
                    {site.done.length === 0 && <Pending>To be confirmed</Pending>}
                  </dd>
                </div>
              </dl>

              <div className="mt-7">
                {site.href ? (
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-button inline-flex items-center gap-2 rounded-full bg-[#B04333] px-5 py-3 text-sm font-medium text-white hover:bg-[#923327] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]"
                  >
                    Visit site <span aria-hidden="true" className="text-xs">↗</span>
                  </a>
                ) : (
                  <span className="inline-flex rounded-full border border-dashed border-white/25 px-5 py-3 text-sm text-white/50">Site link to follow</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
