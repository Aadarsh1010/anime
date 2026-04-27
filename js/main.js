/* ═══════════════════════════════════════════════════
   NEONVERSE — Main Application
   Loading screen, navbar, modal, easter egg
   ═══════════════════════════════════════════════════ */

/* ── Loading Screen ── */
const LoadingScreen = (() => {
  function init() {
    const screen = document.querySelector('.loading-screen');
    if (!screen) return;
    const bar = screen.querySelector('.loading-progress-bar');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) { progress = 100; clearInterval(interval); setTimeout(() => { screen.classList.add('hidden'); setTimeout(() => screen.style.display = 'none', 800); }, 400); }
      if (bar) bar.style.width = progress + '%';
    }, 150);
  }
  return { init };
})();

/* ── Navbar ── */
const Navbar = (() => {
  function init() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const hamburger = document.querySelector('.navbar-hamburger');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    if (hamburger && mobileOverlay) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
      });
      mobileOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileOverlay.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    // Active link
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-links a, .mobile-nav-overlay a').forEach(a => {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });
  }
  return { init };
})();

/* ═══════════════════════════════════════════════════
   MODAL — Global, used by api.js showAnimeModal/showGameModal
   ═══════════════════════════════════════════════════ */
const Modal = (() => {
  let overlay, slot;

  function init() {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal-content"><button class="modal-close">✕</button><div class="modal-slot"></div></div>';
    document.body.appendChild(overlay);
    slot = overlay.querySelector('.modal-slot');

    overlay.querySelector('.modal-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('active')) close(); });
  }

  function open(html) {
    slot.innerHTML = html;
    overlay.classList.add('active');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    const box = overlay.querySelector('.modal-content');
    if (box) box.scrollTop = 0;
  }

  function close() {
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  return { init, open, close };
})();

/* ── Button Ripple ── */
function initRipples() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

/* ── Easter Egg — type "neonverse" ── */
const EasterEgg = (() => {
  let seq = '';
  function init() {
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    overlay.innerHTML = '<div class="easter-egg-text">YOU FOUND THE SECRET.<br>WELCOME TO THE VOID.</div>';
    document.body.appendChild(overlay);

    document.addEventListener('keypress', (e) => {
      seq += e.key.toLowerCase();
      if (seq.length > 8) seq = seq.slice(-8);
      if (seq === 'neonverse') {
        overlay.classList.add('active');
        setTimeout(() => overlay.classList.remove('active'), 3000);
        seq = '';
      }
    });
  }
  return { init };
})();

/* ── Init Everything ── */
document.addEventListener('DOMContentLoaded', () => {
  LoadingScreen.init();
  Navbar.init();
  Modal.init();
  Cursor.init();
  Search.init();
  EasterEgg.init();
  initRipples();

  Animations.initScrollReveal();
  Animations.initParallax();
  Animations.initCountUp();
  Animations.initPageTransitions();
  Animations.initParticles('hero-particles');

  const tw = document.querySelector('[data-typewriter]');
  if (tw) Animations.initTypewriter(tw, tw.dataset.typewriter, 50);
});
