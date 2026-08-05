# Téssera — site institucional

Site institucional da Téssera Negócios Imobiliários (CRECI 8380J), construído em Next.js 16 (App Router) com Tailwind CSS v4, GSAP e shadcn/ui.

## Rodando localmente

Pré-requisitos: Node.js 20+.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) (ou a porta indicada no terminal, caso a 3000 esteja em uso).

## Scripts

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run start    # roda o build de produção
npm run lint     # eslint
```

## Estrutura

- `app/page.tsx` — landing page (hero, categorias, portfólio com busca/filtro, diferenciais, contato)
- `app/imovel/[code]/page.tsx` — página de detalhe de cada imóvel, com galeria completa
- `components/` — componentes da UI (header, cursor magnético, cards, galeria com lightbox, etc.)
- `lib/properties.ts` — dados dos imóveis e categorias exibidos no site
- `public/mansoes/` e `public/imoveis/` — fotos usadas na home e nas galerias de cada imóvel

## Variáveis de ambiente (opcional)

Crie um `.env.local` na raiz se for publicar em um domínio próprio, para que os metadados de Open Graph e o `sitemap.xml` apontem para a URL correta:

```
NEXT_PUBLIC_SITE_URL=https://www.seudominio.com.br
```

Sem essa variável, o site funciona normalmente em desenvolvimento (assume `http://localhost:3000`).

## Deploy

O projeto não depende de nenhum serviço externo além das fontes do Google (via `next/font`) — nenhuma chave de API é necessária. Pode ser publicado em qualquer plataforma compatível com Next.js (Vercel, Netlify, etc.) apenas com `npm run build`.
