import React, { useEffect, useState } from 'react';

interface User {
  email: string;
  name?: string;
  picture?: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from Flask API
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/dashboard`, {
          credentials: 'include', // Include cookies for session
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // If not authenticated, redirect to login
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name || user.email.split('@')[0]}! 👋
              </h1>
              <p className="text-gray-600">Here's what's happening with your college applications today.</p>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            </div>
            <div className="hidden md:block">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-teal-200"
                />
              ) : (
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Applications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              +25%
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Applications</h3>
          <div className="text-3xl font-bold text-teal-600 mb-1">12</div>
          <p className="text-sm text-gray-600 mb-4">3 new this week</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-teal-600 h-2 rounded-full" style={{width: '75%'}}></div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              Urgent
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Deadlines</h3>
          <div className="text-3xl font-bold text-red-600 mb-1">5</div>
          <p className="text-sm text-gray-600 mb-4">Next: Stanford EA (2 days)</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-600 h-2 rounded-full" style={{width: '90%'}}></div>
          </div>
        </div>

        {/* Documents Ready */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              <span>80%</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Documents Ready</h3>
          <div className="text-3xl font-bold text-green-600 mb-1">80%</div>
          <p className="text-sm text-gray-600 mb-4">2 documents pending review</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{width: '80%'}}></div>
          </div>
        </div>

        {/* Days Until Exam */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              Days
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Days Until SAT</h3>
          <div className="text-3xl font-bold text-orange-600 mb-1">15</div>
          <p className="text-sm text-gray-600 mb-4">Study plan: On track</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{width: '65%'}}></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* News Feed */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Latest Updates</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Filter:</span>
                  <select className="px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>All Categories</option>
                    <option>College News</option>
                    <option>Deadlines</option>
                    <option>Application Tips</option>
                    <option>Scholarships</option>
                  </select>
                </div>
              </div>

              {/* News Items */}
              <div className="space-y-4">
                {/* News Item 1 */}
                <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
                  <div className="flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=80&h=80&fit=crop" alt="MIT News" className="w-16 h-16 rounded-lg object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">College News</span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">MIT Announces New Application Requirements for 2026</h4>
                    <p className="text-sm text-gray-600 mb-2">Changes include optional standardized testing and expanded essay options...</p>
                    <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* News Item 2 */}
                <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100">
                  <div className="flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=80&h=80&fit=crop" alt="Scholarship News" className="w-16 h-16 rounded-lg object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Scholarship</span>
                      <span className="text-xs text-gray-500">5 hours ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">New Merit Scholarship Program Announced</h4>
                    <p className="text-sm text-gray-600 mb-2">Full-ride scholarships available for STEM students with exceptional achievements in research and innovation...</p>
                    <a href="#" className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">View All Updates</a>
                <a href="#" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Subscribe to Alerts</a>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Upcoming Deadlines</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <select className="px-3 py-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option>This Week</option>
                    <option>All Deadlines</option>
                    <option>This Month</option>
                    <option>Early Action</option>
                    <option>Regular Decision</option>
                    <option>Test Dates</option>
                  </select>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="space-y-4">
                {/* Urgent Deadline */}
                <div className="flex gap-4 p-4 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Early Action</span>
                      <span className="text-sm text-gray-500">Oct 15 (3 days)</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Stanford University</h4>
                    <p className="text-sm text-gray-600 mb-3">Application submission deadline</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full gap-1 flex items-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        In Progress
                      </span>
                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                      <span className="text-xs text-gray-500">80% Complete</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <a href="#" className="text-gray-600 hover:text-gray-800 text-sm font-medium">View All</a>
                <a href="#" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Deadline
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;