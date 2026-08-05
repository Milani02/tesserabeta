"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import gsap from "gsap";

import { categories, properties, type PropertyCategory } from "@/lib/properties";
import { cn } from "@/lib/utils";
import { PropertyCard } from "@/components/property-card";
import { CATEGORY_FILTER_EVENT } from "@/lib/category-filter-event";

const DIACRITICS_PATTERN = new RegExp("[\\u0300-\\u036f]", "g");

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(DIACRITICS_PATTERN, "");
}

export function PropertyExplorer() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PropertyCategory | "todos">("todos");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return properties.filter((property) => {
      if (activeCategory !== "todos" && property.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = normalize(
        `${property.title} ${property.location} ${property.city} ${property.code}`,
      );
      return haystack.includes(q);
    });
  }, [query, activeCategory]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const cards = grid.children;
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06 },
    );
  }, [filtered]);

  useEffect(() => {
    function handleCategoryFilter(event: Event) {
      const category = (event as CustomEvent<PropertyCategory | "todos">).detail;
      setActiveCategory(category);
      setQuery("");
    }

    window.addEventListener(CATEGORY_FILTER_EVENT, handleCategoryFilter);
    return () =>
      window.removeEventListener(CATEGORY_FILTER_EVENT, handleCategoryFilter);
  }, []);

  const activeMeta = categories.find((c) => c.id === activeCategory);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por cidade, condomínio ou código do imóvel"
              aria-label="Buscar imóveis por cidade, condomínio ou código"
              className="w-full rounded-full border border-foreground/15 bg-card py-3 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpar busca"
                className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <SlidersHorizontal
            aria-hidden
            className="mt-2.5 h-4 w-4 shrink-0 text-muted-foreground"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 font-mono-data text-xs uppercase tracking-wide transition-colors duration-200",
                  activeCategory === category.id
                    ? "border-teal bg-teal text-teal-foreground"
                    : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-foreground/10 pt-4">
          <p className="text-sm text-muted-foreground">
            {activeMeta?.description}
          </p>
          <p className="whitespace-nowrap font-mono-data text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "imóvel" : "imóveis"}
          </p>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div ref={gridRef} className="mt-10 grid gap-8 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.code} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-sm border border-dashed border-foreground/15 py-20 text-center">
          <p className="font-display text-xl text-foreground">
            Nenhum imóvel encontrado
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Ajuste a busca ou fale com a Téssera — temos oportunidades que
            ainda não estão publicadas no site.
          </p>
        </div>
      )}
    </div>
  );
}
