// Hero scroll-scrub — timing measured directly off findrealestate.com's own hero
// (2885px root / 577px viewport, sampled every ~300px of scroll):
//   0%–26%   headline/CTA fade out, wordmark fades IN
//   26%–52%  wordmark fades back OUT (it's a pulse, not a hold)
//   0%–100%  photo does one continuous slow zoom + pan, mist/clouds rise the whole way
// .hero is 500vh (100vh pin + 400vh of scroll-scrubbed room) to match their exact pacing.
const hero = document.getElementById('hero');
const heroPhoto = document.getElementById('heroPhoto');
const heroContent = document.getElementById('heroContent');
const heroWordmark = document.getElementById('heroWordmark');
const heroWordmarkOutline = document.getElementById('heroWordmarkOutline');
const heroClouds = document.getElementById('heroClouds');
const heroCloudsFinale = document.getElementById('heroCloudsFinale');
const heroFade = document.getElementById('heroFade');

function clamp01(n){ return Math.min(Math.max(n, 0), 1); }
function lerp(a, b, t){ return a + (b - a) * t; }

// Wordmark outline "draws itself" letter by letter, same technique found in
// findrealestate.com's own SVG mark: stroke-dasharray set to each path's full
// length, stroke-dashoffset animated from that length (fully hidden) down to 0
// (fully drawn). Letters are staggered so they draw in sequence, not all at once.
const wmLetters = [...document.querySelectorAll('.wm-letter')];
const wmLetterLengths = wmLetters.map(p => p.getTotalLength());
wmLetters.forEach((p, i) => {
  p.style.strokeDasharray = String(wmLetterLengths[i]);
  p.style.strokeDashoffset = String(wmLetterLengths[i]);
});

// "Negócios Imobiliários" underneath draws in the same way, same beat as the main mark.
const wmSubLetters = [...document.querySelectorAll('.wm-sub-letter')];
const wmSubLetterLengths = wmSubLetters.map(p => p.getTotalLength());
wmSubLetters.forEach((p, i) => {
  p.style.strokeDasharray = String(wmSubLetterLengths[i]);
  p.style.strokeDashoffset = String(wmSubLetterLengths[i]);
});

function updateHero(){
  if(!hero) return;
  const rect = hero.getBoundingClientRect();
  const scrollable = hero.offsetHeight - window.innerHeight;
  const progress = clamp01(-rect.top / scrollable);
  const vh = window.innerHeight;

  const contentFade = clamp01(progress / 0.18);
  heroContent.style.opacity = String(1 - contentFade);
  heroContent.style.transform = `translateY(${contentFade * -50}px)`;

  // Wordmark: fades in/out but otherwise sits COMPLETELY STILL, dead center — no
  // scale, no drift. Checked this directly against findrealestate.com's own mark:
  // its computed transform is "none" for the entire scroll, same bounding box at
  // every scroll position. Only the hero photo behind it moves (zoom/pan below).
  const wmIn = clamp01((progress - 0.05) / 0.15);
  const wmOut = clamp01((progress - 0.88) / 0.08);
  const wordmarkOp = wmIn * (1 - wmOut);
  heroWordmark.style.opacity = String(wordmarkOp);

  // Outline draws itself starting near the top of the hero and finishing a little
  // past the MIDDLE of the hero's scroll (progress ~0.62) — so the word is only
  // fully formed once you're a bit beyond halfway through the hero, then holds
  // fully drawn for the rest of the scroll.
  //
  // This uses a strong EASE-IN curve (t^8 — barely anything happens for most of
  // the window, then it rushes to completion right at the end), not linear. Why:
  // measured directly in-browser that these letters visually read as "basically
  // done" once only ~19% of the stroke length is drawn (thick stroke + blocky
  // glyph shapes close the gaps early) — a linear or ease-out reveal hits that 19%
  // threshold almost immediately, so the word LOOKED finished right after the top
  // of the hero regardless of the window's nominal end point. The ease-in curve
  // keeps the actual drawn fraction under that ~19% threshold until progress is
  // right around the midpoint, so it only visually resolves into a finished word
  // once you're really at/past the middle of the scroll.
  const drawLinT = clamp01((progress - 0.05) / 0.58);
  const drawT = Math.pow(drawLinT, 5);
  wmLetters.forEach((p, i) => {
    p.style.strokeDashoffset = String(wmLetterLengths[i] * (1 - drawT));
  });
  wmSubLetters.forEach((p, i) => {
    p.style.strokeDashoffset = String(wmSubLetterLengths[i] * (1 - drawT));
  });

  heroPhoto.style.transform = `translateY(${progress * -0.82 * vh}px) scale(${1 + progress * 0.29})`;

  // Finale clouds: rise up from below and take over the whole frame, then HOLD full
  // coverage — they don't sweep back out before the pin releases (an early exit was
  // leaving a bare strip of the house exposed right at the transition). They arrive
  // and stay, so the pin's own release carries them away with the rest of the hero.
  const finaleT = clamp01((progress - 0.85) / 0.15);

  // Ambient (horizontal-drift) clouds rise slowly the whole way through, but they
  // need to be OUT of the picture once the finale sweep takes over — otherwise their
  // thin drifting shapes show as stray strips of house photo poking through gaps in
  // the finale coverage. Fade them out over the same window the finale fades in.
  heroClouds.style.transform = `translateY(${progress * -0.35 * vh}px)`;
  heroClouds.style.opacity = String(1 - finaleT);
  const finaleOp = clamp01(finaleT / 0.15);
  heroCloudsFinale.style.opacity = String(finaleOp);
  heroCloudsFinale.style.transform = `translateY(${lerp(55, 0, finaleT)}%) scale(${1 + finaleT * 0.12})`;

  // Fades the bottom strip of the pin to solid white in step with the clouds, so by
  // the time the pin cuts to the next section (also solid white), there's no visible
  // seam between "translucent cloud texture" and "flat white background".
  heroFade.style.opacity = String(finaleT);
}
window.addEventListener('scroll', updateHero, { passive: true });
window.addEventListener('resize', updateHero);
updateHero();

// Header — stays fully transparent for the entire hero scroll, only turning
// solid once the pin releases (exactly when findrealestate's header does).
// Pages without the big scroll-scrub hero (e.g. institucional.html) don't have
// a #hero element — falls back to the height of a plain photo `.page-hero` if
// there is one, or a small threshold if there's no hero-like section at all.
const header = document.getElementById('header');
const pageHero = document.querySelector('.page-hero');
function updateHeaderState(){
  const scrollable = hero
    ? hero.offsetHeight - window.innerHeight
    : (pageHero ? pageHero.offsetHeight - 80 : 80);
  header.classList.toggle('is-solid', window.scrollY >= scrollable - 2);
}
window.addEventListener('scroll', updateHeaderState, { passive: true });
window.addEventListener('resize', updateHeaderState);
updateHeaderState();

// Scroll-triggered reveals for every section: two-tone headings fade in,
// cards/rows rise into place with a staggered delay. Reversible on purpose —
// scrolling back up un-reveals a section instead of leaving it stuck "shown",
// same as findrealestate.com's own sections (toggles both ways, never
// unobserves), so the entrance plays again every time it's scrolled into view.
const revealTargets = document.querySelectorAll('.reveal-text, .fade-up, .fade-up-group, .fade-in-side');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-revealed', entry.isIntersecting);
  });
}, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
revealTargets.forEach(el => revealObserver.observe(el));

// "Como funciona" steps are a genuine sequence (talk to an agent -> see
// listings -> close), so unlike every other section's uniform fade-up-group,
// this one tracks scroll continuously: whichever step sits nearest the
// vertical center of the screen lights up while the others dim, so scrolling
// through the list reads as walking through the process in order.
const stepItems = [...document.querySelectorAll('#steps li')];
function updateSteps(){
  if (!stepItems.length) return;
  const center = window.innerHeight / 2;
  let closest = null, closestDist = Infinity;
  stepItems.forEach(li => {
    const rect = li.getBoundingClientRect();
    const dist = Math.abs((rect.top + rect.bottom) / 2 - center);
    if (dist < closestDist) { closestDist = dist; closest = li; }
  });
  stepItems.forEach(li => li.classList.toggle('is-active', li === closest));
}
window.addEventListener('scroll', updateSteps, { passive: true });
window.addEventListener('resize', updateSteps);
updateSteps();

const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');
const burgerBackdrop = document.getElementById('burgerBackdrop');

function toggleMenu(open){
  burgerMenu.classList.toggle('is-open', open);
}
burgerBtn?.addEventListener('click', () => toggleMenu(!burgerMenu.classList.contains('is-open')));
burgerBackdrop?.addEventListener('click', () => toggleMenu(false));
burgerMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
