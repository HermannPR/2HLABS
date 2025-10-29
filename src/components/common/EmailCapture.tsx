import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { saveEmail, isValidEmail, hasSubmittedEmail } from '../../utils/emailStorage';

interface EmailCaptureProps {
  source: 'homepage' | 'results';
  archetype?: string;
  heading: string;
  subheading?: string;
  buttonText?: string;
  onSuccess?: () => void;
}

export const EmailCapture = ({
  source,
  archetype,
  heading,
  subheading,
  buttonText = 'Get Early Access',
  onSuccess,
}: EmailCaptureProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (hasSubmittedEmail(email)) {
      setError('This email is already registered!');
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      saveEmail({
        email: email.trim(),
        archetype,
        timestamp: Date.now(),
        source,
      });

      setSubmitted(true);
      setIsSubmitting(false);
      onSuccess?.();
    }, 500);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary/10 border-2 border-primary rounded-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-6xl mb-4"
        >
          ✓
        </motion.div>
        <h3 className="text-2xl font-heading font-bold text-white mb-2">
          You're On The List!
        </h3>
        <p className="text-gray-300">
          We'll notify you when {archetype ? `your ${archetype} formula` : 'we launch'} is ready.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-dark-lighter border border-dark-light rounded-xl p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
          {heading}
        </h3>
        {subheading && (
          <p className="text-gray-400">{subheading}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`
              flex-1 px-4 py-3 bg-dark border-2 rounded-lg
              text-white placeholder-gray-500
              focus:outline-none focus:border-primary transition-colors
              ${error ? 'border-red-500' : 'border-dark-light'}
            `}
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="sm:px-8"
          >
            {isSubmitting ? 'Submitting...' : buttonText}
          </Button>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-2 text-center"
          >
            {error}
          </motion.p>
        )}

        <p className="text-gray-500 text-xs text-center mt-3">
          We'll never share your email. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};
