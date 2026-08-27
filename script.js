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
const heroWordmarkSubOutline = document.getElementById('heroWordmarkSubOutline');
const heroWordmarkIcon = document.getElementById('heroWordmarkIcon');
const heroClouds = document.getElementById('heroClouds');
const heroCloudsFinale = document.getElementById('heroCloudsFinale');
const heroFade = document.getElementById('heroFade');
const header = document.getElementById('header');
const headerLogo = document.querySelector('.logo');
const iconFlight = document.getElementById('iconFlight');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clamp01(n){ return Math.min(Math.max(n, 0), 1); }
function lerp(a, b, t){ return a + (b - a) * t; }
function easeInOutCubic(t){ return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; }

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

  // Wordmark group fades in (dead center, no scale/drift — matches
  // findrealestate.com's own mark) and then just HOLDS at full opacity; the exit
  // is handled per-piece below instead of fading the whole lockup out together.
  const wmIn = clamp01((progress - 0.05) / 0.15);
  heroWordmark.style.opacity = String(wmIn);

  // Deep into the hold, "TÉSSERA" and the "NEGÓCIOS IMOBILIÁRIOS" line underneath
  // fade out together while the icon glyph slides from beside the text to dead
  // center screen — eased (not linear) so the glide reads as deliberate.
  const textOut = clamp01((progress - 0.72) / 0.14);
  const textOutEased = easeInOutCubic(textOut);
  if (heroWordmarkOutline) heroWordmarkOutline.style.opacity = String(1 - textOutEased);
  if (heroWordmarkSubOutline) heroWordmarkSubOutline.style.opacity = String(1 - textOutEased);

  // Once centered and held alone for a beat, the icon launches on a flight to the
  // header logo slot. Guarded by state, not by progress alone, so it fires
  // exactly once per crossing — and un-reveals cleanly if scrolled back up.
  updateIconFlight(progress >= 0.92);

  if (heroWordmarkIcon) {
    heroWordmarkIcon.style.transform = `translateX(${iconCenterShift * textOutEased}px)`;
    // Hidden the instant the flight clone takes over, so there's never a beat
    // with both the in-hero icon and the flying one visible at once.
    heroWordmarkIcon.style.opacity = iconFlightState === 'idle' ? '1' : '0';
    // Turns brand green the instant it finishes centering, so it's already the
    // flight clone's color before it ever takes off — see .is-centered in CSS.
    heroWordmarkIcon.classList.toggle('is-centered', textOut >= 1);
  }

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

// Header logo — hidden for the whole hero scroll on pages that have one, then
// "formed" by the hero's own icon glyph: it centers itself once the wordmark
// text is gone, then detaches into a fixed-position flight to the header logo
// slot. .has-hero gates the hidden state so hero-less pages (institucional.html)
// keep the logo visible as normal.
if (hero) header.classList.add('has-hero');

// The icon sits left-of-center in the flex row while "TÉSSERA" is still beside
// it. Once that text fades, this is how far it has to slide (via translateX) to
// land on the true viewport center — measured with its own transform cleared
// first so a stale offset from a previous frame can't corrupt the reading.
let iconCenterShift = 0;
function measureIconCenterShift(){
  if (!heroWordmarkIcon) return;
  const prevTransform = heroWordmarkIcon.style.transform;
  heroWordmarkIcon.style.transform = 'none';
  const rect = heroWordmarkIcon.getBoundingClientRect();
  iconCenterShift = window.innerWidth / 2 - (rect.left + rect.width / 2);
  heroWordmarkIcon.style.transform = prevTransform;
}
measureIconCenterShift();
window.addEventListener('resize', measureIconCenterShift);

// A standalone clone of the hero icon SVG, kept invisible until the flight
// launches. Cloned once at load rather than at launch time so there's no build
// cost mid-scroll; its stroke-dash animation is stripped immediately so it
// always renders fully drawn, same as the real icon looks by flight time.
let flightIconEl = null;
if (iconFlight && heroWordmarkIcon) {
  flightIconEl = heroWordmarkIcon.cloneNode(true);
  flightIconEl.removeAttribute('id');
  flightIconEl.removeAttribute('class');
  flightIconEl.querySelectorAll('.wm-letter').forEach(p => {
    p.style.strokeDasharray = 'none';
    p.style.strokeDashoffset = '0';
  });
  iconFlight.appendChild(flightIconEl);
}

let iconFlightState = 'idle'; // idle -> flying -> revealed
let iconFlightAnimation = null;
function launchIconFlight(){
  if (prefersReducedMotion || !iconFlight || !flightIconEl || !heroWordmarkIcon || !headerLogo) {
    iconFlightState = 'revealed';
    header.classList.add('logo-revealed');
    return;
  }
  const startRect = heroWordmarkIcon.getBoundingClientRect();
  const endRect = headerLogo.getBoundingClientRect();

  // Match the flight icon's on-screen size to the hero icon's current size
  // exactly (no pop at handoff), then work out how far it scales down to read
  // as roughly logo-sized by the time it lands.
  iconFlight.style.height = `${startRect.height}px`;
  const naturalRect = iconFlight.getBoundingClientRect();
  const halfW = naturalRect.width / 2;
  const halfH = naturalRect.height / 2;
  const endScale = clamp01(endRect.height / startRect.height) || 0.3;

  const startCenterX = startRect.left + startRect.width / 2;
  const startCenterY = startRect.top + startRect.height / 2;
  const endCenterX = endRect.left + endRect.width / 2;
  const endCenterY = endRect.top + endRect.height / 2;
  // translate() moves the box's NATURAL center (fixed by halfW/halfH regardless
  // of the scale() applied alongside it), so the same half-offset works at both ends.
  const startX = startCenterX - halfW;
  const startY = startCenterY - halfH;
  const endX = endCenterX - halfW;
  const endY = endCenterY - halfH;
  const dx = endX - startX;
  const dy = endY - startY;
  // Slight upward arc rather than a straight line — reads as a "thrown" object,
  // not a linear tween.
  const arcLift = -Math.min(140, Math.abs(dx) * 0.3);

  if (iconFlightAnimation) iconFlightAnimation.cancel();
  iconFlight.style.opacity = '1';
  iconFlightAnimation = iconFlight.animate([
    { transform:`translate(${startX}px, ${startY}px) scale(1)`, opacity:1, offset:0 },
    { transform:`translate(${startX + dx * 0.55}px, ${startY + dy * 0.55 + arcLift}px) scale(${lerp(1, endScale, 0.6)})`, opacity:1, offset:0.65 },
    { transform:`translate(${endX}px, ${endY}px) scale(${endScale})`, opacity:0, offset:1 },
  ], { duration:680, easing:'cubic-bezier(0.77, 0, 0.175, 1)', fill:'forwards' }); // --ease-in-out

  iconFlightAnimation.onfinish = () => {
    iconFlightState = 'revealed';
    header.classList.add('logo-revealed');
    iconFlight.style.opacity = '0';
  };
}
function updateIconFlight(shouldFly){
  if (!hero) return;
  if (shouldFly && iconFlightState === 'idle') {
    iconFlightState = 'flying';
    launchIconFlight();
  } else if (!shouldFly && iconFlightState !== 'idle') {
    iconFlightState = 'idle';
    header.classList.remove('logo-revealed');
    if (iconFlightAnimation) { iconFlightAnimation.cancel(); iconFlightAnimation = null; }
    if (iconFlight) iconFlight.style.opacity = '0';
  }
}
updateHero();

// Header — stays fully transparent for the entire hero scroll, only turning
// solid once the pin releases (exactly when findrealestate's header does).
// Pages without the big scroll-scrub hero (e.g. institucional.html) don't have
// a #hero element — falls back to the height of a plain photo `.page-hero` if
// there is one, or a small threshold if there's no hero-like section at all.
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

// Stats bento grid — numbers count up from 0 to their target every time the
// section scrolls into view (reset on exit so it's ready to replay, same
// reversible-reveal philosophy as everything else on the site), eased with
// power2.out (1 - (1-t)^2) rather than linear, so the count decelerates into
// its final value instead of just stopping.
const statNumbers = document.querySelectorAll('.stats__num');
function animateStatCount(el){
  const target = parseFloat(el.dataset.count);
  if (Number.isNaN(target)) return;
  const suffix = el.dataset.suffix || '';
  if (el._statCountFrame) cancelAnimationFrame(el._statCountFrame);
  const duration = 1400;
  const start = performance.now();
  function tick(now){
    const t = clamp01((now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 2); // power2.out
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) el._statCountFrame = requestAnimationFrame(tick);
  }
  el._statCountFrame = requestAnimationFrame(tick);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStatCount(entry.target);
    } else {
      if (entry.target._statCountFrame) cancelAnimationFrame(entry.target._statCountFrame);
      entry.target.textContent = '0' + (entry.target.dataset.suffix || '');
    }
  });
}, { threshold: 0.4 });
statNumbers.forEach(el => statsObserver.observe(el));

// Bento hover glow — tracks the pointer within each block and writes it to
// --gx/--gy (consumed by the ::before/::after radial gradients in CSS), so the
// glow ring and inner spotlight follow the cursor instead of sitting static.
document.querySelectorAll('.stats__item').forEach(item => {
  item.addEventListener('pointermove', (e) => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty('--gx', `${e.clientX - rect.left}px`);
    item.style.setProperty('--gy', `${e.clientY - rect.top}px`);
  });
});

// Segments — cursor-following preview (desktop only: a persistent cursor is
// what this effect means, so it never runs on touch). The preview eases
// toward the pointer each frame rather than snapping to it 1:1 — that lag is
// what makes it read as a floating photo instead of a tooltip glued to the
// cursor.
const segmentsList = document.getElementById('segmentsList');
const segmentsPreview = document.getElementById('segmentsPreview');
const segmentsPreviewImg = document.getElementById('segmentsPreviewImg');
if (segmentsList && segmentsPreview && segmentsPreviewImg && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const offsetX = 28, offsetY = -110;
  let targetX = 0, targetY = 0, curX = 0, curY = 0, primed = false, active = false, rafId = null;

  function loopPreview(){
    curX += (targetX - curX) * 0.16;
    curY += (targetY - curY) * 0.16;
    segmentsPreview.style.transform = `translate(${curX}px, ${curY}px)`;
    const settled = Math.abs(targetX - curX) < 0.5 && Math.abs(targetY - curY) < 0.5;
    if (active || !settled) {
      rafId = requestAnimationFrame(loopPreview);
    } else {
      rafId = null;
    }
  }
  function ensurePreviewLoop(){ if (!rafId) rafId = requestAnimationFrame(loopPreview); }

  segmentsList.addEventListener('pointermove', (e) => {
    targetX = e.clientX + offsetX;
    targetY = e.clientY + offsetY;
    if (!primed) { curX = targetX; curY = targetY; primed = true; } // no swoop-in from a stale (0,0) on first move
    ensurePreviewLoop();
  });
  segmentsList.querySelectorAll('.segments__row').forEach(row => {
    row.addEventListener('pointerenter', () => {
      active = true;
      segmentsPreviewImg.style.backgroundImage = `url('${row.dataset.image}')`;
      segmentsPreview.classList.add('is-visible');
      ensurePreviewLoop();
    });
  });
  segmentsList.addEventListener('pointerleave', () => {
    active = false;
    segmentsPreview.classList.remove('is-visible');
  });
}

// Segments — single-open accordion. Opening one closes whatever else was open
// (a "which segment am I looking at" list, not a multi-expand FAQ), using the
// grid-template-rows 0fr/1fr trick in CSS for the smooth height animation.
document.querySelectorAll('.segments__toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('.segments__row');
    const wasOpen = row.classList.contains('is-open');
    row.parentElement.querySelectorAll('.segments__row.is-open').forEach(openRow => {
      openRow.classList.remove('is-open');
      openRow.querySelector('.segments__toggle').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      row.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Listings — art-gallery drag canvas. Native wheel/trackpad/touch scroll
// already works with zero JS here (.listings__scroller is a plain
// overflow-x:auto flex row); this layers on:
//  1. Click-and-drag for mouse only — touch already gets native, better-feeling
//     momentum scroll, and pointer-dragging on top of it would only fight it.
//  2. A seamless infinite wrap: the real 5 cards are cloned twice more (3 sets
//     total), start scrolled into the middle set, and silently jump by exactly
//     one set's width whenever scroll drifts into an outer copy — invisible
//     since the copies are identical, so it reads as an endless strip.
const listingsScroller = document.getElementById('listingsScroller');
if (listingsScroller) {
  const originalCards = [...listingsScroller.children];
  for (let i = 0; i < 2; i++) {
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true'); // decorative wrap copies, not real duplicate listings
      listingsScroller.appendChild(clone);
    });
  }

  let listingsSetWidth = 0;
  function measureListingsSetWidth(){ listingsSetWidth = listingsScroller.scrollWidth / 3; }
  measureListingsSetWidth();
  window.addEventListener('resize', measureListingsSetWidth);
  listingsScroller.scrollLeft = listingsSetWidth;

  listingsScroller.addEventListener('scroll', () => {
    if (!listingsSetWidth) return;
    if (listingsScroller.scrollLeft < listingsSetWidth * 0.5) {
      listingsScroller.scrollLeft += listingsSetWidth;
    } else if (listingsScroller.scrollLeft > listingsSetWidth * 1.5) {
      listingsScroller.scrollLeft -= listingsSetWidth;
    }
  }, { passive: true });

  let listingsDragging = false, listingsStartX = 0, listingsStartScroll = 0;
  listingsScroller.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    listingsDragging = true;
    listingsStartX = e.clientX;
    listingsStartScroll = listingsScroller.scrollLeft;
    listingsScroller.setPointerCapture(e.pointerId);
    listingsScroller.classList.add('is-dragging');
  });
  listingsScroller.addEventListener('pointermove', (e) => {
    if (!listingsDragging) return;
    listingsScroller.scrollLeft = listingsStartScroll - (e.clientX - listingsStartX);
  });
  function endListingsDrag(){
    listingsDragging = false;
    listingsScroller.classList.remove('is-dragging');
  }
  listingsScroller.addEventListener('pointerup', endListingsDrag);
  listingsScroller.addEventListener('pointercancel', endListingsDrag);
}

// Comprar/Alugar — the toggle switch. "comprar"/"alugar" are mutually
// exclusive (aria-pressed mirrors it); switching one crossfades the matching
// description and repoints the CTA, so the toggle actually does something
// rather than just looking interactive.
const bigtextToggles = document.querySelectorAll('.bigtext__toggle');
const bigtextDescs = document.querySelectorAll('.bigtext__desc');
const bigtextCta = document.getElementById('bigtextCta');
const bigtextCtaLabel = document.getElementById('bigtextCtaLabel');
const bigtextCtaCopy = {
  comprar: { href: '#comprar', label: 'Ver imóveis à venda' },
  alugar: { href: '#alugar', label: 'Ver imóveis para alugar' },
};
bigtextToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    bigtextToggles.forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    bigtextDescs.forEach(p => p.classList.toggle('is-active', p.dataset.mode === mode));
    const copy = bigtextCtaCopy[mode];
    if (copy && bigtextCta && bigtextCtaLabel) {
      bigtextCta.href = copy.href;
      bigtextCtaLabel.textContent = copy.label;
    }
  });
});

const darkctaSection = document.querySelector('.darkcta');

// Dark CTA — cursor spotlight. Writes the pointer position (relative to the
// section itself, not the viewport) to --sx/--sy, which the dot-grid mask and
// the color glow in CSS both read — everything this drives stays inside
// .darkcta's own box, nothing reaches outside it.
if (darkctaSection) {
  darkctaSection.addEventListener('pointermove', (e) => {
    const rect = darkctaSection.getBoundingClientRect();
    darkctaSection.style.setProperty('--sx', `${e.clientX - rect.left}px`);
    darkctaSection.style.setProperty('--sy', `${e.clientY - rect.top}px`);
  });
}

// Dark CTA — magnetic button. Tracks the pointer across the whole section
// (already far wider than the button itself), pulling the button toward it
// once within range — that proximity lead-in, starting before the cursor
// actually reaches the button, is what reads as "magnetic" rather than a
// plain hover effect. Desktop only.
const darkctaMagnetic = document.getElementById('darkctaMagnetic');
if (darkctaSection && darkctaMagnetic && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const maxDist = 130; // px from button center where the pull starts
  const strength = 0.4; // fraction of the offset actually applied
  darkctaSection.addEventListener('mousemove', (e) => {
    const rect = darkctaMagnetic.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist < maxDist) {
      const pull = 1 - dist / maxDist; // stronger the closer the cursor gets
      darkctaMagnetic.style.transform = `translate(${dx * strength * pull}px, ${dy * strength * pull}px)`;
    } else {
      darkctaMagnetic.style.transform = 'translate(0, 0)';
    }
  });
  darkctaSection.addEventListener('mouseleave', () => {
    darkctaMagnetic.style.transform = 'translate(0, 0)';
  });
}

// Final CTA — screen-fill text reveal. .finalcta--fill is a tall (220vh)
// scroll runway; .finalcta__pin is the sticky 100vh window (same pin pattern
// as the hero). The solid brand-colored text copy is clipped with
// clip-path: inset(), and that clip's right-hand edge sweeps from 100%
// (fully hidden) to 0% (fully revealed) as the section scrolls through — a
// left-to-right wipe onto the hollow outline copy underneath it.
const finalctaSection = document.getElementById('finalcta');
const finalctaFill = document.querySelector('.finalcta__text--fill');
const finalctaBtn = document.getElementById('finalctaBtn');
if (finalctaSection && finalctaFill) {
  function updateFinalctaFill(){
    const rect = finalctaSection.getBoundingClientRect();
    const scrollable = finalctaSection.offsetHeight - window.innerHeight;
    const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
    finalctaFill.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
    if (finalctaBtn) finalctaBtn.classList.toggle('is-visible', progress > 0.85);
  }
  window.addEventListener('scroll', updateFinalctaFill, { passive: true });
  window.addEventListener('resize', updateFinalctaFill);
  updateFinalctaFill();
}

// "Como funciona" steps — right-to-left depth carousel. .steps-track is a tall
// (300vh) scroll runway; .steps is the sticky window pinned inside it (same
// offset/release point as .rewired__left-inner, so both columns pin and let go
// together). Each card's signed distance from "active" (its own index minus
// the continuous scroll position across the 3 cards) drives everything about
// it every frame — position, 3D tilt, scale, blur, shadow — so a card enters
// from the right, comes into focus at center, and exits to the left as one
// continuous, reversible motion instead of a hard per-step cut.
const rewiredSection = document.getElementById('rewired');
const stepsTrack = document.getElementById('stepsTrack');
const stepItems = [...document.querySelectorAll('#steps li')];
const rewiredProgressFill = document.getElementById('rewiredProgressFill');
const rewiredCounterNum = document.getElementById('rewiredCounterNum');
let rewiredActiveIndex = -1;
let counterAnimFrame = null;

// Ticks the floating counter's digits from one step number to the next over a
// few frames instead of cutting straight to the new value — small range (1-3)
// so a plain requestAnimationFrame tween is plenty, no need for a library.
function animateCounter(el, from, to){
  if (!el) return;
  if (counterAnimFrame) cancelAnimationFrame(counterAnimFrame);
  if (from === to) { el.textContent = String(to).padStart(2, '0'); return; }
  const duration = 320;
  const start = performance.now();
  function tick(now){
    const t = clamp01((now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(lerp(from, to, eased))).padStart(2, '0');
    if (t < 1) counterAnimFrame = requestAnimationFrame(tick);
  }
  counterAnimFrame = requestAnimationFrame(tick);
}

function updateStepsCarousel(){
  if (!stepsTrack || !stepItems.length) return;
  const rect = stepsTrack.getBoundingClientRect();
  const scrollable = stepsTrack.offsetHeight - window.innerHeight;
  const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
  const n = stepItems.length;
  const raw = progress * (n - 1);

  stepItems.forEach((li, i) => {
    // Positive d = still upcoming, off to the right, waiting its turn.
    // Negative d = already had its turn, exited to the left.
    const d = i - raw;
    const clamped = Math.max(-1, Math.min(1, d));
    const dist = Math.abs(clamped);
    const focus = 1 - dist;

    const x = clamped * 78; // %, how far off-center
    const rotateY = clamped * -14; // deg, subtle 3D tilt toward the direction of travel
    const z = -dist * 160; // px, recedes into the screen as it leaves focus
    const scale = lerp(1, 0.82, dist);
    const opacity = lerp(1, 0.22, dist);
    const blur = lerp(0, 5, dist);

    li.style.transform = `translateX(${x}%) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
    li.style.opacity = String(opacity);
    li.style.filter = dist > 0.02 ? `blur(${blur.toFixed(2)}px)` : 'none';
    // Kept inside the ~52px padding buffer .steps reserves around the clipped
    // window (see styles.css) — max offset+blur here stays under that so the
    // active card's shadow always renders in full instead of hitting the clip.
    li.style.boxShadow =
      `0 1px 2px rgba(17,24,21,${(0.03 + 0.04 * focus).toFixed(3)}), ` +
      `0 ${Math.round(8 + 22 * focus)}px ${Math.round(18 + 26 * focus)}px ${Math.round(-6 * focus)}px rgba(0,69,54,${(0.05 + 0.22 * focus).toFixed(3)})`;
    li.style.zIndex = String(100 - Math.round(dist * 50));
    li.classList.toggle('is-active', dist < 0.5);
  });

  const closestIndex = Math.max(0, Math.min(n - 1, Math.round(raw)));
  if (closestIndex !== rewiredActiveIndex) {
    const from = rewiredActiveIndex === -1 ? closestIndex + 1 : rewiredActiveIndex + 1;
    animateCounter(rewiredCounterNum, from, closestIndex + 1);
    rewiredActiveIndex = closestIndex;
    if (rewiredSection) rewiredSection.dataset.phase = String(closestIndex);
  }

  if (rewiredProgressFill) rewiredProgressFill.style.height = `${progress * 100}%`;
}
window.addEventListener('scroll', updateStepsCarousel, { passive: true });
window.addEventListener('resize', updateStepsCarousel);
updateStepsCarousel();

const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');
const burgerBackdrop = document.getElementById('burgerBackdrop');

function toggleMenu(open){
  burgerMenu.classList.toggle('is-open', open);
}
burgerBtn?.addEventListener('click', () => toggleMenu(!burgerMenu.classList.contains('is-open')));
burgerBackdrop?.addEventListener('click', () => toggleMenu(false));
burgerMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// Footer — live Londrina time + open/closed status, computed from the same
// hours already printed elsewhere on the site (seg-sex 08-18, sáb 08-12),
// not a hardcoded label. Uses Intl with an explicit America/Sao_Paulo time
// zone, so it reads correctly regardless of the visitor's own device time zone.
const footerClock = document.getElementById('footerClock');
const footerStatus = document.getElementById('footerStatus');
const footerStatusText = document.getElementById('footerStatusText');
if (footerClock && footerStatus && footerStatusText) {
  const clockFormatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit',
  });
  const partsFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', hourCycle: 'h23',
  });
  function updateFooterClock(){
    const now = new Date();
    footerClock.textContent = clockFormatter.format(now);
    const parts = partsFormatter.formatToParts(now);
    const weekday = parts.find(p => p.type === 'weekday').value;
    const hour = parseInt(parts.find(p => p.type === 'hour').value, 10);
    const isSat = weekday === 'Sat';
    const isSun = weekday === 'Sun';
    const open = isSun ? false : (isSat ? hour >= 8 && hour < 12 : hour >= 8 && hour < 18);
    footerStatus.classList.toggle('is-closed', !open);
    footerStatusText.textContent = open ? 'Atendimento aberto' : 'Disponível via WhatsApp';
  }
  updateFooterClock();
  setInterval(updateFooterClock, 30000);
}

// Footer — quick-contact micro-form. No backend to submit to, so "sending"
// means something that actually works without one: validate the number
// client-side, then hand the visitor a real wa.me link pre-filled with their
// own number, so the lead reaches the company for real over WhatsApp instead
// of vanishing into a fake success message.
const footerQuickForm = document.getElementById('footerQuickForm');
const footerPhone = document.getElementById('footerPhone');
const footerQuickFeedback = document.getElementById('footerQuickFeedback');
if (footerQuickForm && footerPhone && footerQuickFeedback) {
  footerQuickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const digits = footerPhone.value.replace(/\D/g, '');
    const valid = digits.length === 10 || digits.length === 11; // DDD + phone, with or without the 9
    footerQuickForm.classList.toggle('is-invalid', !valid);
    footerQuickFeedback.classList.remove('is-error', 'is-success');
    if (!valid) {
      footerQuickFeedback.textContent = 'Número inválido — use o formato (43) 99999-9999.';
      footerQuickFeedback.classList.add('is-error');
      footerPhone.focus();
      return;
    }
    const displayNumber = footerPhone.value.trim();
    const waText = encodeURIComponent(`Olá! Meu WhatsApp é ${displayNumber}, pode me chamar por aqui?`);
    footerQuickFeedback.innerHTML = `Prontinho — <a href="https://wa.me/+5543988370005?text=${waText}" target="_blank" rel="noopener">toque aqui para confirmar no WhatsApp</a>.`;
    footerQuickFeedback.classList.add('is-success');
  });
  footerPhone.addEventListener('input', () => {
    footerQuickForm.classList.remove('is-invalid');
    footerQuickFeedback.classList.remove('is-error');
    footerQuickFeedback.textContent = '';
  });
}
