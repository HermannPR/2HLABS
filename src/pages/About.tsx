import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { HiLightningBolt, HiBeaker, HiUsers } from 'react-icons/hi';

export const About = () => {
  return (
    <div className="bg-dark min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            About <span className="text-gradient">2HLABS</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We believe every athlete has a unique training soul. We're revolutionizing supplements with personalization, transparency, and science.
          </p>
        </motion.div>

        {/* Mission */}
        <section className="mb-20">
          <Card glow className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              The supplement industry is broken. One-size-fits-all preworkouts ignore what makes you unique: your training style, goals, physiology, and preferences. Companies sell overpriced, underdosed products with proprietary blends and marketing hype.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              We believe every athlete has a unique <span className="text-primary font-semibold">training soul</span>—a distinct approach to training that requires its own formula. That's why we created 2HLABS: 12 precision-engineered preworkout formulas, each designed for a different type of athlete. Science-backed. Clinically dosed. Transparently labeled. Matched to you.
            </p>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">
            Our <span className="text-gradient">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <HiBeaker className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Science First</h3>
              <p className="text-gray-400">
                Every ingredient and dosage is backed by peer-reviewed research. No marketing BS.
              </p>
            </Card>
            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <HiLightningBolt className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Transparency</h3>
              <p className="text-gray-400">
                No proprietary blends. Full disclosure of every ingredient and exact dosages.
              </p>
            </Card>
            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <HiUsers className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">You First</h3>
              <p className="text-gray-400">
                Your goals, your body, your formula. Everything we do is personalized to you.
              </p>
            </Card>
          </div>
        </section>

        {/* Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
              Our <span className="text-gradient">Story</span>
            </h2>
            <Card>
              <p className="text-gray-300 mb-4 leading-relaxed">
                2HLABS was born from a simple observation: athletes train differently, yet they all drink the same preworkout. A powerlifter crushing 1-rep maxes has different needs than an endurance athlete grinding through a 2-hour session. A focused precision trainer needs different support than someone chasing an explosive pump.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                As competitive athletes and exercise scientists, we were frustrated by the industry's one-size-fits-all approach. So we spent two years researching, testing, and refining 12 distinct formulas—each optimized for a specific training archetype. We call them <span className="text-primary font-semibold">Training Souls</span>.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                From Gorilla Rage (maximum aggression, short and brutal) to Serpent Flow (mind-body connection, movement mastery) to Bear Endurance (long-haul grinding), each formula is engineered with precision. Clinical dosages. Peer-reviewed ingredients. No proprietary blends. No marketing fluff.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We're not just selling supplements. We're building a movement where every athlete gets the formula they deserve—one that matches how they actually train, not how the industry thinks they should.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Ready to Experience the Difference?
          </h2>
          <Link to="/formula">
            <Button size="lg">Build Your Formula</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
