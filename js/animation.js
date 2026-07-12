/* ==========================================================================
   animation.js — scroll reveal, counters, tilt, ripple, typing effect,
   mobile drawer, scroll progress bar, back-to-top, lazy loading.
   ========================================================================== */

const Anim = {

  initAll(){
    this.scrollReveal();
    this.counters();
    this.tiltCards();
    this.rippleButtons();
    this.mobileDrawer();
    this.scrollProgress();
    this.backToTop();
    this.lazyLoad();
  },

  /* Reveal elements with [data-reveal] as they enter the viewport */
  scrollReveal(){
    const items = document.querySelectorAll('.reveal');
    if(!items.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el, i) => { el.style.setProperty('--stagger-i', i % 8); io.observe(el); });
  },

  /* Animate numeric counters: <span data-counter="1280">0</span> */
  counters(){
    const els = document.querySelectorAll('[data-counter]');
    if(!els.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target < 10 ? (target * eased).toFixed(1) : Math.floor(target * eased);
        el.textContent = val + suffix;
        if(p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){ run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(el => io.observe(el));
  },

  /* Subtle 3D tilt on hover for elements with .tilt */
  tiltCards(){
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--ry', (px * 8) + 'deg');
        card.style.setProperty('--rx', (py * -8) + 'deg');
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  },

  /* Material-style ripple on .ripple-btn click */
  rippleButtons(){
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.ripple-btn');
      if(!btn) return;
      const rect = btn.getBoundingClientRect();
      const span = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      span.className = 'ripple-span';
      span.style.width = span.style.height = size + 'px';
      span.style.left = (e.clientX - rect.left - size / 2) + 'px';
      span.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(span);
      setTimeout(() => span.remove(), 650);
    });
  },

  /* Typing effect: cycles through data-type-words on el with .typing-target */
  typingEffect(el, words, opts = {}){
    if(!el) return;
    const typeSpeed = opts.typeSpeed || 55;
    const eraseSpeed = opts.eraseSpeed || 30;
    const hold = opts.hold || 1400;
    let wordIndex = 0, charIndex = 0, erasing = false;

    function step(){
      const word = words[wordIndex];
      if(!erasing){
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if(charIndex === word.length){
          erasing = true;
          setTimeout(step, hold);
          return;
        }
        setTimeout(step, typeSpeed);
      }else{
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if(charIndex === 0){
          erasing = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(step, 400);
          return;
        }
        setTimeout(step, eraseSpeed);
      }
    }
    step();
  },

  /* Mobile nav drawer */
  mobileDrawer(){
    const toggle = document.querySelector('.menu-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const closeBtn = document.querySelector('.drawer-close');
    if(!toggle || !drawer) return;
    const open = () => { drawer.classList.add('open'); overlay?.classList.add('open'); };
    const close = () => { drawer.classList.remove('open'); overlay?.classList.remove('open'); };
    toggle.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  },

  /* Scroll progress bar at very top of page */
  scrollProgress(){
    const bar = document.querySelector('.scroll-progress');
    if(!bar) return;
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = scrolled + '%';
    });
  },

  /* Back to top button */
  backToTop(){
    const btn = document.querySelector('.back-to-top');
    if(!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 480);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  /* Lazy load images with data-src using IntersectionObserver */
  lazyLoad(){
    const imgs = document.querySelectorAll('img[data-src]');
    if(!imgs.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          io.unobserve(img);
        }
      });
    }, { rootMargin: '120px' });
    imgs.forEach(img => io.observe(img));
  }
};

document.addEventListener('DOMContentLoaded', () => Anim.initAll());
