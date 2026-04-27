/* ============================================================
   PROJECT-CARDS.JS — Flip + Dynamic Height on Hover
   Andrew Remon Portfolio
   ============================================================ */

const ProjectCards = {
  init() {
    const cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    cards.forEach(card => {
      const inner = card.querySelector('.project-card-inner');
      const front = card.querySelector('.project-card-front');
      const back  = card.querySelector('.project-card-back');
      if (!inner || !front || !back) return;

      // Set the initial height to match the front face
      const setFrontHeight = () => {
        inner.style.height = front.offsetHeight + 'px';
      };

      setFrontHeight();

      // Recalculate on resize
      window.addEventListener('resize', setFrontHeight);

      card.addEventListener('mouseenter', () => {
        card.classList.add('is-flipped');

        // After flip starts, measure back and expand if needed
        const frontH = front.offsetHeight;
        const backH  = back.scrollHeight;
        const target = Math.max(frontH, backH);

        // Slight delay so expansion feels sequential after the flip
        setTimeout(() => {
          inner.style.height = target + 'px';
        }, 350);
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-flipped');
        // Collapse back to front height
        inner.style.height = front.offsetHeight + 'px';
      });
    });
  }
};

export default ProjectCards;
