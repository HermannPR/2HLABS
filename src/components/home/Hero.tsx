import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { BadgeWithTooltip } from '../common/BadgeWithTooltip';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useInViewport } from '../../hooks/useInViewport';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Lazy load 3D components for better initial load performance
const Scene3D = lazy(() => import('../three/Scene3D').then(m => ({ default: m.Scene3D })));
const MolecularStructures = lazy(() => import('../three/MolecularStructures').then(m => ({ default: m.MolecularStructures })));
const BackgroundMolecules = lazy(() => import('../three/BackgroundMolecules').then(m => ({ default: m.BackgroundMolecules })));
const VolumetricFog = lazy(() => import('../three/VolumetricFog').then(m => ({ default: m.VolumetricFog })));

export const Hero = () => {
  const { t } = useTranslation();
  const [is3DReady, setIs3DReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(heroRef, { threshold: 0.1, rootMargin: '200px' });
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-dark md:-mt-16">
      {/* Premium subtle gradient background - Apple/Samsung style */}
      <div className="absolute inset-0">
        {/* Static base gradient layer for instant load */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 229, 0, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255, 0, 229, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0, 229, 255, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 100% 100% at 50% 100%, rgba(10, 14, 39, 1) 0%, rgba(10, 14, 39, 0.95) 100%)
            `
          }}
        />

        {/* Subtle animated gradient overlay */}
        {!isMobile && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(255, 229, 0, 0.04) 0%, transparent 50%)',
                'radial-gradient(ellipse 70% 50% at 70% 60%, rgba(255, 0, 229, 0.04) 0%, transparent 50%)',
                'radial-gradient(ellipse 70% 50% at 30% 30%, rgba(255, 229, 0, 0.04) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* 3D Scene overlay - subtle and smooth */}
        {isInViewport && (
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: is3DReady ? 0.7 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-primary/5 via-dark to-secondary/5" />}>
              <Scene3D
                dynamicCamera
                mouseControlled
                enableFog
                fogColor="#0a0e27"
                fogDensity={0.035}
                onReady={() => setIs3DReady(true)}
              >
                {/* Volumetric fog particles (reduced on mobile) */}
                <VolumetricFog
                  particleCount={isMobile ? 300 : 800}
                  color1="#FFE500"
                  color2="#FF00E5"
                  color3="#00E5FF"
                  size={isMobile ? 2.0 : 2.5}
                  opacity={isMobile ? 0.15 : 0.2}
                  driftSpeed={0.015}
                />

                {/* Background molecular space (reduced on mobile) */}
                <BackgroundMolecules
                  farCount={isMobile ? 10 : 30}
                  midCount={isMobile ? 5 : 15}
                  nearCount={isMobile ? 2 : 5}
                />

                {/* Hero molecules (in focus) */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 pt-20 pb-16 md:pt-8 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4" style={{textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)'}}>
            {t('hero.titlePart1')} <span className="text-gradient glow-primary">{t('hero.titlePart2')}</span>
            <br />
            {t('hero.titlePart3')}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white mb-6 max-w-3xl mx-auto" style={{textShadow: '0 3px 6px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.7)'}}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-12 mb-8"
          >
            <BadgeWithTooltip
              src="/assets/badges/lab-tested.png"
              alt={t('hero.badges.labTested')}
              tooltip={t('hero.badges.labTestedTooltip')}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mix-blend-lighten"
              glowEffect
            />
            <BadgeWithTooltip
              src="/assets/badges/clinical-dosages.png"
              alt={t('hero.badges.clinicalDosages')}
              tooltip={t('hero.badges.clinicalDosagesTooltip')}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mix-blend-lighten"
              glowEffect
            />
            <BadgeWithTooltip
              src="/assets/badges/science-backed.png"
              alt={t('hero.badges.scienceBacked')}
              tooltip={t('hero.badges.scienceBackedTooltip')}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mix-blend-lighten"
              glowEffect
            />
            <BadgeWithTooltip
              src="/assets/badges/full-transparency.png"
              alt={t('hero.badges.fullTransparency')}
              tooltip={t('hero.badges.fullTransparencyTooltip')}
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 mix-blend-lighten"
              glowEffect
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
    </section>
  );
};
