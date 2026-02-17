'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  lineSeparator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  initialDelay?: number;
}

export default function TrueFocus({
  sentence = 'True Focus',
  separator = ' ',
  lineSeparator,
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  initialDelay = 0
}: TrueFocusProps) {
  // Parse into lines and words
  const lines = lineSeparator ? sentence.split(lineSeparator) : [sentence];
  const wordsPerLine = lines.map(line => line.trim().split(separator));
  const allWords = wordsPerLine.flat();

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [hasStarted, setHasStarted] = useState(false);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Handle initial delay before starting animation
  useEffect(() => {
    if (!manualMode && !hasStarted) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true);
        setCurrentIndex(0);
      }, initialDelay * 1000);

      return () => clearTimeout(delayTimeout);
    }
  }, [manualMode, initialDelay, hasStarted]);

  // Handle cycling through words
  useEffect(() => {
    if (!manualMode && hasStarted) {
      const interval = setInterval(
        () => {
          setCurrentIndex(prev => (prev + 1) % allWords.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, allWords.length, hasStarted]);

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
  }, [currentIndex, allWords.length]);

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

  // Track global word index for refs
  let globalIndex = 0;

  return (
    <div
      className="relative flex flex-col gap-0 justify-start items-start"
      ref={containerRef}
      style={{ outline: 'none', userSelect: 'none' }}
    >
      {wordsPerLine.map((lineWords, lineIndex) => (
        <div key={lineIndex} className="flex gap-4 items-center">
          {lineWords.map((word) => {
            const wordIndex = globalIndex++;
            const isActive = wordIndex === currentIndex;
            return (
              <span
                key={wordIndex}
                ref={el => { wordRefs.current[wordIndex] = el; }}
                className="relative text-[2rem] md:text-[3rem] lg:text-[4rem] font-black cursor-pointer"
                style={{
                  filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
                  transition: `filter ${animationDuration}s ease`,
                  outline: 'none',
                  userSelect: 'none',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
                onMouseEnter={() => handleMouseEnter(wordIndex)}
                onMouseLeave={handleMouseLeave}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}

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
