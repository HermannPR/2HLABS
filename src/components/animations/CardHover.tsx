import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardHoverProps {
  children: ReactNode;
  className?: string;
}

/**
 * Simple but visible hover animation for cards
 * Lifts card up with shadow on hover - clear visual feedback
 */
export function CardHover({ children, className = '' }: CardHoverProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {children}
    </motion.div>
  );
}
