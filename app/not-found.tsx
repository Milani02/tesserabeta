import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AgendarVisitaButton } from "@/components/agendar-visita-button";

export default function NotFound() {
  return (
    <div className="relative">
      <SiteHeader />

      <main className="flex min-h-[80svh] flex-col items-center justify-center px-6 pt-24 text-center sm:px-10">
        <Image
          src="/tessera-mark.png"
          alt=""
          width={64}
          height={91}
          className="h-16 w-auto opacity-40"
        />
        <p className="mt-8 font-mono-data text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Erro 404
        </p>
        <h1 className="mt-4 max-w-lg font-display text-3xl font-medium leading-tight text-foreground sm:text-4xl">
          Esse endereço não está no nosso portfólio.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          A página que você procura pode ter sido movida ou o imóvel não está
          mais disponível. Volte para o início ou fale com a equipe Téssera.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <AgendarVisitaButton propertyLabel="uma oportunidade do portfólio Téssera" />
          <Link
            href="/"
            className="py-1.5 font-mono-data text-xs uppercase tracking-[0.2em] text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Voltar ao início
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
