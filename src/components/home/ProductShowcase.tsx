import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ProductViewer3D } from '../three/ProductViewer3D';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';

/**
 * Product Showcase section with 3D viewer
 * Allows users to explore product and select flavors
 */
export function ProductShowcase() {
  const [selectedFlavor, setSelectedFlavor] = useState('Blue Razz');

  const flavors = [
    {
      name: 'Blue Razz',
      color: '#00E5FF',
      description: 'Sweet and tangy blue raspberry',
    },
    {
      name: 'Fruit Punch',
      color: '#FF00E5',
      description: 'Classic tropical fruit blend',
    },
    {
      name: 'Green Apple',
      color: '#39FF14',
      description: 'Crisp and refreshing apple',
    },
    {
      name: 'Lemon',
      color: '#FFE500',
      description: 'Zesty lemon citrus',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-dark to-dark/95 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - 3D Product Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: "-100px" }}
            className="order-2 lg:order-1"
          >
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 via-dark/50 to-secondary/5 border border-primary/20 shadow-2xl">
              {/* 3D Canvas */}
              <Canvas
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: 'high-performance',
                }}
                dpr={[1, 2]}
                shadows
              >
                <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />

                <ProductViewer3D
                  selectedFlavor={selectedFlavor}
                  onFlavorChange={setSelectedFlavor}
                />

                {/* Environment map for reflections */}
                <Environment preset="city" />

                {/* OrbitControls for interaction */}
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minDistance={6}
                  maxDistance={12}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2}
                  autoRotate={false}
                  autoRotateSpeed={0.5}
                />
              </Canvas>

              {/* Instructions overlay */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-dark/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/30">
                <p className="text-sm text-gray-300">
                  <span className="text-primary">Drag</span> to rotate • <span className="text-primary">Scroll</span> to zoom
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Product Info & Flavor Selector */}
          <div className="order-1 lg:order-2">
            <ScrollReveal direction="up">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Premium <span className="text-gradient">Formula</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Expertly crafted with clinical-grade ingredients in a premium glass container.
                Choose from four delicious flavors, each designed to fuel your training.
              </p>
            </ScrollReveal>

            {/* Flavor Selector */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Select Your Flavor</h3>
                <div className="grid grid-cols-2 gap-4">
                  {flavors.map((flavor) => (
                    <button
                      key={flavor.name}
                      onClick={() => setSelectedFlavor(flavor.name)}
                      className={`
                        relative p-4 rounded-xl border-2 transition-all duration-300
                        ${selectedFlavor === flavor.name
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-gray-700 bg-dark/50 hover:border-gray-600'
                        }
                      `}
                    >
                      {/* Color indicator */}
                      <div
                        className="w-8 h-8 rounded-full mb-2 mx-auto shadow-lg"
                        style={{
                          backgroundColor: flavor.color,
                          boxShadow: `0 0 20px ${flavor.color}80`,
                        }}
                      />

                      {/* Flavor name */}
                      <div className="font-semibold text-white mb-1">
                        {flavor.name}
                      </div>

                      {/* Description */}
                      <div className="text-xs text-gray-400">
                        {flavor.description}
                      </div>

                      {/* Selected indicator */}
                      {selectedFlavor === flavor.name && (
                        <motion.div
                          layoutId="selectedFlavor"
                          className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <svg className="w-4 h-4 text-dark" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Product features */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Clinical Dosages</div>
                    <div className="text-sm text-gray-400">Scientifically-proven amounts of each ingredient</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Third-Party Tested</div>
                    <div className="text-sm text-gray-400">Verified purity and potency</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">30 Servings</div>
                    <div className="text-sm text-gray-400">One month supply of premium pre-workout</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Button */}
            <ScrollReveal direction="up" delay={0.4}>
              <button className="w-full py-4 px-8 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-white text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                Coming Soon • Join Waitlist
              </button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
