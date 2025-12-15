import React, { useState } from 'react';

const JEEApplication: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // JEE Application Steps
  const applicationSteps = [
    {
      id: 'registration',
      title: 'Step 1: Account Registration',
      description: 'Create your JEE Main application account',
      instructions: [
        'Visit the official JEE Main website',
        'Click on "New Registration"',
        'Fill in your basic details',
        'Verify your email and phone number',
        'Create a strong password'
      ],
      commonMistakes: [
        'Using incorrect email format',
        'Weak password',
        'Not verifying contact details'
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
      id: 'personal-details',
      title: 'Step 2: Personal Information',
      description: 'Enter your personal and academic details',
      instructions: [
        'Fill in your full name as per 10th certificate',
        'Enter your date of birth correctly',
        'Select your gender and category',
        'Provide parent/guardian details',
        'Enter your complete address'
      ],
      commonMistakes: [
        'Name spelling different from certificates',
        'Wrong date of birth',
        'Incorrect category selection',
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
      id: 'academic-details',
      title: 'Step 3: Academic Information',
      description: 'Enter your educational background',
      instructions: [
        'Select your board (CBSE/ICSE/State)',
        'Enter school name correctly',
        'Provide year of passing',
        'Enter overall percentage',
        'Upload required documents'
      ],
      commonMistakes: [
        'Wrong board selection',
        'Incorrect school name',
        'Wrong passing year',
        'Document upload failures'
      ],
      prefilledData: [
        {
          label: 'Board',
          value: 'CBSE',
          copyAction: 'Copy Board'
        },
        {
          label: 'School Name',
          value: 'Delhi Public School',
          copyAction: 'Copy School'
        },
        {
          label: 'Year of Passing',
          value: '2025',
          copyAction: 'Copy Year'
        },
        {
          label: 'Percentage',
          value: '95.5%',
          copyAction: 'Copy Percentage'
        }
      ]
    },
    {
      id: 'exam-centers',
      title: 'Step 4: Exam Center Selection',
      description: 'Choose your preferred exam cities',
      instructions: [
        'Select your state',
        'Choose preferred cities',
        'Select multiple options',
        'Review center availability',
        'Confirm your choices'
      ],
      commonMistakes: [
        'Not selecting enough cities',
        'Choosing only metro cities',
        'Not checking center availability'
      ]
    },
    {
      id: 'document-upload',
      title: 'Step 5: Document Upload',
      description: 'Upload required certificates and photos',
      instructions: [
        'Upload passport size photo',
        'Upload signature',
        'Upload 10th certificate',
        'Upload category certificate (if applicable)',
        'Upload ID proof'
      ],
      commonMistakes: [
        'Wrong photo dimensions',
        'Blurry signature',
        'Incorrect file formats',
        'Large file sizes'
      ]
    },
    {
      id: 'payment',
      title: 'Step 6: Fee Payment',
      description: 'Complete the application fee payment',
      instructions: [
        'Review application summary',
        'Select payment method',
        'Enter payment details',
        'Verify payment completion',
        'Download confirmation'
      ],
      commonMistakes: [
        'Payment failures',
        'Wrong payment amount',
        'Not saving transaction ID',
        'Missing confirmation download'
      ]
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-6 mb-8">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ${activeStep === 0 ? 'bg-blue-600 shadow-blue-500/30' :
                activeStep === 1 ? 'bg-green-600 shadow-green-500/30' :
                  activeStep === 2 ? 'bg-purple-600 shadow-purple-500/30' :
                    activeStep === 3 ? 'bg-orange-600 shadow-orange-500/30' :
                      activeStep === 4 ? 'bg-red-600 shadow-red-500/30' : 'bg-gray-900 shadow-gray-500/30'
              }`}>
              {activeStep + 1}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{applicationSteps[activeStep].title}</h1>
              <p className="text-gray-500 font-medium">{applicationSteps[activeStep].description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((activeStep + 1) / applicationSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>
            <span className="text-sm font-medium text-gray-500">Step {activeStep + 1} of {applicationSteps.length}</span>
            <button
              onClick={() => setActiveStep(Math.min(applicationSteps.length - 1, activeStep + 1))}
              disabled={activeStep === applicationSteps.length - 1}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Instructions
          </h2>
          <div className="space-y-4">
            {applicationSteps[activeStep].instructions.map((instruction, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-100 transition-colors">
                  <span className="text-blue-600 font-bold text-sm">{idx + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium pt-1">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-red-50/50 backdrop-blur-sm border border-red-100 rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-3">
            {applicationSteps[activeStep].commonMistakes.map((mistake, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/50 p-3 rounded-xl border border-red-100/50">
                <span className="text-red-500 mt-0.5">❌</span>
                <p className="text-red-700 font-medium">{mistake}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Copy Data */}
        {applicationSteps[activeStep].prefilledData && applicationSteps[activeStep].prefilledData!.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              Quick Copy Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applicationSteps[activeStep].prefilledData!.map((data, idx) => (
                <div key={idx} className="border border-gray-200 rounded-2xl p-5 hover:bg-gray-50 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{data.label}</span>
                    <button
                      onClick={() => copyToClipboard(data.value)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {data.copyAction}
                    </button>
                  </div>
                  <div className="text-lg font-mono font-medium text-gray-900 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {data.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://jeemain.nta.nic.in/', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open NTA Website
            </button>
            <button
              onClick={() => window.open('/jee-application', '_blank')}
              className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Open Assistant
            </button>
          </div>
          <p className="text-center text-sm font-medium text-gray-500 mt-6">
            Keep this guide open while you fill the application form
          </p>
        </div>
      </div>
    </div>
  );
};

export default JEEApplication;