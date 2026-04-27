/* ═══════════════════════════════════════════════════
   NEONVERSE — Global Styles
   Foundation: variables, reset, typography, utilities, cards
   ═══════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@700;900&family=Rajdhani:wght@600;700&display=swap');

/* ── CSS Variables ── */
:root {
  --bg-primary: #05050f;
  --bg-secondary: #0d0d1a;
  --neon-purple: #b026ff;
  --neon-blue: #00d4ff;
  --neon-pink: #ff2d78;
  --neon-green: #00ff9d;
  --glass: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(176, 38, 255, 0.3);
  --text-primary: #e8e8f0;
  --text-secondary: #8888aa;
  --text-dim: #555577;
  --radius: 12px;
  --radius-lg: 20px;
  --transition: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Reset ── */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--neon-purple) var(--bg-primary);
}

html::-webkit-scrollbar { width: 6px; }
html::-webkit-scrollbar-track { background: var(--bg-primary); }
html::-webkit-scrollbar-thumb {
  background: var(--neon-purple);
  border-radius: 3px;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  cursor: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body.modal-open { overflow: hidden; }

/* ── Page Transition Overlay ── */
.page-transition {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 100000;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.page-transition.active { opacity: 1; }

/* ── Typography ── */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  text-shadow: 0 0 10px var(--neon-purple), 0 0 30px var(--neon-purple), 0 0 60px rgba(176, 38, 255, 0.3);
}

h2 {
  font-size: clamp(1.8rem, 4vw, 3rem);
  text-shadow: 0 0 8px var(--neon-purple), 0 0 20px rgba(176, 38, 255, 0.4);
}

h3 {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
}

p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}

a {
  color: var(--neon-blue);
  text-decoration: none;
  transition: all 0.3s var(--transition);
}

img {
  display: block;
  max-width: 100%;
  filter: saturate(1.2) contrast(1.05);
}

/* ── Layout ── */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
}

.section {
  padding: clamp(3rem, 8vw, 6rem) 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 { margin-bottom: 0.5rem; }

.section-header p {
  max-width: 600px;
  margin: 0 auto;
}

/* ── Noise Texture ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 256px;
}

/* ── Loading Screen ── */
.loading-screen {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}

.loading-screen.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.loading-logo {
  display: flex;
  gap: 4px;
  margin-bottom: 2rem;
}

.loading-logo span {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--neon-purple);
  text-shadow: 0 0 20px var(--neon-purple), 0 0 40px var(--neon-purple);
  opacity: 0;
  transform: translateY(20px);
  animation: letterReveal 0.5s forwards;
}

.loading-logo span:nth-child(1) { animation-delay: 0.1s; }
.loading-logo span:nth-child(2) { animation-delay: 0.15s; }
.loading-logo span:nth-child(3) { animation-delay: 0.2s; }
.loading-logo span:nth-child(4) { animation-delay: 0.25s; }
.loading-logo span:nth-child(5) { animation-delay: 0.3s; }
.loading-logo span:nth-child(6) { animation-delay: 0.35s; }
.loading-logo span:nth-child(7) { animation-delay: 0.4s; }
.loading-logo span:nth-child(8) { animation-delay: 0.45s; }
.loading-logo span:nth-child(9) { animation-delay: 0.5s; }

@keyframes letterReveal {
  to { opacity: 1; transform: translateY(0); }
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--neon-purple);
  border-right-color: var(--neon-blue);
  animation: spinRing 1s linear infinite;
  margin-bottom: 2rem;
  position: relative;
}

.loading-spinner::before {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-bottom-color: var(--neon-pink);
  border-left-color: var(--neon-green);
  animation: spinRing 0.6s linear infinite reverse;
}

@keyframes spinRing {
  to { transform: rotate(360deg); }
}

.loading-progress {
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  overflow: hidden;
}

.loading-progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--neon-purple), var(--neon-blue));
  border-radius: 1px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px var(--neon-purple);
}

/* ── Buttons ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  border-radius: var(--radius);
  cursor: none;
  position: relative;
  overflow: hidden;
  transition: all 0.4s var(--transition);
}

.btn-primary {
  background: var(--neon-purple);
  color: #fff;
  box-shadow: 0 0 20px rgba(176, 38, 255, 0.4);
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(176, 38, 255, 0.6), 0 0 60px rgba(176, 38, 255, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--neon-blue);
  border: 2px solid transparent;
  background-image: linear-gradient(var(--bg-primary), var(--bg-primary)), linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.btn-outline:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
}

.btn-ghost {
  background: var(--glass);
  backdrop-filter: blur(12px);
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
}

.btn-ghost:hover {
  background: rgba(176, 38, 255, 0.1);
  border-color: var(--neon-purple);
  transform: scale(1.05);
}

.btn .ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: rippleEffect 0.6s linear;
  pointer-events: none;
}

@keyframes rippleEffect {
  to { transform: scale(4); opacity: 0; }
}

/* ═══════════════════════════════════════════════════
   ANIME & GAME CARDS — Shared card system
   ═══════════════════════════════════════════════════ */

/* Container grids */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.card-grid-scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.card-grid-scroll::-webkit-scrollbar { height: 4px; }
.card-grid-scroll::-webkit-scrollbar-track { background: var(--glass); }
.card-grid-scroll::-webkit-scrollbar-thumb { background: var(--neon-purple); border-radius: 2px; }

/* ── Anime Card ── */
.anime-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background: #0d0d1a;
  border: 1px solid rgba(176, 38, 255, 0.15);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s;
  flex-shrink: 0;
  width: 200px;
}

.card-grid .anime-card { width: 100%; }

.anime-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 20px 50px rgba(176, 38, 255, 0.3), 0 0 30px rgba(176, 38, 255, 0.15);
  border-color: var(--neon-purple);
}

.anime-card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.anime-card:hover img { transform: scale(1.08); }

.card-rank {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--neon-purple);
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(176, 38, 255, 0.5);
  z-index: 5;
}

.card-score {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 8px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: var(--neon-green);
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid rgba(0, 255, 157, 0.3);
  z-index: 5;
}

.score-green { color: var(--neon-green); border-color: rgba(0, 255, 157, 0.3); }
.score-yellow { color: #ffd700; border-color: rgba(255, 215, 0, 0.3); }

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem 0.8rem 0.8rem;
  background: linear-gradient(180deg, transparent 0%, rgba(5, 5, 15, 0.95) 60%);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.card-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(176, 38, 255, 0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.genre-tag {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 0.65rem;
  color: var(--neon-blue);
  background: rgba(0, 212, 255, 0.12);
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.view-btn {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: var(--neon-purple);
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(176, 38, 255, 0.4);
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(8px);
}

.anime-card:hover .view-btn,
.game-card:hover .view-btn {
  opacity: 1;
  transform: translateY(0);
}

.view-btn:hover {
  box-shadow: 0 0 25px rgba(176, 38, 255, 0.6);
}

/* ── Game Card ── */
.game-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background: #0d0d1a;
  border: 1px solid rgba(176, 38, 255, 0.15);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.3s;
  flex-shrink: 0;
  width: 300px;
  height: 220px;
}

.card-grid .game-card { width: 100%; height: 260px; }

.game-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 50px rgba(176, 38, 255, 0.3), 0 0 30px rgba(176, 38, 255, 0.15);
  border-color: var(--neon-purple);
}

.game-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.game-card:hover img { transform: scale(1.08); }

.game-card .card-overlay {
  padding: 4rem 1rem 1rem;
}

.game-card .card-title {
  font-size: 0.95rem;
}

/* ── Skeleton Loaders ── */
.card-skeleton {
  border-radius: 14px;
  overflow: hidden;
  background: var(--glass);
  position: relative;
  min-height: 280px;
}

.card-grid-scroll .card-skeleton {
  width: 200px;
  flex-shrink: 0;
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, var(--glass) 25%, rgba(255,255,255,0.08) 50%, var(--glass) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius);
}

.skeleton-card {
  height: 320px;
  border-radius: var(--radius);
}

.skeleton-text {
  height: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
}

.skeleton-text.short { width: 60%; }

/* ═══════════════════════════════════════════════════
   MODAL — Cinematic Detail View
   ═══════════════════════════════════════════════════ */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease, visibility 0.35s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  width: min(900px, 90vw);
  max-height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #0d0d1a;
  border: 1px solid rgba(176, 38, 255, 0.4);
  border-radius: 16px;
  box-shadow: 0 0 60px rgba(176, 38, 255, 0.3), 0 0 120px rgba(176, 38, 255, 0.1);
  opacity: 0;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.modal-overlay.active .modal-content {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.modal-content::-webkit-scrollbar { width: 5px; }
.modal-content::-webkit-scrollbar-track { background: transparent; }
.modal-content::-webkit-scrollbar-thumb { background: var(--neon-purple); border-radius: 3px; }

.modal-close {
  position: sticky;
  top: 0.75rem;
  float: right;
  margin: 0.75rem 0.75rem 0 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(176, 38, 255, 0.3);
  color: var(--text-primary);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: none;
  z-index: 20;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
}

.modal-close:hover {
  background: var(--neon-pink);
  border-color: var(--neon-pink);
  box-shadow: 0 0 20px rgba(255, 45, 120, 0.6);
  transform: scale(1.1) rotate(90deg);
  color: #fff;
}

.modal-banner {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  border-radius: 16px 16px 0 0;
  filter: saturate(1.3) contrast(1.1);
}

.modal-inner {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 2rem 2rem;
  margin-top: -60px;
  position: relative;
  z-index: 5;
}

.modal-poster-col { flex-shrink: 0; width: 180px; }

.modal-poster {
  width: 180px;
  height: 260px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid rgba(176, 38, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(176, 38, 255, 0.2);
  filter: saturate(1.2) contrast(1.05);
}

.modal-info-col { flex: 1; min-width: 0; padding-top: 60px; }

.modal-title {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 10px var(--neon-purple), 0 0 30px rgba(176, 38, 255, 0.4);
  line-height: 1.3;
}

.modal-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.modal-badge {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.3rem 0.85rem;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  white-space: nowrap;
}

.modal-badge.score { color: var(--neon-green); background: rgba(0, 255, 157, 0.1); border: 1px solid rgba(0, 255, 157, 0.25); }
.modal-badge.episodes { color: var(--neon-blue); background: rgba(0, 212, 255, 0.1); border: 1px solid rgba(0, 212, 255, 0.25); }
.modal-badge.status { color: var(--neon-purple); background: rgba(176, 38, 255, 0.1); border: 1px solid rgba(176, 38, 255, 0.25); }
.modal-badge.year { color: var(--neon-pink); background: rgba(255, 45, 120, 0.1); border: 1px solid rgba(255, 45, 120, 0.25); }
.modal-badge.metacritic-high { color: var(--neon-green); background: rgba(0, 255, 157, 0.1); border: 1px solid rgba(0, 255, 157, 0.25); }
.modal-badge.metacritic-mid { color: #ffd700; background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.25); }

.modal-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.modal-genre-tag {
  font-size: 0.7rem;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  color: var(--neon-purple);
  background: rgba(176, 38, 255, 0.08);
  padding: 0.2rem 0.65rem;
  border-radius: 12px;
  border: 1px solid rgba(176, 38, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.modal-synopsis {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.modal-synopsis::-webkit-scrollbar { width: 3px; }
.modal-synopsis::-webkit-scrollbar-thumb { background: rgba(176, 38, 255, 0.3); border-radius: 2px; }

.modal-trailer-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.8rem;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: var(--neon-purple);
  border: none;
  border-radius: 12px;
  cursor: none;
  text-decoration: none;
  box-shadow: 0 0 20px rgba(176, 38, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-trailer-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 0 30px rgba(176, 38, 255, 0.6), 0 0 60px rgba(176, 38, 255, 0.2);
  color: #fff;
}

@media (max-width: 700px) {
  .modal-inner { flex-direction: column; align-items: center; padding: 1rem 1.25rem 1.5rem; margin-top: -40px; }
  .modal-poster-col { width: 140px; }
  .modal-poster { width: 140px; height: 200px; }
  .modal-info-col { padding-top: 0; width: 100%; }
  .modal-title { font-size: 1.2rem; text-align: center; }
  .modal-badges { justify-content: center; }
  .modal-genres { justify-content: center; }
  .modal-banner { height: 200px; }
  .modal-close { cursor: pointer; }
  .modal-trailer-btn { cursor: pointer; width: 100%; justify-content: center; }
}

/* ── Search Overlay ── */
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 9500;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s var(--transition);
}

.search-overlay.active { opacity: 1; visibility: visible; }

.search-container {
  width: 90%;
  max-width: 600px;
  transform: translateY(-20px);
  transition: transform 0.4s var(--transition);
}

.search-overlay.active .search-container { transform: translateY(0); }

.search-input-wrap { position: relative; }

.search-input-wrap input {
  width: 100%;
  padding: 1.2rem 1.5rem 1.2rem 3.5rem;
  background: var(--bg-secondary);
  border: 2px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input-wrap input:focus {
  border-color: var(--neon-purple);
  box-shadow: 0 0 30px rgba(176, 38, 255, 0.2);
}

.search-input-wrap .search-icon-input {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-dim);
  font-size: 1.2rem;
}

.search-results {
  margin-top: 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  max-height: 400px;
  overflow-y: auto;
  display: none;
}

.search-results.has-results { display: block; }

.search-result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  cursor: none;
  transition: background 0.2s;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.search-result-item:hover, .search-result-item.selected { background: rgba(176, 38, 255, 0.1); }

.search-result-item img { width: 40px; height: 55px; object-fit: cover; border-radius: 6px; }

.search-result-info { flex: 1; }

.search-result-info .title {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.search-result-info .score { font-size: 0.8rem; color: var(--neon-green); }

/* ── Easter Egg ── */
.easter-egg-overlay {
  position: fixed;
  inset: 0;
  z-index: 99998;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.easter-egg-overlay.active {
  opacity: 1;
  animation: neonFlash 0.5s ease-out;
}

.easter-egg-text {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 900;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 20px var(--neon-purple), 0 0 40px var(--neon-blue), 0 0 80px var(--neon-pink);
}

@keyframes neonFlash {
  0% { background: rgba(176, 38, 255, 0.8); }
  25% { background: rgba(0, 212, 255, 0.6); }
  50% { background: rgba(255, 45, 120, 0.6); }
  75% { background: rgba(0, 255, 157, 0.4); }
  100% { background: transparent; }
}

/* ── Footer ── */
.footer {
  background: #020208;
  border-top: 1px solid rgba(176, 38, 255, 0.15);
  padding: 4rem 0 2rem;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--neon-purple), var(--neon-blue), var(--neon-pink), transparent);
  animation: gradientSlide 3s linear infinite;
  background-size: 200% 100%;
}

@keyframes gradientSlide {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand .logo {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--neon-purple);
  text-shadow: 0 0 15px var(--neon-purple);
  margin-bottom: 0.75rem;
}

.footer-brand p { font-size: 0.85rem; color: var(--text-dim); max-width: 280px; }

.footer-links h4, .footer-social h4, .footer-newsletter h4 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-links ul { list-style: none; }
.footer-links li { margin-bottom: 0.5rem; }
.footer-links a { color: var(--text-dim); font-size: 0.9rem; transition: all 0.3s; }
.footer-links a:hover { color: var(--neon-blue); padding-left: 0.5rem; }

.social-icons { display: flex; gap: 0.75rem; }

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--text-dim);
  transition: all 0.3s;
  cursor: none;
}

.social-icon:hover { transform: translateY(-3px); }
.social-icon.discord:hover { background: #5865F2; border-color: #5865F2; color: #fff; box-shadow: 0 0 20px rgba(88, 101, 242, 0.5); }
.social-icon.twitter:hover { background: #1DA1F2; border-color: #1DA1F2; color: #fff; box-shadow: 0 0 20px rgba(29, 161, 242, 0.5); }
.social-icon.youtube:hover { background: #FF0000; border-color: #FF0000; color: #fff; box-shadow: 0 0 20px rgba(255, 0, 0, 0.5); }
.social-icon.reddit:hover { background: #FF4500; border-color: #FF4500; color: #fff; box-shadow: 0 0 20px rgba(255, 69, 0, 0.5); }

.newsletter-form { display: flex; gap: 0.5rem; }

.newsletter-form input {
  flex: 1;
  padding: 0.7rem 1rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.3s;
}

.newsletter-form input::placeholder { color: var(--text-dim); }
.newsletter-form input:focus { border-color: var(--neon-purple); box-shadow: 0 0 15px rgba(176, 38, 255, 0.2); }

.newsletter-form button {
  padding: 0.7rem 1.2rem;
  background: var(--neon-purple);
  border: none;
  border-radius: var(--radius);
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  cursor: none;
  transition: all 0.3s;
}

.newsletter-form button:hover { box-shadow: 0 0 20px rgba(176, 38, 255, 0.5); }

.footer-bottom { text-align: center; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.05); }
.footer-bottom p { font-size: 0.8rem; color: var(--text-dim); }

/* ── Responsive ── */
@media (max-width: 768px) {
  body { cursor: auto; }
  .btn { cursor: pointer; }
  .social-icon { cursor: pointer; }
  .search-result-item { cursor: pointer; }
  .newsletter-form button { cursor: pointer; }
  .anime-card, .game-card { cursor: pointer; }

  .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
  .newsletter-form { flex-direction: column; }

  .card-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .anime-card { width: 100%; }
  .game-card { width: 100%; height: 200px; }
}
