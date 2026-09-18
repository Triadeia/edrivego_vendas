(() => {
  'use strict';
  const links = document.querySelector('.links');
  const cards = [...document.querySelectorAll('.card')];
  if (!links || cards.length !== 2 || !('IntersectionObserver' in window)) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let visible = false;
  let ready = false;

  // Keep the two-card tour aligned after resizing without per-frame JS work.
  function measureTour() {
    const positions = cards.map(card => card.offsetTop + card.offsetHeight * .7);
    const end = Math.max(positions[1], links.offsetHeight - 40);
    links.style.setProperty('--cursor-one', `${positions[0]}px`);
    links.style.setProperty('--cursor-two', `${positions[1]}px`);
    links.style.setProperty('--cursor-end', `${end}px`);
  }

  function sync() {
    const disabled = reducedMotion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');
    links.classList.toggle('motion-disabled', !!disabled);
    links.classList.toggle('motion-paused', !ready || disabled || !visible || document.hidden);
  }

  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  });
  observer.observe(links);
  if ('ResizeObserver' in window) new ResizeObserver(measureTour).observe(links);
  else window.addEventListener('resize', measureTour, { passive: true });

  reducedMotion.addEventListener('change', sync);
  connection?.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => links.classList.add('motion-paused'));
  window.addEventListener('pageshow', sync);

  function start() {
    const enable = () => {
      measureTour();
      ready = true;
      sync();
      links.classList.add('motion-ready');
    };
    if ('requestIdleCallback' in window) window.requestIdleCallback(enable, { timeout: 1200 });
    else window.setTimeout(enable, 200);
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
