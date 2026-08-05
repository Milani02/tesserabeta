"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { AgendarVisitaButton } from "@/components/agendar-visita-button";

const NAV_LINKS = [
  { href: "#categorias", label: "Categorias" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#contato", label: "Contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const items = headerRef.current.querySelectorAll("[data-header-item]");
    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      items,
      { opacity: 0, y: -14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.2,
      },
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled
          ? "border-b border-foreground/10 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="#top"
          data-header-item
          className="group flex items-center gap-2.5 text-foreground"
        >
          <Image
            src="/tessera-mark.png"
            alt=""
            width={28}
            height={40}
            priority
            className="h-8 w-auto transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <span className="font-display text-lg font-medium tracking-wide">
            Téssera
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-header-item
              className="group relative py-1 font-mono-data text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-teal transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div data-header-item className="hidden sm:block">
          <AgendarVisitaButton
            propertyLabel="uma oportunidade do portfólio Téssera"
            variant="outline"
          />
        </div>

        <button
          type="button"
          data-header-item
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-5 bg-foreground transition-transform duration-300",
              menuOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-5 bg-foreground transition-transform duration-300",
              menuOpen && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-foreground/10 bg-background/95 backdrop-blur-md transition-[grid-template-rows,border-color] duration-400 ease-out md:hidden",
          menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr] border-t-0",
        )}
      >
        <div className="flex min-h-0 flex-col gap-1 px-6 py-6 sm:px-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-foreground/10 py-4 font-display text-xl text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6">
            <AgendarVisitaButton
              propertyLabel="uma oportunidade do portfólio Téssera"
              className="w-full justify-center"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
