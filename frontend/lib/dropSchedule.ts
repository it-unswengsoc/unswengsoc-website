'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};
// Client/server render the same thing on first paint (null), avoiding hydration
// mismatches from time-dependent content; flips to true right after mount.
export function useHasMounted() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

// The "Nightshift" drop — the only drop, Wed 12 Aug 2026, 12:00pm Sydney time
// (AEST, UTC+10 — this is before DST starts in early October, so +10 is correct).
export const NIGHTSHIFT_DROP = new Date('2026-08-12T12:00:00+10:00');

export interface DropStatus {
  hasMounted: boolean;
  /** True once the Nightshift drop time has passed — this is the only purchase gate. */
  isLive: boolean;
  target: Date;
}

// Local-testing-only override: set NEXT_PUBLIC_MERCH_FORCE_LIVE=true in
// .env.local to skip the countdown gate. Never set in a deployed environment —
// since it only ever lives in a gitignored .env.local, there's nothing to
// remember to strip out before shipping; production just won't have it set.
const FORCE_LIVE = process.env.NEXT_PUBLIC_MERCH_FORCE_LIVE === 'true';

// Single source of truth for "is the drop live yet" — shared by the countdown
// display and the buy-page gate, so they can never disagree about whether
// purchasing should be open.
export function useDropStatus(): DropStatus {
  const hasMounted = useHasMounted();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return { hasMounted, isLive: FORCE_LIVE || now >= NIGHTSHIFT_DROP.getTime(), target: NIGHTSHIFT_DROP };
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
