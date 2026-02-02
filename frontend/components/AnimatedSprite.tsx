'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';

interface AnimatedSpriteProps {
  src: string;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  totalFrames: number;
  isHovered: boolean;
  displaySize?: number;
  className?: string;
}

export default function AnimatedSprite({
  src,
  frameWidth,
  frameHeight,
  columns,
  rows,
  totalFrames,
  isHovered,
  displaySize,
  className = '',
}: AnimatedSpriteProps) {
  const spriteRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentFrameRef = useRef(0);
  const [responsiveSize, setResponsiveSize] = useState(displaySize);

  // Calculate responsive size based on screen width
  useEffect(() => {
    const updateSize = () => {
      if (!displaySize) return;
      
      const width = window.innerWidth;
      let scaleFactor = 1;
      
      if (width < 640) {
        // Mobile - 50% of original size
        scaleFactor = 0.5;
      } else if (width < 768) {
        // Small tablets - 65% of original size
        scaleFactor = 0.65;
      } else if (width < 1024) {
        // Tablets - 80% of original size
        scaleFactor = 0.8;
      }
      
      setResponsiveSize(displaySize * scaleFactor);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [displaySize]);

  // Calculate scale if displaySize is provided
  const scale = responsiveSize ? responsiveSize / Math.max(frameWidth, frameHeight) : 1;
  const displayWidth = frameWidth * scale;
  const displayHeight = frameHeight * scale;

  const setFrame = useCallback((frame: number) => {
    if (!spriteRef.current) return;
    const col = frame % columns;
    const row = Math.floor(frame / columns);
    spriteRef.current.style.backgroundPosition = `-${col * displayWidth}px -${row * displayHeight}px`;
    currentFrameRef.current = frame;
  }, [columns, displayWidth, displayHeight]);

  useEffect(() => {
    if (!spriteRef.current) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const startFrame = currentFrameRef.current;
    const endFrame = isHovered ? totalFrames - 1 : 0;

    if (startFrame === endFrame) return;

    const direction = endFrame > startFrame ? 1 : -1;
    const framesToAnimate = Math.abs(endFrame - startFrame);
    const duration = isHovered ? 0.8 : 0.5;
    const frameDelay = duration / framesToAnimate;

    // Create a timeline with discrete frame steps
    const tl = gsap.timeline();

    for (let i = 1; i <= framesToAnimate; i++) {
      const frame = startFrame + (i * direction);
      tl.call(() => setFrame(frame), [], i * frameDelay);
    }

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isHovered, totalFrames, setFrame]);

  return (
    <div
      ref={spriteRef}
      className={`animated-sprite ${className}`}
      style={{
        width: displayWidth,
        height: displayHeight,
        backgroundImage: `url(${src})`,
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${frameWidth * columns * scale}px ${frameHeight * rows * scale}px`,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
