'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

export default function TitleAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // This builds ~45 looping tweens (particles, circuit lines, shapes, rings) —
    // skip the whole ambient field for users who've asked for less motion.
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const intervals: ReturnType<typeof setInterval>[] = [];
    const particles: HTMLDivElement[] = [];
    const lines: HTMLDivElement[] = [];
    const shapes: HTMLDivElement[] = [];
    const readouts: HTMLDivElement[] = [];
    const rings: HTMLDivElement[] = [];

    const ctx = gsap.context(() => {

    // Create floating particles
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '3px';
      particle.style.height = '3px';
      particle.style.borderRadius = '50%';
      particle.style.background = 'rgba(65, 145, 220, 0.4)';
      particle.style.boxShadow = '0 0 8px rgba(65, 145, 220, 0.6)';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particles.push(particle);

      // Animate particle floating
      gsap.to(particle, {
        y: `${Math.random() * 200 - 100}`,
        x: `${Math.random() * 200 - 100}`,
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 8 + 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Create circuit lines
    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.height = '1px';
      line.style.background = 'linear-gradient(90deg, transparent, rgba(65, 145, 220, 0.3), transparent)';
      line.style.width = `${Math.random() * 400 + 200}px`;
      
      const isHorizontal = Math.random() > 0.5;
      if (isHorizontal) {
        line.style.left = `${Math.random() * 50}%`;
        line.style.top = `${Math.random() * 100}%`;
      } else {
        line.style.width = '1px';
        line.style.height = `${Math.random() * 400 + 200}px`;
        line.style.background = 'linear-gradient(180deg, transparent, rgba(65, 145, 220, 0.3), transparent)';
        line.style.left = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 50}%`;
      }
      
      container.appendChild(line);
      lines.push(line);

      // Animate line pulsing
      gsap.to(line, {
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Create geometric shapes
    for (let i = 0; i < 5; i++) {
      const shape = document.createElement('div');
      shape.style.position = 'absolute';
      shape.style.width = `${Math.random() * 80 + 40}px`;
      shape.style.height = `${Math.random() * 80 + 40}px`;
      shape.style.border = '1px solid rgba(65, 145, 220, 0.2)';
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      // Random shape type
      const shapeType = Math.random();
      if (shapeType < 0.33) {
        shape.style.borderRadius = '50%';
      } else if (shapeType < 0.66) {
        shape.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      }
      
      container.appendChild(shape);
      shapes.push(shape);

      // Rotate and float
      gsap.to(shape, {
        rotation: 360,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(shape, {
        y: `${Math.random() * 100 - 50}`,
        x: `${Math.random() * 100 - 50}`,
        scale: Math.random() * 0.5 + 0.8,
        duration: Math.random() * 10 + 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Create data readouts
    const corners = [
      { top: '8%', left: '5%' },
      { top: '8%', right: '5%' },
      { bottom: '25%', left: '5%' },
      { bottom: '25%', right: '5%' },
    ];

    corners.forEach((pos, idx) => {
      const readout = document.createElement('div');
      readout.style.position = 'absolute';
      Object.assign(readout.style, pos);
      readout.style.fontFamily = 'var(--font-inter), sans-serif';
      readout.style.fontSize = '0.7rem';
      readout.style.color = 'rgba(65, 145, 220, 0.5)';
      readout.style.letterSpacing = '1px';
      readout.style.fontWeight = '500';
      
      const labels = ['SYS', 'PWR', 'NET', 'OPT'];
      readout.innerHTML = `
        <div style="margin-bottom: 4px; font-size: 0.6rem; opacity: 0.6; font-weight: 300;">${labels[idx]}</div>
        <div style="font-family: var(--font-inter), sans-serif; font-size: 0.75rem; font-weight: 500;">
          <span class="readout-value">${Math.floor(Math.random() * 100)}</span>%
        </div>
      `;
      
      container.appendChild(readout);
      readouts.push(readout);

      // Animate numbers changing
      const valueEl = readout.querySelector('.readout-value');
      if (valueEl) {
        const interval = setInterval(() => {
          const newVal = Math.floor(Math.random() * 100);
          gsap.to(valueEl, {
            innerHTML: newVal,
            duration: 0.3,
            snap: { innerHTML: 1 },
          });
        }, 3000 + Math.random() * 2000);
        intervals.push(interval);
      }
    });

    // Create pulsing rings in center
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('div');
      ring.style.position = 'absolute';
      ring.style.left = '50%';
      ring.style.top = '50%';
      ring.style.transform = 'translate(-50%, -50%)';
      ring.style.width = '400px';
      ring.style.height = '400px';
      ring.style.borderRadius = '50%';
      ring.style.border = '1px solid rgba(65, 145, 220, 0.15)';
      ring.style.pointerEvents = 'none';
      
      container.appendChild(ring);
      rings.push(ring);

      // Pulse animation with delay
      gsap.to(ring, {
        scale: 1.5,
        opacity: 0,
        duration: 4,
        repeat: -1,
        delay: i * 1.3,
        ease: 'power1.out',
      });
    }

    }, container);

    return () => {
      intervals.forEach(clearInterval);
      ctx.revert();
      particles.forEach(p => p.remove());
      lines.forEach(l => l.remove());
      shapes.forEach(s => s.remove());
      readouts.forEach(r => r.remove());
      rings.forEach(r => r.remove());
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
