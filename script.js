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
const heroWhiteout = document.getElementById('heroWhiteout');

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
  // house shows through it), then the whiteout below swallows it near the end.
  const wmIn = clamp01((progress - 0.05) / 0.15);
  const wmOut = clamp01((progress - 0.72) / 0.16);
  const wordmarkOp = wmIn * (1 - wmOut);
  const wmGrow = clamp01((progress - 0.05) / 0.72);
  heroWordmark.style.opacity = String(wordmarkOp);
  heroWordmark.style.transform = `scale(${lerp(0.5, 2.6, wmGrow)}) translateY(${lerp(-6, 22, wmGrow)}%)`;

  heroPhoto.style.transform = `translateY(${progress * -0.82 * vh}px) scale(${1 + progress * 0.29})`;

  // Clouds rise the whole way AND thicken (grow + brighten) in the final third,
  // so they visibly "take over" the frame right before the next section appears.
  const cloudsThicken = clamp01((progress - 0.65) / 0.35);
  heroClouds.style.transform = `translateY(${progress * -0.5 * vh}px) scale(${1 + cloudsThicken * 0.6})`;
  heroClouds.style.opacity = String(1);

  heroWhiteout.style.opacity = String(clamp01((progress - 0.8) / 0.18));
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
