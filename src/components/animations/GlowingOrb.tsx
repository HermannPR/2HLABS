import { motion } from 'framer-motion';

interface GlowingOrbProps {
  color?: string;
  size?: number;
  blur?: number;
  className?: string;
  reduceMotion?: boolean;
}

/**
 * Animated glowing orb for background decoration
 * Creates ambient, sci-fi atmosphere
 * Supports reduced motion for performance and accessibility
 */
export function GlowingOrb({
  color = '#00E5FF',
  size = 300,
  blur = 100,
  className = '',
  reduceMotion = false,
}: GlowingOrbProps) {
  // Static version for reduced motion or mobile
  if (reduceMotion) {
    return (
      <div
        className={`absolute rounded-full pointer-events-none ${className}`}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity: 0.4,
        }}
      />
    );
  }

  // Full animation version
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        x: [0, 50, -50, 0],
        y: [0, -50, 50, 0],
        scale: [1, 1.2, 0.8, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
