/* ==========================================================================
   favorites.js — add/remove/check favorite tools, persisted to localStorage
   ========================================================================== */

const Favorites = {
  getAll(){
    return Storage.get(Storage.KEYS.FAVORITES, []);
  },

  isFavorite(id){
    return this.getAll().includes(id);
  },

  toggle(id){
    let favs = this.getAll();
    const isFav = favs.includes(id);
    if(isFav){
      favs = favs.filter(f => f !== id);
    }else{
      favs.push(id);
    }
    Storage.set(Storage.KEYS.FAVORITES, favs);
    this.refreshCountBadge();
    return !isFav; // returns new state
  },

  refreshCountBadge(){
    const count = this.getAll().length;
    document.querySelectorAll('.fav-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'grid' : 'none';
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Favorites.refreshCountBadge());
