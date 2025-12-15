import React, { useEffect, useState } from 'react';
import { UserProfile, calculateProfileCompletion, getMissingFields } from '../utils/profileUtils';
import { useNews } from '../hooks/useNews';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [completion, setCompletion] = useState(0);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user data from Flask API
    const fetchUserData = async () => {
      // Check for mock user first
      const mockUserStr = localStorage.getItem('mockUser');
      if (mockUserStr) {
        const userData = JSON.parse(mockUserStr);
        setUser(userData);
        setCompletion(calculateProfileCompletion(userData));
        setMissingFields(getMissingFields(userData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/dashboard`, {
          credentials: 'include', // Include cookies for session
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          // For backend users, we might not have all fields yet, so completion might be low
          // We can try to fetch full profile or just use what we have
          setCompletion(calculateProfileCompletion(data.user));
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const Card = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
    <div
      className={`bg-white rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );

  const NewsWidget = () => {
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
    const { news, loading } = useNews(3, selectedFilters);

    const examFilters = [
      { label: 'All', value: '' },
      { label: 'JEE', value: 'JEE' },
      { label: 'BITSAT', value: 'BITSAT' },
      { label: 'VITEEE', value: 'VITEEE' },
      { label: 'SRMJEEE', value: 'SRMJEEE' },
    ];

    const toggleFilter = (value: string) => {
      if (value === '') {
        setSelectedFilters([]);
      } else {
        setSelectedFilters(prev =>
          prev.includes(value)
            ? prev.filter(f => f !== value)
            : [...prev, value]
        );
      }
    };

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">
            {selectedFilters.length > 0
              ? `Searching ${selectedFilters.join(', ')}...`
              : 'Looking for latest news...'}
          </p>
          <p className="text-xs text-gray-500">Fetching updates from internet</p>
        </div>
      );
    }

    return (
      <>
        {/* Compact Filter Chips */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {examFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => toggleFilter(filter.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter.value === '' && selectedFilters.length === 0
                  ? 'bg-blue-600 text-white'
                  : selectedFilters.includes(filter.value)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {news.map((item, index) => (
            <Card
              key={index}
              className="!p-0 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => window.open(item.link, '_blank')}
            >
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${item.source === 'Google News' ? 'bg-blue-50 text-blue-600' :
                    item.source === 'The Hindu' ? 'bg-green-50 text-green-600' :
                      item.source === 'Indian Express' ? 'bg-purple-50 text-purple-600' :
                        item.source === 'Livemint' ? 'bg-orange-50 text-orange-600' :
                          'bg-gray-50 text-gray-600'
                    }`}>
                    {item.source}
                  </span>
                  <span className="text-xs text-gray-400">{new Date(item.pubDate).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {item.description}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  Read Article
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Good Morning, {user.name?.split(' ')[0] || 'Student'}
          </h1>
          <p className="text-lg text-gray-500">Here's your daily briefing.</p>
        </div>
        <div className="hidden md:block">
          {user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Profile Completion Alert */}
      {completion < 100 && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-white/20"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - completion / 100)}
                    className="text-white transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
                  {completion}%
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Complete your profile</h3>
                <p className="text-blue-100 text-sm">
                  {missingFields.length > 0
                    ? `Add your ${missingFields[0].toLowerCase()} to unlock personalized recommendations.`
                    : "You're almost there! Finish setting up your account."}
                </p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/account'}
              className="px-6 py-2.5 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap"
            >
              Complete Profile
            </button>
          </div>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Stats & News (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1" onClick={() => window.location.href = '/applications'}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  +3 New
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Active Applications</h3>
                <div className="text-3xl font-bold text-gray-900">12</div>
              </div>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full w-3/4"></div>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1" onClick={() => window.location.href = '/deadlines'}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  Urgent
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Upcoming Deadlines</h3>
                <div className="text-3xl font-bold text-gray-900">5</div>
              </div>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-red-500 h-full rounded-full w-[90%]"></div>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1" onClick={() => window.location.href = '/documents'}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  80% Ready
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">Documents</h3>
                <div className="text-3xl font-bold text-gray-900">18/22</div>
              </div>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full w-[80%]"></div>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1" onClick={() => window.location.href = '/deadlines'}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  15 Days
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500">SAT Exam</h3>
                <div className="text-3xl font-bold text-gray-900">Oct 15</div>
              </div>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full w-[65%]"></div>
              </div>
            </Card>
          </div>

          {/* News Feed */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
              <button
                onClick={() => window.location.href = '/news'}
                className="text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <NewsWidget />
          </div>
        </div>

        {/* Right Column: Quick Actions & Timeline (1/3 width) */}
        <div className="space-y-8">

          {/* Quick Actions */}
          <Card className="!bg-[#1c1c1e] text-white">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => window.location.href = '/applications'}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm">New Application</span>
              </button>
              <button
                onClick={() => window.location.href = '/mentor'}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm">Career Guide</span>
              </button>
              <button
                onClick={() => window.location.href = '/schools'}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="font-semibold text-sm">Explore Schools</span>
              </button>
              <button
                onClick={() => window.location.href = '/deadlines'}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-colors group"
              >
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm">Check Deadlines</span>
              </button>
            </div>
          </Card>

          {/* Up Next Timeline */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Up Next</h2>
            <Card className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 text-center">
                  <div className="text-xs font-bold text-red-500 uppercase tracking-wide">OCT</div>
                  <div className="text-2xl font-bold text-gray-900">15</div>
                </div>
                <div className="flex-1 pb-6 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1">Stanford University</h4>
                  <p className="text-sm text-gray-500 mb-3">Early Action Deadline</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-md">In Progress</span>
                    <span className="text-xs text-gray-400">3 days left</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 text-center">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">NOV</div>
                  <div className="text-2xl font-bold text-gray-900">01</div>
                </div>
                <div className="flex-1 pb-6 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1">MIT</h4>
                  <p className="text-sm text-gray-500 mb-3">Early Action Deadline</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">Not Started</span>
                    <span className="text-xs text-gray-400">2 weeks left</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Deadline
              </button>
            </Card>
          </div>
        </div >
      </div >
    </div >
  );
};

export default Dashboard;