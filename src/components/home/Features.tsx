import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card } from '../common/Card';
import { HiUserCircle, HiBeaker, HiAdjustments, HiShieldCheck } from 'react-icons/hi';

export const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: HiUserCircle,
      titleKey: 'features.feature1Title',
      descriptionKey: 'features.feature1Description',
    },
    {
      icon: HiBeaker,
      titleKey: 'features.feature2Title',
      descriptionKey: 'features.feature2Description',
    },
    {
      icon: HiAdjustments,
      titleKey: 'features.feature3Title',
      descriptionKey: 'features.feature3Description',
    },
    {
      icon: HiShieldCheck,
      titleKey: 'features.feature4Title',
      descriptionKey: 'features.feature4Description',
    },
  ];

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
            {t('features.title')} <span className="text-gradient">{t('features.titleHighlight')}</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
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
                <h3 className="text-xl font-heading font-semibold mb-3">{t(feature.titleKey)}</h3>
                <p className="text-gray-400 text-sm">{t(feature.descriptionKey)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
