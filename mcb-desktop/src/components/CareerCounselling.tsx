import React, { useState } from 'react';
import { BookOpen, Code, Plane, Shield, Briefcase, GraduationCap, Rocket, Users, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';

interface CareerPath {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
  avgSalary: string;
  topColleges: string[];
  entranceExams: string[];
  skills: string[];
  roadmap: {
    phase: string;
    duration: string;
    activities: string[];
  }[];
  jobRoles: string[];
}

const CareerCounselling: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: ''
  });

  const careerPaths: CareerPath[] = [
    {
      id: 'iit-engineer',
      title: 'IIT Engineer',
      icon: <GraduationCap className="w-8 h-8" />,
      description: 'Premier engineering education from Indian Institutes of Technology',
      duration: '4 years (B.Tech)',
      avgSalary: '₹15-40 LPA',
      topColleges: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur'],
      entranceExams: ['JEE Main', 'JEE Advanced'],
      skills: ['Problem Solving', 'Mathematics', 'Physics', 'Programming', 'Analytical Thinking'],
      roadmap: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          activities: ['Focus on JEE syllabus', 'Join coaching/online courses', 'Solve previous year papers', 'Mock tests weekly', 'Board exam preparation']
        },
        {
          phase: 'JEE Preparation',
          duration: '6 months intensive',
          activities: ['Daily practice 4-6 hours', 'Attempt 2-3 mock tests per week', 'Revision of weak topics', 'Time management practice', 'Stay physically and mentally fit']
        },
        {
          phase: 'B.Tech (IIT)',
          duration: '4 years',
          activities: ['Strong academics (CGPA > 8)', 'Internships from 2nd year', 'Technical projects', 'Competitive programming', 'Open source contributions', 'Placement preparation']
        },
        {
          phase: 'Career Launch',
          duration: 'Ongoing',
          activities: ['Join top tech companies', 'Consider higher studies (MS/MBA)', 'Build professional network', 'Continuous learning', 'Explore entrepreneurship']
        }
      ],
      jobRoles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Research Scientist', 'Entrepreneur']
    },
    {
      id: 'nit-engineer',
      title: 'NIT/IIIT Engineer',
      icon: <Code className="w-8 h-8" />,
      description: 'Quality engineering education from National/International Institutes of Technology',
      duration: '4 years (B.Tech)',
      avgSalary: '₹8-25 LPA',
      topColleges: ['NIT Trichy', 'NIT Surathkal', 'NIT Warangal', 'IIIT Hyderabad', 'IIIT Bangalore'],
      entranceExams: ['JEE Main'],
      skills: ['Programming', 'Data Structures', 'Algorithms', 'System Design', 'Mathematics'],
      roadmap: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          activities: ['JEE Main focused preparation', 'NCERT mastery', 'Coaching or self-study', 'Regular mock tests', 'Board preparation (75% required)']
        },
        {
          phase: 'JEE Main Prep',
          duration: '1 year intensive',
          activities: ['Practice daily', 'Mock tests twice weekly', 'Weak area focus', 'Previous year analysis', 'Time management']
        },
        {
          phase: 'B.Tech (NIT/IIIT)',
          duration: '4 years',
          activities: ['Maintain good CGPA', 'Learn in-demand technologies', 'Build projects portfolio', 'Competitive coding', 'Internships', 'Certifications']
        },
        {
          phase: 'Career Growth',
          duration: 'Ongoing',
          activities: ['Join product/service companies', 'Specialize (AI/ML/Web/Mobile)', 'Build professional network', 'Consider MS abroad', 'Upskill regularly']
        }
      ],
      jobRoles: ['Software Developer', 'Full Stack Engineer', 'DevOps Engineer', 'ML Engineer', 'Systems Architect']
    },
    {
      id: 'software-engineer',
      title: 'Software Engineer (Non-IIT/NIT)',
      icon: <Code className="w-8 h-8" />,
      description: 'Software development career from private engineering colleges',
      duration: '4 years (B.Tech/B.E.)',
      avgSalary: '₹4-15 LPA',
      topColleges: ['BITS Pilani', 'VIT Vellore', 'Manipal', 'SRM', 'KIIT', 'DTU', 'PES'],
      entranceExams: ['JEE Main', 'BITSAT', 'VITEEE', 'State CETs', 'University entrances'],
      skills: ['Programming (Java/Python/C++)', 'Web Development', 'Mobile Development', 'DSA', 'Git/GitHub'],
      roadmap: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          activities: ['Focus on Board + entrance exams', 'Learn basic programming', 'Explore different technologies', 'Project-based learning', 'Build GitHub portfolio']
        },
        {
          phase: 'College (1-2 Year)',
          duration: '2 years',
          activities: ['Strong foundation in programming', 'Learn Data Structures', 'Algorithms practice', 'Web development basics', 'First internship']
        },
        {
          phase: 'College (3-4 Year)',
          duration: '2 years',
          activities: ['Advanced projects', 'Specialize in domain', 'Multiple internships', 'Competitive coding', 'Open source', 'Placement prep']
        },
        {
          phase: 'Career Path',
          duration: 'Ongoing',
          activities: ['Join startups/companies', 'Build expertise', 'Consider certifications', 'Network actively', 'Keep learning new tech']
        }
      ],
      jobRoles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile App Developer', 'QA Engineer']
    },
    {
      id: 'ai-ml-engineer',
      title: 'AI/ML Engineer',
      icon: <Rocket className="w-8 h-8" />,
      description: 'Artificial Intelligence and Machine Learning specialist',
      duration: '4 years (B.Tech) + Specialization',
      avgSalary: '₹10-50 LPA',
      topColleges: ['IITs', 'IIIT Hyderabad', 'BITS Pilani', 'IISc Bangalore', 'Top NITs'],
      entranceExams: ['JEE Main/Advanced', 'BITSAT', 'GATE (for M.Tech)'],
      skills: ['Python', 'Mathematics', 'Statistics', 'Deep Learning', 'Neural Networks', 'Data Analysis'],
      roadmap: [
        {
          phase: 'Foundation (Class 11-12)',
          duration: '2 years',
          activities: ['Strong in Mathematics', 'Learn Python basics', 'Read AI/ML blogs', 'Online courses (Coursera/edX)', 'Prepare for entrance exams']
        },
        {
          phase: 'Undergraduate',
          duration: '4 years',
          activities: ['B.Tech in CSE/AI/DS', 'Online courses (Andrew Ng ML)', 'Mathematics focus', 'Build ML projects', 'Kaggle competitions', 'Research papers']
        },
        {
          phase: 'Specialization',
          duration: '1-2 years',
          activities: ['M.Tech in AI/ML (optional)', 'Deep learning specialization', 'Work on real projects', 'Publish papers', 'Internships in AI labs']
        },
        {
          phase: 'Career',
          duration: 'Ongoing',
          activities: ['Join AI research labs', 'Work on cutting-edge problems', 'Contribute to open source', 'Stay updated with latest research', 'Consider PhD']
        }
      ],
      jobRoles: ['ML Engineer', 'Data Scientist', 'AI Research Scientist', 'Computer Vision Engineer', 'NLP Engineer']
    },
    {
      id: 'commercial-pilot',
      title: 'Commercial Pilot',
      icon: <Plane className="w-8 h-8" />,
      description: 'Fly aircraft for airlines, charter services, or cargo operations',
      duration: '2-3 years (Training)',
      avgSalary: '₹2-10 LPA (starting), ₹50L+ (experienced)',
      topColleges: ['Indigo Cadet Program', 'CAE', 'Bombay Flying Club', 'National Flying Training Institute'],
      entranceExams: ['DGCA Class 2 Medical', 'Airline Pilot Aptitude Tests'],
      skills: ['Physics understanding', 'Quick decision making', 'Spatial awareness', 'Communication', 'Stress management'],
      roadmap: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          activities: ['Pass 12th with Physics & Maths', 'Minimum 50% marks', 'DGCA Medical examination', 'Start saving for training', 'Learn aviation basics']
        },
        {
          phase: 'Training',
          duration: '18-24 months',
          activities: ['SPL (Student Pilot License)', 'PPL (Private Pilot License)', 'CPL (Commercial Pilot License)', '200+ flying hours', 'Ground school', 'Pass DGCA exams']
        },
        {
          phase: 'Type Rating',
          duration: '2-3 months',
          activities: ['Get aircraft type rating', 'Simulator training', 'Airline specific training', 'Join as First Officer', 'Build flying hours']
        },
        {
          phase: 'Career Growth',
          duration: '10-15 years',
          activities: ['First Officer (1500+ hours)', 'Become Captain (5000+ hours)', 'Training Captain', 'Check Pilot', 'Consider international airlines']
        }
      ],
      jobRoles: ['First Officer', 'Captain', 'Flight Instructor', 'Charter Pilot', 'Cargo Pilot']
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security Expert',
      icon: <Shield className="w-8 h-8" />,
      description: 'Protect systems, networks, and data from cyber threats',
      duration: '4 years (B.Tech) + Certifications',
      avgSalary: '₹6-30 LPA',
      topColleges: ['IITs', 'NITs', 'IIIT Hyderabad', 'Amity', 'Any CS/IT college'],
      entranceExams: ['JEE Main', 'State CETs', 'University entrances'],
      skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Linux', 'Programming', 'Forensics'],
      roadmap: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          activities: ['Pass 12th with PCM', 'Learn networking basics', 'Basic Linux commands', 'Try HackTheBox/TryHackMe', 'Prepare for entrance exams']
        },
        {
          phase: 'Undergraduate',
          duration: '4 years',
          activities: ['B.Tech in CSE/IT/Cyber Security', 'Learn ethical hacking', 'Networking deep dive', 'Programming skills', 'Bug bounty programs', 'CTF competitions']
        },
        {
          phase: 'Certifications',
          duration: '1-2 years',
          activities: ['CEH (Certified Ethical Hacker)', 'CompTIA Security+', 'OSCP', 'CISSP', 'Practical experience', 'Internships']
        },
        {
          phase: 'Career',
          duration: 'Ongoing',
          activities: ['Security Analyst role', 'Penetration testing', 'Security audits', 'SOC operations', 'Specialize (Cloud/Network/App security)', 'Continuous learning']
        }
      ],
      jobRoles: ['Security Analyst', 'Penetration Tester', 'Security Consultant', 'SOC Analyst', 'CISO']
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      icon: <Briefcase className="w-8 h-8" />,
      description: 'Extract insights from data to drive business decisions',
      duration: '4 years (B.Tech) + Advanced courses',
      avgSalary: '₹8-35 LPA',
      topColleges: ['IITs', 'ISI Kolkata', 'CMI', 'IIIT Hyderabad', 'BITS Pilani'],
      entranceExams: ['JEE Main/Advanced', 'BITSAT', 'ISI entrance'],
      skills: ['Statistics', 'Python/R', 'SQL', 'Machine Learning', 'Data Visualization', 'Business Acumen'],
      roadmap: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          activities: ['Strong in Mathematics', 'Learn basic statistics', 'Introduction to Python', 'Online courses', 'Entrance exam preparation']
        },
        {
          phase: 'Undergraduate',
          duration: '4 years',
          activities: ['B.Tech/B.Sc in relevant field', 'Statistics and probability', 'Programming in Python/R', 'SQL mastery', 'ML courses', 'Data analysis projects']
        },
        {
          phase: 'Skill Building',
          duration: '1-2 years',
          activities: ['Advanced ML courses', 'Kaggle competitions', 'Real-world projects', 'Internships', 'Domain knowledge', 'Portfolio building']
        },
        {
          phase: 'Career Path',
          duration: 'Ongoing',
          activities: ['Junior Data Scientist', 'Senior Data Scientist', 'Lead Data Scientist', 'Specialize in domain', 'Consider management or technical track']
        }
      ],
      jobRoles: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'Business Analyst', 'Research Scientist']
    },
    {
      id: 'entrepreneur',
      title: 'Tech Entrepreneur',
      icon: <Rocket className="w-8 h-8" />,
      description: 'Build and scale your own technology startup',
      duration: 'Flexible (4+ years to scale)',
      avgSalary: 'Variable (₹0 to ₹100Cr+)',
      topColleges: ['IITs', 'IIMs (MBA)', 'BITS Pilani', 'Any engineering college', 'Self-learning'],
      entranceExams: ['JEE (for technical foundation)', 'CAT (for MBA - optional)'],
      skills: ['Problem Solving', 'Leadership', 'Product Development', 'Marketing', 'Finance', 'Networking'],
      roadmap: [
        {
          phase: 'Foundation (Class 11-12)',
          duration: '2 years',
          activities: ['Engineering entrance prep', 'Learn to code', 'Read startup stories', 'Identify problems around you', 'Build small projects']
        },
        {
          phase: 'College Years',
          duration: '4 years',
          activities: ['B.Tech degree', 'Build multiple projects', 'Learn business basics', 'Join startup/entrepreneurship clubs', 'Network with founders', 'Participate in hackathons']
        },
        {
          phase: 'Startup Launch',
          duration: '1-2 years',
          activities: ['Identify real problem', 'Build MVP', 'Get first customers', 'Pitch to investors', 'Build founding team', 'Apply to accelerators']
        },
        {
          phase: 'Growth & Scale',
          duration: '3-5 years',
          activities: ['Raise funding', 'Hire team', 'Product-market fit', 'Scale operations', 'Expand to new markets', 'Consider exit or IPO']
        }
      ],
      jobRoles: ['Founder/Co-founder', 'CEO', 'CTO', 'Product Manager', 'Angel Investor']
    }
  ];

  const selectedCareerPath = careerPaths.find(c => c.id === selectedCareer);

  const handlePremiumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, send to backend
    alert('Thank you! Our counsellor will contact you within 24 hours.');
    setShowPremiumModal(false);
    setFormData({ name: '', email: '', phone: '', preferredDate: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Career Counselling</h1>
              <p className="text-gray-600">Explore career paths and roadmaps for Science & Maths students</p>
            </div>
            <div className="bg-blue-500 rounded-2xl p-4 shadow-sm">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Premium Counselling CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Get Personalized Career Counselling</h2>
              <p className="text-blue-100 mb-4">Connect with expert counsellors for one-on-one guidance tailored to your goals</p>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-md"
              >
                Request Premium Support
              </button>
            </div>
            <Users className="w-24 h-24 opacity-20" />
          </div>
        </div>

        {/* Career Paths Grid */}
        {!selectedCareer ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Career Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((career) => (
                <div
                  key={career.id}
                  onClick={() => setSelectedCareer(career.id)}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="bg-blue-50 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-4 text-blue-600">
                    {career.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{career.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{career.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-semibold text-gray-900">{career.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Avg Salary:</span>
                      <span className="font-semibold text-blue-600">{career.avgSalary}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Detailed Career View */
          <div>
            <button
              onClick={() => setSelectedCareer(null)}
              className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              ← Back to all careers
            </button>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
              {/* Career Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center">
                  <div className="bg-blue-50 rounded-2xl p-4 mr-4 text-blue-600">
                    {selectedCareerPath?.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCareerPath?.title}</h2>
                    <p className="text-gray-600">{selectedCareerPath?.description}</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Duration</div>
                  <div className="text-xl font-bold text-gray-900">{selectedCareerPath?.duration}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Average Salary</div>
                  <div className="text-xl font-bold text-blue-600">{selectedCareerPath?.avgSalary}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Job Opportunities</div>
                  <div className="text-xl font-bold text-gray-900">High Demand</div>
                </div>
              </div>

              {/* Top Colleges */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Colleges</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareerPath?.topColleges.map((college, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
                      {college}
                    </span>
                  ))}
                </div>
              </div>

              {/* Entrance Exams */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Entrance Exams</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareerPath?.entranceExams.map((exam, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              {/* Required Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Essential Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCareerPath?.skills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Roadmap */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Roadmap</h3>
                <div className="space-y-6">
                  {selectedCareerPath?.roadmap.map((phase, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-6 pb-6 relative">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-gray-900">{phase.phase}</h4>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {phase.duration}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {phase.activities.map((activity, actIdx) => (
                            <li key={actIdx} className="flex items-start text-gray-700">
                              <span className="text-blue-500 mr-2">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Roles */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Possible Job Roles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCareerPath?.jobRoles.map((role, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4 flex items-center">
                      <Briefcase className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="font-medium text-gray-900">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Premium Modal */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Request Premium Counselling</h3>
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Get personalized guidance from our expert career counsellors. We'll help you choose the right path,
                colleges, and create a customized action plan.
              </p>

              <form onSubmit={handlePremiumSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date for Counselling</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your interests, goals, or any specific questions..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowPremiumModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerCounselling;
