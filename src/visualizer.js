// Visualizer i Winamp/WMP-stil. Tapper master-utgangen med en AnalyserNode og tegner på canvas.

const MODES = ["bars", "scope", "radial", "particles", "tunnel"];

export function createVisualizer(canvas, { autoCycleSeconds = 40 } = {}) {
  const ctx2d = canvas.getContext("2d");
  let analyser;
  let freq;
  let wave;
  let mode = 0;
  let hue = 200;
  let lastCycle = performance.now();
  let bassAvg = 0;
  let beat = 0;
  let lastBeat = 0;
  let energy = 0;
  let frames = 0;
  let beats = 0;
  let lastFrame = performance.now();
  let lastRing = 0;
  let dt = 1; // frames relativt til 60 fps
  let rot = 0;
  const particles = [];
  const rings = [];

  function tryConnect() {
    const ctl = globalThis.getSuperdoughAudioController?.();
    const ac = globalThis.getAudioContext?.();
    const src = ctl?.output?.destinationGain;
    if (!src || !ac) return false;
    analyser = ac.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.7;
    src.connect(analyser);
    freq = new Uint8Array(analyser.frequencyBinCount);
    wave = new Uint8Array(analyser.fftSize);
    return true;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    return { w: width, h: height };
  }

  function detectBeat() {
    let bass = 0;
    for (let i = 2; i < 12; i++) bass += freq[i];
    bass /= 10;
    let total = 0;
    for (let i = 0; i < 200; i++) total += freq[i];
    energy = energy * 0.9 + (total / (200 * 255)) * 0.1;
    bassAvg = bassAvg * 0.96 + bass * 0.04;
    const now = performance.now();
    const hit = bass > bassAvg * 1.08 && bass > 60 && now - lastBeat > 220;
    if (hit) lastBeat = now;
    if (hit) beats++;
    beat = hit ? 1 : beat * 0.9;
    return hit;
  }

  function fade(w, h, alpha) {
    ctx2d.fillStyle = `rgba(10, 10, 14, ${alpha})`;
    ctx2d.fillRect(0, 0, w, h);
  }

  // --- Modus 1: speilede spektrum-søyler ------------------------------------
  function drawBars(w, h) {
    fade(w, h, 0.35);
    const bars = 48;
    const step = Math.floor((freq.length * 0.6) / bars);
    const bw = w / bars;
    for (let i = 0; i < bars; i++) {
      let v = 0;
      for (let j = 0; j < step; j++) v = Math.max(v, freq[i * step + j]);
      const amp = (v / 255) ** 1.4 * (h * 0.45);
      const x = i * bw;
      const grad = ctx2d.createLinearGradient(0, h / 2 - amp, 0, h / 2 + amp);
      grad.addColorStop(0, `hsl(${hue + i * 2}, 90%, 65%)`);
      grad.addColorStop(0.5, `hsl(${hue + 40 + i * 2}, 80%, 50%)`);
      grad.addColorStop(1, `hsl(${hue + i * 2}, 90%, 65%)`);
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(x + 1, h / 2 - amp, bw - 2, amp * 2);
      ctx2d.fillStyle = `hsla(${hue + i * 2}, 100%, 85%, 0.9)`;
      ctx2d.fillRect(x + 1, h / 2 - amp - 3, bw - 2, 2);
      ctx2d.fillRect(x + 1, h / 2 + amp + 1, bw - 2, 2);
    }
  }

  // --- Modus 2: oscilloskop med spor -----------------------------------------
  function drawScope(w, h) {
    fade(w, h, 0.12);
    ctx2d.lineWidth = 2;
    for (let pass = 0; pass < 3; pass++) {
      ctx2d.beginPath();
      const offset = (pass - 1) * 18;
      for (let i = 0; i < wave.length; i += 4) {
        const x = (i / wave.length) * w;
        const y = h / 2 + offset + ((wave[(i + pass * 60) % wave.length] - 128) / 128) * h * 0.4;
        i === 0 ? ctx2d.moveTo(x, y) : ctx2d.lineTo(x, y);
      }
      ctx2d.strokeStyle = `hsla(${hue + pass * 30}, 90%, ${60 + pass * 10}%, ${0.9 - pass * 0.25})`;
      ctx2d.stroke();
    }
  }

  // --- Modus 3: radialt spektrum ---------------------------------------------
  function drawRadial(w, h) {
    fade(w, h, 0.25);
    const cx = w / 2;
    const cy = h / 2;
    const base = Math.min(w, h) * (0.16 + beat * 0.04);
    const n = 96;
    rot += 0.003 + beat * 0.01;
    for (let i = 0; i < n; i++) {
      const v = freq[Math.floor((i / n) * freq.length * 0.35)] / 255;
      const a = rot + (i / n) * Math.PI * 2;
      const len = v ** 1.2 * Math.min(w, h) * 0.32;
      ctx2d.strokeStyle = `hsla(${hue + i * 3}, 90%, ${50 + v * 40}%, 0.9)`;
      ctx2d.lineWidth = 4;
      ctx2d.beginPath();
      ctx2d.moveTo(cx + Math.cos(a) * base, cy + Math.sin(a) * base);
      ctx2d.lineTo(cx + Math.cos(a) * (base + len), cy + Math.sin(a) * (base + len));
      ctx2d.stroke();
    }
    ctx2d.beginPath();
    ctx2d.arc(cx, cy, base * 0.92, 0, Math.PI * 2);
    ctx2d.strokeStyle = `hsla(${hue}, 80%, 70%, ${0.3 + beat * 0.6})`;
    ctx2d.lineWidth = 2 + beat * 6;
    ctx2d.stroke();
  }

  // --- Modus 4: partikler på beat --------------------------------------------
  function drawParticles(w, h, hit) {
    fade(w, h, 0.09);
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) / 600;
    if (hit) {
      for (let i = 0; i < 90; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (3 + Math.random() * 8) * scale;
        particles.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, size: (4 + Math.random() * 8) * scale, hue: hue + Math.random() * 60 });
      }
    }
    // Jevn strøm av små partikler styrt av total energi
    const n = Math.round(energy * 8);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = (0.6 + Math.random() * 2.5) * scale;
      particles.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, size: (2 + Math.random() * 4) * scale, hue: hue + 120 + Math.random() * 40 });
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 1 + 0.012 * dt;
      p.vy *= 1 + 0.012 * dt;
      p.life -= 0.007 * dt;
      if (p.life <= 0 || p.y < -20 || p.y > h + 20 || p.x < -20 || p.x > w + 20) {
        particles.splice(i, 1);
        continue;
      }
      const r = p.size * (0.4 + p.life * 0.6);
      ctx2d.fillStyle = `hsla(${p.hue}, 95%, 60%, ${p.life * 0.25})`;
      ctx2d.beginPath();
      ctx2d.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
      ctx2d.fill();
      ctx2d.fillStyle = `hsla(${p.hue}, 95%, ${60 + p.life * 30}%, ${p.life})`;
      ctx2d.beginPath();
      ctx2d.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx2d.fill();
    }
    if (particles.length > 1500) particles.splice(0, particles.length - 1500);
    ctx2d.fillStyle = `hsla(${hue}, 90%, 85%, ${0.3 + beat * 0.6})`;
    ctx2d.beginPath();
    ctx2d.arc(cx, cy, (10 + beat * 40) * scale, 0, Math.PI * 2);
    ctx2d.fill();
  }

  // --- Modus 5: tunnel av ringer ---------------------------------------------
  function drawTunnel(w, h, hit) {
    fade(w, h, 0.22);
    const cx = w / 2;
    const cy = h / 2;
    if (hit) rings.push({ r: 6, hue: hue + Math.random() * 80, width: 4 + beat * 8 });
    if (performance.now() - lastRing > 230) {
      lastRing = performance.now();
      rings.push({ r: 6, hue: hue + 40, width: 2 });
    }
    let high = 0;
    for (let i = 100; i < 300; i++) high += freq[i];
    high /= 200 * 255;
    const max = Math.hypot(w, h) / 2;
    for (let i = rings.length - 1; i >= 0; i--) {
      const ring = rings[i];
      ring.r += (1.5 + ring.r * 0.035 + beat * 2) * dt;
      if (ring.r > max) {
        rings.splice(i, 1);
        continue;
      }
      const alpha = Math.min(1, (1 - ring.r / max) * 1.3);
      ctx2d.strokeStyle = `hsla(${ring.hue}, 90%, 65%, ${alpha})`;
      ctx2d.lineWidth = ring.width;
      ctx2d.beginPath();
      const wob = high * 25 + energy * 10;
      for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 32) {
        const r = ring.r + Math.sin(a * 6 + rot) * wob;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        a === 0 ? ctx2d.moveTo(x, y) : ctx2d.lineTo(x, y);
      }
      ctx2d.stroke();
    }
    rot += 0.02 * dt;
  }

  function frame() {
    requestAnimationFrame(frame);
    if (!analyser && !tryConnect()) return;
    const now = performance.now();
    dt = Math.min((now - lastFrame) / 16.7, 5);
    lastFrame = now;
    const { w, h } = resize();
    analyser.getByteFrequencyData(freq);
    analyser.getByteTimeDomainData(wave);
    const hit = detectBeat();
    frames++;
    hue = (hue + 0.15 + beat * 0.5) % 360;

    if (autoCycleSeconds && performance.now() - lastCycle > autoCycleSeconds * 1000) next();

    switch (MODES[mode]) {
      case "bars": drawBars(w, h); break;
      case "scope": drawScope(w, h); break;
      case "radial": drawRadial(w, h); break;
      case "particles": drawParticles(w, h, hit); break;
      case "tunnel": drawTunnel(w, h, hit); break;
    }
  }

  function next() {
    mode = (mode + 1) % MODES.length;
    lastCycle = performance.now();
    ctx2d.fillStyle = "#0a0a0e";
    const { w, h } = resize();
    ctx2d.fillRect(0, 0, w, h);
  }

  requestAnimationFrame(frame);

  return {
    next,
    get modeName() {
      return MODES[mode];
    },
    get debug() {
      return { beats, energy, bassAvg, particles: particles.length, rings: rings.length, frames };
    },
  };
}
