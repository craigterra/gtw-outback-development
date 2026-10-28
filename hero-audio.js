(() => {
  const button = document.querySelector('#hero-sound');
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!button || !AudioEngine) return;
  button.hidden = false;
  let enabled = true, playing = false, endTimer, context, master, noise, recording, generation = 0;
  const sources = new Set();
  let natureDone = Promise.resolve(), endNature = () => {};
  try { enabled = sessionStorage.getItem('gtw-sound-muted') !== 'true'; } catch {}

  function label(blocked = false) {
    button.textContent = blocked || (enabled && !playing) ? 'Play with sound' : enabled ? 'Sound on' : 'Sound off';
    button.dataset.playback = blocked ? 'blocked' : playing ? 'playing' : enabled ? 'ready' : 'muted';
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', blocked || (enabled && !playing) ? 'Replay intro with sound' : enabled ? 'Mute intro sound' : 'Enable sound and replay intro');
  }
  function stop(reason = 'stopped') {
    button.dataset.stopReason = typeof reason === 'string' ? reason : 'page-hidden';
    button.dataset.stoppedAt = String(performance.now());
    generation++;
    endNature();
    clearTimeout(endTimer);
    playing = false;
    for (const source of sources) { try { source.stop(); } catch {} }
    sources.clear();
    label();
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
        // Choose a clear four-second passage rather than a quiet lead-in.
        const data = buffer.getChannelData(0), rate = buffer.sampleRate;
        const length = Math.min(4, buffer.duration), stride = Math.max(1, Math.floor(rate / 40));
        let offset = 0, best = -1;
        for (let seconds = 0; seconds <= buffer.duration - length; seconds += 0.25) {
          let energy = 0;
          for (let i = Math.floor(seconds * rate); i < (seconds + length) * rate; i += stride) energy += data[i] * data[i];
          if (energy > best) { best = energy; offset = seconds; }
        }
        let peak = 0;
        for (let i = Math.floor(offset * rate); i < (offset + length) * rate; i++) peak = Math.max(peak, Math.abs(data[i]));
        // Trim quiet lead-in inside the selected passage before scheduling it.
        let lead = 0;
        const threshold = Math.max(0.008, peak * 0.035);
        for (let seconds = 0; seconds < length - 1; seconds += 0.02) {
          let energy = 0, count = 0;
          for (let i = Math.floor((offset + seconds) * rate); i < (offset + seconds + 0.02) * rate; i++) { energy += data[i] * data[i]; count++; }
          if (Math.sqrt(energy / count) >= threshold) { lead = Math.max(0, seconds - 0.02); break; }
        }
        offset += lead;
        button.dataset.recordingPeak = String(peak);
        button.dataset.recording = 'ready';
        button.dataset.excerptStart = String(offset);
        button.dataset.excerptLength = String(length);
        return {buffer, offset, length: Math.min(length, buffer.duration - offset), level: Math.min(3, 0.7 / Math.max(peak, 0.01))};
      }).catch(() => { button.dataset.recording = 'unavailable'; return null; });
  }
  function track(source, end, after = () => {}) {
    sources.add(source);
    source.onended = () => { sources.delete(source); source.disconnect(); after(); };
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
    playing = true;
    button.dataset.startedAt = String(performance.now());
    label();
    button.dataset.clicks = '0';
    natureDone = new Promise(resolve => { endNature = resolve; });
    button.dataset.nature = 'waiting';
    const t = context.currentTime + 0.03, request = generation, finishNature = endNature;
    hiss(t + 0.3, 0.85, 0.55, 1700);
    recording.then(clip => {
      if (!clip || request !== generation || !enabled || document.hidden) { finishNature(); return; }
      const start = Math.max(t + 0.65, context.currentTime);
      const elapsed = Math.max(0, start - (t + 0.65));
      const duration = clip.length - elapsed;
      if (duration < 1) { finishNature(); return; }
      const source = context.createBufferSource();
      source.buffer = clip.buffer;
      const gain = context.createGain();
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(clip.level, start + 0.06);
      gain.gain.setValueAtTime(clip.level, start + duration - 0.45);
      gain.gain.linearRampToValueAtTime(0, start + duration);
      source.connect(gain).connect(master);
      source.start(start, clip.offset + elapsed, duration);
      button.dataset.nature = 'playing';
      const done = finishNature;
      track(source, start + duration, () => {
        if (request === generation) button.dataset.nature = 'finished';
        done();
      });
    });

  }
  async function prepare() {
    if (!enabled) return;
    try {
      engine();
      if (context.state !== 'running') {
        // Never start late audio after an unrelated gesture unlocks the context.
        await Promise.race([context.resume().catch(() => {}), new Promise(resolve => setTimeout(resolve, 120))]);
      }
      await recording;
      label(context.state !== 'running');
    } catch { label(true); }
  }
  function start() {
    stop('restart');
    if (!enabled || document.hidden) return;
    try {
      engine();
      if (context.state !== 'running') { label(true); return; }
      schedule();
    } catch { label(true); }
  }
  function tick() {
    if (!playing || !enabled || context?.state !== 'running' || document.hidden) return;
    hiss(context.currentTime + 0.002, 0.014, 0.16, 1100);
    button.dataset.clicks = String(Number(button.dataset.clicks || 0) + 1);
  }
  function complete() { clearTimeout(endTimer); endTimer = setTimeout(() => stop('sequence-complete'), 500); }
  button.addEventListener('click', () => {
    if (playing && enabled) {
      enabled = false;
      stop('muted');
      label();
    } else {
      enabled = true;
      window.dispatchEvent(new Event('gtw-replay-with-sound'));
    }
    try { sessionStorage.setItem('gtw-sound-muted', String(!enabled)); } catch {}
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop('tab-hidden'); });
  addEventListener('pagehide', stop);
  window.GTWHeroAudio = {prepare, start, stop, tick, complete, natureEnded: () => natureDone};
  label();
})();
