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
    const API_KEY = 'AIzaSyDYCuFIFHdT_sth1HrrNIb7y2LMBr04dOI';
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="font-bold text-gray-900">Application Assistant</h2>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${
        sidebarCollapsed
          ? 'w-16'
          : 'w-80 md:w-96'
      } bg-white shadow-xl border-r border-gray-200 flex flex-col transition-all duration-300 ${
        sidebarCollapsed && 'md:w-16'
      } ${!sidebarCollapsed ? 'block' : 'hidden md:block'}`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <h2 className="font-bold text-gray-900">
                Application Assistant
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Browse & Apply with Guidance
              </p>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarCollapsed ? "M13 5l7 7-7 7" : "M11 19l-7-7 7-7"} />
              </svg>
            </button>
          </div>
          {!sidebarCollapsed && (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Application Guidance
              </div>
            </div>
          )}
        </div>

        {/* Steps Navigation */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Application Steps</h3>
              <div className="space-y-2">
                {applicationSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeStep === index
                        ? 'bg-teal-50 border border-teal-200 text-teal-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        activeStep === index
                          ? 'bg-teal-600 text-white'
                          : index < activeStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index < activeStep ? '✓' : index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm truncate">{step.title}</div>
                        <div className="text-xs text-gray-500 truncate">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Step Details */}
            <div className="border-t border-gray-200 p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {applicationSteps[activeStep].title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {applicationSteps[activeStep].description}
                </p>
              </div>

              {/* Instructions */}
              <div className="mb-4">
                <h5 className="font-medium text-gray-900 mb-2">Instructions:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {applicationSteps[activeStep].instructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div className="mb-4">
                <h5 className="font-medium text-red-700 mb-2">⚠️ Common Mistakes to Avoid:</h5>
                <ul className="text-sm text-red-600 space-y-1">
                  {applicationSteps[activeStep].commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1">❌</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prefilled Data */}
              {applicationSteps[activeStep].prefilledData && applicationSteps[activeStep].prefilledData!.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Quick Copy Data:</h5>
                  <div className="space-y-2">
                    {applicationSteps[activeStep].prefilledData!.map((data, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="text-xs text-gray-500">{data.label}</div>
                          <div className="text-sm font-medium text-gray-900">{data.value}</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(data.value)}
                          className="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors"
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
      <div className="flex-1 flex flex-col min-h-0">
        {/* Browser Controls */}
        <div className="bg-white border-b border-gray-200 p-2 md:p-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
            {/* Navigation Controls */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={goBack}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Go Back"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goForward}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Go Forward"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={refresh}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Refresh"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* URL Bar */}
            <form onSubmit={handleUrlSubmit} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Search anything or enter URL"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
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
                className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                title="Go to Google"
              >
                Google
              </button>
              <button
                onClick={() => setUseGuidedMode(!useGuidedMode)}
                className={`px-3 py-2 text-xs rounded transition-colors ${
                  useGuidedMode
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={useGuidedMode ? 'Switch to Browser Only' : 'Show Guidance'}
              >
                {useGuidedMode ? '📋' : '🌐'}
              </button>
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 relative min-h-0">
          {useGuidedMode ? (
            /* Split View: Browser + Sidebar */
            <div className="flex h-full">
              {/* Main Browser Area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 relative">
                  {(isLoading || searchLoading) && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                      <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-teal-600"></div>
                    </div>
                  )}

                  {isSearchView ? (
                    /* Search Results View */
                    <div className="w-full h-full bg-white overflow-y-auto">
                      {searchError ? (
                        <div className="p-8 text-center">
                          <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                          </svg>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Search Error</h3>
                          <p className="text-gray-600">{searchError}</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="p-6">
                          <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Results</h2>
                            <p className="text-gray-600">Found {searchResults.length} results</p>
                          </div>
                          <div className="space-y-6">
                            {searchResults.map((result: any, index: number) => (
                              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 mb-2">
                                  <a
                                    href={result.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                  >
                                    {result.title}
                                  </a>
                                </h3>
                                <p className="text-sm text-green-600 mb-2">{result.displayLink}</p>
                                <p className="text-gray-700 text-sm leading-relaxed">{result.snippet}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                          </svg>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
                          <p className="text-gray-600">Try a different search query</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* External Link Message */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg shadow-lg max-w-md">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd"/>
                          </svg>
                          <div className="text-sm">
                            <p className="font-medium">Open in New Tab</p>
                            <p>Websites open externally for security and compatibility.</p>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => window.open(currentUrl, '_blank')}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Open {currentUrl ? 'Website' : 'Google'}
                          </button>
                          <button
                            onClick={() => setUseGuidedMode(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          >
                            Browser Only
                          </button>
                        </div>
                      </div>

                      {/* Browser Placeholder */}
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Browser Window</h3>
                          <p className="text-gray-600 mb-4">Websites open in new tabs for security</p>
                          <button
                            onClick={() => window.open(currentUrl || 'https://www.google.com', '_blank')}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Open {currentUrl ? 'Website' : 'Google'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Copy Sidebar */}
              <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Quick Copy Data
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Common details for applications</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Personal Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
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
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500">{data.label}</div>
                            <div className="text-sm font-medium text-gray-900 truncate">{data.value}</div>
                          </div>
                          <button
                            onClick={() => copyToClipboard(data.value)}
                            className="ml-2 px-2 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                      </svg>
                      Academic Info
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: 'School Name', value: 'Delhi Public School', copyAction: 'Copy School' },
                        { label: 'Board', value: 'CBSE', copyAction: 'Copy Board' },
                        { label: 'Year of Passing', value: '2025', copyAction: 'Copy Year' },
                        { label: 'Percentage/CGPA', value: '95.5%', copyAction: 'Copy Marks' }
                      ].map((data, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500">{data.label}</div>
                            <div className="text-sm font-medium text-gray-900 truncate">{data.value}</div>
                          </div>
                          <button
                            onClick={() => copyToClipboard(data.value)}
                            className="ml-2 px-2 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      Address Info
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: 'Address', value: '123 Main Street, Delhi', copyAction: 'Copy Address' },
                        { label: 'City', value: 'New Delhi', copyAction: 'Copy City' },
                        { label: 'State', value: 'Delhi', copyAction: 'Copy State' },
                        { label: 'PIN Code', value: '110001', copyAction: 'Copy PIN' }
                      ].map((data, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500">{data.label}</div>
                            <div className="text-sm font-medium text-gray-900 truncate">{data.value}</div>
                          </div>
                          <button
                            onClick={() => copyToClipboard(data.value)}
                            className="ml-2 px-2 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors"
                          >
                            Copy
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
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-teal-600"></div>
                </div>
              )}

              {isSearchView ? (
                /* Search Results View */
                <div className="w-full h-full bg-white overflow-y-auto">
                  {searchError ? (
                    <div className="p-8 text-center">
                      <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Search Error</h3>
                      <p className="text-gray-600">{searchError}</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Results</h2>
                        <p className="text-gray-600">Found {searchResults.length} results</p>
                      </div>
                      <div className="space-y-6">
                        {searchResults.map((result: any, index: number) => (
                          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 mb-2">
                              <a
                                href={result.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {result.title}
                              </a>
                            </h3>
                            <p className="text-sm text-green-600 mb-2">{result.displayLink}</p>
                            <p className="text-gray-700 text-sm leading-relaxed">{result.snippet}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
                      <p className="text-gray-600">Try a different search query</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Browser Placeholder */
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Browser Window</h3>
                    <p className="text-gray-600 mb-4">Websites open in new tabs for security</p>
                    <button
                      onClick={() => window.open(currentUrl || 'https://www.google.com', '_blank')}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
  );
};

export default ApplicationAssistant;