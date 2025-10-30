import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
  animate?: boolean;
}

export const Skeleton = ({
  className = '',
  variant = 'text',
  width,
  height,
  animate = true,
}: SkeletonProps) => {
  const baseClasses = 'bg-dark-lighter';

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const Component = animate ? motion.div : 'div';

  const animationProps = animate ? {
    animate: {
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  } : {};

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: width || (variant === 'text' ? '100%' : undefined),
        height: height || (variant === 'text' ? undefined : '100px'),
      }}
      {...animationProps}
    />
  );
};

// Skeleton Text Line
export const SkeletonText = ({ lines = 1, className = '' }: { lines?: number; className?: string }) => (
  <div className={`space-y-2 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? '70%' : '100%'}
      />
    ))}
  </div>
);

// Skeleton for Soul Cards
export const SkeletonSoulCard = () => (
  <div className="bg-dark-light border border-dark-lighter rounded-2xl p-6">
    {/* Logo */}
    <div className="flex justify-center mb-4">
      <Skeleton variant="circular" width="96px" height="96px" />
    </div>

    {/* Title */}
    <Skeleton variant="text" className="h-6 mb-2" />

    {/* Tagline */}
    <Skeleton variant="text" className="h-4 mb-4" width="80%" />

    {/* Stats */}
    <div className="space-y-3 mb-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-2 bg-dark-lighter rounded">
          <Skeleton variant="text" width="60px" />
          <Skeleton variant="text" width="100px" />
        </div>
      ))}
    </div>

    {/* Badges */}
    <div className="flex gap-2 mb-4">
      <Skeleton variant="rectangular" width="80px" height="24px" />
      <Skeleton variant="rectangular" width="80px" height="24px" />
      <Skeleton variant="rectangular" width="80px" height="24px" />
    </div>

    {/* Description */}
    <SkeletonText lines={2} className="mb-4" />

    {/* Button */}
    <Skeleton variant="rectangular" className="h-10 w-full" />
  </div>
);

// Skeleton for Ingredient Cards
export const SkeletonIngredientCard = () => (
  <div className="bg-dark-light border border-dark-lighter rounded-xl p-4">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <Skeleton variant="text" className="h-6 mb-2" width="70%" />
        <SkeletonText lines={2} />
      </div>
      <Skeleton variant="text" width="80px" className="ml-4" />
    </div>

    <div className="flex gap-4 mt-3">
      <Skeleton variant="text" width="120px" />
      <Skeleton variant="text" width="100px" />
    </div>
  </div>
);

// General Loading Spinner
export const LoadingSpinner = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

// Page Loading State
export const PageLoader = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="min-h-screen bg-dark flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" className="mx-auto mb-4" />
      <p className="text-gray-400 text-lg">{message}</p>
    </div>
  </div>
);
