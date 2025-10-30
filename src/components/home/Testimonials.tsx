import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card } from '../common/Card';
import { TESTIMONIALS } from '../../data/testimonials';
import { HiStar } from 'react-icons/hi';

export const Testimonials = () => {
  const { t } = useTranslation();

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
            {t('testimonials.title')} <span className="text-gradient">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="text-accent" size={20} />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="mt-auto">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <p className="text-5xl font-heading font-bold text-gradient mb-2">{t('testimonials.stat1Number')}</p>
            <p className="text-gray-400">{t('testimonials.stat1Label')}</p>
          </div>
          <div>
            <p className="text-5xl font-heading font-bold text-gradient mb-2">{t('testimonials.stat2Number')}</p>
            <p className="text-gray-400">{t('testimonials.stat2Label')}</p>
          </div>
          <div>
            <p className="text-5xl font-heading font-bold text-gradient mb-2">{t('testimonials.stat3Number')}</p>
            <p className="text-gray-400">{t('testimonials.stat3Label')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
