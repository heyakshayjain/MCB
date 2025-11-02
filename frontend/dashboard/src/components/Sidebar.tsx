import React, { useEffect, useState } from 'react';

interface User {
  email: string;
  name?: string;
  picture?: string;
  premium?: boolean;
}

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data from Flask API
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/dashboard', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col z-10 overflow-hidden">
      {/* User Profile Section */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-6 text-white">
        <div className="flex items-center space-x-3">
          {user?.picture ? (
            <img
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              src={user.picture}
              alt="Profile"
            />
          ) : (
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="font-semibold truncate">{user?.name || user?.email.split('@')[0] || 'User'}</div>
            <div className="text-sm text-teal-100 truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <a href="/dashboard" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/>
              </svg>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/applications" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>My Applications</span>
            </a>
          </li>
          <li>
            <a href="/schools" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <span>Schools</span>
            </a>
          </li>
          <li>
            <a href="/deadlines" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Deadlines</span>
            </a>
          </li>
          <li className="pt-4">
            <div className="border-t border-gray-200"></div>
          </li>
          <li>
            <a href="/mentor" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z"/>
              </svg>
              <span>AI Mentor</span>
            </a>
          </li>
          <li className="pt-4">
            <div className="border-t border-gray-200"></div>
          </li>
          <li>
            <a href="/jee-guide" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>JEE Application Guide</span>
            </a>
          </li>
          <li>
            <a href="/application-assistant" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Application Assistant</span>
            </a>
          </li>
          <li className="pt-4">
            <div className="border-t border-gray-200"></div>
          </li>
          <li>
            <a href="/premium-browser" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Premium Browser</span>
              <span className="ml-2 text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded">TEST MODE</span>
            </a>
          </li>
          <li>
            <a href="/account" className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span>Account</span>
            </a>
          </li>
          <li className="pt-4">
            <div className="border-t border-gray-200"></div>
          </li>
          <li>
            <button
              onClick={async () => {
                try {
                  await fetch('http://localhost:8000/logout', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                  });
                  // Redirect to home page after logout
                  window.location.href = '/';
                } catch (error) {
                  console.error('Logout error:', error);
                  // Fallback: redirect anyway
                  window.location.href = '/';
                }
              }}
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 ml-3 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;