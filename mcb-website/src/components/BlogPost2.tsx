import React from 'react';
import { motion } from 'framer-motion';

const BlogPost2: React.FC = () => {
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
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full font-medium uppercase tracking-wider">Mental Health</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">November 15, 2024</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">6 min read</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              The silent crisis in college admissions
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stress levels are at an all-time high. How can technology help alleviate the burden rather than add to it?
            </p>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl mb-12 flex items-center justify-center overflow-hidden">
            <div className="text-9xl font-bold text-purple-200/30 select-none">MCB</div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
              <p className="text-xl font-medium text-gray-900">
                Behind every college application is a student carrying an invisible weight—anxiety, pressure, and fear of failure.
              </p>

              <p>
                Recent studies show that over 60% of high school seniors report experiencing severe stress during the college application process. For many, this stress manifests as sleepless nights, anxiety attacks, and feelings of inadequacy. We're not just facing an admissions challenge; we're facing a mental health crisis.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Numbers Don't Lie</h2>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
                <ul className="space-y-3 text-gray-800">
                  <li><strong>61%</strong> of students report significant stress during applications</li>
                  <li><strong>45%</strong> experience anxiety that affects their daily life</li>
                  <li><strong>38%</strong> feel overwhelmed by the sheer volume of requirements</li>
                  <li><strong>72%</strong> say the process negatively impacts their mental health</li>
                </ul>
              </div>

              <p>
                These aren't just statistics—they're real students, real struggles, and real consequences that can affect academic performance, relationships, and long-term wellbeing.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Is It So Stressful?</h2>

              <p>
                The college application process has become increasingly complex:
              </p>

              <div className="space-y-6 my-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Information Overload</h3>
                  <p className="text-gray-700">
                    Students must navigate hundreds of college websites, each with different requirements, deadlines, and application systems. It's like trying to drink from a fire hose.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">High Stakes Pressure</h3>
                  <p className="text-gray-700">
                    Society tells students that college determines their entire future. One mistake, one missed deadline, feels like the end of the world.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Lack of Guidance</h3>
                  <p className="text-gray-700">
                    Many students, especially first-generation college applicants, don't have access to counselors or mentors who understand the process.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Anxiety</h3>
                  <p className="text-gray-700">
                    The cost of college applications, test fees, and tuition creates additional stress for students and families.
                  </p>
                </div>
              </div>

              <blockquote className="border-l-4 border-purple-600 pl-6 italic text-xl text-gray-600 my-12">
                "I felt like I was drowning. Every time I opened my laptop, my heart would race. I couldn't sleep, couldn't focus in class. The process that was supposed to launch my future was destroying my present."
                <footer className="text-base text-gray-500 mt-4 not-italic">— Anonymous student, Class of 2024</footer>
              </blockquote>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">How Technology Can Help (Not Hurt)</h2>

              <p>
                Technology often gets blamed for adding to student stress. Social media creates comparison culture. Multiple platforms create complexity. But when designed thoughtfully, technology can be the solution.
              </p>

              <p>
                At MCB, we've built our platform with mental health in mind:
              </p>

              <ul className="space-y-4 my-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Centralized Information:</strong> Everything in one place reduces cognitive load and decision fatigue.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Deadline Management:</strong> Automated reminders and timeline visualization prevent last-minute panic.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>AI-Powered Guidance:</strong> Get answers to questions without waiting for a counselor's availability.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Progress Tracking:</strong> Visual progress indicators provide a sense of accomplishment and control.</span>
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Beyond Technology: A Cultural Shift</h2>

              <p>
                Tools and platforms can only do so much. We need a broader cultural shift in how we approach college admissions:
              </p>

              <ol className="space-y-3 my-8 list-decimal list-inside">
                <li><strong>Redefine Success:</strong> College acceptance isn't the only path to a fulfilling life.</li>
                <li><strong>Normalize Mental Health Support:</strong> Seeking help should be encouraged, not stigmatized.</li>
                <li><strong>Simplify Requirements:</strong> Universities need to streamline their application processes.</li>
                <li><strong>Provide Equal Access:</strong> Every student deserves quality guidance, regardless of background.</li>
              </ol>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What You Can Do</h2>

              <div className="bg-blue-50 rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Students:</h3>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>• Take breaks. Your mental health is more important than any application.</li>
                  <li>• Talk to someone—a friend, family member, or counselor.</li>
                  <li>• Remember: This process doesn't define your worth.</li>
                  <li>• Use tools like MCB that reduce stress rather than add to it.</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Parents & Educators:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Check in regularly about stress levels, not just progress.</li>
                  <li>• Provide support without adding pressure.</li>
                  <li>• Encourage healthy coping mechanisms.</li>
                  <li>• Advocate for systemic changes in the admissions process.</li>
                </ul>
              </div>

              <p className="text-xl font-medium text-gray-900 mt-12">
                The college application process doesn't have to be a mental health crisis. Together, we can build a better, healthier system.
              </p>
            </div>
          </div>

          {/* Resources Section */}
          <div className="mt-16 p-8 bg-purple-50 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mental Health Resources</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• <strong>Crisis Text Line:</strong> Text HOME to 741741</li>
              <li>• <strong>National Suicide Prevention Lifeline:</strong> 1-800-273-8255</li>
              <li>• <strong>Anxiety & Depression Association:</strong> adaa.org</li>
              <li>• <strong>Teen Line:</strong> 1-800-852-8336 (6pm-10pm PT)</li>
            </ul>
          </div>

          {/* Author Section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              <div>
                <div className="font-bold text-gray-900 text-lg">Dr. Sarah Mitchell</div>
                <div className="text-gray-600">Educational Psychologist & MCB Advisor</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost2;
