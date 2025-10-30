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
            The <span className="text-gradient">Science</span> Behind It
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card hover>
              <HiBeaker className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-heading font-semibold mb-3">Evidence-Based Ingredients</h3>
              <p className="text-gray-400">
                Every ingredient in our formulas is backed by peer-reviewed research. We use only compounds
                with proven efficacy for athletic performance, dosed according to scientific literature.
              </p>
            </Card>
            <Card hover>
              <HiCog className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-heading font-semibold mb-3">Personalization Algorithm</h3>
              <p className="text-gray-400">
                Our algorithm considers your weight, goals, training style, and preferences to calculate
                optimal dosages and select synergistic ingredient combinations.
              </p>
            </Card>
            <Card hover>
              <HiChartBar className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-heading font-semibold mb-3">Clinical Dosages</h3>
              <p className="text-gray-400">
                Unlike underdosed commercial products, we use clinically effective doses. If 6g of citrulline
                is proven effective, that's what you get—not 2g.
              </p>
            </Card>
            <Card hover>
              <HiShieldCheck className="text-primary mb-4" size={40} />
              <h3 className="text-2xl font-heading font-semibold mb-3">Quality Assurance</h3>
              <p className="text-gray-400">
                Third-party tested for purity and potency. Manufactured in FDA-registered facilities.
                No banned substances. Complete transparency.
              </p>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link to="/formula">
            <Button size="lg">Create Your Formula</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
