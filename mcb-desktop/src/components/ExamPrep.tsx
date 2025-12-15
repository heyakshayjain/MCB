import React, { useState } from 'react';
import { BookOpen, Clock, Target, CheckCircle, AlertCircle, TrendingUp, Award, Calendar, Brain, FileText } from 'lucide-react';

interface Exam {
  id: string;
  name: string;
  fullName: string;
  conductedBy: string;
  examDate: string;
  applicationPeriod: string;
  eligibility: string;
  pattern: {
    subjects: string[];
    totalQuestions: number;
    duration: string;
    marking: string;
  };
  syllabus: {
    physics: string[];
    chemistry: string[];
    mathematics: string[];
  };
  preparationStrategy: {
    phase: string;
    duration: string;
    focus: string[];
  }[];
  importantTopics: {
    subject: string;
    topics: string[];
  }[];
  resources: {
    books: string[];
    onlinePlatforms: string[];
    mockTests: string[];
  };
  cutoffTrend: string;
  tips: string[];
}

const ExamPrep: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'strategy' | 'resources'>('overview');

  const exams: Exam[] = [
    {
      id: 'jee-main',
      name: 'JEE Main',
      fullName: 'Joint Entrance Examination - Main',
      conductedBy: 'National Testing Agency (NTA)',
      examDate: 'January & April 2026',
      applicationPeriod: 'November 2025 - December 2025',
      eligibility: '75% in Class 12 (or top 20 percentile), Age: No limit',
      pattern: {
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        totalQuestions: 90,
        duration: '3 hours',
        marking: '+4 for correct, -1 for incorrect'
      },
      syllabus: {
        physics: ['Mechanics', 'Thermodynamics', 'Electrodynamics', 'Optics', 'Modern Physics', 'Waves', 'SHM'],
        chemistry: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Coordination Compounds', 'Electrochemistry'],
        mathematics: ['Calculus', 'Algebra', 'Trigonometry', 'Coordinate Geometry', 'Vectors', '3D Geometry', 'Probability']
      },
      preparationStrategy: [
        {
          phase: 'Foundation (6-8 months before)',
          duration: '6-8 months',
          focus: ['Complete NCERT thoroughly', 'Understand basic concepts', 'Build strong foundation', 'Start with easy problems', 'Make notes of formulas']
        },
        {
          phase: 'Intensive Prep (3-5 months before)',
          duration: '3-5 months',
          focus: ['Solve previous year papers', 'Practice numerical problems', 'Speed and accuracy drills', 'Identify weak areas', 'Regular mock tests']
        },
        {
          phase: 'Revision (1-2 months before)',
          duration: '1-2 months',
          focus: ['Revise formulas daily', 'Solve sample papers', '3-4 mock tests per week', 'Short notes revision', 'Time management practice']
        },
        {
          phase: 'Final Week',
          duration: '1 week',
          focus: ['Light revision only', 'Formula sheets review', 'Stay calm and positive', 'Maintain health', 'No new topics']
        }
      ],
      importantTopics: [
        {
          subject: 'Physics',
          topics: ['Rotational Motion', 'Current Electricity', 'Electrostatics', 'Magnetic Effects', 'Ray Optics', 'Modern Physics', 'Thermodynamics']
        },
        {
          subject: 'Chemistry',
          topics: ['Mole Concept', 'Equilibrium', 'Thermodynamics', 'Organic Reactions', 'Electrochemistry', 'Coordination Chemistry', 'Periodic Properties']
        },
        {
          subject: 'Mathematics',
          topics: ['Calculus', 'Coordinate Geometry', 'Algebra', 'Vectors & 3D', 'Probability', 'Trigonometry', 'Sequences & Series']
        }
      ],
      resources: {
        books: ['NCERT Physics, Chemistry, Maths (Class 11 & 12)', 'HC Verma (Physics)', 'OP Tandon (Chemistry)', 'RD Sharma (Mathematics)', 'Cengage (All subjects)', 'Previous 20 years papers'],
        onlinePlatforms: ['Khan Academy', 'Unacademy JEE', 'Physics Wallah', 'Vedantu', 'Embibe', 'Doubtnut'],
        mockTests: ['NTA Abhyas App', 'Allen Test Series', 'Resonance RANKUP', 'Aakash ATS', 'FIITJEE AITS']
      },
      cutoffTrend: 'JEE Main: 89-90 percentile for NIT, 95+ for top NITs. Varies by state quota.',
      tips: [
        'NCERT is the Bible - master it completely',
        'Solve at least 5000+ problems before exam',
        'Attempt 30-40 full-length mock tests',
        'Analyze every mock test thoroughly',
        'Focus on accuracy over speed initially',
        'Maintain error log and revise regularly',
        'Sleep 7-8 hours daily, especially near exam'
      ]
    },
    {
      id: 'jee-advanced',
      name: 'JEE Advanced',
      fullName: 'Joint Entrance Examination - Advanced',
      conductedBy: 'IIT (Rotating)',
      examDate: 'May 2026',
      applicationPeriod: 'April 2026 - May 2026',
      eligibility: 'Top 2.5 lakh in JEE Main, 75% in Class 12',
      pattern: {
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        totalQuestions: 54,
        duration: '6 hours (2 papers × 3 hours)',
        marking: 'Partial marking, varies by question type'
      },
      syllabus: {
        physics: ['Advanced Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics & Modern Physics', 'Fluid Mechanics', 'Nuclear Physics'],
        chemistry: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Chemical Kinetics', 'Quantum Chemistry'],
        mathematics: ['Calculus', 'Linear Algebra', 'Coordinate Geometry', 'Algebra', 'Trigonometry', 'Vectors & 3D', 'Complex Numbers']
      },
      preparationStrategy: [
        {
          phase: 'Post JEE Main',
          duration: '1.5 months',
          focus: ['Shift to advanced level problems', 'Deep conceptual understanding', 'Multiple solution approaches', 'Previous JEE Advanced papers', 'IIT-level problem solving']
        },
        {
          phase: 'Intensive Practice',
          duration: '3-4 weeks',
          focus: ['Advanced mock tests daily', 'Paper 1 & 2 pattern practice', 'Time management between papers', 'Solve archival problems', 'Focus on weak chapters']
        },
        {
          phase: 'Final Revision',
          duration: '2 weeks',
          focus: ['Quick revision techniques', 'Formula sheets', 'Important reactions (Chemistry)', 'Common tricks and shortcuts', 'Mental stamina building']
        }
      ],
      importantTopics: [
        {
          subject: 'Physics',
          topics: ['Mechanics (highest weightage)', 'Electrodynamics', 'Thermodynamics', 'Modern Physics', 'Optics', 'Fluid Mechanics']
        },
        {
          subject: 'Chemistry',
          topics: ['Organic Chemistry (40%)', 'Physical Chemistry', 'Inorganic Chemistry', 'Chemical Bonding', 'Coordination Compounds']
        },
        {
          subject: 'Mathematics',
          topics: ['Calculus (25%)', 'Algebra', 'Coordinate Geometry', 'Vectors & 3D', 'Trigonometry', 'Probability']
        }
      ],
      resources: {
        books: ['Problems in General Physics - IE Irodov', 'Advanced Problems in Physics - SS Krotov', 'Problems in Physical Chemistry - P Bahadur', 'Advanced Problems in Mathematics - Vikas Gupta', 'Previous 30 years JEE Advanced papers'],
        onlinePlatforms: ['Unacademy Plus (IIT batch)', 'Vedantu Master Classes', 'ALLEN Online Advanced', 'FIITJEE Online', 'Physics Galaxy'],
        mockTests: ['ALLEN ASAT', 'FIITJEE AITS', 'Resonance AIOT', 'Unacademy Test Series', 'Mathongo Advanced']
      },
      cutoffTrend: 'Opening rank IIT Bombay CSE: 10-90, Closing rank varies by branch and category',
      tips: [
        'JEE Advanced tests concepts, not just problem-solving',
        'One mistake can cost the question - be very careful',
        'Manage time between Paper 1 and Paper 2',
        'Don\'t get stuck on one question - move on',
        'Practice with timer to build pressure handling',
        'Read questions 2-3 times carefully',
        'Use elimination in multiple correct questions'
      ]
    },
    {
      id: 'bitsat',
      name: 'BITSAT',
      fullName: 'Birla Institute of Technology and Science Admission Test',
      conductedBy: 'BITS Pilani',
      examDate: 'May - June 2026',
      applicationPeriod: 'January 2026 - March 2026',
      eligibility: '75% aggregate in PCM in Class 12',
      pattern: {
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'],
        totalQuestions: 150,
        duration: '3 hours',
        marking: '+3 for correct, -1 for incorrect'
      },
      syllabus: {
        physics: ['Mechanics', 'Electrodynamics', 'Thermodynamics', 'Optics', 'Modern Physics', 'Waves'],
        chemistry: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Environmental Chemistry'],
        mathematics: ['Calculus', 'Algebra', 'Trigonometry', 'Coordinate Geometry', 'Vectors', 'Statistics', 'Probability']
      },
      preparationStrategy: [
        {
          phase: 'NCERT + Board Prep',
          duration: '4-6 months',
          focus: ['NCERT thoroughly (Class 11-12)', 'Board exam preparation', 'Basic problem solving', 'English proficiency', 'Logical reasoning practice']
        },
        {
          phase: 'Speed Building',
          duration: '2-3 months',
          focus: ['Time-based practice', '150 questions in 180 minutes', 'English and reasoning daily', 'Previous year papers', 'BITSAT specific topics']
        },
        {
          phase: 'Mock Tests',
          duration: '1 month',
          focus: ['Daily full-length tests', 'Computer-based test practice', 'Speed and accuracy balance', 'Revision of weak areas', 'Bonus questions practice']
        }
      ],
      importantTopics: [
        {
          subject: 'Physics',
          topics: ['Current Electricity', 'Ray Optics', 'Modern Physics', 'Mechanics', 'Electrostatics', 'Magnetism']
        },
        {
          subject: 'Chemistry',
          topics: ['Organic Chemistry', 'Chemical Bonding', 'Thermodynamics', 'Equilibrium', 'Coordination Chemistry']
        },
        {
          subject: 'Mathematics',
          topics: ['Calculus', 'Matrices', 'Trigonometry', 'Coordinate Geometry', 'Probability', 'Vectors']
        }
      ],
      resources: {
        books: ['NCERT (All subjects)', 'BITSAT previous years papers', 'Arihant BITSAT Guide', 'Disha BITSAT books', 'Speed Mathematics by M Tyra'],
        onlinePlatforms: ['BITSadmission.com (official)', 'Embibe BITSAT', 'Careers360 BITSAT', 'Gradeup', 'TestBook'],
        mockTests: ['ALLEN BITSAT Test Series', 'Motion BITSAT Mocks', 'FIITJEE BITSAT Tests', 'Embibe Mock Tests', 'Official BITS Mock Test']
      },
      cutoffTrend: 'BITS Pilani CSE: 350+, Goa CSE: 320+, Hyderabad CSE: 330+ (out of 390)',
      tips: [
        'Speed is crucial - aim for 40-45 seconds per question',
        'NCERT is enough for 80% of the exam',
        'Attempt English and Logical Reasoning first (easy scoring)',
        'Don\'t skip - attempt all questions strategically',
        'Practice on computer screen extensively',
        'Bonus 12 questions can boost score significantly',
        'Stay calm - computer-based test can be intimidating first time'
      ]
    },
    {
      id: 'viteee',
      name: 'VITEEE',
      fullName: 'VIT Engineering Entrance Examination',
      conductedBy: 'Vellore Institute of Technology',
      examDate: 'April - May 2026',
      applicationPeriod: 'November 2025 - February 2026',
      eligibility: '60% aggregate in PCM/PCB in Class 12',
      pattern: {
        subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Aptitude'],
        totalQuestions: 125,
        duration: '2 hours 30 minutes',
        marking: '+1 for correct, no negative marking'
      },
      syllabus: {
        physics: ['Laws of Motion', 'Current Electricity', 'Optics', 'Thermodynamics', 'Electrostatics', 'Modern Physics'],
        chemistry: ['Coordination Chemistry', 'Organic Chemistry', 'Electrochemistry', 'Chemical Kinetics', 'Thermodynamics'],
        mathematics: ['Calculus', 'Matrices', 'Vectors', 'Probability', 'Differential Equations', 'Analytical Geometry']
      },
      preparationStrategy: [
        {
          phase: 'Foundation',
          duration: '3-4 months',
          focus: ['NCERT completion', 'Basic concepts clarity', 'Chapter-wise practice', 'English grammar basics', 'Aptitude daily practice']
        },
        {
          phase: 'Practice Phase',
          duration: '2 months',
          focus: ['Previous year papers', 'Sample papers', 'Speed building', 'Aptitude reasoning', 'All subjects equally']
        },
        {
          phase: 'Final Prep',
          duration: '1 month',
          focus: ['Mock tests (no negative)', 'Attempt all questions strategy', 'Quick revision', 'Time management', 'Confidence building']
        }
      ],
      importantTopics: [
        {
          subject: 'Physics',
          topics: ['Current Electricity', 'Optics', 'Electromagnetic Induction', 'Thermodynamics', 'Electrostatics']
        },
        {
          subject: 'Chemistry',
          topics: ['Coordination Chemistry', 'Organic Reactions', 'Chemical Equilibrium', 'Electrochemistry']
        },
        {
          subject: 'Mathematics',
          topics: ['Calculus', 'Matrices & Determinants', 'Vectors', 'Probability', 'Analytical Geometry']
        }
      ],
      resources: {
        books: ['NCERT (Class 11-12)', 'VITEEE previous years papers', 'Arihant VITEEE Guide', 'MTG VITEEE book', 'Wren & Martin (English)'],
        onlinePlatforms: ['VIT official website', 'Embibe VITEEE', 'Vedantu VITEEE', 'Unacademy', 'Gradeup'],
        mockTests: ['VIT Mock Test (official)', 'Embibe Test Series', 'Careers360 Mocks', 'Motion Test Series', 'Allen VITEEE Tests']
      },
      cutoffTrend: 'VIT Vellore CSE: 50k-80k rank, VIT Chennai: 80k-1.5L, Cut-off varies by category',
      tips: [
        'No negative marking - attempt ALL questions',
        'NCERT is sufficient for good rank',
        'Don\'t spend too much time on one question',
        'English is easy scoring - don\'t skip',
        'Aptitude needs daily 30-min practice',
        'Computer-based test - practice online mocks',
        'Rank under 50k for CSE in Vellore campus'
      ]
    },
    {
      id: 'srmjeee',
      name: 'SRMJEEE',
      fullName: 'SRM Joint Engineering Entrance Examination',
      conductedBy: 'SRM Institute of Science and Technology',
      examDate: 'April - May 2026',
      applicationPeriod: 'December 2025 - March 2026',
      eligibility: '60% aggregate in PCM in Class 12',
      pattern: {
        subjects: ['Physics', 'Chemistry', 'Mathematics/Biology', 'Aptitude'],
        totalQuestions: 125,
        duration: '2 hours 30 minutes',
        marking: '+1 for correct, no negative marking'
      },
      syllabus: {
        physics: ['Kinematics', 'Current Electricity', 'Optics', 'Modern Physics', 'Thermodynamics', 'Electrostatics'],
        chemistry: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Mole Concept', 'Chemical Bonding'],
        mathematics: ['Calculus', 'Algebra', 'Trigonometry', 'Coordinate Geometry', 'Vectors', 'Matrices', 'Probability']
      },
      preparationStrategy: [
        {
          phase: 'Basic Preparation',
          duration: '3-4 months',
          focus: ['NCERT thoroughly', 'Chapter-wise notes', 'Basic problems', 'Aptitude practice', 'Previous year analysis']
        },
        {
          phase: 'Intensive Practice',
          duration: '2 months',
          focus: ['Previous year papers', 'Sample question papers', 'Aptitude daily', 'Mock tests weekly', 'Weak area focus']
        },
        {
          phase: 'Final Sprint',
          duration: '3-4 weeks',
          focus: ['Mock tests (CBT mode)', 'Quick revision', 'Formula sheets', 'Attempt all questions practice', 'Time management']
        }
      ],
      importantTopics: [
        {
          subject: 'Physics',
          topics: ['Current Electricity', 'Optics', 'Electromagnetic Induction', 'Modern Physics', 'Kinematics']
        },
        {
          subject: 'Chemistry',
          topics: ['Organic Chemistry', 'Chemical Bonding', 'Mole Concept', 'Periodic Properties', 'Coordination Chemistry']
        },
        {
          subject: 'Mathematics',
          topics: ['Calculus', 'Coordinate Geometry', 'Matrices', 'Trigonometry', 'Vectors', 'Probability']
        }
      ],
      resources: {
        books: ['NCERT (Class 11-12)', 'SRMJEEE previous years', 'Arihant Engineering Entrance', 'MTG SRMJEEE Guide', 'RS Aggarwal Aptitude'],
        onlinePlatforms: ['SRM official website', 'Embibe', 'Vedantu', 'Gradeup', 'TestBook'],
        mockTests: ['SRM Mock Test (official)', 'Embibe Test Series', 'Careers360 Mocks', 'Motion Tests', 'Allen SRMJEEE Series']
      },
      cutoffTrend: 'SRM Main Campus CSE: Rank under 20k preferred. Category-wise variation exists.',
      tips: [
        'No negative marking - attempt every question',
        'NCERT + Previous years = Success formula',
        'Aptitude section is scoring - practice daily',
        'Time management crucial - don\'t overthink',
        'Computer-based test - get comfortable with CBT',
        'Main campus preference needs good rank',
        'Board marks also matter for admission'
      ]
    },
    {
      id: 'comedk',
      name: 'COMEDK',
      fullName: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka',
      conductedBy: 'COMEDK',
      examDate: 'May 2026',
      applicationPeriod: 'January 2026 - April 2026',
      eligibility: '45% aggregate in PCM in Class 12',
      pattern: {
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        totalQuestions: 180,
        duration: '3 hours',
        marking: '+1 for correct, no negative marking'
      },
      syllabus: {
        physics: ['Mechanics', 'Heat & Thermodynamics', 'Electricity & Magnetism', 'Optics', 'Modern Physics', 'Waves'],
        chemistry: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Atomic Structure', 'Chemical Bonding'],
        mathematics: ['Calculus', 'Algebra', 'Coordinate Geometry', 'Trigonometry', 'Vectors', '3D Geometry', 'Statistics']
      },
      preparationStrategy: [
        {
          phase: 'Foundation Building',
          duration: '4-5 months',
          focus: ['NCERT + PUC syllabus', 'Concept clarity', 'Problem-solving skills', 'Chapter-wise tests', 'Karnataka board focus']
        },
        {
          phase: 'Practice Phase',
          duration: '2-3 months',
          focus: ['Previous 10 years papers', 'Speed practice (60 seconds/question)', 'All questions strategy', 'Mock tests', 'Weak topics revision']
        },
        {
          phase: 'Final Preparation',
          duration: '1 month',
          focus: ['Daily mock tests', 'Formula revision', 'Quick solving techniques', 'Confidence building', 'Stay healthy']
        }
      ],
      importantTopics: [
        {
          subject: 'Physics',
          topics: ['Mechanics', 'Current Electricity', 'Magnetism', 'Optics', 'Modern Physics', 'Thermodynamics']
        },
        {
          subject: 'Chemistry',
          topics: ['Organic Chemistry', 'Mole Concept', 'Equilibrium', 'Coordination Chemistry', 'Electrochemistry']
        },
        {
          subject: 'Mathematics',
          topics: ['Calculus', 'Coordinate Geometry', 'Trigonometry', 'Algebra', 'Vectors & 3D', 'Probability']
        }
      ],
      resources: {
        books: ['NCERT & Karnataka PUC textbooks', 'COMEDK previous years papers', 'MTG COMEDK Guide', 'Arihant COMEDK book', 'Karnataka state board books'],
        onlinePlatforms: ['COMEDK official website', 'Embibe COMEDK', 'Vedantu', 'Unacademy', 'Testbook'],
        mockTests: ['ALLEN COMEDK Series', 'Motion Test Series', 'Embibe Mocks', 'BASE Mock Tests', 'Official COMEDK Practice']
      },
      cutoffTrend: 'RV College CSE: Rank under 500, PES CSE: Rank under 1000. Varies by college.',
      tips: [
        'No negative marking - attempt all 180 questions',
        'Speed is key - 60 seconds per question',
        'Karnataka PUC syllabus is slightly different - check it',
        'Previous year papers pattern repeats often',
        'Focus on accuracy first, then speed',
        'Computer-based test - practice CBT mocks',
        'Top colleges in Bangalore need rank under 2000'
      ]
    }
  ];

  const selectedExamData = exams.find(exam => exam.id === selectedExam);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Exam Preparation Guide</h1>
              <p className="text-gray-600">Complete preparation strategies for engineering entrance exams</p>
            </div>
            <div className="bg-blue-500 rounded-2xl p-4 shadow-sm">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {!selectedExam ? (
          /* Exam Cards Grid */
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Target Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => setSelectedExam(exam.id)}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{exam.name}</h3>
                      <p className="text-sm text-gray-600">{exam.fullName}</p>
                    </div>
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Award className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{exam.conductedBy}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{exam.examDate}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{exam.pattern.duration}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Questions</span>
                      <span className="font-semibold text-gray-900">{exam.pattern.totalQuestions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* General Tips */}
            <div className="mt-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-blue-600" />
                General Exam Preparation Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Do's
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Start preparation at least 1 year before exam</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Follow a fixed daily study schedule</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Take regular mock tests and analyze them</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Maintain health - sleep 7-8 hours daily</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Make concise notes and revision sheets</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-gray-600" />
                    Don'ts
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">✗</span>
                      <span>Don't study for long hours without breaks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">✗</span>
                      <span>Avoid comparing yourself with peers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">✗</span>
                      <span>Don't learn new topics in the last week</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">✗</span>
                      <span>Never skip mock tests - they're crucial</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-600 mr-2">✗</span>
                      <span>Don't neglect board exam preparation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Detailed Exam View */
          <div>
            <button
              onClick={() => setSelectedExam(null)}
              className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              ← Back to all exams
            </button>

            {/* Exam Header */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">{selectedExamData?.name}</h2>
                  <p className="text-xl text-gray-600 mb-4">{selectedExamData?.fullName}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
                      {selectedExamData?.conductedBy}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold">
                      {selectedExamData?.examDate}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-4">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Questions</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedExamData?.pattern.totalQuestions}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Duration</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedExamData?.pattern.duration}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Subjects</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedExamData?.pattern.subjects.length}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Marking</div>
                  <div className="text-sm font-bold text-gray-900">{selectedExamData?.pattern.marking}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden mb-6">
              <div className="flex border-b border-gray-100">
                {(['overview', 'syllabus', 'strategy', 'resources'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Eligibility</h3>
                      <p className="text-gray-700 bg-gray-50 rounded-2xl p-4">{selectedExamData?.eligibility}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Application Period</h3>
                      <p className="text-gray-700 bg-gray-50 rounded-2xl p-4">{selectedExamData?.applicationPeriod}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Exam Pattern</h3>
                      <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subjects:</span>
                          <span className="font-semibold text-gray-900">{selectedExamData?.pattern.subjects.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Questions:</span>
                          <span className="font-semibold text-gray-900">{selectedExamData?.pattern.totalQuestions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold text-gray-900">{selectedExamData?.pattern.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Marking Scheme:</span>
                          <span className="font-semibold text-gray-900">{selectedExamData?.pattern.marking}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Cut-off Trend</h3>
                      <p className="text-gray-700 bg-blue-50 rounded-2xl p-4">{selectedExamData?.cutoffTrend}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Pro Tips</h3>
                      <div className="space-y-3">
                        {selectedExamData?.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-start bg-gray-50 rounded-2xl p-4">
                            <TrendingUp className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Syllabus Tab */}
                {activeTab === 'syllabus' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-blue-600" />
                        Complete Syllabus
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="bg-blue-50 rounded-2xl p-6">
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Physics</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedExamData?.syllabus.physics.map((topic, idx) => (
                              <span key={idx} className="bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-blue-100">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6">
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Chemistry</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedExamData?.syllabus.chemistry.map((topic, idx) => (
                              <span key={idx} className="bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-6">
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Mathematics</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedExamData?.syllabus.mathematics.map((topic, idx) => (
                              <span key={idx} className="bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-blue-100">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">High Weightage Topics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedExamData?.importantTopics.map((item, idx) => (
                          <div key={idx} className="bg-white rounded-2xl p-6 border-2 border-blue-200">
                            <h4 className="font-bold text-gray-900 mb-3">{item.subject}</h4>
                            <ul className="space-y-2">
                              {item.topics.map((topic, topicIdx) => (
                                <li key={topicIdx} className="flex items-start text-sm text-gray-700">
                                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Strategy Tab */}
                {activeTab === 'strategy' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Target className="w-6 h-6 mr-2 text-blue-600" />
                      Phase-wise Preparation Strategy
                    </h3>
                    
                    <div className="space-y-6">
                      {selectedExamData?.preparationStrategy.map((phase, idx) => (
                        <div key={idx} className="border-l-4 border-blue-500 pl-6 pb-6 relative">
                          <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {idx + 1}
                          </div>
                          <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="text-lg font-bold text-gray-900">{phase.phase}</h4>
                              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                {phase.duration}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {phase.focus.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start text-gray-700">
                                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                      Recommended Resources
                    </h3>

                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-2xl p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                          Books
                        </h4>
                        <ul className="space-y-2">
                          {selectedExamData?.resources.books.map((book, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{book}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <Target className="w-5 h-5 mr-2 text-blue-600" />
                          Online Platforms
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedExamData?.resources.onlinePlatforms.map((platform, idx) => (
                            <span key={idx} className="bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-2xl p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-blue-600" />
                          Mock Test Series
                        </h4>
                        <ul className="space-y-2">
                          {selectedExamData?.resources.mockTests.map((test, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{test}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPrep;
