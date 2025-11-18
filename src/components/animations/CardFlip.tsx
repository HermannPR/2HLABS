import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';

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
  disableBackAnimations?: boolean; // Disable expensive back card animations
}

/**
 * 3D Card flip animation container
 * Cards start face-down, flip to reveal content on hover
 */
export function CardFlip({
  children,
  backContent,
  isInViewport: _isInViewport = true,
  disabled = false,
  onFlip,
  className = '',
  cardNumber,
  totalCards = 12,
  brandColor,
  onClick,
  isFlippedControlled,
  isFlipped: isFlippedProp,
  disableBackAnimations = false,
}: CardFlipProps) {
  const [isFlippedInternal, setIsFlippedInternal] = useState(false);
  const [isCardInView, setIsCardInView] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  // Track viewport visibility with IntersectionObserver
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCardInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Use controlled or internal state
  const isFlipped = isFlippedControlled ? (isFlippedProp ?? false) : isFlippedInternal;

  const handleClick = useCallback(() => {
    // For mobile: toggle flip on click
    if (isFlippedControlled && !disabled) {
      setIsFlippedInternal(!isFlipped);
      onFlip?.(!isFlipped);
    }
    onClick?.();
  }, [isFlippedControlled, disabled, isFlipped, onFlip, onClick]);

  // CSS classes for mobile controlled flip
  const containerClasses = `card-flip-container ${className} ${
    isFlippedControlled ? 'mobile' : ''
  } ${isFlipped ? 'flipped' : ''}`;

  return (
    <div
      ref={cardRef}
      className={containerClasses}
      onClick={handleClick}
    >
      <div className="card-flip-inner">
        {/* Card Back (face-down default) */}
        <div className="card-face card-face-back">
          {backContent || <DefaultCardBack cardNumber={cardNumber} totalCards={totalCards} brandColor={brandColor} isInViewport={isCardInView && !disableBackAnimations} />}
        </div>

        {/* Card Front (revealed on flip) */}
        <div className="card-face card-face-front">
          {children}
        </div>
      </div>
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
  brandColor = { primary: '#FFE500', secondary: '#FF00E5' },
  isInViewport = true,
}: {
  cardNumber?: number;
  totalCards?: number;
  brandColor?: { primary: string; secondary: string };
  isInViewport?: boolean;
}) {
  const containerClass = isInViewport ? '' : 'card-back-paused';

  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-dark via-dark-lighter to-dark ${containerClass}`}>
      {/* Iridescent holographic background */}
      <div
        className="absolute inset-0 holographic-bg"
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
      <div
        className="absolute inset-0 shimmer-overlay"
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
          <div className="text-center logo-glow">
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
          </div>
        </div>

        {/* Bottom section - Card numbering with holographic effect */}
        {cardNumber && (
          <div className="text-center relative">
            <div className="text-2xl font-heading font-black tracking-wider relative number-gradient"
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
            </div>
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

