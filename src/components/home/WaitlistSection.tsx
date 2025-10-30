import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EmailCapture } from '../common/EmailCapture';

export const WaitlistSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-b from-dark via-dark-lighter to-dark py-16 md:py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            {t('waitlist.title')} <span className="text-gradient">{t('waitlist.titleHighlight')}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {t('waitlist.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EmailCapture
            source="homepage"
            heading={t('waitlist.heading')}
            subheading={t('waitlist.subheading')}
            buttonText={t('waitlist.buttonText')}
          />
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-primary text-xl">✓</span>
              <span>{t('waitlist.benefit1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-xl">✓</span>
              <span>{t('waitlist.benefit2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-xl">✓</span>
              <span>{t('waitlist.benefit3')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
