import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { StatsChart3D } from '../three/StatsChart3D';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';

/**
 * Stats showcase section with 3D visualization
 * Displays key performance metrics in an engaging way
 */
export function StatsShowcase() {
  // Performance statistics
  const stats = [
    {
      label: 'Energy',
      value: 95,
      unit: '%',
      color: '#00E5FF',
    },
    {
      label: 'Focus',
      value: 88,
      unit: '%',
      color: '#FF00E5',
    },
    {
      label: 'Endurance',
      value: 92,
      unit: '%',
      color: '#39FF14',
    },
    {
      label: 'Strength',
      value: 85,
      unit: '%',
      color: '#6EFFFF',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-dark via-dark/95 to-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Proven <span className="text-gradient">Performance</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Clinical studies show significant improvements across all key performance metrics
          </p>
        </ScrollReveal>

        {/* 3D Stats Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, margin: "-100px" }}
          className="w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-dark/50 to-secondary/5 border border-primary/20"
        >
          <Canvas
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
          >
            <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
            <StatsChart3D stats={stats} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
              autoRotate={false}
            />
          </Canvas>
        </motion.div>

        {/* Stats details */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-dark/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 text-center hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                  {stat.value}{stat.unit}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {stat.label} Boost
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          *Based on clinical studies with optimal dosing. Individual results may vary.
        </p>
      </div>
    </section>
  );
}
