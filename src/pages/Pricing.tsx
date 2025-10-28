import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { HiCheck } from 'react-icons/hi';

const plans = [
  {
    name: 'One-Time',
    price: 59.99,
    period: 'one-time',
    features: [
      'Personalized formula',
      '30-day supply',
      'Science-backed ingredients',
      'Clinical dosages',
      'Free shipping',
      '30-day money-back guarantee',
    ],
    popular: false,
  },
  {
    name: 'Monthly Subscription',
    price: 49.99,
    period: 'month',
    features: [
      'Everything in One-Time',
      'Save $10/month',
      'Update formula anytime',
      'Never run out',
      'Cancel anytime',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: '3-Month Supply',
    price: 129.99,
    period: '3 months',
    savings: 'Save $50',
    features: [
      'Everything in Subscription',
      'Best value ($43.33/month)',
      '90-day supply',
      'Free premium shaker',
      'Adjust formula mid-cycle',
      'VIP support',
    ],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <div className="bg-dark min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the plan that works for you. All plans include full personalization and premium ingredients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`h-full relative ${plan.popular ? 'border-2 border-primary' : ''}`}
                glow={plan.popular}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-heading font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-heading font-bold text-gradient">${plan.price}</span>
                    {plan.period !== 'one-time' && (
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  {plan.savings && (
                    <p className="text-accent font-semibold mt-2">{plan.savings}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <HiCheck className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300 ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/formula">
                  <Button
                    fullWidth
                    variant={plan.popular ? 'primary' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Pricing <span className="text-gradient">FAQs</span>
          </h2>
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold mb-2">What's included in each order?</h3>
              <p className="text-gray-400 text-sm">
                Each order contains a 30-day supply of your personalized preworkout formula with all ingredients at clinical dosages.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold mb-2">Can I cancel my subscription?</h3>
              <p className="text-gray-400 text-sm">
                Yes! Cancel anytime with no fees or penalties. Your subscription stays active until the end of your current billing period.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold mb-2">What if I don't like my formula?</h3>
              <p className="text-gray-400 text-sm">
                We offer a 30-day money-back guarantee on all purchases. Try your formula risk-free. You can also adjust your formula anytime.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
