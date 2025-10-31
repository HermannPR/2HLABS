import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiTrash, HiPlus, HiExclamation } from 'react-icons/hi';
import type { FormulaIngredient, Ingredient } from '../../types';
import { INGREDIENTS } from '../../data/ingredients';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface FormulaEditorProps {
  ingredients: FormulaIngredient[];
  onUpdate: (ingredients: FormulaIngredient[]) => void;
}

export const FormulaEditor = ({ ingredients, onUpdate }: FormulaEditorProps) => {
  const [showWarning, setShowWarning] = useState(true);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [removedIngredients, setRemovedIngredients] = useState<FormulaIngredient[]>([]);

  const handleDosageChange = (index: number, newDosage: number) => {
    const updated = [...ingredients];
    updated[index] = {
      ...updated[index],
      dosage: newDosage
    };
    onUpdate(updated);
  };

  const handleRemoveIngredient = (index: number) => {
    const removed = ingredients[index];
    setRemovedIngredients([...removedIngredients, removed]);
    const updated = ingredients.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  const handleRestoreIngredient = (ingredient: FormulaIngredient) => {
    onUpdate([...ingredients, ingredient]);
    setRemovedIngredients(removedIngredients.filter(i => i.ingredient.id !== ingredient.ingredient.id));
  };

  const handleAddNewIngredient = (ingredient: Ingredient) => {
    const newIngredient: FormulaIngredient = {
      ingredient,
      dosage: ingredient.dosageRange.min,
      unit: ingredient.dosageRange.unit,
      reason: 'Custom addition'
    };
    onUpdate([...ingredients, newIngredient]);
    setShowAddIngredient(false);
  };

  // Get ingredients not currently in formula
  const availableIngredients = INGREDIENTS.filter(
    ing => !ingredients.some(fi => fi.ingredient.id === ing.id)
  );

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-2 border-yellow-500/30 bg-yellow-500/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <HiExclamation className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-500 mb-2">
                    ⚠️ Customize at Your Own Risk
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    <strong>This formula was scientifically matched to your archetype.</strong> Modifying dosages
                    or adding/removing ingredients may reduce effectiveness or cause unwanted effects.
                    Only make changes if you understand ingredient interactions and dosing.
                  </p>
                  <p className="text-xs text-gray-400">
                    <strong>You assume all responsibility</strong> for custom modifications.
                    Consult a healthcare professional if unsure.
                  </p>
                </div>
                <button
                  onClick={() => setShowWarning(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Ingredients */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading font-bold">Formula Ingredients</h3>

        {ingredients.map((item, index) => (
          <motion.div
            key={item.ingredient.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Card className="relative">
              {/* Delete Button */}
              <button
                onClick={() => handleRemoveIngredient(index)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                title="Remove ingredient"
              >
                <HiTrash className="w-4 h-4" />
              </button>

              {/* Ingredient Info */}
              <div className="mb-4 pr-12">
                <h4 className="text-lg font-semibold mb-1">{item.ingredient.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{item.ingredient.description}</p>
                <p className="text-xs text-accent italic">{item.reason}</p>
              </div>

              {/* Dosage Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Dosage</span>
                  <span className="text-lg font-bold text-primary">
                    {item.dosage.toLocaleString()}{item.unit}
                  </span>
                </div>

                <input
                  type="range"
                  min={item.ingredient.dosageRange.min}
                  max={item.ingredient.dosageRange.max}
                  step={item.ingredient.dosageRange.unit === 'g' ? 0.5 : 25}
                  value={item.dosage}
                  onChange={(e) => handleDosageChange(index, Number(e.target.value))}
                  className="w-full h-2 bg-dark-lighter rounded-lg appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-4
                             [&::-webkit-slider-thumb]:h-4
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-primary
                             [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-webkit-slider-thumb]:shadow-lg
                             [&::-webkit-slider-thumb]:shadow-primary/50
                             [&::-moz-range-thumb]:w-4
                             [&::-moz-range-thumb]:h-4
                             [&::-moz-range-thumb]:rounded-full
                             [&::-moz-range-thumb]:bg-primary
                             [&::-moz-range-thumb]:border-0
                             [&::-moz-range-thumb]:cursor-pointer"
                />

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{item.ingredient.dosageRange.min}{item.unit}</span>
                  <span className="text-gray-400">Clinical Range</span>
                  <span>{item.ingredient.dosageRange.max}{item.unit}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Removed Ingredients - Restore Option */}
      {removedIngredients.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-heading font-semibold text-gray-400">Removed Ingredients</h3>
          <div className="space-y-2">
            {removedIngredients.map((item) => (
              <motion.div
                key={item.ingredient.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg border border-dark-light"
              >
                <div>
                  <span className="text-sm font-semibold text-gray-300">{item.ingredient.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({item.dosage}{item.unit})
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRestoreIngredient(item)}
                >
                  Restore
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add Ingredient Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowAddIngredient(!showAddIngredient)}
      >
        <HiPlus className="w-5 h-5 mr-2" />
        Add Ingredient
      </Button>

      {/* Add Ingredient Modal */}
      <AnimatePresence>
        {showAddIngredient && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-2 border-primary/30">
              <h3 className="text-lg font-semibold mb-4">Available Ingredients</h3>

              {availableIngredients.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  All ingredients are already in your formula
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {availableIngredients.map((ingredient) => (
                    <motion.button
                      key={ingredient.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddNewIngredient(ingredient)}
                      className="p-3 bg-dark-lighter rounded-lg border border-dark-light hover:border-primary/50 transition-colors text-left"
                    >
                      <div className="font-semibold text-sm mb-1">{ingredient.name}</div>
                      <div className="text-xs text-gray-400 mb-2">{ingredient.category}</div>
                      <div className="text-xs text-gray-500">
                        {ingredient.dosageRange.min}-{ingredient.dosageRange.max}{ingredient.dosageRange.unit}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddIngredient(false)}
                className="mt-4 w-full"
              >
                Close
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
