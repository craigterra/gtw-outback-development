(() => {
  const controls = document.querySelector('.intro-controls');
  if (!controls) return;
  const replay = document.querySelector('#intro-replay');
  const skip = document.querySelector('#intro-skip');
  const status = document.querySelector('#intro-status');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'gtw-brand-intro-v2';
  let timer;
  controls.hidden = false;
  function finish(announce = false) {
    clearTimeout(timer);
    document.body.classList.remove('intro-playing');
    if (document.activeElement === skip) replay.focus({preventScroll:true});
    skip.hidden = true;
    replay.disabled = motion.matches;
    if (announce) status.textContent = 'GTW Outback. Gear That Works.';
  }
  function play() {
    finish();
    if (motion.matches) return;
    status.textContent = '';
    const reveal = document.querySelector('.brand-reveal');
    const logo = document.querySelector('.brand > img').getBoundingClientRect();
    const width = reveal.getBoundingClientRect().width;
    const vars = {
      '--brand-start-x': (innerWidth - width) / 2 + 'px',
      '--brand-start-y': Math.min(innerHeight * .28, 190) + 'px',
      '--brand-end-x': logo.left + 'px',
      '--brand-end-y': logo.top + 'px',
      '--brand-end-scale': logo.width / width
    };
    Object.entries(vars).forEach(([name, value]) => reveal.style.setProperty(name, value));
    // Restart only the decorative CSS sequence; the heading keeps its layout.
    void document.body.offsetWidth;
    document.body.classList.add('intro-playing');
    skip.hidden = false;
    timer = setTimeout(() => finish(true), 3800);
    try { sessionStorage.setItem(key, 'seen'); } catch {}
  }
  addEventListener('resize', () => finish());
  replay.addEventListener('click', play);
  skip.addEventListener('click', () => finish(true));
  motion.addEventListener('change', () => {
    finish();
    replay.textContent = motion.matches ? 'Motion reduced' : 'Replay the brand ↺';
  });
  // Hash links to deeper content do not start an introduction off screen.
  let seen = false;
  try { seen = sessionStorage.getItem(key) === 'seen'; } catch {}
  if (motion.matches) { replay.textContent = 'Motion reduced'; replay.disabled = true; }
  else if (!seen && (!location.hash || location.hash === '#home')) play();
  document.querySelectorAll('header a').forEach(link => link.addEventListener('click', () => finish()));
})();
