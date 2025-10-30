import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';

export const Privacy = () => {
  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Privacy <span className="text-gradient">Policy</span>
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
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Introduction</h2>
                <p>
                  At 2HLABS, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Information We Collect</h2>
                <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                <p className="mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Take our personalized formula quiz</li>
                  <li>Subscribe to our email list or waitlist</li>
                  <li>Create an account</li>
                  <li>Make a purchase</li>
                  <li>Contact us directly</li>
                </ul>
                <p className="mt-4">
                  This information may include: name, email address, shipping address, payment information, training preferences, and quiz responses.
                </p>

                <h3 className="text-xl font-semibold text-white mb-2 mt-6">Automatically Collected Information</h3>
                <p>
                  When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. We also collect information about your browsing behavior, such as pages viewed and links clicked.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Create your personalized preworkout formulas</li>
                  <li>Process your transactions and manage orders</li>
                  <li>Send you updates about your orders and account</li>
                  <li>Communicate with you about our products and services</li>
                  <li>Improve and optimize our website and services</li>
                  <li>Understand and analyze how you use our services</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Information Sharing</h2>
                <p className="mb-4">
                  We do not sell or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> We share information with third-party vendors who perform services on our behalf (payment processing, shipping, email delivery)</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                  <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Your Rights</h2>
                <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Opt-Out:</strong> Opt-out of marketing communications at any time</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at privacy@2hlabs.com
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, some parts of our website may not function properly without cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Contact Us</h2>
                <p className="mb-2">
                  If you have questions or concerns about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-1 ml-4">
                  <p><strong>Email:</strong> privacy@2hlabs.com</p>
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
