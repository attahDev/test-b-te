"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    const protectImage = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("img, picture")) {
        event.preventDefault();
      }
    };
    document.addEventListener("dragstart", protectImage);
    document.addEventListener("contextmenu", protectImage);
    return () => {
      document.removeEventListener("dragstart", protectImage);
      document.removeEventListener("contextmenu", protectImage);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const element = entry.target as HTMLElement;
        const animation = element.animate(
          [{ opacity: 0, translate: "0 22px" }, { opacity: 1, translate: "0 0" }],
          { duration: 850, delay: Number(element.dataset.revealDelay ?? 0), easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.12 });

    // Animate content, never section/sticky containers or existing scroll transforms.
    document.querySelectorAll("section").forEach((section) => {
      section.querySelectorAll<HTMLElement>("h1, h2, article, [data-carousel-card], p").forEach((element, index) => {
        if (element.closest("article") && element.tagName !== "ARTICLE") return;
        element.dataset.revealDelay = String(Math.min(index % 4, 3) * 70);
        observer.observe(element);
      });
    });
    const cancel = () => { if (reducedMotion.matches) animations.forEach((animation) => animation.cancel()); };
    reducedMotion.addEventListener("change", cancel);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener("change", cancel);
    };
  }, [pathname]);

  return null;
}
