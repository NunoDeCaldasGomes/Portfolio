document.addEventListener('DOMContentLoaded', () => {
  // Met à jour l'année dans le footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Effet de survol pour les cartes sociales (calcul de la position de la souris)
  const socialCardsContainer = document.querySelector('.social-cards');
  const socialCards = document.querySelectorAll('.social-card');
  if (socialCardsContainer && socialCards.length) {
    socialCardsContainer.addEventListener('mousemove', (e) => {
      socialCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }
});
