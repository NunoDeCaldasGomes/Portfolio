
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // simple fade-in for cards
  document.querySelectorAll('.card').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      el.style.transition = 'opacity 400ms ease, transform 400ms ease';
      el.style.opacity = 1;
      el.style.transform = 'none';
    }, 120 * i);
  });
});
