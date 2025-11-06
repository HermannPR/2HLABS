import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const directionVariants: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 50 },
  down: { x: 0, y: -50 },
  left: { x: 50, y: 0 },
  right: { x: -50, y: 0 },
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const { ref, isInView } = useScrollAnimation({ once });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionVariants[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
