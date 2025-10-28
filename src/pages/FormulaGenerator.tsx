import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserData, Formula } from '../types';
import { generateFormula } from '../utils/formulaGenerator';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { HiCheckCircle } from 'react-icons/hi';

type Step = 'profile' | 'training' | 'preferences' | 'health' | 'result';

export const FormulaGenerator = () => {
  const [currentStep, setCurrentStep] = useState<Step>('profile');
  const [formula, setFormula] = useState<Formula | null>(null);
  const [userData, setUserData] = useState<Partial<UserData>>({
    profile: {
      age: 25,
      weight: 70,
      gender: 'male',
      fitnessLevel: 'intermediate',
      goals: [],
    },
    training: {
      workoutTime: 'morning',
      workoutType: [],
      duration: 60,
      frequency: 4,
    },
    preferences: {
      caffeineTolerance: 'medium',
      stimulantPreference: 'moderate',
      dietaryRestrictions: [],
      avoidIngredients: [],
    },
    health: {
      sleepQuality: 'good',
      stressLevel: 'medium',
      sensitivities: [],
    },
  });

  const steps: { id: Step; title: string; number: number }[] = [
    { id: 'profile', title: 'Profile', number: 1 },
    { id: 'training', title: 'Training', number: 2 },
    { id: 'preferences', title: 'Preferences', number: 3 },
    { id: 'health', title: 'Health', number: 4 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleGenerateFormula = () => {
    const generated = generateFormula(userData as UserData);
    setFormula(generated);
    setCurrentStep('result');
  };

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentStep !== 'result' ? (
          <>
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                          index <= currentStepIndex
                            ? 'bg-gradient-to-r from-primary to-secondary text-white'
                            : 'bg-dark-lighter text-gray-500'
                        }`}
                      >
                        {index < currentStepIndex ? <HiCheckCircle size={24} /> : step.number}
                      </div>
                      <span className="text-xs mt-2 text-gray-400">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-1 mx-2 bg-dark-lighter">
                        <div
                          className={`h-full transition-all duration-300 ${
                            index < currentStepIndex ? 'bg-gradient-to-r from-primary to-secondary' : ''
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  {currentStep === 'profile' && <ProfileStep userData={userData} setUserData={setUserData} />}
                  {currentStep === 'training' && <TrainingStep userData={userData} setUserData={setUserData} />}
                  {currentStep === 'preferences' && <PreferencesStep userData={userData} setUserData={setUserData} />}
                  {currentStep === 'health' && <HealthStep userData={userData} setUserData={setUserData} />}
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  const prevIndex = currentStepIndex - 1;
                  if (prevIndex >= 0) setCurrentStep(steps[prevIndex].id);
                }}
                disabled={currentStepIndex === 0}
              >
                Previous
              </Button>

              {currentStepIndex < steps.length - 1 ? (
                <Button
                  onClick={() => {
                    const nextIndex = currentStepIndex + 1;
                    setCurrentStep(steps[nextIndex].id);
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleGenerateFormula}>Generate My Formula</Button>
              )}
            </div>
          </>
        ) : (
          <FormulaResult formula={formula!} />
        )}
      </div>
    </div>
  );
};

// Profile Step Component
const ProfileStep = ({ userData, setUserData }: any) => {
  const goals = ['strength', 'endurance', 'fat-loss', 'muscle-gain', 'focus', 'power'];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading font-bold text-gradient mb-6">Tell us about yourself</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input
            type="number"
            value={userData.profile?.age}
            onChange={(e) => setUserData({
              ...userData,
              profile: { ...userData.profile, age: parseInt(e.target.value) }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          <input
            type="number"
            value={userData.profile?.weight}
            onChange={(e) => setUserData({
              ...userData,
              profile: { ...userData.profile, weight: parseInt(e.target.value) }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            value={userData.profile?.gender}
            onChange={(e) => setUserData({
              ...userData,
              profile: { ...userData.profile, gender: e.target.value }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Fitness Level</label>
          <select
            value={userData.profile?.fitnessLevel}
            onChange={(e) => setUserData({
              ...userData,
              profile: { ...userData.profile, fitnessLevel: e.target.value }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Training Goals (select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {goals.map((goal) => (
            <button
              key={goal}
              onClick={() => {
                const current = userData.profile?.goals || [];
                const updated = current.includes(goal)
                  ? current.filter((g: string) => g !== goal)
                  : [...current, goal];
                setUserData({
                  ...userData,
                  profile: { ...userData.profile, goals: updated }
                });
              }}
              className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                userData.profile?.goals?.includes(goal)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-dark-light text-gray-400 hover:border-primary/50'
              }`}
            >
              {goal.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Training Step Component
const TrainingStep = ({ userData, setUserData }: any) => {
  const workoutTypes = ['weightlifting', 'cardio', 'hiit', 'crossfit', 'sports', 'endurance'];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading font-bold text-gradient mb-6">Your Training</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Workout Time</label>
          <select
            value={userData.training?.workoutTime}
            onChange={(e) => setUserData({
              ...userData,
              training: { ...userData.training, workoutTime: e.target.value }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
          <input
            type="number"
            value={userData.training?.duration}
            onChange={(e) => setUserData({
              ...userData,
              training: { ...userData.training, duration: parseInt(e.target.value) }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Frequency (days/week)</label>
          <input
            type="number"
            min="1"
            max="7"
            value={userData.training?.frequency}
            onChange={(e) => setUserData({
              ...userData,
              training: { ...userData.training, frequency: parseInt(e.target.value) }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Workout Type (select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {workoutTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                const current = userData.training?.workoutType || [];
                const updated = current.includes(type)
                  ? current.filter((t: string) => t !== type)
                  : [...current, type];
                setUserData({
                  ...userData,
                  training: { ...userData.training, workoutType: updated }
                });
              }}
              className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                userData.training?.workoutType?.includes(type)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-dark-light text-gray-400 hover:border-primary/50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Preferences Step Component
const PreferencesStep = ({ userData, setUserData }: any) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading font-bold text-gradient mb-6">Your Preferences</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Caffeine Tolerance</label>
          <select
            value={userData.preferences?.caffeineTolerance}
            onChange={(e) => setUserData({
              ...userData,
              preferences: { ...userData.preferences, caffeineTolerance: e.target.value }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          >
            <option value="none">None - I avoid caffeine</option>
            <option value="low">Low - Up to 100mg</option>
            <option value="medium">Medium - 100-200mg</option>
            <option value="high">High - 200mg+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Stimulant Preference</label>
          <select
            value={userData.preferences?.stimulantPreference}
            onChange={(e) => setUserData({
              ...userData,
              preferences: { ...userData.preferences, stimulantPreference: e.target.value }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          >
            <option value="none">None - No stimulants</option>
            <option value="mild">Mild stimulation</option>
            <option value="moderate">Moderate energy</option>
            <option value="high">Maximum energy</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Health Step Component
const HealthStep = ({ userData, setUserData }: any) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-heading font-bold text-gradient mb-6">Health & Wellness</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Sleep Quality</label>
          <select
            value={userData.health?.sleepQuality}
            onChange={(e) => setUserData({
              ...userData,
              health: { ...userData.health, sleepQuality: e.target.value }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          >
            <option value="poor">Poor</option>
            <option value="fair">Fair</option>
            <option value="good">Good</option>
            <option value="excellent">Excellent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Stress Level</label>
          <select
            value={userData.health?.stressLevel}
            onChange={(e) => setUserData({
              ...userData,
              health: { ...userData.health, stressLevel: e.target.value }
            })}
            className="w-full bg-dark border border-dark-light rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Formula Result Component
const FormulaResult = ({ formula }: { formula: Formula }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary mb-4"
        >
          <HiCheckCircle size={48} className="text-white" />
        </motion.div>
        <h2 className="text-4xl font-heading font-bold mb-2">Your Formula is Ready!</h2>
        <p className="text-xl text-gray-400">"{formula.name}"</p>
      </div>

      <Card glow className="mb-6">
        <div className="mb-6">
          <h3 className="text-2xl font-heading font-bold mb-4">Your Personalized Ingredients</h3>
          <p className="text-gray-400 mb-6">Total Caffeine: <span className="text-primary font-bold">{formula.totalCaffeine}mg</span></p>

          <div className="space-y-4">
            {formula.ingredients.map((item, index) => (
              <motion.div
                key={item.ingredient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-dark-light rounded-lg p-4 hover:border-primary transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{item.ingredient.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">{item.ingredient.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{item.dosage}{item.unit}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 italic">{item.reason}</p>
                <p className="text-sm text-gray-500 mt-2">{item.ingredient.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-dark-light pt-6">
          <Button fullWidth size="lg">
            Order Your Custom Formula - $49.99/month
          </Button>
          <p className="text-center text-sm text-gray-500 mt-4">
            30-day money-back guarantee • Free shipping • Cancel anytime
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
