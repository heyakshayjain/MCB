import React, { useState } from 'react';
import { School, MapPin, Users, TrendingUp, Award, CheckCircle, XCircle, Star, Plus, ExternalLink, IndianRupee } from 'lucide-react';

interface SchoolData {
  id: number;
  name: string;
  location: string;
  logo: string;
  ranking: number;
  acceptance_rate: number;
  tuition: number;
  avg_aid: number;
  avg_jee_rank: number;
  avg_percentile: number;
  enrollment: number;
  student_faculty_ratio: string;
  graduation_rate: number;
  avg_salary: number;
  programs: string[];
  pros: string[];
  cons: string[];
  campus_setting: string;
  website: string;
}

const SchoolComparison: React.FC = () => {
  const [selectedSchools, setSelectedSchools] = useState<number[]>([1, 2]);
  const [showAddSchool, setShowAddSchool] = useState(false);

  // Sample school database - Top Indian Engineering Colleges
  const schoolDatabase: SchoolData[] = [
    {
      id: 1,
      name: 'IIT Bombay',
      location: 'Mumbai, Maharashtra',
      logo: 'https://www.iitb.ac.in/sites/www.iitb.ac.in/themes/touchm/logo.png',
      ranking: 1,
      acceptance_rate: 0.8,
      tuition: 200000,
      avg_aid: 50000,
      avg_jee_rank: 150,
      avg_percentile: 99.98,
      enrollment: 11000,
      student_faculty_ratio: '8:1',
      graduation_rate: 98,
      avg_salary: 2000000,
      programs: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Chemical Engineering', 'Aerospace'],
      pros: ['Top IIT in India', 'Excellent placement record', 'Strong alumni network', 'World-class faculty', 'Research opportunities'],
      cons: ['Extremely competitive', 'High pressure environment', 'Mumbai cost of living'],
      campus_setting: 'Urban',
      website: 'https://www.iitb.ac.in'
    },
    {
      id: 2,
      name: 'IIT Delhi',
      location: 'New Delhi',
      logo: 'https://home.iitd.ac.in/img/logo.png',
      ranking: 2,
      acceptance_rate: 0.9,
      tuition: 200000,
      avg_aid: 50000,
      avg_jee_rank: 250,
      avg_percentile: 99.97,
      enrollment: 12000,
      student_faculty_ratio: '9:1',
      graduation_rate: 97,
      avg_salary: 1900000,
      programs: ['Computer Science', 'Electronics', 'Civil Engineering', 'Textile Technology', 'Mathematics & Computing'],
      pros: ['Capital city advantage', 'Strong industry connections', 'Diverse programs', 'Excellent infrastructure'],
      cons: ['Pollution in Delhi', 'Intense competition', 'Large campus can feel overwhelming'],
      campus_setting: 'Urban',
      website: 'https://home.iitd.ac.in'
    },
    {
      id: 3,
      name: 'IIT Madras',
      location: 'Chennai, Tamil Nadu',
      logo: 'https://www.iitm.ac.in/sites/default/files/iitm_logo.png',
      ranking: 1,
      acceptance_rate: 0.85,
      tuition: 200000,
      avg_aid: 50000,
      avg_jee_rank: 200,
      avg_percentile: 99.98,
      enrollment: 10500,
      student_faculty_ratio: '8:1',
      graduation_rate: 98,
      avg_salary: 1950000,
      programs: ['Computer Science', 'Data Science', 'Mechanical Engineering', 'Ocean Engineering', 'Biotechnology'],
      pros: ['NIRF Rank 1', 'Beautiful campus', 'Strong research focus', 'Startup incubation center'],
      cons: ['Hot and humid weather', 'Conservative campus culture', 'Distance from major tech hubs'],
      campus_setting: 'Suburban',
      website: 'https://www.iitm.ac.in'
    },
    {
      id: 4,
      name: 'IIT Kanpur',
      location: 'Kanpur, Uttar Pradesh',
      logo: 'https://www.iitk.ac.in/new/data/iitk-logo.png',
      ranking: 4,
      acceptance_rate: 1.0,
      tuition: 200000,
      avg_aid: 50000,
      avg_jee_rank: 300,
      avg_percentile: 99.96,
      enrollment: 9500,
      student_faculty_ratio: '9:1',
      graduation_rate: 96,
      avg_salary: 1800000,
      programs: ['Computer Science', 'Aerospace Engineering', 'Materials Science', 'Physics', 'Economics'],
      pros: ['Strong CS department', 'Academic rigor', 'Research excellence', 'Campus facilities'],
      cons: ['Small city location', 'Extreme weather', 'Limited nearby industry'],
      campus_setting: 'Suburban',
      website: 'https://www.iitk.ac.in'
    },
    {
      id: 5,
      name: 'BITS Pilani',
      location: 'Pilani, Rajasthan',
      logo: 'https://www.bits-pilani.ac.in/wp-content/themes/bitstheme/images/logo.png',
      ranking: 8,
      acceptance_rate: 2.5,
      tuition: 450000,
      avg_aid: 100000,
      avg_jee_rank: 5000,
      avg_percentile: 99.5,
      enrollment: 18000,
      student_faculty_ratio: '12:1',
      graduation_rate: 95,
      avg_salary: 1500000,
      programs: ['Computer Science', 'Electronics', 'Mechanical', 'Chemical', 'Pharmacy', 'Economics'],
      pros: ['Flexible curriculum', 'No reservation policy', 'Industry connections', 'Multiple campuses', 'Practice School program'],
      cons: ['High fees compared to IITs', 'Remote location', 'Limited government funding'],
      campus_setting: 'Rural',
      website: 'https://www.bits-pilani.ac.in'
    },
    {
      id: 6,
      name: 'NIT Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      logo: 'https://www.nitt.edu/home/logo/',
      ranking: 9,
      acceptance_rate: 1.5,
      tuition: 150000,
      avg_aid: 40000,
      avg_jee_rank: 8000,
      avg_percentile: 99.3,
      enrollment: 9000,
      student_faculty_ratio: '14:1',
      graduation_rate: 94,
      avg_salary: 1200000,
      programs: ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Instrumentation', 'Production'],
      pros: ['Top NIT in India', 'Good placement record', 'Affordable fees', 'Strong faculty'],
      cons: ['Hot climate', 'Limited metro city exposure', 'Infrastructure needs upgrade'],
      campus_setting: 'Urban',
      website: 'https://www.nitt.edu'
    },
    {
      id: 7,
      name: 'IIT Kharagpur',
      location: 'Kharagpur, West Bengal',
      logo: 'https://www.iitkgp.ac.in/files/logo.png',
      ranking: 5,
      acceptance_rate: 1.0,
      tuition: 200000,
      avg_aid: 50000,
      avg_jee_rank: 400,
      avg_percentile: 99.95,
      enrollment: 13000,
      student_faculty_ratio: '10:1',
      graduation_rate: 96,
      avg_salary: 1750000,
      programs: ['Computer Science', 'Mining Engineering', 'Metallurgy', 'Agricultural Engineering', 'Architecture'],
      pros: ['Oldest IIT', 'Largest IIT campus', 'Diverse programs', 'Strong traditions'],
      cons: ['Remote location', 'Humid climate', 'Distance from major cities'],
      campus_setting: 'Suburban',
      website: 'https://www.iitkgp.ac.in'
    },
    {
      id: 8,
      name: 'IIIT Hyderabad',
      location: 'Hyderabad, Telangana',
      logo: 'https://www.iiit.ac.in/img/iiit-new.png',
      ranking: 10,
      acceptance_rate: 0.5,
      tuition: 350000,
      avg_aid: 80000,
      avg_jee_rank: 2000,
      avg_percentile: 99.7,
      enrollment: 5000,
      student_faculty_ratio: '6:1',
      graduation_rate: 97,
      avg_salary: 1800000,
      programs: ['Computer Science', 'Electronics', 'Computational Natural Sciences', 'Data Science'],
      pros: ['CS/IT focused', 'Research oriented', 'Industry partnerships', 'Hyderabad tech hub'],
      cons: ['Limited branch options', 'High fees', 'Small campus', 'Intense workload'],
      campus_setting: 'Urban',
      website: 'https://www.iiit.ac.in'
    },
    {
      id: 9,
      name: 'VIT Vellore',
      location: 'Vellore, Tamil Nadu',
      logo: 'https://vit.ac.in/files/logo.png',
      ranking: 15,
      acceptance_rate: 5.0,
      tuition: 400000,
      avg_aid: 120000,
      avg_jee_rank: 15000,
      avg_percentile: 98.5,
      enrollment: 35000,
      student_faculty_ratio: '18:1',
      graduation_rate: 92,
      avg_salary: 900000,
      programs: ['Computer Science', 'Electronics', 'Mechanical', 'Biotechnology', 'Fashion Technology'],
      pros: ['Good placements', 'International exposure', 'Modern infrastructure', 'Diverse student body'],
      cons: ['High fees', 'Strict attendance rules', 'Large batch sizes', 'Commercialized approach'],
      campus_setting: 'Urban',
      website: 'https://vit.ac.in'
    },
    {
      id: 10,
      name: 'DTU Delhi',
      location: 'New Delhi',
      logo: 'https://dtu.ac.in/img/logo.png',
      ranking: 12,
      acceptance_rate: 2.0,
      tuition: 175000,
      avg_aid: 45000,
      avg_jee_rank: 10000,
      avg_percentile: 99.0,
      enrollment: 8000,
      student_faculty_ratio: '15:1',
      graduation_rate: 93,
      avg_salary: 1100000,
      programs: ['Computer Science', 'Software Engineering', 'Mathematics & Computing', 'Electronics', 'Mechanical'],
      pros: ['Delhi location advantage', 'Good placements', 'Strong alumni network', 'Affordable fees'],
      cons: ['Large class sizes', 'Competitive cutoffs', 'Infrastructure challenges', 'Pollution'],
      campus_setting: 'Urban',
      website: 'https://dtu.ac.in'
    }
  ];

  const addSchool = (schoolId: number) => {
    if (selectedSchools.length < 4 && !selectedSchools.includes(schoolId)) {
      setSelectedSchools([...selectedSchools, schoolId]);
      setShowAddSchool(false);
    }
  };

  const removeSchool = (schoolId: number) => {
    if (selectedSchools.length > 1) {
      setSelectedSchools(selectedSchools.filter(id => id !== schoolId));
    }
  };

  const selectedSchoolsData = schoolDatabase.filter(school => 
    selectedSchools.includes(school.id)
  );

  const availableSchools = schoolDatabase.filter(school => 
    !selectedSchools.includes(school.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Engineering College Comparison</h1>
              <p className="text-gray-600">Compare top Indian engineering colleges to find your perfect fit</p>
            </div>
            <div className="bg-blue-500 rounded-2xl p-4 shadow-sm">
              <School className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Add School Section */}
        {showAddSchool && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add College to Compare</h2>
              <button
                onClick={() => setShowAddSchool(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableSchools.map(school => (
                <button
                  key={school.id}
                  onClick={() => addSchool(school.id)}
                  className="p-4 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className="flex items-center mb-2">
                    <img src={school.logo} alt={school.name} className="w-10 h-10 rounded mr-3" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/40'; }} />
                    <div>
                      <h3 className="font-semibold text-gray-800">{school.name}</h3>
                      <p className="text-sm text-gray-500">{school.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">NIRF Rank: #{school.ranking}</span>
                    <span className="text-blue-600 font-semibold">Add +</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add School Button */}
        {!showAddSchool && selectedSchools.length < 4 && (
          <button
            onClick={() => setShowAddSchool(true)}
            className="w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-4 mb-6 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add School to Compare (Max 4)
          </button>
        )}

        {/* Comparison Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-4 text-left font-semibold sticky left-0 bg-blue-600 z-10">Category</th>
                  {selectedSchoolsData.map(school => (
                    <th key={school.id} className="p-4 text-center font-semibold min-w-[250px]">
                      <div className="flex flex-col items-center">
                        <img src={school.logo} alt={school.name} className="w-12 h-12 rounded mb-2 bg-white p-1" />
                        <div className="text-lg">{school.name}</div>
                        <div className="text-sm font-normal opacity-90">{school.location}</div>
                        <button
                          onClick={() => removeSchool(school.id)}
                          className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Ranking */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-gray-600" />
                      NIRF Ranking
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <span className="text-2xl font-bold text-blue-600">#{school.ranking}</span>
                    </td>
                  ))}
                </tr>

                {/* Acceptance Rate */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                      Acceptance Rate
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <span className="text-xl font-semibold text-blue-600">{school.acceptance_rate}%</span>
                    </td>
                  ))}
                </tr>

                {/* Tuition */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <IndianRupee className="w-5 h-5 mr-2 text-gray-600" />
                      Annual Fees
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <div className="text-lg font-semibold">₹{school.tuition.toLocaleString('en-IN')}</div>
                      <div className="text-sm text-gray-500">Avg Scholarship: ₹{school.avg_aid.toLocaleString('en-IN')}</div>
                    </td>
                  ))}
                </tr>

                {/* Test Scores */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-gray-600" />
                      Avg JEE Rank & Score
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <div className="text-lg font-semibold">Rank: {school.avg_jee_rank.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{school.avg_percentile}%ile</div>
                    </td>
                  ))}
                </tr>

                {/* Enrollment */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-gray-600" />
                      Total Enrollment
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <div className="text-lg font-semibold">{school.enrollment.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Ratio: {school.student_faculty_ratio}</div>
                    </td>
                  ))}
                </tr>

                {/* Graduation Rate */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-gray-600" />
                      Graduation Rate
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <span className="text-xl font-semibold text-gray-900">{school.graduation_rate}%</span>
                    </td>
                  ))}
                </tr>

                {/* Average Salary */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <IndianRupee className="w-5 h-5 mr-2 text-gray-600" />
                      Avg Starting Salary
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <span className="text-xl font-semibold text-gray-900">₹{(school.avg_salary / 100000).toFixed(1)}L</span>
                    </td>
                  ))}
                </tr>

                {/* Campus Setting */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                      Campus Setting
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium">
                        {school.campus_setting}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Top Programs */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <School className="w-5 h-5 mr-2 text-gray-600" />
                      Top Programs
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {school.programs.map((program, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {program}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Pros */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-gray-600" />
                      Pros
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4">
                      <ul className="text-left space-y-2">
                        {school.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Cons */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center">
                      <XCircle className="w-5 h-5 mr-2 text-gray-600" />
                      Cons
                    </div>
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4">
                      <ul className="text-left space-y-2">
                        {school.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <XCircle className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Website Links */}
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-gray-900 sticky left-0 bg-white/80 backdrop-blur-xl">
                    Website
                  </td>
                  {selectedSchoolsData.map(school => (
                    <td key={school.id} className="p-4 text-center">
                      <a
                        href={school.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Most Selective</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {selectedSchoolsData.reduce((min, school) => 
                  school.acceptance_rate < min.acceptance_rate ? school : min
                ).name}
              </div>
              <div className="text-gray-600">
                {selectedSchoolsData.reduce((min, school) => 
                  school.acceptance_rate < min.acceptance_rate ? school : min
                ).acceptance_rate}% acceptance rate
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Best Value</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {selectedSchoolsData.reduce((min, school) => 
                  (school.tuition - school.avg_aid) < (min.tuition - min.avg_aid) ? school : min
                ).name}
              </div>
              <div className="text-gray-600">
                Net cost: ₹{(selectedSchoolsData.reduce((min, school) => 
                  (school.tuition - school.avg_aid) < (min.tuition - min.avg_aid) ? school : min
                ).tuition - selectedSchoolsData.reduce((min, school) => 
                  (school.tuition - school.avg_aid) < (min.tuition - min.avg_aid) ? school : min
                ).avg_aid).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Highest Packages</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {selectedSchoolsData.reduce((max, school) => 
                  school.avg_salary > max.avg_salary ? school : max
                ).name}
              </div>
              <div className="text-gray-600">
                Avg salary: ₹{(selectedSchoolsData.reduce((max, school) => 
                  school.avg_salary > max.avg_salary ? school : max
                ).avg_salary / 100000).toFixed(1)}L
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolComparison;
