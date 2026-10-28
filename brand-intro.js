(() => {
  const controls = document.querySelector('.intro-controls');
  if (!controls) return;
  const replay = document.querySelector('#intro-replay');
  const skip = document.querySelector('#intro-skip');
  const status = document.querySelector('#intro-status');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'gtw-brand-intro-v7';
  const telex = document.querySelector('.hero-telex');
  const fullText = telex.textContent;
  telex.setAttribute('aria-label', fullText);
  let timer, typeTimer, frame, playRequest = 0;
  function clearTyping(reveal) {
    clearTimeout(typeTimer);
    cancelAnimationFrame(frame);
    telex.textContent = reveal ? fullText : '';
    telex.dataset.characters = String(reveal ? fullText.length : 0);
    document.body.classList.remove('telex-complete');
  }
  function typeMessage() {
    let lastCharacter = performance.now(), count = 0;
    function step(now) {
      const next = Math.min(fullText.length, count + 1);
      if (now - lastCharacter >= 60 && next > count) {
        lastCharacter = now;
        telex.textContent = fullText.slice(0, next);
        telex.dataset.characters = String(next);
        // One sound is triggered by the same frame that reveals the new character.
        window.GTWHeroAudio?.tick();
        count = next;
      }
      if (count < fullText.length) frame = requestAnimationFrame(step);
      else {
        document.body.classList.add('telex-complete');
        window.GTWHeroAudio?.complete();
      }
    }
    frame = requestAnimationFrame(step);
  }
  document.querySelector('.hero-foot>span').addEventListener('animationend', event => {
    if (event.animationName === 'campaign-line-in' && document.body.classList.contains('campaign-playing')) {
      const request = playRequest;
      Promise.resolve(window.GTWHeroAudio?.natureEnded()).then(() => {
        if (request === playRequest && document.body.classList.contains('campaign-playing')) {
          typeTimer = setTimeout(typeMessage, 250);
        }
      });
    }
  });
  controls.hidden = false;
  function finish(announce = false, keepCopy = false) {
    clearTimeout(timer);
    if (!keepCopy) { playRequest++; clearTyping(true); window.GTWHeroAudio?.stop(); }
    document.body.classList.remove('intro-playing');
    document.body.classList.remove('campaign-pending', 'campaign-playing');
    if (keepCopy && !motion.matches) document.body.classList.add('campaign-playing');
    if (document.activeElement === skip) replay.focus({preventScroll:true});
    skip.hidden = true;
    replay.disabled = false;
    if (announce) status.textContent = 'GTW Outback. Gear That Works.';
  }
  async function play() {
    finish();
    if (motion.matches) { status.textContent = 'Reduced motion is enabled. The finished logo is shown.'; return; }
    status.textContent = '';
    const request = ++playRequest;
    clearTyping(false);
    document.body.classList.add('campaign-pending');
    await window.GTWHeroAudio?.prepare();
    if (request !== playRequest) return;
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
    document.body.classList.add('intro-playing', 'campaign-pending');
    skip.hidden = false;
    window.GTWHeroAudio?.start();
    // The iron lands first; the brand line then leads the copy sequence.
    timer = setTimeout(() => finish(true, true), 1800);
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
  // Hash links to deeper content do not start an introduction off screen.
  let seen = false;
  try { seen = sessionStorage.getItem(key) === 'seen'; } catch {}
  if (motion.matches) { replay.textContent = 'Replay intro (motion reduced)'; replay.disabled = false; }
  else if (!seen && (!location.hash || location.hash === '#home')) play();
  document.querySelectorAll('header a').forEach(link => link.addEventListener('click', () => finish()));
})();
