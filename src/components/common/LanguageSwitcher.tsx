import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiGlobeAlt } from 'react-icons/hi';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-dark-lighter border border-dark-light hover:border-primary transition-all duration-200"
      aria-label="Switch language"
    >
      <HiGlobeAlt className="w-5 h-5 text-primary" />
      <span className="text-sm font-medium text-white uppercase">
        {i18n.language}
      </span>
    </motion.button>
  );
};
