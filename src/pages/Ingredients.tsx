import { motion } from 'framer-motion';
import { useState } from 'react';
import { INGREDIENTS } from '../data/ingredients';
import { Card } from '../components/common/Card';
import type { IngredientCategory } from '../types';
import { useTranslation } from 'react-i18next';
import { useDeveloper } from '../context/DeveloperContext';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const Ingredients = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<IngredientCategory | 'all'>('all');
  const { isDeveloper, isIngredientEnabled, setIngredientEnabled } = useDeveloper();

  const categories: (IngredientCategory | 'all')[] = ['all', 'energy', 'pump', 'strength', 'endurance', 'focus', 'recovery', 'hydration'];

  const getCategoryTranslationKey = (category: string) => {
    if (category === 'all') return 'ingredientsPage.filterAll';
    if (category === 'focus') return 'ingredientsPage.focusCategory';
    return `ingredientsPage.${category}`;
  };

  const baseIngredients = isDeveloper
    ? INGREDIENTS
    : INGREDIENTS.filter(ing => isIngredientEnabled(ing.id));

  const filteredIngredients = selectedCategory === 'all'
    ? baseIngredients
    : baseIngredients.filter(ing => ing.category === selectedCategory);

  const handleToggleIngredient = (id: string) => {
    const current = isIngredientEnabled(id);
    setIngredientEnabled(id, !current);
  };

  return (
    <div className="bg-dark min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            {t('ingredientsPage.pageTitle')} <span className="text-gradient">{t('ingredientsPage.pageTitleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('ingredientsPage.pageSubtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            // Map category to icon path (pump doesn't have icon yet)
            const categoryIcons: Record<string, string | null> = {
              'energy': '/assets/categories/energy.png',
              'strength': '/assets/categories/strength.png',
              'endurance': '/assets/categories/endurance.png',
              'focus': '/assets/categories/focus.png',
              'recovery': '/assets/categories/recovery.png',
              'hydration': '/assets/categories/hydration.png',
              'pump': null, // To be generated
              'all': null,
            };

            const iconPath = categoryIcons[category];

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border-2 transition-all capitalize flex items-center gap-2 ${selectedCategory === category
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-dark-light text-gray-400 hover:border-primary/50'
                  }`}
              >
                {iconPath && (
                  <img
                    src={iconPath}
                    alt={category}
                    className="w-5 h-5 object-contain mix-blend-lighten"
                    loading="lazy"
                  />
                )}
                {t(getCategoryTranslationKey(category))}
              </button>
            );
          })}
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIngredients.map((ingredient, index) => (
            <ScrollReveal
              key={ingredient.id}
              direction="up"
              delay={index * 0.03}
            >
              <Card
                hover
                className={`h-full border-2 ${isDeveloper && !isIngredientEnabled(ingredient.id)
                    ? 'border-red-500/40'
                    : 'border-transparent'
                  }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-semibold mb-1">{t(`ingredients.${ingredient.id}.name`)}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase text-primary">{t(`ingredientsPage.${ingredient.category}`)}</span>
                      {isDeveloper && (
                        <span
                          className={`text-xs uppercase font-semibold ${isIngredientEnabled(ingredient.id)
                              ? 'text-green-400'
                              : 'text-red-400'
                            }`}
                        >
                          {isIngredientEnabled(ingredient.id) ? t('ingredientsPage.inStock') : t('ingredientsPage.outOfStock')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{t('ingredientsPage.scienceRating')}</div>
                    <div className="text-2xl font-bold text-accent">{ingredient.scienceRating}/5</div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{t(`ingredients.${ingredient.id}.description`)}</p>

                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">{t('ingredientsPage.benefits')}</div>
                  <ul className="space-y-1">
                    {(t(`ingredients.${ingredient.id}.benefits`, { returnObjects: true }) as string[]).slice(0, 3).map((benefit: string, i: number) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-500">
                  {t('ingredientsPage.dosage')}: {ingredient.dosageRange.min}-{ingredient.dosageRange.max}{ingredient.dosageRange.unit}
                </div>

                {isDeveloper && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleToggleIngredient(ingredient.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${isIngredientEnabled(ingredient.id)
                          ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                          : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        }`}
                    >
                      {isIngredientEnabled(ingredient.id) ? t('ingredientsPage.markOutOfStock') : t('ingredientsPage.markInStock')}
                    </button>
                  </div>
                )}
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
