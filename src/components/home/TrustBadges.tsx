import { motion } from 'framer-motion';

export const TrustBadges = () => {
  const badges = [
    {
      icon: '/assets/badges/science-backed.png',
      title: 'Science-Backed',
      description: 'Research-driven formulations'
    },
    {
      icon: '/assets/badges/clinical-dosages.png',
      title: 'Clinical Dosages',
      description: 'Effective ingredient amounts'
    },
    {
      icon: '/assets/badges/full-transparency.png',
      title: 'Full Transparency',
      description: 'Complete label disclosure'
    },
    {
      icon: '/assets/badges/lab-tested.png',
      title: 'Lab Tested',
      description: 'Third-party verified purity'
    },
  ];

  return (
    <section className="py-16 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <img
                src={badge.icon}
                alt={badge.title}
                className="w-24 h-24 mx-auto mb-3 object-contain"
              />
              <h3 className="font-semibold text-white mb-1">{badge.title}</h3>
              <p className="text-gray-400 text-sm">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
