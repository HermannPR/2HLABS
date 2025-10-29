import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { HiLightningBolt } from 'react-icons/hi';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-20 pb-16">
      {/* Hero Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-dark to-secondary/10">
        <img
          src="/assets/backgrounds/hero-bg.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-dark-lighter border border-primary/30 rounded-full px-4 py-2 mb-6"
          >
            <HiLightningBolt className="text-accent" />
            <span className="text-sm text-gray-300">Science-Backed | Personalized | Results-Driven</span>
          </motion.div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4">
            Your <span className="text-gradient glow-primary">Perfect</span>
            <br />
            Preworkout Formula
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Stop settling for one-size-fits-all supplements. Get a personalized preworkout
            tailored to your goals, body, and training style.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/formula">
              <Button size="lg">
                Build Your Formula Now
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            <div className="flex flex-col items-center">
              <img
                src="/assets/badges/lab-tested.png"
                alt="Lab Tested"
                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-3 mix-blend-lighten"
                style={{ filter: 'drop-shadow(0 0 12px rgba(0, 229, 255, 0.3))' }}
              />
              <span className="text-sm md:text-base font-semibold text-gray-300">Lab Tested</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/badges/clinical-dosages.png"
                alt="Clinical Dosages"
                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-3 mix-blend-lighten"
                style={{ filter: 'drop-shadow(0 0 12px rgba(0, 229, 255, 0.3))' }}
              />
              <span className="text-sm md:text-base font-semibold text-gray-300">Clinical Dosages</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/badges/science-backed.png"
                alt="Science Backed"
                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-3 mix-blend-lighten"
                style={{ filter: 'drop-shadow(0 0 12px rgba(0, 229, 255, 0.3))' }}
              />
              <span className="text-sm md:text-base font-semibold text-gray-300">Science-Backed</span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/badges/full-transparency.png"
                alt="Full Transparency"
                className="w-24 h-24 md:w-32 md:h-32 object-contain mb-3 mix-blend-lighten"
                style={{ filter: 'drop-shadow(0 0 12px rgba(0, 229, 255, 0.3))' }}
              />
              <span className="text-sm md:text-base font-semibold text-gray-300">Full Transparency</span>
            </div>
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
