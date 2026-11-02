/**
 * scroll-effects.js - Creative Scroll-Driven Animations & Micro-Interactions
 * Dala Dark Velvet Aesthetic: Weightless, buttery smooth 60fps performance
 */

export function initScrollEffects() {
  // 1. Inject Top Luminous Scroll Progress Line
  let progressBar = document.getElementById('scroll-progress-line');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-line';
    progressBar.className = 'scroll-progress-line';
    document.body.appendChild(progressBar);
  }

  // 2. Inject Floating Back to Top Pill
  let scrollTopBtn = document.getElementById('scroll-top-pill');
  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-pill';
    scrollTopBtn.className = 'scroll-top-pill';
    const isEn = document.documentElement.lang === 'en';
    scrollTopBtn.setAttribute('aria-label', isEn ? 'Back to top' : 'العودة لأعلى الصفحة');
    scrollTopBtn.innerHTML = `
      <span class="scroll-top-arrow">↑</span>
      <span id="scroll-top-text">${isEn ? 'Top' : 'للأعلى'}</span>
      <span class="scroll-top-dot"></span>
    `;
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(scrollTopBtn);
  }

  // 3. Optimized Scroll Animation Loop with requestAnimationFrame
  let ticking = false;
  const categoryNav = document.querySelector('.category-nav-bar');
  const heroText = document.querySelector('.hero-text-col');

  function updateScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Toggle Back to Top pill
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Sticky category bar elevation
    if (categoryNav) {
      if (scrollY > 380) {
        categoryNav.classList.add('is-sticky');
      } else {
        categoryNav.classList.remove('is-sticky');
      }
    }

    // Subtle hero text parallax depth
    if (heroText && scrollY < 700) {
      heroText.style.transform = `translateY(${scrollY * 0.14}px)`;
      heroText.style.opacity = `${Math.max(0, 1 - scrollY / 650)}`;
    }

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateScroll();

  // 4. Staggered Scroll Reveal Observer for Skill Cards
  observeCardsScrollEntrance();

  // 5. Interactive Mouse Spotlight Glow on Cards
  attachCardSpotlightGlow();
}

/**
 * Observes cards as they scroll into view and reveals them with staggered wave animation
 */
export function observeCardsScrollEntrance() {
  if (!('IntersectionObserver' in window)) return;

  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add('in-view');
          observer.unobserve(card);
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    }
  );

  // Observe existing and newly rendered cards
  const cards = document.querySelectorAll('.skill-card:not(.in-view)');
  cards.forEach((card, idx) => {
    card.style.setProperty('--card-stagger-delay', `${(idx % 6) * 45}ms`);
    cardObserver.observe(card);
  });
}

/**
 * Modern card spotlight cursor tracking: border & surface glow following cursor
 */
export function attachCardSpotlightGlow() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.skill-card');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
}
