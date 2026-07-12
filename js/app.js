/* ==========================================================================
   app.js — page bootstrapping. Reads document.body.dataset.page to decide
   which section(s) of the site need dynamic rendering, then wires up the
   bits shared by every page (footer year, newsletter form, loading screen).
   ========================================================================== */

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/* ---- Loading screen ---- */
function initLoadingScreen(){
  const screen = $('.loading-screen');
  if(!screen) return;
  window.addEventListener('load', () => {
    setTimeout(() => screen.classList.add('hide'), 350);
  });
}

/* ---- Footer year + newsletter validation (present on every page) ---- */
function initFooterYear(){
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}

function initNewsletterForms(){
  $$('.footer-newsletter form, .newsletter-panel form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if(!isValidEmail(input.value)){
        Toast.show('Enter a valid email address', 'error');
        input.focus();
        return;
      }
      Toast.show('Subscribed! Check your inbox to confirm.', 'success');
      form.reset();
    });
  });
}

/* ---- FAQ accordion ---- */
function initFaqAccordion(){
  $$('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });
}

/* ---- Contact form validation ---- */
function initContactForm(){
  const form = $('#contact-form');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fields = {
      name: { el: form.querySelector('#c-name'), test: v => v.trim().length >= 2 },
      email: { el: form.querySelector('#c-email'), test: isValidEmail },
      subject: { el: form.querySelector('#c-subject'), test: v => v.trim().length >= 3 },
      message: { el: form.querySelector('#c-message'), test: v => v.trim().length >= 10 }
    };
    Object.values(fields).forEach(({ el, test }) => {
      const wrap = el.closest('.form-field');
      if(!test(el.value)){ wrap.classList.add('invalid'); valid = false; }
      else wrap.classList.remove('invalid');
    });
    if(!valid){ Toast.show('Please fix the highlighted fields', 'error'); return; }

    $('.form-success')?.classList.add('show');
    Toast.show('Message sent — we\'ll reply within 1 business day.', 'success');
    form.reset();
  });
}

/* ========================================================================
   HOME PAGE
   ======================================================================== */
function renderHome(){
  const catGrid = $('#popular-categories');
  if(catGrid){
    catGrid.innerHTML = CATEGORIES.slice(0, 10).map(renderCategoryCard).join('');
  }

  const featured = TOOLS.filter(t => t.featured).slice(0, 8);
  const trending = TOOLS.filter(t => t.trending).slice(0, 8);
  const recent = TOOLS.slice().sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 8);
  const topRated = TOOLS.slice().sort((a,b) => b.rating - a.rating).slice(0, 8);

  const mount = (sel, list) => {
    const el = $(sel);
    if(el) el.innerHTML = list.map(t => renderToolCard(t)).join('');
  };
  mount('#featured-tools', featured);
  mount('#trending-tools', trending);
  mount('#recent-tools', recent);
  mount('#top-rated-tools', topRated);

  bindFavButtons(document);
}

/* ========================================================================
   EXPLORE / TOP RATED / NEW TOOLS pages use FilterPage directly from
   their own inline <script> init call (each passes a different default
   sort + source list), see the HTML pages.
   ======================================================================== */

/* ========================================================================
   CATEGORIES PAGE
   ======================================================================== */
function renderCategoriesPage(){
  const grid = $('#all-categories');
  if(!grid) return;
  grid.innerHTML = CATEGORIES.map(renderCategoryCard).join('');
}

/* ========================================================================
   TOOL DETAILS PAGE
   ======================================================================== */
function renderToolDetails(){
  const root = $('#tool-details-root');
  if(!root) return;
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'), 10);
  const tool = TOOLS.find(t => t.id === id) || TOOLS[0];

  document.title = `${tool.name} — AI Tools Hub`;
  $('#crumb-tool-name').textContent = tool.name;

  const isFav = Favorites.isFavorite(tool.id);
  root.innerHTML = `
    <div class="details-layout">
      <div class="details-main reveal">
        <div class="details-head">
          <div class="tool-logo">${tool.logo}</div>
          <div style="flex:1;">
            <div class="tool-name-row">
              <h1>${tool.name}</h1>
              <button class="fav-btn${isFav ? ' active' : ''}" data-fav-id="${tool.id}" title="Save to favorites">${Icons.heart}</button>
            </div>
            <span class="tool-cat">${getCategoryName(tool.category)}</span>
            <div class="tool-meta-row" style="margin-top:12px; justify-content:flex-start; gap:16px;">
              <span class="badge ${pricingBadgeClass(tool.pricing)}">${tool.pricing}</span>
              <span class="rating">${Icons.star} ${tool.rating.toFixed(1)} rating</span>
            </div>
          </div>
        </div>

        <div class="details-section">
          <h3>Overview</h3>
          <p>${tool.desc} It's built for people who need ${getCategoryName(tool.category).toLowerCase()} help without a steep learning curve, and it's actively used across the categories in this directory.</p>
        </div>

        <div class="details-section">
          <h3>Why people pick it</h3>
          <ul class="feature-list">
            <li>${Icons.check} Clear ${tool.pricing.toLowerCase()} pricing with no confusing tiers</li>
            <li>${Icons.check} Rated ${tool.rating.toFixed(1)}/5 by the AI Tools Hub community</li>
            <li>${Icons.check} Tagged for ${tool.tags.join(', ')}</li>
          </ul>
        </div>

        <div class="details-section">
          <h3>Tags</h3>
          <div class="tag-row">${tool.tags.map(t => `<span class="tag-chip">#${t}</span>`).join('')}</div>
        </div>
      </div>

      <aside class="details-side reveal">
        <a class="btn btn-primary btn-block ripple-btn" href="${tool.site}" target="_blank" rel="noopener">Visit website ${Icons.external}</a>
        <div class="side-row"><span>Category</span> <a href="explore.html?category=${tool.category}">${getCategoryName(tool.category)}</a></div>
        <div class="side-row"><span>Pricing</span> ${tool.pricing}</div>
        <div class="side-row"><span>Rating</span> ${tool.rating.toFixed(1)} / 5</div>
        <div class="side-row"><span>Added</span> ${new Date(tool.dateAdded).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}</div>
        <div class="side-row"><span>Popularity</span> ${tool.popularity}/100</div>
      </aside>
    </div>

    <div class="section-tight">
      <div class="section-head"><h2>Similar tools</h2></div>
      <div class="related-grid" id="related-tools"></div>
    </div>
  `;

  const related = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);
  $('#related-tools').innerHTML = related.map(t => renderToolCard(t)).join('');

  bindFavButtons(root);
  Anim.scrollReveal();
}

/* ========================================================================
   FAVORITES PAGE
   ======================================================================== */
function renderFavoritesPage(){
  const grid = $('#favorites-grid');
  if(!grid) return;
  const emptyEl = $('.empty-state');
  const favIds = Favorites.getAll();
  const favTools = TOOLS.filter(t => favIds.includes(t.id));

  $('#fav-count-label').textContent = `${favTools.length} saved tool${favTools.length !== 1 ? 's' : ''}`;

  if(favTools.length === 0){
    grid.innerHTML = '';
    if(emptyEl) emptyEl.style.display = 'block';
  }else{
    if(emptyEl) emptyEl.style.display = 'none';
    grid.innerHTML = favTools.map(t => renderToolCard(t)).join('');
    bindFavButtons(grid);
    Anim.scrollReveal();
    Anim.tiltCards();
  }
}

/* ========================================================================
   BOOTSTRAP
   ======================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initFooterYear();
  initNewsletterForms();
  initFaqAccordion();
  initContactForm();
  ThemeManager.init();

  const page = document.body.dataset.page;
  if(page === 'home') renderHome();
  if(page === 'categories') renderCategoriesPage();
  if(page === 'tool-details') renderToolDetails();
  if(page === 'favorites') renderFavoritesPage();
});
