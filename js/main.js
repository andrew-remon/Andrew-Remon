/* ============================================================
   MAIN.JS — Entry Point
   Andrew Remon Portfolio
   ============================================================ */

import ThemeManager from './theme.js';
import NavManager   from './nav.js';
import ScrollReveal from './scroll-reveal.js';
import BackToTop    from './back-to-top.js';

import ProjectCards from './project-cards.js';

document.addEventListener('DOMContentLoaded', () => {
  // Apply theme immediately (before paint) to avoid flash
  ThemeManager.init();

  // Init all modules
  NavManager.init();
  ScrollReveal.init();
  BackToTop.init();

  ProjectCards.init();

  // Fade in page on load
  document.body.classList.add('page-loaded');
});
