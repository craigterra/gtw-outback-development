(() => {
  const controls = document.querySelector('.intro-controls');
  if (!controls) return;
  const replay = document.querySelector('#intro-replay');
  const skip = document.querySelector('#intro-skip');
  const status = document.querySelector('#intro-status');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const words = [...document.querySelectorAll('.staggered-headline>span')];
  const closingLogo = document.querySelector('.hero-closing-logo');
  const reveal = document.querySelector('.brand-reveal');
  const key = 'gtw-brand-intro-v9';
  let preludeTimer, closingTimer, endTimer, playRequest = 0;
  controls.hidden = false;
  function finish(announce = false) {
    clearTimeout(preludeTimer);
    clearTimeout(closingTimer);
    clearTimeout(endTimer);
    playRequest++;
    window.GTWHeroAudio?.stop();
    document.body.classList.remove('intro-playing', 'campaign-pending', 'campaign-playing', 'closing-brand');
    if (document.activeElement === skip) replay.focus({preventScroll:true});
    skip.hidden = true;
    replay.disabled = false;
    if (announce) status.textContent = 'Camping. Touring. Gear That Works. GTW Outback.';
  }
  function positionIron(target) {
    const logo = target.getBoundingClientRect();
    const box = reveal.getBoundingClientRect();
    const iron = reveal.querySelector('.branding-iron img').getBoundingClientRect();
    const vars = {
      '--brand-start-x': innerWidth / 2 - (iron.left - box.left + iron.width / 2) + 'px',
      '--brand-start-y': innerHeight / 2 - (iron.top - box.top + iron.height / 2) + 'px',
      '--brand-end-x': logo.left + 'px',
      '--brand-end-y': logo.top + 'px',
      '--brand-end-scale': logo.width / box.width
    };
    Object.entries(vars).forEach(([name, value]) => reveal.style.setProperty(name, value));
  }
  function positionWords() {
    const hero = document.querySelector('.hero').getBoundingClientRect();
    const centreX = innerWidth / 2;
    const centreY = (Math.max(0, hero.top) + Math.min(innerHeight, hero.bottom)) / 2;
    words.forEach(word => {
      const box = word.getBoundingClientRect();
      word.style.setProperty('--word-from-x', centreX - box.left - box.width / 2 + 'px');
      word.style.setProperty('--word-from-y', centreY - box.top - box.height / 2 + 'px');
    });
  }
  async function play() {
    finish();
    if (motion.matches) { status.textContent = 'Reduced motion is enabled. The finished logo is shown.'; return; }
    status.textContent = '';
    const request = ++playRequest;
    document.body.classList.add('campaign-pending');
    await window.GTWHeroAudio?.prepare();
    if (request !== playRequest) return;
    positionWords();
    positionIron(document.querySelector('.brand > img'));
    void document.body.offsetWidth;
    document.body.classList.add('intro-playing');
    skip.hidden = false;
    window.GTWHeroAudio?.start();
    preludeTimer = setTimeout(() => {
      if (request !== playRequest) return;
      document.body.classList.remove('intro-playing', 'campaign-pending');
      document.body.classList.add('campaign-playing');
      closingTimer = setTimeout(() => {
        if (request !== playRequest) return;
        positionIron(closingLogo);
        void document.body.offsetWidth;
        document.body.classList.add('closing-brand', 'intro-playing');
        endTimer = setTimeout(() => finish(true), 1800);
      }, 4100);
    }, 1800);
    try { sessionStorage.setItem(key, 'seen'); } catch {}
  }
  addEventListener('resize', () => finish());
  document.addEventListener('visibilitychange', () => { if (document.hidden) finish(); });
  replay.addEventListener('click', () => {
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    play();
  });
  skip.addEventListener('click', () => finish(true));
  addEventListener('gtw-replay-with-sound', async () => {
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    await play();
    if (motion.matches) {
      await window.GTWHeroAudio?.prepare();
      window.GTWHeroAudio?.start();
      await window.GTWHeroAudio?.natureEnded();
      window.GTWHeroAudio?.complete();
    }
  });
  motion.addEventListener('change', () => {
    finish();
    replay.textContent = motion.matches ? 'Replay intro (motion reduced)' : 'Replay intro ↺';
  });
  let seen = false;
  try { seen = sessionStorage.getItem(key) === 'seen'; } catch {}
  if (motion.matches) { replay.textContent = 'Replay intro (motion reduced)'; replay.disabled = false; }
  else if (!seen && (!location.hash || location.hash === '#home')) play();
  document.querySelectorAll('header a').forEach(link => link.addEventListener('click', () => finish()));
})();
