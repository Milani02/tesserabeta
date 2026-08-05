import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { MagneticCursor } from "@/components/ui/fluid-magnetic-cursor";
import { WhatsAppFloat } from "@/components/whatsapp-float";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const title = "Téssera | Alto Padrão, Lançamentos, Comercial, Industrial e Rural";
const description =
  "Téssera Negócios Imobiliários (CRECI 8380J) — portfólio curado de imóveis de alto padrão, lançamentos, comercial, industrial e rural em Londrina, Ibiporã e região. Busque por categoria e agende sua visita pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s",
  },
  description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Téssera Negócios Imobiliários",
    title,
    description,
    images: [{ url: "/mansoes/mansao-04-fachada-sol.jpg", width: 1280, height: 853 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/mansoes/mansao-04-fachada-sol.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Téssera Negócios Imobiliários",
  image: `${siteUrl}/mansoes/mansao-04-fachada-sol.jpg`,
  telephone: "+55-43-98837-0005",
  priceRange: "R$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Pernambuco, 390 — Edifício Nacional, sala 404",
    addressLocality: "Londrina",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  areaServed: [
    "Londrina",
    "Ibiporã",
    "Cambé",
    "Jataizinho",
    "Sertanópolis",
    "Cornélio Procópio",
  ],
  sameAs: ["https://www.instagram.com/tesseraimob"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "antialiased dark",
        fraunces.variable,
        inter.variable,
        plexMono.variable,
      )}
    >
      <body className="bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MagneticCursor
          cursorSize={22}
          cursorColor="#FFFFFF"
          blendMode="exclusion"
          magneticFactor={0.35}
          contrastBoost={1.6}
        >
          {children}
          <WhatsAppFloat />
        </MagneticCursor>
      </body>
    </html>
  );
}
