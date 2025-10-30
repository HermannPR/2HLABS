import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { HiCheckCircle } from 'react-icons/hi';
import type { Archetype } from '../../types';

interface FlavorSelectionProps {
  archetype: Archetype;
  onFlavorSelected: (flavorId: string) => void;
  onSkip: () => void;
}

export const FlavorSelection = ({ archetype, onFlavorSelected, onSkip }: FlavorSelectionProps) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  const handleFlavorClick = (flavorId: string) => {
    setSelectedFlavor(flavorId);
  };

  const handleContinue = () => {
    if (selectedFlavor) {
      onFlavorSelected(selectedFlavor);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-heading font-bold mb-3"
        >
          Choose Your <span className="text-primary">Flavor</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg"
        >
          Select a flavor for your {archetype.name} formula
        </motion.p>
      </div>

      {/* Flavor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {archetype.flavors.map((flavor, idx) => {
          const isSelected = selectedFlavor === flavor.id;
          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
              ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
                }
              : { r: 0, g: 229, b: 255 };
          };
          const rgb = hexToRgb(flavor.color);

          return (
            <motion.div
              key={flavor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx + 0.4 }}
            >
              <button
                onClick={() => handleFlavorClick(flavor.id)}
                className="w-full relative group"
              >
                <div
                  className={`
                    p-6 rounded-xl transition-all duration-300 relative overflow-hidden
                    ${
                      isSelected
                        ? 'ring-2'
                        : 'hover:scale-105'
                    }
                  `}
                  style={{
                    background: `linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1) 0%, #0a0a0a 100%)`,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: isSelected ? flavor.color : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isSelected
                      ? `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4), 0 0 60px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2), 0 0 0 2px ${flavor.color}`
                      : 'none',
                  }}
                >
                  {/* Background Gradient Blob */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{
                      background: `radial-gradient(circle, ${flavor.color} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Coming Soon Badge */}
                  {flavor.comingSoon && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                      COMING SOON
                    </div>
                  )}

                  {/* Selection Check */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 left-4"
                    >
                      <HiCheckCircle size={32} style={{ color: flavor.color }} />
                    </motion.div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 text-center mt-8">
                    {/* Color Swatch */}
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${flavor.color} 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 100%)`,
                        boxShadow: `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`,
                      }}
                    />

                    {/* Flavor Name */}
                    <h3
                      className="text-2xl font-heading font-bold mb-2 transition-colors"
                      style={{
                        color: isSelected ? flavor.color : '#fff',
                      }}
                    >
                      {flavor.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm">
                      {flavor.description}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedFlavor}
          className="text-lg px-8"
        >
          Continue with {selectedFlavor ? archetype.flavors.find(f => f.id === selectedFlavor)?.name : 'Selected Flavor'}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onSkip}
          className="text-lg px-8"
        >
          Skip for Now
        </Button>
      </motion.div>

      {/* Info Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-gray-500 text-sm mt-6"
      >
        Don't worry, you can change your flavor choice anytime before launch
      </motion.p>
    </motion.div>
  );
};
