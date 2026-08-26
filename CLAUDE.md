# Téssera — mockup estático (contexto do projeto)

Este arquivo existe para que qualquer sessão do Claude (em qualquer máquina/conta) que abra este
repositório entenda imediatamente o que é este projeto, por que foi feito assim, e quais decisões
já foram tomadas — sem precisar redescobrir tudo do zero. **Reescrito por completo** numa sessão
que fez um trabalho grande em cima do hero, do wordmark, de reveals no site inteiro e de uma
página institucional nova — se você está lendo uma versão antiga deste arquivo (com o wordmark
como `background-clip:text` foto-preenchido, ou sem menção a `institucional.html`), ela está
desatualizada.

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

A paleta, tipografia, logo e conteúdo institucional foram extraídos do site **real** da Téssera
(tessera.imb.br), não inventados:

- **Cor de marca:** `#004536` (verde escuro institucional), `#00332a` (variante mais escura)
- **Tipografia:** Red Hat Display (títulos, peso 700/900) + Open Sans (corpo, 400/600) — fontes
  reais usadas no site deles
- **Logo real:** baixada diretamente do header do site deles (era um PNG do CDN da Kenlo) e depois
  **vetorizada** com `vtracer` — o PNG original tinha muito ruído de anti-aliasing (662 paths numa
  primeira tentativa direta); o processo que funcionou foi: reescalar 4× → achatar cada pixel pra
  uma das duas cores da marca (verde `#004A32` do ícone, cinza `#818284` do texto "TÉSSERA") →
  vetorizar essa versão limpa (caiu pra 35 paths). Fica em `images/logo-tessera.svg`. O header usa
  essa logo com `filter:brightness(0) invert(1)` pra forçar branco enquanto o header está
  transparente sobre o hero, e volta pras cores originais (`filter:none`) quando o header fica
  sólido — ver `.logo__mark` / `.header.is-solid .logo__mark` em `styles.css`.
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
limite deliberado, testado várias vezes ao longo do projeto e sempre reafirmado:

- ✅ **Permitido e feito:** replicar layout, animações, timing de scroll, comportamento de
  header/hero, técnicas de CSS/SVG (inclusive medindo valores exatos direto no DOM deles via
  `getComputedStyle`) — isso não é conteúdo protegido por direitos autorais da mesma forma que
  texto/fotos.
- ❌ **Recusado:** baixar e reusar as fotos, vídeos ou textos de marketing reais do
  findrealestate.com. Em vez disso: a foto da casa do hero (`images/hero-house.jpg`) e as texturas
  de nuvem (`images/cloud-1.jpg`, `images/cloud-2.jpg`) são **geradas por IA** (Google Flow), a
  pedido do usuário. As nuvens foram geradas sobre fundo preto sólido de propósito, pra permitir
  compositing via `mix-blend-mode: screen`. O restante das fotos/vídeo é de banco de imagens livre
  (Unsplash/Pexels, uso comercial permitido), e todo o copy é original em português, escrito para a
  Téssera.
- ❌ **Recusado também:** fabricar depoimentos de clientes, posts de blog, ou **categorias de
  serviço que a Téssera pode não oferecer de verdade** (ex.: FIND tem uma seção "Support Beyond
  Buying and Selling" com cards de Mortgage Services / Property Management / Construction — isso
  foi deliberadamente **não copiado**, porque inventar essas categorias seria fabricar uma
  capacidade de negócio que não sabemos se é real).

Se o usuário pedir para "copiar mais uma coisa do site de referência", o mesmo limite se aplica:
estrutura/efeito sim, ativos (foto/vídeo/texto) reais deles ou fatos de negócio inventados não.

## O efeito do hero (a parte mais trabalhada — cuidado ao mexer)

O hero (`#hero` em `index.html`, regras `.hero*` em `styles.css`, lógica em `script.js`
`updateHero()`) é uma seção **pinada** (`position: sticky`) com scroll-scrub. `.hero` tem
`height: 400vh` (reduzido de 500vh a pedido do usuário — "tem muito scroll, diminui um pouco";
100vh de pin + 300vh de "trilho"). Não mexer nesse número sem pedido explícito.

### O wordmark TÉSSERA — reescrito do zero, agora é SVG de verdade

**Isto NÃO é mais `background-clip:text` com foto atrás.** Foi completamente reconstruído em cima
de uma investigação direta do "FIND" gigante que aparece no hero de referência: inspecionando o
DOM deles, o mark não é CSS text-stroke nem clip — é um **SVG real** com `<path>` por letra,
`fill:none; stroke:white`, cujo `stroke-dasharray`/`stroke-dashoffset` anima conforme o scroll, ou
seja, **as letras se desenham sozinhas** (tipo caligrafia), não aparecem prontas. Reproduzimos essa
técnica:

- **Como os paths foram gerados:** as letras "TÉSSERA" e o texto "Negócios Imobiliários" foram
  extraídas **diretamente da fonte** Red Hat Display 900 / 700 (arquivos `.woff2` em `fonts/`) com
  a biblioteca Python `fontTools` (`fontTools.pens.svgPathPen.SVGPathPen`), preservando os glifos
  reais da marca — não são letras desenhadas à mão. O ícone da marca (anel + coluna) foi extraído
  do próprio `images/logo-tessera.svg` já vetorizado (são os 5 primeiros paths com fill
  `#004A32` — 1 para o anel externo, 4 para os detalhes da coluna interna). Todos os paths (letras
  + subtítulo + ícone) estão **inline dentro de `index.html`**, dentro de `<svg class="hero__wordmark-outline">`,
  `<svg class="hero__wordmark-sub-outline">` e `<svg class="hero__wordmark-icon">`, todos
  compartilhando a classe `.wm-letter` — o JS seleciona `document.querySelectorAll('.wm-letter')`
  uma única vez e anima todos juntos, então adicionar mais elementos com essa classe já entra
  automaticamente no sistema de desenho, sem mexer no JS.
- **Timing do desenho:** `script.js` calcula `drawT` a partir do `progress` do hero com uma curva
  **ease-in agressiva** (`Math.pow(drawLinT, 5)`, janela `(progress-0.05)/0.58`) — não é linear.
  Motivo: medindo empiricamente, essas letras (traço grosso de 5px + formas geométricas simples)
  **leem como "prontas" visualmente com só ~15-19% do traço desenhado** — uma curva linear ou
  suave faz a palavra parecer completa quase assim que aparece, mesmo o valor numérico estando bem
  baixo. A curva ease-in mantém a fração desenhada baixa por bastante tempo e só "libera" o
  desenho de verdade perto do fim da janela — o pedido explícito do usuário era que a palavra só
  ficasse completa **um pouco depois do meio do scroll do hero**, e essa curva foi ajustada
  empiricamente (testando screenshots em vários pontos de scroll) até bater com isso.
- **Todas as letras (e o ícone) desenham AO MESMO TEMPO**, não uma de cada vez — confirmado
  medindo o FIND: todos os `stroke-dasharray` deles revelam exatamente a mesma fração
  simultaneamente. Testado e replicado igual.
- **O wordmark NÃO se move** — fica parado, dead-center, do início ao fim do scroll. Isso também
  foi verificado direto no FIND (`getComputedStyle(...).transform` retorna `"none"` em qualquer
  ponto do scroll, mesmo bounding box sempre) — só a foto de fundo atrás dele que faz zoom/pan.
  Versões anteriores desse projeto tinham o wordmark crescendo/descendo (`scale`/`translateY`) —
  isso estava **errado** e foi removido.
- **Não existe mais versão preenchida com foto.** Existiu uma fase em que o wordmark desenhava o
  contorno e depois fazia crossfade pra uma versão `background-clip:text` preenchida com uma foto
  (inicialmente reusando `hero-house.jpg`, depois `finalcta.jpg` pra não repetir a mesma imagem do
  fundo) — o usuário pediu explicitamente pra **remover essa versão preenchida** e manter só o
  contorno branco o tempo todo. Se pedir de volta, a foto certa pra usar (se for reusar essa ideia)
  é uma DIFERENTE da foto de fundo do hero, não a mesma.
- **Ícone da marca ao lado do texto:** depois de tudo isso, o usuário pediu pra trocar o wordmark
  "genérico" por **a logo de verdade desenhando**. Isso é o que motivou extrair os 5 paths do ícone
  do `logo-tessera.svg` (ver acima) e colocá-los como um `<svg class="hero__wordmark-icon">`
  separado, ao lado do texto, dentro do mesmo `.hero__wordmark-stack` (agora um `flex` row).

### Timing do hero (0 = topo do hero, 1 = fim do pin)

- **0%–18%:** headline/subtítulo/CTA do hero desaparecem (fade + translateY)
- **5%–~63% (curva ease-in, ver acima):** wordmark (ícone + TÉSSERA + subtítulo) se desenha
- **68%–96% (`wmOut`):** todo o `.hero__wordmark` (opacity, container) desaparece
- **0%–100%:** a foto do hero faz um zoom + pan contínuo (`translateY` até `-0.82×vh`, `scale` até
  `1.29`) — overscan generoso (`top:-15%; bottom:-110%`) pra nunca ficar sem imagem durante o pan.
- **0%–~85%:** nuvens "ambiente" (`.hero__clouds` / `#heroClouds`, 4 `.cloud--N`) sobem devagar e
  fazem drift horizontal contínuo (`@keyframes cloudDrift1/2`). Começam a se apagar
  (`heroClouds.style.opacity = 1 - finaleT`) assim que a fase final começa, pra não competirem com
  ela.
- **85%–100% (últimos 15%): "sweep" final de nuvens.** Isso passou por VÁRIAS iterações até chegar
  no formato atual — histórico importante se for mexer aqui de novo:
  1. Primeira versão: cortina sólida com `isolation:isolate` — **rejeitada** pelo usuário ("não
     quero essa faixa, quero nuvens subindo").
  2. Depois: nuvens reais subindo rápido, mas janela de só 6% do scroll — **muito rápida pra ser
     percebida** num scroll real (um único evento de scroll pulava por cima da janela inteira sem
     nenhum frame intermediário).
  3. Depois: nuvens saíam de tela ANTES do pin soltar de verdade — o `position:sticky`, depois de
     "destravar", ainda leva uma altura de viewport inteira pra sair de vista (comportamento normal
     do sticky), e nesse trecho as nuvens já tinham ido embora, expondo uma tira da casa.
  4. Fix: as nuvens finais agora **sobem e ficam paradas cobrindo tudo** (não saem de tela antes do
     pin soltar) — ver `finaleT` em `updateHero()`. Isso resolveu o "corte" exposto.
  5. Ainda faltava cobertura sem buracos: as fotos `cloud-1.jpg`/`cloud-2.jpg` são um floco branco
     isolado num fundo majoritariamente preto — empilhar poucas nunca cobre 100% da tela sem
     brechas. Fix definitivo: `.hero__clouds--finale` tem 4 nuvens reais (`.cloud--finale-N`, pra
     dar textura/formato reconhecível) só que **por cima de uma base opaca** garantindo cobertura
     total (**depois removida** — ver próximo item).
  6. **Último pedido do usuário: remover essa base/gradiente e deixar só as nuvens de foto puras**
     ("pode remover esse gradiente, deixando só as nuvens do jeito que está") — então hoje NÃO tem
     mais camada de base opaca, só os 4 `.cloud--finale-N`. Se voltar a reclamar de buraco/brecha
     mostrando a casa por trás, essa é a solução que já foi tentada e descartada por pedido
     explícito — não reintroduzir sem perguntar.
  7. `.hero__fade` (`#heroFade`) — gradiente branco que aparece no rodapé do pin durante essa
     mesma janela, pra fundir a base das nuvens em branco sólido exatamente na mesma cadência,
     porque a seção seguinte ("Why Téssera") é branca — sem isso havia uma linha de corte visível
     entre "textura de nuvem" e "branco chapado".
- **Header:** fica 100% transparente durante TODO o scroll do hero, só fica sólido quando o pin
  termina (`position: fixed`, não `sticky`).

**Pegadinha de CSS já pisada mais de uma vez — `mix-blend-mode` e stacking context:**
`.hero__clouds` tem `mix-blend-mode: screen` no **container**, não nos `.cloud` filhos. Se colocar
`z-index` num elemento pai de algo com blend-mode, ele cria seu próprio stacking context e isola o
blend dos filhos — a nuvem renderiza como retângulo preto sólido em vez de compor com a foto. Se
precisar adicionar mais camadas com blend-mode, ou o blend fica no container (sem z-index
competindo) ou usa `isolation: isolate` deliberadamente.

**Cache-busting — bug real que já aconteceu DUAS VEZES nesse projeto:** `index.html` referencia
`styles.css?v=N` e `script.js?v=N` (e `institucional.html` também referencia o mesmo `script.js`).
**Toda edição em `script.js` ou `styles.css` precisa bumped o `?v=N` correspondente**, mesmo que
pareça uma edição pequena — se esquecer, o navegador serve uma versão cacheada antiga daquele
arquivo pra qualquer página que peça a MESMA URL exata, e isso já causou erros tipo
`Cannot read properties of null` em produção (a segunda vez foi quando `institucional.html` foi
criado referenciando `script.js?v=24`, que já tinha sido cacheado pelo browser numa versão
anterior à correção do guard de `hero` nulo). Sempre bump os dois números juntos ao editar
qualquer um dos dois arquivos.

## Reveals no site inteiro — agora são REVERSÍVEIS

`script.js`, um único `IntersectionObserver` no fim do arquivo cuida de **todo** scroll-reveal do
site. Isso mudou de comportamento a pedido do usuário: antes disparava uma vez
(`revealObserver.unobserve(...)` depois do primeiro trigger) e ficava "revelado" pra sempre. Agora
faz `entry.target.classList.toggle('is-revealed', entry.isIntersecting)` — **rolar pra cima
esconde de novo**, replicando o comportamento real do findrealestate.com. Isso vale pro site
inteiro (título bicolor, cards, fotos), não só uma seção.

Classes utilitárias de reveal:
- `.reveal-text` com `<span class="is-muted">` dentro — bicolor, a parte muted vai de opacity
  .4 → 1 quando entra na viewport.
- `.fade-up` / `.fade-up-group` — sobe (translateY) + fade, com atraso escalonado por `nth-child`
  dentro de `.fade-up-group`. É o efeito "padrão" usado na maioria das seções (grids de cards,
  chips, etc.) — motion neutro, deliberado (ver seção da skill de frontend design abaixo).
- `.fade-in-side` — **NOVA**, movimento horizontal (não vertical): estado de repouso
  `opacity:.1; transform:scale(.8) translateX(-10%)`, medido diretamente nos itens da galeria de
  setas do findrealestate.com (`getComputedStyle` num item antes de entrar na tela). Reservada de
  propósito só pra dois lugares no site: a galeria de setas (item 1 fica parado, 2-4 usam
  `fade-in-side`) e a foto da seção "Regiões" — não usar em todo lugar, senão vira "efeito
  espalhado" em vez de um momento com intenção (ver skill de frontend design).

**Cuidado de especificidade CSS que quase quebrou algo:** a seção "Como funciona" (steps 01/02/03)
tem um destaque de "etapa atual" que também mexe em `opacity` nos mesmos `<li>` que
`.fade-up-group > *` já controla. Um seletor tipo `.steps li{opacity:.45}` bate quase empatado em
especificidade com `.fade-up-group > *{opacity:0}` e pode ganhar/perder de forma imprevisível,
quebrando a entrada. Solução usada: escopar o dim/destaque só depois de já revelado
(`.fade-up-group.is-revealed .steps li:not(.is-active){opacity:.45}` — 4 classes de especificidade,
sempre ganha, mas só depois que o grupo já tem `.is-revealed`). Se adicionar mais opacity custom
em elementos que já são filhos de `.fade-up-group`, escopar do mesmo jeito.

## "Como funciona" (steps) — único lugar com motion próprio

A seção de steps (`#steps` em `index.html`, `updateSteps()` em `script.js`) é a ÚNICA seção do site
que foge do `fade-up-group` padrão, de propósito: é a única seção cujo conteúdo é uma sequência
real (falar com corretor → ver imóveis → fechar negócio), então o movimento reflete isso — conforme
rola, o passo mais próximo do centro vertical da tela acende (borda esquerda verde, opacidade
total) e os outros escurecem, dando a sensação de "andar pelos passos" ao rolar. Decisão tomada
seguindo a skill `frontend-design` (ver abaixo): "Structure is information" — números 01/02/03 só
fazem sentido como sequência ordenada aqui; em nenhum outro lugar do site tem esse tratamento.

## Skill `frontend-design`

Foi usada nessa sessão (invocada via `Skill` tool) especificamente pra decidir **qual movimento
cabe em cada seção**, não pra copiar o mesmo efeito em tudo. O critério aplicado:
- Grids de cards (segments, listings, stats, chips) → `fade-up` vertical, o "neutro" padrão.
- Galeria de pessoas (setas) e foto de contexto (Regiões) → `fade-in-side` horizontal, só nesses
  dois lugares.
- Steps → motion próprio de sequência (ver acima), porque é o único conteúdo genuinamente ordenado.

Se pedirem pra adicionar mais efeitos, seguir esse mesmo raciocínio (o que o CONTEÚDO da seção
pede) em vez de aplicar um efeito genérico em tudo.

## A galeria de setas ("Isso não é só sobre imóveis")

Passou por reescrita completa nessa sessão:

- **Forma:** antes era um `clip-path: polygon(35% 0, 100% 0, 65% 100%, 0 100%)` — um paralelogramo
  inclinado, não uma seta de verdade. O FIND usa `mask-image` com um SVG inline
  (`viewBox="0 0 346 440"`, path `M183.98 440 346 220 183.98 0H0l162.02 220L0 440h183.98Z`) —
  convertido pros mesmos pontos em `clip-path: polygon(53.18% 100%, 100% 50%, 53.18% 0%, 0% 0%,
  46.82% 50%, 0% 100%)`, que É uma seta de verdade (ponta + entalhe). A sobreposição entre setas
  (`margin-left` negativo em `.chevron`) foi ajustada empiricamente pra `-18px` — valores maiores
  (testados: -108px, -122px, calculados "matematicamente" pra encaixar ponta-no-entalhe) cobriam
  demais e escondiam as fotos do meio.
- **Fotos:** primeira e última foram trocadas a pedido do usuário — primeira é uma mulher jovem
  (~25 anos, `images/chevron-woman.jpg`), última é um homem com cara de empresário
  (`images/chevron-man.jpg`, terno escuro, gravata vermelha, braços cruzados). As duas do meio
  continuam de URL remota do Unsplash (não baixadas localmente).
- **Efeito de entrada:** primeira foto fica estática (sem classe), as outras 3 usam `.fade-in-side`
  (ver seção de reveals acima).

## Página institucional (nova)

`institucional.html` — página "Quem somos", linkada no menu ("Institucional", entre "Imóveis
Rurais" e "Fale Conosco", em `.nav` e no burger menu). Reusa o mesmo `header`/`footer`/CSS/JS do
`index.html`, mas **não** tem a seção `#hero` com scroll-scrub — usa um hero estático mais simples
(`.page-hero`, foto de fundo + overlay escuro + `reveal-text`), porque replicar o hero gigante numa
segunda página seria engenharia demais pro que essa página precisa.

**Conceito central da copy (o "signature moment" da página, seguindo a skill de frontend design):**
o nome "Tessera" vem do latim, a peça que completa um mosaico — a página inteira gira em torno
dessa metáfora (seção dedicada "De onde vem o nome"), porque é um ângulo genuinamente específico
da marca, não copy genérico de imobiliária. Esse mesmo conceito foi propagado de volta pro
`index.html`: os textos de "Why Téssera" e da galeria de setas foram reescritos pra reforçar a
mesma metáfora ("a peça que completa o mosaico", "cada imóvel carrega uma peça da vida de alguém"),
em vez do tom mais "traduzido do inglês" que tinham antes (eram adaptações quase literais do copy
do findrealestate.com).

Seções da página: hero estático → "De onde vem o nome" (o mosaico) → "Como trabalhamos" (3
diferenciais REAIS, sem estatística inventada: atendimento direto, conhecimento da região, CRECI
8380J) → CTA final (reusa a classe `.finalcta`) → footer.

**Importante — `updateHeaderState()` em `script.js` precisou ficar null-safe** pra essa página
funcionar: antes assumia que `#hero` sempre existe (`hero.offsetHeight`), o que quebrava em
qualquer página sem o hero grande. Agora tem fallback: usa a altura de `.page-hero` se existir, ou
80px de limiar simples se não tiver hero nenhum na página.

## Seções da página inicial (nesta ordem)

1. Header (fixed, transparente→sólido)
2. Hero (pin de 400vh, descrito acima)
3. "Why Téssera" — texto com reveal bicolor (copy sobre o conceito de mosaico) + vídeo em loop mudo
   (`video/why-video.mp4`, timelapse de nuvens/cidade, Pexels, licença livre)
4. Galeria de setas — 4 fotos em recorte de seta de verdade (ver seção própria acima)
5. "Como funciona" (steps 01/02/03) — motion próprio, ver seção própria acima
6. Stats (82 apartamentos à venda, 154 para alugar, 27+ tipos)
7. Segmentos (Residencial/Comercial/Rural, cards com foto de fundo + overlay escuro)
8. Listings (3 imóveis em destaque, dados reais)
9. Bigtext (Comprar / Alugar, tipografia gigante sobre fundo verde escuro)
10. Regions (chips de cidades/bairros + foto real do Lago Igapó, Londrina — `images/regions-londrina.jpg`,
    com `.fade-in-side`)
11. Dark CTA (telefone/WhatsApp, horário, CRECI)
12. Services (links úteis: IPTU, registro de imóveis, Copel, Sanepar, IPPUL — reais)
13. Final CTA (foto full-bleed + botão)
14. Footer (contato completo, redes sociais, links legais)

Deliberadamente **não existem** depoimentos de clientes nem posts de blog fabricados, nem cards de
categorias de serviço inventadas (ver seção ética acima).

## Arquivos

- `index.html`, `institucional.html`, `styles.css`, `script.js` — o site, servido localmente via
  `python -m http.server 8792` a partir desta pasta (não há build step; é HTML/CSS/JS puro)
- `build_artifact.py` — script Python que gera `tessera-pitch.html` pra publicar como Claude
  Artifact. **Está desatualizado** (não sabe do wordmark SVG novo, da logo real, da página
  institucional, nem dos novos assets) — o usuário pediu explicitamente pra **não republicar o
  Artifact proativamente**; só rodar/atualizar esse script se ele pedir de novo, e nesse caso
  revisar o `IMAGE_MAP` inteiro antes.
- `fonts/` — Red Hat Display e Open Sans em `.woff2` — agora usadas por DOIS motivos: build do
  Artifact (como sempre) E extração de paths SVG do wordmark do hero via `fontTools` (ver seção do
  hero). Se re-extrair paths de novo, `pip install fonttools` (e `brotli`, pra ler `.woff2`).
- `images/` — `hero-house.jpg` e `cloud-1.jpg`/`cloud-2.jpg` gerados por IA (ver seção do hero).
  `logo-tessera.svg`/`.png` — logo real vetorizada (ver seção de identidade visual). Novas desta
  sessão: `chevron-woman.jpg`, `chevron-man.jpg` (galeria de setas), `regions-londrina.jpg` (Lago
  Igapó, seção Regiões — usada duas vezes, também como fundo do CTA final da página institucional),
  `institucional-hero.jpg` (aperto de mãos, hero da página institucional). Todas as fotos novas são
  Unsplash, licença livre. `hero.jpg` e `smoke-1.jpg` são arquivos órfãos de iterações antigas
  (fundo velho do hero, névoa removida) — não usados em lugar nenhum, mantidos só porque ninguém
  pediu pra limpar.
- `video/why-video.mp4` — vídeo de fundo da seção "Why Téssera" (Pexels, "Cloudy Sky Time Lapse",
  id 5324343, versão HD 1920x1080)
- `tessera-pitch.html` — build gerado (não editar direto)

## Acesso local / rede

Servidor de dev: `python -m http.server 8792` dentro desta pasta, depois abrir
`http://localhost:8792/index.html` (ou `institucional.html`). Para acessar de outra máquina na
mesma rede, seria preciso uma regra de firewall liberando a porta 8792 (exige PowerShell como
Administrador — não foi possível liberar automaticamente na sessão original por falta de
privilégio elevado).

## Ferramentas Python usadas neste projeto (pra reproduzir se precisar)

- `PIL`/`Pillow` — já disponível, usado pra redimensionar/inspecionar imagens.
- `fontTools` (+ `brotli` pra `.woff2`) — extração de contornos de glifo como paths SVG
  (`fontTools.pens.svgPathPen.SVGPathPen`). Instalar com `pip install fonttools brotli`.
- `vtracer` — vetorização de PNG pra SVG (usado na logo). Instalar com `pip install vtracer`.
  **Atenção:** essa build tem bugs — chamar `convert_image_to_svg_py` com qualquer parâmetro
  custom além do path de entrada/saída faz `Segmentation fault` nessa máquina; só funcionou
  chamando com os parâmetros default (sem passar `colormode`, `filter_speckle`, etc.).

## Se for continuar este projeto

Coisas discutidas mas ainda não implementadas, caso o usuário peça para continuar de onde parou:
- Vídeo real da Téssera/Londrina no lugar do timelapse genérico de banco de imagens
- Fotos reais de imóveis/equipe da Téssera no lugar das fotos de banco de imagens (o usuário
  escolheu "banco de imagens livre" como caminho temporário quando perguntado sobre isso)
- Depoimentos e blog reais, se a Téssera fornecer
- Categorias de serviço extra (tipo o "Mortgage/Property Management/Construction" do FIND) — só
  implementar se o usuário confirmar que são serviços reais que a Téssera oferece
- Publicar via Claude Artifact tool (`build_artifact.py` já prepara o bundle, mas está
  desatualizado — revisar `IMAGE_MAP` antes) — o usuário pediu pra não fazer isso proativamente
