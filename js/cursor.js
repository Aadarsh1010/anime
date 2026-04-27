/* ═══════════════════════════════════════════════════
   NEONVERSE — Custom Cursor
   Neon dot + ring + trailing dots
   ═══════════════════════════════════════════════════ */

const Cursor = (() => {
  let cursor, ring;
  let trailDots = [];
  const TRAIL_COUNT = 8;
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let isHovering = false;
  let isMobile = false;

  function init() {
    // Check for mobile
    isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    if (isMobile) return;

    // Create cursor dot
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    Object.assign(cursor.style, {
      position: 'fixed',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'var(--neon-purple)',
      boxShadow: '0 0 10px var(--neon-purple), 0 0 20px rgba(176, 38, 255, 0.5)',
      pointerEvents: 'none',
      zIndex: '99999',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.2s, height 0.2s, background 0.2s',
      willChange: 'transform'
    });
    document.body.appendChild(cursor);

    // Create cursor ring
    ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    Object.assign(ring.style, {
      position: 'fixed',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      border: '2px solid rgba(176, 38, 255, 0.5)',
      pointerEvents: 'none',
      zIndex: '99998',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, border-color 0.3s',
      willChange: 'transform'
    });
    document.body.appendChild(ring);

    // Create trail dots
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      const size = Math.max(4, 12 - i * 1.2);
      const opacity = 1 - (i / TRAIL_COUNT) * 0.9;
      Object.assign(dot.style, {
        position: 'fixed',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `rgba(176, 38, 255, ${opacity})`,
        pointerEvents: 'none',
        zIndex: `${99997 - i}`,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        opacity: `${opacity}`
      });
      document.body.appendChild(dot);
      trailDots.push({ el: dot, x: 0, y: 0 });
    }

    // Events
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    // Detect interactive elements
    document.addEventListener('mouseover', onHoverIn);
    document.addEventListener('mouseout', onHoverOut);

    // Start animation loop
    requestAnimationFrame(animate);
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }

  function onMouseDown() {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    ring.style.transform = 'translate(-50%, -50%) scale(0.8)';
  }

  function onMouseUp() {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    ring.style.transform = isHovering
      ? 'translate(-50%, -50%) scale(1.6)'
      : 'translate(-50%, -50%) scale(1)';
  }

  function onHoverIn(e) {
    const target = e.target.closest('a, button, .btn, .card, .filter-pill, .search-result-item, .social-icon, .navbar-search, .quote-dot, .sort-option, .discussion-card');
    if (target) {
      isHovering = true;
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.background = 'rgba(176, 38, 255, 0.1)';
      ring.style.borderColor = 'var(--neon-purple)';
      cursor.style.background = 'var(--neon-blue)';
    }
  }

  function onHoverOut(e) {
    const target = e.target.closest('a, button, .btn, .card, .filter-pill, .search-result-item, .social-icon, .navbar-search, .quote-dot, .sort-option, .discussion-card');
    if (target) {
      isHovering = false;
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.background = 'transparent';
      ring.style.borderColor = 'rgba(176, 38, 255, 0.5)';
      cursor.style.background = 'var(--neon-purple)';
    }
  }

  function animate() {
    // Lerp ring position
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    // Update trail dots with delay
    let prevX = mouseX;
    let prevY = mouseY;
    for (let i = 0; i < trailDots.length; i++) {
      const dot = trailDots[i];
      const delay = 0.15 - i * 0.01;
      dot.x += (prevX - dot.x) * Math.max(0.05, delay);
      dot.y += (prevY - dot.y) * Math.max(0.05, delay);
      dot.el.style.left = dot.x + 'px';
      dot.el.style.top = dot.y + 'px';
      prevX = dot.x;
      prevY = dot.y;
    }

    requestAnimationFrame(animate);
  }

  return { init };
})();
