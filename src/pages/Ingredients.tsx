import { motion } from 'framer-motion';
import { useState } from 'react';
import { INGREDIENTS } from '../data/ingredients';
import { Card } from '../components/common/Card';
import type { IngredientCategory } from '../types';
import { useTranslation } from 'react-i18next';

export const Ingredients = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<IngredientCategory | 'all'>('all');

  const categories: (IngredientCategory | 'all')[] = ['all', 'energy', 'pump', 'strength', 'endurance', 'focus', 'recovery', 'hydration'];

  const filteredIngredients = selectedCategory === 'all'
    ? INGREDIENTS
    : INGREDIENTS.filter(ing => ing.category === selectedCategory);

  return (
    <div className="bg-dark min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            {t('ingredients.title')} <span className="text-gradient">{t('ingredients.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('ingredients.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border-2 transition-all capitalize ${
                selectedCategory === category
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-dark-light text-gray-400 hover:border-primary/50'
              }`}
            >
              {t(`ingredients.${category}`)}
            </button>
          ))}
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIngredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-semibold mb-1">{ingredient.name}</h3>
                    <span className="text-xs uppercase text-primary">{ingredient.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Science Rating</div>
                    <div className="text-2xl font-bold text-accent">{ingredient.scienceRating}/5</div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{ingredient.description}</p>

                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Benefits:</div>
                  <ul className="space-y-1">
                    {ingredient.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-500">
                  Dosage: {ingredient.dosageRange.min}-{ingredient.dosageRange.max}{ingredient.dosageRange.unit}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
