import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Navigation Spacer */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>
              <span className="text-xl font-semibold text-gray-900 tracking-tight">CollegeBuddyApp</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
          <h1 className="text-5xl font-bold mb-8 text-gray-900">Terms of Service</h1>
          <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
            <p>
              Welcome to MCB (My College Buddy). By using our platform, you agree to these Terms of Service. Please read them carefully before accessing or using our services.
            </p>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Use of Platform</h2>
              <p>
                You agree to use MCB only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the platform.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. User Responsibilities</h2>
              <p>
                As a user, you are responsible for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>Complying with all applicable laws and regulations</li>
                <li>Not engaging in fraud, harassment, or illegal activities</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Intellectual Property Rights</h2>
              <p>
                All content, features, and functionality on MCB—including but not limited to text, graphics, logos, and software—are owned by MCB or our licensors. Unauthorized use is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. User-Generated Content</h2>
              <p>
                You retain ownership of content you create. By posting on MCB, you grant us a license to use, reproduce, and distribute your content for platform purposes.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p>
                MCB is provided "as is" without warranties, express or implied. We are not liable for indirect, incidental, special, or consequential damages arising from your use of our platform.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account if you violate these Terms of Service or engage in prohibited behavior.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p>
                MCB reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the platform.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us at:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:support@collegebuddyapp.com" className="text-blue-600 hover:text-blue-700">support@collegebuddyapp.com</a>
              </p>
            </div>

            <p className="text-sm text-gray-500 pt-8 border-t border-gray-200">
              Last updated: November 29, 2025
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
