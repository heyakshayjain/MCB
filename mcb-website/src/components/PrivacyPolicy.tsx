import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
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
          <h1 className="text-5xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
            <p>
              At MCB (My College Buddy), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly, such as:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Academic records and educational background</li>
                <li>Application details and preferences</li>
                <li>Payment information (if applicable)</li>
                <li>Profile information and preferences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Data</h2>
              <p>
                Your data is used to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Process and manage your applications</li>
                <li>Improve and personalize our platform</li>
                <li>Communicate with you about your account and services</li>
                <li>Send periodic updates and newsletters (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Data Security</h2>
              <p>
                We implement industry-leading security measures including SSL encryption, regular security audits, and compliance with GDPR and other international data protection standards to protect your information.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Third-Party Sharing</h2>
              <p>
                We do not sell or share your personal data with third parties without your explicit consent, except as required by law or to fulfill your requests (e.g., sharing applications with universities).
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal data. Contact us at <a href="mailto:privacy@collegebuddyapp.com" className="text-blue-600 hover:text-blue-700">privacy@collegebuddyapp.com</a> to exercise these rights.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
              <p>
                For privacy concerns or questions, please contact us at:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:privacy@collegebuddyapp.com" className="text-blue-600 hover:text-blue-700">privacy@collegebuddyapp.com</a><br />
                Address: San Francisco, CA
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

export default PrivacyPolicy;
