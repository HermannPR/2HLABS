import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { HiClipboardList, HiCog, HiTruck } from 'react-icons/hi';

export const HowItWorksPreview = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: HiClipboardList,
      number: '01',
      titleKey: 'howItWorks.step1Title',
      descriptionKey: 'howItWorks.step1Description',
    },
    {
      icon: HiCog,
      number: '02',
      titleKey: 'howItWorks.step2Title',
      descriptionKey: 'howItWorks.step2Description',
    },
    {
      icon: HiTruck,
      number: '03',
      titleKey: 'howItWorks.step3Title',
      descriptionKey: 'howItWorks.step3Description',
    },
  ];

  return (
    <section className="py-20 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('howItWorks.title')} <span className="text-gradient">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}

              <div className="relative z-10 bg-dark border border-dark-light rounded-xl p-8 hover:border-primary transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <step.icon className="text-white" size={28} />
                  </div>
                  <span className="text-6xl font-heading font-bold text-primary/20">{step.number}</span>
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-3">{t(step.titleKey)}</h3>
                <p className="text-gray-400">{t(step.descriptionKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/how-it-works">
            <Button variant="outline" size="lg">
              {t('howItWorks.buttonText')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
