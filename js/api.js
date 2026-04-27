/* ═══════════════════════════════════════════════════
   NEONVERSE — API + RENDER Module
   Fetches data, renders cards, handles fallbacks
   ═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   FALLBACK DATA — Always works, no API needed
   ═══════════════════════════════════════════════════ */
const FALLBACK_ANIME = [
  { title: "Sousou no Frieren", score: 9.27, genre: "Adventure", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400", episodes: 28, status: "Finished Airing", year: 2023, synopsis: "After the party of heroes defeated the Demon King, they each went their separate ways. Frieren the mage embarks on a new journey to understand humanity." },
  { title: "Fullmetal Alchemist: Brotherhood", score: 9.10, genre: "Action", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400", episodes: 64, status: "Finished Airing", year: 2009, synopsis: "Two brothers search for the Philosopher's Stone after a failed alchemical ritual leaves them in damaged bodies." },
  { title: "Steins;Gate", score: 9.07, genre: "Sci-Fi", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400", episodes: 24, status: "Finished Airing", year: 2011, synopsis: "A self-proclaimed mad scientist discovers a method of time travel and must use it to prevent a dystopian future." },
  { title: "Hunter x Hunter", score: 9.04, genre: "Action", img: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400", episodes: 148, status: "Finished Airing", year: 2011, synopsis: "Gon Freecss discovers his father is a legendary Hunter and sets out on a quest to follow in his footsteps." },
  { title: "Attack on Titan", score: 9.00, genre: "Action", img: "https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?w=400", episodes: 87, status: "Finished Airing", year: 2013, synopsis: "In a world where humanity lives inside cities surrounded by walls due to Titans, young Eren Yeager vows to exterminate them." },
  { title: "Chainsaw Man", score: 8.57, genre: "Action", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400", episodes: 12, status: "Finished Airing", year: 2022, synopsis: "Denji, a teenage boy living with a Chainsaw Devil, becomes part of the Public Safety Devil Hunters." },
  { title: "Jujutsu Kaisen", score: 8.62, genre: "Action", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400", episodes: 24, status: "Finished Airing", year: 2020, synopsis: "A boy swallows a cursed talisman and becomes host to a powerful curse, enrolling in a secret school of Jujutsu Sorcerers." },
  { title: "Demon Slayer", score: 8.92, genre: "Action", img: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=400", episodes: 44, status: "Finished Airing", year: 2019, synopsis: "After his family is slaughtered, Tanjiro becomes a demon slayer to avenge his family and cure his sister." },
  { title: "Spy x Family", score: 8.50, genre: "Comedy", img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400", episodes: 25, status: "Finished Airing", year: 2022, synopsis: "A spy must build a fake family to execute a mission, not realizing that the girl he adopts is a telepath." },
  { title: "Mob Psycho 100", score: 8.75, genre: "Action", img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400", episodes: 37, status: "Finished Airing", year: 2016, synopsis: "A psychic middle school boy tries to live a normal life while suppressing his growing powers." },
  { title: "Vinland Saga", score: 8.74, genre: "Adventure", img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400", episodes: 48, status: "Finished Airing", year: 2019, synopsis: "A young Viking seeks revenge against the man who killed his father in this epic historical drama." },
  { title: "One Punch Man", score: 8.52, genre: "Action", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400", episodes: 24, status: "Finished Airing", year: 2015, synopsis: "Saitama is a hero who can defeat any opponent with a single punch, but his overwhelming strength bores him." }
];

const FALLBACK_GAMES = [
  { name: "Elden Ring", score: 96, genre: "RPG", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600", released: "2022-02-25", rating: 4.8, description: "A new fantasy action RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring." },
  { name: "God of War", score: 94, genre: "Action", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600", released: "2018-04-20", rating: 4.7, description: "Kratos lives as a man in the realm of Norse gods and monsters, raising his son Atreus." },
  { name: "Cyberpunk 2077", score: 90, genre: "RPG", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600", released: "2020-12-10", rating: 4.3, description: "An open-world action-adventure RPG set in Night City, a megalopolis obsessed with power and body modification." },
  { name: "Red Dead Redemption 2", score: 97, genre: "Adventure", img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600", released: "2018-10-26", rating: 4.9, description: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run." },
  { name: "The Witcher 3", score: 95, genre: "RPG", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600", released: "2015-05-19", rating: 4.8, description: "As war rages on, you take on the greatest contract of your life — tracking down the Child of Prophecy." },
  { name: "Hades", score: 93, genre: "Roguelike", img: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600", released: "2020-09-17", rating: 4.7, description: "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler." },
  { name: "Dark Souls III", score: 89, genre: "Action RPG", img: "https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?w=600", released: "2016-04-12", rating: 4.6, description: "As fires fade and the world falls into ruin, continue the critically celebrated and genre-defining series." },
  { name: "Sekiro", score: 91, genre: "Action", img: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600", released: "2019-03-22", rating: 4.7, description: "Carve your own clever path to vengeance in an all-new adventure from FromSoftware." },
  { name: "Persona 5 Royal", score: 95, genre: "JRPG", img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600", released: "2020-03-31", rating: 4.8, description: "Don the mask of Joker and join the Phantom Thieves of Hearts. Break free from the chains of modern society." },
  { name: "Celeste", score: 94, genre: "Platformer", img: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600", released: "2018-01-25", rating: 4.7, description: "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain." },
  { name: "Disco Elysium", score: 97, genre: "RPG", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600", released: "2019-10-15", rating: 4.9, description: "A groundbreaking role-playing game with unprecedented freedom of choice." },
  { name: "Hollow Knight", score: 90, genre: "Indie", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600", released: "2017-02-24", rating: 4.6, description: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom." }
];

/* ═══════════════════════════════════════════════════
   ANIME CARD RENDERER
   ═══════════════════════════════════════════════════ */
function renderAnimeCard(anime, index) {
  const title = anime.title || 'Unknown';
  const score = anime.score || 'N/A';
  const img = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || anime.img || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400';
  const genres = (anime.genres || []).slice(0, 3);
  const genreNames = genres.map(g => typeof g === 'string' ? g : g.name);
  const episodes = anime.episodes || '?';
  const status = anime.status || 'Unknown';
  const year = anime.year || '';
  const synopsis = (anime.synopsis || 'No synopsis available.').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  const genreStr = genreNames.join(', ');

  return `
    <div class="anime-card" onclick="showAnimeModal('${title.replace(/'/g, "\\'")}', '${img}', '${score}', '${episodes}', '${status}', '${year}', '${genreStr}', '${synopsis}')">
      <div class="card-rank">#${index + 1}</div>
      <div class="card-score">⭐ ${score}</div>
      <img src="${img}" alt="${title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400'">
      <div class="card-overlay">
        <div class="card-title">${title}</div>
        <div class="card-genres">
          ${genreNames.map(g => `<span class="genre-tag">${g}</span>`).join('')}
        </div>
        <button class="view-btn" onclick="event.stopPropagation(); showAnimeModal('${title.replace(/'/g, "\\'")}', '${img}', '${score}', '${episodes}', '${status}', '${year}', '${genreStr}', '${synopsis}')">VIEW DETAILS →</button>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════
   GAME CARD RENDERER
   ═══════════════════════════════════════════════════ */
function renderGameCard(game, index) {
  const name = game.name || 'Unknown';
  const score = game.metacritic || game.score || 'N/A';
  const img = game.background_image || game.img || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600';
  const genre = (game.genres && game.genres[0]?.name) || game.genre || 'Game';
  const released = game.released || '';
  const rating = game.rating || '';
  const description = (game.description_raw || game.description || 'No description available.').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  const scoreClass = typeof score === 'number' && score >= 90 ? 'score-green' : 'score-yellow';

  return `
    <div class="game-card" onclick="showGameModal('${name.replace(/'/g, "\\'")}', '${img}', '${score}', '${scoreClass}', '${released}', '${rating}', '${genre}', '${description}')">
      <div class="card-score ${scoreClass}">${score}</div>
      <img src="${img}" alt="${name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600'">
      <div class="card-overlay">
        <div class="card-title">${name}</div>
        <div class="card-genres"><span class="genre-tag">${genre}</span></div>
        <button class="view-btn" onclick="event.stopPropagation(); showGameModal('${name.replace(/'/g, "\\'")}', '${img}', '${score}', '${scoreClass}', '${released}', '${rating}', '${genre}', '${description}')">VIEW DETAILS →</button>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════
   SKELETON LOADERS
   ═══════════════════════════════════════════════════ */
function renderSkeletons(count) {
  return Array(count).fill('<div class="card-skeleton"><div class="skeleton-shimmer"></div></div>').join('');
}

/* ═══════════════════════════════════════════════════
   FETCH + RENDER ANIME — Full pipeline
   ═══════════════════════════════════════════════════ */
async function fetchAndRenderAnime(containerId, limit = 12) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Show skeletons
  container.innerHTML = renderSkeletons(limit);

  // Check cache
  const cacheKey = 'nv_anime_' + limit;
  const cacheTime = localStorage.getItem(cacheKey + '_t');
  const cached = localStorage.getItem(cacheKey);

  if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 3600000) {
    try {
      const data = JSON.parse(cached);
      container.innerHTML = data.map((a, i) => renderAnimeCard(a, i)).join('');
      attachAnimeClickHandlers(container, data);
      return;
    } catch { /* cache corrupt, continue to fetch */ }
  }

  // Fetch from Jikan
  try {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=' + limit);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const data = json.data;

    if (!data || data.length === 0) throw new Error('No data');

    // Cache it
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheKey + '_t', String(Date.now()));

    container.innerHTML = data.map((a, i) => renderAnimeCard(a, i)).join('');
    attachAnimeClickHandlers(container, data);

  } catch (err) {
    console.warn('[NEONVERSE] Anime API failed, using fallback:', err.message);
    const data = FALLBACK_ANIME.slice(0, limit);
    container.innerHTML = data.map((a, i) => renderAnimeCard(a, i)).join('');
    attachAnimeClickHandlers(container, data);
  }
}

/* ═══════════════════════════════════════════════════
   FETCH + RENDER GAMES — Full pipeline
   ═══════════════════════════════════════════════════ */
async function fetchAndRenderGames(containerId, limit = 12) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Show skeletons
  container.innerHTML = renderSkeletons(limit);

  // Check cache
  const cacheKey = 'nv_games_' + limit;
  const cacheTime = localStorage.getItem(cacheKey + '_t');
  const cached = localStorage.getItem(cacheKey);

  if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 3600000) {
    try {
      const data = JSON.parse(cached);
      container.innerHTML = data.map((g, i) => renderGameCard(g, i)).join('');
      attachGameClickHandlers(container, data);
      return;
    } catch { /* cache corrupt */ }
  }

  // Fetch from RAWG
  try {
    const res = await fetch('https://api.rawg.io/api/games?ordering=-rating&page_size=' + limit);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const data = json.results;

    if (!data || data.length === 0 || !data[0].background_image) throw new Error('No data or images');

    // Cache it
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheKey + '_t', String(Date.now()));

    container.innerHTML = data.map((g, i) => renderGameCard(g, i)).join('');
    attachGameClickHandlers(container, data);

  } catch (err) {
    console.warn('[NEONVERSE] Games API failed, using fallback:', err.message);
    const data = FALLBACK_GAMES.slice(0, limit);
    container.innerHTML = data.map((g, i) => renderGameCard(g, i)).join('');
    attachGameClickHandlers(container, data);
  }
}

/* ═══════════════════════════════════════════════════
   CLICK HANDLERS — Connect cards to modal
   ═══════════════════════════════════════════════════ */
function attachAnimeClickHandlers(container, data) {
  const cards = container.querySelectorAll('.anime-card');
  cards.forEach((card, i) => {
    card.style.cursor = 'pointer';
  });
}

function attachGameClickHandlers(container, data) {
  const cards = container.querySelectorAll('.game-card');
  cards.forEach((card, i) => {
    card.style.cursor = 'pointer';
  });
}

/* ═══════════════════════════════════════════════════
   MODAL FUNCTIONS — Called from card onclick
   ═══════════════════════════════════════════════════ */
function showAnimeModal(title, img, score, episodes, status, year, genres, synopsis) {
  if (typeof Modal !== 'undefined' && Modal.open) {
    const genreTags = genres.split(',').filter(Boolean).map(g =>
      `<span class="modal-genre-tag">${g.trim()}</span>`
    ).join('');

    Modal.open(`
      <img class="modal-banner" src="${img}" alt="${title}" onerror="this.src='https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200'" />
      <div class="modal-inner">
        <div class="modal-poster-col">
          <img class="modal-poster" src="${img}" alt="${title}" onerror="this.style.display='none'" />
        </div>
        <div class="modal-info-col">
          <h2 class="modal-title">${title}</h2>
          <div class="modal-badges">
            ${score !== 'N/A' ? `<span class="modal-badge score">⭐ ${score}</span>` : ''}
            ${episodes !== '?' ? `<span class="modal-badge episodes">📺 ${episodes} EP</span>` : ''}
            <span class="modal-badge status">📡 ${status}</span>
            ${year ? `<span class="modal-badge year">📅 ${year}</span>` : ''}
          </div>
          <div class="modal-genres">${genreTags}</div>
          <div class="modal-synopsis">${synopsis}</div>
          <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' anime trailer')}" target="_blank" rel="noopener" class="modal-trailer-btn">
            <span class="play-icon">▶</span> Watch Trailer
          </a>
        </div>
      </div>
    `);
  }
}

function showGameModal(name, img, score, scoreClass, released, rating, genre, description) {
  if (typeof Modal !== 'undefined' && Modal.open) {
    Modal.open(`
      <img class="modal-banner" src="${img}" alt="${name}" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200'" />
      <div class="modal-inner">
        <div class="modal-poster-col">
          <div style="width:180px;height:260px;border-radius:12px;background:linear-gradient(135deg,rgba(176,38,255,0.15),rgba(0,212,255,0.1));border:2px solid rgba(176,38,255,0.3);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(0,0,0,0.6);">
            <div style="font-family:Orbitron,sans-serif;font-size:3.5rem;font-weight:900;color:${scoreClass === 'score-green' ? 'var(--neon-green)' : '#ffd700'};text-shadow:0 0 20px currentColor;">${score}</div>
            <div style="font-family:Rajdhani,sans-serif;font-weight:700;font-size:0.8rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.15em;margin-top:0.5rem;">Metacritic</div>
          </div>
        </div>
        <div class="modal-info-col">
          <h2 class="modal-title">${name}</h2>
          <div class="modal-badges">
            ${score !== 'N/A' ? `<span class="modal-badge ${scoreClass === 'score-green' ? 'metacritic-high' : 'metacritic-mid'}">📊 Metacritic: ${score}</span>` : ''}
            ${rating ? `<span class="modal-badge score">⭐ ${rating}/5</span>` : ''}
            ${released ? `<span class="modal-badge year">📅 ${released}</span>` : ''}
          </div>
          <div class="modal-genres"><span class="modal-genre-tag">${genre}</span></div>
          <div class="modal-synopsis">${description}</div>
          <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' game trailer')}" target="_blank" rel="noopener" class="modal-trailer-btn">
            <span class="play-icon">▶</span> Watch Trailer
          </a>
        </div>
      </div>
    `);
  }
}

/* ═══════════════════════════════════════════════════
   AUTO-INIT — Render cards on DOMContentLoaded
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Homepage
  if (document.getElementById('trending-anime-container')) {
    fetchAndRenderAnime('trending-anime-container', 6);
  }
  if (document.getElementById('top-games-container')) {
    fetchAndRenderGames('top-games-container', 6);
  }

  // Anime page
  if (document.getElementById('anime-grid-container')) {
    fetchAndRenderAnime('anime-grid-container', 24);
  }

  // Games page
  if (document.getElementById('games-grid-container')) {
    fetchAndRenderGames('games-grid-container', 20);
  }

  // Community page — hot lists
  if (document.getElementById('hot-anime-list')) {
    loadHotAnimeList();
  }
  if (document.getElementById('hot-games-list')) {
    loadHotGamesList();
  }
});

/* ═══════════════════════════════════════════════════
   HOT LIST LOADERS — For community page
   ═══════════════════════════════════════════════════ */
async function loadHotAnimeList() {
  const list = document.getElementById('hot-anime-list');
  try {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=5');
    const json = await res.json();
    if (json.data) {
      list.innerHTML = json.data.map(a => `
        <li><span class="hot-name">${a.title}</span><span class="hot-score">${a.score ? '⭐ ' + a.score : 'N/A'}</span></li>
      `).join('');
    }
  } catch {
    list.innerHTML = FALLBACK_ANIME.slice(0, 5).map(a => `
      <li><span class="hot-name">${a.title}</span><span class="hot-score">⭐ ${a.score}</span></li>
    `).join('');
  }
}

async function loadHotGamesList() {
  const list = document.getElementById('hot-games-list');
  try {
    const res = await fetch('https://api.rawg.io/api/games?ordering=-rating&page_size=5');
    const json = await res.json();
    if (json.results && json.results[0]?.background_image) {
      list.innerHTML = json.results.map(g => `
        <li><span class="hot-name">${g.name}</span><span class="hot-score">${g.metacritic ? '📊 ' + g.metacritic : 'N/A'}</span></li>
      `).join('');
    } else throw new Error('No data');
  } catch {
    list.innerHTML = FALLBACK_GAMES.slice(0, 5).map(g => `
      <li><span class="hot-name">${g.name}</span><span class="hot-score">📊 ${g.score}</span></li>
    `).join('');
  }
}
