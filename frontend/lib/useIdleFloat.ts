'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from './useReducedMotion';

interface IdleFloatOptions {
  /** Vertical travel in px (up/down from rest). */
  amplitude?: number;
  /** Seconds per half-cycle. */
  duration?: number;
  /** Stagger start so multiple floated elements don't move in lockstep. */
  delay?: number;
}

// A gentle, looping vertical bob — transform-only (translateY), so it's
// compositor-driven and doesn't trigger layout or repaint on every tick.
export function useIdleFloat(ref: RefObject<HTMLElement | null>, options: IdleFloatOptions = {}) {
  const { amplitude = 8, duration = 3.2, delay = 0 } = options;
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const el = ref.current;

    const tween = gsap.to(el, {
      y: -amplitude,
      duration,
      delay,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const handleVisibility = () => {
      if (document.hidden) tween.pause();
      else tween.resume();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      tween.kill();
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [ref, reducedMotion, amplitude, duration, delay]);
}
