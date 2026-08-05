"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";

import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const el = document.getElementById("whatsapp-float");
    if (!el) return;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 });
      return;
    }

    gsap.to(el, {
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.8,
      duration: 0.35,
      ease: visible ? "back.out(1.7)" : "power2.in",
      pointerEvents: visible ? "auto" : "none",
    });
  }, [visible]);

  return (
    <Link
      id="whatsapp-float"
      href={buildWhatsAppLink("Olá, Téssera! Gostaria de falar sobre um imóvel.")}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      data-magnetic-color="#008080"
      aria-label="Falar com a Téssera pelo WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-teal-foreground opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-teal sm:bottom-8 sm:right-8"
      style={{ pointerEvents: "none" }}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </Link>
  );
}
