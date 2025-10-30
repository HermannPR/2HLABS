import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-lighter border-t border-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold text-gradient">2HLABS</h3>
            <p className="text-gray-400 text-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-white">{t('footer.product')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/formula" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.buildFormula')}
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/ingredients" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.ingredients')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.terms')}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  {t('footer.links.shipping')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-light text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} 2HLABS. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
