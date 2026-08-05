import Image from "next/image";
import Link from "next/link";

import { buildWhatsAppLink } from "@/lib/whatsapp";
import { AgendarVisitaButton } from "@/components/agendar-visita-button";
import { PropertyExplorer } from "@/components/property-explorer";
import { CategoryShowcase } from "@/components/category-showcase";
import { SiteHeader } from "@/components/site-header";
import { HeroIntro } from "@/components/hero-intro";
import { SectionReveal } from "@/components/section-reveal";
import { AmenitiesMarquee } from "@/components/amenities-marquee";
import { Stat } from "@/components/stat";
import { SiteFooter } from "@/components/site-footer";

const differentials = [
  "Portfólio em 5 frentes: alto padrão, lançamentos, comercial, industrial e rural",
  "Um único corretor do primeiro contato à assinatura",
  "Resposta direta pelo WhatsApp, sem formulário e sem espera",
  "Atuação em Londrina, Ibiporã, Cambé, Jataizinho, Sertanópolis e Cornélio Procópio",
  "Cada imóvel visitado e fotografado pela própria equipe antes de entrar no portfólio",
  "CRECI 8380J",
];

const serviceAreas = [
  "Londrina",
  "Ibiporã",
  "Cambé",
  "Jataizinho",
  "Sertanópolis",
  "Cornélio Procópio",
];

export default function Home() {
  return (
    <div id="top" className="relative">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
          <Image
            src="/mansoes/mansao-04-fachada-sol.jpg"
            alt="Fachada contemporânea iluminada pelo sol, Royal Boulevard Residence & Resort"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background from-0% via-background/80 via-65% to-transparent to-100%" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 from-0% to-transparent to-45%" />

          <HeroIntro>
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 sm:pb-24">
              <p
                data-hero-eyebrow
                className="font-mono-data text-xs uppercase tracking-[0.3em] text-teal drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
              >
                Téssera Negócios Imobiliários &middot; CRECI 8380J
              </p>
              <div data-hero-headline-mask className="mt-6 max-w-3xl overflow-hidden">
                <h1
                  data-hero-headline
                  className="font-display text-4xl font-medium leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
                >
                  Um portfólio de endereços extraordinários.
                </h1>
              </div>
              <p
                data-hero-fade
                className="mt-6 max-w-xl text-balance text-base leading-relaxed text-foreground/80 sm:text-lg"
              >
                Alto padrão, lançamentos, comercial, industrial e rural — a
                Téssera negocia cada categoria com a mesma curadoria que
                aplicamos às nossas mansões de vitrine. Encontre o seu em
                minutos, converse com a equipe no mesmo instante.
              </p>
              <div
                data-hero-fade
                className="mt-10 flex flex-wrap items-center gap-5"
              >
                <AgendarVisitaButton propertyLabel="uma oportunidade do portfólio Téssera" />
                <Link
                  href="#portfolio"
                  className="font-mono-data text-xs uppercase tracking-[0.2em] text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Buscar imóveis
                </Link>
              </div>
            </div>
          </HeroIntro>
        </section>

        {/* STATS STRIP */}
        <section className="border-b border-foreground/10 py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <Stat value={5} label="Categorias de imóveis" />
              <Stat value={6} label="Cidades atendidas" />
              <Stat value={7} label="Oportunidades em destaque" />
              <div className="flex flex-col gap-1">
                <span className="font-display text-4xl font-medium text-foreground sm:text-5xl">
                  8380-J
                </span>
                <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  CRECI ativo
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY SHOWCASE */}
        <section id="categorias" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <SectionReveal className="mb-14 flex flex-col gap-4 sm:mb-16">
              <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Cinco frentes, um só endereço de confiança
              </p>
              <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-5xl">
                De onde morar a onde produzir.
              </h2>
            </SectionReveal>

            <CategoryShowcase />
          </div>
        </section>

        {/* PROPERTY EXPLORER */}
        <section id="portfolio" className="border-t border-foreground/10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <SectionReveal className="mb-14 sm:mb-16">
              <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Buscar no portfólio
              </p>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                Encontre o imóvel certo, no seu ramo de negócio.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Filtre por categoria ou busque por cidade, condomínio ou
                código. Toda oportunidade abaixo já foi visitada pela nossa
                equipe — clique em "Agendar visita" e fale direto no WhatsApp.
              </p>
            </SectionReveal>

            <PropertyExplorer />
          </div>
        </section>

        {/* DIFFERENTIALS */}
        <section id="diferenciais" className="border-t border-foreground/10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <SectionReveal>
              <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Por que negociar com a Téssera
              </p>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl">
                Um portfólio amplo, tratado com atenção de vitrine.
              </h2>
            </SectionReveal>

            <AmenitiesMarquee items={differentials} />
          </div>
        </section>

        {/* SERVICE AREA */}
        <section className="border-t border-foreground/10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-10 md:grid-cols-[minmax(0,240px)_1fr] md:gap-16">
              <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Onde atuamos
              </p>
              <SectionReveal>
                <p className="max-w-2xl text-balance font-display text-2xl font-normal leading-snug text-foreground sm:text-3xl">
                  Da Gleba Palhano aos condomínios de Ibiporã — a Téssera
                  acompanha o crescimento da região norte do Paraná.
                </p>
                <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                  {serviceAreas.map((city) => (
                    <span
                      key={city}
                      className="font-mono-data text-sm text-muted-foreground"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contato" className="border-t border-foreground/10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,360px)] lg:items-end">
              <SectionReveal>
                <h2 className="max-w-xl font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-5xl">
                  Pronto para o seu próximo negócio?
                </h2>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Residência, ponto comercial, galpão ou fazenda — fale
                  diretamente com a equipe Téssera pelo WhatsApp e agende uma
                  visita ainda hoje.
                </p>
                <div className="mt-10">
                  <AgendarVisitaButton propertyLabel="uma oportunidade do portfólio Téssera" />
                </div>
              </SectionReveal>

              <dl className="flex flex-col gap-6 border-t border-foreground/10 pt-10 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
                <div>
                  <dt className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Telefone / WhatsApp
                  </dt>
                  <dd className="mt-2 text-sm text-foreground">
                    <Link href={buildWhatsAppLink("Olá, Téssera! Gostaria de mais informações.")} target="_blank" rel="noopener noreferrer">
                      (43) 98837-0005
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Endereço
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground">
                    Rua Pernambuco, 390 — Edifício Nacional, sala 404
                    <br />
                    Centro, Londrina/PR
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Atendimento
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground">
                    Segunda a sexta, 8h—18h
                    <br />
                    Sábado, 8h—12h
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-data text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Instagram
                  </dt>
                  <dd className="mt-2 text-sm text-foreground">@tesseraimob</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
