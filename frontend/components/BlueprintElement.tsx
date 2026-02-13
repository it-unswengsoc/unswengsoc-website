'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface CornerOffset {
  x: number;
  y: number;
}

interface CornerOffsets {
  topLeft?: number | CornerOffset;
  topRight?: number | CornerOffset;
  bottomLeft?: number | CornerOffset;
  bottomRight?: number | CornerOffset;
}

interface TooltipOffset {
  x?: number;
  y?: number;
}

interface BlueprintElementProps {
  id: string;
  label: string;
  description?: string;
  children: ReactNode | ((isHovered: boolean) => ReactNode);
  style: React.CSSProperties;
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
  onClick: () => void;
  animationDelay?: number;
  className?: string;
  disableEntrance?: boolean;
  cornerOffset?: number;
  cornerOffsets?: CornerOffsets;
  tooltipOffset?: TooltipOffset;
}

export default function BlueprintElement({
  id,
  label,
  description,
  children,
  style,
  labelPosition,
  onClick,
  animationDelay = 0,
  className = '',
  disableEntrance = false,
  cornerOffset = -1,
  cornerOffsets,
  tooltipOffset,
}: BlueprintElementProps) {
  // Helper to parse corner offset (number or {x, y} object)
  const parseOffset = (val: number | CornerOffset | undefined, fallback: number): { x: number; y: number } => {
    if (val === undefined) return { x: fallback, y: fallback };
    if (typeof val === 'number') return { x: val, y: val };
    return val;
  };

  // Individual corner offsets, falling back to cornerOffset
  const offsets = {
    topLeft: parseOffset(cornerOffsets?.topLeft, cornerOffset),
    topRight: parseOffset(cornerOffsets?.topRight, cornerOffset),
    bottomLeft: parseOffset(cornerOffsets?.bottomLeft, cornerOffset),
    bottomRight: parseOffset(cornerOffsets?.bottomRight, cornerOffset),
  };
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // GSAP hover animations
  useEffect(() => {
    if (!elementRef.current || !glowRef.current) return;

    const tl = gsap.timeline({ paused: true });

    // Animate label
    if (labelRef.current) {
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 0);
    }

    // Animate description
    if (descRef.current && description) {
      tl.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, 0.1);
    }

    // Animate tooltip box
    if (tooltipRef.current) {
      tl.to(tooltipRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      }, 0);
    }

    // Pulse glow effect - set initial state
    tl.fromTo(glowRef.current, {
      opacity: 0,
      scale: 0.9,
    }, {
      opacity: 0.6,
      scale: 1.1,
      duration: 0.5,
      ease: 'power2.out',
    }, 0);

    // Animate element scale
    tl.to(elementRef.current, {
      scale: 1.08,
      duration: 0.4,
      ease: 'power2.out',
    }, 0);

    if (isHovered) {
      tl.play();
    } else {
      tl.reverse();
    }

    return () => {
      tl.kill();
    };
  }, [isHovered, description]);

  // Tooltip positioning based on labelPosition prop
  const getTooltipStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      padding: '16px 20px',
      background: 'rgba(10, 25, 41, 0.98)',
      border: '1px solid rgba(65, 145, 220, 0.4)',
      borderRadius: '4px',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      pointerEvents: 'none',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(65, 145, 220, 0.1) inset',
      maxWidth: '240px',
      minWidth: '180px',
    };

    const xOff = tooltipOffset?.x ?? 0;
    const yOff = tooltipOffset?.y ?? 0;

    switch (labelPosition) {
      case 'top':
        return { ...base, bottom: `calc(100% + 25px + ${yOff}px)`, left: `calc(50% + ${xOff}px)`, transform: 'translateX(-50%)' };
      case 'bottom':
        return { ...base, top: `calc(100% + 25px + ${yOff}px)`, left: `calc(50% + ${xOff}px)`, transform: 'translateX(-50%)' };
      case 'left':
        return { ...base, right: `calc(100% + 25px + ${xOff}px)`, top: `calc(50% + ${yOff}px)`, transform: 'translateY(-50%)' };
      case 'right':
        return { ...base, left: `calc(100% + 15px + ${xOff}px)`, top: `calc(50% + ${yOff}px)`, transform: 'translateY(-50%)' };
      default:
        return base;
    }
  };

  const content = (
    <>
      {/* SVG Content */}
      <div className="blueprint-svg-container">
        {typeof children === 'function' ? children(isHovered) : children}
      </div>

      {/* Enhanced Tooltip */}
      {isHovered && (
        <div
          ref={tooltipRef}
          style={{
            ...getTooltipStyles(),
            opacity: 0,
            scale: 0.8,
          }}
        >
          <div
            ref={labelRef}
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: description ? '8px' : 0,
              opacity: 0,
              transform: 'translateY(-10px)',
            }}
          >
            {label}
          </div>
          {description && (
            <div
              ref={descRef}
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 'clamp(0.8rem, 1.5vw, 0.8rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.5,
                opacity: 0,
                transform: 'translateY(-5px)',
                fontWeight: 700,
              }}
            >
              {description}
            </div>
          )}
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 'clamp(0.55rem, 1vw, 0.65rem)',
              color: 'rgba(65, 145, 220, 0.9)',
              marginTop: '10px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(65, 145, 220, 0.15)',
              letterSpacing: '1px',
              fontWeight: 900,
            }}
          >
            Click to explore →
          </div>
        </div>
      )}

      {/* Enhanced Glow effect on hover */}
      <div
        ref={glowRef}
        className="element-glow"
        style={{
          position: 'absolute',
          inset: '-30px',
          background: 'radial-gradient(ellipse at center, rgba(65, 145, 220, 0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
          opacity: 0,
          scale: 0.9,
        }}
      />

      {/* Decorative corner brackets */}
      {isHovered && (
        <>
          <div style={{
            position: 'absolute',
            top: offsets.topLeft.y,
            left: offsets.topLeft.x,
            width: '16px',
            height: '16px',
            borderTop: '1.5px solid rgba(65, 145, 220, 0.6)',
            borderLeft: '1.5px solid rgba(65, 145, 220, 0.6)',
          }} />
          <div style={{
            position: 'absolute',
            top: offsets.topRight.y,
            right: offsets.topRight.x,
            width: '16px',
            height: '16px',
            borderTop: '1.5px solid rgba(65, 145, 220, 0.6)',
            borderRight: '1.5px solid rgba(65, 145, 220, 0.6)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: offsets.bottomLeft.y,
            left: offsets.bottomLeft.x,
            width: '16px',
            height: '16px',
            borderBottom: '1.5px solid rgba(65, 145, 220, 0.6)',
            borderLeft: '1.5px solid rgba(65, 145, 220, 0.6)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: offsets.bottomRight.y,
            right: offsets.bottomRight.x,
            width: '16px',
            height: '16px',
            borderBottom: '1.5px solid rgba(65, 145, 220, 0.6)',
            borderRight: '1.5px solid rgba(65, 145, 220, 0.6)',
          }} />
        </>
      )}
    </>
  );

  if (disableEntrance) {
    return (
      <div
        ref={elementRef}
        data-element={id}
        className={`blueprint-element ${className}`}
        style={{ ...style, opacity: 0, transition: 'transform 0.4s ease', zIndex: isHovered ? 50 : 'auto' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      ref={elementRef}
      data-element={id}
      className={`blueprint-element ${className}`}
      style={{ ...style, zIndex: isHovered ? 50 : 'auto' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: animationDelay, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {content}
    </motion.div>
  );
}
