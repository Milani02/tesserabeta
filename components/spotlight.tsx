"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("group/spotlight relative", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--teal) 16%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
