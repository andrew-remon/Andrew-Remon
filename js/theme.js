/* ============================================================
   THEME.JS — Dark/Light Mode Toggle
   Andrew Remon Portfolio
   ============================================================ */

const THEME_KEY = 'ar-portfolio-theme';

const ThemeManager = (() => {
  const html = document.documentElement;

  function getPreferred() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    // Add transition class for smooth switch
    document.body.classList.add('theme-transitioning');

    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update toggle button aria-label
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 450);
  }

  function toggle() {
    const current = html.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    apply(getPreferred());

    // Bind toggle button
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggle);

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        apply(e.matches ? 'dark' : 'light');
      }
    });
  }

  return { init, toggle, apply };
})();

export default ThemeManager;
