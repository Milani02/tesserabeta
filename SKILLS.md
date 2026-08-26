# Skills instaladas nesta máquina

Lista de todas as skills do Claude Code instaladas em `C:\Users\adm_ti\.claude\skills\` no momento
em que este arquivo foi gerado. Existe pra que qualquer sessão do Claude que continue este projeto
em outra máquina/conta saiba quais capacidades extras estavam disponíveis aqui — algumas são
diretamente relevantes pra este projeto (efeitos de scroll, design frontend, animação, revisão de
UI) e vale considerar usá-las de novo se o trabalho continuar por aqui.

**Nota:** isto é uma lista de skills instaladas *nesta máquina/conta*, não parte do código do site.
Skills não são copiadas junto no `git clone` — se a outra máquina/conta não tiver a mesma skill
instalada, o nome sozinho não faz nada; é só um registro de quais existiam aqui, caso seja útil pra
decidir o que vale instalar de novo.

## Especialmente relevantes para este projeto

- **frontend-design** — orientação para design visual distintivo e intencional; foi a skill usada
  nesta sessão para decidir qual efeito de scroll cabe em cada seção do site (não copiar o mesmo
  efeito em tudo).
- **gsap-scrolltrigger**, **gsap-core**, **gsap-timeline**, **gsap-utils**, **gsap-plugins** —
  animação com scroll via GSAP. Este projeto usa scroll-scrub feito à mão em JS puro (sem GSAP),
  mas se decidir migrar ou usar GSAP daqui pra frente, essas são as skills certas.
- **animate**, **animation-vocabulary**, **improve-animations**, **review-animations**,
  **find-animation-opportunities** — processo de decisão de motion, glossário de nomes de efeitos,
  auditoria e revisão de animação existente.
- **apple-design**, **minimalist-ui**, **high-end-visual-design**, **industrial-brutalist-ui**,
  **ui-ux-pro-max**, **impeccable**, **redesign-existing-projects** — direções/critérios de design
  visual, várias com foco em evitar "cara de IA genérica".
- **webapp-testing** — testar/depurar aplicações web locais com Playwright.
- **prototype**, **pick-ui-library** — prototipagem de variações de UI e escolha de bibliotecas.

## Lista completa

| Skill | Descrição |
|---|---|
| agent-reach | Guia de canais de alcance para agentes (dev, carreira, finanças, busca, redes sociais, vídeo, web). |
| animate | Constrói uma animação do zero, decidindo na ordem certa se deve animar, com qual propósito, ferramenta, propriedades, curva/duração e como entra/sai. |
| animate-expo | Animações em React Native/Expo (Reanimated, Gesture Handler, Expo Router, haptics). |
| animation-vocabulary | Glossário reverso: descreve um efeito de animação em palavras soltas e recebe o nome técnico certo. |
| apple-design | Abordagem da Apple pra design de interface e motion físico/fluido, adaptada pra web. |
| ask-sonner | Guia da biblioteca de toast Sonner (React). |
| brandkit | Geração de imagem para brand-kits premium (logo, identidade, apresentações). |
| captions-overlay | Doutrina de overlay de legendas para vídeos (parte do fluxo hyperframes). |
| changelog-video | Transforma um changelog markdown num vídeo de changelog pronto. |
| cut-the-curve | Catálogo de técnicas de transição/corte velocity-matched para vídeos motion-graphics. |
| design-taste-frontend | Skill anti-genérico para landing pages/portfólios/redesigns — infere a direção de design certa. |
| design-taste-frontend-v1 | Versão v1 preservada da skill acima, para compatibilidade exata. |
| embedded-captions | Fluxo de legendas embutidas em vídeo. |
| emil-design-eng | Filosofia de polimento de UI, motion e detalhes invisíveis de Emil Kowalski. |
| faceless-explainer | Transforma texto/artigo/briefing num vídeo explicativo sem rosto (visuais inventados por cena). |
| figma | Importa conteúdo do Figma para uma composição HyperFrames. |
| find-animation-opportunities | Busca lugares num código/UI que deveriam animar e não animam (somente leitura, propõe valores). |
| find-skills | Ajuda a descobrir e instalar outras skills. |
| firecrawl | Skill de web scraping/crawling via Firecrawl. |
| framer-motion-animator | Animações e micro-interações com Framer Motion (transições de página, gestos, scroll). |
| frontend-design | Orientação de design visual distintivo/intencional — usada nesta sessão (ver acima). |
| full-output-enforcement | Força geração de código completa, sem truncamento/placeholder. |
| general-video | Fluxo geral de geração de vídeo (hyperframes). |
| gpt-taste | Engenheiro de motion GSAP + UX/UI, com regras estritas de estrutura de página e grid. |
| gsap-core | API core do GSAP — tweens, easing, duração, stagger, matchMedia. |
| gsap-frameworks | GSAP em Vue/Svelte — ciclo de vida, escopo, cleanup. |
| gsap-performance | Performance em animações GSAP — transforms, will-change, batching. |
| gsap-plugins | Plugins do GSAP — ScrollToPlugin, Flip, Draggable, SplitText, CustomEase, etc. |
| gsap-react | GSAP em React — hook useGSAP, refs, gsap.context, cleanup. |
| gsap-scrolltrigger | ScrollTrigger do GSAP — animação ligada a scroll, pin, scrub, triggers. |
| gsap-timeline | Timelines do GSAP — gsap.timeline(), parâmetro de posição, nesting. |
| gsap-utils | Utilitários gsap.utils — clamp, mapRange, interpolate, random, snap, wrap. |
| high-end-visual-design | Ensina a desenhar como agência premium — fontes, espaçamento, sombras, cards, animação. |
| hyperframes | Ponto de entrada do sistema de composição de vídeo HyperFrames. |
| hyperframes-animation | Todo o conhecimento de animação do HyperFrames — regras atômicas, blueprints, adapters de runtime. |
| hyperframes-audio | Áudio dentro de composições HyperFrames. |
| hyperframes-cli | CLI do HyperFrames. |
| hyperframes-core | Contrato de composição do HyperFrames — estrutura HTML, atributos de timing, tracks. |
| hyperframes-creative | Direção criativa não-animação para vídeos HyperFrames (paleta, tipografia, narração). |
| hyperframes-keyframes | Sistema de keyframes do HyperFrames. |
| hyperframes-registry | Instala/descobre blocos e componentes do registry HyperFrames. |
| image-to-code | Gera imagem de design primeiro, depois implementa o site pra bater com ela (Codex). |
| imagegen-frontend-mobile | Geração de imagem para telas de app mobile premium (iOS/Android). |
| imagegen-frontend-web | Geração de imagem de referência de design de site, uma imagem por seção. |
| impeccable | Skill ampla de design/redesign/crítica/auditoria de interface frontend. |
| improve-animations | Audita a animação de um código existente e produz um roadmap de melhorias (só leitura). |
| industrial-brutalist-ui | Estética industrial/brutalista — grids rígidos, tipografia extrema, cor utilitária. |
| media-use | "Agent Media OS" — resolve BGM, SFX, imagem, ícone, voz, grade de cor para projetos HyperFrames. |
| minimalist-ui | Interfaces editoriais limpas — paleta monocromática quente, contraste tipográfico, sem gradiente. |
| motion-doctrine | Lei de motion de alto nível do HyperFrames — como fazer um vídeo multi-cena parecer uma câmera só. |
| motion-graphics | Fluxo de motion graphics do HyperFrames. |
| music-to-video | Transforma uma faixa de música num vídeo sincronizado com a batida. |
| nano-banana-2 | Modelo/skill de geração de imagem (Nano Banana 2). |
| oversized-cursor | Técnica de cursor grande estilo macOS para vídeos de lançamento HyperFrames. |
| pick-ui-library | Escolhe a biblioteca certa pra uma tarefa frontend específica (inputs, charts, drag-and-drop, etc.). |
| pollinations-image-gen | Geração de imagem via API da Pollinations.ai. |
| pr-to-video | Transforma um pull request do GitHub num vídeo explicativo da mudança de código. |
| product-launch-video | Transforma uma URL/briefing de produto num vídeo de lançamento/promo. |
| prototype | Constrói várias versões de uma peça de UI e mostra lado a lado num seletor visual. |
| redesign-existing-projects | Eleva sites/apps existentes a qualidade premium, evitando padrões genéricos de IA. |
| remotion-to-hyperframes | Porta uma composição Remotion (React) existente para HTML HyperFrames. |
| review-animations | Revisa animação/motion existente contra um padrão alto de qualidade (filosofia Emil Kowalski). |
| seam-craft | Doutrina de correção de render nas emendas entre cenas em vídeos HyperFrames. |
| shadcn | Gerencia componentes shadcn/ui — adicionar, buscar, corrigir, estilizar. |
| slideshow | Fluxo de slideshow do HyperFrames. |
| stitch-design-taste | Gera DESIGN.md com padrões anti-genéricos de UI pro Google Stitch. |
| supabase-postgres-best-practices | Boas práticas de performance Postgres da Supabase. |
| talking-head-recut | Empacota vídeo talking-head com overlays gráficos sincronizados à transcrição. |
| ui-ux-pro-max | Inteligência de design UI/UX ampla — 50+ estilos, paletas, pares de fonte, tipos de produto. |
| using-superpowers | Estabelece como encontrar e usar skills no início de qualquer conversa. |
| vercel-react-best-practices | Boas práticas de performance React/Next.js da Vercel Engineering. |
| webapp-testing | Testa/depura aplicações web locais com Playwright (screenshots, logs do navegador). |
| write-swift | Como escrever Swift moderno bem — value types, concorrência Swift 6, protocolos/genéricos. |

## Skills de plugins (marketplace oficial)

Além das skills de usuário acima, também há skills vindas de plugins instalados via marketplace em
`C:\Users\adm_ti\.claude\plugins\marketplaces\claude-plugins-official\`: acesso/configuração de
Discord, iMessage e Telegram; `claude-automation-recommender`; `claude-md-improver`;
`cardputer-buddy`/`m5-onboard` (hardware CWC Makers); exemplos de plugin; `writing-rules`
(hookify); `math-olympiad`; `build-mcp-app`/`build-mcp-server`/`build-mcpb` (dev de servidor MCP);
`playground`; skills de desenvolvimento de plugin (`agent-development`, `command-development`,
`hook-development`, `mcp-integration`, `plugin-settings`, `plugin-structure`, `skill-development`);
`session-report`; `skill-creator`. Nenhuma dessas é diretamente relevante a este projeto.
