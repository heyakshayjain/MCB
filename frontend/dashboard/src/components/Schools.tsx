import React, { useState, useEffect } from 'react';

interface University {
  id: number;
  name: string;
  location: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'Private' | 'International';
  ranking: number;
  acceptanceRate: string;
  fees: string;
  logo: string;
  description: string;
  programs: string[];
  placement: {
    average: string;
    highest: string;
  };
}

const Schools: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filter, setFilter] = useState<'all' | 'IIT' | 'NIT' | 'IIIT' | 'Private' | 'International'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data for Indian and international universities
    const mockUniversities: University[] = [
      {
        id: 1,
        name: 'Indian Institute of Technology Delhi',
        location: 'New Delhi, India',
        type: 'IIT',
        ranking: 1,
        acceptanceRate: '2.5%',
        fees: '₹2.5L/year',
        logo: '/static/images/universities/iitd.png',
        description: 'Premier engineering institute known for excellence in technology education.',
        programs: ['B.Tech Computer Science', 'B.Tech Electrical', 'B.Tech Mechanical', 'B.Tech Civil'],
        placement: { average: '₹15LPA', highest: '₹2Cr' }
      },
      {
        id: 2,
        name: 'Indian Institute of Technology Bombay',
        location: 'Mumbai, India',
        type: 'IIT',
        ranking: 2,
        acceptanceRate: '2.3%',
        fees: '₹2.5L/year',
        logo: '/static/images/universities/iitb.png',
        description: 'Leading technical institute with world-class research facilities.',
        programs: ['B.Tech Computer Science', 'B.Tech Chemical', 'B.Tech Aerospace'],
        placement: { average: '₹16LPA', highest: '₹2.5Cr' }
      },
      {
        id: 3,
        name: 'National Institute of Technology Karnataka',
        location: 'Surathkal, India',
        type: 'NIT',
        ranking: 15,
        acceptanceRate: '8.2%',
        fees: '₹1.5L/year',
        logo: '/static/images/universities/nitk.png',
        description: 'Top NIT with excellent placement records and campus facilities.',
        programs: ['B.Tech Computer Science', 'B.Tech Electronics', 'B.Tech Information Technology'],
        placement: { average: '₹12LPA', highest: '₹45LPA' }
      },
      {
        id: 4,
        name: 'Stanford University',
        location: 'Stanford, USA',
        type: 'International',
        ranking: 3,
        acceptanceRate: '4.3%',
        fees: '$55,000/year',
        logo: '/static/images/universities/stanford.png',
        description: 'World-renowned university for innovation and entrepreneurship.',
        programs: ['BS Computer Science', 'BS Engineering', 'BS Mathematics'],
        placement: { average: '$120,000/year', highest: '$200,000+' }
      },
      {
        id: 5,
        name: 'Massachusetts Institute of Technology',
        location: 'Cambridge, USA',
        type: 'International',
        ranking: 1,
        acceptanceRate: '6.7%',
        fees: '$53,000/year',
        logo: '/static/images/universities/mit.png',
        description: 'Leading institution for science, technology, and innovation.',
        programs: ['BS Computer Science', 'BS Electrical Engineering', 'BS Mechanical Engineering'],
        placement: { average: '$110,000/year', highest: '$180,000+' }
      },
      {
        id: 6,
        name: 'Harvard University',
        location: 'Cambridge, USA',
        type: 'International',
        ranking: 2,
        acceptanceRate: '4.9%',
        fees: '$52,000/year',
        logo: '/static/images/universities/harvard.png',
        description: 'Ivy League institution with exceptional academic programs.',
        programs: ['AB Computer Science', 'AB Engineering Sciences', 'AB Applied Mathematics'],
        placement: { average: '$95,000/year', highest: '$150,000+' }
      },
      {
        id: 7,
        name: 'Indian Institute of Information Technology Hyderabad',
        location: 'Hyderabad, India',
        type: 'IIIT',
        ranking: 25,
        acceptanceRate: '12.5%',
        fees: '₹3L/year',
        logo: '/static/images/universities/iiith.png',
        description: 'Specialized in information technology with strong industry connections.',
        programs: ['B.Tech Computer Science', 'B.Tech Electronics & Communication'],
        placement: { average: '₹18LPA', highest: '₹60LPA' }
      },
      {
        id: 8,
        name: 'Vellore Institute of Technology',
        location: 'Vellore, India',
        type: 'Private',
        ranking: 30,
        acceptanceRate: '35%',
        fees: '₹8L/year',
        logo: '/static/images/universities/vit.png',
        description: 'Deemed university with excellent infrastructure and global partnerships.',
        programs: ['B.Tech Computer Science', 'B.Tech Electronics', 'B.Tech Mechanical', 'B.Tech Civil'],
        placement: { average: '₹6LPA', highest: '₹40LPA' }
      }
    ];
    setUniversities(mockUniversities);
  }, []);

  const filteredUniversities = universities.filter(university => {
    const matchesFilter = filter === 'all' || university.type === filter;
    const matchesSearch = university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         university.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'IIT':
        return 'bg-red-100 text-red-800';
      case 'NIT':
        return 'bg-blue-100 text-blue-800';
      case 'IIIT':
        return 'bg-green-100 text-green-800';
      case 'Private':
        return 'bg-purple-100 text-purple-800';
      case 'International':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Universities</h1>
              <p className="text-gray-600">Find your perfect college match from top institutions worldwide</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({universities.length})
              </button>
              <button
                onClick={() => setFilter('IIT')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'IIT'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                IITs ({universities.filter(u => u.type === 'IIT').length})
              </button>
              <button
                onClick={() => setFilter('NIT')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'NIT'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                NITs ({universities.filter(u => u.type === 'NIT').length})
              </button>
              <button
                onClick={() => setFilter('International')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === 'International'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                International ({universities.filter(u => u.type === 'International').length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university) => (
          <div key={university.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <img src={university.logo} alt={university.name} className="w-12 h-12 rounded-lg object-cover" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(university.type)}`}>
                  {university.type}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{university.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {university.location}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-4">{university.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-teal-600">#{university.ranking}</div>
                  <div className="text-xs text-gray-600">NIRF Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-teal-600">{university.acceptanceRate}</div>
                  <div className="text-xs text-gray-600">Acceptance</div>
                </div>
              </div>

              {/* Programs */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Popular Programs</h4>
                <div className="flex flex-wrap gap-1">
                  {university.programs.slice(0, 2).map((program, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {program}
                    </span>
                  ))}
                  {university.programs.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{university.programs.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Placement */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Placement</h4>
                <div className="text-sm text-gray-600">
                  <div>Avg: {university.placement.average}</div>
                  <div>Highest: {university.placement.highest}</div>
                </div>
              </div>

              {/* Fees */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-1">Annual Fees</h4>
                <div className="text-lg font-bold text-teal-600">{university.fees}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No universities found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Schools;