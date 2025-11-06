import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SpinningGlowProps {
  children: ReactNode;
  color1: string;
  color2: string;
  size?: number;
  speed?: number;
  intensity?: number;
  className?: string;
}

/**
 * Dual-color spinning glow effect (yin-yang style)
 * Two semicircular glows rotate around the element
 * Perfect for soul logos with 2-color schemes
 */
export function SpinningGlow({
  children,
  color1,
  color2,
  size = 200,
  speed = 4,
  intensity = 0.6,
  className = '',
}: SpinningGlowProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Spinning dual-color glow layer */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `conic-gradient(
            from 0deg,
            ${color1} 0deg,
            ${color1} 170deg,
            transparent 180deg,
            transparent 190deg,
            ${color2} 190deg,
            ${color2} 350deg,
            transparent 360deg
          )`,
          filter: `blur(20px)`,
          opacity: intensity,
          transform: 'scale(1.2)',
        }}
      />

      {/* Inner tight glow (stationary) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(
            circle,
            ${color1}40 0%,
            ${color2}40 50%,
            transparent 70%
          )`,
          filter: 'blur(8px)',
          opacity: intensity * 0.8,
        }}
      />

      {/* Outer diffuse glow (stationary) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(
            circle,
            ${color1}20 0%,
            ${color2}20 30%,
            transparent 70%
          )`,
          filter: 'blur(30px)',
          opacity: intensity * 0.4,
          transform: 'scale(1.4)',
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
