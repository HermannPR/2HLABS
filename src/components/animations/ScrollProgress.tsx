import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Horizontal progress bar that tracks page scroll
 * Shows user how far through the page they are
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent origin-left z-50"
      style={{ scaleX }}
    />
  );
}
