import { motion } from 'framer-motion';
import { useState, useRef, useCallback, type ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CardFlipProps {
  children: ReactNode;
  backContent?: ReactNode;
  isInViewport?: boolean;
  disabled?: boolean;
  onFlip?: (isFlipped: boolean) => void;
  className?: string;
  cardNumber?: number;
  totalCards?: number;
  brandColor?: { primary: string; secondary: string };
  onClick?: () => void;
  isFlippedControlled?: boolean;
  isFlipped?: boolean;
}

/**
 * 3D Card flip animation container
 * Cards start face-down, flip to reveal content on hover
 */
export function CardFlip({
  children,
  backContent,
  isInViewport = true,
  disabled = false,
  onFlip,
  className = '',
  cardNumber,
  totalCards = 12,
  brandColor,
  onClick,
  isFlippedControlled,
  isFlipped: isFlippedProp,
}: CardFlipProps) {
  const [isFlippedInternal, setIsFlippedInternal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Use controlled or internal state
  const isFlipped = isFlippedControlled ? (isFlippedProp ?? false) : isFlippedInternal;

  const handleMouseEnter = useCallback(() => {
    if (!isInViewport || disabled || isFlippedControlled) return;
    setIsFlippedInternal(true);
    onFlip?.(true);
  }, [isInViewport, disabled, isFlippedControlled, onFlip]);

  const handleMouseLeave = useCallback(() => {
    if (!isInViewport || disabled || isFlippedControlled) return;
    setIsFlippedInternal(false);
    onFlip?.(false);
    setMousePosition({ x: 0, y: 0 });
  }, [isInViewport, disabled, isFlippedControlled, onFlip]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // Clamp values between -1 and 1
    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));

    setMousePosition({ x: clampedX, y: clampedY });
  }, [disabled]);

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div
      ref={cardRef}
      className={`card-flip-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{
        perspective: '1200px',
        width: '100%',
        height: '100%',
      }}
    >
      <motion.div
        className="card-flip-inner"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          rotateX: !disabled && !prefersReducedMotion ? mousePosition.y * -10 : 0,
          rotateZ: !disabled && !prefersReducedMotion ? mousePosition.x * 5 : 0,
          scale: isFlipped ? 1.05 : 1,
          y: isFlipped ? -10 : 0,
        }}
        transition={prefersReducedMotion ? {
          duration: 0.01, // Instant transitions for reduced motion
        } : {
          rotateY: {
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
          },
          rotateX: {
            type: "spring",
            stiffness: 350,
            damping: 35,
            mass: 0.5,
          },
          rotateZ: {
            type: "spring",
            stiffness: 350,
            damping: 35,
            mass: 0.5,
          },
          scale: {
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          },
          y: {
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Card Back (face-down default) */}
        <div
          className="card-back absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            opacity: isFlipped ? 0 : 1,
          }}
        >
          {backContent || <DefaultCardBack cardNumber={cardNumber} totalCards={totalCards} brandColor={brandColor} />}
        </div>

        {/* Card Front (revealed on flip) */}
        <div
          className="card-front absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            opacity: isFlipped ? 1 : 0,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Default card back design with iridescent holographic effect
 * Pokemon card style with 2HLABS branding
 */
function DefaultCardBack({ 
  cardNumber, 
  totalCards = 12,
  brandColor = { primary: '#FFE500', secondary: '#FF00E5' }
}: { 
  cardNumber?: number; 
  totalCards?: number;
  brandColor?: { primary: string; secondary: string };
}) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-dark via-dark-lighter to-dark">
      {/* Iridescent holographic background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 229, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 0, 229, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(0, 229, 255, 0.3) 0%, transparent 50%),
            linear-gradient(135deg,
              #FFE500 0%,
              #FF00E5 25%,
              #00E5FF 50%,
              #FFE500 75%,
              #FF00E5 100%
            )
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Holographic shimmer overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(255, 255, 255, 0.1) 0deg,
            transparent 60deg,
            transparent 120deg,
            rgba(255, 255, 255, 0.2) 180deg,
            transparent 240deg,
            transparent 300deg,
            rgba(255, 255, 255, 0.1) 360deg
          )`,
        }}
      />

      {/* Dark overlay for contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(10, 14, 39, 0.8)',
        }}
      />

      {/* Molecular pattern background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3Ccircle cx='50' cy='10' r='3'/%3E%3Ccircle cx='10' cy='50' r='3'/%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Cline x1='30' y1='30' x2='10' y2='10'/%3E%3Cline x1='30' y1='30' x2='50' y2='10'/%3E%3Cline x1='30' y1='30' x2='10' y2='50'/%3E%3Cline x1='30' y1='30' x2='50' y2='50'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content container */}
      <div className="relative h-full flex flex-col items-center justify-center p-6">
        {/* Center section - Brand logo */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-center"
          >
            {/* 2HLABS logo */}
            <div className="relative">
              {/* Logo glow background */}
              <div
                className="absolute inset-0 blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${brandColor.primary}40 0%, transparent 70%)`,
                }}
              />
              
              {/* Logo image */}
              <img
                src="/assets/2hlabs-logo.png"
                alt="2HLABS"
                className="relative w-40 h-40 object-contain mx-auto"
                style={{
                  filter: `drop-shadow(0 0 20px ${brandColor.primary}80) brightness(1.2)`,
                }}
              />
            </div>
            
            <div className="text-xs font-heading font-bold tracking-widest text-white/60 mt-2">
              CUSTOM PRE-WORKOUT
            </div>
          </motion.div>
        </div>

        {/* Bottom section - Card numbering with holographic effect */}
        {cardNumber && (
          <div className="text-center relative">
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="text-2xl font-heading font-black tracking-wider relative"
              style={{
                background: `linear-gradient(
                  90deg,
                  #00d4ff 0%,
                  #7de2ff 12.5%,
                  #ff00e5 25%,
                  #ff7def 37.5%,
                  #ffe500 50%,
                  #ff7def 62.5%,
                  #ff00e5 75%,
                  #7de2ff 87.5%,
                  #00d4ff 100%
                )`,
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 6px rgba(0, 212, 255, 0.4)) drop-shadow(0 0 10px rgba(255, 0, 229, 0.3))',
              }}
            >
              {cardNumber}/{totalCards}
            </motion.div>
          </div>
        )}
      </div>

      {/* Static gradient border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, #FFE500, #FF00E5, #00E5FF, #FFE500)`,
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0.6,
        }}
      />

      {/* Inner glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px rgba(255, 229, 0, 0.15)',
        }}
      />
    </div>
  );
}

