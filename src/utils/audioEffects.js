// Web Audio API Synthesizer for rich, instant celebratory sound effects

let audioCtx = null;

const getAudioContext = () => {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
    return audioCtx;
};

// 1. Party Popper Sound: Fast acoustic punch with glitter noise
export const playPopperSound = () => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Low pop punch
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
        oscGain.gain.setValueAtTime(0.7, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);

        // Noise sparkle burst
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3500, now);
        filter.Q.setValueAtTime(1.5, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + 0.25);
    } catch (e) {
        console.warn("Audio effect error:", e);
    }
};

// 2. Firework Cracker Sound: Rocket whistle + heavy explosive boom + crackle
export const playFireworkSound = () => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Rocket Whistle
        const whistle = ctx.createOscillator();
        const whistleGain = ctx.createGain();
        whistle.type = 'sawtooth';
        whistle.frequency.setValueAtTime(500, now);
        whistle.frequency.exponentialRampToValueAtTime(1400, now + 0.2);
        whistleGain.gain.setValueAtTime(0.2, now);
        whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        whistle.connect(whistleGain);
        whistleGain.connect(ctx.destination);
        whistle.start(now);
        whistle.stop(now + 0.22);

        // Explosive Boom (starts slightly after whistle)
        const boomTime = now + 0.2;
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, boomTime);
        osc.frequency.exponentialRampToValueAtTime(30, boomTime + 0.5);
        oscGain.gain.setValueAtTime(0.9, boomTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.6);
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(boomTime);
        osc.stop(boomTime + 0.6);

        // Sizzle / Crackle Noise
        const bufferSize = ctx.sampleRate * 0.7;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.2));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, boomTime);
        filter.frequency.exponentialRampToValueAtTime(200, boomTime + 0.7);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.6, boomTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.7);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(boomTime);
        noise.stop(boomTime + 0.7);
    } catch (e) {
        console.warn("Audio effect error:", e);
    }
};

// 3. Balloon Pop Sound
export const playBalloonPopSound = () => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.08);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
    } catch (e) {
        console.warn("Audio effect error:", e);
    }
};

// 4. Celebration Chimes: Sweet harmonious chord progression
export const playCelebrationChimes = (noteIndex = 0) => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        // Frequencies for C major celebratory arpeggios (C5, E5, G5, C6, E6, G6)
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        const freq = notes[noteIndex % notes.length];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.8);
    } catch (e) {
        console.warn("Audio effect error:", e);
    }
};

// 5. Grand Finale Fanfare
export const playGrandFinaleFanfare = () => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const now = ctx.currentTime + idx * 0.12;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 1.2);
        });
    } catch (e) {
        console.warn("Audio effect error:", e);
    }
};
