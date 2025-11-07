import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CardFlip } from '../animations/CardFlip';
import { PokemonCard } from './PokemonCard';
import { useInViewport } from '../../hooks/useInViewport';
import type { Archetype } from '../../types';

interface SoulCardWithFlipProps {
  archetype: Archetype;
  brandColor: { primary: string; secondary: string };
  isMobile: boolean;
  onSelect: (archetype: Archetype) => void;
  getSoulLogo: (id: string) => string;
  cardNumber?: number;
  isActive?: boolean;
  onFlipChange?: (isFlipped: boolean) => void;
}

/**
 * Soul card with 3D flip animation
 * Optimized for performance with viewport detection
 */
export function SoulCardWithFlip({
  archetype,
  brandColor,
  isMobile,
  onSelect,
  getSoulLogo,
  cardNumber,
  isActive = false,
  onFlipChange,
}: SoulCardWithFlipProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInViewport = useInViewport(cardRef as React.RefObject<Element>);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when another card becomes active
  useEffect(() => {
    if (!isActive && isFlipped) {
      setIsFlipped(false);
    }
  }, [isActive, isFlipped]);

  const handleFlip = (flipped: boolean) => {
    setIsFlipped(flipped);
    onFlipChange?.(flipped);
  };

  // Mobile: First click flips, second click opens modal
  const handleMobileClick = () => {
    if (!isMobile) return;
    
    if (!isFlipped) {
      // First click: flip the card
      setIsFlipped(true);
      onFlipChange?.(true);
    } else {
      // Second click: open modal
      onSelect(archetype);
    }
  };

  // Desktop: Click when flipped opens modal
  const handleClick = () => {
    if (isMobile) {
      handleMobileClick();
    } else if (isFlipped) {
      // Desktop: only open modal when card is flipped
      onSelect(archetype);
    }
  };

  // Pokemon-style card front
  const cardContent = (
    <div className="relative w-full h-full">
      <PokemonCard
        archetype={archetype}
        brandColor={brandColor}
        getSoulLogo={getSoulLogo}
        caffeineRange={archetype.formulaProfile.caffeineRange}
        intensity={archetype.formulaProfile.intensity}
        isFlipped={isFlipped}
        hideOriginalBorder={false}
      />
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="relative w-full"
      style={{
        cursor: 'pointer',
        aspectRatio: '2.5 / 3.5', // Pokemon card ratio
      }}
    >
      <CardFlip
        isInViewport={isInViewport}
        disabled={isMobile}
        onFlip={handleFlip}
        className="h-full"
        cardNumber={cardNumber}
        brandColor={brandColor}
        isFlippedControlled={isMobile}
        isFlipped={isFlipped}
        onClick={handleClick}
      >
        {cardContent}
      </CardFlip>
    </motion.div>
  );
}
