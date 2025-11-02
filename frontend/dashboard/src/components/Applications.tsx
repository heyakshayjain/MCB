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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
              <p className="text-gray-600">Track your college applications and entrance exam registrations</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('applied')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applied'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applied Universities ({appliedApplications.length})
            </button>
            <button
              onClick={() => setActiveTab('available')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'available'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Available Exams ({availableExams.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'applied' ? (
        <div className="space-y-6">
          {/* Applied Universities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Applied Universities</h3>

              {appliedApplications.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by applying to your dream universities.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {appliedApplications.map((app) => (
                    <div key={app.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                        <img src={app.logo} alt={app.name} className="w-12 h-12 rounded-lg object-cover" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                          app.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{app.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{app.type}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{app.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-teal-600 h-2 rounded-full" style={{width: `${app.progress}%`}}></div>
                        </div>
                        <p className="text-xs text-gray-500">Deadline: {new Date(app.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Draft Applications */}
          {draftApplications.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Draft Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {draftApplications.map((app) => (
                    <div key={app.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                        <img src={app.logo} alt={app.name} className="w-12 h-12 rounded-lg object-cover opacity-60" />
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Draft
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{app.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{app.type}</p>
                      <p className="text-xs text-gray-500">Deadline: {new Date(app.deadline).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Available Engineering Entrance Exams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableExams.map((exam) => (
                <div key={exam.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{exam.name}</h4>
                        <p className="text-sm text-gray-600">{exam.type}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {exam.seats} Seats
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{exam.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Deadline:</span> {new Date(exam.deadline).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => {
                        // Store the exam URL in sessionStorage for the assistant
                        sessionStorage.setItem('selectedExamUrl', exam.url || 'https://jeemain.nta.nic.in/');
                        sessionStorage.setItem('selectedExamName', exam.name);
                        window.location.href = '/jee-application';
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;