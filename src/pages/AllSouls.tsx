import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ARCHETYPES } from '../data/archetypes';
import { getSoulLogo } from '../utils/soulLogos';
import type { Archetype } from '../types';
import { useState } from 'react';

export const AllSouls = () => {
  const navigate = useNavigate();
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);

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
          {ARCHETYPES.map((archetype, idx) => (
            <motion.div
              key={archetype.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="h-full hover:border-primary/50 transition-all cursor-pointer group">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="mb-3 group-hover:scale-110 transition-transform flex justify-center">
                    <img
                      src={getSoulLogo(archetype.id)}
                      alt={archetype.name}
                      className="w-24 h-24 object-contain mix-blend-lighten"
                      style={{ filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.3))' }}
                    />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-1 group-hover:text-primary transition-colors">
                    {archetype.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm">
                    {archetype.tagline}
                  </p>
                </div>

                {/* Key Stats */}
                <div className="space-y-3 mb-4">
                  {/* Caffeine Range */}
                  <div className="grid grid-cols-[80px_1fr] gap-3 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">Caffeine</span>
                    <span className="text-sm font-bold text-white">
                      {archetype.formulaProfile.caffeineRange[0]}-
                      {archetype.formulaProfile.caffeineRange[1]}mg
                    </span>
                  </div>

                  {/* Intensity */}
                  <div className="grid grid-cols-[80px_1fr] gap-3 items-center p-2 bg-dark-lighter rounded">
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
                  <div className="grid grid-cols-[80px_1fr] gap-3 items-center p-2 bg-dark-lighter rounded">
                    <span className="text-xs text-gray-400">Pump</span>
                    <span className="text-sm font-semibold text-secondary uppercase">
                      {archetype.formulaProfile.pumpLevel}
                    </span>
                  </div>

                  {/* Focus Level */}
                  <div className="grid grid-cols-[80px_1fr] gap-3 items-center p-2 bg-dark-lighter rounded">
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
          ))}
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
              Take our 2-minute quiz to find which training soul lives inside you
            </p>
            <Button size="lg" onClick={() => navigate('/formula')}>
              Take the Soul Discovery Quiz
            </Button>
          </Card>
        </motion.div>

        {/* Detailed Modal */}
        {selectedArchetype && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArchetype(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-lighter border-2 border-primary/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={getSoulLogo(selectedArchetype.id)}
                      alt={selectedArchetype.name}
                      className="w-32 h-32 object-contain mix-blend-lighten"
                      style={{ filter: 'drop-shadow(0 0 15px rgba(0, 229, 255, 0.4))' }}
                    />
                  </div>
                  <h2 className="text-4xl font-heading font-bold mb-2">
                    {selectedArchetype.name}
                  </h2>
                  <p className="text-xl text-primary font-semibold">
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
                      {selectedArchetype.formulaProfile.caffeineRange[0]}-
                      {selectedArchetype.formulaProfile.caffeineRange[1]}mg
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
        )}
      </div>
    </div>
  );
};
