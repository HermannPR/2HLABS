/**
 * Soul Logo Utility
 * Centralized mapping of archetype IDs to soul logo asset paths
 */

/**
 * Get the asset path for a soul logo by archetype ID
 * @param archetypeId - The archetype identifier (e.g., 'gorilla-rage')
 * @returns The asset path or empty string if not found
 */
export const getSoulLogo = (archetypeId: string): string => {
  const logoMap: Record<string, string> = {
    'gorilla-rage': '/assets/souls/gorilla-rage.png',
    'dragon-blood': '/assets/souls/dragon-blood.png',
    'cheetah-sprint': '/assets/souls/cheetah-sprint.png',
    'eagle-vision': '/assets/souls/eagle-vision.png',
    'titan-strength': '/assets/souls/titan-strength.png',
    'wolf-pack': '/assets/souls/wolf-pack.png',
    'phoenix-rise': '/assets/souls/phoenix-rise.png',
    'bear-endurance': '/assets/souls/bear-endurance.png',
    'mantis-focus': '/assets/souls/mantis-focus.png',
    'thunder-strike': '/assets/souls/thunder-strike.png',
    'serpent-flow': '/assets/souls/serpent-flow.png',
    'lion-heart': '/assets/souls/lion-heart.png',
  };

  return logoMap[archetypeId] || '';
};

/**
 * Check if a soul logo exists for given archetype ID
 * @param archetypeId - The archetype identifier
 * @returns True if logo mapping exists
 */
export const hasSoulLogo = (archetypeId: string): boolean => {
  return getSoulLogo(archetypeId) !== '';
};

/**
 * Get all available soul logo paths
 * @returns Array of all soul logo asset paths
 */
export const getAllSoulLogos = (): string[] => {
  return [
    '/assets/souls/gorilla-rage.png',
    '/assets/souls/dragon-blood.png',
    '/assets/souls/cheetah-sprint.png',
    '/assets/souls/eagle-vision.png',
    '/assets/souls/titan-strength.png',
    '/assets/souls/wolf-pack.png',
    '/assets/souls/phoenix-rise.png',
    '/assets/souls/bear-endurance.png',
    '/assets/souls/mantis-focus.png',
    '/assets/souls/thunder-strike.png',
    '/assets/souls/serpent-flow.png',
    '/assets/souls/lion-heart.png',
  ];
};
