"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export function HeroIntro({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const eyebrow = root.querySelector("[data-hero-eyebrow]");
    const headlineMask = root.querySelector("[data-hero-headline-mask]");
    const headline = root.querySelector("[data-hero-headline]");
    const rest = root.querySelectorAll("[data-hero-fade]");

    if (prefersReducedMotion) {
      gsap.set([eyebrow, headline, ...Array.from(rest)], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(headlineMask, { overflow: "hidden" });
    gsap.set(headline, { yPercent: 115 });
    gsap.set(eyebrow, { opacity: 0, y: 12 });
    gsap.set(rest, { opacity: 0, y: 18 });

    const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "power3.out" } });
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 })
      .to(headline, { yPercent: 0, duration: 1.1, ease: "expo.out" }, "-=0.35")
      .to(rest, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.6");
  }, []);

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
