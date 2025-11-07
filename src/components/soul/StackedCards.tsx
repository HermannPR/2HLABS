import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import type { Archetype } from '../../types';
import { PokemonCard } from './PokemonCard';

interface StackedCardsProps {
  archetypes: Archetype[];
  brandColors: Record<string, { primary: string; secondary: string }>;
  getSoulLogo: (id: string) => string;
  onCardTap: (archetype: Archetype) => void;
}

interface CardProps {
  archetype: Archetype;
  brandColor: { primary: string; secondary: string };
  getSoulLogo: (id: string) => string;
  index: number;
  totalCards: number;
  onSwipe: (direction: 'left' | 'right') => void;
  onTap: () => void;
  isTop: boolean;
  currentIndex: number;
}

function SwipeCard({
  archetype,
  brandColor,
  getSoulLogo,
  index,
  onSwipe,
  onTap,
  isTop,
  currentIndex,
}: CardProps) {
  const x = useMotionValue(0);
  const controls = useAnimation();

  // More sensitive rotation for better feedback
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);

  // Check if this is the current card
  const isCurrentCard = index === currentIndex;

  // Smooth entrance animation when card becomes visible
  useEffect(() => {
    if (isCurrentCard) {
      controls.start({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }
      });
    }
  }, [isCurrentCard, controls]);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    const threshold = 80; // Lower threshold for easier swiping

    if (Math.abs(info.offset.x) > threshold) {
      // Animate card off screen with 3D rotation
      await controls.start({
        x: info.offset.x > 0 ? 1000 : -1000,
        rotateY: info.offset.x > 0 ? 45 : -45,
        rotateZ: info.offset.x > 0 ? 10 : -10,
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
      });
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    } else {
      // Snap back to center with spring
      controls.start({
        x: 0,
        y: 0,
        rotateY: 0,
        rotateZ: 0,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      });
    }
  };

  // Don't render if not current card (deck style - one card at a time)
  if (!isCurrentCard) return null;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{
        x: isTop ? x : 0,
        y: 0,
        rotate: isTop ? rotate : 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        touchAction: isTop ? 'pan-x' : 'auto',
        cursor: isTop ? 'grab' : 'default',
        transformStyle: 'preserve-3d',
      }}
      initial={{
        x: 300,
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      exit={{
        x: -300,
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        }
      }}
      whileTap={isTop ? { cursor: 'grabbing', scale: 0.98 } : {}}
      className="w-full"
      onClick={() => {
        // Only trigger tap if not dragging
        if (isTop && Math.abs(x.get()) < 5) {
          onTap();
        }
      }}
    >
      {/* Use the existing PokemonCard component - scaled for mobile */}
      <div
        className="relative w-full mx-auto"
        style={{
          maxWidth: '400px',
        }}
      >
        <PokemonCard
          archetype={archetype}
          brandColor={brandColor}
          getSoulLogo={getSoulLogo}
          caffeineRange={archetype.formulaProfile.caffeineRange}
          intensity={archetype.formulaProfile.intensity}
          isFlipped={false}
          hideOriginalBorder={false}
          isMobile={true}
          reduceMotion={false}
        />
      </div>
    </motion.div>
  );
}

/**
 * Tinder-style stacked cards for mobile
 * High performance with smooth swipe gestures
 */
export function StackedCards({
  archetypes,
  brandColors,
  getSoulLogo,
  onCardTap,
}: StackedCardsProps) {
  const [cards] = useState(archetypes);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = useCallback((_direction: 'left' | 'right') => {
    // Swipe left = next card, Swipe right = previous card (natural feel)
    if (_direction === 'left') {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Loop to start
      }
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentIndex(cards.length - 1); // Loop to end
      }
    }
  }, [currentIndex, cards.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, cards.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(cards.length - 1);
    }
  }, [currentIndex, cards.length]);

  const handleCardTap = useCallback(() => {
    const currentCard = cards[currentIndex];
    onCardTap(currentCard);
  }, [cards, currentIndex, onCardTap]);

  // Only render current card + 2 behind it for performance
  const visibleCards = cards.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full px-4 mb-4">
      {/* Counter at top */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
          <span className="text-white font-bold text-2xl">{currentIndex + 1}</span>
          <span className="text-gray-400 text-lg">/</span>
          <span className="text-gray-400 text-lg">{cards.length}</span>
        </div>
      </div>

      {/* Card container - full width */}
      <div className="relative w-full max-w-lg mx-auto mb-3">
        {/* Card deck */}
        <div
          className="relative w-full bg-transparent"
          style={{
            height: '500px',
            minHeight: '500px',
            perspective: '1000px',
          }}
        >
          {visibleCards.length > 0 ? (
            visibleCards.map((archetype, idx) => (
              <SwipeCard
                key={`${archetype.id}-${currentIndex + idx}`}
                archetype={archetype}
                brandColor={brandColors[archetype.id] || { primary: '#00e5ff', secondary: '#00e5ff' }}
                getSoulLogo={getSoulLogo}
                index={currentIndex + idx}
                totalCards={visibleCards.length}
                onSwipe={handleSwipe}
                onTap={handleCardTap}
                isTop={idx === 0}
                currentIndex={currentIndex}
              />
            ))
          ) : (
            <div className="text-white text-center p-8">No cards available</div>
          )}
        </div>
      </div>

      {/* Swipe animation hint */}
      <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
        {/* Animated swipe gesture hint */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <svg
            className="w-6 h-6 animate-wiggle text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Swipe to browse</span>
          <svg
            className="w-6 h-6 animate-wiggle text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <div className="w-px h-4 bg-gray-600" />
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span>Tap for details</span>
        </div>
      </div>

      {/* Navigation buttons below card */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-6">
          {/* Previous Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={handlePrevious}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 flex items-center justify-center group hover:scale-110"
              aria-label="Previous card"
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-gray-500 text-xs">Previous</span>
          </div>

          {/* Reset Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => setCurrentIndex(0)}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 flex items-center gap-2 group hover:scale-105"
              aria-label="Reset to first card"
            >
              <svg
                className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-white font-medium text-sm">Reset</span>
            </button>
            <span className="text-gray-500 text-xs">Start over</span>
          </div>

          {/* Next Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 flex items-center justify-center group hover:scale-110"
              aria-label="Next card"
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="text-gray-500 text-xs">Next</span>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {cards.map((_, idx) => (
          <div
            key={idx}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: idx === currentIndex ? '32px' : '8px',
              background: idx === currentIndex
                ? `linear-gradient(90deg, ${brandColors[cards[currentIndex]?.id]?.primary || '#00e5ff'}, ${brandColors[cards[currentIndex]?.id]?.secondary || '#00e5ff'})`
                : 'rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
