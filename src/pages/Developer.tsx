import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useDeveloper } from '../context/DeveloperContext';
import { getAllIngredients } from '../data/ingredients';
import { SEO } from '../components/seo/SEO';

export const Developer = () => {
  const { isDeveloper, login, logout, isIngredientEnabled, setIngredientEnabled, ingredientOverrides, resetIngredientAvailability } = useDeveloper();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = login(password);
    if (!ok) {
      setError('Invalid password.');
      return;
    }
    setError('');
    setPassword('');
  };

  const ingredients = getAllIngredients();

  return (
    <div className="min-h-screen bg-dark py-20">
      <SEO title="Developer Console" description="Manage 2HLABS ingredient availability and internal tooling." />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Developer Console</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Secure area for operations and product teams to control ingredient availability, test formulas, and manage internal tooling.
          </p>
        </motion.div>

        {!isDeveloper ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="max-w-lg mx-auto">
              <h2 className="text-2xl font-heading font-bold mb-4">Developer Login</h2>
              <p className="text-gray-400 text-sm mb-6">
                Enter the internal passphrase to access ingredient and configuration controls.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="dev-password" className="block text-sm text-gray-300 mb-2">
                    Passphrase
                  </label>
                  <input
                    id="dev-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full px-4 py-3 bg-dark border border-dark-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <Button type="submit" className="w-full">
                  Unlock Console
                </Button>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Ingredient Availability</h2>
                <p className="text-sm text-gray-400">
                  Toggle items on/off to reflect real-time inventory. Changes persist locally for all users on this device.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => resetIngredientAvailability()}>
                  Reset to Defaults
                </Button>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ingredients.map((ingredient) => {
                const enabled = isIngredientEnabled(ingredient.id);
                const overrideApplied = Object.prototype.hasOwnProperty.call(ingredientOverrides, ingredient.id);
                return (
                  <Card
                    key={ingredient.id}
                    className={`border-2 transition-colors ${enabled ? 'border-green-500/30' : 'border-red-500/30 bg-red-500/5'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-white mb-1">{ingredient.name}</h3>
                        <div className="flex items-center gap-2 text-xs uppercase">
                          <span className="text-primary">{ingredient.category}</span>
                          <span className={enabled ? 'text-green-400' : 'text-red-400'}>
                            {enabled ? 'Active' : 'Inactive'}
                          </span>
                          {overrideApplied && (
                            <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded-full">
                              Override
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Science Rating</p>
                        <p className="text-lg font-semibold text-accent">{ingredient.scienceRating}/5</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4">{ingredient.description}</p>

                    <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-4">
                      {ingredient.benefits.slice(0, 3).map((benefit, idx) => (
                        <span key={idx} className="px-2 py-1 bg-dark-light rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>
                        {ingredient.dosageRange.min}-{ingredient.dosageRange.max}
                        {ingredient.dosageRange.unit}
                      </span>
                      <Button
                        size="sm"
                        variant={enabled ? 'outline' : 'secondary'}
                        onClick={() => setIngredientEnabled(ingredient.id, !enabled)}
                      >
                        {enabled ? 'Mark Out of Stock' : 'Mark In Stock'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
