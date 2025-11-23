import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { BadgeWithTooltip } from '../common/BadgeWithTooltip';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useInViewport } from '../../hooks/useInViewport';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Lazy load 3D components - Only essential ones
const Scene3D = lazy(() => import('../three/Scene3D').then(m => ({ default: m.Scene3D })));
const MolecularStructures = lazy(() => import('../three/MolecularStructures').then(m => ({ default: m.MolecularStructures })));

export const Hero = () => {
  const { t } = useTranslation();
  const [is3DReady, setIs3DReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(heroRef, { threshold: 0.1, rootMargin: '200px' });
  const prefersReducedMotion = useReducedMotion();
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  // Badge data for rotation
  const badges = [
    {
      src: "/assets/badges/lab-tested.png",
      alt: t('hero.badges.labTested'),
      tooltip: t('hero.badges.labTestedTooltip'),
    },
    {
      src: "/assets/badges/clinical-dosages.png",
      alt: t('hero.badges.clinicalDosages'),
      tooltip: t('hero.badges.clinicalDosagesTooltip'),
    },
    {
      src: "/assets/badges/science-backed.png",
      alt: t('hero.badges.scienceBacked'),
      tooltip: t('hero.badges.scienceBackedTooltip'),
    },
    {
      src: "/assets/badges/full-transparency.png",
      alt: t('hero.badges.fullTransparency'),
      tooltip: t('hero.badges.fullTransparencyTooltip'),
    },
  ];

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate badges on mobile
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentBadgeIndex((prev) => (prev + 1) % badges.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, prefersReducedMotion, badges.length]);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-dark md:-mt-16">
      {/* Premium iridescent gradient background - CSS only, 60fps */}
      <div className="absolute inset-0">
        {/* Layer 1: Base molecular glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 50% -10%, rgba(255, 229, 0, 0.14) 0%, transparent 60%),
              radial-gradient(ellipse 100% 70% at 80% 50%, rgba(255, 0, 229, 0.10) 0%, transparent 55%),
              radial-gradient(ellipse 100% 70% at 20% 50%, rgba(0, 229, 255, 0.10) 0%, transparent 55%),
              radial-gradient(ellipse 150% 120% at 50% 100%, rgba(10, 14, 39, 1) 0%, rgba(10, 14, 39, 0.98) 100%)
            `
          }}
        />

        {/* Layer 2: Iridescent shimmer - slow animation */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                conic-gradient(from 0deg at 50% 50%,
                  rgba(255, 229, 0, 0.08) 0deg,
                  rgba(255, 0, 229, 0.08) 120deg,
                  rgba(0, 229, 255, 0.08) 240deg,
                  rgba(255, 229, 0, 0.08) 360deg)
              `,
              backgroundSize: '200% 200%',
              animation: 'iridescent-shift 30s ease-in-out infinite',
            }}
          />
        )}

        {/* Layer 3: Subtle noise texture for depth */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Optimized 3D Scene - Main Particles Only */}
        {isInViewport && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: is3DReady ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Suspense fallback={null}>
              <Scene3D
                dynamicCamera
                mouseControlled
                enableFog={false} // Disable fog for performance
                onReady={() => setIs3DReady(true)}
              >
                {/* Only main hero molecules - no heavy fog or background noise */}
                <MolecularStructures />
              </Scene3D>
            </Suspense>
          </motion.div>
        )}
      </div>

      {/* Enhanced radial gradient overlay for maximum content visibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, rgba(10, 14, 39, 0.85) 0%, rgba(10, 14, 39, 0.6) 30%, rgba(10, 14, 39, 0.3) 60%, transparent 100%),
            linear-gradient(to bottom, rgba(10, 14, 39, 0.7) 0%, rgba(10, 14, 39, 0.4) 25%, transparent 50%, transparent 75%, rgba(10, 14, 39, 0.6) 100%)
          `,
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center min-h-screen py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Main headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)' }}>
            {t('hero.titlePart1')} <span className="text-gradient glow-primary">{t('hero.titlePart2')}</span>
            <br />
            {t('hero.titlePart3')}
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-white mb-4 max-w-3xl mx-auto" style={{ textShadow: '0 3px 6px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.7)' }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link to="/formula">
              <Button size="lg" className="shadow-[0_0_35px_rgba(255,229,0,0.7),0_10px_25px_rgba(0,0,0,0.9)] hover:shadow-[0_0_50px_rgba(255,229,0,0.9),0_15px_35px_rgba(0,0,0,0.95)] ring-2 ring-black/50">
                {t('hero.ctaPrimary')}
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="shadow-[0_0_25px_rgba(0,229,255,0.5),0_10px_25px_rgba(0,0,0,0.9)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7),0_15px_35px_rgba(0,0,0,0.95)] ring-2 ring-black/50">
                {t('hero.ctaSecondary')}
              </Button>
            </Link>
          </div>

          {/* Trust Badges - Single rotating badge on mobile, row on desktop */}
          {isMobile ? (
            // Mobile: Spinning badge carousel with text on top
            <div className="flex flex-col items-center gap-2 w-full">
              {/* Subtle badge description on top */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`hint-${currentBadgeIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm text-gray-400 font-normal text-center"
                >
                  {badges[currentBadgeIndex].alt}
                </motion.p>
              </AnimatePresence>

              {/* Spinning badge container */}
              <div className="relative w-28 h-28" style={{ contain: 'layout style paint' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBadgeIndex}
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      rotateY: -180,
                      rotateZ: -90
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      rotateZ: 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      rotateY: 180,
                      rotateZ: 90
                    }}
                    transition={{
                      duration: 0.7,
                      ease: "easeInOut"
                    }}
                    style={{
                      willChange: "transform, opacity",
                      transformStyle: "preserve-3d"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <BadgeWithTooltip
                      src={badges[currentBadgeIndex].src}
                      alt={badges[currentBadgeIndex].alt}
                      tooltip={badges[currentBadgeIndex].tooltip}
                      className="w-28 h-28 mix-blend-lighten"
                      glowEffect
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress indicators with scroll hint */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                  {badges.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentBadgeIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${idx === currentBadgeIndex
                        ? 'bg-primary w-8'
                        : 'bg-gray-700 hover:bg-gray-600 w-1.5'
                        }`}
                      aria-label={`View badge ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Scroll down indicator - visible and clear */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-1.5 opacity-60"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-gray-300"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                  <div className="w-1 h-3 bg-gradient-to-b from-gray-300 to-transparent rounded-full" />
                </motion.div>
              </div>
            </div>
          ) : (
            // Desktop: All badges in a row
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-5 md:gap-6 lg:gap-8"
            >
              {badges.map((badge, idx) => (
                <BadgeWithTooltip
                  key={idx}
                  src={badge.src}
                  alt={badge.alt}
                  tooltip={badge.tooltip}
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mix-blend-lighten"
                  glowEffect
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator - desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-3 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};
