(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const videos = [...document.querySelectorAll('video[data-src]')];
  const button = document.querySelector('.motion-toggle');
  if (!('IntersectionObserver' in window) || !button) return;

  const visible = new Set();
  let pausedByUser = false;
  let ready = false;
  const disabled = () => reducedMotion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');

  function sync() {
    const allowed = ready && !disabled() && !pausedByUser && !document.hidden;
    for (const video of videos) {
      if (allowed && visible.has(video)) {
        if (!video.hasAttribute('src')) video.src = video.dataset.src;
        video.muted = true;
        video.play().catch(() => {}); // The poster remains if autoplay is blocked.
      } else {
        video.pause();
      }
    }
    button.hidden = disabled();
    button.textContent = pausedByUser ? 'Reproduzir vídeos' : 'Pausar vídeos';
  }

  for (const video of videos) {
    video.addEventListener('playing', () => video.classList.add('is-playing'));
    video.addEventListener('error', () => video.classList.remove('is-playing'));
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= .15) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    sync();
  }, { threshold: .15 });
  videos.forEach(video => observer.observe(video));

  button.addEventListener('click', () => {
    pausedByUser = !pausedByUser;
    sync();
  });
  reducedMotion.addEventListener('change', sync);
  connection?.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => videos.forEach(video => video.pause()));
  window.addEventListener('pageshow', sync);

  function start() {
    const enable = () => { ready = true; sync(); };
    if ('requestIdleCallback' in window) window.requestIdleCallback(enable, { timeout: 1200 });
    else window.setTimeout(enable, 200);
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
