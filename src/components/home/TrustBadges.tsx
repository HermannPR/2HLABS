import { motion } from 'framer-motion';
import { BadgeWithTooltip } from '../common/BadgeWithTooltip';

export const TrustBadges = () => {
  const badges = [
    {
      icon: '/assets/badges/science-backed.png',
      alt: 'Science-Backed',
      tooltip: 'All ingredients backed by peer-reviewed research'
    },
    {
      icon: '/assets/badges/clinical-dosages.png',
      alt: 'Clinical Dosages',
      tooltip: 'Effective amounts proven in clinical trials'
    },
    {
      icon: '/assets/badges/full-transparency.png',
      alt: 'Full Transparency',
      tooltip: 'Complete ingredient disclosure, no proprietary blends'
    },
    {
      icon: '/assets/badges/lab-tested.png',
      alt: 'Lab Tested',
      tooltip: 'Third-party tested for purity and potency'
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-center items-center"
            >
              <BadgeWithTooltip
                src={badge.icon}
                alt={badge.alt}
                tooltip={badge.tooltip}
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-44 md:h-44 lg:w-52 lg:h-52"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
