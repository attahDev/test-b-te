"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const programmes = [
  "Greater Manchester Black Tech Expo",
  "South Yorkshire Black Tech Expo",
  "BTE Academy",
  "Black Tech Expo Hall of Fame",
];

export default function Navbar() {
  const [isProgrammesOpen, setIsProgrammesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProgrammesOpen, setIsMobileProgrammesOpen] = useState(false);
  const programmesMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProgrammesOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !programmesMenuRef.current?.contains(event.target)
      ) {
        setIsProgrammesOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isProgrammesOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !mobileMenuRef.current?.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setIsMobileProgrammesOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMobileMenuOpen]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-16">
      <div className="flex items-center gap-2">
        <Image
          src="/homepage/bte-logo.png"
          alt="Black Tech Expo Logo"
          width={40}
          height={40}
          className="h-10 w-auto"
        />
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm text-[#FAFAF9]/80">
        <Link
          href="#who-we-are"
          className="hover:text-[#FAFAF9] transition-colors"
        >
          Who We Are
        </Link>
        <Link
          href="/ecosystem"
          className="hover:text-[#FAFAF9] transition-colors"
        >
          Our Ecosystem
        </Link>
        <div ref={programmesMenuRef} className="relative">
          <button
            type="button"
            aria-expanded={isProgrammesOpen}
            aria-controls="navbar-programmes"
            onClick={() => setIsProgrammesOpen((open) => !open)}
            className="inline-flex items-center gap-2 hover:text-[#FAFAF9] transition-colors"
          >
            Our Programmes
            <span aria-hidden="true" className="text-lg leading-none">
              {isProgrammesOpen ? "×" : "+"}
            </span>
          </button>
          {isProgrammesOpen && (
            <div
              id="navbar-programmes"
              className="absolute left-1/2 top-full z-50 mt-6 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-white/10 bg-[#161415] p-2 shadow-xl"
            >
              {programmes.map((programme) => (
                <Link
                  key={programme}
                  href="#"
                  onClick={() => setIsProgrammesOpen(false)}
                  className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm text-[#FAFAF9]/80 transition-colors hover:bg-white/10 hover:text-[#FAFAF9]"
                >
                  {programme}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0"
                  >
                    <path d="M14 3h7v7M10 14 21 3" />
                    <path d="M21 14v7H3V3h7" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden items-center md:flex">
        <Link
          href="#"
          className="inline-flex items-center gap-1 rounded-full bg-[#B04333] px-5 py-2 text-sm text-white hover:bg-[#923327] transition-colors"
        >
          Work with BTE ↗
        </Link>
      </div>

      <div ref={mobileMenuRef} className="relative md:hidden">
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FAFAF9]/30 text-[#FAFAF9] transition-colors hover:bg-[#FAFAF9]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E97868]"
        >
          {isMobileMenuOpen ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-white/10 bg-[#161415] p-4 shadow-xl"
          >
            <div className="flex flex-col items-stretch gap-1 text-sm text-[#FAFAF9]/85">
              <Link
                href="#who-we-are"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-white"
              >
                Who We Are
              </Link>
              <Link
                href="/ecosystem"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-white"
              >
                Our Ecosystem
              </Link>
              <button
                type="button"
                aria-expanded={isMobileProgrammesOpen}
                aria-controls="mobile-programme-links"
                onClick={() => setIsMobileProgrammesOpen((open) => !open)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-left transition-colors hover:bg-white/10 hover:text-white"
              >
                Our Programmes
                <span aria-hidden="true" className="text-lg leading-none">
                  {isMobileProgrammesOpen ? "×" : "+"}
                </span>
              </button>
              {isMobileProgrammesOpen && (
                <div id="mobile-programme-links" className="ml-2 border-l border-white/15 pl-2">
                  {programmes.map((programme) => (
                    <Link
                      key={programme}
                      href="#"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileProgrammesOpen(false);
                      }}
                      className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-xs text-[#FAFAF9]/75 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {programme}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 shrink-0"
                      >
                        <path d="M14 3h7v7M10 14 21 3" />
                        <path d="M21 14v7H3V3h7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1 rounded-full bg-[#B04333] px-5 py-3 text-sm text-white transition-colors hover:bg-[#923327]"
              >
                Work with BTE ↗
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
