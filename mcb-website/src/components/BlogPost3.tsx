import React from 'react';
import { motion } from 'framer-motion';

const BlogPost3: React.FC = () => {
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
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-medium uppercase tracking-wider">Success Stories</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">November 10, 2024</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">10 min read</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              From rural village to Ivy League: Anjali's journey
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              How one student used MCB to navigate the complex international application process and secure a full scholarship.
            </p>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl mb-12 flex items-center justify-center overflow-hidden">
            <div className="text-9xl font-bold text-emerald-200/30 select-none">MCB</div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
              <p className="text-xl font-medium text-gray-900">
                When Anjali Sharma first heard about applying to universities in the United States, she thought it was impossible. She was wrong.
              </p>

              <p>
                Growing up in a small village in rural India, Anjali had big dreams but limited resources. Her school had no guidance counselor. Her family had never heard of the SAT. The nearest city with reliable internet was a three-hour bus ride away. Yet today, she's a sophomore at Columbia University on a full scholarship, studying computer science and giving back to her community.
              </p>

              <p>
                This is her story.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Beginning: A Spark of Hope</h2>

              <p>
                Anjali was the top student in her school. She excelled in mathematics and had taught herself basic programming using borrowed textbooks and occasional trips to an internet cafe. When a visiting teacher mentioned international universities, something clicked.
              </p>

              <blockquote className="border-l-4 border-emerald-600 pl-6 italic text-xl text-gray-600 my-12">
                "I remember Googling 'how to study in America' on my phone with a weak connection. The amount of information was overwhelming. I didn't even know where to start."
                <footer className="text-base text-gray-500 mt-4 not-italic">— Anjali Sharma</footer>
              </blockquote>

              <p>
                Like many first-generation international applicants, Anjali faced unique challenges:
              </p>

              <ul className="space-y-3 my-8 list-disc list-inside">
                <li>No access to standardized test prep courses</li>
                <li>Limited knowledge of the US education system</li>
                <li>Language barriers in understanding application requirements</li>
                <li>Financial constraints—even application fees were a burden</li>
                <li>No mentors who had been through the process</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Discovery: Finding MCB</h2>

              <p>
                During one of her internet cafe visits, Anjali discovered MCB. What caught her attention wasn't just the platform—it was the promise of guidance.
              </p>

              <div className="bg-emerald-50 rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What Made the Difference:</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Centralized Information:</strong> Instead of navigating dozens of university websites, Anjali could compare requirements, deadlines, and financial aid options in one place.
                  </p>
                  <p>
                    <strong>AI Guidance:</strong> When she had questions at midnight (morning in the US), MCB's AI assistant provided instant answers about application requirements, essay prompts, and documentation.
                  </p>
                  <p>
                    <strong>Financial Aid Focus:</strong> MCB helped her identify universities offering full financial aid to international students—information that was scattered across hundreds of websites.
                  </p>
                  <p>
                    <strong>Timeline Management:</strong> With limited internet access, having a clear timeline and checklist meant she could plan her cafe visits efficiently.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Journey: Overcoming Obstacles</h2>

              <p>
                Anjali's path wasn't easy. Here's how she tackled each challenge:
              </p>

              <div className="space-y-6 my-8">
                <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    Test Preparation
                  </h3>
                  <p className="text-gray-700 ml-11">
                    Without access to expensive prep courses, Anjali used free resources recommended by MCB. She studied during lunch breaks and after school. Her dedication paid off—she scored in the 95th percentile on the SAT.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    Essays That Stand Out
                  </h3>
                  <p className="text-gray-700 ml-11">
                    Anjali wrote about her unique perspective—growing up in a village where she was the only girl pursuing STEM, teaching coding to younger students using a single shared computer. Her authentic voice resonated with admissions committees.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    Financial Aid Applications
                  </h3>
                  <p className="text-gray-700 ml-11">
                    MCB's financial aid tracker helped her understand which forms were needed for each university. She applied to 15 schools, all offering need-blind admission or full financial aid to international students.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    Letters of Recommendation
                  </h3>
                  <p className="text-gray-700 ml-11">
                    Her teachers had never written international college recommendations before. MCB provided templates and guidelines that Anjali could share with them, ensuring her recommenders knew exactly what was needed.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Results: Dream Come True</h2>

              <p>
                After months of hard work, the acceptances started rolling in. Anjali was accepted to:
              </p>

              <ul className="space-y-2 my-8 list-disc list-inside font-medium text-gray-800">
                <li>Columbia University (attended) - Full scholarship</li>
                <li>MIT - Full scholarship</li>
                <li>Stanford University - Full scholarship</li>
                <li>University of Pennsylvania - Full scholarship</li>
                <li>Cornell University - Full scholarship</li>
              </ul>

              <p>
                She chose Columbia because of its strong computer science program and proximity to tech companies where she could intern during summers.
              </p>

              <blockquote className="border-l-4 border-emerald-600 pl-6 italic text-xl text-gray-600 my-12">
                "When I got the Columbia acceptance email, I was at the internet cafe. I started crying. The cafe owner asked if something was wrong. I showed him the email and he started crying too. News spread through the village within hours. That day, I realized I wasn't just doing this for myself—I was opening doors for others."
              </blockquote>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Life at Columbia</h2>

              <p>
                Today, Anjali is thriving. She maintains a 3.9 GPA, works as a teaching assistant for introductory computer science courses, and has interned at Google. But what she's most proud of is her impact back home.
              </p>

              <div className="bg-gray-50 rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Giving Back:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• Founded a nonprofit providing free SAT prep to rural Indian students</li>
                  <li>• Mentors 50+ students through the college application process</li>
                  <li>• Donated computers to her village school</li>
                  <li>• Partners with MCB to reach more underserved communities</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Lessons Learned</h2>

              <p>
                When asked what advice she'd give to students in similar situations, Anjali says:
              </p>

              <ol className="space-y-4 my-8 list-decimal list-inside">
                <li className="pl-2">
                  <strong>Your background is an asset, not a liability.</strong> Your unique perspective makes you stand out.
                </li>
                <li className="pl-2">
                  <strong>Use every resource available.</strong> Free tools exist—you just need to find them. Platforms like MCB exist to help.
                </li>
                <li className="pl-2">
                  <strong>Don't let financial concerns stop you.</strong> Many top universities offer full financial aid. Research and apply.
                </li>
                <li className="pl-2">
                  <strong>Ask for help.</strong> People want to support you. Don't be afraid to reach out to teachers, mentors, or online communities.
                </li>
                <li className="pl-2">
                  <strong>Believe in yourself.</strong> If you don't advocate for your dreams, no one else will.
                </li>
              </ol>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Ripple Effect</h2>

              <p>
                Anjali's success has inspired an entire generation in her village. Her younger sister is now preparing for international applications. Five other students from her school applied to US universities last year—three were accepted with full scholarships.
              </p>

              <p>
                Her story proves that talent exists everywhere, but opportunity doesn't. When we provide the right tools, guidance, and support, remarkable things happen.
              </p>

              <blockquote className="border-l-4 border-emerald-600 pl-6 italic text-xl text-gray-600 my-12">
                "I'm grateful to MCB for making the impossible feel possible. But more than that, I'm grateful for the opportunity to show other girls in my village that they can dream big. Geography doesn't determine destiny—determination does."
              </blockquote>

              <p className="text-xl font-medium text-gray-900 mt-12">
                Anjali's journey is just beginning. And thanks to platforms like MCB, she won't be the last student from a rural village to achieve the extraordinary.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Are You Ready to Write Your Story?</h3>
            <p className="text-gray-700 mb-6">
              If Anjali can do it, so can you. MCB is here to help you every step of the way.
            </p>
            <a href="#/download" className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors">
              Start Your Journey
            </a>
          </div>

          {/* Author Section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200"></div>
              <div>
                <div className="font-bold text-gray-900 text-lg">Anjali Sharma</div>
                <div className="text-gray-600">Computer Science Student, Columbia University</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost3;
