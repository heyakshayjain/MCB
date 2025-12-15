import React, { useState, useEffect } from 'react';
import { EmbeddedBrowser } from './browser/EmbeddedBrowser';

interface User {
  email: string;
  name?: string;
  picture?: string;
  premium?: boolean;
}

const PremiumBrowser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [copiedData, setCopiedData] = useState<string[]>([]);
  const [showClipboard, setShowClipboard] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  useEffect(() => {
    // For Electron app, use mock user (no backend needed)
    const mockUser = {
      email: 'user@mcb.com',
      name: 'MCB User',
      premium: true
    };

    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;

    setAiResponse('Analyzing your request...');

    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Based on your query "${aiQuery}", I can help you with:

1. **Auto-fill forms** - Automatically fill application forms with your saved data
2. **Extract information** - Copy important data from web pages
3. **Navigate pages** - Guide you through multi-step application processes
4. **Monitor changes** - Watch for updates or new content on pages
5. **Quick copy** - Use the clipboard panel to quickly access your information

The cloud browser allows me to interact with any website without restrictions. What would you like me to do?`);
    }, 1500);
  };

  const copyData = (data: string, fieldName?: string) => {
    navigator.clipboard.writeText(data);
    setCopiedData(prev => [...prev, data]);
    setCopyFeedback(fieldName || 'Data');
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const pasteData = async (data: string, fieldName?: string) => {
    try {
      // Use Electron IPC for pasting
      if (window.electron?.browserPaste) {
        const success = await window.electron.browserPaste(data);
        if (success) {
          setCopyFeedback(`${fieldName || 'Data'} pasted`);
        } else {
          setCopyFeedback(`Failed to paste - click on a field first`);
        }
      } else {
        setCopyFeedback('Paste not available');
      }
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch (error) {
      console.error('Failed to paste:', error);
      setCopyFeedback('Paste failed');
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  const sampleApplicationData = {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      dateOfBirth: "2005-05-15",
      address: "123 Main St, City, State 12345"
    },
    academicInfo: {
      gpa: "3.8",
      satScore: "1450",
      actScore: "32",
      graduationYear: "2025",
      schoolName: "Lincoln High School"
    }
  };

  const sampleDocuments = [
    { name: "Transcript.pdf", type: "Academic Transcript", size: "2.3 MB" },
    { name: "SAT_Score_Report.pdf", type: "SAT Score Report", size: "1.8 MB" },
    { name: "Recommendation_Letter.pdf", type: "Recommendation Letter", size: "945 KB" }
  ];

  return (
    <div className="h-full flex bg-[#F5F5F7]">
      {/* Main Browser Area */}
      <div className="flex-1 relative bg-gray-900">
        <EmbeddedBrowser onToggleSidebar={() => setAiAssistantOpen(!aiAssistantOpen)} />
      </div>

      {/* Quick Copy Sidebar */}
      <div className={`${aiAssistantOpen ? 'w-96' : 'w-0'} transition-all duration-300 bg-white border-l border-gray-200 flex flex-col relative`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Quick Copy
          </h3>
          <button onClick={() => setAiAssistantOpen(false)} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
          {/* Personal Info */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Personal
            </div>
            <div className="space-y-2">
              {sampleApplicationData && Object.entries(sampleApplicationData.personalInfo).map(([key, value]) => (
                <div key={key} className="w-full flex gap-2">
                  <button
                    onClick={() => copyData(value, key)}
                    className="flex-1 flex justify-between items-center p-3 text-left bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl transition-all group"
                  >
                    <span className="text-sm font-medium text-gray-600 truncate">{value}</span>
                    <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => pasteData(value, key)}
                    className="p-3 bg-blue-50 border border-blue-100 hover:border-blue-300 hover:bg-blue-100 rounded-xl transition-all group"
                    title="Paste to browser"
                  >
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Info */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Academic
            </div>
            <div className="space-y-2">
              {sampleApplicationData && Object.entries(sampleApplicationData.academicInfo).map(([key, value]) => (
                <div key={key} className="w-full flex gap-2">
                  <button
                    onClick={() => copyData(value, key)}
                    className="flex-1 flex justify-between items-center p-3 text-left bg-gray-50 border border-gray-100 hover:border-green-200 hover:bg-green-50/50 rounded-xl transition-all group"
                  >
                    <span className="text-sm font-medium text-gray-600 truncate">{value}</span>
                    <svg className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => pasteData(value, key)}
                    className="p-3 bg-green-50 border border-green-100 hover:border-green-300 hover:bg-green-100 rounded-xl transition-all group"
                    title="Paste to browser"
                  >
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Documents
            </div>
            <div className="space-y-2">
              {sampleDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-purple-50 border border-purple-100 rounded-xl cursor-grab active:cursor-grabbing hover:bg-purple-100/50 transition-colors group"
                  draggable
                  onDragStart={(e) => {
                    e.preventDefault();
                    if (window.electron?.startDrag) {
                      window.electron.startDrag(doc.name);
                    }
                  }}
                  onClick={() => copyData(doc.name, doc.type)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-600 truncate">{doc.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copy Feedback Toast */}
      {copyFeedback && (
        <div className="fixed top-6 right-6 bg-white/90 backdrop-blur-xl text-gray-900 px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center space-x-3 border border-gray-200 animate-fade-in-down">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-medium">{copyFeedback} copied!</span>
        </div>
      )}
    </div>
  );
};

export default PremiumBrowser;