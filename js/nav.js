/* ============================================================
   NAV.JS — Sticky Nav, Hamburger & Active Section
   Andrew Remon Portfolio
   ============================================================ */

const NavManager = (() => {
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const overlay     = document.getElementById('menu-overlay');
  const navLinks    = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  let lastScrollY = 0;
  let ticking     = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const current = window.scrollY;
        navbar.classList.toggle('scrolled', current > 20);
        if (window.innerWidth <= 900) {
          if (current > lastScrollY && current > 80) {
            navbar.classList.add('hidden');
          } else {
            navbar.classList.remove('hidden');
          }
        }
        lastScrollY = current;
        ticking = false;
      });
      ticking = true;
    }
  }

  function initActiveHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, {
      rootMargin: '-72px 0px -50% 0px',
      threshold: 0
    });
    sections.forEach(s => observer.observe(s));
  }

  function setActive(id) {
    [...navLinks, ...mobileLinks].forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMenu();
        const navH = navbar ? navbar.offsetHeight : 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  function init() {
    if (!navbar) return;
    window.addEventListener('scroll', onScroll, { passive: true });
    if (hamburger) hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    if (overlay) overlay.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    initActiveHighlight();
    initSmoothScroll();
  }

  return { init };
})();

export default NavManager;
