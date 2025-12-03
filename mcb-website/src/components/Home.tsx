import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 60;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(0, 122, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle Floating Particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
              <span className="text-xl font-semibold text-gray-900 tracking-tight">MCB</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['Mission', 'Solutions', 'How it Works', 'Blog'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="#download"
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 hover:shadow-xl"
                >
                  Download App
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8 border border-blue-100"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Reimagining Education Access
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.05] text-gray-900"
            >
              Your college applications,
              <br />
              <span className="text-gray-400">simplified.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              We know the pressure. The deadlines, the essays, the uncertainty.
              MCB brings clarity to the chaos, connecting students, institutes, and universities in one seamless ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="#download"
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium text-base transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20"
              >
                Download Desktop App
              </a>

              <a
                href="#mission"
                className="text-gray-600 font-medium text-base hover:text-gray-900 transition-colors flex items-center gap-2 px-6 py-4 rounded-full hover:bg-gray-50"
              >
                Read our mission
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Problem Section */}
      <section id="mission" className="py-24 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900 tracking-tight">
                Bridging the gap in education.
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                For too long, the path to higher education has been fragmented. Students drown in paperwork, institutes struggle to find the right candidates, and universities face administrative bottlenecks.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                MCB exists to solve this triad of problems. We're not just an application portal; we're a unified platform that brings transparency, efficiency, and empathy back to the admissions process.
              </p>

              <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">10k+</div>
                  <div className="text-sm text-gray-500">Students Empowered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                  <div className="text-sm text-gray-500">Partner Institutes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">98%</div>
                  <div className="text-sm text-gray-500">Placement Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-white shadow-2xl shadow-gray-200/50 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -ml-16 -mb-16 opacity-50"></div>

                <div className="relative z-10 h-full flex flex-col justify-center">
                  <blockquote className="text-xl font-medium text-gray-900 italic mb-6">
                    "MCB didn't just help me apply; it helped me understand where I belong. The anxiety of 'what if' was replaced by a clear path forward."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="font-bold text-gray-900">Sarah Jenkins</div>
                      <div className="text-sm text-gray-500">Computer Science, Class of '28</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Ecosystem */}
      <section id="solutions" className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              A unified ecosystem for everyone.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're applying, recruiting, or organizing, MCB provides the tools you need to succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'For Students',
                features: [
                  'Simplified Application Process',
                  'Centralized Document & Deadline Management',
                  'Access to Exclusive Perks & Discounts',
                  'AI-powered Assistance & Guided Onboarding'
                ],
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                color: 'bg-blue-600'
              },
              {
                title: 'For Coaching Institutes',
                features: [
                  'Batch Application Automation',
                  'Dashboard for Student Progress',
                  'Offer Listing & Perk Promotion',
                  'Reduced Manual Work & Data-Driven Insights'
                ],
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                color: 'bg-purple-600'
              },
              {
                title: 'For Exam Organizations',
                features: [
                  'Increased Application Accuracy',
                  'Streamlined Communication',
                  'Analytics & Compliance',
                  'Reduced Support Burden via AI'
                ],
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: 'bg-emerald-600'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all border border-transparent hover:border-gray-100 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-lg shadow-gray-200`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <ul className="space-y-3 mb-8 flex-grow">
                  {item.features.map((feature, j) => (
                    <li key={j} className="flex items-start text-gray-600 text-sm leading-relaxed">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center text-sm font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-32 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 tracking-tight">
              Simple. Powerful. Effective.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A streamlined process designed to take you from aspiration to admission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Create your profile',
                description: 'Tell us about your academic background, interests, and goals. Our AI analyzes your profile to provide personalized recommendations.'
              },
              {
                step: '02',
                title: 'Build your strategy',
                description: 'Get a customized application timeline with schools that match your profile. Track deadlines, requirements, and progress in one place.'
              },
              {
                step: '03',
                title: 'Submit with confidence',
                description: 'Polish your essays, organize documents, and submit applications directly through our platform. We guide you until acceptance.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative"
              >
                <div className="text-7xl font-bold text-gray-200 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / Stories Section */}
      <section id="blog" className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 tracking-tight">Latest from our mission.</h2>
              <p className="text-lg text-gray-600">Stories about education, access, and the future of learning.</p>
            </div>
            <a href="#blog" className="hidden md:flex items-center text-blue-600 font-medium hover:text-blue-700">
              View all stories
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                category: 'Our Cause',
                title: 'Why we started MCB: A personal letter from the founders',
                excerpt: 'Education should be a right, not a privilege. Here is why we are fighting to democratize access to top-tier institutions.',
                date: 'Nov 18, 2024'
              },
              {
                category: 'Mental Health',
                title: 'The silent crisis in college admissions',
                excerpt: 'Stress levels are at an all-time high. How can technology help alleviate the burden rather than add to it?',
                date: 'Nov 15, 2024'
              },
              {
                category: 'Success Stories',
                title: 'From rural village to Ivy League: Anjali\'s journey',
                excerpt: 'How one student used MCB to navigate the complex international application process and secure a full scholarship.',
                date: 'Nov 10, 2024'
              }
            ].map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gray-50 rounded-2xl mb-6 overflow-hidden shadow-sm group-hover:shadow-md transition-all relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${i === 0 ? 'from-blue-50 to-indigo-50' : i === 1 ? 'from-purple-50 to-pink-50' : 'from-emerald-50 to-teal-50'} group-hover:scale-105 transition-transform duration-500`}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-200 font-bold text-6xl opacity-20 select-none">
                    MCB
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium mb-3">
                  <span className="text-blue-600 uppercase tracking-wider">{post.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-32 bg-gray-50 relative z-10 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-gray-900 tracking-tight">
              Ready to transform your future?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Download the MCB desktop app to get started with your college applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <a
                href="#"
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">macOS</h3>
                <p className="text-sm text-gray-500 mb-4">For Mac computers</p>
                <span className="text-blue-600 font-semibold text-sm">Download .dmg</span>
              </a>
              <a
                href="#"
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Windows</h3>
                <p className="text-sm text-gray-500 mb-4">For PC computers</p>
                <span className="text-blue-600 font-semibold text-sm">Download .exe</span>
              </a>
              <a
                href="#"
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
                  <svg className="w-8 h-8 text-gray-600 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.705-.41 2.587 0 2.485 1.04 4.809 2.842 6.357 1.801 1.548 4.282 2.396 6.98 2.396 2.698 0 5.179-.848 6.98-2.396 1.802-1.548 2.842-3.872 2.842-6.357 0-.882-.132-1.747-.41-2.587-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021zm-.002 1.5c.134 0 .266.007.397.018 2.853.226 2.348 3.373 2.398 4.554.09 1.415.403 2.561 1.316 3.846.913 1.285 2.236 3.105 2.88 5.04.241.725.361 1.479.361 2.242 0 2.068-.865 3.995-2.363 5.268-1.498 1.273-3.548 1.982-5.987 1.982s-4.489-.709-5.987-1.982c-1.498-1.273-2.363-3.2-2.363-5.268 0-.763.12-1.517.361-2.242.644-1.935 1.967-3.755 2.88-5.04.913-1.285 1.226-2.431 1.316-3.846.05-1.181-.455-4.328 2.398-4.554.131-.011.263-.018.397-.018z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Linux</h3>
                <p className="text-sm text-gray-500 mb-4">For Linux systems</p>
                <span className="text-blue-600 font-semibold text-sm">Download .AppImage</span>
              </a>
            </div>
            <p className="text-sm text-gray-500">System requirements: macOS 10.13+, Windows 10+, or Linux (64-bit)</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { title: 'Platform', links: ['For Students', 'For Institutes', 'For Universities', 'Pricing'] },
              { title: 'Company', links: ['About Us', 'Our Mission', 'Careers', 'Contact'] },
              { title: 'Resources', links: ['Blog', 'Help Center', 'Community', 'Success Stories'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'] }
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold text-gray-900 mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2024 MCB. Empowering the next generation.
            </div>
            <div className="flex gap-6">
              {/* Social placeholders */}
              <div className="w-5 h-5 bg-gray-300 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;