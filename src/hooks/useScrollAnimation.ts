import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
}

/**
 * Hook for scroll-triggered animations
 * Returns a ref to attach to elements and an inView boolean
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  return { ref, isInView };
}

/**
 * Hook for staggered animations (useful for lists)
 */
export function useStaggerAnimation(delay: number = 0.1) {
  return (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * delay, duration: 0.5 },
  });
}
