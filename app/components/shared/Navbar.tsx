"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "/", match: "/" },
  { label: "Our Ecosystem", href: "/ecosystem", match: "/ecosystem" },
  { label: "Connect", href: "/contact", match: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !mobileMenuRef.current?.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav aria-label="Main" className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-16">
      <Link href="/" aria-label="Black Tech Expo home" className="flex items-center gap-2">
        <Image
          src="/homepage/bte-logo.png"
          alt="Black Tech Expo Logo"
          width={40}
          height={40}
          className="h-10 w-auto"
        />
      </Link>

      <div className="hidden items-center gap-10 text-sm text-[#FAFAF9]/80 md:flex">
        {links.map((link) => {
          const current = link.match !== "" && pathname === link.match;
          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={current ? "page" : undefined}
              className={`nav-link relative py-1 transition-colors hover:text-[#FAFAF9] ${current ? "text-[#FAFAF9]" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="hidden items-center md:flex">
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 rounded-full bg-[#B04333] px-5 py-2 text-sm text-white transition-colors hover:bg-[#923327]"
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
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d={isMobileMenuOpen ? "m18 6-12 12M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} />
          </svg>
        </button>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="absolute right-0 top-full mt-3 w-[min(20rem,calc(100vw-3rem))] rounded-2xl border border-white/10 bg-[#161415] p-4 shadow-xl"
          >
            <div className="flex flex-col items-stretch gap-1 text-sm text-[#FAFAF9]/85">
              {links.map((link) => {
                const current = link.match !== "" && pathname === link.match;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-3 transition-colors hover:bg-white/10 hover:text-white ${current ? "bg-white/10 text-white" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
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
