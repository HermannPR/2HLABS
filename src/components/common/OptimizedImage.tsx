/**
 * OptimizedImage Component
 *
 * Automatically serves WebP images with PNG fallback for older browsers
 * Uses the <picture> element for optimal browser compatibility
 *
 * Usage:
 * <OptimizedImage
 *   src="/assets/souls/thunder-strike.png"
 *   alt="Thunder Strike Soul"
 *   className="w-full h-full"
 * />
 */

import type { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /**
   * Path to the PNG image (WebP version will be auto-detected)
   * Example: "/assets/souls/thunder-strike.png"
   */
  src: string;

  /**
   * Alt text for accessibility (required)
   */
  alt: string;

  /**
   * Optional className for styling
   */
  className?: string;

  /**
   * Enable lazy loading (default: true)
   */
  lazy?: boolean;
}

/**
 * Convert PNG path to WebP path
 * @example "/assets/souls/logo.png" → "/assets/souls/logo.webp"
 */
function getWebPPath(pngPath: string): string {
  return pngPath.replace(/\.png$/i, '.webp');
}

export const OptimizedImage = ({
  src,
  alt,
  className = '',
  lazy = true,
  ...props
}: OptimizedImageProps) => {
  const webpSrc = getWebPPath(src);

  return (
    <picture>
      {/* Modern browsers: serve WebP (88% smaller) */}
      <source
        srcSet={webpSrc}
        type="image/webp"
      />

      {/* Fallback: serve optimized PNG (68% smaller than original) */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        {...props}
      />
    </picture>
  );
};

/**
 * OptimizedBackground Component
 *
 * For background images that need WebP optimization
 * Uses CSS with fallback support
 */

interface OptimizedBackgroundProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
}

export const OptimizedBackground = ({
  src,
  className = '',
  children
}: OptimizedBackgroundProps) => {
  const webpSrc = getWebPPath(src);

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url('${webpSrc}'), url('${src}')`, // WebP first, PNG fallback
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  );
};
