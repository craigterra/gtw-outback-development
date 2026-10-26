(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
  // Preserve bookmarks to the sections moved off the landing page.
  const moved = new Set(['range','your-way','warranty','club','build','merch']);
  function routeLegacyHash() {
    if (location.hash === '#our-story') { location.replace('our-story.html'); return; }
    if (moved.has(location.hash.slice(1))) location.replace('gear.html' + location.hash);
  }
  routeLegacyHash();
  addEventListener('hashchange', routeLegacyHash);
})();
