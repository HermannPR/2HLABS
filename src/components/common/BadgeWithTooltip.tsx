import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BadgeWithTooltipProps {
  src: string;
  alt: string;
  tooltip: string;
  className?: string;
  glowEffect?: boolean;
}

export const BadgeWithTooltip = ({
  src,
  alt,
  tooltip,
  className = '',
  glowEffect = false
}: BadgeWithTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-3 px-4 py-2 bg-dark-lighter border border-primary/30 rounded-lg shadow-xl z-50 whitespace-nowrap"
            style={{
              left: '50%'
            }}
          >
            <p className="text-sm text-white font-medium">{tooltip}</p>
            {/* Arrow */}
            <div
              className="absolute top-full -mt-px"
              style={{
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <div className="border-8 border-transparent border-t-dark-lighter" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Image */}
      <motion.img
        src={src}
        alt={alt}
        className={`object-contain transition-all duration-300 ${className}`}
        style={glowEffect ? {
          filter: isHovered
            ? 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.6))'
            : 'drop-shadow(0 0 12px rgba(0, 229, 255, 0.3))'
        } : undefined}
        animate={{
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
};
