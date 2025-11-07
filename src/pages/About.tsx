import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { HiLightningBolt, HiBeaker, HiSparkles, HiAcademicCap, HiTrendingUp, HiCode } from 'react-icons/hi';
import { useState, useEffect } from 'react';

export const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sports = [
    { icon: '🏀', name: 'Basketball', color: '#FF8C00' },
    { icon: '🏋️', name: 'Gym', color: '#00E5FF' },
    { icon: '🤸', name: 'Calisthenics', color: '#FFE500' },
    { icon: '🏃', name: 'Sprint', color: '#FF00E5' },
    { icon: '🏊', name: 'Swimming', color: '#00D4FF' },
    { icon: '🚴', name: 'Cycling', color: '#90EE90' },
  ];

  return (
    <div className="bg-dark min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 229, 0, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255, 0, 229, 0.04) 0%, transparent 50%),
              radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0, 229, 255, 0.04) 0%, transparent 50%)
            `
          }}
        />

        {/* Floating particles */}
        {!isMobile && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '2px',
              height: '2px',
              background: i % 3 === 0 ? '#FFE500' : i % 3 === 1 ? '#FF00E5' : '#00E5FF',
              boxShadow: `0 0 10px ${i % 3 === 0 ? 'rgba(255, 229, 0, 0.5)' : i % 3 === 1 ? 'rgba(255, 0, 229, 0.5)' : 'rgba(0, 229, 255, 0.5)'}`,
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * 800,
            }}
            animate={{
              y: [null, Math.random() * 800],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/40 mb-8"
              style={{
                boxShadow: '0 0 40px rgba(255, 229, 0, 0.3), 0 0 80px rgba(0, 229, 255, 0.2)'
              }}
            >
              <HiSparkles className="text-primary" size={48} />
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 0 40px rgba(255, 229, 0, 0.15)'
              }}
            >
              The <span className="text-gradient glow-primary">2HLABS</span> Story
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.6)'
              }}
            >
              Born from frustration. Built with science. Powered by athletes.
            </motion.p>
          </motion.div>

          {/* Origin Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <div className="max-w-5xl mx-auto">
              <div className="relative overflow-hidden bg-dark-lighter/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-8 md:p-12"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 229, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-50" />
                
                <div className="relative space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <HiAcademicCap className="text-primary" size={32} />
                    <h2 className="text-3xl font-heading font-bold">The Problem We Lived</h2>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    We were two computer science students who shared a passion that went beyond code: <span className="text-primary font-semibold">athletic performance</span>. Between classes and projects, we trained hard across multiple disciplines.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 py-6">
                    {sports.map((sport, idx) => (
                      <motion.div
                        key={sport.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-dark/60 backdrop-blur-sm border border-dark-light hover:border-primary/40 transition-colors"
                      >
                        <span className="text-3xl">{sport.icon}</span>
                        <span className="text-xs text-gray-400 font-medium">{sport.name}</span>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    But here's the thing: <span className="text-secondary font-semibold">every sport demanded different energy</span>. Basketball needed explosive power. Swimming required sustained endurance. Sprints demanded instant energy without the crash. Yet the market only offered us three choices:
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 my-8">
                    <div className="p-4 rounded-xl bg-red-900/10 border border-red-500/30">
                      <p className="text-red-400 font-semibold mb-2">❌ Too Aggressive</p>
                      <p className="text-sm text-gray-400">300mg+ caffeine bombs that left us jittery and crashed hard</p>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-900/10 border border-orange-500/30">
                      <p className="text-orange-400 font-semibold mb-2">❌ Too Vague</p>
                      <p className="text-sm text-gray-400">Proprietary blends hiding what we actually consumed</p>
                    </div>
                    <div className="p-4 rounded-xl bg-yellow-900/10 border border-yellow-500/30">
                      <p className="text-yellow-400 font-semibold mb-2">❌ One-Size-Fits-All</p>
                      <p className="text-sm text-gray-400">Same formula for powerlifters and yoga enthusiasts</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    As beginners, we were overwhelmed. As experienced athletes, we were frustrated. The supplements industry was designed for marketing, not athletes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* The Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mb-20"
          >
            <div className="max-w-5xl mx-auto">
              <div className="relative overflow-hidden bg-dark-lighter/80 backdrop-blur-xl border border-secondary/20 rounded-2xl p-8 md:p-12"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 229, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl opacity-50" />
                
                <div className="relative space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <HiCode className="text-secondary" size={32} />
                    <h2 className="text-3xl font-heading font-bold">The Algorithm Solution</h2>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    So we did what computer scientists do best: <span className="text-primary font-semibold">we built a system</span>. Not just another supplement brand, but an intelligent framework that understands what each athlete actually needs.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 my-8">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 hover:border-primary/50 transition-all">
                      <div className="text-3xl mb-3">🧬</div>
                      <h3 className="text-lg font-semibold text-primary mb-2">12 Training Souls</h3>
                      <p className="text-sm text-gray-400">Distinct archetypes based on training style, goals, and experience level</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 hover:border-secondary/50 transition-all">
                      <div className="text-3xl mb-3">⚡</div>
                      <h3 className="text-lg font-semibold text-secondary mb-2">Smart Matching</h3>
                      <p className="text-sm text-gray-400">Algorithm analyzes your needs and matches you to your training soul</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 hover:border-accent/50 transition-all">
                      <div className="text-3xl mb-3">🔬</div>
                      <h3 className="text-lg font-semibold text-accent mb-2">Transparent Formulas</h3>
                      <p className="text-sm text-gray-400">Every ingredient, every dose, backed by research and explained clearly</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    No more guessing. No more proprietary blends. No more one-size-fits-all. Just science-backed formulas tailored to how you actually train.
                  </p>

                  <div className="mt-8 p-6 rounded-xl bg-dark/60 border-l-4 border-primary">
                    <p className="text-gray-300 italic">
                      "We built 2HLABS because we needed it ourselves. Every formula, every feature, every line of code comes from our own frustration with the industry. This is the supplement platform we wish existed when we started."
                    </p>
                    <p className="text-sm text-gray-500 mt-3">— The 2HLABS Founders</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-heading font-bold mb-12 text-center">
              What Drives <span className="text-gradient">Us</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden bg-dark-lighter/60 backdrop-blur-sm border border-primary/20 rounded-xl p-6"
                style={{
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 border border-primary/30">
                    <HiBeaker className="text-primary" size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Science Over Hype</h3>
                  <p className="text-gray-400">Every ingredient backed by peer-reviewed research. No proprietary blends, no hidden doses, no BS.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden bg-dark-lighter/60 backdrop-blur-sm border border-secondary/20 rounded-xl p-6"
                style={{
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-4 border border-secondary/30">
                    <HiLightningBolt className="text-secondary" size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Built By Athletes</h3>
                  <p className="text-gray-400">We don't just sell supplements—we use them. Every formula is tested by real athletes in real training.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="relative overflow-hidden bg-dark-lighter/60 backdrop-blur-sm border border-accent/20 rounded-xl p-6"
                style={{
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 border border-accent/30">
                    <HiTrendingUp className="text-accent" size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Personalization First</h3>
                  <p className="text-gray-400">Your training is unique. Your formula should be too. Match your soul, optimize your performance.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-dark-lighter/80 to-secondary/10 backdrop-blur-xl border border-primary/30 rounded-2xl p-8 md:p-12"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 229, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
              
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Ready to Find <span className="text-gradient">Your Formula?</span>
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Discover your training soul and get a personalized pre-workout formula built for how you actually train.
                </p>
                <Link to="/formula">
                  <Button 
                    size="lg"
                    className="text-lg px-8 py-4 hover:scale-105 transition-transform"
                  >
                    Discover Your Training Soul
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
