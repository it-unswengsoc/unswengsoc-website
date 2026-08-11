'use client';

import { useEffect, useState } from 'react';

// Gates the site's idle/ambient GSAP animations (background drift, floating product
// shots, particle fields) — not meant to touch small hover-feedback transitions,
// which respond directly to user action rather than autoplaying.
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}
