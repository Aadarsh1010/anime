/* ═══════════════════════════════════════════════════
   NEONVERSE — API + Card Renderer
   Fetches data, renders to DOM, fallback guaranteed
   ═══════════════════════════════════════════════════ */

const CACHE_DURATION = 3600000;

function getCache(key) {
  try {
    const data = localStorage.getItem(key);
    const time = localStorage.getItem(key + '_t');
    if (data && time && Date.now() - parseInt(time) < CACHE_DURATION) {
      return JSON.parse(data);
    }
  } catch(e) {}
  return null;
}

function setCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(key + '_t', Date.now().toString());
  } catch(e) {}
}

function showSkeletons(container, count) {
  container.innerHTML = Array(count).fill(
    '<div class="skeleton-card"><div class="skeleton-shimmer"></div></div>'
  ).join('');
}

/* ═══════════════════════════════════════════════════
   ANIME CARD HTML
   ═══════════════════════════════════════════════════ */
function createAnimeCard(anime, index) {
  const img = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url
    || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400';
  const score = anime.score || 'N/A';
  const title = (anime.title || 'Unknown').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  const genres = (anime.genres || []).slice(0, 3)
    .map(g => `<span class="genre-tag">${g.name}</span>`).join('');
  const episodes = anime.episodes || '?';
  const status = anime.status || 'Unknown';
  const year = anime.year || '';
  const synopsis = (anime.synopsis || 'No synopsis available.')
    .replace(/'/g, "\\'").replace(/"/g, '&quot;').substring(0, 500);
  const genreList = (anime.genres || []).map(g => g.name).join(', ');

  return `
    <div class="anime-card" onclick='openAnimeModal(${JSON.stringify({
      title: anime.title || 'Unknown',
      image: img,
      score: String(score),
      episodes: String(episodes),
      status: status,
      year: String(year),
      genres: genreList,
      synopsis: synopsis
    })})'>
      <div class="card-rank">#${index + 1}</div>
      <div class="card-score">⭐ ${score}</div>
      <img src="${img}" alt="${title}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400'">
      <div class="card-overlay">
        <div class="card-title">${title}</div>
        <div class="card-genres">${genres}</div>
        <button class="view-btn">VIEW DETAILS →</button>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════════════
   GAME CARD HTML
   ═══════════════════════════════════════════════════ */
function createGameCard(game) {
  const img = game.background_image
    || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600';
  const score = game.metacritic || 'N/A';
  const name = (game.name || 'Unknown').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  const genre = (game.genres || [{}])[0]?.name || 'Game';
  const scoreClass = typeof score === 'number' && score >= 90 ? 'score-green' : 'score-yellow';
  const released = game.released || '';
  const rating = game.rating ? game.rating + '/5' : '';
  const description = (game.description_raw || game.description || 'No description available.')
    .replace(/'/g, "\\'").replace(/"/g, '&quot;').substring(0, 500);

  return `
    <div class="game-card" onclick='openGameModal(${JSON.stringify({
      name: game.name || 'Unknown',
      image: img,
      score: String(score),
      scoreClass: scoreClass,
      released: released,
      rating: rating,
      genre: genre,
      description: description
    })})'>
      <div class="card-score ${scoreClass}">${score}</div>
      <img src="${img}" alt="${name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600'">
      <div class="card-overlay">
        <div class="card-title">${name}</div>
        <div class="card-genres">
          <span class="genre-tag">${genre}</span>
        </div>
        <button class="view-btn">VIEW DETAILS →</button>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════════════
   FALLBACK DATA — Always works
   ═══════════════════════════════════════════════════ */
function getFallbackAnime() {
  return [
    {title:"Sousou no Frieren",score:9.27,episodes:28,status:"Finished Airing",year:2023,genres:[{name:"Adventure"},{name:"Drama"}],images:{jpg:{large_image_url:"https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400"}},synopsis:"After the party of heroes defeated the Demon King, the elf mage Frieren embarks on a new journey."},
    {title:"Fullmetal Alchemist: Brotherhood",score:9.10,episodes:64,status:"Finished Airing",year:2009,genres:[{name:"Action"},{name:"Adventure"}],images:{jpg:{large_image_url:"https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400"}},synopsis:"Two brothers search for the Philosopher's Stone after a failed alchemical ritual."},
    {title:"Steins;Gate",score:9.07,episodes:24,status:"Finished Airing",year:2011,genres:[{name:"Sci-Fi"},{name:"Thriller"}],images:{jpg:{large_image_url:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400"}},synopsis:"A self-proclaimed mad scientist discovers time travel and must prevent a dystopian future."},
    {title:"Hunter x Hunter (2011)",score:9.04,episodes:148,status:"Finished Airing",year:2011,genres:[{name:"Action"},{name:"Adventure"}],images:{jpg:{large_image_url:"https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400"}},synopsis:"Gon Freecss searches for his missing father, a legendary Hunter."},
    {title:"Chainsaw Man",score:8.57,episodes:12,status:"Finished Airing",year:2022,genres:[{name:"Action"},{name:"Fantasy"}],images:{jpg:{large_image_url:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400"}},synopsis:"Denji, a teenage boy, becomes a devil hunter to pay off his dead father's debt."},
    {title:"Attack on Titan",score:9.00,episodes:87,status:"Finished Airing",year:2013,genres:[{name:"Action"},{name:"Drama"}],images:{jpg:{large_image_url:"https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?w=400"}},synopsis:"Humanity lives inside walls to protect themselves from Titans."}
  ];
}

function getFallbackGames() {
  return [
    {name:"Elden Ring",metacritic:96,genres:[{name:"RPG"}],background_image:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600"},
    {name:"God of War",metacritic:94,genres:[{name:"Action"}],background_image:"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600"},
    {name:"Cyberpunk 2077",metacritic:90,genres:[{name:"RPG"}],background_image:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600"},
    {name:"Red Dead Redemption 2",metacritic:97,genres:[{name:"Adventure"}],background_image:"https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600"},
    {name:"The Witcher 3: Wild Hunt",metacritic:95,genres:[{name:"RPG"}],background_image:"https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600"},
    {name:"Hades",metacritic:93,genres:[{name:"Roguelike"}],background_image:"https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600"}
  ];
}

/* ═══════════════════════════════════════════════════
   FETCH + RENDER ANIME
   ═══════════════════════════════════════════════════ */
async function fetchAndRenderAnime(containerId, limit = 12) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('Container not found:', containerId);
    return;
  }

  showSkeletons(container, Math.min(limit, 6));

  try {
    const cacheKey = 'jikan_top_' + limit;
    let data = getCache(cacheKey);

    if (!data) {
      const res = await fetch(
        'https://api.jikan.moe/v4/top/anime?limit=' + limit,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error('API failed: ' + res.status);
      const json = await res.json();
      data = json.data;
      if (data && data.length > 0) setCache(cacheKey, data);
    }

    if (!data || data.length === 0) throw new Error('No data returned');
    container.innerHTML = data.map((a, i) => createAnimeCard(a, i)).join('');
    console.log('\u2705 Rendered ' + data.length + ' anime cards in #' + containerId);

  } catch (err) {
    console.warn('Using fallback anime:', err.message);
    const fallback = getFallbackAnime();
    container.innerHTML = fallback.map((a, i) => createAnimeCard(a, i)).join('');
  }
}

/* ═══════════════════════════════════════════════════
   FETCH + RENDER GAMES
   ═══════════════════════════════════════════════════ */
async function fetchAndRenderGames(containerId, limit = 12) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('Container not found:', containerId);
    return;
  }

  showSkeletons(container, Math.min(limit, 6));

  try {
    const cacheKey = 'rawg_top_' + limit;
    let data = getCache(cacheKey);

    if (!data) {
      const res = await fetch(
        'https://api.rawg.io/api/games?ordering=-rating&page_size=' + limit,
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error('API failed: ' + res.status);
      const json = await res.json();
      data = json.results;
      if (data && data.length > 0 && data[0].background_image) {
        setCache(cacheKey, data);
      }
    }

    if (!data || data.length === 0) throw new Error('No data returned');
    container.innerHTML = data.map(g => createGameCard(g)).join('');
    console.log('\u2705 Rendered ' + data.length + ' game cards in #' + containerId);

  } catch (err) {
    console.warn('Using fallback games:', err.message);
    container.innerHTML = getFallbackGames().map(g => createGameCard(g)).join('');
  }
}

/* ═══════════════════════════════════════════════════
   FETCH SEASONAL ANIME
   ═══════════════════════════════════════════════════ */
async function fetchSeasonalAnime() {
  const container = document.getElementById('seasonal-grid-container');
  if (!container) return;

  showSkeletons(container, 8);

  try {
    const cacheKey = 'jikan_seasonal';
    let data = getCache(cacheKey);

    if (!data) {
      const res = await fetch(
        'https://api.jikan.moe/v4/seasons/now?limit=18',
        { signal: AbortSignal.timeout(8000) }
      );
      if (!res.ok) throw new Error('API failed');
      const json = await res.json();
      data = json.data;
      if (data && data.length > 0) setCache(cacheKey, data);
    }

    if (!data || data.length === 0) throw new Error('No data');
    container.innerHTML = data.map((a, i) => createAnimeCard(a, i)).join('');
    console.log('\u2705 Rendered ' + data.length + ' seasonal anime cards');

  } catch (err) {
    console.warn('Using fallback seasonal:', err.message);
    container.innerHTML = getFallbackAnime().map((a, i) => createAnimeCard(a, i)).join('');
  }
}

/* ═══════════════════════════════════════════════════
   HOT LISTS — For community page
   ═══════════════════════════════════════════════════ */
async function loadHotAnimeList() {
  const list = document.getElementById('hot-anime-list');
  if (!list) return;
  try {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=5', { signal: AbortSignal.timeout(5000) });
    const json = await res.json();
    if (json.data && json.data.length > 0) {
      list.innerHTML = json.data.map(a =>
        '<li><span class="hot-name">' + a.title + '</span><span class="hot-score">' + (a.score ? '\u2B50 ' + a.score : 'N/A') + '</span></li>'
      ).join('');
      return;
    }
    throw new Error('No data');
  } catch {
    list.innerHTML = getFallbackAnime().slice(0, 5).map(a =>
      '<li><span class="hot-name">' + a.title + '</span><span class="hot-score">\u2B50 ' + a.score + '</span></li>'
    ).join('');
  }
}

async function loadHotGamesList() {
  const list = document.getElementById('hot-games-list');
  if (!list) return;
  try {
    const res = await fetch('https://api.rawg.io/api/games?ordering=-rating&page_size=5', { signal: AbortSignal.timeout(5000) });
    const json = await res.json();
    if (json.results && json.results[0]?.background_image) {
      list.innerHTML = json.results.map(g =>
        '<li><span class="hot-name">' + g.name + '</span><span class="hot-score">' + (g.metacritic ? '\uD83D\uDCCA ' + g.metacritic : 'N/A') + '</span></li>'
      ).join('');
      return;
    }
    throw new Error('No data');
  } catch {
    list.innerHTML = getFallbackGames().slice(0, 5).map(g =>
      '<li><span class="hot-name">' + g.name + '</span><span class="hot-score">\uD83D\uDCCA ' + g.metacritic + '</span></li>'
    ).join('');
  }
}

/* ═══════════════════════════════════════════════════
   MODAL FUNCTIONS — Global, called from card onclick
   ═══════════════════════════════════════════════════ */
function openAnimeModal(data) {
  const modal = document.getElementById('neonverse-modal');
  const slot = document.getElementById('neonverse-modal-slot');
  if (!modal || !slot) return;

  const genreTags = (data.genres || '').split(',').filter(Boolean).map(g =>
    '<span class="modal-genre-tag">' + g.trim() + '</span>'
  ).join('');

  slot.innerHTML = `
    <img class="modal-banner" src="${data.image}" alt="${data.title}"
         onerror="this.src='https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200'" />
    <div class="modal-inner">
      <div class="modal-poster-col">
        <img class="modal-poster" src="${data.image}" alt="${data.title}"
             onerror="this.style.display='none'" />
      </div>
      <div class="modal-info-col">
        <h2 class="modal-title">${data.title}</h2>
        <div class="modal-badges">
          ${data.score !== 'N/A' ? '<span class="modal-badge score">\u2B50 ' + data.score + '</span>' : ''}
          ${data.episodes !== '?' ? '<span class="modal-badge episodes">\uD83D\uDCFA ' + data.episodes + ' EP</span>' : ''}
          <span class="modal-badge status">\uD83D\uDCE1 ' + data.status + '</span>
          ${data.year ? '<span class="modal-badge year">\uD83D\uDCC5 ' + data.year + '</span>' : ''}
        </div>
        <div class="modal-genres">${genreTags}</div>
        <div class="modal-synopsis">${data.synopsis}</div>
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(data.title + ' anime trailer')}"
           target="_blank" rel="noopener" class="modal-trailer-btn">
          <span class="play-icon">\u25B6</span> Watch Trailer
        </a>
      </div>
    </div>`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openGameModal(data) {
  const modal = document.getElementById('neonverse-modal');
  const slot = document.getElementById('neonverse-modal-slot');
  if (!modal || !slot) return;

  const scoreColor = data.scoreClass === 'score-green' ? 'var(--neon-green)' : '#ffd700';

  slot.innerHTML = `
    <img class="modal-banner" src="${data.image}" alt="${data.name}"
         onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200'" />
    <div class="modal-inner">
      <div class="modal-poster-col">
        <div style="width:180px;height:260px;border-radius:12px;background:linear-gradient(135deg,rgba(176,38,255,0.15),rgba(0,212,255,0.1));border:2px solid rgba(176,38,255,0.3);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(0,0,0,0.6);">
          <div style="font-family:Orbitron,sans-serif;font-size:3.5rem;font-weight:900;color:${scoreColor};text-shadow:0 0 20px currentColor;">${data.score}</div>
          <div style="font-family:Rajdhani,sans-serif;font-weight:700;font-size:0.8rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.15em;margin-top:0.5rem;">Metacritic</div>
        </div>
      </div>
      <div class="modal-info-col">
        <h2 class="modal-title">${data.name}</h2>
        <div class="modal-badges">
          ${data.score !== 'N/A' ? '<span class="modal-badge ' + data.scoreClass.replace('score-', 'metacritic-') + '">\uD83D\uDCCA Metacritic: ' + data.score + '</span>' : ''}
          ${data.rating ? '<span class="modal-badge score">\u2B50 ' + data.rating + '</span>' : ''}
          ${data.released ? '<span class="modal-badge year">\uD83D\uDCC5 ' + data.released + '</span>' : ''}
        </div>
        <div class="modal-genres"><span class="modal-genre-tag">${data.genre}</span></div>
        <div class="modal-synopsis">${data.description}</div>
        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(data.name + ' game trailer')}"
           target="_blank" rel="noopener" class="modal-trailer-btn">
          <span class="play-icon">\u25B6</span> Watch Trailer
        </a>
      </div>
    </div>`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ═══════════════════════════════════════════════════
   INIT MODAL — Create DOM elements on load
   ═══════════════════════════════════════════════════ */
function initModal() {
  if (document.getElementById('neonverse-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'neonverse-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = '<div class="modal-content"><button class="modal-close" onclick="closeModal()">\u2715</button><div id="neonverse-modal-slot"></div></div>';
  document.body.appendChild(modal);

  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById('neonverse-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
