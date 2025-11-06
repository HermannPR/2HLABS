import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

/**
 * Animated counter that counts up to a target value
 */
export function CountUp({
  value,
  duration = 1,
  className = '',
  suffix = '',
  prefix = '',
}: CountUpProps) {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}
