import Image from "next/image";
import Link from "next/link";
import { Images } from "lucide-react";
import type { Property } from "@/lib/properties";
import { categories } from "@/lib/properties";
import { AgendarVisitaButton } from "@/components/agendar-visita-button";
import { Spotlight } from "@/components/spotlight";

export function PropertyCard({ property }: { property: Property }) {
  const categoryLabel = categories.find((c) => c.id === property.category)?.label;
  const detailHref = `/imovel/${property.code}`;

  return (
    <Spotlight className="group flex flex-col overflow-hidden rounded-sm border border-foreground/10 bg-card transition-colors duration-300 hover:border-teal/40">
      <Link href={detailHref} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={property.cover}
          alt={property.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-teal px-3 py-1 font-mono-data text-[11px] uppercase tracking-wide text-teal-foreground">
            {categoryLabel}
          </span>
          <span className="rounded-full bg-background/80 px-3 py-1 font-mono-data text-[11px] tracking-wide text-muted-foreground backdrop-blur">
            {property.code}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-300 group-hover:bg-background/40 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full border border-foreground/30 bg-background/70 px-4 py-2 font-mono-data text-xs uppercase tracking-wide text-foreground backdrop-blur">
            <Images aria-hidden className="h-3.5 w-3.5" />
            Ver fotos e detalhes
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        <div>
          <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-teal">
            {property.location} &middot; {property.city}
          </p>
          <Link href={detailHref}>
            <h3 className="mt-2 font-display text-xl font-medium leading-snug text-foreground transition-colors hover:text-teal sm:text-2xl">
              {property.title}
            </h3>
          </Link>
        </div>

        <dl className="grid grid-cols-3 gap-3 border-y border-foreground/10 py-4 font-mono-data text-xs text-muted-foreground">
          {property.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd className="mt-1 text-sm text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
          {property.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-2.5">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <div>
            {property.pricePrefix ? (
              <p className="font-mono-data text-xs uppercase tracking-wide text-muted-foreground">
                {property.pricePrefix}
              </p>
            ) : null}
            <p className="font-display text-2xl font-medium text-foreground">
              {property.price}
            </p>
            <p className="font-mono-data text-xs text-muted-foreground">
              {property.priceNote}
            </p>
          </div>
        </div>

        <AgendarVisitaButton
          propertyLabel={`${property.title} — ${property.location}, ${property.city} (${property.code})`}
          variant="outline"
          className="w-full justify-center"
        />
      </div>
    </Spotlight>
  );
}
