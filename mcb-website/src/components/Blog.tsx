import React from 'react';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 'blog-post-1',
      category: 'Our Cause',
      title: 'Why we started MCB: A personal letter from the founders',
      excerpt: 'Education should be a right, not a privilege. Here is why we are fighting to democratize access to top-tier institutions.',
      date: 'Nov 18, 2024',
      readTime: '8 min read',
      gradient: 'from-blue-50 to-indigo-50',
      categoryColor: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'blog-post-2',
      category: 'Mental Health',
      title: 'The silent crisis in college admissions',
      excerpt: 'Stress levels are at an all-time high. How can technology help alleviate the burden rather than add to it?',
      date: 'Nov 15, 2024',
      readTime: '6 min read',
      gradient: 'from-purple-50 to-pink-50',
      categoryColor: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'blog-post-3',
      category: 'Success Stories',
      title: 'From rural village to Ivy League: Anjali\'s journey',
      excerpt: 'How one student used MCB to navigate the complex international application process and secure a full scholarship.',
      date: 'Nov 10, 2024',
      readTime: '10 min read',
      gradient: 'from-emerald-50 to-teal-50',
      categoryColor: 'bg-emerald-50 text-emerald-600'
    }
  ];

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

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 text-gray-900 tracking-tight">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stories about education, access, and the future of learning.
            </p>
          </div>

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-20"
          >
            <a href={`#/${blogPosts[0].id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl p-8 lg:p-12 hover:shadow-xl transition-shadow">
                <div className={`aspect-[4/3] bg-gradient-to-br ${blogPosts[0].gradient} rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                  <div className="text-8xl font-bold text-blue-200/30 select-none">MCB</div>
                </div>
                <div>
                  <div className="flex items-center gap-3 text-sm mb-4">
                    <span className={`px-3 py-1 ${blogPosts[0].categoryColor} rounded-full font-medium uppercase tracking-wider`}>
                      {blogPosts[0].category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{blogPosts[0].date}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{blogPosts[0].readTime}</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:gap-3 gap-2 transition-all">
                    Read article
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </motion.div>

          {/* All Posts Grid */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (i + 1), duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <a href={`#/${post.id}`}>
                    <div className="aspect-[4/3] bg-gray-50 rounded-2xl mb-6 overflow-hidden shadow-sm group-hover:shadow-md transition-all relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} group-hover:scale-105 transition-transform duration-500`}></div>
                      <div className="absolute inset-0 flex items-center justify-center text-gray-200 font-bold text-6xl opacity-20 select-none">
                        MCB
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium mb-3">
                      <span className={`px-2 py-1 ${post.categoryColor} rounded-full uppercase tracking-wider`}>
                        {post.category}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </a>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest stories about education access, student success, and platform updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
