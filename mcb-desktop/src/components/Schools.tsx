import React, { useState, useEffect } from 'react';

interface University {
  id: number | string;
  name: string;
  location: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'Private' | 'International' | 'Public';
  ranking?: number;
  acceptanceRate?: string;
  fees?: string;
  logo?: string;
  description?: string;
  programs?: string[];
  placement?: {
    average: string;
    highest: string;
  };
  website?: string;
  isApiResult?: boolean;
}

const Schools: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchResults, setSearchResults] = useState<University[]>([]);
  const [filter, setFilter] = useState<'all' | 'IIT' | 'NIT' | 'IIIT' | 'Private' | 'International'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout | null>(null);

  // Mock data for Featured Universities
  useEffect(() => {
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

  // Search API Handler
  useEffect(() => {
    if (searchDebounce) clearTimeout(searchDebounce);

    if (searchTerm.trim().length > 2) {
      setLoading(true);
      const timeout = setTimeout(async () => {
        try {
          const response = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(searchTerm)}`);
          const data = await response.json();

          const mappedResults: University[] = data.slice(0, 50).map((item: any, index: number) => ({
            id: `api-${index}`,
            name: item.name,
            location: item.country,
            type: 'Public', // Default type for API results
            website: item.web_pages?.[0],
            isApiResult: true,
            description: `University located in ${item.country}. Visit website for more details.`
          }));

          setSearchResults(mappedResults);
        } catch (error) {
          console.error('Error fetching universities:', error);
        } finally {
          setLoading(false);
        }
      }, 500); // 500ms debounce
      setSearchDebounce(timeout);
    } else {
      setSearchResults([]);
      setLoading(false);
    }

    return () => {
      if (searchDebounce) clearTimeout(searchDebounce);
    };
  }, [searchTerm]);

  const filteredFeaturedUniversities = universities.filter(university => {
    const matchesFilter = filter === 'all' || university.type === filter;
    // Only search locally if search term is short, otherwise we use API results
    const matchesSearch = searchTerm.length <= 2 && (
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesFilter && (searchTerm.length > 2 ? true : matchesSearch);
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'IIT': return 'bg-gray-900 text-white border border-gray-900';
      case 'NIT': return 'bg-blue-50 text-blue-700 border border-blue-100';
      case 'IIIT': return 'bg-gray-100 text-gray-700 border border-gray-200';
      case 'Private': return 'bg-white text-gray-600 border border-gray-200';
      case 'International': return 'bg-blue-600 text-white border border-blue-600';
      default: return 'bg-gray-50 text-gray-700 border border-gray-100';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Explore Universities</h1>
              <p className="text-gray-500 font-medium">Find your perfect college match from top institutions worldwide</p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search universities (e.g. Stanford, IIT, Oxford)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
                />
                {loading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Filters (Only visible when not searching globally) */}
            {searchTerm.length <= 2 && (
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {['all', 'IIT', 'NIT', 'IIIT', 'Private', 'International'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type as any)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${filter === type
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {type === 'all' ? 'All' : type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results (API) */}
      {searchTerm.length > 2 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs uppercase tracking-wider">Global Search</span>
            Results for "{searchTerm}"
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((university) => (
              <div key={university.id} className="group bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {university.location}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{university.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{university.description}</p>
                {university.website && (
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 text-sm font-semibold hover:text-blue-700"
                  >
                    Visit Website
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
            {searchResults.length === 0 && !loading && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No global results found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Featured Universities (Mock) */}
      {searchTerm.length <= 2 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs uppercase tracking-wider">Featured</span>
            Top Institutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeaturedUniversities.map((university) => (
              <div key={university.id} className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTypeColor(university.type)}`}>
                      {university.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight group-hover:text-blue-600 transition-colors">{university.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5 font-medium">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {university.location}
                  </p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-2">{university.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl text-center">
                      <div className="text-lg font-bold text-gray-900">#{university.ranking}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">NIRF Rank</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-2xl text-center">
                      <div className="text-lg font-bold text-gray-900">{university.acceptanceRate}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Acceptance</div>
                    </div>
                  </div>

                  {/* Programs */}
                  <div className="mb-6">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Programs</h4>
                    <div className="flex flex-wrap gap-2">
                      {university.programs?.slice(0, 2).map((program, index) => (
                        <span key={index} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                          {program}
                        </span>
                      ))}
                      {university.programs && university.programs.length > 2 && (
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium">
                          +{university.programs.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Placement & Fees */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Package</div>
                      <div className="font-bold text-gray-900">{university.placement?.average}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Fees</div>
                      <div className="font-bold text-gray-900">{university.fees}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5">
                      Apply Now
                    </button>
                    <button className="px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Schools;