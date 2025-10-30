import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { HiLightningBolt, HiBeaker, HiUsers } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();
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
            {t('about.title')} <span className="text-gradient">{t('about.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Mission */}
        <section className="mb-20">
          <Card glow className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">{t('about.missionTitle')}</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              {t('about.missionParagraph1')}
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('about.missionParagraph2')}
            </p>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">
            {t('about.valuesTitle')} <span className="text-gradient">{t('about.valuesTitleHighlight')}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <HiBeaker className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{t('about.value1Title')}</h3>
              <p className="text-gray-400">
                {t('about.value1Description')}
              </p>
            </Card>
            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <HiLightningBolt className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{t('about.value2Title')}</h3>
              <p className="text-gray-400">
                {t('about.value2Description')}
              </p>
            </Card>
            <Card hover className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <HiUsers className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{t('about.value3Title')}</h3>
              <p className="text-gray-400">
                {t('about.value3Description')}
              </p>
            </Card>
          </div>
        </section>

        {/* Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">
              {t('about.storyTitle')} <span className="text-gradient">{t('about.storyTitleHighlight')}</span>
            </h2>
            <Card>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {t('about.storyParagraph1')}
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {t('about.storyParagraph2')}
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {t('about.storyParagraph3')}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t('about.storyParagraph4')}
              </p>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            {t('about.ctaTitle')}
          </h2>
          <Link to="/formula">
            <Button size="lg">{t('about.ctaButton')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
