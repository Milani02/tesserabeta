# Téssera — mockup estático (contexto do projeto)

Este arquivo existe para que qualquer sessão do Claude (em qualquer máquina/conta) que abra este
repositório entenda imediatamente o que é este projeto, por que foi feito assim, e quais decisões
já foram tomadas — sem precisar redescobrir tudo do zero.

## O que é isto

Mockup estático (HTML/CSS/JS puro, sem framework) do site institucional da **Téssera Negócios
Imobiliários** (CRECI 8380J, Londrina/PR). Não é o site final — é a peça visual da **Fase 2
(Design)** de uma proposta comercial: o dono deste repo é um freelancer/agência propondo à Téssera
um site sob medida para substituir o site atual deles, que roda no template padrão da plataforma
Kenlo (genérico, igual ao de qualquer concorrente que também usa Kenlo).

Este mockup existe para ser mostrado à Téssera antes de qualquer linha de backend ser escrita.

**Nota:** já existe (ou existiu) neste mesmo repositório uma implementação completamente diferente
— um site Next.js real com dados de imóveis, galerias e páginas de detalhe. Esse trabalho foi
**substituído** por este mockup estático a pedido explícito do usuário (não foi perdido — está no
histórico de commits do git, recuperável a qualquer momento). Se o usuário perguntar por aquele
projeto, ele está em commits anteriores a este.

## Identidade visual — de onde veio

A paleta, tipografia e conteúdo institucional foram extraídos do site **real** da Téssera
(tessera.imb.br), não inventados:

- **Cor de marca:** `#004536` (verde escuro institucional), `#00332a` (variante mais escura)
- **Tipografia:** Red Hat Display (títulos, peso 700/900) + Open Sans (corpo, 400/600) — fontes
  reais usadas no site deles
- **Radius de botão:** 12px (não pill/100%) — replicado do botão real "Encontrar imóvel" do site
  deles
- **Dados institucionais reais:** CRECI 8380J · Rua Pernambuco, 390, Ed. Nacional, Sala 404,
  Centro, Londrina/PR · (43) 98837-0005 · Seg-sex 08h-18h, Sáb 08h-12h · Facebook/Instagram/YouTube
  @tesseraimob
- **Cidades atendidas:** Londrina, Ibiporã, Cambé, Jataizinho, Cascavel, Umuarama
- **Segmentos:** Residencial (apartamento/casa/sobrado/kitnet/flat) · Comercial & Industrial
  (sala/loja/salão/barracão/prédio/andar corporativo) · Rural (área/chácara/fazenda/sítio/terreno)
- **Amostra de imóveis reais** usada nos cards de destaque (código, bairro, quartos, área, preço) —
  vieram de um levantamento direto do site deles em 25/08/2026, não são inventados

## Estrutura/efeitos — de onde vieram, e o limite ético que foi mantido

O usuário pediu para clonar a **estrutura e os efeitos de scroll** de um site de referência
(findrealestate.com — uma imobiliária americana, sem relação com a Téssera). Isso foi feito com um
limite deliberado:

- ✅ **Permitido e feito:** replicar layout, animações, timing de scroll, comportamento de
  header/hero — isso não é conteúdo protegido por direitos autorais da mesma forma que texto/fotos.
- ❌ **Recusado:** baixar e reusar as fotos, vídeos ou textos de marketing reais do
  findrealestate.com. Seria violação de direitos autorais (fotografia licenciada deles) e uso
  indevido de imagem (algumas fotos mostram pessoas reais). Em vez disso: a foto da casa do hero
  (`images/hero-house.jpg`) e as texturas de nuvem (`images/cloud-1.jpg`, `images/cloud-2.jpg`) são
  **geradas por IA** (Google Flow), a pedido do usuário, especificamente para reproduzir o
  enquadramento/composição do hero do site de referência sem usar o asset real deles. As nuvens
  foram geradas sobre fundo preto sólido de propósito, para permitir compositing via
  `mix-blend-mode: screen` (ver seção do hero abaixo). O restante das fotos/vídeo é de banco de
  imagens livre (Unsplash/Pexels, uso comercial permitido), e todo o copy é original em português,
  escrito para a Téssera.

Se o usuário pedir para "copiar mais uma coisa do site de referência", o mesmo limite se aplica:
estrutura/efeito sim, ativos (foto/vídeo/texto) reais deles não.

## O efeito do hero (a parte mais trabalhada — cuidado ao mexer)

O hero (`#hero` em `index.html`, regras `.hero*` em `styles.css`, lógica em `script.js`
`updateHero()`) é uma seção **pinada** (`position: sticky`) com scroll-scrub: `.hero` tem
`height: 500vh` (100vh de pin + 400vh de "trilho" de scroll), proporção medida **diretamente** no
findrealestate.com (root deles: 2885px / viewport 577px ≈ 5×) — não é um número arbitrário.

Curva de animação (0 = topo do hero, 1 = fim do pin), lógica completa em `updateHero()`:

- **0%–18%:** headline/subtítulo/CTA do hero desaparecem (fade + translateY)
- **5%–77%:** o wordmark "TÉSSERA" nasce pequeno (opacity 0→1 rápido), **cresce continuamente**
  (`scale(0.5 → 2.6)`) e **desce** (`translateY(-6% → 22%)`) enquanto cresce — o texto tem
  `background-clip: text` usando a MESMA foto do hero por trás (`images/hero-house.jpg`), então a
  casa "aparece dentro" das letras conforme elas crescem (efeito de profundidade/3D)
- **72%–92%:** wordmark desaparece (fade out)
- **0%–100%:** a foto do hero faz um zoom + pan contínuo (`translateY` até `-0.82×vh`,
  `scale` até `1.29`) — **importante:** o elemento da foto precisa de overscan generoso
  (`top:-15%; bottom:-110%`, ~225vh de altura real) para nunca "ficar sem imagem" durante o pan.
  Já existiu um bug em que isso ficava curto e aparecia uma faixa cinza estática embaixo — se mexer
  no valor do `translateY`, reconferir o overscan.
- **0%–100%:** nuvens "ambiente" (`.hero__clouds` / `#heroClouds`, 4 `.cloud--N`) — fotos reais de
  nuvem geradas por IA sobre fundo preto (`images/cloud-1.jpg`, `images/cloud-2.jpg`), cada uma com
  `mask-image: radial-gradient(...)` pra pena a borda (sem cantos quadrados visíveis) e drift
  horizontal lento via `@keyframes cloudDrift1/2` (110–175s, `linear infinite`). Sobem lentamente a
  taxa `translateY(progress × -0.35 × vh)`.
- **94%–100% (últimos 6% do scroll, bem rápido de propósito):** nuvens "finale"
  (`.hero__clouds--finale` / `#heroCloudsFinale`, 4 `.cloud--finale-N`, mesma técnica de imagem +
  máscara) sobem e ganham opacidade/escala num burst curto (`(progress-0.94)/0.06`), cobrindo o
  frame bem no fim do pin — a ideia é a próxima seção já estar visível assim que o pin solta, sem
  tela branca parada nem faixa sólida. **Já foi tentada uma "cortina" sólida (fundo opaco +
  `isolation:isolate`) e o usuário rejeitou explicitamente** — prefere ver formas de nuvem
  individuais subindo, não uma faixa lisa. Se mexer nesse trecho de novo, manter formas
  reconhecíveis de nuvem, não um bloco de cor.
- **Header:** fica 100% transparente (texto branco) durante TODO o scroll do hero, e só fica sólido
  exatamente quando o pin termina (`position: fixed`, não `sticky` — isso importa, `sticky` reserva
  espaço no fluxo e quebra o efeito de sobreposição transparente).

**Pegadinha de CSS já pisada duas vezes — `mix-blend-mode` e stacking context:** `.hero__clouds`
tem `mix-blend-mode: screen` no **container**, não nos `.cloud` filhos. Se colocar `z-index` num
elemento pai de algo com blend-mode, ele cria seu próprio stacking context e isola o blend dos
filhos — o blend para de "ver" o que está atrás e a nuvem renderiza como retângulo preto sólido em
vez de compor com a foto. Foi exatamente esse bug que aconteceu aqui. Se precisar adicionar mais
camadas com blend-mode, ou o blend fica no container (sem z-index competindo) ou usa
`isolation: isolate` deliberadamente pra escopar o grupo.

**Cache-busting:** `index.html` referencia `styles.css?v=N` e `script.js?v=N` — **os dois**
precisam do query param bumped a cada edição desses arquivos, não só o CSS. Já rolou um bug (erros
`Cannot read properties of null`) porque só `styles.css` tinha cache-bust e o browser servia uma
versão antiga cacheada de `script.js` que referenciava elementos de um estado intermediário do
código.

Todo esse timing foi originalmente obtido via `window.scrollTo()` + `getComputedStyle()` amostrado
em vários pontos do scroll do site de referência (não é chute), depois ajustado por rodadas de
feedback visual direto do usuário. Se precisar re-medir no findrealestate.com, essa é a técnica que
funcionou (mas cuidado: rolagem programática via JS pode dessincronizar com bibliotecas de scroll
que mantêm estado próprio — nesse caso, usar rolagem de mouse real via automação do navegador em
vez de `scrollTo`).

## Seções da página (nesta ordem)

1. Header (fixed, transparente→sólido)
2. Hero (pin de 500vh, descrito acima)
3. "Why Téssera" — texto com reveal bicolor + **vídeo em loop mudo** (`video/why-video.mp4`,
   timelapse de nuvens/cidade, Pexels, licença livre) — substitui a foto estática que teria aqui
4. Chevron gallery — 4 fotos em recorte de seta/paralelogramo (`clip-path: polygon(...)`) que
   revelam em sequência no scroll (retrato mulher → quarto → sala → retrato homem)
5. Stats (82 apartamentos à venda, 154 para alugar, 27+ tipos)
6. Segmentos (Residencial/Comercial/Rural, cards com foto de fundo + overlay escuro)
7. Listings (3 imóveis em destaque, dados reais)
8. Bigtext (Comprar / Alugar, tipografia gigante sobre fundo verde escuro)
9. Regions (chips de cidades e bairros atendidos)
10. Dark CTA (telefone/WhatsApp, horário, CRECI)
11. Services (links úteis: IPTU, registro de imóveis, Copel, Sanepar, IPPUL — reais)
12. Final CTA (foto full-bleed + botão)
13. Footer (contato completo, redes sociais, links legais)

**Todas as seções** usam duas classes utilitárias de scroll-reveal (`script.js`, um único
`IntersectionObserver` no fim do arquivo):
- `.reveal-text` com um `<span class="is-muted">` dentro — a parte muted vai de opacity .4 → 1
  quando entra na viewport (efeito bicolor tipo "Why Us" do site de referência)
- `.fade-up` / `.fade-up-group` — sobe + fade in, com atraso escalonado por `nth-child` dentro de
  `.fade-up-group` (cards de grid, chips, etc.)

Deliberadamente **não existem** depoimentos de clientes nem posts de blog fabricados — inventar
isso seria fabricar conteúdo falso em nome de uma empresa real. Se o usuário fornecer depoimentos
ou artigos reais, encaixar nessas seções (que hoje não existem e precisariam ser criadas).

## Arquivos

- `index.html`, `styles.css`, `script.js` — o site, servido localmente via
  `python -m http.server 8792` a partir desta pasta (não há build step; é HTML/CSS/JS puro)
- `build_artifact.py` — script Python que gera `tessera-pitch.html`: um único arquivo HTML
  autocontido (CSS e JS inline, fontes e as imagens/vídeo referenciados em `IMAGE_MAP` embutidos
  como `data:` URI em base64) para publicar como Claude Artifact, que tem CSP estrita e bloqueia
  requisições externas. Rodar `python build_artifact.py` sempre que `index.html`/`styles.css`
  mudarem e for preciso republicar o Artifact. **Atenção — está desatualizado:** o `IMAGE_MAP`
  ainda mapeia URLs antigas do Unsplash para `images/hero.jpg`, mas o hero atual usa
  `images/hero-house.jpg` (foto gerada por IA, caminho local, não é mais URL remota) e as nuvens
  `images/cloud-1.jpg`/`cloud-2.jpg` — nenhum dos dois está no `IMAGE_MAP`. O vídeo
  (`video/why-video.mp4`, 2.5MB) também nunca foi adicionado. **Antes de rodar o script de novo,
  atualizar `IMAGE_MAP` com esses três assets**, ou o Artifact vai publicar com hero/nuvens/vídeo
  quebrados. O usuário pediu para não republicar o Artifact proativamente — só fazer isso se ele
  pedir de novo.
- `fonts/` — Red Hat Display e Open Sans em `.woff2`, baixados do Google Fonts e convertidos pra
  base64 (`.b64`) só para uso do `build_artifact.py`
- `images/` — fotos usadas no site. `hero-house.jpg` (casa do hero) e `cloud-1.jpg`/`cloud-2.jpg`
  (texturas de nuvem, fundo preto sólido pra `mix-blend-mode:screen`) foram geradas por IA
  especificamente pra este projeto — ver seção do hero acima. As demais (`finalcta.jpg`,
  `listing1-3.jpg`, `seg-comercial/residencial/rural.jpg`) são do Unsplash. `hero.jpg` é a foto
  antiga do hero (Unsplash), mantida só porque o `IMAGE_MAP` desatualizado do `build_artifact.py`
  ainda aponta pra ela — não é mais usada em `index.html`/`styles.css`.
- `video/why-video.mp4` — vídeo de fundo da seção "Why Téssera" (Pexels, "Cloudy Sky Time Lapse",
  id 5324343, versão HD 1920x1080)
- `tessera-pitch.html` — build gerado (não editar direto; editar `index.html`/`styles.css`/
  `script.js` e rodar `build_artifact.py` de novo, depois de corrigir o `IMAGE_MAP` como descrito
  acima)

## Acesso local / rede

Servidor de dev: `python -m http.server 8792` dentro desta pasta, depois abrir
`http://localhost:8792/index.html`. Para acessar de outra máquina na mesma rede, seria preciso
uma regra de firewall liberando a porta 8792 (comando fica documentado na conversa original, exige
PowerShell como Administrador — não foi possível liberar automaticamente por falta de privilégio
elevado na sessão que criou este projeto).

## Se for continuar este projeto

Coisas discutidas mas ainda não implementadas, caso o usuário peça para continuar de onde parou:
- Vídeo real da Téssera/Londrina no lugar do timelapse genérico de banco de imagens
- Fotos reais de imóveis/equipe da Téssera no lugar das fotos de banco de imagens (o usuário
  escolheu "banco de imagens livre" como caminho temporário quando perguntado sobre isso)
- Depoimentos e blog reais, se a Téssera fornecer
- Publicar via Claude Artifact tool (`build_artifact.py` já prepara o bundle) — a versão publicada
  fica em um link específico; ver histórico de conversa para a URL se ela ainda existir
