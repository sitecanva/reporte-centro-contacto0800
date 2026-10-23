// Synthesized Paper Flip Audio using Web Audio API
// High performance, zero external files, no CORS issues, instant playback

class PageFlipSound {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
    this.initAudio = this.initAudio.bind(this);
    // User interaction is required to unlock AudioContext
    window.addEventListener('click', this.initAudio, { once: true });
    window.addEventListener('keydown', this.initAudio, { once: true });
    window.addEventListener('touchstart', this.initAudio, { once: true });
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  play() {
    if (!this.enabled) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // 1. White noise generator for paper friction
      const bufferSize = ctx.sampleRate * 0.35; // 350ms buffer
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Subtle pink-ish noise texture
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to simulate paper frequency
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      // Slight pitch variation for realism
      const baseFreq = 850 + (Math.random() * 200 - 100);
      filter.frequency.setValueAtTime(baseFreq * 1.5, now);
      filter.frequency.exponentialRampToValueAtTime(baseFreq * 0.6, now + 0.28);
      filter.Q.setValueAtTime(1.8, now);

      // Amplitude envelope (whoosh)
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.35, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.35);

      // 2. Subtle soft low-end 'thud' when page rests
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.26);

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.setValueAtTime(0.001, now + 0.12);
      oscGain.gain.linearRampToValueAtTime(0.18, now + 0.16);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now + 0.12);
      osc.stop(now + 0.30);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

window.pageFlipSound = new PageFlipSound();
