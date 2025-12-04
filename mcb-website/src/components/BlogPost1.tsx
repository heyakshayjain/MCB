import React from 'react';
import { motion } from 'framer-motion';

const BlogPost1: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Navigation */}
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

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </a>

          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 text-sm mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium uppercase tracking-wider">Our Cause</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">November 18, 2024</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">8 min read</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Why we started MCB: A personal letter from the founders
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Education should be a right, not a privilege. Here is why we are fighting to democratize access to top-tier institutions.
            </p>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl mb-12 flex items-center justify-center overflow-hidden">
            <div className="text-9xl font-bold text-blue-200/30 select-none">MCB</div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
              <p className="text-2xl font-medium text-gray-900 leading-relaxed">
                Dear future students, educators, and dreamers,
              </p>

              <p>
                We started MCB because we've been where you are. We've felt the weight of uncertainty, the pressure of deadlines, and the fear that one wrong move could derail years of hard work. We've watched friends miss opportunities not because they lacked talent, but because they lacked access to the right information at the right time.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Problem We Saw</h2>

              <p>
                The college application process is broken. It's a maze of confusing requirements, hidden deadlines, and gatekeepers who seem to speak a different language. For students from underserved communities, rural areas, or families without college experience, this maze becomes nearly impossible to navigate.
              </p>

              <p>
                We saw talented students give up before they even started. We watched coaching institutes struggle to manage hundreds of applications manually. We witnessed universities lose exceptional candidates simply because the process was too complex.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 italic text-xl text-gray-600 my-12">
                "Education should open doors, not create more barriers. Yet our current system does exactly that."
              </blockquote>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Our Mission</h2>

              <p>
                MCB exists to level the playing field. We believe that:
              </p>

              <ul className="space-y-4 my-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Every student deserves clarity.</strong> No one should feel lost in the application process.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Technology should simplify, not complicate.</strong> We build tools that actually help.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Access creates opportunity.</strong> When barriers fall, potential rises.</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Makes MCB Different</h2>

              <p>
                We're not just another application portal. We're a complete ecosystem designed to support everyone in the education journey:
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Students</h3>
                <p className="text-gray-700 mb-4">
                  A single platform that guides you from profile creation to acceptance letters. No more juggling multiple websites, spreadsheets, and sticky notes.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">For Coaching Institutes</h3>
                <p className="text-gray-700 mb-4">
                  Tools that help you scale your impact without scaling your workload. Batch applications, automated tracking, and real-time insights.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">For Universities</h3>
                <p className="text-gray-700">
                  Connect with qualified candidates efficiently. Reduce administrative burden while increasing application quality and diversity.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Road Ahead</h2>

              <p>
                We're just getting started. Our vision extends beyond applications. We want to build a world where:
              </p>

              <ul className="space-y-3 my-8 list-disc list-inside">
                <li>Geographic location doesn't limit educational opportunities</li>
                <li>Financial constraints don't prevent qualified students from applying</li>
                <li>Mental health support is integrated into the application journey</li>
                <li>Success is measured by personal growth, not just acceptance rates</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Join Us</h2>

              <p>
                Whether you're a student taking your first steps toward college, an educator helping others navigate the journey, or a university looking to connect with diverse talent—we built MCB for you.
              </p>

              <p>
                This isn't just about applications. It's about transforming lives, opening doors, and proving that with the right tools and support, anyone can achieve their educational dreams.
              </p>

              <p className="text-xl font-medium text-gray-900 mt-12">
                Let's democratize education together.
              </p>

              <p className="text-gray-600 mt-8">
                With hope and determination,<br />
                <span className="font-semibold text-gray-900">The MCB Founding Team</span>
              </p>
            </div>
          </div>

          {/* Author Section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              <div>
                <div className="font-bold text-gray-900 text-lg">MCB Team</div>
                <div className="text-gray-600">Founders & Education Advocates</div>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 flex items-center gap-4">
            <span className="text-gray-600 font-medium">Share this article:</span>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost1;
