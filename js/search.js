/* ═══════════════════════════════════════════════════
   NEONVERSE — Search Module
   Debounced search with keyboard navigation
   ═══════════════════════════════════════════════════ */

const Search = (() => {
  let overlay, input, results;
  let debounceTimer = null;
  let selectedIndex = -1;
  let currentResults = [];

  function init() {
    // Create search overlay
    overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-container">
        <div class="search-input-wrap">
          <span class="search-icon-input">🔍</span>
          <input type="text" placeholder="Search anime, games..." autocomplete="off" />
        </div>
        <div class="search-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    input = overlay.querySelector('input');
    results = overlay.querySelector('.search-results');

    // Event: click search icon
    document.querySelectorAll('.navbar-search').forEach(btn => {
      btn.addEventListener('click', open);
    });

    // Event: close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    // Event: input with debounce
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      selectedIndex = -1;
      const query = input.value.trim();
      if (query.length < 2) {
        results.classList.remove('has-results');
        results.innerHTML = '';
        return;
      }
      debounceTimer = setTimeout(() => performSearch(query), 300);
    });

    // Event: keyboard navigation
    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('.search-result-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        updateSelection(items);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        items[selectedIndex].click();
      } else if (e.key === 'Escape') {
        close();
      }
    });

    // Event: ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        close();
      }
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        open();
      }
    });
  }

  function open() {
    overlay.classList.add('active');
    input.value = '';
    input.focus();
    results.classList.remove('has-results');
    results.innerHTML = '';
    selectedIndex = -1;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateSelection(items) {
    items.forEach((item, i) => {
      item.classList.toggle('selected', i === selectedIndex);
    });
    if (selectedIndex >= 0) {
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  async function performSearch(query) {
    try {
      const data = await API.searchAnime(query);
      if (!data || !data.data || data.data.length === 0) {
        results.innerHTML = '<div class="search-result-item"><div class="search-result-info"><div class="title" style="color: var(--text-dim);">No results found</div></div></div>';
        results.classList.add('has-results');
        return;
      }

      currentResults = data.data;
      results.innerHTML = data.data.map((anime, i) => `
        <div class="search-result-item" data-index="${i}">
          <img src="${anime.images?.jpg?.image_url || ''}" alt="${anime.title}" loading="lazy"
               onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100'" />
          <div class="search-result-info">
            <div class="title">${anime.title}</div>
            <div class="score">${anime.score ? `⭐ ${anime.score}` : 'N/A'} ${anime.year ? `• ${anime.year}` : ''}</div>
          </div>
        </div>
      `).join('');

      results.classList.add('has-results');

      // Click handlers
      results.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.dataset.index);
          const anime = currentResults[idx];
          if (anime && anime.mal_id) {
            close();
            // If we have a modal system, open it
            if (typeof Modal !== 'undefined') {
              Modal.showAnime(anime);
            }
          }
        });
      });
    } catch (err) {
      results.innerHTML = '<div class="search-result-item"><div class="search-result-info"><div class="title" style="color: var(--neon-pink);">Search failed — try again</div></div></div>';
      results.classList.add('has-results');
    }
  }

  return { init, open, close };
})();
