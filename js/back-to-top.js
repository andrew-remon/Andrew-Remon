/* ============================================================
   BACK-TO-TOP.JS — Floating Back-to-Top Button
   Andrew Remon Portfolio
   ============================================================ */

const BackToTop = (() => {
  function init() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    // Scroll to top on click
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return { init };
})();

export default BackToTop;
