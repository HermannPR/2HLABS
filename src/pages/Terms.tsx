import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';

export const Terms = () => {
  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-gray-400">Last Updated: January 2025</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="prose prose-invert max-w-none">
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Agreement to Terms</h2>
                <p>
                  By accessing or using 2HLABS services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily access and use 2HLABS services for personal, non-commercial use only. This license does not include the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or copy our materials</li>
                  <li>Use materials for commercial purposes</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                  <li>Transfer materials to another person or mirror on another server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Account Registration</h2>
                <p>
                  To access certain features of our services, you may need to create an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your password</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to suspend or terminate accounts that violate these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Product Information and Pricing</h2>
                <p>
                  We strive to provide accurate product descriptions and pricing. However:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We do not warrant that product descriptions or other content is accurate, complete, or error-free</li>
                  <li>Prices are subject to change without notice</li>
                  <li>We reserve the right to limit quantities and discontinue products</li>
                  <li>We reserve the right to refuse any order</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Health and Safety</h2>
                <p className="mb-4">
                  <strong className="text-white">IMPORTANT DISCLAIMER:</strong> Our products are dietary supplements intended to support athletic performance. Before using any 2HLABS product:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Consult with a healthcare professional, especially if you have pre-existing medical conditions</li>
                  <li>Do not exceed recommended dosages</li>
                  <li>Discontinue use if you experience adverse reactions</li>
                  <li>Keep products out of reach of children</li>
                  <li>Products are not intended to diagnose, treat, cure, or prevent any disease</li>
                  <li>Not intended for persons under 18 years of age</li>
                </ul>
                <p className="mt-4">
                  You assume all risks associated with the use of our products.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Intellectual Property</h2>
                <p>
                  All content on 2HLABS, including text, graphics, logos, images, and software, is the property of 2HLABS and protected by copyright, trademark, and other intellectual property laws. The "Training Soul" concept, quiz methodology, and personalization algorithm are proprietary to 2HLABS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">User-Generated Content</h2>
                <p className="mb-4">
                  If you submit testimonials, reviews, or other content to 2HLABS, you grant us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>A non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content</li>
                  <li>The right to use your name and likeness in connection with such content</li>
                </ul>
                <p className="mt-4">
                  You represent that you own or have necessary rights to submit such content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, 2HLABS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your use or inability to use our services</li>
                  <li>Any products purchased through our services</li>
                  <li>Unauthorized access to your data</li>
                  <li>Errors or omissions in our content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Refund and Return Policy</h2>
                <p>
                  We stand behind the quality of our products. Our refund policy:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>30-day money-back guarantee on first purchase</li>
                  <li>Product must be returned with at least 50% remaining</li>
                  <li>Shipping costs are non-refundable</li>
                  <li>Refunds processed within 5-7 business days</li>
                </ul>
                <p className="mt-4">
                  Contact support@2hlabs.com to initiate a return.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Termination</h2>
                <p>
                  We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use our services will immediately cease.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes shall be resolved in the appropriate courts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page with an updated "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Contact Information</h2>
                <p className="mb-2">
                  For questions about these Terms, please contact:
                </p>
                <div className="space-y-1 ml-4">
                  <p><strong>Email:</strong> legal@2hlabs.com</p>
                  <p><strong>Support:</strong> support@2hlabs.com</p>
                  <p><strong>Website:</strong> www.2hlabs.com</p>
                </div>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
