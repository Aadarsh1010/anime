/* ═══════════════════════════════════════════════════
   NEONVERSE — Main Application
   ═══════════════════════════════════════════════════ */

/* ── Loading Screen ── */
function initLoadingScreen() {
  var screen = document.querySelector('.loading-screen');
  if (!screen) return;
  var bar = screen.querySelector('.loading-progress-bar');
  var progress = 0;
  var interval = setInterval(function() {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(function() {
        screen.classList.add('hidden');
        setTimeout(function() { screen.style.display = 'none'; }, 800);
      }, 400);
    }
    if (bar) bar.style.width = progress + '%';
  }, 150);
}

/* ── Navbar ── */
function initNavbar() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  var hamburger = document.querySelector('.navbar-hamburger');
  var mobileOverlay = document.querySelector('.mobile-nav-overlay');

  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });
    mobileOverlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-nav-overlay a').forEach(function(a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* ── Button Ripples ── */
function initRipples() {
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.btn');
    if (!btn) return;
    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 600);
  });
}

/* ── Easter Egg ── */
function initEasterEgg() {
  var seq = '';
  var overlay = document.createElement('div');
  overlay.className = 'easter-egg-overlay';
  overlay.innerHTML = '<div class="easter-egg-text">YOU FOUND THE SECRET.<br>WELCOME TO THE VOID.</div>';
  document.body.appendChild(overlay);

  document.addEventListener('keypress', function(e) {
    seq += e.key.toLowerCase();
    if (seq.length > 8) seq = seq.slice(-8);
    if (seq === 'neonverse') {
      overlay.classList.add('active');
      setTimeout(function() { overlay.classList.remove('active'); }, 3000);
      seq = '';
    }
  });
}

/* ── Custom Cursor ── */
function initCursor() {
  if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) return;

  var dot = document.createElement('div');
  dot.style.cssText = 'position:fixed;width:12px;height:12px;border-radius:50%;background:#b026ff;box-shadow:0 0 10px #b026ff;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);will-change:transform;';
  document.body.appendChild(dot);

  var ring = document.createElement('div');
  ring.style.cssText = 'position:fixed;width:30px;height:30px;border-radius:50%;border:2px solid rgba(176,38,255,0.5);pointer-events:none;z-index:99998;transform:translate(-50%,-50%);will-change:transform;transition:width 0.3s,height 0.3s,background 0.3s;';
  document.body.appendChild(ring);

  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animate() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseover', function(e) {
    var t = e.target.closest('a, button, .btn, .anime-card, .game-card');
    if (t) {
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.background = 'rgba(176,38,255,0.1)';
      ring.style.borderColor = '#b026ff';
    }
  });
  document.addEventListener('mouseout', function(e) {
    var t = e.target.closest('a, button, .btn, .anime-card, .game-card');
    if (t) {
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.background = 'transparent';
      ring.style.borderColor = 'rgba(176,38,255,0.5)';
    }
  });
}

/* ── Search ── */
function initSearch() {
  var overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = '<div class="search-container"><div class="search-input-wrap"><span class="search-icon-input">\uD83D\uDD0D</span><input type="text" placeholder="Search anime..." autocomplete="off" /></div><div class="search-results"></div></div>';
  document.body.appendChild(overlay);

  var input = overlay.querySelector('input');
  var results = overlay.querySelector('.search-results');
  var debounceTimer;

  document.querySelectorAll('.navbar-search').forEach(function(btn) {
    btn.addEventListener('click', function() {
      overlay.classList.add('active');
      input.value = '';
      input.focus();
      results.classList.remove('has-results');
    });
  });

  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.classList.remove('active'); });

  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    var q = input.value.trim();
    if (q.length < 2) { results.classList.remove('has-results'); return; }
    debounceTimer = setTimeout(function() {
      fetch('https://api.jikan.moe/v4/anime?q=' + encodeURIComponent(q) + '&limit=6')
        .then(function(r) { return r.json(); })
        .then(function(json) {
          if (!json.data || !json.data.length) {
            results.innerHTML = '<div class="search-result-item"><div class="search-result-info"><div class="title" style="color:var(--text-dim)">No results</div></div></div>';
          } else {
            results.innerHTML = json.data.map(function(a) {
              var img = a.images?.jpg?.image_url || '';
              return '<div class="search-result-item"><img src="' + img + '" alt="" loading="lazy"><div class="search-result-info"><div class="title">' + a.title + '</div><div class="score">' + (a.score ? '\u2B50 ' + a.score : 'N/A') + '</div></div></div>';
            }).join('');
          }
          results.classList.add('has-results');
        })
        .catch(function() {
          results.innerHTML = '<div class="search-result-item"><div class="search-result-info"><div class="title" style="color:var(--neon-pink)">Search failed</div></div></div>';
          results.classList.add('has-results');
        });
    }, 300);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') overlay.classList.remove('active');
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.classList.add('active'); input.focus(); }
  });
}

/* ═══════════════════════════════════════════════════
   WINDOW.LOAD — Fires AFTER all scripts are ready
   ═══════════════════════════════════════════════════ */
window.addEventListener('load', function() {
  console.log('NEONVERSE loaded — initializing...');

  // Init modal DOM
  initModal();

  // Init loading screen
  initLoadingScreen();

  // Init navbar
  initNavbar();

  // Init cursor
  initCursor();

  // Init search
  initSearch();

  // Init easter egg
  initEasterEgg();

  // Init ripples
  initRipples();

  // Init animations
  initScrollReveal();
  initParallax();
  initParticles('hero-particles');
  initPageTransitions();

  // Init quote carousel (community page)
  initQuoteCarousel();

  // Typewriter
  var tw = document.querySelector('[data-typewriter]');
  if (tw) initTypewriter(tw, tw.dataset.typewriter, 50);

  // ── Route to correct page renderers ──
  var path = window.location.pathname;
  var href = window.location.href;

  // Homepage
  if (path === '/' || path === '/index.html' || path.endsWith('index.html') || path === '/' || href.includes('index.html') || (!path.includes('/') && path === '')) {
    if (document.getElementById('trending-anime-container')) {
      fetchAndRenderAnime('trending-anime-container', 6);
    }
    if (document.getElementById('top-games-container')) {
      fetchAndRenderGames('top-games-container', 6);
    }
    initCountUp();
  }

  // Anime page
  if (path.includes('anime') || href.includes('anime.html')) {
    if (document.getElementById('anime-grid-container')) {
      fetchAndRenderAnime('anime-grid-container', 24);
    }
  }

  // Games page
  if (path.includes('games') || href.includes('games.html')) {
    if (document.getElementById('games-grid-container')) {
      fetchAndRenderGames('games-grid-container', 20);
    }
  }

  // Seasonal page
  if (path.includes('seasonal') || href.includes('seasonal.html')) {
    fetchSeasonalAnime();
  }

  // Community page
  if (path.includes('community') || href.includes('community.html')) {
    if (document.getElementById('hot-anime-list')) loadHotAnimeList();
    if (document.getElementById('hot-games-list')) loadHotGamesList();
    initCountUp();
  }

  console.log('NEONVERSE initialized');
});
