import React, { useEffect, useState } from 'react';

interface Application {
  id: number;
  name: string;
  type: string;
  status: string;
  deadline: string;
  progress: number;
  docs_done: number;
  docs_total: number;
  logo: string;
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'applied' | 'available'>('applied');

  useEffect(() => {
    const fetchApplications = async () => {
      // Check for mock user first
      const mockUserStr = localStorage.getItem('mockUser');
      if (mockUserStr) {
        // Set mock applications data
        setApplications([
          {
            id: 1,
            name: 'Stanford University',
            type: 'University',
            status: 'In Progress',
            deadline: '2025-01-01',
            progress: 60,
            docs_done: 3,
            docs_total: 5,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_Cardinal_logo.svg'
          },
          {
            id: 2,
            name: 'MIT',
            type: 'University',
            status: 'Submitted',
            deadline: '2024-12-15',
            progress: 100,
            docs_done: 5,
            docs_total: 5,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg'
          }
        ]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/applications`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setApplications(data.applications);
        } else {
          // Redirect to login if not authenticated
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Mock data for JEE engineering entrance exams and universities
  const availableExams = [
    {
      id: 101,
      name: 'JEE Main 2025',
      type: 'Engineering Entrance',
      deadline: '2025-01-25',
      description: 'Joint Entrance Examination Main for NITs, IIITs and CFTIs',
      seats: '25,000+',
      logo: '/static/images/universities/jee-main.png'
    },
    {
      id: 102,
      name: 'JEE Advanced 2025',
      type: 'Engineering Entrance',
      deadline: '2025-05-20',
      description: 'For admission to IITs and ISM Dhanbad',
      seats: '16,000+',
      logo: '/static/images/universities/jee-advanced.png'
    },
    {
      id: 103,
      name: 'BITSAT 2025',
      type: 'Engineering Entrance',
      deadline: '2025-05-15',
      description: 'Birla Institute of Technology and Science Admission Test',
      seats: '2,000+',
      logo: '/static/images/universities/bits.png',
      url: 'https://www.bitsadmission.com/'
    },
    {
      id: 104,
      name: 'VITEEE 2025',
      type: 'Engineering Entrance',
      deadline: '2025-04-30',
      description: 'Vellore Institute of Technology Engineering Entrance Exam',
      seats: '5,000+',
      logo: '/static/images/universities/vit.png'
    },
    {
      id: 105,
      name: 'SRMJEEE 2025',
      type: 'Engineering Entrance',
      deadline: '2025-04-15',
      description: 'SRM Institute of Science and Technology Joint Engineering Entrance Exam',
      seats: '8,000+',
      logo: '/static/images/universities/srm.png'
    }
  ];

  const appliedApplications = applications.filter(app => app.status !== 'Draft');
  const draftApplications = applications.filter(app => app.status === 'Draft');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">My Applications</h1>
              <p className="text-gray-500 font-medium">Track your college applications and entrance exam registrations</p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="inline-flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-sm">
          <button
            onClick={() => setActiveTab('applied')}
            className={`py-2.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'applied'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
          >
            Applied Universities ({appliedApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'available'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
          >
            Available Exams ({availableExams.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'applied' ? (
        <div className="space-y-8">
          {/* Applied Universities */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Applied Universities</h3>

            {appliedApplications.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No applications yet</h3>
                <p className="mt-1 text-gray-500">Get started by applying to your dream universities.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appliedApplications.map((app) => (
                  <div key={app.id} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <img src={app.logo} alt={app.name} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === 'Accepted' ? 'bg-green-50 text-green-600' :
                        app.status === 'Submitted' ? 'bg-blue-50 text-blue-600' :
                          'bg-orange-50 text-orange-600'
                        }`}>
                        {app.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{app.name}</h4>
                    <p className="text-sm text-gray-500 mb-4 font-medium">{app.type}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-gray-900">{app.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${app.progress}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-400 font-medium pt-1">Deadline: {new Date(app.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Draft Applications */}
          {draftApplications.length > 0 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Draft Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftApplications.map((app) => (
                  <div key={app.id} className="bg-gray-50/50 border border-gray-200/60 rounded-2xl p-6 hover:bg-white hover:shadow-sm transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <img src={app.logo} alt={app.name} className="w-14 h-14 rounded-xl object-cover opacity-60 grayscale" />
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                        Draft
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{app.name}</h4>
                    <p className="text-sm text-gray-500 mb-3 font-medium">{app.type}</p>
                    <p className="text-xs text-gray-400 font-medium">Deadline: {new Date(app.deadline).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Available Engineering Entrance Exams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableExams.map((exam) => (
              <div key={exam.id} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{exam.name}</h4>
                      <p className="text-sm text-gray-500 font-medium">{exam.type}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                    {exam.seats} Seats
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{exam.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="text-xs font-medium text-gray-500">
                    <span className="text-gray-400">Deadline:</span> {new Date(exam.deadline).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => {
                      // Store the exam URL in sessionStorage for the assistant
                      sessionStorage.setItem('selectedExamUrl', exam.url || 'https://jeemain.nta.nic.in/');
                      sessionStorage.setItem('selectedExamName', exam.name);
                      window.location.href = '/jee-application';
                    }}
                    className="bg-gray-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;