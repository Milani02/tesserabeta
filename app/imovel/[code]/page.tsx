import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { categories, properties, type Property } from "@/lib/properties";
import { getPropertyGallery } from "@/lib/gallery";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyGallery } from "@/components/property-gallery";
import { AgendarVisitaButton } from "@/components/agendar-visita-button";
import { SectionReveal } from "@/components/section-reveal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return properties.map((property) => ({ code: property.code }));
}

function getProperty(code: string) {
  return properties.find((property) => property.code === code);
}

function getRelatedProperties(property: Property) {
  return properties
    .filter((candidate) => candidate.category === property.category && candidate.code !== property.code)
    .slice(0, 3);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const property = getProperty(code);
  if (!property) return {};

  const title = `${property.title} | Téssera`;
  const description = `${property.location}, ${property.city} — ${property.price}. ${property.description}`;

  return {
    title,
    description,
    alternates: { canonical: `/imovel/${property.code}` },
    openGraph: {
      type: "website",
      title,
      description,
      images: [{ url: property.cover, width: 1280, height: 960 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [property.cover],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const property = getProperty(code);
  if (!property) notFound();

  const gallery = getPropertyGallery(property.code);
  const images = gallery.length > 0 ? gallery : [property.cover];
  const categoryLabel = categories.find((c) => c.id === property.category)?.label;
  const whatsappLabel = `${property.title} — ${property.location}, ${property.city} (${property.code})`;
  const related = getRelatedProperties(property);

  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${siteUrl}/imovel/${property.code}`,
    image: images.map((src) => `${siteUrl}${src}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city.split("/")[0],
      addressRegion: property.city.split("/")[1] ?? "PR",
      addressCountry: "BR",
    },
    offers: {
      "@type": "Offer",
      price: property.price.replace(/\D/g, ""),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <SiteHeader />

      <main className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono-data text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <li>
                <Link href="/" className="rounded-sm py-1 transition-colors hover:text-foreground">
                  Início
                </Link>
              </li>
              <ChevronRight aria-hidden className="h-3 w-3 shrink-0" />
              <li>
                <Link
                  href="/#portfolio"
                  className="rounded-sm py-1 transition-colors hover:text-foreground"
                >
                  Portfólio
                </Link>
              </li>
              <ChevronRight aria-hidden className="h-3 w-3 shrink-0" />
              <li className="text-foreground/70" aria-current="page">
                {property.code}
              </li>
            </ol>
          </nav>

          <Link
            href="/#portfolio"
            className="mt-4 inline-flex items-center gap-2 py-1.5 font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao portfólio
          </Link>

          <div className="mt-6 flex flex-col justify-between gap-6 border-b border-foreground/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-teal px-3 py-1 font-mono-data text-[11px] uppercase tracking-wide text-teal-foreground">
                  {categoryLabel}
                </span>
                <span className="font-mono-data text-xs text-muted-foreground">
                  {property.code}
                </span>
              </div>
              <p className="mt-3 font-mono-data text-xs uppercase tracking-[0.2em] text-teal">
                {property.location} &middot; {property.city}
              </p>
              <h1 className="mt-2 max-w-2xl font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-5xl">
                {property.title}
              </h1>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              {property.pricePrefix ? (
                <p className="font-mono-data text-xs uppercase tracking-wide text-muted-foreground">
                  {property.pricePrefix}
                </p>
              ) : null}
              <p className="font-display text-3xl font-medium text-foreground sm:text-4xl">
                {property.price}
              </p>
              <p className="font-mono-data text-xs text-muted-foreground">
                {property.priceNote}
              </p>
            </div>
          </div>
        </div>

        <SectionReveal className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-14">
          <PropertyGallery images={images} title={property.title} />
        </SectionReveal>

        <div className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 sm:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,340px)]">
            <SectionReveal>
              <dl className="grid grid-cols-3 gap-4 border-y border-foreground/10 py-6 font-mono-data text-xs text-muted-foreground sm:max-w-md">
                {property.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd className="mt-1 text-base text-foreground">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/85">
                {property.description}
              </p>

              <ul className="mt-8 flex max-w-2xl flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                {property.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal
              as="aside"
              className="flex h-fit flex-col gap-5 rounded-sm border border-foreground/10 bg-card p-6 sm:p-7"
            >
              <div>
                <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Interessado neste imóvel?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  Fale agora com a equipe Téssera e agende uma visita a este
                  imóvel.
                </p>
              </div>
              <AgendarVisitaButton
                propertyLabel={whatsappLabel}
                className="w-full justify-center"
              />
              <p className="font-mono-data text-xs text-muted-foreground">
                CRECI 8380J &middot; (43) 98837-0005
              </p>
            </SectionReveal>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="border-t border-foreground/10 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
              <SectionReveal className="mb-10 sm:mb-12">
                <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Continue explorando
                </p>
                <h2 className="mt-3 max-w-xl font-display text-2xl font-medium leading-tight text-foreground sm:text-3xl">
                  Outras oportunidades em {categoryLabel?.toLowerCase()}.
                </h2>
              </SectionReveal>

              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.code}
                    href={`/imovel/${item.code}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-foreground/10"
                  >
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-teal">
                        {item.city}
                      </p>
                      <p className="mt-1 font-display text-lg font-medium leading-snug text-foreground">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
