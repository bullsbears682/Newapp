// Advanced Audio Engine for PainEase Music Therapy
class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.oscillators = [];
    this.audioBuffers = {};
    this.currentSessions = new Map();
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.7;
      this.isInitialized = true;
      
      // Generate healing frequency buffers
      await this.generateHealingFrequencies();
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
    }
  }

  async generateHealingFrequencies() {
    const frequencies = {
      // Solfeggio Frequencies for healing
      '174Hz': 174,   // Pain relief
      '285Hz': 285,   // Tissue healing
      '396Hz': 396,   // Liberation from fear
      '417Hz': 417,   // Facilitating change
      '528Hz': 528,   // DNA repair, love frequency
      '639Hz': 639,   // Relationships, connection
      '741Hz': 741,   // Awakening intuition
      '852Hz': 852,   // Spiritual order
      '963Hz': 963,   // Divine consciousness
    };

    for (const [name, freq] of Object.entries(frequencies)) {
      this.audioBuffers[name] = this.createToneBuffer(freq, 30); // 30 seconds
    }
  }

  createToneBuffer(frequency, duration) {
    const sampleRate = this.audioContext.sampleRate;
    const numSamples = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(2, numSamples, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < numSamples; i++) {
        // Create gentle sine wave with fade in/out
        const time = i / sampleRate;
        const fadeTime = 2; // 2 seconds fade
        let envelope = 1;
        
        if (time < fadeTime) {
          envelope = time / fadeTime;
        } else if (time > duration - fadeTime) {
          envelope = (duration - time) / fadeTime;
        }
        
        channelData[i] = Math.sin(2 * Math.PI * frequency * time) * envelope * 0.3;
      }
    }
    
    return buffer;
  }

  // Binaural Beats for pain relief
  playBinauralBeats(baseFreq = 200, beatFreq = 10, duration = 300) {
    if (!this.isInitialized) return null;

    const sessionId = Date.now().toString();
    const leftOsc = this.audioContext.createOscillator();
    const rightOsc = this.audioContext.createOscillator();
    const leftGain = this.audioContext.createGain();
    const rightGain = this.audioContext.createGain();
    const merger = this.audioContext.createChannelMerger(2);

    // Setup left channel (base frequency)
    leftOsc.frequency.value = baseFreq;
    leftOsc.type = 'sine';
    leftOsc.connect(leftGain);
    leftGain.connect(merger, 0, 0);

    // Setup right channel (base + beat frequency)
    rightOsc.frequency.value = baseFreq + beatFreq;
    rightOsc.type = 'sine';
    rightOsc.connect(rightGain);
    rightGain.connect(merger, 0, 1);

    merger.connect(this.masterGain);

    // Set initial volume
    leftGain.gain.value = 0.2;
    rightGain.gain.value = 0.2;

    // Fade in
    leftGain.gain.exponentialRampToValueAtTime(0.3, this.audioContext.currentTime + 2);
    rightGain.gain.exponentialRampToValueAtTime(0.3, this.audioContext.currentTime + 2);

    // Start oscillators
    leftOsc.start(this.audioContext.currentTime);
    rightOsc.start(this.audioContext.currentTime);

    // Store session
    this.currentSessions.set(sessionId, {
      leftOsc, rightOsc, leftGain, rightGain, merger,
      type: 'binaural'
    });

    // Auto-stop after duration
    setTimeout(() => {
      this.stopSession(sessionId);
    }, duration * 1000);

    return sessionId;
  }

  // Nature sounds using noise generation
  playNatureSounds(type = 'rain', duration = 300) {
    if (!this.isInitialized) return null;

    const sessionId = Date.now().toString();
    let source;

    switch (type) {
      case 'rain':
        source = this.createRainSound();
        break;
      case 'ocean':
        source = this.createOceanSound();
        break;
      case 'forest':
        source = this.createForestSound();
        break;
      default:
        source = this.createWhiteNoise();
    }

    const gainNode = this.audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(this.masterGain);
    gainNode.gain.value = 0.4;

    source.start(this.audioContext.currentTime);

    this.currentSessions.set(sessionId, {
      source, gainNode,
      type: 'nature'
    });

    setTimeout(() => {
      this.stopSession(sessionId);
    }, duration * 1000);

    return sessionId;
  }

  createRainSound() {
    const bufferSize = this.audioContext.sampleRate * 2; // 2 seconds
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate brown noise for rain effect
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      const brown = (lastOut + (0.02 * white)) / 1.02;
      lastOut = brown;
      data[i] = brown * 0.3;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    
    // Add filtering for more realistic rain sound
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 500;
    source.connect(filter);
    
    return filter;
  }

  createOceanSound() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.type = 'sine';
    oscillator.frequency.value = 0.1; // Very low frequency for wave movement
    
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    // Create wave-like amplitude modulation
    const noiseSource = this.createWhiteNoise();
    const noiseGain = this.audioContext.createGain();
    noiseGain.gain.value = 0.3;
    
    noiseSource.connect(noiseGain);
    noiseGain.connect(filter);
    
    // LFO for wave motion
    oscillator.connect(gainNode.gain);
    gainNode.gain.value = 0;
    
    noiseSource.start();
    oscillator.start();
    
    return filter;
  }

  createForestSound() {
    // Combine multiple elements for forest ambience
    const mainNoise = this.createWhiteNoise();
    const filter1 = this.audioContext.createBiquadFilter();
    const filter2 = this.audioContext.createBiquadFilter();
    
    filter1.type = 'bandpass';
    filter1.frequency.value = 1000;
    filter1.Q.value = 0.5;
    
    filter2.type = 'highpass';
    filter2.frequency.value = 2000;
    
    mainNoise.connect(filter1);
    filter1.connect(filter2);
    
    mainNoise.start();
    
    return filter2;
  }

  createWhiteNoise() {
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    
    return source;
  }

  // Play healing frequencies
  playHealingFrequency(frequency = '528Hz', duration = 300) {
    if (!this.isInitialized || !this.audioBuffers[frequency]) return null;

    const sessionId = Date.now().toString();
    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    source.buffer = this.audioBuffers[frequency];
    source.loop = true;
    source.connect(gainNode);
    gainNode.connect(this.masterGain);
    gainNode.gain.value = 0.4;

    source.start(this.audioContext.currentTime);

    this.currentSessions.set(sessionId, {
      source, gainNode,
      type: 'healing'
    });

    setTimeout(() => {
      this.stopSession(sessionId);
    }, duration * 1000);

    return sessionId;
  }

  // Progressive pain relief sequence
  async playPainReliefSequence() {
    if (!this.isInitialized) return null;

    const sessionId = Date.now().toString();
    const sequence = [
      { freq: '174Hz', duration: 60 },  // Pain relief
      { freq: '285Hz', duration: 60 },  // Tissue healing
      { freq: '528Hz', duration: 120 }, // DNA repair
      { freq: '741Hz', duration: 60 },  // Awakening
    ];

    let currentStep = 0;
    const nextStep = () => {
      if (currentStep < sequence.length) {
        const step = sequence[currentStep];
        this.playHealingFrequency(step.freq, step.duration);
        currentStep++;
        setTimeout(nextStep, step.duration * 1000);
      }
    };

    nextStep();
    return sessionId;
  }

  stopSession(sessionId) {
    const session = this.currentSessions.get(sessionId);
    if (!session) return;

    try {
      // Fade out before stopping
      const fadeTime = 1; // 1 second fade
      const now = this.audioContext.currentTime;

      if (session.leftGain) {
        session.leftGain.gain.exponentialRampToValueAtTime(0.001, now + fadeTime);
        session.rightGain.gain.exponentialRampToValueAtTime(0.001, now + fadeTime);
      }
      if (session.gainNode) {
        session.gainNode.gain.exponentialRampToValueAtTime(0.001, now + fadeTime);
      }

      // Stop sources after fade
      setTimeout(() => {
        if (session.leftOsc) {
          session.leftOsc.stop();
          session.rightOsc.stop();
        }
        if (session.source) {
          session.source.stop();
        }
      }, fadeTime * 1000);

      this.currentSessions.delete(sessionId);
    } catch (error) {
      console.error('Error stopping audio session:', error);
    }
  }

  stopAllSessions() {
    for (const sessionId of this.currentSessions.keys()) {
      this.stopSession(sessionId);
    }
  }

  setMasterVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  // Resume audio context (required for browser autoplay policies)
  async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

export default new AudioEngine();