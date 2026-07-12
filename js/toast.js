/* ==========================================================================
   toast.js — lightweight toast notifications
   ========================================================================== */

const Toast = {
  stack: null,

  ensureStack(){
    if(!this.stack){
      this.stack = document.createElement('div');
      this.stack.className = 'toast-stack';
      document.body.appendChild(this.stack);
    }
    return this.stack;
  },

  show(message, type = 'success', duration = 2600){
    const stack = this.ensureStack();
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' error' : '');
    el.textContent = message;
    stack.appendChild(el);

    setTimeout(() => {
      el.style.transition = 'opacity 300ms ease, transform 300ms ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(() => el.remove(), 300);
    }, duration);
  }
};
