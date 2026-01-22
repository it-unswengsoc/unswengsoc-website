'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const isComplete = loadingProgress >= 100;

  useEffect(() => {
    // Animate loading bar
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // Updates every 40ms to reach 100% in 2 seconds

    // Notify parent after 2.5 seconds (extra 0.5s for logo fade-out animation)
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
      className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isComplete ? 0 : 1,
          scale: isComplete ? 0.8 : 1
        }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/static-logo.png"
          alt="UNSW Engineering Society Logo"
          width={150}
          height={150}
          priority
        />
      </motion.div>

      {/* Loading Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-white"
          style={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </motion.div>
  );
}
