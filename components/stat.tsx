"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export function Stat({ value, prefix = "", suffix = "", label }: StatProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const counter = { current: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        current: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(counter.current)}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, prefix, suffix]);

  return (
    <div className="flex flex-col gap-1">
      <span
        ref={numberRef}
        className="font-display text-4xl font-medium text-foreground sm:text-5xl"
      >
        {prefix}0{suffix}
      </span>
      <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
