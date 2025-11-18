import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ARCHETYPES } from '../data/archetypes';
import { getSoulLogo } from '../utils/soulLogos';
import type { Archetype } from '../types';
import { useState, useEffect, useMemo } from 'react';
import { SkeletonSoulCard } from '../components/common/Skeleton';
import { SEO, StructuredData } from '../components/seo/SEO';
import { getItemListSchema, getBreadcrumbSchema } from '../utils/structuredData';
import { useTranslation } from 'react-i18next';
import { GlowingOrb, ScrollScale } from '../components/animations';
import { SoulCardWithFlip } from '../components/soul/SoulCardWithFlip';
import { StackedCards } from '../components/soul/StackedCards';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Brand colors for each soul archetype (primary + secondary for spinning glow)
const SOUL_COLORS: Record<string, { primary: string; secondary: string }> = {
  'gorilla-rage': { primary: '#FF8C00', secondary: '#FFB84D' },      // Orange to yellowy-orange
  'dragon-blood': { primary: '#8B0A50', secondary: '#00D4FF' },      // Wine to electric blue
  'cheetah-sprint': { primary: '#FFE500', secondary: '#00D4FF' },    // Yellow to electric blue
  'eagle-vision': { primary: '#00A8E8', secondary: '#F5F5F5' },      // Blue to white
  'titan-strength': { primary: '#8B94A1', secondary: '#FF8C00' },    // Gray to orange
  'wolf-pack': { primary: '#90EE90', secondary: '#C4A57B' },         // Light green to light brown
  'phoenix-rise': { primary: '#FF8C00', secondary: '#FFCC00' },      // Orange to yellower-orange
  'bear-endurance': { primary: '#8B7355', secondary: '#D4C4B0' },    // Brown to light light brown
  'mantis-focus': { primary: '#7FFF00', secondary: '#B8FF99' },      // Lime to light green
  'thunder-strike': { primary: '#B19CD9', secondary: '#9933FF' },    // Light purple to saturated purple
  'serpent-flow': { primary: '#00C9A7', secondary: '#7FFFD4' },      // Jade to light jade
  'lion-heart': { primary: '#A8B5C1', secondary: '#FFD966' },        // Gray to light yellow-orange
};

export const AllSouls = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [isLoading] = useState(false); // Instant load for better UX
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Memoize RGB color conversions for modal rendering performance
  const memoizedColorRgb = useMemo(() => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 229, b: 255 };
    };

    return Object.entries(SOUL_COLORS).reduce((acc, [key, colors]) => {
      acc[key] = {
        primary: hexToRgb(colors.primary),
        secondary: hexToRgb(colors.secondary),
      };
      return acc;
    }, {} as Record<string, { primary: { r: number; g: number; b: number }; secondary: { r: number; g: number; b: number } }>);
  }, []);

  // Detect mobile/tablet - use lightweight card stack for better performance
  useEffect(() => {
    const checkMobile = () => {
      // Use card stack for:
      // 1. Screens < 1280px (tablets and below)
      // 2. Touch devices (iPad, tablets)
      // 3. Devices with iPad/Android in user agent
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isTabletOrBelow = window.innerWidth < 1280;
      const isTabletUserAgent = /iPad|Android|webOS/i.test(navigator.userAgent);
      
      setIsMobile(isTabletOrBelow || isTouchDevice || isTabletUserAgent);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Loading removed - instant display for better UX

  // Prevent body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (selectedArchetype) {
      // Hide scrollbar but keep scroll functionality
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      
      // Handle ESC key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedArchetype(null);
        }
      };
      
      window.addEventListener('keydown', handleEscape);
      
      return () => {
        window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0';
      };
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }
  }, [selectedArchetype]);

  // Handle browser back button to close modal
  useEffect(() => {
    if (selectedArchetype) {
      // Push a state when modal opens
      window.history.pushState({ modalOpen: true }, '');

      const handlePopState = () => {
        setSelectedArchetype(null);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [selectedArchetype]);

  return (
    <div className="min-h-screen bg-dark py-12 relative overflow-hidden">
      {/* Animated gradient background - disabled on mobile or reduced motion */}
      <div className="absolute inset-0 overflow-hidden">
        {!isMobile && !prefersReducedMotion ? (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(255, 229, 0, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 0, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(255, 229, 0, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 0, 229, 0.08) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 229, 0, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 0, 229, 0.08) 0%, transparent 50%)',
            }}
          />
        )}

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Ambient Glowing Orbs - disabled on mobile for performance */}
      {!isMobile && (
        <>
          <GlowingOrb color="#00E5FF" size={400} blur={120} className="top-20 -left-40" reduceMotion={prefersReducedMotion} />
          <GlowingOrb color="#FF00E5" size={350} blur={100} className="top-1/2 -right-32" reduceMotion={prefersReducedMotion} />
          <GlowingOrb color="#39FF14" size={300} blur={90} className="bottom-20 left-1/3" reduceMotion={prefersReducedMotion} />
        </>
      )}

      <SEO
        title="All 12 Training Souls"
        description="Explore all 12 unique pre-workout archetypes. From Lion Heart's explosive power to Serpent Flow's stim-free endurance - find the perfect formula for your training style."
        keywords="training archetypes, pre-workout types, fitness personalities, workout supplements, personalized nutrition"
        ogType="website"
      />
      <StructuredData data={getItemListSchema(ARCHETYPES)} />
      <StructuredData data={getBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'All Souls', url: '/souls' }
      ])} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section with Scale Animation */}
        <ScrollScale scaleRange={[0.9, 1]} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              {t('allSouls.title')} <span className="text-gradient">{t('allSouls.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('allSouls.subtitle')}
            </p>
          </motion.div>
        </ScrollScale>

        {/* Archetypes - Mobile: Stacked Cards, Desktop: Grid */}
        {isMobile ? (
          // Mobile: Tinder-style stacked cards
          <div className="mb-12">
            {isLoading ? (
              <div className="flex items-center justify-center" style={{ height: '70vh' }}>
                <SkeletonSoulCard />
              </div>
            ) : (
              <StackedCards
                archetypes={ARCHETYPES}
                brandColors={SOUL_COLORS}
                getSoulLogo={getSoulLogo}
                onCardTap={setSelectedArchetype}
              />
            )}
          </div>
        ) : (
          // Desktop: Grid with flip cards
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-5xl mx-auto px-4" style={{ contain: 'layout style' }}>
            {isLoading ? (
              // Show skeleton cards while loading
              [...Array(12)].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <SkeletonSoulCard />
                </motion.div>
              ))
            ) : (
                  ARCHETYPES.map((archetype, index) => {
                    const brandColor = SOUL_COLORS[archetype.id] || { primary: '#00e5ff', secondary: '#00e5ff' };

                return (
                  <SoulCardWithFlip
                    key={archetype.id}
                    archetype={archetype}
                    brandColor={brandColor}
                    isMobile={isMobile}
                    onSelect={setSelectedArchetype}
                    getSoulLogo={getSoulLogo}
                    cardNumber={index + 1}
                    isActive={flippedCardId === archetype.id}
                    reduceMotion={prefersReducedMotion}
                    onFlipChange={(isFlipped) => {
                      if (isFlipped) {
                        setFlippedCardId(archetype.id);
                      } else if (flippedCardId === archetype.id) {
                        setFlippedCardId(null);
                      }
                    }}
                  />
                );
              })
            )}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-4">
              {t('allSouls.ctaTitle')}
            </h2>
            <p className="text-gray-400 mb-6">
              {t('allSouls.ctaDescription')}
            </p>
            <Button size="lg" onClick={() => navigate('/formula')}>
              {t('allSouls.ctaButton')}
            </Button>
          </Card>
        </motion.div>

        {/* Premium High-End Modal */}
        {selectedArchetype && (() => {
          const modalBrandColor = SOUL_COLORS[selectedArchetype.id] || { primary: '#00e5ff', secondary: '#00e5ff' };
          // Use memoized RGB conversions for better performance
          const colorRgb = memoizedColorRgb[selectedArchetype.id] || {
            primary: { r: 0, g: 229, b: 255 },
            secondary: { r: 0, g: 229, b: 255 }
          };
          const modalRgb = colorRgb.primary;
          const secondaryRgb = colorRgb.secondary;

          return (
          <div
            className="fixed inset-0 overflow-y-scroll"
            style={{
              zIndex: 10000,
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: isMobile ? 'none' : 'blur(20px)',
              WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
              pointerEvents: 'auto',
            }}
            onClick={() => setSelectedArchetype(null)}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Static background glow - animation removed for better performance */}
            {!isMobile && (
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.3) 0%, transparent 50%)`,
                }}
              />
            )}

            {/* Content wrapper with proper spacing */}
            <div 
              className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
              style={{
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full max-w-5xl"
                style={{ transform: 'scale(0.70)' }}
                onClick={(e) => e.stopPropagation()}
              >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArchetype(null)}
                className="absolute -top-2 -right-2 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                aria-label="Close modal (ESC)"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Main Content - Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-0 overflow-hidden rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 20, 50, 0.95) 0%, rgba(10, 14, 39, 0.98) 100%)',
                  boxShadow: `
                    0 0 60px rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.4),
                    0 0 120px rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.2),
                    inset 0 0 100px rgba(0, 0, 0, 0.5)
                  `,
                }}
              >
                {/* Left Side - Visual Identity */}
                <div className="relative p-3 sm:p-4 lg:p-5 flex flex-col items-center justify-center border-r border-white/5 min-h-[250px] lg:min-h-[380px]">
                  {/* Static gradient background - animation removed for performance */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.08) 0%, transparent 70%)`,
                    }}
                  />

                  {/* Soul Logo with Premium Glow */}
                  <div className="relative z-10 mb-6">
                    <div className="relative">
                      {/* Static glow ring - no animation for better performance */}
                      <div
                        className="absolute inset-0 rounded-full blur-3xl opacity-30"
                        style={{
                          background: `radial-gradient(circle, ${modalBrandColor.primary} 0%, ${modalBrandColor.secondary} 50%, transparent 70%)`,
                          transform: 'scale(1.5)',
                        }}
                      />

                      {/* Logo container */}
                      <div
                        className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle, rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.1) 0%, transparent 70%)`,
                          boxShadow: `inset 0 0 40px rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.15)`,
                        }}
                      >
                        <img
                          src={getSoulLogo(selectedArchetype.id)}
                          alt={selectedArchetype.name}
                          loading="lazy"
                          className="w-28 h-28 sm:w-40 sm:h-40 object-contain mix-blend-lighten"
                          style={{
                            filter: `drop-shadow(0 0 15px ${modalBrandColor.primary}80)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name & Tagline */}
                  <div className="text-center relative z-10">
                    <h2
                      className="text-4xl sm:text-5xl font-heading font-bold mb-3"
                      style={{
                        color: modalBrandColor.primary,
                        textShadow: `0 0 30px rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.6)`,
                      }}
                    >
                      {selectedArchetype.name}
                    </h2>
                    <p
                      className="text-xl sm:text-2xl font-medium italic"
                      style={{
                        color: modalBrandColor.secondary,
                        textShadow: `0 0 20px rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.5)`,
                      }}
                    >
                      "{t(`archetypes.${selectedArchetype.id}.tagline`)}"
                    </p>
                  </div>

                  {/* Decorative lines */}
                  <div className="absolute top-0 left-0 w-full h-1"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${modalBrandColor.primary}, ${modalBrandColor.secondary}, transparent)`,
                    }}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${modalBrandColor.secondary}, ${modalBrandColor.primary}, transparent)`,
                    }}
                  />
                </div>

                {/* Right Side - Details */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col">
                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {t(`archetypes.${selectedArchetype.id}.description`)}
                    </p>
                  </div>

                  {/* Stats Grid - Compact Bar Style */}
                  <div className="space-y-2 mb-4">
                    {/* Caffeine Range */}
                    <div className="relative">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {t('allSouls.modal.caffeineRange')}
                        </span>
                        <span className="text-sm font-bold" style={{ color: modalBrandColor.primary }}>
                          {selectedArchetype.formulaProfile.caffeineRange[0] === selectedArchetype.formulaProfile.caffeineRange[1]
                            ? `${selectedArchetype.formulaProfile.caffeineRange[0]}mg`
                            : `${selectedArchetype.formulaProfile.caffeineRange[0]}-${selectedArchetype.formulaProfile.caffeineRange[1]}mg`
                          }
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(selectedArchetype.formulaProfile.caffeineRange[1] / 400) * 100}%`,
                            background: modalBrandColor.primary
                          }}
                        />
                      </div>
                    </div>

                    {/* Intensity Level */}
                    <div className="relative">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {t('allSouls.modal.intensityLevel')}
                        </span>
                        <span className="text-sm font-bold" style={{ color: modalBrandColor.secondary }}>
                          {selectedArchetype.formulaProfile.intensity}/10
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(selectedArchetype.formulaProfile.intensity / 10) * 100}%`,
                            background: modalBrandColor.secondary
                          }}
                        />
                      </div>
                    </div>

                    {/* Pump Level */}
                    <div className="relative">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {t('allSouls.modal.pumpLevel')}
                        </span>
                        <span className="text-sm font-bold text-white uppercase">
                          {selectedArchetype.formulaProfile.pumpLevel}
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: selectedArchetype.formulaProfile.pumpLevel === 'maximum' ? '100%' : 
                                   selectedArchetype.formulaProfile.pumpLevel === 'high' ? '75%' : 
                                   selectedArchetype.formulaProfile.pumpLevel === 'moderate' ? '50%' : '25%',
                            background: modalBrandColor.primary
                          }}
                        />
                      </div>
                    </div>

                    {/* Focus Level */}
                    <div className="relative">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {t('allSouls.modal.focusLevel')}
                        </span>
                        <span className="text-sm font-bold text-white uppercase">
                          {selectedArchetype.formulaProfile.focusLevel}
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: selectedArchetype.formulaProfile.focusLevel === 'maximum' ? '100%' : 
                                   selectedArchetype.formulaProfile.focusLevel === 'high' ? '75%' : 
                                   selectedArchetype.formulaProfile.focusLevel === 'moderate' ? '50%' : '25%',
                            background: modalBrandColor.secondary
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Traits & Athlete Types */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: modalBrandColor.primary }}
                      >
                        {t('allSouls.modal.coreTraits')}
                      </h3>
                      <ul className="space-y-1.5">
                        {(t(`archetypes.${selectedArchetype.id}.traits`, { returnObjects: true }) as string[]).map((trait, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs">
                            <span style={{ color: modalBrandColor.primary }}>▸</span>
                            <span className="text-gray-300">{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: modalBrandColor.secondary }}
                      >
                        Ideal For
                      </h3>
                      <ul className="space-y-1.5">
                        {(t(`archetypes.${selectedArchetype.id}.athleteTypes`, { returnObjects: true }) as string[]).map((type, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-xs">
                            <span style={{ color: modalBrandColor.secondary }}>▸</span>
                            <span className="text-gray-300">{type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-8">
                    <button
                      onClick={() => {
                        setSelectedArchetype(null);
                        navigate('/formula');
                      }}
                      className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${modalBrandColor.primary}, ${modalBrandColor.secondary})`,
                        boxShadow: `0 10px 40px rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.4)`,
                      }}
                    >
                      Create Your Custom Formula
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </div>
          );
        })()}
      </div>
    </div>
  );
};
