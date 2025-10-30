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

// Brand colors for each soul archetype
const SOUL_COLORS: Record<string, string> = {
  'gorilla-rage': '#FF5722',      // Warmer orange-red
  'dragon-blood': '#8B0000',      // Red wine / dark red
  'cheetah-sprint': '#FFFF00',    // Bright yellow (reverted)
  'eagle-vision': '#00D4FF',      // Colder cyan / ice blue
  'titan-strength': '#708090',    // Slate gray
  'phoenix-rise': '#FF6600',      // Orange
  'serpent-flow': '#00FF88',      // Green
  'wolf-pack': '#6B8E23',         // Olive green / green-gray
  'mantis-focus': '#32CD32',      // Lime green (mantis focus)
  'viper-strike': '#00FF00',      // Neon green
  'bear-endurance': '#8B4513',    // Brown
  'thunder-strike': '#9933FF',    // Purple (thunder strike)
  'lion-heart': '#FFD700',        // Warm golden yellow
};

export const AllSouls = () => {
  const navigate = useNavigate();
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
            Discover All <span className="text-gradient">12 Training Souls</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Each soul represents a unique training philosophy and energy signature. Find the ones that match your different training needs.
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
              const isHovered = hoveredCard === archetype.id;
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
              onMouseEnter={() => setHoveredCard(archetype.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderColor: isHovered ? brandColor : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered ? `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` : 'none',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease',
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
                    {archetype.tagline}
                  </p>
                </div>

                {/* Key Stats */}
                <div className="space-y-3 mb-4">
                  {/* Caffeine Range */}
                  <div className="grid grid-cols-[140px_1fr] gap-6 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">Caffeine</span>
                    <span className="text-sm font-bold text-white">
                      {archetype.formulaProfile.caffeineRange[0] === archetype.formulaProfile.caffeineRange[1]
                        ? `${archetype.formulaProfile.caffeineRange[0]}mg`
                        : `${archetype.formulaProfile.caffeineRange[0]}-${archetype.formulaProfile.caffeineRange[1]}mg`
                      }
                    </span>
                  </div>

                  {/* Intensity */}
                  <div className="grid grid-cols-[140px_1fr] gap-6 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">Intensity</span>
                    <div className="flex items-center gap-1">
                      {[...Array(10)].map((_, i) => {
                        const isActive = i < archetype.formulaProfile.intensity;
                        const intensity = archetype.formulaProfile.intensity;

                        // Calculate gradient color based on position in the bar
                        let bgClass = 'bg-gray-800';
                        if (isActive) {
                          if (intensity >= 9) {
                            // Maximum intensity: red gradient
                            bgClass = i < 3 ? 'bg-orange-500' : i < 6 ? 'bg-red-500' : 'bg-red-600';
                          } else if (intensity >= 7) {
                            // High intensity: orange to red
                            bgClass = i < 4 ? 'bg-yellow-500' : i < 7 ? 'bg-orange-500' : 'bg-red-500';
                          } else if (intensity >= 5) {
                            // Medium intensity: yellow to orange
                            bgClass = i < 3 ? 'bg-green-500' : i < 5 ? 'bg-yellow-500' : 'bg-orange-500';
                          } else {
                            // Low intensity: green to yellow
                            bgClass = i < 2 ? 'bg-green-400' : i < 4 ? 'bg-green-500' : 'bg-yellow-500';
                          }
                        }

                        return (
                          <div
                            key={i}
                            className={`w-1.5 h-5 rounded-sm transition-all ${bgClass} ${
                              isActive ? 'opacity-100 shadow-lg' : 'opacity-20'
                            }`}
                            style={isActive ? {
                              boxShadow: intensity >= 8 ? '0 0 8px rgba(239, 68, 68, 0.6)' :
                                        intensity >= 6 ? '0 0 8px rgba(249, 115, 22, 0.5)' :
                                        '0 0 6px rgba(234, 179, 8, 0.4)'
                            } : undefined}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Pump Level */}
                  <div className="grid grid-cols-[140px_1fr] gap-6 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">Pump</span>
                    <span className="text-sm font-semibold text-secondary uppercase">
                      {archetype.formulaProfile.pumpLevel}
                    </span>
                  </div>

                  {/* Focus Level */}
                  <div className="grid grid-cols-[140px_1fr] gap-6 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">Focus</span>
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
                    Stim: {archetype.dimensions.stimTolerance}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {archetype.description}
                </p>

                {/* View Details Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedArchetype(archetype)}
                >
                  View Full Profile
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
              Ready to Discover Your Soul?
            </h2>
            <p className="text-gray-400 mb-6">
              Take our 2-minute quiz to find which soul matches today's training. You can discover multiple souls for different workout styles.
            </p>
            <Button size="lg" onClick={() => navigate('/formula')}>
              Discover Your Soul
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
                    {selectedArchetype.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedArchetype.description}
                </p>

                {/* Formula Profile */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-dark rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">
                      Caffeine Range
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
                      Intensity Level
                    </h3>
                    <p className="text-2xl font-bold text-secondary">
                      {selectedArchetype.formulaProfile.intensity}/10
                    </p>
                  </div>
                  <div className="p-4 bg-dark rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Pump Level</h3>
                    <p className="text-xl font-bold text-white uppercase">
                      {selectedArchetype.formulaProfile.pumpLevel}
                    </p>
                  </div>
                  <div className="p-4 bg-dark rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Focus Level</h3>
                    <p className="text-xl font-bold text-white uppercase">
                      {selectedArchetype.formulaProfile.focusLevel}
                    </p>
                  </div>
                </div>

                {/* Traits & Athlete Types */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Core Traits</h3>
                    <ul className="space-y-2">
                      {selectedArchetype.traits.map((trait, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-accent mt-1">▸</span>
                          <span className="text-gray-300">{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">Perfect For</h3>
                    <ul className="space-y-2">
                      {selectedArchetype.athleteTypes.map((type, idx) => (
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
                  Close
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
