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
              Built from opportunity. Powered by science. Made for athletes.
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
                    <h2 className="text-3xl font-heading font-bold">The Opportunity We Saw</h2>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    We were two computer science students with a passion beyond code: <span className="text-primary font-semibold">peak athletic performance</span>. Between classes and projects, we trained across multiple disciplines, each demanding something different from our bodies.
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
                    Then we realized something: <span className="text-secondary font-semibold">personalization wasn't just easier—it was fundamentally better</span>. Just like how Spotify creates custom playlists that fit your taste better than any radio station, or how Netflix recommends shows that match your preferences perfectly.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 my-8">
                    <div className="p-4 rounded-xl bg-primary-900/10 border border-primary/30">
                      <p className="text-primary font-semibold mb-2">✨ Better Performance</p>
                      <p className="text-sm text-gray-400">Custom formulas matched to your training deliver superior results</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary-900/10 border border-secondary/30">
                      <p className="text-secondary font-semibold mb-2">✨ Smarter Science</p>
                      <p className="text-sm text-gray-400">Algorithms optimize ingredient ratios for your specific needs</p>
                    </div>
                    <div className="p-4 rounded-xl bg-accent-900/10 border border-accent/30">
                      <p className="text-accent font-semibold mb-2">✨ More Efficient</p>
                      <p className="text-sm text-gray-400">No wasted ingredients or doses that don't match your goals</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    The supplement industry was stuck selling the same formula to everyone. We saw an opportunity to do what tech does best: <span className="text-primary font-semibold">use data and algorithms to deliver better, personalized experiences</span>.
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
                    <h2 className="text-3xl font-heading font-bold">The Technology Advantage</h2>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    We asked ourselves: <span className="text-primary font-semibold">what if supplements worked like modern technology?</span> Your phone learns your habits. Your music app curates your playlists. Your fitness tracker adapts to your progress. Why should pre-workout be any different?
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 my-8">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 hover:border-primary/50 transition-all">
                      <div className="text-3xl mb-3">🧬</div>
                      <h3 className="text-lg font-semibold text-primary mb-2">12 Training Souls</h3>
                      <p className="text-sm text-gray-400">Unique archetypes matched to your training style, goals, and experience</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 hover:border-secondary/50 transition-all">
                      <div className="text-3xl mb-3">⚡</div>
                      <h3 className="text-lg font-semibold text-secondary mb-2">Intelligent Matching</h3>
                      <p className="text-sm text-gray-400">Algorithms analyze your needs and optimize your formula in real-time</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 hover:border-accent/50 transition-all">
                      <div className="text-3xl mb-3">🔬</div>
                      <h3 className="text-lg font-semibold text-accent mb-2">Research-Backed</h3>
                      <p className="text-sm text-gray-400">Every ingredient optimized with science, no marketing gimmicks</p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    The result? <span className="text-secondary font-semibold">Formulas that perform better because they're built for YOU</span>. Not easier—better. Not simpler—smarter. Just like a custom-tailored suit fits better than off-the-rack, your personalized formula delivers superior results.
                  </p>

                  <div className="mt-8 p-6 rounded-xl bg-dark/60 border-l-4 border-primary">
                    <p className="text-gray-300 italic">
                      "We built 2HLABS because we saw an opportunity to do supplements the way modern tech does everything else: personalized, data-driven, and optimized for each individual. Custom isn't just convenient—it's objectively superior."
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
