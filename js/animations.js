/* ═══════════════════════════════════════════════════
   NEONVERSE — Animations
   Count-up, parallax, particles, scroll reveal
   ═══════════════════════════════════════════════════ */

/* ── Count-Up Animation ── */
function initCountUp() {
  const statsSection = document.getElementById('stats-section');
  if (!statsSection) return;

  const observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      animateCount('count-members', 94000);
      animateCount('count-anime', 12400);
      animateCount('count-games', 8200);
      animateCount('count-ratings', 2100000);
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

function animateCount(id, target) {
  var el = document.getElementById(id);
  if (!el) return;
  var current = 0;
  var steps = 60;
  var inc = target / steps;
  var timer = setInterval(function() {
    current = Math.min(current + inc, target);
    if (target >= 1000000) {
      el.textContent = (current / 1000000).toFixed(1) + 'M+';
    } else {
      el.textContent = Math.floor(current / 1000) + 'K+';
    }
    if (current >= target) clearInterval(timer);
  }, 33);
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.dataset.stagger !== undefined) {
          entry.target.style.transitionDelay = (parseInt(entry.target.dataset.stagger) * 100) + 'ms';
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-bottom, .reveal-scale').forEach(function(el) {
    observer.observe(el);
  });
}

/* ── Parallax ── */
function initParallax() {
  var hero = document.querySelector('.hero');
  if (!hero) return;
  var bg = hero.querySelector('.hero-bg');
  if (!bg) return;

  hero.addEventListener('mousemove', function(e) {
    var rect = hero.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    requestAnimationFrame(function() {
      bg.style.transform = 'translate(' + (x * 20) + 'px, ' + (y * 20) + 'px)';
    });
  });
}

/* ── Particles ── */
function initParticles(canvasId) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 100;

  function resize() {
    var parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.8 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.color = Math.random() < 0.7 ? '176, 38, 255' : '0, 212, 255';
  };
  Particle.prototype.update = function() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.opacity -= 0.001;
    if (this.y < -10 || this.opacity <= 0) this.reset();
  };
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color + ', ' + this.opacity + ')';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.color + ', ' + (this.opacity * 0.12) + ')';
    ctx.fill();
  };

  resize();
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    var p = new Particle();
    p.y = Math.random() * canvas.height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize', resize);
}

/* ── Typewriter ── */
function initTypewriter(element, text, speed) {
  if (!element || !text) return;
  speed = speed || 60;
  var i = 0;
  element.textContent = '';
  var cursor = document.createElement('span');
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

/* ── Page Transitions ── */
function initPageTransitions() {
  var overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || !href.endsWith('.html') || href.startsWith('http')) return;
    e.preventDefault();
    overlay.classList.add('active');
    setTimeout(function() { window.location.href = href; }, 400);
  });

  window.addEventListener('pageshow', function() { overlay.classList.remove('active'); });
}

/* ── Quote Carousel ── */
function initQuoteCarousel() {
  var slides = document.querySelectorAll('.quote-slide');
  var dotsContainer = document.getElementById('quote-dots');
  if (!slides.length || !dotsContainer) return;
  var currentSlide = 0;

  slides.forEach(function(_, i) {
    var dot = document.createElement('div');
    dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function() { goToSlide(i); });
    dotsContainer.appendChild(dot);
  });

  var dots = dotsContainer.querySelectorAll('.quote-dot');

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  setInterval(function() { goToSlide((currentSlide + 1) % slides.length); }, 4000);
}
