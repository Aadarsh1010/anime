/* ═══════════════════════════════════════════════════
   NEONVERSE — Animations Module
   Count-up, parallax, particles, typewriter
   ═══════════════════════════════════════════════════ */

const Animations = (() => {

  /* ═══════════════════════════════════════════════════
     COUNT-UP — Clean, reliable, no garbled text
     ═══════════════════════════════════════════════════ */

  function startCountUp() {
    const counters = [
      { id: 'count-members', target: 94000 },
      { id: 'count-anime', target: 12400 },
      { id: 'count-games', target: 8200 },
      { id: 'count-ratings', target: 2100000 }
    ];

    counters.forEach(({ id, target }) => {
      const el = document.getElementById(id);
      if (!el || el.dataset.counted === 'true') return;
      el.dataset.counted = 'true';

      let current = 0;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        if (target >= 1000000) {
          el.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else if (target >= 10000) {
          el.textContent = Math.floor(current / 1000) + 'K+';
        } else if (target >= 1000) {
          const val = current / 1000;
          el.textContent = (Math.floor(val * 10) / 10) + 'K+';
        } else {
          el.textContent = Math.floor(current) + '+';
        }
      }, interval);
    });
  }

  function initCountUp() {
    const statsSection = document.getElementById('stats-section');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCountUp();
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  /* ═══════════════════════════════════════════════════
     SCROLL REVEAL
     ═══════════════════════════════════════════════════ */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.dataset.stagger !== undefined) {
            const delay = parseInt(entry.target.dataset.stagger) * 100;
            entry.target.style.transitionDelay = `${delay}ms`;
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-bottom, .reveal-scale').forEach(el => {
      observer.observe(el);
    });
  }

  /* ═══════════════════════════════════════════════════
     PARALLAX
     ═══════════════════════════════════════════════════ */
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const bg = hero.querySelector('.hero-bg');
    if (!bg) return;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      requestAnimationFrame(() => {
        bg.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     PARTICLES — 100 particles, 70% purple / 30% blue
     ═══════════════════════════════════════════════════ */
  function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 100;

    function resize() {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(); }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.8 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = Math.random() < 0.7 ? '176, 38, 255' : '0, 212, 255';
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.001;
        if (this.y < -10 || this.opacity <= 0) this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity * 0.12})`;
        ctx.fill();
      }
    }

    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', resize);
  }

  /* ═══════════════════════════════════════════════════
     TYPEWRITER
     ═══════════════════════════════════════════════════ */
  function initTypewriter(element, text, speed = 60) {
    if (!element) return;
    let i = 0;
    element.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    element.appendChild(cursor);

    function type() {
      if (i < text.length) {
        element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  /* ═══════════════════════════════════════════════════
     PAGE TRANSITIONS
     ═══════════════════════════════════════════════════ */
  function initPageTransitions() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.endsWith('.html') || href.startsWith('http')) return;
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => { window.location.href = href; }, 400);
    });

    window.addEventListener('pageshow', () => { overlay.classList.remove('active'); });
  }

  return {
    initScrollReveal,
    initCountUp,
    startCountUp,
    initParallax,
    initParticles,
    initTypewriter,
    initPageTransitions
  };
})();
