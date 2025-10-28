import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/20 via-dark to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Ready to <span className="text-gradient">Level Up</span>
            <br />
            Your Training?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stop wasting money on generic preworkouts. Get a formula designed specifically
            for your body, goals, and training style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/formula">
              <Button size="lg">
                Build Your Formula - It's Free
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Free formula generation • 30-day money-back guarantee • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};
