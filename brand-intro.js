(() => {
  const controls = document.querySelector('.intro-controls');
  if (!controls) return;
  const replay = document.querySelector('#intro-replay');
  const skip = document.querySelector('#intro-skip');
  const status = document.querySelector('#intro-status');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'gtw-brand-intro-v3';
  let timer;
  controls.hidden = false;
  function finish(announce = false) {
    clearTimeout(timer);
    document.body.classList.remove('intro-playing');
    if (document.activeElement === skip) replay.focus({preventScroll:true});
    skip.hidden = true;
    replay.disabled = false;
    if (announce) status.textContent = 'GTW Outback. Gear That Works.';
  }
  function play() {
    finish();
    if (motion.matches) { status.textContent = 'Reduced motion is enabled. The finished logo is shown.'; return; }
    status.textContent = '';
    const reveal = document.querySelector('.brand-reveal');
    const logo = document.querySelector('.brand > img').getBoundingClientRect();
    const revealBox = reveal.getBoundingClientRect();
    const ironBox = reveal.querySelector('.branding-iron img').getBoundingClientRect();
    const width = revealBox.width;
    // The iron extends above the logo box. Centre its full visible footprint,
    // rather than placing the logo box a fixed distance from the top.
    const ironCentreX = ironBox.left - revealBox.left + ironBox.width / 2;
    const ironCentreY = ironBox.top - revealBox.top + ironBox.height / 2;
    const vars = {
      '--brand-start-x': innerWidth / 2 - ironCentreX + 'px',
      '--brand-start-y': innerHeight / 2 - ironCentreY + 'px',
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
    replay.textContent = motion.matches ? 'Replay intro (motion reduced)' : 'Replay intro ↺';
  });
  // Hash links to deeper content do not start an introduction off screen.
  let seen = false;
  try { seen = sessionStorage.getItem(key) === 'seen'; } catch {}
  if (motion.matches) { replay.textContent = 'Replay intro (motion reduced)'; replay.disabled = false; }
  else if (!seen && (!location.hash || location.hash === '#home')) play();
  document.querySelectorAll('header a').forEach(link => link.addEventListener('click', () => finish()));
})();
