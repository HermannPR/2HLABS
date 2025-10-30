import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <motion.h1
            className="text-9xl font-heading font-bold text-gradient mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4 text-white">
              {t('notFound.title')}
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {t('notFound.message')}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                {t('notFound.homeButton')}
              </Button>
            </Link>
            <Link to="/formula">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t('notFound.quizButton')}
              </Button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-dark-light"
          >
            <p className="text-sm text-gray-500 mb-4">{t('notFound.quickLinks')}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/souls" className="text-primary hover:text-primary-light transition-colors">
                {t('notFound.linkSouls')}
              </Link>
              <Link to="/how-it-works" className="text-primary hover:text-primary-light transition-colors">
                {t('notFound.linkHowItWorks')}
              </Link>
              <Link to="/ingredients" className="text-primary hover:text-primary-light transition-colors">
                {t('notFound.linkIngredients')}
              </Link>
              <Link to="/pricing" className="text-primary hover:text-primary-light transition-colors">
                {t('notFound.linkPricing')}
              </Link>
              <Link to="/about" className="text-primary hover:text-primary-light transition-colors">
                {t('notFound.linkAbout')}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
};
