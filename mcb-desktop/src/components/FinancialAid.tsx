import React, { useState } from 'react';
import { Calculator, Search, Award, TrendingUp, ExternalLink, Calendar, FileText, IndianRupee } from 'lucide-react';

interface Scholarship {
  id: number;
  name: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  type: 'Merit' | 'Need-Based' | 'Category-Based' | 'State-Specific' | 'Field-Specific';
  status: 'Open' | 'Closing Soon' | 'Closed';
  provider: string;
  url: string;
  requirements: string[];
}

interface FinancialAidEstimate {
  school: string;
  tuition: number;
  roomBoard: number;
  fees: number;
  total: number;
  estimatedGrant: number;
  estimatedLoan: number;
  expectedContribution: number;
  netCost: number;
}

const FinancialAid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'scholarships' | 'estimates'>('calculator');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  // Calculator State
  const [familyIncome, setFamilyIncome] = useState<number>(500000);
  const [assets, setAssets] = useState<number>(200000);
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [jeePercentile, setJeePercentile] = useState<number>(99.5);
  const [classXII, setClassXII] = useState<number>(92);

  // Indian Engineering Scholarships Data
  const scholarships: Scholarship[] = [
    {
      id: 1,
      name: 'INSPIRE Scholarship (DST)',
      amount: '₹80,000/year',
      deadline: '2026-07-31',
      eligibility: ['Top 1% in Class XII Board', 'Pursuing BSc/MSc/Integrated courses', 'Age under 27'],
      type: 'Merit',
      status: 'Open',
      provider: 'Department of Science & Technology',
      url: 'https://online-inspire.gov.in',
      requirements: ['Class XII Marksheet', 'Admission Proof', 'Bank Account', 'Aadhar Card']
    },
    {
      id: 2,
      name: 'Central Sector Scheme',
      amount: '₹10,000-₹20,000/year',
      deadline: '2026-10-31',
      eligibility: ['Family Income < ₹4.5L', 'Passed Class XII', 'Indian Citizen'],
      type: 'Need-Based',
      status: 'Open',
      provider: 'Ministry of Education',
      url: 'https://scholarships.gov.in',
      requirements: ['Income Certificate', 'Domicile Certificate', 'Bank Details', 'Class XII Certificate']
    },
    {
      id: 3,
      name: 'JEE Main Fee Waiver',
      amount: 'Full Fee Waiver',
      deadline: '2026-01-15',
      eligibility: ['General/OBC-NCL with Family Income < ₹1L', 'SC/ST/PwD candidates', 'Transgender candidates'],
      type: 'Category-Based',
      status: 'Open',
      provider: 'National Testing Agency',
      url: 'https://jeemain.nta.nic.in',
      requirements: ['Income Certificate', 'Category Certificate', 'JEE Application Form']
    },
    {
      id: 4,
      name: 'AICTE-INAE Distinguished Visiting Professorship',
      amount: '₹1,00,000',
      deadline: '2026-03-31',
      eligibility: ['Engineering students', 'Outstanding academic performance', 'Research interest'],
      type: 'Merit',
      status: 'Open',
      provider: 'AICTE',
      url: 'https://www.aicte-india.org',
      requirements: ['Academic Transcripts', 'Research Proposal', 'Recommendation Letters']
    },
    {
      id: 5,
      name: 'SC/ST Pre-Matric Scholarship',
      amount: '₹6,000-₹12,000/year',
      deadline: '2026-12-31',
      eligibility: ['SC/ST Category', 'Class IX-X students', 'Family Income < ₹2.5L'],
      type: 'Category-Based',
      status: 'Open',
      provider: 'Ministry of Social Justice',
      url: 'https://scholarships.gov.in',
      requirements: ['Caste Certificate', 'Income Certificate', 'Previous Year Marksheet', 'Bank Passbook']
    },
    {
      id: 6,
      name: 'OBC Post-Matric Scholarship',
      amount: '₹5,000-₹20,000/year',
      deadline: '2026-11-30',
      eligibility: ['OBC-NCL Category', 'Family Income < ₹1L', 'Pursuing higher education'],
      type: 'Category-Based',
      status: 'Open',
      provider: 'Ministry of Social Justice',
      url: 'https://scholarships.gov.in',
      requirements: ['OBC-NCL Certificate', 'Income Certificate', 'Admission Proof', 'Fee Receipt']
    },
    {
      id: 7,
      name: 'KVPY Fellowship',
      amount: '₹5,000-₹7,000/month + Annual Grant',
      deadline: '2026-09-15',
      eligibility: ['Class XI to PhD students', 'Science stream', 'Pass KVPY exam'],
      type: 'Merit',
      status: 'Open',
      provider: 'Department of Science & Technology',
      url: 'https://kvpy.iisc.ernet.in',
      requirements: ['KVPY Registration', 'Academic Records', 'Research Interest Statement']
    },
    {
      id: 8,
      name: 'Sitaram Jindal Foundation Scholarship',
      amount: '₹20,000-₹2,00,000',
      deadline: '2026-06-30',
      eligibility: ['Engineering/Medical students', 'Financial need', 'Academic merit > 60%'],
      type: 'Need-Based',
      status: 'Open',
      provider: 'Sitaram Jindal Foundation',
      url: 'https://www.sitaramjindalfoundation.org',
      requirements: ['Income Certificate', 'Academic Transcripts', 'Admission Letter', 'Essay']
    },
    {
      id: 9,
      name: 'Tata Scholarship for Private Schools',
      amount: '₹10,000-₹1,50,000',
      deadline: '2026-05-31',
      eligibility: ['Class VI-XII students', 'Family Income < ₹4L', 'Academic performance'],
      type: 'Need-Based',
      status: 'Open',
      provider: 'Tata Trusts',
      url: 'https://www.tatatrusts.org',
      requirements: ['Income Certificate', 'School ID', 'Fee Structure', 'Academic Report']
    },
    {
      id: 10,
      name: 'Merit-cum-Means Scholarship (MCM)',
      amount: '₹3,000/year (Day Scholar), ₹5,000/year (Hosteller)',
      deadline: '2026-12-15',
      eligibility: ['Family Income < ₹6L', 'Minority Community', 'Passed previous exam'],
      type: 'Need-Based',
      status: 'Open',
      provider: 'Ministry of Minority Affairs',
      url: 'https://scholarships.gov.in',
      requirements: ['Income Certificate', 'Minority Certificate', 'Previous Year Marksheet', 'Fee Receipt']
    },
    {
      id: 11,
      name: 'PM Scholarship Scheme',
      amount: '₹25,000-₹30,000/year',
      deadline: '2026-08-31',
      eligibility: ['Children of Armed Forces', 'Coast Guard personnel', '60% in Class XII'],
      type: 'Category-Based',
      status: 'Open',
      provider: 'Ministry of Defence',
      url: 'https://ksb.gov.in',
      requirements: ['Service Certificate', 'Class XII Marksheet', 'Discharge Certificate', 'Bank Details']
    },
    {
      id: 12,
      name: 'Pragati Scholarship for Girls',
      amount: '₹50,000/year (₹30,000 tuition + ₹20,000 books)',
      deadline: '2026-02-28',
      eligibility: ['Girl students', 'Technical degree courses', 'Family Income < ₹8L', 'Not availing other scholarships'],
      type: 'Category-Based',
      status: 'Closing Soon',
      provider: 'AICTE',
      url: 'https://www.aicte-india.org',
      requirements: ['Income Certificate', 'Admission Letter', 'Previous Year Marksheet', 'Fee Receipt']
    },
    {
      id: 13,
      name: 'Saksham Scholarship for Differently Abled',
      amount: '₹50,000/year',
      deadline: '2026-02-28',
      eligibility: ['Differently abled students', 'Technical degree', 'Family Income < ₹8L', '40% disability certificate'],
      type: 'Category-Based',
      status: 'Closing Soon',
      provider: 'AICTE',
      url: 'https://www.aicte-india.org',
      requirements: ['Disability Certificate', 'Income Certificate', 'Admission Proof', 'Medical Certificate']
    },
    {
      id: 14,
      name: 'Swami Vivekananda Merit-cum-Means Scholarship',
      amount: '₹50,000/year',
      deadline: '2026-09-30',
      eligibility: ['West Bengal students', 'Engineering/Medical/Pure Science', 'Family Income < ₹2.5L', '75% in HS'],
      type: 'State-Specific',
      status: 'Open',
      provider: 'Govt of West Bengal',
      url: 'https://svmcm.wbhed.gov.in',
      requirements: ['Income Certificate', 'Domicile Certificate', 'HS Marksheet', 'College ID']
    },
    {
      id: 15,
      name: 'EduFund Merit Scholarship',
      amount: '₹25,000-₹1,00,000',
      deadline: '2026-04-30',
      eligibility: ['Class X-XII and College students', 'Academic merit', 'Financial need'],
      type: 'Merit',
      status: 'Open',
      provider: 'EduFund',
      url: 'https://www.edufund.in',
      requirements: ['Academic Transcripts', 'Income Certificate', 'Statement of Purpose', 'Fee Structure']
    }
  ];

  // Financial Aid Estimates for Indian Engineering Colleges
  const financialEstimates: FinancialAidEstimate[] = [
    {
      school: 'IIT Bombay',
      tuition: 200000,
      roomBoard: 50000,
      fees: 10000,
      total: 260000,
      estimatedGrant: 150000,
      estimatedLoan: 50000,
      expectedContribution: 40000,
      netCost: 60000
    },
    {
      school: 'BITS Pilani',
      tuition: 450000,
      roomBoard: 80000,
      fees: 20000,
      total: 550000,
      estimatedGrant: 200000,
      estimatedLoan: 100000,
      expectedContribution: 150000,
      netCost: 250000
    },
    {
      school: 'VIT Vellore',
      tuition: 198000,
      roomBoard: 70000,
      fees: 15000,
      total: 283000,
      estimatedGrant: 80000,
      estimatedLoan: 80000,
      expectedContribution: 100000,
      netCost: 123000
    }
  ];

  // Calculate EFC (Expected Family Contribution) - Adapted for Indian context
  const calculateEFC = () => {
    const incomeContribution = Math.max(0, (familyIncome - 250000) * 0.15); // ₹2.5L base exemption
    const assetContribution = assets * 0.10;
    const householdAdjustment = householdSize * 5000;
    const efc = Math.max(0, incomeContribution + assetContribution - householdAdjustment);
    return Math.round(efc);
  };

  // Calculate Merit Scholarship Potential based on JEE & Class XII
  const calculateMeritPotential = () => {
    let potential = 0;
    if (jeePercentile >= 99.5 && classXII >= 95) potential = 100000;
    else if (jeePercentile >= 98.0 && classXII >= 90) potential = 75000;
    else if (jeePercentile >= 95.0 && classXII >= 85) potential = 50000;
    else if (jeePercentile >= 90.0 && classXII >= 80) potential = 30000;
    else potential = 10000;
    return potential;
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || scholarship.type === filterType;
    return matchesSearch && matchesType;
  });

  const efc = calculateEFC();
  const meritPotential = calculateMeritPotential();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Aid & Scholarships</h1>
              <p className="text-gray-600">Calculate your aid eligibility and discover scholarship opportunities</p>
            </div>
            <div className="bg-blue-500 rounded-2xl p-4 shadow-sm">
              <IndianRupee className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 mb-6 p-2 flex space-x-2">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === 'calculator'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Calculator className="w-5 h-5 inline mr-2" />
            Aid Calculator
          </button>
          <button
            onClick={() => setActiveTab('scholarships')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === 'scholarships'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Award className="w-5 h-5 inline mr-2" />
            Scholarships
          </button>
          <button
            onClick={() => setActiveTab('estimates')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === 'estimates'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            School Estimates
          </button>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Family Annual Income (₹)
                  </label>
                  <input
                    type="number"
                    value={familyIncome}
                    onChange={(e) => setFamilyIncome(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-1">₹{familyIncome.toLocaleString('en-IN')}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Family Assets (₹)
                  </label>
                  <input
                    type="number"
                    value={assets}
                    onChange={(e) => setAssets(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-1">₹{assets.toLocaleString('en-IN')}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Household Size
                  </label>
                  <input
                    type="number"
                    value={householdSize}
                    onChange={(e) => setHouseholdSize(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    JEE Percentile
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={jeePercentile}
                    onChange={(e) => setJeePercentile(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Class XII Percentage
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={classXII}
                    onChange={(e) => setClassXII(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* EFC Card */}
              <div className="bg-blue-500 rounded-3xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Expected Family Contribution (EFC)</h3>
                <div className="text-5xl font-bold mb-2">₹{efc.toLocaleString('en-IN')}</div>
                <p className="text-blue-100">This is what colleges expect your family to contribute annually</p>
              </div>

              {/* Merit Scholarship Potential */}
              <div className="bg-gray-900 rounded-3xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Merit Scholarship Potential</h3>
                <div className="text-5xl font-bold mb-2">₹{meritPotential.toLocaleString('en-IN')}</div>
                <p className="text-gray-100">Estimated merit-based aid per year based on your JEE & Class XII scores</p>
              </div>

              {/* Financial Need */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Need Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Engineering College Cost</span>
                    <span className="text-xl font-bold text-gray-800">₹5,00,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Your EFC</span>
                    <span className="text-xl font-bold text-red-600">-₹{efc.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Merit Aid Potential</span>
                    <span className="text-xl font-bold text-blue-600">-₹{meritPotential.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-gray-800 font-semibold">Estimated Need-Based Aid</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{Math.max(0, 500000 - efc - meritPotential).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scholarships Tab */}
        {activeTab === 'scholarships' && (
          <div>
            {/* Search and Filter */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search scholarships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                  >
                    <option value="All">All Types</option>
                    <option value="Merit">Merit-Based</option>
                    <option value="Need-Based">Need-Based</option>
                    <option value="Category-Based">Category-Based</option>
                    <option value="State-Specific">State-Specific</option>
                    <option value="Field-Specific">Field-Specific</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Scholarship Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredScholarships.map((scholarship) => (
                <div key={scholarship.id} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <div className={`p-4 ${
                    scholarship.status === 'Closing Soon' ? 'bg-red-50' : 'bg-blue-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{scholarship.name}</h3>
                        <p className="text-sm text-gray-600">{scholarship.provider}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        scholarship.status === 'Closing Soon'
                          ? 'bg-gray-900 text-white'
                          : scholarship.status === 'Closed'
                          ? 'bg-gray-400 text-white'
                          : 'bg-blue-500 text-white'
                      }`}>
                        {scholarship.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl font-bold text-blue-600">{scholarship.amount}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          scholarship.type === 'Merit' ? 'bg-gray-100 text-gray-700' :
                          scholarship.type === 'Need-Based' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {scholarship.type}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Eligibility
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {scholarship.eligibility.map((req, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Requirements
                      </h4>
                      <ul className="space-y-1">
                        {scholarship.requirements.map((req, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={scholarship.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* School Estimates Tab */}
        {activeTab === 'estimates' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6">
              <p className="text-gray-600">
                These estimates are based on your financial profile (EFC: ₹{efc.toLocaleString('en-IN')}) and academic stats (JEE Percentile: {jeePercentile}, Class XII: {classXII}%).
                Actual aid packages may vary based on your family income, category, and individual college policies.
              </p>
            </div>

            {financialEstimates.map((estimate, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                <div className="bg-gray-900 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{estimate.school}</h3>
                  <p className="text-blue-100">Financial Aid Estimate for 2025-2026</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cost Breakdown */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Cost of Attendance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tuition & Fees</span>
                          <span className="font-semibold text-gray-900">₹{estimate.tuition.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hostel & Mess</span>
                          <span className="font-semibold text-gray-900">₹{estimate.roomBoard.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Other Fees</span>
                          <span className="font-semibold text-gray-900">₹{estimate.fees.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-200">
                          <span className="font-bold text-gray-900">Total Cost</span>
                          <span className="font-bold text-lg text-gray-900">₹{estimate.total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Aid Breakdown */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Aid Package</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Scholarships & Fee Waivers</span>
                          <span className="font-semibold text-blue-600">-₹{estimate.estimatedGrant.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Education Loans</span>
                          <span className="font-semibold text-gray-600">₹{estimate.estimatedLoan.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected Family Contribution</span>
                          <span className="font-semibold">₹{estimate.expectedContribution.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-200">
                          <span className="font-bold text-gray-800">Net Cost to You</span>
                          <span className="font-bold text-lg text-blue-600">₹{estimate.netCost.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Aid Bar */}
                  <div className="mt-6">
                    <div className="h-12 rounded-lg overflow-hidden flex">
                      <div 
                        className="bg-gray-900 flex items-center justify-center text-white text-sm font-semibold"
                        style={{ width: `${(estimate.estimatedGrant / estimate.total) * 100}%` }}
                      >
                        Scholarships
                      </div>
                      <div 
                        className="bg-blue-500 flex items-center justify-center text-white text-sm font-semibold"
                        style={{ width: `${(estimate.expectedContribution / estimate.total) * 100}%` }}
                      >
                        You Pay
                      </div>
                      <div 
                        className="bg-gray-400 flex items-center justify-center text-white text-sm font-semibold"
                        style={{ width: `${(estimate.estimatedLoan / estimate.total) * 100}%` }}
                      >
                        Loans
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAid;
