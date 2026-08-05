"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

export function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, close, showPrev, showNext]);

  useEffect(() => {
    if (activeIndex === null) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    gsap.fromTo(
      frameRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
    );
  }, [activeIndex]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-sm border border-foreground/10",
              index === 0 && "col-span-2 row-span-2 aspect-square sm:aspect-[4/3]",
            )}
          >
            <Image
              src={src}
              alt={`${title} — foto ${index + 1}`}
              fill
              sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-300 group-hover:bg-background/40 group-hover:opacity-100">
              <Expand aria-hidden className="h-5 w-5 text-foreground" />
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex flex-col bg-background/97 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de fotos — ${title}`}
        >
          <div className="flex items-center justify-between px-6 py-5 sm:px-10">
            <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {activeIndex + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar galeria"
              className="-m-2.5 flex h-11 w-11 items-center justify-center text-foreground/70 transition-colors hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={frameRef}
            className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 pb-8 sm:px-10"
          >
            <button
              type="button"
              onClick={showPrev}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/15 bg-background/60 text-foreground transition-colors hover:border-teal hover:text-teal sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="relative h-full max-h-[75vh] w-full">
              <Image
                src={images[activeIndex]}
                alt={`${title} — foto ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/15 bg-background/60 text-foreground transition-colors hover:border-teal hover:text-teal sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
