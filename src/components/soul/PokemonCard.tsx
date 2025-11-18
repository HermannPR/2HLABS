import type { Archetype } from '../../types';

interface PokemonCardProps {
  archetype: Archetype;
  brandColor: { primary: string; secondary: string };
  getSoulLogo: (id: string) => string;
  caffeineRange: [number, number];
  intensity: number;
  isFlipped?: boolean;
  hideOriginalBorder?: boolean;
  isMobile?: boolean;
  reduceMotion?: boolean;
}

// Helper function to convert level string to percentage
const getLevelPercentage = (level: string): number => {
  const levelMap: Record<string, number> = {
    none: 0,
    low: 33,
    moderate: 66,
    high: 100,
  };
  return levelMap[level.toLowerCase()] || 50;
};

// Helper function for dimension values
const getDimensionPercentage = (value: string): number => {
  const valueMap: Record<string, number> = {
    sprint: 40,
    marathon: 80,
    mixed: 60,
    explosive: 90,
    steady: 70,
    controlled: 50,
    aggressive: 85,
    flow: 75,
    burst: 45,
    sustained: 95,
    balanced: 65,
  };
  return valueMap[value.toLowerCase()] || 50;
};

/**
 * Pokemon-style card design for soul archetypes
 * Shows key visual info, click to see full details
 */
export function PokemonCard({
  archetype,
  brandColor,
  getSoulLogo,
  caffeineRange,
  intensity,
  isFlipped = false,
  hideOriginalBorder = false,
  isMobile = false,
  reduceMotion = false,
}: PokemonCardProps) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden bg-dark-lighter"
      style={{
        contain: 'layout style paint',
        willChange: isFlipped ? 'transform' : 'auto',
      }}
    >
      {/* Static card background - no animation for performance */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, ${brandColor.primary}15 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, ${brandColor.secondary}15 0%, transparent 50%)
          `,
        }}
      />

      {/* Card border with soul colors */}
      {!hideOriginalBorder && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${brandColor.primary}, ${brandColor.secondary})`,
            padding: '3px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Card content */}
      <div className="relative h-full p-4 pb-6 flex flex-col">
        {/* Header with name and type */}
        <div className="mb-3">
          <h3
            className="text-xl font-heading font-bold mb-1"
            style={{ color: brandColor.primary }}
          >
            {archetype.name}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: `${brandColor.primary}20`,
                color: brandColor.primary,
                border: `1px solid ${brandColor.primary}40`,
              }}
            >
              {archetype.dimensions.intensity.toUpperCase()}
            </span>
            <span className="text-xs text-gray-400">
              {caffeineRange[0] === caffeineRange[1]
                ? `${caffeineRange[0]}mg`
                : `${caffeineRange[0]}-${caffeineRange[1]}mg`}
            </span>
          </div>
        </div>

        {/* Main image area - reduced size */}
        <div className="flex items-center justify-center mb-3 relative">
          {/* Soul logo - with lazy loading */}
          <img
            src={getSoulLogo(archetype.id)}
            alt={archetype.name}
            loading="lazy"
            className="relative z-10 w-36 h-36 object-contain"
          />
        </div>

        {/* Stats bars - expanded section */}
        <div className="space-y-2.5 flex-1">
          {/* Caffeine */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">CAFFEINE</span>
              <span className="text-white font-bold">
                {caffeineRange[0] === caffeineRange[1]
                  ? `${caffeineRange[0]}mg`
                  : `${caffeineRange[0]}-${caffeineRange[1]}mg`}
              </span>
            </div>
            <div className="h-2 bg-dark rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${brandColor.primary}, ${brandColor.secondary})`,
                  width: `${Math.min((caffeineRange[1] / 400) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Intensity */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">INTENSITY</span>
              <span className="text-white font-bold">{intensity}/10</span>
            </div>
            <div className="h-2 bg-dark rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${brandColor.primary}, ${brandColor.secondary})`,
                  width: `${(intensity / 10) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Pump Level */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">PUMP</span>
              <span className="text-white font-bold uppercase">{archetype.formulaProfile.pumpLevel}</span>
            </div>
            <div className="h-2 bg-dark rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${brandColor.primary}, ${brandColor.secondary})`,
                  width: `${getLevelPercentage(archetype.formulaProfile.pumpLevel)}%`,
                }}
              />
            </div>
          </div>

          {/* Focus Level */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">FOCUS</span>
              <span className="text-white font-bold uppercase">{archetype.formulaProfile.focusLevel}</span>
            </div>
            <div className="h-2 bg-dark rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${brandColor.primary}, ${brandColor.secondary})`,
                  width: `${getLevelPercentage(archetype.formulaProfile.focusLevel)}%`,
                }}
              />
            </div>
          </div>

          {/* Energy Duration */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">DURATION</span>
              <span className="text-white font-bold uppercase">{archetype.dimensions.duration}</span>
            </div>
            <div className="h-2 bg-dark rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${brandColor.primary}, ${brandColor.secondary})`,
                  width: `${getDimensionPercentage(archetype.dimensions.duration)}%`,
                }}
              />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xs text-gray-400 italic text-center pt-2 mt-auto border-t border-gray-800">
            "{archetype.tagline}"
          </p>
        </div>
      </div>
    </div>
  );
}
