import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { HiUserCircle, HiBeaker, HiAdjustments, HiShieldCheck } from 'react-icons/hi';

const features = [
  {
    icon: HiUserCircle,
    title: 'Personalized to You',
    description: 'Our algorithm analyzes your goals, body composition, training schedule, and preferences to create your perfect formula.',
  },
  {
    icon: HiBeaker,
    title: 'Science-Backed Ingredients',
    description: 'Every ingredient is backed by clinical research and dosed according to scientific literature, not marketing hype.',
  },
  {
    icon: HiAdjustments,
    title: 'Fully Customizable',
    description: 'Control your caffeine intake, avoid ingredients you dislike, and adjust for dietary restrictions or sensitivities.',
  },
  {
    icon: HiShieldCheck,
    title: 'Quality Guaranteed',
    description: 'Third-party tested, no banned substances, and manufactured in FDA-registered facilities.',
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Why <span className="text-gradient">2HLABS</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The preworkout industry is broken. We're fixing it with personalization and transparency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <feature.icon className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
