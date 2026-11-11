// Hero background layers (aurora curtains and particles) with a pause control for the motion.
"use client";

import { useState, useSyncExternalStore } from "react";
import AuroraCurtains from "./AuroraCurtains";
import Particles from "./Particles";

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribe(notify: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

export default function HeroBackdrop() {
  const [choice, setChoice] = useState<boolean | null>(null);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED).matches, () => true);
  const paused = choice ?? reduced;

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AuroraCurtains paused={paused} />
        <Particles paused={paused} />
      </div>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setChoice(!paused)}
        className="absolute bottom-5 right-5 z-20 rounded-full border border-white/15 bg-black/30 px-4 py-2 font-mono text-xs text-[#FAFAF9]/75 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]"
      >
        {paused ? "Play background" : "Pause background"}
      </button>
    </>
  );
}
