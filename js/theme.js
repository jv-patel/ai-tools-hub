/* ==========================================================================
   theme.js — dark/light mode switch, persisted to localStorage
   ========================================================================== */

const ThemeManager = {
  init(){
    const saved = Storage.get(Storage.KEYS.THEME, 'dark');
    this.apply(saved);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  apply(theme){
    if(theme === 'light'){
      document.documentElement.setAttribute('data-theme', 'light');
    }else{
      document.documentElement.removeAttribute('data-theme');
    }
    Storage.set(Storage.KEYS.THEME, theme);
  },

  toggle(){
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    this.apply(isLight ? 'dark' : 'light');
  }
};

/* Applied immediately (before other DOMContentLoaded work) to avoid a flash
   of the wrong theme on page load. */
(function(){
  const saved = Storage.get(Storage.KEYS.THEME, 'dark');
  if(saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();
