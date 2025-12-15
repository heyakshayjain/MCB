import React, { useState, useEffect } from 'react';

interface Deadline {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'exam' | 'application' | 'document' | 'interview';
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'overdue' | 'completed';
}

const Deadlines: React.FC = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'overdue' | 'completed'>('all');

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockDeadlines: Deadline[] = [
      {
        id: 1,
        title: 'JEE Main 2025 Registration',
        description: 'Complete online registration for JEE Main January session',
        date: '2025-01-10',
        type: 'exam',
        priority: 'high',
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'Stanford Application Deadline',
        description: 'Regular decision application for Stanford University',
        date: '2025-01-05',
        type: 'application',
        priority: 'high',
        status: 'upcoming'
      },
      {
        id: 3,
        title: 'Submit Transcripts',
        description: 'Send official transcripts to MIT admissions',
        date: '2024-12-20',
        type: 'document',
        priority: 'medium',
        status: 'overdue'
      },
      {
        id: 4,
        title: 'JEE Advanced 2025',
        description: 'JEE Advanced examination date',
        date: '2025-05-18',
        type: 'exam',
        priority: 'high',
        status: 'upcoming'
      },
      {
        id: 5,
        title: 'Harvard Interview',
        description: 'Virtual interview with Harvard admissions',
        date: '2025-02-15',
        type: 'interview',
        priority: 'high',
        status: 'upcoming'
      },
      {
        id: 6,
        title: 'BITSAT 2025 Registration',
        description: 'Register for BITSAT entrance examination',
        date: '2025-04-01',
        type: 'exam',
        priority: 'medium',
        status: 'upcoming'
      }
    ];
    setDeadlines(mockDeadlines);
  }, []);

  const filteredDeadlines = deadlines.filter(deadline => {
    if (filter === 'all') return true;
    return deadline.status === filter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'application':
        return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
      case 'document':
        return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
      case 'interview':
        return 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z';
      default:
        return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border border-red-100';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border border-orange-100';
      case 'low':
        return 'text-green-600 bg-green-50 border border-green-100';
      default:
        return 'text-gray-600 bg-gray-50 border border-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'text-red-600 bg-red-50 border border-red-100';
      case 'upcoming':
        return 'text-blue-600 bg-blue-50 border border-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-50 border border-green-100';
      default:
        return 'text-gray-600 bg-gray-50 border border-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays <= 7) {
      return `In ${diffDays} days`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Deadline Tracker</h1>
              <p className="text-gray-500 font-medium">Never miss important dates for exams, applications, and documents</p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-sm inline-flex">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${filter === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
          >
            All ({deadlines.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${filter === 'upcoming'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
          >
            Upcoming ({deadlines.filter(d => d.status === 'upcoming').length})
          </button>
          <button
            onClick={() => setFilter('overdue')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${filter === 'overdue'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
          >
            Overdue ({deadlines.filter(d => d.status === 'overdue').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${filter === 'completed'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
          >
            Completed ({deadlines.filter(d => d.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Deadlines List */}
      <div className="space-y-4">
        {filteredDeadlines.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No deadlines found</h3>
            <p className="mt-1 text-gray-500">
              {filter === 'all' ? 'Add your first deadline to get started.' : `No ${filter} deadlines.`}
            </p>
          </div>
        ) : (
          filteredDeadlines.map((deadline) => (
            <div key={deadline.id} className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${deadline.status === 'overdue' ? 'bg-red-50 text-red-600' :
                      deadline.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getTypeIcon(deadline.type)} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{deadline.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(deadline.priority)}`}>
                        {deadline.priority}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(deadline.status)}`}>
                        {deadline.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 font-medium">{deadline.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5 font-medium">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(deadline.date)}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium capitalize">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {deadline.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {deadline.status !== 'completed' && (
                    <button className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors">
                      Mark Complete
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Deadline Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-gray-900 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Deadlines;