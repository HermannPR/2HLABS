import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

/**
 * Animated progress bar component
 * Shows current progress with smooth animation
 */
export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className={`w-full bg-dark-lighter rounded-full h-2 overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}
