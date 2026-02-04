'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const isComplete = loadingProgress >= 100;
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // GSAP animate small dot around circle path
    if (dotRef.current) {
      const radius = 90;
      const centerX = 100;
      const centerY = 100;
      
      gsap.to(dotRef.current, {
        duration: 2,
        ease: 'none',
        repeat: -1,
        onUpdate: function() {
          const progress = this.progress();
          const angle = progress * Math.PI * 2 + Math.PI; // Start at left (9 o'clock)
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          if (dotRef.current) {
            dotRef.current.setAttribute('cx', x.toString());
            dotRef.current.setAttribute('cy', y.toString());
          }
        },
      });
    }

    // Update progress state
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Notify parent after 2.5 seconds
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-[#030712] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isComplete ? 0 : 1,
          scale: isComplete ? 0.8 : 1
        }}
        transition={{ duration: 0.5 }}
        className="relative"
        style={{ width: '200px', height: '200px' }}
      >
        {/* SVG Circle around logo */}
        <svg
          width="200"
          height="200"
          className="absolute top-0 left-0"
          viewBox="0 0 200 200"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Outer circle path */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />
          {/* Small dot that travels around */}
          <circle
            ref={dotRef}
            cx="100"
            cy="10"
            r="5"
            fill="rgba(255, 255, 255, 0.9)"
            filter="url(#glow)"
          />
        </svg>
        
        <div className="absolute top-1/2 left-1/2 z-10" style={{ transform: 'translate(calc(-50% + 5px), calc(-50% + 5px))' }}>
          <Image
            src="/static-logo.png"
            alt="UNSW Engineering Society Logo"
            width={150}
            height={150}
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
