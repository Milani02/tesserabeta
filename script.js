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
const heroClouds = document.getElementById('heroClouds');
const heroCloudsFinale = document.getElementById('heroCloudsFinale');

function clamp01(n){ return Math.min(Math.max(n, 0), 1); }
function lerp(a, b, t){ return a + (b - a) * t; }

function updateHero(){
  if(!hero) return;
  const rect = hero.getBoundingClientRect();
  const scrollable = hero.offsetHeight - window.innerHeight;
  const progress = clamp01(-rect.top / scrollable);
  const vh = window.innerHeight;

  const contentFade = clamp01(progress / 0.18);
  heroContent.style.opacity = String(1 - contentFade);
  heroContent.style.transform = `translateY(${contentFade * -50}px)`;

  // Wordmark: fades in small, GROWS continuously while descending (matches the
  // reference — the mark doesn't hold still, it scales up and drifts down as the
  // house shows through it), then fades out while the clouds take over below.
  const wmIn = clamp01((progress - 0.05) / 0.15);
  const wmOut = clamp01((progress - 0.68) / 0.24);
  const wordmarkOp = wmIn * (1 - wmOut);
  const wmGrow = clamp01((progress - 0.05) / 0.72);
  heroWordmark.style.opacity = String(wordmarkOp);
  heroWordmark.style.transform = `scale(${lerp(0.5, 2.6, wmGrow)}) translateY(${lerp(-6, 22, wmGrow)}%)`;

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
}
window.addEventListener('scroll', updateHero, { passive: true });
window.addEventListener('resize', updateHero);
updateHero();

// Header — stays fully transparent for the entire hero scroll, only turning
// solid once the pin releases (exactly when findrealestate's header does).
const header = document.getElementById('header');
function updateHeaderState(){
  const scrollable = hero.offsetHeight - window.innerHeight;
  header.classList.toggle('is-solid', window.scrollY >= scrollable - 2);
}
window.addEventListener('scroll', updateHeaderState, { passive: true });
window.addEventListener('resize', updateHeaderState);
updateHeaderState();

// Scroll-triggered reveals for every section: two-tone headings fade in,
// cards/rows rise into place with a staggered delay.
const revealTargets = document.querySelectorAll('.reveal-text, .fade-up, .fade-up-group');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
revealTargets.forEach(el => revealObserver.observe(el));

const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');
const burgerBackdrop = document.getElementById('burgerBackdrop');

function toggleMenu(open){
  burgerMenu.classList.toggle('is-open', open);
}
burgerBtn?.addEventListener('click', () => toggleMenu(!burgerMenu.classList.contains('is-open')));
burgerBackdrop?.addEventListener('click', () => toggleMenu(false));
burgerMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
