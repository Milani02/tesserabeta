# Téssera — mockup estático

Mockup estático (HTML/CSS/JS puro, sem build step) do site institucional da Téssera Negócios
Imobiliários (CRECI 8380J), feito para a fase de design de uma proposta comercial de redesign.

Veja `CLAUDE.md` para o contexto completo do projeto: de onde veio a identidade visual, de onde
vieram os efeitos de scroll, e o que já foi decidido. Veja `SKILLS.md` para a lista de skills do
Claude Code que estavam instaladas na máquina onde este projeto foi construído.

## Rodando localmente

Não há dependências nem build. Basta servir a pasta:

```bash
python -m http.server 8792
```

Abra [http://localhost:8792/index.html](http://localhost:8792/index.html) (página inicial) ou
[http://localhost:8792/institucional.html](http://localhost:8792/institucional.html) (institucional).

## Estrutura

- `index.html`, `institucional.html`, `styles.css`, `script.js` — o site
- `build_artifact.py` — gera `tessera-pitch.html`, um único arquivo autocontido (CSS/JS/fontes/
  imagens embutidos em base64) para publicar como Claude Artifact (desatualizado, ver `CLAUDE.md`)
- `fonts/`, `images/`, `video/` — assets usados pelo site e pelo build do Artifact
