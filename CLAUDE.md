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
  indevido de imagem (algumas fotos mostram pessoas reais). Em vez disso: todas as fotos/vídeo aqui
  são de banco de imagens livre (Unsplash/Pexels, uso comercial permitido), e todo o copy é
  original em português, escrito para a Téssera.

Se o usuário pedir para "copiar mais uma coisa do site de referência", o mesmo limite se aplica:
estrutura/efeito sim, ativos (foto/vídeo/texto) reais deles não.

## O efeito do hero (a parte mais trabalhada — cuidado ao mexer)

O hero (`#hero` em `index.html`, regras `.hero*` em `styles.css`, lógica em `script.js`
`updateHero()`) é uma seção **pinada** (`position: sticky`) com scroll-scrub: `.hero` tem
`height: 500vh` (100vh de pin + 400vh de "trilho" de scroll), proporção medida **diretamente** no
findrealestate.com (root deles: 2885px / viewport 577px ≈ 5×) — não é um número arbitrário.

Curva de animação (0 = topo do hero, 1 = fim do pin), também medida no site de referência:

- **0%–18%:** headline/subtítulo/CTA do hero desaparecem (fade + translateY)
- **5%–77%:** o wordmark "TÉSSERA" nasce pequeno (opacity 0→1 rápido), **cresce continuamente**
  (`scale(0.5 → 2.6)`) e **desce** (`translateY(-6% → 22%)`) enquanto cresce — o texto tem
  `background-clip: text` usando a MESMA foto do hero por trás, então a casa "aparece dentro" das
  letras conforme elas crescem (efeito de profundidade/3D)
- **72%–88%:** wordmark desaparece (fade out)
- **0%–100%:** a foto do hero faz um zoom + pan contínuo (`translateY` até `-0.82×vh`,
  `scale` até `1.29`) — **importante:** o elemento da foto precisa de overscan generoso
  (`top:-15%; bottom:-110%`, ~225vh de altura real) para nunca "ficar sem imagem" durante o pan.
  Já existiu um bug em que isso ficava curto e aparecia uma faixa cinza estática embaixo — se mexer
  no valor do `translateY`, reconferir o overscan.
- **65%–100%:** nuvens (`.cloud`, blobs CSS com blur, não é imagem) engrossam (scale/opacity) e um
  `.hero__whiteout` (80%–98%) cria um esmaecimento final que transiciona pra próxima seção.
- **Header:** fica 100% transparente (texto branco) durante TODO o scroll do hero, e só fica sólido
  exatamente quando o pin termina (`position: fixed`, não `sticky` — isso importa, `sticky` reserva
  espaço no fluxo e quebra o efeito de sobreposição transparente).

Todo esse timing foi obtido via `window.scrollTo()` + `getComputedStyle()` amostrado em vários
pontos do scroll do site de referência (não é chute). Se precisar re-medir, essa é a técnica que
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
  mudarem e for preciso republicar o Artifact. **Atenção:** o vídeo (`video/why-video.mp4`, 2.5MB)
  NÃO está no `IMAGE_MAP` do script — se for embutir no Artifact, ele precisa ser adicionado lá
  também (ou o vídeo vai quebrar na versão Artifact, que bloqueia `<source src="video/...">`
  relativo assim como bloqueia imagens externas).
- `fonts/` — Red Hat Display e Open Sans em `.woff2`, baixados do Google Fonts e convertidos pra
  base64 (`.b64`) só para uso do `build_artifact.py`
- `images/` — as fotos do Unsplash usadas no `IMAGE_MAP`, baixadas localmente para permitir o
  embed em base64
- `video/why-video.mp4` — vídeo de fundo da seção "Why Téssera" (Pexels, "Cloudy Sky Time Lapse",
  id 5324343, versão HD 1920x1080)
- `tessera-pitch.html` — build gerado (não editar direto; editar `index.html`/`styles.css`/
  `script.js` e rodar `build_artifact.py` de novo)

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
