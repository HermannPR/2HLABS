import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { BadgeWithTooltip } from '../common/BadgeWithTooltip';
import { Scene3D } from '../three/Scene3D';
import { FloatingMolecules } from '../three/FloatingMolecules';
import { useState } from 'react';

export const Hero = () => {
  const { t } = useTranslation();
  const [is3DReady, setIs3DReady] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-0 pb-8">
      {/* 3D Background Scene with smooth fade-in */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark to-secondary/10">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: is3DReady ? 0.4 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Scene3D onReady={() => setIs3DReady(true)}>
            <FloatingMolecules />
          </Scene3D>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4">
            {t('hero.titlePart1')} <span className="text-gradient glow-primary">{t('hero.titlePart2')}</span>
            <br />
            {t('hero.titlePart3')}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/formula">
              <Button size="lg">
                {t('hero.ctaPrimary')}
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline">
                {t('hero.ctaSecondary')}
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12"
          >
            <BadgeWithTooltip
              src="/assets/badges/lab-tested.png"
              alt={t('hero.badges.labTested')}
              tooltip={t('hero.badges.labTestedTooltip')}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mix-blend-lighten"
              glowEffect
            />
            <BadgeWithTooltip
              src="/assets/badges/clinical-dosages.png"
              alt={t('hero.badges.clinicalDosages')}
              tooltip={t('hero.badges.clinicalDosagesTooltip')}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mix-blend-lighten"
              glowEffect
            />
            <BadgeWithTooltip
              src="/assets/badges/science-backed.png"
              alt={t('hero.badges.scienceBacked')}
              tooltip={t('hero.badges.scienceBackedTooltip')}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mix-blend-lighten"
              glowEffect
            />
            <BadgeWithTooltip
              src="/assets/badges/full-transparency.png"
              alt={t('hero.badges.fullTransparency')}
              tooltip={t('hero.badges.fullTransparencyTooltip')}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mix-blend-lighten"
              glowEffect
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
