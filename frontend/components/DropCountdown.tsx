'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { hexToRgba } from '@/lib/utils';
import { useDropStatus, getTimeLeft } from '@/lib/dropSchedule';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

// Odometer-style flip: each digit slides in from the direction it "rolled" from
// and the outgoing digit slides out the same way, keyed by value so only the
// changed digits animate.
function FlipDigits({ value }: { value: string }) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className="invisible">{value}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function DropCountdown({ accentColor = '#4191dc' }: { accentColor?: string }) {
  const { hasMounted, isLive, target } = useDropStatus();
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Slow ambient glow breathing behind the box while the countdown is actually
  // running — opacity-only (the blur/gradient itself is static CSS), so it's
  // compositor-driven rather than repainting a box-shadow every frame.
  useEffect(() => {
    if (reducedMotion || isLive || !glowRef.current) return;
    const el = glowRef.current;

    const tween = gsap.to(el, {
      opacity: 0.9,
      duration: 2.2,
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
      gsap.set(el, { clearProps: 'opacity' });
    };
  }, [reducedMotion, isLive]);

  if (!hasMounted) return null;

  const boxStyle = {
    borderColor: accentColor,
    borderWidth: '2px',
    backgroundColor: hexToRgba(accentColor, 0.14),
  };

  if (isLive) {
    return (
      <div
        className="w-full border px-6 py-8 md:py-10 text-center font-mono text-sm md:text-base tracking-widest uppercase transition-colors duration-700"
        style={{ ...boxStyle, color: accentColor }}
      >
        Nightshift is live
      </div>
    );
  }

  const { days, hours, minutes, seconds } = getTimeLeft(target);

  return (
    <div className="relative">
      <div
        ref={glowRef}
        aria-hidden
        className="absolute -inset-3 md:-inset-4 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse at center, ${hexToRgba(accentColor, 0.35)} 0%, transparent 70%)`,
          filter: 'blur(6px)',
        }}
      />
      <div
        className="relative w-full border px-6 py-8 md:py-10 transition-colors duration-700"
        style={boxStyle}
      >
        <span
          className="block text-center font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-5 md:mb-7 transition-colors duration-700"
          style={{ color: accentColor }}
        >
          NIGHTSHIFT DROP IN
        </span>
        <div className="flex flex-wrap items-start justify-center gap-x-4 gap-y-4 sm:gap-x-6 md:gap-x-8 font-mono text-white">
          {[
            { value: days, unit: 'DAYS' },
            { value: hours, unit: 'HOURS' },
            { value: minutes, unit: 'MINS' },
            { value: seconds, unit: 'SECS' },
          ].map(({ value, unit }) => (
            <div key={unit} className="flex flex-col items-center gap-1 min-w-0">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold tabular-nums">
                <FlipDigits value={pad(value)} />
              </span>
              <span
                className="text-[10px] md:text-xs tracking-widest font-bold transition-colors duration-700"
                style={{ color: accentColor }}
              >
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
