/**
 * Tilt effect for blog cards
 */
export function initTilt() {
  const cards = document.querySelectorAll('.blog-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Using the user-provided logic
      card.style.transform = `perspective(600px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.04)`;
      
      // Ensure transition is disabled during mousemove for responsiveness
      card.style.transition = 'none';
    });

    card.addEventListener('mouseleave', () => {
      // Re-enable transition for smooth reset
      card.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}
