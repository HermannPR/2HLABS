import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import type { QuizAnswers, ArchetypeResult, FormulaIngredient } from '../types';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { HiArrowLeft, HiArrowRight, HiLightningBolt, HiClock, HiFire, HiSparkles, HiBeaker, HiPencil } from 'react-icons/hi';
import { getArchetypeResult } from '../utils/archetypeMatching';
import { generateArchetypeFormula, getUserContextFromAnswers } from '../utils/archetypeFormulaGenerator';
import { analyzeDose, formatDoseRange } from '../utils/doseAnalysis';
import { getSoulLogo } from '../utils/soulLogos';
import { IntroCard } from '../components/quiz/IntroCard';
import { FlavorSelection } from '../components/quiz/FlavorSelection';
import { EmailCapture } from '../components/common/EmailCapture';
import { ShareCardGenerator } from '../components/common/ShareCardGenerator';
import { saveResult } from '../utils/resultsStorage';
import { FormulaEditor } from '../components/formula/FormulaEditor';
import { INTENSITY_GRADIENT, PUMP_GRADIENT, FOCUS_GRADIENT, LEVEL_TO_VALUE, type GradientStop } from '../constants/gradients';

const renderGradientBars = (value: number, gradient: GradientStop[]) => (
  <div className="flex items-center gap-1">
    {gradient.map((stop, idx) => {
      const isActive = idx < Math.min(value, gradient.length);
      return (
        <div
          key={idx}
          className="w-2 h-6 md:w-2.5 md:h-7 rounded-sm transition-all"
          style={isActive ? {
            backgroundColor: stop.bg,
            boxShadow: `0 0 10px ${stop.glow}`,
            opacity: 1,
          } : {
            backgroundColor: '#1F2937',
            opacity: 0.2,
          }}
        />
      );
    })}
  </div>
);

export const FormulaGenerator = () => {
  const { t } = useTranslation();
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [archetypeResult, setArchetypeResult] = useState<ArchetypeResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showFlavorSelection, setShowFlavorSelection] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [showFormulaEditor, setShowFormulaEditor] = useState(false);
  const [customIngredients, setCustomIngredients] = useState<FormulaIngredient[]>([]);

  // TODO: Use selectedFlavor for formula creation/ordering
  console.log('Current flavor selection:', selectedFlavor);

  // Filter questions based on conditional logic
  const getVisibleQuestions = () => {
    return QUIZ_QUESTIONS.filter(question => {
      // Always show questions without conditionalOn
      if (!question.conditionalOn) return true;

      // Check if all conditions are met
      return Object.entries(question.conditionalOn).every(([questionId, requiredAnswers]) => {
        const answer = answers[questionId];
        if (Array.isArray(answer)) {
          // For multi-select, check if any required answer is selected
          return requiredAnswers.some(req => answer.includes(req));
        }
        // For single select, check if answer matches
        return requiredAnswers.includes(answer as string);
      });
    });
  };

  const visibleQuestions = getVisibleQuestions();
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === visibleQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / visibleQuestions.length) * 100;

  // No longer needed - we use full question IDs in translations now
  // Old quiz had simple IDs (q1, q2), new quiz has full IDs (q1-caffeine-tolerance, q2-extreme-intensity)

  // Get icon for question dimension
  const getDimensionIcon = (dimension: string) => {
    const iconProps = { size: 32, className: "text-primary" };
    switch (dimension) {
      case 'intensity':
        return <HiFire {...iconProps} />;
      case 'focus':
        return <HiSparkles {...iconProps} />;
      case 'energy':
        return <HiLightningBolt {...iconProps} />;
      case 'duration':
        return <HiClock {...iconProps} />;
      case 'stimTolerance':
        return <HiBeaker {...iconProps} />;
      default:
        return <HiSparkles {...iconProps} />;
    }
  };

  const handleAnswer = (optionId: string) => {
    // All questions are now single-select
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Show analyzing animation
      setIsAnalyzing(true);

      // Calculate archetype with a dramatic delay
      setTimeout(() => {
        const result = getArchetypeResult(answers);
        const userContext = getUserContextFromAnswers(answers);
        const formula = generateArchetypeFormula(result.archetype, answers, userContext);

        const fullResult = {
          ...result,
          formula,
        };

        setArchetypeResult(fullResult);

        // Save result to localStorage
        saveResult(fullResult);

        setIsAnalyzing(false);
        setShowResults(true);
      }, 2500);
    } else {
      setIsNavigating(true);
      // Scroll to top when navigating to next question
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsNavigating(false);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsNavigating(true);
      // Scroll to top when navigating to previous question
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsNavigating(false);
      }, 150);
    }
  };

  const handleStartOver = () => {
    if (window.confirm('Are you sure you want to start over? Your current results will be lost.')) {
      setShowResults(false);
      setShowIntro(true);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setArchetypeResult(null);
      setShowFlavorSelection(false);
      setSelectedFlavor(null);
    }
  };

  const handleGetFormula = () => {
    setShowFlavorSelection(true);
  };

  const handleFlavorSelected = (flavorId: string) => {
    setSelectedFlavor(flavorId);
    setShowFlavorSelection(false);
    // Could add logic here to save the complete formula with flavor
    console.log('Selected flavor:', flavorId);
  };

  const handleSkipFlavor = () => {
    setShowFlavorSelection(false);
  };

  const handleToggleFormulaEditor = () => {
    if (!showFormulaEditor) {
      if (customIngredients.length === 0 && archetypeResult) {
        setCustomIngredients([...archetypeResult.formula.ingredients]);
      }
      // Scroll to editor section when opening
      setTimeout(() => {
        const editorElement = document.getElementById('formula-editor');
        if (editorElement) {
          editorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
    setShowFormulaEditor(!showFormulaEditor);
  };

  const handleUpdateCustomIngredients = (updatedIngredients: FormulaIngredient[]) => {
    setCustomIngredients(updatedIngredients);
  };

  const isAnswered = () => {
    const answer = answers[currentQuestion.id];
    // Skip optional questions - they can be unanswered
    if (currentQuestion.optional) return true;
    return answer !== undefined && answer !== '';
  };

  // Intro screen with onboarding cards
  if (showIntro) {
    const introCards = [
      {
        icon: '✓',
        headline: t('formulaGenerator.intro.card1Headline'),
        body: t('formulaGenerator.intro.card1Body'),
        color: 'primary' as const,
      },
      {
        icon: '⚡',
        headline: t('formulaGenerator.intro.card2Headline'),
        body: t('formulaGenerator.intro.card2Body'),
        color: 'secondary' as const,
      },
      {
        icon: '🔬',
        headline: t('formulaGenerator.intro.card3Headline'),
        body: t('formulaGenerator.intro.card3Body'),
        color: 'accent' as const,
      },
    ];

    return (
      <div className="min-h-screen bg-dark py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              {t('formulaGenerator.intro.title')} <span className="text-gradient">{t('formulaGenerator.intro.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('formulaGenerator.intro.subtitle')}
            </p>
          </motion.div>

          {/* Intro Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {introCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <IntroCard {...card} />
              </motion.div>
            ))}
          </div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Button
              size="lg"
              onClick={() => setShowIntro(false)}
              className="text-xl px-12 py-6"
            >
              {t('formulaGenerator.intro.startButton')}
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              {t('formulaGenerator.intro.startSubtext')}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Analyzing screen
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-24 h-24 mx-auto mb-8 border-4 border-primary border-t-transparent rounded-full"
          />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
            {t('formulaGenerator.analyzing.title')}
          </h2>
          <p className="text-gray-400 text-lg">
            {t('formulaGenerator.analyzing.subtitle')}
          </p>
        </motion.div>
      </div>
    );
  }

  // Results screen
  if (showResults && archetypeResult) {
    const { archetype, dimensionScores, formula, matchPercentage } = archetypeResult;
    const baseIngredients = formula.ingredients;
    const displayedIngredients = customIngredients.length > 0 ? customIngredients : baseIngredients;

    const calculatedCaffeine = displayedIngredients.reduce((total, item) => {
      if (item.ingredient.id === 'caffeine') {
        return total + item.dosage;
      }
      if (item.ingredient.caffeineContent) {
        return total + item.dosage * item.ingredient.caffeineContent;
      }
      return total;
    }, 0);

    const totalCaffeineDisplay = customIngredients.length > 0
      ? Math.round(calculatedCaffeine)
      : formula.totalCaffeine;
    const pumpLevelValue = LEVEL_TO_VALUE[archetype.formulaProfile.pumpLevel] ?? 0;
    const focusLevelValue = LEVEL_TO_VALUE[archetype.formulaProfile.focusLevel] ?? 0;

    return (
      <div className="min-h-screen bg-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Archetype Reveal Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              <img
                src={getSoulLogo(archetype.id)}
                alt={archetype.name}
                className="w-40 h-40 object-contain mix-blend-lighten"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.5))' }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-5xl md:text-7xl font-heading font-bold mb-4"
            >
              {archetype.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-2xl md:text-3xl text-primary font-semibold mb-6"
            >
              {t(`archetypes.${archetype.id}.tagline`)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="inline-block px-6 py-2 bg-primary/10 border-2 border-primary rounded-full"
            >
              <span className="text-primary font-bold text-lg">
                {matchPercentage}% Match
              </span>
            </motion.div>
          </motion.div>

          {/* Archetype Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-4">Your Soul's Essence</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {t(`archetypes.${archetype.id}.description`)}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Core Traits</h3>
                  <ul className="space-y-2">
                    {(t(`archetypes.${archetype.id}.traits`, { returnObjects: true }) as string[]).map((trait, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-accent mt-1">▸</span>
                        <span className="text-gray-300">{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">You Thrive As</h3>
                  <ul className="space-y-2">
                    {(t(`archetypes.${archetype.id}.athleteTypes`, { returnObjects: true }) as string[]).map((type, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-accent mt-1">▸</span>
                        <span className="text-gray-300">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Dimension Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Card className="mb-8">
              <h2 className="text-xl md:text-2xl font-heading font-bold mb-6">Your Training DNA</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Intensity</span>
                    <span className="text-primary font-bold uppercase text-sm">
                      {dimensionScores.intensity}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-dark-lighter rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${dimensionScores.intensityScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-primary font-bold uppercase text-sm">
                      {dimensionScores.duration}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-dark-lighter rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${dimensionScores.durationScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Focus</span>
                    <span className="text-primary font-bold uppercase text-sm">
                      {dimensionScores.focus}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-dark-lighter rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${dimensionScores.focusScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Energy Pattern</span>
                    <span className="text-primary font-bold uppercase text-sm">
                      {dimensionScores.energyPattern}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-dark-lighter rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${dimensionScores.energyScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Stim Tolerance</span>
                    <span className="text-primary font-bold uppercase text-sm">
                      {dimensionScores.stimTolerance}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-dark-lighter rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      style={{
                        width: `${
                          dimensionScores.stimTolerance === 'none' ? 0 :
                          dimensionScores.stimTolerance === 'low' ? 25 :
                          dimensionScores.stimTolerance === 'moderate' ? 60 :
                          100
                        }%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Soul Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Card className="relative mb-8 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-20 blur-3xl bg-gradient-to-r from-primary via-transparent to-secondary" />
              <div className="relative">
                <h2 className="text-xl md:text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                  <HiSparkles className="text-primary" />
                  Soul Signature
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Intensity</p>
                    {renderGradientBars(archetype.formulaProfile.intensity, INTENSITY_GRADIENT)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Pump</p>
                    {renderGradientBars(pumpLevelValue, PUMP_GRADIENT)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Focus</p>
                    {renderGradientBars(focusLevelValue, FOCUS_GRADIENT)}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Formula Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <Card className="mb-8">
              <h2 className="text-2xl font-heading font-bold mb-2">Your Custom Formula</h2>
              <p className="text-gray-400 mb-6">
                Scientifically dosed for your unique archetype
              </p>

              <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total Caffeine</span>
                  <span className="text-3xl font-bold text-primary">
                    {totalCaffeineDisplay}mg
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {displayedIngredients.map((item, idx) => {
                  const doseAnalysis = analyzeDose(item.dosage, item.ingredient);
                  const clinicalRange = formatDoseRange(item.ingredient);

                  return (
                    <div
                      key={idx}
                      className="p-3 md:p-4 bg-dark-lighter rounded-lg border border-dark-light hover:border-primary/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                        <div className="flex-1 w-full sm:w-auto">
                          <div className="flex items-start justify-between sm:block mb-2">
                            <h3 className="text-base md:text-lg font-semibold text-white">
                              {item.ingredient.name}
                            </h3>
                            {/* Mobile dosage - show on mobile only */}
                            <div className="sm:hidden text-right">
                              <div className="text-xl font-bold text-primary">
                                {item.dosage.toLocaleString()}
                                <span className="text-xs ml-1">{item.unit}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-gray-400 mb-2">
                            {item.ingredient.description}
                          </p>
                          <p className="text-xs md:text-sm text-accent italic mb-3">
                            {item.reason}
                          </p>

                          {/* Dose Context */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Clinical Range:</span>
                              <span className="text-gray-300 font-semibold">{clinicalRange}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Your Dose:</span>
                              <span className={`font-bold ${doseAnalysis.color}`}>
                                {doseAnalysis.label}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Desktop dosage - hidden on mobile */}
                        <div className="hidden sm:block text-right ml-4 flex-shrink-0">
                          <div className="text-2xl font-bold text-primary">
                            {item.dosage.toLocaleString()}
                            <span className="text-sm ml-1">{item.unit}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customize Formula Button */}
              <div className="mt-6 flex justify-center">
                <Button
                  variant={showFormulaEditor ? "outline" : "secondary"}
                  size="md"
                  onClick={handleToggleFormulaEditor}
                  className="flex items-center gap-2"
                >
                  <HiPencil className="w-5 h-5" />
                  {showFormulaEditor ? 'Hide Editor' : 'Customize Formula'}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Formula Editor */}
          <AnimatePresence>
            {showFormulaEditor && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div id="formula-editor">
                  <FormulaEditor
                    ingredients={displayedIngredients}
                    onUpdate={handleUpdateCustomIngredients}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Warnings if any */}
          {archetype.warnings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <Card className="mb-8 border-2 border-secondary/30">
                <h2 className="text-xl font-heading font-bold mb-4 text-secondary">
                  Important Considerations
                </h2>
                <ul className="space-y-2">
                  {(t(`archetypes.${archetype.id}.warnings`, { returnObjects: true }) as string[]).map((warning, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-secondary mt-1">⚠</span>
                      <span className="text-gray-300">{warning}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {/* Email Capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
            className="mb-8"
          >
            <EmailCapture
              source="results"
              archetype={archetype.name}
              heading={`Get Your ${archetype.name} Formula`}
              subheading="Be the first to know when your personalized preworkout is ready"
              buttonText="Join the Waitlist"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button size="lg" onClick={handleGetFormula} className="text-lg px-8">
              Get Your {archetype.name} Formula
            </Button>
            <ShareCardGenerator
              archetype={archetype}
              matchPercentage={matchPercentage}
            />
            <Button
              variant="outline"
              size="lg"
              onClick={handleStartOver}
              className="text-lg px-8"
            >
              Discover Another Soul
            </Button>
          </motion.div>

          {/* Flavor Selection */}
          {showFlavorSelection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <FlavorSelection
                archetype={archetype}
                onFlavorSelected={handleFlavorSelected}
                onSkip={handleSkipFlavor}
              />
            </motion.div>
          )}

          {/* View All Souls Link */}
          {!showFlavorSelection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="text-center"
            >
              <a
                href="/souls"
                className="text-primary hover:text-primary-light transition-colors font-semibold inline-flex items-center gap-2"
              >
                <span>Compare All 12 Training Souls</span>
                <span>→</span>
              </a>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark py-12 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {currentQuestionIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Discover Your <span className="text-gradient">Training Archetype</span>
            </h1>
            <p className="text-xl text-gray-400">
              Answer honestly - there are no wrong answers. This takes about 2 minutes.
            </p>
          </motion.div>
        )}

        {/* Progress Section */}
        <div className="mb-8 flex items-center gap-6">
          {/* Circular Progress */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="transform -rotate-90 w-full h-full">
              {/* Background Circle */}
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-dark-lighter"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#progressGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 226 }}
                animate={{ strokeDashoffset: 226 - (226 * progress) / 100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  strokeDasharray: 226,
                }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#00b8cc" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Linear Progress */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {visibleQuestions.length}
              </span>
              <span className="text-sm text-primary font-semibold">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full h-3 bg-dark-lighter rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/50"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8 relative overflow-visible">
              {/* Dimension Icon Badge */}
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 flex items-center justify-center shadow-lg shadow-primary/20"
                >
                  {getDimensionIcon(currentQuestion.dimension)}
                </motion.div>
              </div>

              {/* Question Number Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                <span className="text-sm font-semibold text-primary">
                  {currentQuestionIndex + 1}/{visibleQuestions.length}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3 text-center">
                {t(`quiz.questions.${currentQuestion.id}.question`)}
              </h2>
              {currentQuestion.description && (
                <p className="text-gray-400 mb-6 text-center">{t(`quiz.questions.${currentQuestion.id}.description`)}</p>
              )}

              {/* Options Grid */}
              <div className={`grid gap-4 items-stretch ${
                currentQuestion.options.length <= 3
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        p-6 rounded-xl border-2 transition-all text-left h-full
                        ${isSelected
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-dark-light bg-dark-lighter hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-4">
                        {option.emoji && (
                          <span className="text-4xl flex-shrink-0">{option.emoji}</span>
                        )}
                        <div className="flex-1">
                          <p className={`text-lg font-semibold ${
                            isSelected ? 'text-primary' : 'text-white'
                          }`}>
                            {t(`quiz.questions.${currentQuestion.id}.options.${option.id}`)}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || isNavigating}
            className="flex items-center space-x-2"
          >
            <HiArrowLeft />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            {!isAnswered() && !isNavigating && !currentQuestion.optional && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 hidden sm:block"
              >
                Select an option to continue
              </motion.p>
            )}
            {currentQuestion.optional && !isAnswered() && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-400 hidden sm:block"
              >
                Optional - Skip if you prefer
              </motion.p>
            )}
            <Button
              onClick={handleNext}
              disabled={!isAnswered() || isNavigating}
              className="flex items-center space-x-2"
            >
              {isNavigating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>{isLastQuestion ? 'Generate My Formula' : 'Next'}</span>
                  {!isLastQuestion && <HiArrowRight />}
                </>
              )}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
