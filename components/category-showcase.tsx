"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { categories } from "@/lib/properties";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/section-reveal";
import { emitCategoryFilter } from "@/lib/category-filter-event";

const tiles = categories.filter((category) => category.id !== "todos");

export function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[15rem]">
      {tiles.map((category, index) => (
        <SectionReveal
          key={category.id}
          className={cn(
            "group relative overflow-hidden rounded-sm border border-foreground/10",
            index === 0
              ? "aspect-[4/5] sm:col-span-2 sm:aspect-[21/9] lg:col-span-2 lg:row-span-2 lg:aspect-auto"
              : "aspect-[4/3] lg:aspect-auto",
          )}
        >
          <Link
            href="#portfolio"
            onClick={() => emitCategoryFilter(category.id)}
            className="absolute inset-0"
          >
            {category.image ? (
              <Image
                src={category.image}
                alt=""
                fill
                sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent transition-colors duration-500 group-hover:from-background/90" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-teal">
                  {category.label}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 text-foreground/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                />
              </div>
              <p
                className={cn(
                  "mt-2 font-display font-medium leading-tight text-foreground",
                  index === 0 ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
                )}
              >
                {category.hook}
              </p>
            </div>
          </Link>
        </SectionReveal>
      ))}
    </div>
  );
}
