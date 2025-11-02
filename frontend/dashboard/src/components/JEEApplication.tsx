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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
              activeStep === 0 ? 'bg-blue-600' :
              activeStep === 1 ? 'bg-green-600' :
              activeStep === 2 ? 'bg-purple-600' :
              activeStep === 3 ? 'bg-orange-600' :
              activeStep === 4 ? 'bg-red-600' : 'bg-teal-600'
            }`}>
              {activeStep + 1}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{applicationSteps[activeStep].title}</h1>
              <p className="text-gray-600">{applicationSteps[activeStep].description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-teal-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((activeStep + 1) / applicationSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-600">Step {activeStep + 1} of {applicationSteps.length}</span>
            <button
              onClick={() => setActiveStep(Math.min(applicationSteps.length - 1, activeStep + 1))}
              disabled={activeStep === applicationSteps.length - 1}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Instructions
          </h2>
          <div className="space-y-3">
            {applicationSteps[activeStep].instructions.map((instruction, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-teal-600 font-medium text-sm">{idx + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            ⚠️ Common Mistakes to Avoid
          </h2>
          <div className="space-y-2">
            {applicationSteps[activeStep].commonMistakes.map((mistake, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-red-600 mt-1">❌</span>
                <p className="text-red-700">{mistake}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Copy Data */}
        {applicationSteps[activeStep].prefilledData && applicationSteps[activeStep].prefilledData!.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              Quick Copy Data
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applicationSteps[activeStep].prefilledData!.map((data, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{data.label}</span>
                    <button
                      onClick={() => copyToClipboard(data.value)}
                      className="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors"
                    >
                      {data.copyAction}
                    </button>
                  </div>
                  <div className="text-sm font-mono bg-gray-100 p-2 rounded border">
                    {data.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://jeemain.nta.nic.in/', '_blank')}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Open NTA Website to Apply
            </button>
            <button
              onClick={() => window.open('/jee-application', '_blank')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Open Application Assistant
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Keep this guide open while you fill the application form
          </p>
        </div>
      </div>
    </div>
  );
};

export default JEEApplication;