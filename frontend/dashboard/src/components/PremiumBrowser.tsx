import React, { useState, useEffect } from 'react';

interface User {
  email: string;
  name?: string;
  picture?: string;
  premium?: boolean;
}

const PremiumBrowser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [url, setUrl] = useState('https://www.google.com');
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [copiedData, setCopiedData] = useState<string[]>([]);
  const [showClipboard, setShowClipboard] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user data to check premium status
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/dashboard`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          // For testing, allow access even if not premium
          // if (!data.user?.premium) {
          //   // Redirect if not premium
          //   window.location.href = '/dashboard';
          // }
        } else {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.location.href = '/login';
      }
    };

    fetchUserData();
  }, []);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentUrl(url);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;

    setAiResponse('Analyzing your request...');

    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Based on your query "${aiQuery}", I can help you with the following actions on the current page:

1. Extract form data
2. Fill application forms automatically
3. Check for blocked content
4. Navigate to related pages
5. Copy important information

What would you like me to do?`);
    }, 1500);
  };

  const copyData = (data: string, fieldName?: string) => {
    navigator.clipboard.writeText(data);
    setCopiedData(prev => [...prev, data]);
    setCopyFeedback(fieldName || 'Data');
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const sampleApplicationData = {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      fatherName: "Robert Doe",
      motherName: "Jane Doe",
      dateOfBirth: "2005-05-15",
      address: "123 Main St, City, State 12345",
      emergencyContact: "+1-555-0124"
    },
    academicInfo: {
      gpa: "3.8",
      satScore: "1450",
      actScore: "32",
      graduationYear: "2025",
      schoolName: "Lincoln High School",
      classRank: "Top 10%",
      honors: "AP Scholar, National Honor Society"
    },
    applicationDetails: {
      intendedMajor: "Computer Science",
      extracurriculars: "President of Coding Club, Volunteer at Local Shelter, Math Olympiad Winner",
      essayTopic: "How technology can solve social problems",
      recommendationLetters: "From Math Teacher and Coding Club Advisor"
    }
  };

  const sampleDocuments = [
    { name: "Transcript.pdf", type: "Academic Transcript", size: "2.3 MB" },
    { name: "SAT_Score_Report.pdf", type: "SAT Score Report", size: "1.8 MB" },
    { name: "Recommendation_Letter_Math.pdf", type: "Recommendation Letter", size: "945 KB" },
    { name: "Recommendation_Letter_CS.pdf", type: "Recommendation Letter", size: "1.2 MB" },
    { name: "Birth_Certificate.pdf", type: "Birth Certificate", size: "756 KB" },
    { name: "Passport_Copy.pdf", type: "Passport Copy", size: "3.1 MB" }
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Premium Browser</h1>
          <button
            onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            AI Assistant
          </button>
        </div>
      </div>

      {/* URL Bar */}
      <div className="p-4 border-b border-gray-200">
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., https://www.google.com)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Go
          </button>
        </form>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Browser Content */}
        <div className="flex-1 flex flex-col">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}

          {/* Embedded Browser (iframe) */}
          <div className="flex-1 bg-gray-100">
            <iframe
              src={currentUrl}
              className="w-full h-full border-0"
              title="Premium Browser"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        {aiAssistantOpen && (
          <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">AI Application Assistant</h3>
              <p className="text-sm text-gray-600 mt-1">Ask me to help with applications</p>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask me to help with your application..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    onClick={handleAiQuery}
                    className="mt-2 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Ask AI
                  </button>
                </div>

                {aiResponse && (
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{aiResponse}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Copied Data Section */}
            {copiedData.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Copied Data</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {copiedData.map((data, index) => (
                    <div key={index} className="bg-white p-2 rounded border text-xs text-gray-600">
                      {data.length > 50 ? `${data.substring(0, 50)}...` : data}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Copy Feedback Toast */}
      {copyFeedback && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span>{copyFeedback} copied!</span>
        </div>
      )}

      {/* Floating Clipboard Button */}
      <button
        onClick={() => setShowClipboard(!showClipboard)}
        className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-colors z-40"
        title="Application Data Clipboard"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      </button>

      {/* Floating Clipboard Panel */}
      {showClipboard && (
        <div className="fixed top-20 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-30 max-h-[70vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Copy</h3>
              <button
                onClick={() => setShowClipboard(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {/* Quick Access Fields */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Personal</div>
                <div className="grid grid-cols-1 gap-1">
                  <button
                    onClick={() => copyData(sampleApplicationData.personalInfo.name, 'Full Name')}
                    className="flex justify-between items-center p-2 text-left bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <span className="text-sm">{sampleApplicationData.personalInfo.name}</span>
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => copyData(sampleApplicationData.personalInfo.email, 'Email')}
                    className="flex justify-between items-center p-2 text-left bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <span className="text-sm">{sampleApplicationData.personalInfo.email}</span>
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => copyData(sampleApplicationData.personalInfo.phone, 'Phone')}
                    className="flex justify-between items-center p-2 text-left bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <span className="text-sm">{sampleApplicationData.personalInfo.phone}</span>
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Academic</div>
                <div className="grid grid-cols-1 gap-1">
                  <button
                    onClick={() => copyData(sampleApplicationData.academicInfo.gpa, 'GPA')}
                    className="flex justify-between items-center p-2 text-left bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <span className="text-sm">GPA: {sampleApplicationData.academicInfo.gpa}</span>
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => copyData(sampleApplicationData.academicInfo.satScore, 'SAT Score')}
                    className="flex justify-between items-center p-2 text-left bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                  >
                    <span className="text-sm">SAT: {sampleApplicationData.academicInfo.satScore}</span>
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Documents</div>
                <div className="space-y-1">
                  {sampleDocuments.slice(0, 3).map((doc, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', JSON.stringify({
                          name: doc.name,
                          type: doc.type,
                          size: doc.size,
                          url: `/documents/${doc.name}`
                        }));
                      }}
                      className="flex items-center justify-between p-2 bg-blue-50 hover:bg-blue-100 rounded cursor-move transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <span className="text-sm truncate">{doc.name}</span>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setShowClipboard(false)}
                  className="w-full text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Click to close • Keep using browser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumBrowser;