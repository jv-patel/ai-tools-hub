/* ==========================================================================
   search.js — homepage hero search: instant suggestions + typing placeholder
   Full filtering for grid pages lives in filter.js (FilterPage).
   ========================================================================== */

const HeroSearch = {
  init(){
    const form = document.querySelector('.search-form');
    const input = document.querySelector('.search-input');
    if(!form || !input) return;

    // Typing effect cycling through example queries in the placeholder,
    // paused while the user is actually typing or focused.
    const examples = ['Try "image generation"', 'Try "coding assistant"', 'Try "voice cloning"', 'Try "free chatbot"'];
    let exIndex = 0, exChar = 0, exErasing = false, exTimer = null;
    function typeStep(){
      if(document.activeElement === input || input.value){ exTimer = setTimeout(typeStep, 500); return; }
      const word = examples[exIndex];
      if(!exErasing){
        exChar++;
        input.placeholder = word.slice(0, exChar);
        if(exChar === word.length){ exErasing = true; exTimer = setTimeout(typeStep, 1300); return; }
        exTimer = setTimeout(typeStep, 55);
      }else{
        exChar--;
        input.placeholder = word.slice(0, exChar);
        if(exChar === 0){ exErasing = false; exIndex = (exIndex + 1) % examples.length; exTimer = setTimeout(typeStep, 300); return; }
        exTimer = setTimeout(typeStep, 28);
      }
    }
    typeStep();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      window.location.href = 'explore.html' + (q ? `?q=${encodeURIComponent(q)}` : '');
    });
  }
};

document.addEventListener('DOMContentLoaded', () => HeroSearch.init());
