(() => {
  const button = document.querySelector('#hero-sound');
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!button || !AudioEngine) return;
  button.hidden = false;
  let enabled = true, context, master, noise, recording, generation = 0;
  const sources = new Set();
  try { enabled = sessionStorage.getItem('gtw-sound-muted') !== 'true'; } catch {}

  function label(blocked = false) {
    button.textContent = blocked ? 'Play with sound' : enabled ? 'Sound on' : 'Sound off';
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', blocked ? 'Replay intro with sound' : enabled ? 'Mute intro sound' : 'Enable sound and replay intro');
  }
  function stop() {
    generation++;
    for (const source of sources) { try { source.stop(); } catch {} }
    sources.clear();
  }
  function engine() {
    if (context) return;
    context = new AudioEngine();
    master = context.createGain();
    master.gain.value = 0.22;
    master.connect(context.destination);
    noise = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const samples = noise.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    button.dataset.recording = 'loading';
    recording = fetch('assets/audio/laughing-kookaburra.ogg')
      .then(response => { if (!response.ok) throw new Error('Recording unavailable'); return response.arrayBuffer(); })
      .then(bytes => context.decodeAudioData(bytes))
      .then(buffer => {
        // Choose a clear seven-second passage rather than a quiet lead-in.
        const data = buffer.getChannelData(0), rate = buffer.sampleRate;
        const length = Math.min(7.1, buffer.duration), stride = Math.max(1, Math.floor(rate / 40));
        let offset = 0, best = -1;
        for (let seconds = 0; seconds <= buffer.duration - length; seconds += 0.25) {
          let energy = 0;
          for (let i = Math.floor(seconds * rate); i < (seconds + length) * rate; i += stride) energy += data[i] * data[i];
          if (energy > best) { best = energy; offset = seconds; }
        }
        button.dataset.recording = 'ready';
        button.dataset.excerptStart = String(offset);
        button.dataset.excerptLength = String(length);
        return {buffer, offset, length};
      }).catch(() => { button.dataset.recording = 'unavailable'; return null; });
  }
  function track(source, end) {
    sources.add(source);
    source.onended = () => { sources.delete(source); source.disconnect(); };
    source.stop(end);
  }
  function hiss(start, duration, volume, frequency) {
    const source = context.createBufferSource();
    source.buffer = noise;
    source.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = frequency;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + Math.min(0.04, duration / 4));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter).connect(gain).connect(master);
    source.start(start);
    track(source, start + duration + 0.02);
  }
  function schedule() {
    const t = context.currentTime + 0.03, request = generation;
    hiss(t + 0.3, 0.85, 0.55, 1700);
    recording.then(clip => {
      if (!clip || request !== generation || !enabled || document.hidden) return;
      const start = Math.max(t + 1.9, context.currentTime);
      const elapsed = Math.max(0, start - (t + 1.9));
      const duration = clip.length - elapsed;
      if (duration < 1) return;
      const source = context.createBufferSource();
      source.buffer = clip.buffer;
      const gain = context.createGain();
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.85, start + 0.35);
      gain.gain.setValueAtTime(0.85, start + duration - 0.65);
      gain.gain.linearRampToValueAtTime(0, start + duration);
      source.connect(gain).connect(master);
      source.start(start, clip.offset + elapsed, duration);
      track(source, start + duration);
    });
    for (let i = 0; i < 61; i++) hiss(t + 5.95 + i * 3.6 / 61, 0.018, 0.14, 900);
  }
  function start() {
    stop();
    if (!enabled || document.hidden) { label(); return; }
    const request = generation;
    try {
      engine();
      if (context.state === 'running') { label(); schedule(); return; }
      label(true);
      context.resume().then(() => {
        if (request !== generation || !enabled || document.hidden) return;
        if (context.state === 'running') { label(); schedule(); }
      }).catch(() => label(true));
    } catch { label(true); }
  }
  button.addEventListener('click', () => {
    if (button.textContent !== 'Play with sound' && enabled) {
      enabled = false;
      stop();
      label();
    } else {
      enabled = true;
      window.dispatchEvent(new Event('gtw-replay-with-sound'));
    }
    try { sessionStorage.setItem('gtw-sound-muted', String(!enabled)); } catch {}
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  addEventListener('pagehide', stop);
  window.GTWHeroAudio = {start, stop};
  label();
})();
