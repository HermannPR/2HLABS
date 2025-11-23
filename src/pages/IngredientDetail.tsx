import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiBeaker, HiLightningBolt, HiShieldCheck, HiExclamationCircle } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { getIngredientById } from '../data/ingredients';
import { getIngredientDetail } from '../data/ingredientDetails';
import { SEO, StructuredData } from '../components/seo/SEO';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { PageLoader } from '../components/common/Skeleton';

export const IngredientDetail = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const ingredient = getIngredientById(ingredientId || '');
  const details = getIngredientDetail(ingredientId || '');

  if (!ingredient) {
    return <PageLoader message={t('common.loading')} />;
  }

  if (!details) {
    return (
      <div className="min-h-screen bg-dark py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">{t('ingredientDetail.comingSoon')}</h1>
          <p className="text-gray-400 mb-8">
            {t('ingredientDetail.workingOnIt', { name: ingredient.name })}
          </p>
          <Button onClick={() => navigate('/ingredients')}>
            {t('ingredientDetail.backToAll')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark py-12">
      <SEO
        title={`${ingredient.name} - Science & Dosing`}
        description={`${details.detailedDescription.substring(0, 155)}...`}
        keywords={`${ingredient.name}, ${details.scientificName}, supplement research, clinical dosing, pre-workout ingredient`}
        ogType="article"
      />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Ingredients', url: '/ingredients' },
          { name: ingredient.name, url: `/ingredients/${ingredient.id}` }
        ])}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/ingredients"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-light transition-colors"
          >
            <HiArrowLeft />
            <span>{t('ingredientDetail.backToAll')}</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
                {ingredient.name}
              </h1>
              {details.scientificName && (
                <p className="text-lg text-gray-400 italic mb-2">
                  {details.scientificName}
                </p>
              )}
              {details.alsoKnownAs && (
                <p className="text-sm text-gray-500">
                  {t('ingredientDetail.alsoKnownAs')}: {details.alsoKnownAs.join(', ')}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(ingredient.scienceRating)].map((_, i) => (
                <HiBeaker key={i} className="text-primary text-xl" />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-full text-sm font-semibold">
              {ingredient.category}
            </span>
            <span className="px-3 py-1 bg-accent/10 border border-accent/30 text-accent rounded-full text-sm font-semibold">
              {t('ingredientsPage.scienceRating')}: {ingredient.scienceRating}/5
            </span>
          </div>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4 flex items-center space-x-2">
              <HiLightningBolt className="text-primary" />
              <span>{t('ingredientDetail.overview')}</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {details.detailedDescription}
            </p>
          </Card>
        </motion.div>

        {/* Mechanism of Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">{t('ingredientDetail.howItWorks')}</h2>
            <p className="text-gray-300 leading-relaxed">
              {details.mechanismOfAction}
            </p>
          </Card>
        </motion.div>

        {/* Clinical Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4 flex items-center space-x-2">
              <HiShieldCheck className="text-secondary" />
              <span>{t('ingredientDetail.clinicalEvidence')}</span>
            </h2>
            <ul className="space-y-3">
              {details.clinicalEvidence.map((evidence, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="text-secondary text-xl mt-0.5">✓</span>
                  <span className="text-gray-300">{evidence}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Optimal Dosing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">{t('ingredientDetail.optimalDosing')}</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">{t('ingredientDetail.standardDose')}</p>
                <p className="text-lg font-semibold text-white">
                  {details.optimalDosing.standard}
                </p>
              </div>

              {details.optimalDosing.loading && (
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{t('ingredientDetail.loadingProtocol')}</p>
                  <p className="text-lg font-semibold text-white">
                    {details.optimalDosing.loading}
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-dark-lighter rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{t('ingredientDetail.timing')}</p>
                  <p className="text-white font-semibold">{details.optimalDosing.timing}</p>
                </div>
                <div className="p-4 bg-dark-lighter rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">{t('ingredientDetail.withFood')}</p>
                  <p className="text-white font-semibold">
                    {details.optimalDosing.withFood !== undefined
                      ? details.optimalDosing.withFood
                        ? t('ingredientDetail.withFoodYes')
                        : t('ingredientDetail.withFoodNo')
                      : t('ingredientDetail.withFoodEither')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Synergies */}
        {details.synergies && details.synergies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">{t('ingredientDetail.synergies')}</h2>
              <p className="text-gray-400 mb-4">
                {t('ingredientDetail.synergiesDesc')}
              </p>
              <div className="space-y-3">
                {details.synergies.map((synergy, idx) => (
                  <div key={idx} className="p-4 bg-dark-lighter rounded-lg border border-primary/20">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      + {synergy.ingredient}
                    </h3>
                    <p className="text-gray-300">{synergy.benefit}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Side Effects & Contraindications */}
        {(details.sideEffects || details.contraindications) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="mb-8 border-2 border-secondary/30">
              <h2 className="text-2xl font-heading font-bold mb-4 flex items-center space-x-2 text-secondary">
                <HiExclamationCircle />
                <span>{t('ingredientDetail.safetyInfo')}</span>
              </h2>

              {details.sideEffects && details.sideEffects.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">{t('ingredientDetail.sideEffects')}</h3>
                  <ul className="space-y-2">
                    {details.sideEffects.map((effect, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-secondary mt-1">•</span>
                        <span className="text-gray-300">{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.contraindications && details.contraindications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t('ingredientDetail.contraindications')}</h3>
                  <ul className="space-y-2">
                    {details.contraindications.map((contra, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-secondary mt-1">⚠</span>
                        <span className="text-gray-300">{contra}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 p-3 bg-secondary/10 rounded border border-secondary/30">
                <p className="text-sm text-gray-300">
                  <strong>{t('ingredientDetail.disclaimer')}</strong>
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Research Citations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">{t('ingredientDetail.researchCitations')}</h2>
            <div className="space-y-4">
              {details.researchCitations.map((citation, idx) => (
                <div key={idx} className="p-4 bg-dark-lighter rounded-lg">
                  <p className="text-white font-semibold mb-1">{citation.title}</p>
                  <p className="text-sm text-gray-400 mb-2">
                    {citation.authors} ({citation.year})
                  </p>
                  <p className="text-sm text-gray-500 italic">{citation.journal}</p>
                  {citation.doi && (
                    <a
                      href={`https://doi.org/${citation.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-light text-sm mt-2 inline-block"
                    >
                      DOI: {citation.doi} →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-8"
        >
          <Card>
            <h2 className="text-2xl font-heading font-bold mb-4">
              {t('ingredientDetail.findYourSoul')}
            </h2>
            <p className="text-gray-400 mb-6">
              {t('ingredientDetail.findYourSoulDesc', { name: ingredient.name })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/formula')}>
                {t('ingredientDetail.discoverSoul')}
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/souls')}>
                {t('ingredientDetail.viewAllSouls')}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
