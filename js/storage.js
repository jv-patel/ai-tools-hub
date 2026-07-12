/* ==========================================================================
   storage.js — thin wrapper around localStorage
   Centralizing key names and JSON (de)serialization here means every other
   file just calls Storage.get/set and never touches localStorage directly.
   ========================================================================== */

const Storage = {
  KEYS: {
    THEME: 'aith_theme',
    FAVORITES: 'aith_favorites'
  },

  get(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if(raw === null) return fallback;
      return JSON.parse(raw);
    }catch(e){
      console.warn('Storage.get failed for', key, e);
      return fallback;
    }
  },

  set(key, value){
    try{
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }catch(e){
      console.warn('Storage.set failed for', key, e);
      return false;
    }
  },

  remove(key){
    try{ localStorage.removeItem(key); }catch(e){ /* ignore */ }
  }
};
