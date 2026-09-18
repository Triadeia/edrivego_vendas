(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const links = document.querySelector('.links');
  const cards = [...document.querySelectorAll('.card')];
  const videos = [...document.querySelectorAll('video[data-src]')];
  if (!links || !('IntersectionObserver' in window)) return;

  const visible = new Set();
  let ready = false;
  let linksVisible = false;
  const disabled = () => reducedMotion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');

  // Read geometry only at startup or resize, never during animation frames.
  function measureTour() {
    const positions = cards.map(card => card.offsetTop + card.offsetHeight * .7);
    const end = links.offsetHeight - 40;
    ['one', 'two', 'three'].forEach((name, index) => {
      links.style.setProperty(`--cursor-${name}`, `${positions[index]}px`);
    });
    links.style.setProperty('--cursor-end', `${end}px`);
  }

  function sync() {
    const allowed = ready && !disabled() && !document.hidden;
    links.classList.toggle('motion-disabled', !!disabled());
    links.classList.toggle('motion-paused', !allowed || !linksVisible);
    for (const video of videos) {
      if (allowed && visible.has(video)) {
        if (!video.hasAttribute('src')) video.src = video.dataset.src;
        video.muted = true;
        video.play().catch(() => {}); // Keep the poster when autoplay is blocked.
      } else {
        video.pause();
      }
    }
  }

  videos.forEach(video => {
    video.addEventListener('playing', () => video.classList.add('is-playing'));
    video.addEventListener('error', () => video.classList.remove('is-playing'));
  });
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target === links) linksVisible = entry.isIntersecting;
      else if (entry.isIntersecting && entry.intersectionRatio >= .15) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    sync();
  }, { threshold: [0, .15] });
  observer.observe(links);
  videos.forEach(video => observer.observe(video));

  if ('ResizeObserver' in window) new ResizeObserver(measureTour).observe(links);
  else window.addEventListener('resize', measureTour, { passive: true });
  reducedMotion.addEventListener('change', sync);
  connection?.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => {
    videos.forEach(video => video.pause());
    links.classList.add('motion-paused');
  });
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
