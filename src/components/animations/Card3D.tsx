import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, type ReactNode, type MouseEvent } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * 3D card that tilts based on mouse position
 * Great for soul cards, pricing cards, etc.
 */
export function Card3D({
  children,
  className = '',
  intensity = 15,
}: Card3DProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Disable spring animations if reduced motion is preferred
  const mouseXSpring = useSpring(x, prefersReducedMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 150, damping: 40 });
  const mouseYSpring = useSpring(y, prefersReducedMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 150, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-intensity, intensity]);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
}
