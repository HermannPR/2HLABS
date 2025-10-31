import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ARCHETYPES } from '../data/archetypes';
import { getSoulLogo } from '../utils/soulLogos';
import type { Archetype } from '../types';
import { useState, useEffect } from 'react';
import { SkeletonSoulCard } from '../components/common/Skeleton';
import { SEO, StructuredData } from '../components/seo/SEO';
import { getItemListSchema, getBreadcrumbSchema } from '../utils/structuredData';
import { useTranslation } from 'react-i18next';

// Brand colors for each soul archetype
const SOUL_COLORS: Record<string, string> = {
  'gorilla-rage': '#FF5722',      // Warmer orange-red
  'dragon-blood': '#8B0000',      // Red wine / dark red
  'cheetah-sprint': '#FFFF00',    // Bright yellow (reverted)
  'eagle-vision': '#00D4FF',      // Colder cyan / ice blue
  'titan-strength': '#708090',    // Slate gray
  'phoenix-rise': '#FF6600',      // Orange
  'serpent-flow': '#00FF88',      // Green
  'wolf-pack': '#90EE90',         // Light green
  'mantis-focus': '#32CD32',      // Lime green (mantis focus)
  'viper-strike': '#00FF00',      // Neon green
  'bear-endurance': '#8B4513',    // Brown
  'thunder-strike': '#9933FF',    // Purple (thunder strike)
  'lion-heart': '#FFD700',        // Warm golden yellow
};

export const AllSouls = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate loading for demonstration (remove in production or when using real API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedArchetype) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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

  const getDimensionBadgeColor = (value: string) => {
    const colorMap: Record<string, string> = {
      explosive: 'bg-red-500/20 text-red-400 border-red-500/30',
      steady: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      mixed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      sprint: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      marathon: 'bg-green-500/20 text-green-400 border-green-500/30',
      aggressive: 'bg-red-500/20 text-red-400 border-red-500/30',
      controlled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      flow: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      burst: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      sustained: 'bg-green-500/20 text-green-400 border-green-500/30',
      balanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      none: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      moderate: 'bg-primary/20 text-primary border-primary/30',
      high: 'bg-accent/20 text-accent border-accent/30',
    };
    return colorMap[value] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-dark py-12">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            {t('allSouls.title')} <span className="text-gradient">{t('allSouls.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('allSouls.subtitle')}
          </p>
        </motion.div>

        {/* Archetypes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
            ARCHETYPES.map((archetype, idx) => {
              const brandColor = SOUL_COLORS[archetype.id] || '#00e5ff';
              // On mobile, always show effects; on desktop, show on hover
              const isHovered = isMobile ? true : hoveredCard === archetype.id;
              const hexToRgb = (hex: string) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16)
                } : { r: 0, g: 229, b: 255 };
              };
              const rgb = hexToRgb(brandColor);

              return (
            <motion.div
              key={archetype.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onMouseEnter={!isMobile ? () => setHoveredCard(archetype.id) : undefined}
              onMouseLeave={!isMobile ? () => setHoveredCard(null) : undefined}
              style={{
                borderColor: isHovered ? brandColor : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered ? `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` : 'none',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '0.75rem',
                transition: isMobile ? 'none' : 'all 0.3s ease',
              }}
            >
              <Card
                className="h-full cursor-pointer group relative overflow-hidden !border-0"
              >
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="mb-3 transition-transform duration-300 flex justify-center"
                    style={{
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <img
                      src={getSoulLogo(archetype.id)}
                      alt={archetype.name}
                      className="w-24 h-24 object-contain mix-blend-lighten"
                      style={{
                        filter: isHovered
                          ? `drop-shadow(0 0 40px ${brandColor}) drop-shadow(0 0 20px ${brandColor})`
                          : `drop-shadow(0 0 10px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3))`,
                        transition: 'filter 0.3s ease',
                      }}
                    />
                  </div>
                  <h3
                    className="text-2xl font-heading font-bold mb-1 transition-colors duration-300"
                    style={{
                      color: isHovered ? brandColor : 'white',
                    }}
                  >
                    {archetype.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm">
                    {t(`archetypes.${archetype.id}.tagline`)}
                  </p>
                </div>

                {/* Key Stats */}
                <div className="space-y-3 mb-4">
                  {/* Caffeine Range */}
                  <div className="grid grid-cols-[140px_1fr] gap-6 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">{t('allSouls.caffeine')}</span>
                    <span className="text-sm font-bold text-white">
                      {archetype.formulaProfile.caffeineRange[0] === archetype.formulaProfile.caffeineRange[1]
                        ? `${archetype.formulaProfile.caffeineRange[0]}mg`
                        : `${archetype.formulaProfile.caffeineRange[0]}-${archetype.formulaProfile.caffeineRange[1]}mg`
                      }
                    </span>
                  </div>

                  {/* Intensity */}
                  <div className="grid grid-cols-[140px_1fr] gap-6 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">{t('allSouls.intensity')}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => {
                        const isActive = i < archetype.formulaProfile.intensity;

                        // Hardcoded smooth gradient: Blue → Cyan → Green → Lime → Yellow → Orange → Red
                        const gradientColors = [
                          { bg: '#3B82F6', glow: 'rgba(59, 130, 246, 0.6)' },    // Bar 0: Blue
                          { bg: '#06B6D4', glow: 'rgba(6, 182, 212, 0.6)' },     // Bar 1: Cyan
                          { bg: '#10B981', glow: 'rgba(16, 185, 129, 0.6)' },    // Bar 2: Green
                          { bg: '#84CC16', glow: 'rgba(132, 204, 22, 0.6)' },    // Bar 3: Lime
                          { bg: '#EAB308', glow: 'rgba(234, 179, 8, 0.6)' },     // Bar 4: Yellow
                          { bg: '#F59E0B', glow: 'rgba(245, 158, 11, 0.6)' },    // Bar 5: Amber
                          { bg: '#F97316', glow: 'rgba(249, 115, 22, 0.6)' },    // Bar 6: Orange
                          { bg: '#EF4444', glow: 'rgba(239, 68, 68, 0.6)' },     // Bar 7: Red
                          { bg: '#DC2626', glow: 'rgba(220, 38, 38, 0.6)' },     // Bar 8: Dark Red
                          { bg: '#B91C1C', glow: 'rgba(185, 28, 28, 0.7)' },     // Bar 9: Darker Red
                        ];

                        const color = gradientColors[i];

                        return (
                          <div
                            key={i}
                            className="w-1.5 h-5 rounded-sm transition-all"
                            style={isActive ? {
                              backgroundColor: color.bg,
                              boxShadow: `0 0 8px ${color.glow}`,
                              opacity: 1
                            } : {
                              backgroundColor: '#1F2937',
                              opacity: 0.2
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Pump Level */}
                  <div className="grid grid-cols-[140px_1fr] gap-6 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">{t('allSouls.pump')}</span>
                    <span className="text-sm font-semibold text-secondary uppercase">
                      {archetype.formulaProfile.pumpLevel}
                    </span>
                  </div>

                  {/* Focus Level */}
                  <div className="grid grid-cols-[140px_1fr] gap-6 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">{t('allSouls.focus')}</span>
                    <span className="text-sm font-semibold text-accent uppercase">
                      {archetype.formulaProfile.focusLevel}
                    </span>
                  </div>
                </div>

                {/* Dimension Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold border ${getDimensionBadgeColor(
                      archetype.dimensions.intensity
                    )}`}
                  >
                    {archetype.dimensions.intensity}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold border ${getDimensionBadgeColor(
                      archetype.dimensions.duration
                    )}`}
                  >
                    {archetype.dimensions.duration}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold border ${getDimensionBadgeColor(
                      archetype.dimensions.stimTolerance
                    )}`}
                  >
                    {t('allSouls.stim')}: {archetype.dimensions.stimTolerance}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {t(`archetypes.${archetype.id}.description`)}
                </p>

                {/* View Details Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedArchetype(archetype)}
                >
                  {t('allSouls.viewProfile')}
                </Button>
              </Card>
            </motion.div>
              );
            })
          )}
        </div>

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

        {/* Detailed Modal */}
        {selectedArchetype && (() => {
          const modalBrandColor = SOUL_COLORS[selectedArchetype.id] || '#00e5ff';
          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : { r: 0, g: 229, b: 255 };
          };
          const modalRgb = hexToRgb(modalBrandColor);

          return (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArchetype(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-lighter rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              style={{
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: modalBrandColor,
                boxShadow: `0 0 40px rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.4), 0 0 80px rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.2)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Close Button */}
              <button
                onClick={() => setSelectedArchetype(null)}
                className="sticky top-4 right-4 float-right z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: `rgba(${modalRgb.r}, ${modalRgb.g}, ${modalRgb.b}, 0.2)`,
                  border: `2px solid ${modalBrandColor}`,
                }}
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: modalBrandColor }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 clear-both">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={getSoulLogo(selectedArchetype.id)}
                      alt={selectedArchetype.name}
                      className="w-32 h-32 object-contain mix-blend-lighten"
                      style={{
                        filter: `drop-shadow(0 0 30px ${modalBrandColor}) drop-shadow(0 0 15px ${modalBrandColor})`,
                      }}
                    />
                  </div>
                  <h2
                    className="text-4xl font-heading font-bold mb-2"
                    style={{ color: modalBrandColor }}
                  >
                    {selectedArchetype.name}
                  </h2>
                  <p className="text-xl font-semibold" style={{ color: modalBrandColor }}>
                    {t(`archetypes.${selectedArchetype.id}.tagline`)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {t(`archetypes.${selectedArchetype.id}.description`)}
                </p>

                {/* Formula Profile */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-dark rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">
                      {t('allSouls.modal.caffeineRange')}
                    </h3>
                    <p className="text-2xl font-bold text-primary">
                      {selectedArchetype.formulaProfile.caffeineRange[0] === selectedArchetype.formulaProfile.caffeineRange[1]
                        ? `${selectedArchetype.formulaProfile.caffeineRange[0]}mg`
                        : `${selectedArchetype.formulaProfile.caffeineRange[0]}-${selectedArchetype.formulaProfile.caffeineRange[1]}mg`
                      }
                    </p>
                  </div>
                  <div className="p-4 bg-dark rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">
                      {t('allSouls.modal.intensityLevel')}
                    </h3>
                    <p className="text-2xl font-bold text-secondary">
                      {selectedArchetype.formulaProfile.intensity}/10
                    </p>
                  </div>
                  <div className="p-4 bg-dark rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">{t('allSouls.modal.pumpLevel')}</h3>
                    <p className="text-xl font-bold text-white uppercase">
                      {selectedArchetype.formulaProfile.pumpLevel}
                    </p>
                  </div>
                  <div className="p-4 bg-dark rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">{t('allSouls.modal.focusLevel')}</h3>
                    <p className="text-xl font-bold text-white uppercase">
                      {selectedArchetype.formulaProfile.focusLevel}
                    </p>
                  </div>
                </div>

                {/* Traits & Athlete Types */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">{t('allSouls.modal.coreTraits')}</h3>
                    <ul className="space-y-2">
                      {(t(`archetypes.${selectedArchetype.id}.traits`, { returnObjects: true }) as string[]).map((trait, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-accent mt-1">▸</span>
                          <span className="text-gray-300">{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">{t('allSouls.modal.perfectFor')}</h3>
                    <ul className="space-y-2">
                      {(t(`archetypes.${selectedArchetype.id}.athleteTypes`, { returnObjects: true }) as string[]).map((type, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-accent mt-1">▸</span>
                          <span className="text-gray-300">{type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedArchetype(null)}
                >
                  {t('allSouls.modal.closeButton')}
                </Button>
              </div>
            </motion.div>
          </div>
          );
        })()}
      </div>
    </div>
  );
};
