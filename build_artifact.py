import re, pathlib, base64

base = pathlib.Path(__file__).parent
html = (base / "index.html").read_text(encoding="utf-8")
css = (base / "styles.css").read_text(encoding="utf-8")
js = (base / "script.js").read_text(encoding="utf-8")

# Artifact CSP blocks remote images, so swap live Unsplash URLs for embedded data URIs
# in this bundled build only (the local dev files keep the live URLs).
IMAGE_MAP = {
    "https://images.unsplash.com/photo-1770216958267-2fa84cb88c44?w=1800&q=80&auto=format&fit=crop": "images/hero.jpg",
    "https://images.unsplash.com/photo-1624204386084-dd8c05e32226?w=900&q=75&auto=format&fit=crop": "images/seg-residencial.jpg",
    "https://images.unsplash.com/photo-1694183004462-2f7126c54652?w=900&q=75&auto=format&fit=crop": "images/seg-comercial.jpg",
    "https://images.unsplash.com/photo-1545350089-47b3d117a92c?w=900&q=75&auto=format&fit=crop": "images/seg-rural.jpg",
    "https://images.unsplash.com/photo-1570658379397-89d15db1b0de?w=700&q=75&auto=format&fit=crop": "images/listing1.jpg",
    "https://images.unsplash.com/photo-1601783210890-d921f8d008b3?w=700&q=75&auto=format&fit=crop": "images/listing2.jpg",
    "https://images.unsplash.com/photo-1595367864470-cedf8e27e988?w=700&q=75&auto=format&fit=crop": "images/listing3.jpg",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&q=75&auto=format&fit=crop": "images/finalcta.jpg",
}

def embed_images(text):
    for url, relpath in IMAGE_MAP.items():
        data = (base / relpath).read_bytes()
        b64 = base64.b64encode(data).decode()
        text = text.replace(url, f"data:image/jpeg;base64,{b64}")
    return text

html = embed_images(html)
css = embed_images(css)

opensans_b64 = (base / "fonts" / "opensans-400.b64").read_text().strip()
redhat_b64 = (base / "fonts" / "redhat-700.b64").read_text().strip()

font_face = f"""
@font-face {{
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url(data:font/woff2;base64,{opensans_b64}) format('woff2');
}}
@font-face {{
  font-family: 'Red Hat Display';
  font-style: normal;
  font-weight: 700 900;
  font-display: swap;
  src: url(data:font/woff2;base64,{redhat_b64}) format('woff2');
}}
"""

# strip the query-string cache-busters we used for local dev
css = re.sub(r"\?v=\d+", "", css)

full_css = font_face + "\n" + css

# remove google fonts <link> tags (CSP blocks them anyway; fonts are now embedded)
html = re.sub(r'\s*<link rel="preconnect"[^>]*>\n', "\n", html)
html = re.sub(r'\s*<link href="https://fonts\.googleapis\.com[^>]*>\n', "\n", html)

# inline stylesheet
html = re.sub(
    r'<link rel="stylesheet" href="styles\.css[^"]*">',
    lambda m: f"<style>\n{full_css}\n</style>",
    html
)

# inline script
html = html.replace(
    '<script src="script.js"></script>',
    f"<script>\n{js}\n</script>"
)

# Artifact tool wraps content in its own <!doctype>/<head>/<body> skeleton,
# so strip our own wrapper tags and hand back flat content (title/meta/style/body mixed together).
html = re.sub(r"<!DOCTYPE[^>]*>\s*", "", html, flags=re.IGNORECASE)
html = re.sub(r"</?html[^>]*>\s*", "", html, flags=re.IGNORECASE)
html = re.sub(r"</?head[^>]*>\s*", "", html, flags=re.IGNORECASE)
html = re.sub(r"</?body[^>]*>\s*", "", html, flags=re.IGNORECASE)
html = html.strip() + "\n"

out = base / "tessera-pitch.html"
out.write_text(html, encoding="utf-8")
print("wrote", out, len(html), "bytes")
