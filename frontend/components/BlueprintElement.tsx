'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BlueprintElementProps {
  id: string;
  label: string;
  children: ReactNode | ((isHovered: boolean) => ReactNode);
  style: React.CSSProperties;
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
  onClick: () => void;
  animationDelay?: number;
  className?: string;
  disableEntrance?: boolean;
}

export default function BlueprintElement({
  id,
  label,
  children,
  style,
  labelPosition,
  onClick,
  animationDelay = 0,
  className = '',
  disableEntrance = false,
}: BlueprintElementProps) {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Label positioning based on labelPosition prop
  const getLabelStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      whiteSpace: 'nowrap',
      fontSize: 'clamp(0.8rem, 2vw, 1.4rem)',
      letterSpacing: '2px',
      textTransform: 'lowercase',
      color: 'var(--text-color)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: isHovered ? 1 : 0,
      transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
    };

    switch (labelPosition) {
      case 'top':
        return { ...base, top: 'clamp(-60px, -10vw, -80px)', left: '50%', transform: isHovered ? 'translateX(-50%)' : 'translateX(-50%) translateY(-5px)' };
      case 'bottom':
        return { ...base, bottom: 'clamp(-80px, -12vw, -120px)', left: '45%', transform: isHovered ? 'translateX(-50%)' : 'translateX(-50%) translateY(5px)' };
      case 'left':
        return { ...base, left: 'clamp(-150px, -20vw, -225px)', top: '50%', transform: isHovered ? 'translateY(-50%)' : 'translateY(-50%) translateX(-5px)' };
      case 'right':
        return { ...base, right: 'clamp(-120px, -18vw, -190px)', top: '60%', transform: isHovered ? 'translateY(-50%)' : 'translateY(-50%) translateX(5px)' };
      default:
        return base;
    }
  };

  // Line connecting label to element
  const getLineStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      background: 'var(--blueprint-border)',
      transition: 'transform 0.3s ease',
      transformOrigin: labelPosition === 'left' || labelPosition === 'top' ? 'right center' : 'left center',
      transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
    };

    switch (labelPosition) {
      case 'top':
        return { ...base, width: '1px', height: '20px', top: '-22px', left: '50%', transformOrigin: 'bottom center', transform: isHovered ? 'scaleY(1)' : 'scaleY(0)' };
      case 'bottom':
        return { ...base, width: '1px', height: '60px', bottom: '-75px', left: '45%', transformOrigin: 'top center', transform: isHovered ? 'scaleY(1)' : 'scaleY(0)' };
      case 'left':
        return { ...base, width: '40px', height: '1px', left: '-60px', top: '50%' };
      case 'right':
        return { ...base, width: '40px', height: '1px', right: '-55px', top: '60%' };
      default:
        return base;
    }
  };

  // Dot at connection point
  const getDotStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: '6px',
      height: '6px',
      background: 'var(--blueprint-border)',
      borderRadius: '50%',
      transition: 'transform 0.2s ease',
      transform: isHovered ? 'scale(1)' : 'scale(0)',
    };

    switch (labelPosition) {
      case 'top':
        return { ...base, top: '-5px', left: '50%', marginLeft: '-3px' };
      case 'bottom':
        return { ...base, bottom: '-20px', left: '45%', marginLeft: '-3px' };
      case 'left':
        return { ...base, left: '-25px', top: '50%', marginTop: '-3px' };
      case 'right':
        return { ...base, right: '-20px', top: '60%', marginTop: '-3px' };
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

      {/* Connection dot */}
      <div style={getDotStyles()} />

      {/* Connection line */}
      <div style={getLineStyles()} />

      {/* Label */}
      <div style={getLabelStyles()}>{label}</div>

      {/* Glow effect on hover */}
      <div
        className="element-glow"
        style={{
          opacity: isHovered ? 0.5 : 0,
        }}
      />
    </>
  );

  if (disableEntrance) {
    return (
      <div
        ref={elementRef}
        data-element={id}
        className={`blueprint-element ${className}`}
        style={{ ...style, opacity: 0 }}
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
      style={style}
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
