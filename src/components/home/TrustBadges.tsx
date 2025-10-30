import { motion } from 'framer-motion';

export const TrustBadges = () => {
  const badges = [
    {
      icon: '/assets/badges/science-backed.png',
      alt: 'Science-Backed'
    },
    {
      icon: '/assets/badges/clinical-dosages.png',
      alt: 'Clinical Dosages'
    },
    {
      icon: '/assets/badges/full-transparency.png',
      alt: 'Full Transparency'
    },
    {
      icon: '/assets/badges/lab-tested.png',
      alt: 'Lab Tested'
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
              key={badge.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-center"
            >
              <img
                src={badge.icon}
                alt={badge.alt}
                className="w-32 h-32 object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
