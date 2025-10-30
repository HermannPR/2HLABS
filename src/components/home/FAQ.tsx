import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiChevronDown } from 'react-icons/hi';
import { FAQS } from '../../data/faqs';

export const FAQ = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);

  const topFaqs = FAQS.slice(0, 6);

  return (
    <section className="py-20 bg-dark-lighter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {t('faq.title')} <span className="text-gradient">{t('faq.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-400">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {topFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full bg-dark border border-dark-light rounded-lg p-6 text-left hover:border-primary transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white pr-8">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiChevronDown className="text-primary flex-shrink-0" size={24} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 mt-4 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
