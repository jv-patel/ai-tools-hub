/* ==========================================================================
   filter.js — tool/category card rendering, plus filter + sort state
   used by explore.html, top-rated.html, new-tools.html, favorites.html
   and the homepage's featured/trending rails.
   ========================================================================== */

const Icons = {
  star: '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7L12 17.6 5.7 20.9l1.7-7L2 9.2l7.1-.6z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6c-1.9-1.9-5-1.9-6.9 0L12 5.5l-1.9-1.9c-1.9-1.9-5-1.9-6.9 0-1.9 1.9-1.9 5 0 6.9L12 19.1l8.8-8.6c1.9-1.9 1.9-5 0-6.9z"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 5h5v5M19 5l-9 9M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
  empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>'
};

const CategoryIcons = {
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
  image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  video:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="M17 10l5-3v10l-5-3"/></svg>',
  code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6L2 12l6 6M16 6l6 6-6 6"/></svg>',
  pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg>',
  megaphone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l18-7v16l-18-7z"/><path d="M7 13v5a2 2 0 0 0 4 0v-3"/></svg>',
  'pen-tool':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 15c1-2 2-3 3-3s2 1 3 3"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/></svg>',
  music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  briefcase:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  coin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>'
};

function pricingBadgeClass(p){
  return p === 'Free' ? 'badge-free' : p === 'Paid' ? 'badge-paid' : 'badge-freemium';
}

/* Renders one tool card. `reveal` adds scroll-reveal animation class. */
function renderToolCard(tool, reveal = true){
  const isFav = Favorites.isFavorite(tool.id);
  return `
  <article class="tool-card hover-lift tilt${reveal ? ' reveal' : ''}" data-id="${tool.id}">
    <div class="tool-top">
      <div class="tool-logo">${tool.logo}</div>
      <div style="flex:1; min-width:0;">
        <div class="tool-name-row">
          <span class="tool-name">${tool.name}</span>
          <button class="fav-btn${isFav ? ' active' : ''}" data-fav-id="${tool.id}" aria-label="Toggle favorite" title="Save to favorites">${Icons.heart}</button>
        </div>
        <span class="tool-cat">${getCategoryName(tool.category)}</span>
      </div>
    </div>
    <p class="tool-desc">${tool.desc}</p>
    <div class="tool-meta-row">
      <span class="badge ${pricingBadgeClass(tool.pricing)}">${tool.pricing}</span>
      <span class="rating">${Icons.star} ${tool.rating.toFixed(1)}</span>
    </div>
    <div class="tag-row">
      ${tool.tags.slice(0,3).map(t => `<span class="tag-chip">#${t}</span>`).join('')}
    </div>
    <div class="tool-actions">
      <a class="btn btn-ghost btn-sm" href="tool-details.html?id=${tool.id}">Details</a>
      <a class="btn btn-primary btn-sm ripple-btn" href="${tool.site}" target="_blank" rel="noopener">Visit ${Icons.external}</a>
    </div>
  </article>`;
}

function renderCategoryCard(cat){
  const icon = CategoryIcons[cat.icon] || CategoryIcons.bolt;
  return `
  <a class="category-card hover-lift reveal" href="explore.html?category=${cat.id}">
    <div class="cat-icon">${icon}</div>
    <h3>${cat.name}</h3>
    <span>${getToolCount(cat.id)} tools</span>
  </a>`;
}

function bindFavButtons(container){
  container.querySelectorAll('[data-fav-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = parseInt(btn.dataset.favId, 10);
      const nowFav = Favorites.toggle(id);
      btn.classList.toggle('active', nowFav);
      Toast.show(nowFav ? 'Added to favorites' : 'Removed from favorites', nowFav ? 'success' : 'info');
      if(document.body.dataset.page === 'favorites' && !nowFav){
        btn.closest('.tool-card')?.remove();
        FilterPage?.refreshEmptyState?.();
      }
    });
  });
}

/* ---- Reusable filter/sort/paginate controller for grid pages ---- */
const FilterPage = {
  state: { query: '', category: 'all', pricing: 'all', sort: 'popular', page: 1 },
  perPage: 12,
  sourceTools: [],
  gridEl: null,
  countEl: null,
  emptyEl: null,
  paginationEl: null,

  init(sourceTools, opts = {}){
    this.sourceTools = sourceTools;
    this.gridEl = document.querySelector(opts.gridSelector || '.tool-grid');
    this.countEl = document.querySelector('.results-count');
    this.emptyEl = document.querySelector('.empty-state');
    this.paginationEl = document.querySelector('.pagination');
    this.perPage = opts.perPage || 12;
    if(opts.defaultSort) this.state.sort = opts.defaultSort;

    // Pick up ?category= or ?q= from URL (used by category cards / hero search)
    const params = new URLSearchParams(location.search);
    if(params.get('category')) this.state.category = params.get('category');
    if(params.get('q')) this.state.query = params.get('q');

    this.bindControls();
    this.render();
  },

  bindControls(){
    const searchInput = document.querySelector('[data-role="grid-search"]');
    if(searchInput){
      searchInput.value = this.state.query;
      searchInput.addEventListener('input', () => {
        this.state.query = searchInput.value.trim().toLowerCase();
        this.state.page = 1;
        this.render();
      });
    }

    document.querySelectorAll('[data-category-chip]').forEach(chip => {
      if(chip.dataset.categoryChip === this.state.category) chip.classList.add('active');
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-category-chip]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.state.category = chip.dataset.categoryChip;
        this.state.page = 1;
        this.render();
      });
    });

    document.querySelectorAll('[data-pricing-chip]').forEach(chip => {
      if(chip.dataset.pricingChip === this.state.pricing) chip.classList.add('active');
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-pricing-chip]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.state.pricing = chip.dataset.pricingChip;
        this.state.page = 1;
        this.render();
      });
    });

    const sortSelect = document.querySelector('[data-role="sort-select"]');
    if(sortSelect){
      sortSelect.value = this.state.sort;
      sortSelect.addEventListener('change', () => {
        this.state.sort = sortSelect.value;
        this.render();
      });
    }

    const categorySelect = document.querySelector('[data-role="category-select"]');
    if(categorySelect){
      categorySelect.value = this.state.category;
      categorySelect.addEventListener('change', () => {
        this.state.category = categorySelect.value;
        this.state.page = 1;
        this.render();
      });
    }
  },

  /* Very light stemmer so "generator" matches "generation", "clone" matches
     "cloning", etc. Not linguistically perfect — just enough to stop
     obviously-related words from missing each other. */
  stem(w){
    return w.toLowerCase().replace(/(ations|ative|ators|ation|ision|ions|ers|ing|ion|ors|er|es|or|s)$/, '');
  },

  wordsMatch(a, b){
    const sa = this.stem(a), sb = this.stem(b);
    if(sa.length < 2 || sb.length < 2) return a === b;
    return sa === sb || sa.startsWith(sb) || sb.startsWith(sa);
  },

  /* All searchable words for a tool: name, category, tags, description */
  searchWords(tool){
    if(!tool.__searchWords){
      const text = [tool.name, getCategoryName(tool.category), tool.tags.join(' '), tool.desc].join(' ').toLowerCase();
      tool.__searchWords = text.split(/[^a-z0-9]+/).filter(Boolean);
    }
    return tool.__searchWords;
  },

  getFiltered(){
    let list = this.sourceTools.slice();
    const { query, category, pricing } = this.state;

    if(category && category !== 'all') list = list.filter(t => t.category === category);
    if(pricing && pricing !== 'all') list = list.filter(t => t.pricing === pricing);
    if(query){
      // Match token-by-token (every word you typed has to match *something*),
      // instead of requiring the whole typed phrase to appear verbatim.
      const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
      list = list.filter(t => {
        const words = this.searchWords(t);
        return tokens.every(tok => words.some(w => this.wordsMatch(tok, w)));
      });
    }

    switch(this.state.sort){
      case 'rating': list.sort((a,b) => b.rating - a.rating); break;
      case 'newest': list.sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break;
      case 'name': list.sort((a,b) => a.name.localeCompare(b.name)); break;
      default: list.sort((a,b) => b.popularity - a.popularity);
    }
    return list;
  },

  render(){
    const filtered = this.getFiltered();
    const totalPages = Math.max(1, Math.ceil(filtered.length / this.perPage));
    this.state.page = Math.min(this.state.page, totalPages);
    const start = (this.state.page - 1) * this.perPage;
    const pageItems = filtered.slice(start, start + this.perPage);

    if(this.countEl){
      this.countEl.textContent = `${filtered.length} tool${filtered.length !== 1 ? 's' : ''} found`;
    }

    if(this.gridEl){
      if(pageItems.length === 0){
        this.gridEl.innerHTML = '';
        if(this.emptyEl) this.emptyEl.style.display = 'block';
      }else{
        if(this.emptyEl) this.emptyEl.style.display = 'none';
        this.gridEl.innerHTML = pageItems.map(t => renderToolCard(t)).join('');
        bindFavButtons(this.gridEl);
        Anim.scrollReveal();
        Anim.tiltCards();
      }
    }

    this.renderPagination(totalPages);
  },

  renderPagination(totalPages){
    if(!this.paginationEl) return;
    if(totalPages <= 1){ this.paginationEl.innerHTML = ''; return; }
    let html = '';
    for(let i = 1; i <= totalPages; i++){
      html += `<button class="page-btn${i === this.state.page ? ' active' : ''}" data-page="${i}">${i}</button>`;
    }
    this.paginationEl.innerHTML = html;
    this.paginationEl.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.page = parseInt(btn.dataset.page, 10);
        this.render();
        this.gridEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  },

  refreshEmptyState(){
    if(this.gridEl && this.gridEl.children.length === 0 && this.emptyEl){
      this.emptyEl.style.display = 'block';
    }
  }
};
