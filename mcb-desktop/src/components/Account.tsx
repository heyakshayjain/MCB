import React, { useState, useEffect } from 'react';
import { UserProfile } from '../utils/profileUtils';

interface Document {
  id: number;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  url: string;
}

const Account: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [activeTab, setActiveTab] = useState<'profile' | 'documents'>('profile');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Check for mock user first
      const mockUserStr = localStorage.getItem('mockUser');
      if (mockUserStr) {
        const mockUser = JSON.parse(mockUserStr);
        // Extend mock user with profile fields if needed
        const fullMockUser: UserProfile = {
          ...mockUser,
          // Ensure defaults if missing
          phone: mockUser.phone || '1234567890',
          location: mockUser.location || 'New York, USA',
          grade: mockUser.grade || '12th Grade',
          targetScore: mockUser.targetScore || '1500',
          preferredColleges: mockUser.preferredColleges || ['IITs', 'NITs'],
          applicationCount: mockUser.applicationCount || 5,
          schoolName: mockUser.schoolName || 'Mock High School',
          board: mockUser.board || 'CBSE',
          yearOfPassing: mockUser.yearOfPassing || '2025',
          percentage: mockUser.percentage || '95',
          physicsMarks: mockUser.physicsMarks || '90',
          chemistryMarks: mockUser.chemistryMarks || '92',
          mathsMarks: mockUser.mathsMarks || '95',
          dateOfBirth: mockUser.dateOfBirth || '2005-01-01',
          gender: mockUser.gender || 'Male',
          category: mockUser.category || 'General',
          address: mockUser.address || '123 Mock St',
          fatherName: mockUser.fatherName || 'Mock Father',
          motherName: mockUser.motherName || 'Mock Mother',
          parentPhone: mockUser.parentPhone || '0987654321',
          instituteName: mockUser.instituteName || 'MCB Institute'
        };
        setUser(fullMockUser);
        setFormData(fullMockUser);
        setDocuments([]);
        setLoading(false);
        return;
      }

      try {
        // For demo purposes, simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 500));

        const mockUser: UserProfile = {
          email: 'student@gmail.com',
          name: 'Student Name',
          picture: undefined,
          phone: undefined,
          location: undefined,
          grade: undefined,
          targetScore: undefined,
          preferredColleges: [],
          applicationCount: 0,
          schoolName: undefined,
          board: undefined,
          yearOfPassing: undefined,
          percentage: undefined,
          physicsMarks: undefined,
          chemistryMarks: undefined,
          mathsMarks: undefined,
          dateOfBirth: undefined,
          gender: undefined,
          category: undefined,
          address: undefined,
          fatherName: undefined,
          motherName: undefined,
          parentPhone: undefined,
          instituteName: undefined
        };

        setUser(mockUser);
        setFormData(mockUser);
        setDocuments([]);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (field: keyof UserProfile, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const updatedUser = formData as UserProfile;
      setUser(updatedUser);

      // Save to localStorage so Dashboard can pick it up
      localStorage.setItem('mockUser', JSON.stringify(updatedUser));

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      // Simulate logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Simulate upload
    setTimeout(() => {
      const newDoc: Document = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        url: '#'
      };
      setDocuments(prev => [...prev, newDoc]);
      setUploading(false);
    }, 1000);
  };

  const deleteDocument = async (docId: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">My Account</h1>
              <p className="text-gray-500 font-medium">Manage your profile and account settings</p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-sm inline-flex">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'profile'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === 'documents'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
              }`}
          >
            Documents ({documents.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-6">
            <div className="text-center">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-50 shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center shadow-inner">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <h3 className="font-bold text-gray-900 text-xl mb-1">{user.name || user.email.split('@')[0]}</h3>
              <p className="text-gray-500 text-sm mb-6 font-medium">{user.email}</p>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Applications</span>
                  <span className="font-bold text-gray-900">{user.applicationCount || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Documents</span>
                  <span className="font-bold text-gray-900">{documents.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Institute</span>
                  <span className="font-bold text-blue-600">{user.instituteName || 'Not Selected'}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 px-4 rounded-xl text-sm font-semibold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          {activeTab === 'profile' ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${isEditing
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                    }`}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" value={formData.name} onChange={(v: string) => handleInputChange('name', v)} isEditing={isEditing} />
                    <InputField label="Email" value={user.email} isEditing={false} />
                    <InputField label="Phone" value={formData.phone} onChange={(v: string) => handleInputChange('phone', v)} isEditing={isEditing} type="tel" />
                    <InputField label="Date of Birth" value={formData.dateOfBirth} onChange={(v: string) => handleInputChange('dateOfBirth', v)} isEditing={isEditing} type="date" />
                    <SelectField
                      label="Gender"
                      value={formData.gender}
                      onChange={(v: string) => handleInputChange('gender', v)}
                      isEditing={isEditing}
                      options={['Male', 'Female', 'Other']}
                    />
                    <SelectField
                      label="Category"
                      value={formData.category}
                      onChange={(v: string) => handleInputChange('category', v)}
                      isEditing={isEditing}
                      options={['General', 'OBC', 'SC', 'ST', 'EWS']}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Address Information</h3>
                  <div className="grid grid-cols-1">
                    <TextAreaField label="Full Address" value={formData.address} onChange={(v: string) => handleInputChange('address', v)} isEditing={isEditing} />
                  </div>
                </div>

                {/* Parent Info */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Father's Name" value={formData.fatherName} onChange={(v: string) => handleInputChange('fatherName', v)} isEditing={isEditing} />
                    <InputField label="Mother's Name" value={formData.motherName} onChange={(v: string) => handleInputChange('motherName', v)} isEditing={isEditing} />
                    <InputField label="Parent Phone" value={formData.parentPhone} onChange={(v: string) => handleInputChange('parentPhone', v)} isEditing={isEditing} type="tel" />
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="School Name" value={formData.schoolName} onChange={(v: string) => handleInputChange('schoolName', v)} isEditing={isEditing} />
                    <SelectField
                      label="Board"
                      value={formData.board}
                      onChange={(v: string) => handleInputChange('board', v)}
                      isEditing={isEditing}
                      options={['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE', 'Other']}
                    />
                    <InputField label="Year of Passing" value={formData.yearOfPassing} onChange={(v: string) => handleInputChange('yearOfPassing', v)} isEditing={isEditing} type="number" />
                    <InputField label="Overall Percentage" value={formData.percentage} onChange={(v: string) => handleInputChange('percentage', v)} isEditing={isEditing} type="number" suffix="%" />
                    <SelectField
                      label="Institute"
                      value={formData.instituteName}
                      onChange={(v: string) => handleInputChange('instituteName', v)}
                      isEditing={isEditing}
                      options={['MCB Institute', 'Allen', 'Fiitjee', 'Aakash', 'Resonance', 'Other']}
                    />
                  </div>

                  <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 text-sm">12th Grade Marks (for JEE)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputField label="Physics" value={formData.physicsMarks} onChange={(v: string) => handleInputChange('physicsMarks', v)} isEditing={isEditing} type="number" suffix="%" />
                      <InputField label="Chemistry" value={formData.chemistryMarks} onChange={(v: string) => handleInputChange('chemistryMarks', v)} isEditing={isEditing} type="number" suffix="%" />
                      <InputField label="Mathematics" value={formData.mathsMarks} onChange={(v: string) => handleInputChange('mathsMarks', v)} isEditing={isEditing} type="number" suffix="%" />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Application Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <SelectField
                      label="Current Grade"
                      value={formData.grade}
                      onChange={(v: string) => handleInputChange('grade', v)}
                      isEditing={isEditing}
                      options={['11th Grade', '12th Grade', 'Undergraduate', 'Graduate']}
                    />
                    <InputField label="Target JEE Score" value={formData.targetScore} onChange={(v: string) => handleInputChange('targetScore', v)} isEditing={isEditing} />
                  </div>

                  <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Preferred College Types</label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['IITs', 'NITs', 'IIITs', 'Private Colleges', 'International'].map((college) => (
                          <label key={college} className="flex items-center p-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors">
                            <input
                              type="checkbox"
                              checked={formData.preferredColleges?.includes(college) || false}
                              onChange={(e) => {
                                const current = formData.preferredColleges || [];
                                if (e.target.checked) {
                                  handleInputChange('preferredColleges', [...current, college]);
                                } else {
                                  handleInputChange('preferredColleges', current.filter(c => c !== college));
                                }
                              }}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">{college}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.preferredColleges?.map((college, index) => (
                          <span key={index} className="px-3 py-1.5 bg-white text-blue-700 border border-blue-100 rounded-lg text-sm font-medium shadow-sm">
                            {college}
                          </span>
                        )) || <p className="text-gray-500 text-sm">No preferences set</p>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Documents</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors bg-gray-50/50">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="file-upload" className="cursor-pointer inline-flex flex-col items-center">
                      <span className="font-bold text-blue-600 hover:text-blue-700 text-lg">Click to upload</span>
                      <span className="text-gray-500 text-sm mt-1">or drag and drop PDF, JPG, PNG</span>
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Max file size: 10MB</p>
                  {uploading && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 font-medium">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      Uploading...
                    </div>
                  )}
                </div>
              </div>

              {/* Documents List */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border border-white/20 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Documents</h2>

                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No documents uploaded</h3>
                    <p className="mt-1 text-gray-500">Upload your academic documents to use in applications.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={doc.type.includes('pdf') ? 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' : 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'} />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{doc.name}</h4>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">
                              {doc.size} • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(doc.url, '_blank')}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteDocument(doc.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InputField = ({ label, value, onChange, isEditing, type = "text", suffix }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {isEditing ? (
      <div className="relative">
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        {suffix && <span className="absolute right-4 top-2.5 text-gray-500 text-sm font-medium">{suffix}</span>}
      </div>
    ) : (
      <p className="text-gray-900 font-medium py-2.5 border-b border-gray-100">{value ? (suffix ? `${value}${suffix}` : value) : <span className="text-gray-400 italic">Not provided</span>}</p>
    )}
  </div>
);

const TextAreaField = ({ label, value, onChange, isEditing }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {isEditing ? (
      <textarea
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        rows={3}
        className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    ) : (
      <p className="text-gray-900 font-medium py-2.5 border-b border-gray-100">{value || <span className="text-gray-400 italic">Not provided</span>}</p>
    )}
  </div>
);

const SelectField = ({ label, value, onChange, isEditing, options }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {isEditing ? (
      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-4 top-3 pointer-events-none text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    ) : (
      <p className="text-gray-900 font-medium py-2.5 border-b border-gray-100">{value || <span className="text-gray-400 italic">Not provided</span>}</p>
    )}
  </div>
);

export default Account;