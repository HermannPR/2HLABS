import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Creates a parallax effect where content moves at a different speed than scroll
 * speed: 0.5 = half scroll speed (slower), 1.5 = 1.5x scroll speed (faster)
 */
export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${(1 - speed) * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
