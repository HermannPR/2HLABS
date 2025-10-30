import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { HiBeaker, HiCog, HiChartBar, HiShieldCheck } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

export const HowItWorks = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-dark min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            {t('howItWorksPage.pageTitle')} <span className="text-gradient">{t('howItWorksPage.pageTitleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('howItWorksPage.pageSubtitle')}
          </p>
        </motion.div>

        {/* The Science */}
        <section className="mb-20">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            {t('howItWorksPage.scienceTitle')} <span className="text-gradient">{t('howItWorksPage.scienceTitleHighlight')}</span> {t('howItWorksPage.scienceSubtitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card hover>
              <HiBeaker className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-heading font-semibold mb-3">{t('howItWorksPage.card1Title')}</h3>
              <p className="text-gray-400">
                {t('howItWorksPage.card1Description')}
              </p>
            </Card>
            <Card hover>
              <HiCog className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-heading font-semibold mb-3">{t('howItWorksPage.card2Title')}</h3>
              <p className="text-gray-400">
                {t('howItWorksPage.card2Description')}
              </p>
            </Card>
            <Card hover>
              <HiChartBar className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-heading font-semibold mb-3">{t('howItWorksPage.card3Title')}</h3>
              <p className="text-gray-400">
                {t('howItWorksPage.card3Description')}
              </p>
            </Card>
            <Card hover>
              <HiShieldCheck className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-heading font-semibold mb-3">{t('howItWorksPage.card4Title')}</h3>
              <p className="text-gray-400">
                {t('howItWorksPage.card4Description')}
              </p>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link to="/formula">
            <Button size="lg">{t('howItWorksPage.ctaButton')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
