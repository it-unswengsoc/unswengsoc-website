'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

export default function TrueFocus({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1
}: TrueFocusProps) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      className="relative flex gap-4 justify-center items-center flex-wrap"
      ref={containerRef}
      style={{ outline: 'none', userSelect: 'none' }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={el => (wordRefs.current[index] = el)}
            className="relative text-[2rem] md:text-[3rem] lg:text-[4rem] font-black cursor-pointer"
            style={{
              filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`,
              outline: 'none',
              userSelect: 'none',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0
        }}
        transition={{
          duration: animationDuration,
          ease: 'easeInOut'
        }}
      >
        {/* Top-left corner */}
        <span
          className="absolute border-[2px] md:border-[3px]"
          style={{
            width: '16px',
            height: '16px',
            top: '-8px',
            left: '-8px',
            borderColor: borderColor,
            borderRight: 'none',
            borderBottom: 'none',
            filter: `drop-shadow(0 0 6px ${borderColor})`
          }}
        />
        {/* Top-right corner */}
        <span
          className="absolute border-[2px] md:border-[3px]"
          style={{
            width: '16px',
            height: '16px',
            top: '-8px',
            right: '-8px',
            borderColor: borderColor,
            borderLeft: 'none',
            borderBottom: 'none',
            filter: `drop-shadow(0 0 6px ${borderColor})`
          }}
        />
        {/* Bottom-left corner */}
        <span
          className="absolute border-[2px] md:border-[3px]"
          style={{
            width: '16px',
            height: '16px',
            bottom: '-8px',
            left: '-8px',
            borderColor: borderColor,
            borderRight: 'none',
            borderTop: 'none',
            filter: `drop-shadow(0 0 6px ${borderColor})`
          }}
        />
        {/* Bottom-right corner */}
        <span
          className="absolute border-[2px] md:border-[3px]"
          style={{
            width: '16px',
            height: '16px',
            bottom: '-8px',
            right: '-8px',
            borderColor: borderColor,
            borderLeft: 'none',
            borderTop: 'none',
            filter: `drop-shadow(0 0 6px ${borderColor})`
          }}
        />
      </motion.div>
    </div>
  );
}
