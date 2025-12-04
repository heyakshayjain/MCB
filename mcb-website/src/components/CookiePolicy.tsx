import React from 'react';
import { motion } from 'framer-motion';

const CookiePolicy: React.FC = () => {
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
          <h1 className="text-5xl font-bold mb-8 text-gray-900">Cookie Policy</h1>
          <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
            <p>
              MCB uses cookies and similar technologies to enhance your experience and gather analytics about how you use our platform. This Cookie Policy explains what cookies are, how we use them, and your options.
            </p>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, improve your browsing experience, and gather analytics data.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              <p>
                <strong>Essential Cookies:</strong> Required for the platform to function (authentication, security).
              </p>
              <p className="mt-2">
                <strong>Analytical Cookies:</strong> Help us understand how users interact with our platform through analytics tools.
              </p>
              <p className="mt-2">
                <strong>Preference Cookies:</strong> Remember your settings and preferences for a personalized experience.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Your Choices</h2>
              <p>
                You can control cookie settings in your browser:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Accept all cookies</li>
                <li>Reject all cookies</li>
                <li>Set custom cookie preferences</li>
                <li>Clear cookies from your browser</li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> Disabling essential cookies may impact platform functionality and your ability to log in.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p>
                We use third-party services (e.g., analytics providers) that may set their own cookies. We do not control these cookies and recommend reviewing their policies.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
              <p>
                For questions about our cookie practices, please contact us at:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:privacy@collegebuddyapp.com" className="text-blue-600 hover:text-blue-700">privacy@collegebuddyapp.com</a>
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

export default CookiePolicy;
