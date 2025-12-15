import React, { useState } from 'react';

interface ApplicationStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  commonMistakes: string[];
  prefilledData?: {
    label: string;
    value: string;
    copyAction: string;
  }[];
}

const ApplicationAssistant: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [useGuidedMode, setUseGuidedMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isSearchView, setIsSearchView] = useState(false);

  // General Application Steps
  const applicationSteps: ApplicationStep[] = [
    {
      id: 'research',
      title: 'Step 1: Research & Planning',
      description: 'Research your desired programs and requirements',
      instructions: [
        'Identify your target universities/programs',
        'Check admission requirements and deadlines',
        'Gather necessary documents',
        'Prepare your application strategy',
        'Create a timeline for applications'
      ],
      commonMistakes: [
        'Missing important deadlines',
        'Not checking specific requirements',
        'Incomplete document collection',
        'Poor planning and organization'
      ],
      prefilledData: [
        {
          label: 'Email Address',
          value: 'student@gmail.com',
          copyAction: 'Copy Email'
        },
        {
          label: 'Phone Number',
          value: '+91 9876543210',
          copyAction: 'Copy Phone'
        }
      ]
    },
    {
      id: 'personal-info',
      title: 'Step 2: Personal Information',
      description: 'Prepare your personal details and documents',
      instructions: [
        'Fill in your full name as per certificates',
        'Enter your date of birth correctly',
        'Provide contact information',
        'Prepare address details',
        'Gather identification documents'
      ],
      commonMistakes: [
        'Name spelling different from certificates',
        'Wrong date of birth',
        'Incorrect contact information',
        'Incomplete address details'
      ],
      prefilledData: [
        {
          label: 'Full Name',
          value: 'Rahul Sharma',
          copyAction: 'Copy Name'
        },
        {
          label: 'Date of Birth',
          value: '15/05/2006',
          copyAction: 'Copy DOB'
        },
        {
          label: 'Category',
          value: 'General',
          copyAction: 'Copy Category'
        }
      ]
    },
    {
      id: 'academic-info',
      title: 'Step 3: Academic Information',
      description: 'Compile your educational background',
      instructions: [
        'List all educational qualifications',
        'Include grades and percentages',
        'Provide school/college details',
        'Prepare transcripts and certificates',
        'Calculate GPA if required'
      ],
      commonMistakes: [
        'Missing educational records',
        'Incorrect grade conversions',
        'Incomplete institution details',
        'Wrong qualification order'
      ],
      prefilledData: [
        {
          label: 'School Name',
          value: 'Delhi Public School',
          copyAction: 'Copy School'
        },
        {
          label: 'Board',
          value: 'CBSE',
          copyAction: 'Copy Board'
        },
        {
          label: 'Year of Passing',
          value: '2025',
          copyAction: 'Copy Year'
        },
        {
          label: 'Percentage/CGPA',
          value: '95.5%',
          copyAction: 'Copy Marks'
        }
      ]
    },
    {
      id: 'documents',
      title: 'Step 4: Document Preparation',
      description: 'Prepare and organize all required documents',
      instructions: [
        'Scan all certificates and mark sheets',
        'Prepare passport size photos',
        'Get signature samples',
        'Prepare recommendation letters',
        'Organize financial documents'
      ],
      commonMistakes: [
        'Wrong photo dimensions',
        'Blurry or poor quality scans',
        'Incorrect file formats',
        'Missing required documents'
      ]
    },
    {
      id: 'application-filling',
      title: 'Step 5: Application Filling',
      description: 'Complete the online application forms',
      instructions: [
        'Visit official application portals',
        'Fill personal information accurately',
        'Enter academic details carefully',
        'Upload documents correctly',
        'Review and submit applications'
      ],
      commonMistakes: [
        'Incomplete form submissions',
        'Wrong information entry',
        'Document upload failures',
        'Missing required fields'
      ]
    },
    {
      id: 'payment-tracking',
      title: 'Step 6: Payment & Tracking',
      description: 'Complete payments and track application status',
      instructions: [
        'Review application summary',
        'Select appropriate payment method',
        'Complete fee payment',
        'Save transaction details',
        'Track application status regularly'
      ],
      commonMistakes: [
        'Payment failures',
        'Wrong payment amount',
        'Not saving transaction ID',
        'Missing payment confirmations'
      ]
    }
  ];

  const fetchGoogleSearchResults = async (query: string) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const CX = '14aea43775598454f';
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        return data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          displayLink: item.displayLink
        }));
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let input = urlInput.trim();

    // If it looks like a search query (contains spaces or no dots), perform search
    if (input.includes(' ') || (!input.includes('.') && !input.startsWith('http'))) {
      setSearchLoading(true);
      setSearchError('');
      setIsSearchView(true);
      setIsLoading(false);

      try {
        const results = await fetchGoogleSearchResults(input);
        setSearchResults(results);
      } catch (error) {
        setSearchError('Failed to fetch search results. Please try again.');
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    } else {
      // Handle URL navigation
      let url = input;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }

      setCurrentUrl(url);
      setIsLoading(true);
      setIsSearchView(false);
      setSearchResults([]);
      setSearchError('');
    }
  };


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  const goBack = () => {
    // Since we open in new tabs, back/forward don't work in our context
    // Could implement browser history if needed
  };

  const goForward = () => {
    // Since we open in new tabs, back/forward don't work in our context
    // Could implement browser history if needed
  };

  const refresh = () => {
    // Since we open in new tabs, refresh doesn't work in our context
    // Could implement refresh functionality if needed
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-white/80 backdrop-blur-xl border-b border-white/20 p-4 flex items-center justify-between sticky top-0 z-50">
        <h2 className="font-bold text-gray-900">Application Assistant</h2>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${sidebarCollapsed
          ? 'w-20'
          : 'w-80 md:w-96'
        } bg-white/80 backdrop-blur-xl border-r border-white/20 flex flex-col transition-all duration-300 ${sidebarCollapsed && 'md:w-20'
        } ${!sidebarCollapsed ? 'block' : 'hidden md:block'} z-40`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <h2 className="font-bold text-gray-900 text-lg tracking-tight">
                Application Assistant
              </h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                Browse & Apply with Guidance
              </p>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarCollapsed ? "M13 5l7 7-7 7" : "M11 19l-7-7 7-7"} />
              </svg>
            </button>
          </div>
          {!sidebarCollapsed && (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-flex">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Application Guidance
              </div>
            </div>
          )}
        </div>

        {/* Steps Navigation */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider px-2">Application Steps</h3>
              <div className="space-y-2">
                {applicationSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${activeStep === index
                        ? 'bg-blue-50 border border-blue-100 text-blue-700 shadow-sm'
                        : 'hover:bg-gray-50 text-gray-600 border border-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${activeStep === index
                          ? 'bg-blue-600 text-white'
                          : index < activeStep
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                        {index < activeStep ? '✓' : index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm truncate">{step.title}</div>
                        <div className="text-xs text-gray-500 truncate mt-0.5">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Step Details */}
            <div className="border-t border-gray-100 p-6 bg-gray-50/50">
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {applicationSteps[activeStep].title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {applicationSteps[activeStep].description}
                </p>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h5 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Instructions</h5>
                <ul className="space-y-2">
                  {applicationSteps[activeStep].instructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <span className="text-blue-600 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div className="mb-6">
                <h5 className="font-bold text-red-600 mb-3 text-sm uppercase tracking-wider">⚠️ Common Mistakes</h5>
                <ul className="space-y-2">
                  {applicationSteps[activeStep].commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-red-700 bg-red-50 p-3 rounded-xl border border-red-100">
                      <span className="mt-0.5">❌</span>
                      <span className="leading-relaxed font-medium">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prefilled Data */}
              {applicationSteps[activeStep].prefilledData && applicationSteps[activeStep].prefilledData!.length > 0 && (
                <div>
                  <h5 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Quick Copy Data</h5>
                  <div className="space-y-2">
                    {applicationSteps[activeStep].prefilledData!.map((data, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors group">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{data.label}</div>
                          <div className="text-sm font-bold text-gray-900 mt-0.5">{data.value}</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(data.value)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          {data.copyAction}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
        {/* Browser Controls */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 p-3 md:p-4 sticky top-0 z-30 shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
            {/* Navigation Controls */}
            <div className="flex items-center gap-1 md:gap-2 bg-gray-100/50 p-1 rounded-xl">
              <button
                onClick={goBack}
                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500 hover:text-gray-900"
                title="Go Back"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goForward}
                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500 hover:text-gray-900"
                title="Go Forward"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={refresh}
                className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500 hover:text-gray-900"
                title="Refresh"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* URL Bar */}
            <form onSubmit={handleUrlSubmit} className="flex-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Search or enter website name"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
                />
                {urlInput && (
                  <button
                    type="button"
                    onClick={() => setUrlInput('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setUrlInput('https://www.google.com/');
                  setCurrentUrl('https://www.google.com/');
                  setIsLoading(true);
                }}
                className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                title="Go to Google"
              >
                Google
              </button>
              <button
                onClick={() => setUseGuidedMode(!useGuidedMode)}
                className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all shadow-sm border ${useGuidedMode
                    ? 'bg-white text-blue-600 border-blue-100 hover:bg-blue-50'
                    : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
                  }`}
                title={useGuidedMode ? 'Switch to Browser Only' : 'Show Guidance'}
              >
                {useGuidedMode ? '📋 Guidance On' : '🌐 Browser Only'}
              </button>
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 relative min-h-0 p-4 md:p-6 overflow-hidden">
          <div className="h-full bg-white rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden relative">
            {useGuidedMode ? (
              /* Split View: Browser + Sidebar */
              <div className="flex h-full">
                {/* Main Browser Area */}
                <div className="flex-1 flex flex-col relative">
                  {(isLoading || searchLoading) && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  )}

                  {isSearchView ? (
                    /* Search Results View */
                    <div className="w-full h-full bg-white overflow-y-auto custom-scrollbar">
                      {searchError ? (
                        <div className="p-12 text-center">
                          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Search Error</h3>
                          <p className="text-gray-600">{searchError}</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="p-8 max-w-4xl mx-auto">
                          <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h2>
                            <p className="text-gray-500 font-medium">Found {searchResults.length} results</p>
                          </div>
                          <div className="space-y-8">
                            {searchResults.map((result: any, index: number) => (
                              <div key={index} className="group">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold uppercase">
                                    {result.displayLink.charAt(0)}
                                  </div>
                                  <div className="text-sm text-gray-500">{result.displayLink}</div>
                                </div>
                                <h3 className="text-xl font-semibold text-blue-600 group-hover:text-blue-800 mb-2 transition-colors">
                                  <a
                                    href={result.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline decoration-2 underline-offset-2"
                                  >
                                    {result.title}
                                  </a>
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{result.snippet}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-16 text-center">
                          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
                          <p className="text-gray-500">Try a different search query</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* External Link Message */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-xl border border-blue-100 p-6 rounded-2xl shadow-2xl max-w-md text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Open in New Tab</h3>
                        <p className="text-gray-600 mb-6 text-sm">Websites open externally for security and compatibility.</p>

                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => window.open(currentUrl, '_blank')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                          >
                            Open Website
                          </button>
                          <button
                            onClick={() => setUseGuidedMode(false)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                          >
                            Browser Only
                          </button>
                        </div>
                      </div>

                      {/* Browser Placeholder */}
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <div className="text-center opacity-50">
                          <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Copy Sidebar (Right Side) */}
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                  <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Quick Copy Data
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
                    {/* Personal Information */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-xs uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Personal Info
                      </h4>
                      <div className="space-y-2">
                        {[
                          { label: 'Full Name', value: 'Rahul Sharma', copyAction: 'Copy Name' },
                          { label: 'Email', value: 'student@gmail.com', copyAction: 'Copy Email' },
                          { label: 'Phone', value: '+91 9876543210', copyAction: 'Copy Phone' },
                          { label: 'Date of Birth', value: '15/05/2006', copyAction: 'Copy DOB' },
                          { label: 'Category', value: 'General', copyAction: 'Copy Category' }
                        ].map((data, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-xl hover:border-blue-200 transition-colors group shadow-sm">
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{data.label}</div>
                              <div className="text-sm font-semibold text-gray-900 truncate">{data.value}</div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(data.value)}
                              className="ml-2 p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                              title="Copy"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-xs uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Academic Info
                      </h4>
                      <div className="space-y-2">
                        {[
                          { label: 'School Name', value: 'Delhi Public School', copyAction: 'Copy School' },
                          { label: 'Board', value: 'CBSE', copyAction: 'Copy Board' },
                          { label: 'Year of Passing', value: '2025', copyAction: 'Copy Year' },
                          { label: 'Percentage/CGPA', value: '95.5%', copyAction: 'Copy Marks' }
                        ].map((data, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-xl hover:border-green-200 transition-colors group shadow-sm">
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{data.label}</div>
                              <div className="text-sm font-semibold text-gray-900 truncate">{data.value}</div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(data.value)}
                              className="ml-2 p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors opacity-0 group-hover:opacity-100"
                              title="Copy"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Address Information */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-xs uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Address Info
                      </h4>
                      <div className="space-y-2">
                        {[
                          { label: 'Address', value: '123 Main Street, Delhi', copyAction: 'Copy Address' },
                          { label: 'City', value: 'New Delhi', copyAction: 'Copy City' },
                          { label: 'State', value: 'Delhi', copyAction: 'Copy State' },
                          { label: 'PIN Code', value: '110001', copyAction: 'Copy PIN' }
                        ].map((data, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-xl hover:border-purple-200 transition-colors group shadow-sm">
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{data.label}</div>
                              <div className="text-sm font-semibold text-gray-900 truncate">{data.value}</div>
                            </div>
                            <button
                              onClick={() => copyToClipboard(data.value)}
                              className="ml-2 p-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors opacity-0 group-hover:opacity-100"
                              title="Copy"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Browser Mode - Full browser with search */
              <>
                {(isLoading || searchLoading) && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                )}

                {isSearchView ? (
                  /* Search Results View */
                  <div className="w-full h-full bg-white overflow-y-auto custom-scrollbar">
                    {searchError ? (
                      <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Search Error</h3>
                        <p className="text-gray-600">{searchError}</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="p-8 max-w-4xl mx-auto">
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h2>
                          <p className="text-gray-500 font-medium">Found {searchResults.length} results</p>
                        </div>
                        <div className="space-y-8">
                          {searchResults.map((result: any, index: number) => (
                            <div key={index} className="group">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold uppercase">
                                  {result.displayLink.charAt(0)}
                                </div>
                                <div className="text-sm text-gray-500">{result.displayLink}</div>
                              </div>
                              <h3 className="text-xl font-semibold text-blue-600 group-hover:text-blue-800 mb-2 transition-colors">
                                <a
                                  href={result.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline decoration-2 underline-offset-2"
                                >
                                  {result.title}
                                </a>
                              </h3>
                              <p className="text-gray-600 leading-relaxed">{result.snippet}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-16 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
                        <p className="text-gray-500">Try a different search query</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Browser Placeholder */
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Browser Window</h3>
                      <p className="text-gray-600 mb-6">Websites open in new tabs for security</p>
                      <button
                        onClick={() => window.open(currentUrl || 'https://www.google.com', '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                      >
                        Open {currentUrl ? 'Website' : 'Google'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationAssistant;