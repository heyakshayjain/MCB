import React from 'react';
import { motion } from 'framer-motion';

const Security: React.FC = () => {
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
          <h1 className="text-5xl font-bold mb-8 text-gray-900">Security</h1>
          <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
            <p>
              At MCB, your data security is our top priority. We implement industry-leading security measures to protect your information and ensure the integrity of our platform.
            </p>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. SSL/TLS Encryption</h2>
              <p>
                All data transmitted between your browser and our servers is encrypted using industry-standard SSL/TLS protocols. This ensures that sensitive information like passwords and payment details cannot be intercepted.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Data Protection Standards</h2>
              <p>
                We comply with:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>GDPR (General Data Protection Regulation)</li>
                <li>CCPA (California Consumer Privacy Act)</li>
                <li>ISO 27001 Information Security Management Standards</li>
                <li>Industry best practices for data handling</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Security Audits</h2>
              <p>
                Our systems undergo regular security audits and penetration testing by third-party cybersecurity experts to identify and address vulnerabilities before they can be exploited.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Access Controls</h2>
              <p>
                We implement strict access controls to ensure that only authorized personnel can access sensitive data. Multi-factor authentication is available for additional account security.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Incident Response</h2>
              <p>
                In the unlikely event of a security breach, MCB has a comprehensive incident response plan to minimize impact and notify affected users promptly.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Data Backup & Recovery</h2>
              <p>
                We maintain regular backups of all user data to ensure business continuity and data recovery in case of any disaster.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Security Best Practices</h2>
              <p>
                To protect your account:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Use a strong, unique password</li>
                <li>Enable two-factor authentication</li>
                <li>Never share your login credentials</li>
                <li>Log out after each session</li>
                <li>Report suspicious activity immediately</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Report a Vulnerability</h2>
              <p>
                If you discover a security vulnerability, please report it responsibly to:
              </p>
              <p className="mt-2">
                Email: <a href="mailto:security@collegebuddyapp.com" className="text-blue-600 hover:text-blue-700">security@collegebuddyapp.com</a>
              </p>
              <p className="mt-2">
                We take all security reports seriously and will work with you to resolve any issues promptly.
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

export default Security;
