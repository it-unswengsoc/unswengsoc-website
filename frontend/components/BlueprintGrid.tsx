'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

export function BlueprintGrid() {
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !bgRef.current) return;

    const el = bgRef.current;
    // The grid tiles every 20px, so drifting exactly one tile diagonally and
    // looping is seamless. transform-only (no background-position animation),
    // so this is compositor-driven rather than repainting the gradient each frame.
    const tween = gsap.to(el, {
      x: -20,
      y: -20,
      duration: 45,
      ease: 'none',
      repeat: -1,
    });

    // Browsers already throttle rAF in hidden tabs, but pausing explicitly means
    // the tween doesn't silently jump when the tab regains focus after a long idle.
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
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main grid background — inset beyond the viewport by one tile so the
          drift above never exposes an edge seam */}
      <div ref={bgRef} className="blueprint-bg" style={{ inset: '-24px' }} />

      {/* Edge marks border */}
      <div className="edge-marks" />
    </div>
  );
}
