import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card = ({ children, className = '', hover = false, glow = false }: CardProps) => {
  const baseStyles = 'bg-dark-lighter/80 backdrop-blur-sm rounded-xl p-6 border border-white/5 relative overflow-hidden';
  const hoverStyles = hover ? 'hover:border-primary/50 hover:shadow-[0_10px_40px_-10px_rgba(0,229,255,0.15)] hover:-translate-y-1 transition-all duration-300' : '';
  const glowStyles = glow ? 'shadow-lg shadow-primary/20' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${baseStyles} ${hoverStyles} ${glowStyles} ${className}`}
    >
      {/* Subtle gradient overlay for glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
