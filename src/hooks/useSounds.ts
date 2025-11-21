import { useCallback, useRef, useEffect } from 'react';

type SoundName = 'click' | 'success' | 'energyGain' | 'heartFill' | 'stageUp' | 'lowEnergy' | 'error';

/**
 * Custom hook for managing retro sound effects
 * Uses Web Audio API to generate simple 8-bit style sounds
 */
export function useSounds() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef(false);

  useEffect(() => {
    // Initialize AudioContext on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    // Listen for first click to initialize audio (browser requirement)
    document.addEventListener('click', initAudio, { once: true });

    return () => {
      document.removeEventListener('click', initAudio);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'square') => {
    if (isMutedRef.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, []);

  const play = useCallback((sound: SoundName) => {
    if (isMutedRef.current) return;

    switch (sound) {
      case 'click':
        // Short beep
        playTone(800, 0.1, 'square');
        break;

      case 'success':
        // Happy ascending notes
        playTone(523, 0.1, 'square'); // C5
        setTimeout(() => playTone(659, 0.1, 'square'), 100); // E5
        setTimeout(() => playTone(784, 0.15, 'square'), 200); // G5
        break;

      case 'energyGain':
        // Quick rising chirp
        playTone(400, 0.08, 'sine');
        setTimeout(() => playTone(600, 0.08, 'sine'), 60);
        break;

      case 'heartFill':
        // Magical chime
        playTone(1047, 0.12, 'sine'); // C6
        setTimeout(() => playTone(1319, 0.15, 'sine'), 100); // E6
        break;

      case 'stageUp':
        // Victory fanfare
        playTone(523, 0.15, 'square'); // C5
        setTimeout(() => playTone(659, 0.15, 'square'), 150); // E5
        setTimeout(() => playTone(784, 0.15, 'square'), 300); // G5
        setTimeout(() => playTone(1047, 0.3, 'square'), 450); // C6
        break;

      case 'lowEnergy':
        // Sad descending notes
        playTone(400, 0.15, 'triangle');
        setTimeout(() => playTone(300, 0.2, 'triangle'), 150);
        break;

      case 'error':
        // Buzzer
        playTone(200, 0.2, 'sawtooth');
        break;

      default:
        break;
    }
  }, [playTone]);

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current;
    return isMutedRef.current;
  }, []);

  return { play, toggleMute };
}
