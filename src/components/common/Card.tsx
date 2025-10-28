import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card = ({ children, className = '', hover = false, glow = false }: CardProps) => {
  const baseStyles = 'bg-dark-lighter rounded-xl p-6 border border-dark-light';
  const hoverStyles = hover ? 'hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300' : '';
  const glowStyles = glow ? 'shadow-lg shadow-primary/30' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${baseStyles} ${hoverStyles} ${glowStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
};
