/* ============================================================
   SCROLL-REVEAL.JS — Intersection Observer Animations
   Andrew Remon Portfolio
   ============================================================ */

const ScrollReveal = (() => {
  function init() {
    // Single elements with [data-reveal]
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el    = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => el.classList.add('is-visible'), delay);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => observer.observe(el));
    }

    // Staggered groups with [data-reveal-group]
    const groups = document.querySelectorAll('[data-reveal-group]');
    if (groups.length) {
      const groupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            groupObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      groups.forEach(group => groupObserver.observe(group));
    }
  }

  return { init };
})();

export default ScrollReveal;
