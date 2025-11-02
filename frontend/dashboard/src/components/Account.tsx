import React, { useState, useEffect } from 'react';

interface UserProfile {
  email: string;
  name?: string;
  picture?: string | null;
  phone?: string;
  location?: string;
  grade?: string;
  targetScore?: string;
  preferredColleges?: string[];
  applicationCount?: number;
  // Academic details
  schoolName?: string;
  board?: string;
  yearOfPassing?: string;
  percentage?: string;
  physicsMarks?: string;
  chemistryMarks?: string;
  mathsMarks?: string;
  // Personal details
  dateOfBirth?: string;
  gender?: string;
  category?: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  parentPhone?: string;
}

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
      try {
        // For demo purposes, simulate API call with mock data
        // Replace with actual API call when backend is ready
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

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
          parentPhone: undefined
        };

        setUser(mockUser);
        setFormData(mockUser);
        setDocuments([]);

        /*
        const response = await fetch('http://localhost:8000/api/profile', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setFormData(data.user);
          setDocuments(data.documents || []);
        } else {
          // Redirect to login if not authenticated
          window.location.href = '/login';
        }
        */
      } catch (error) {
        console.error('Error fetching profile:', error);
        // For demo, don't redirect - just show empty state
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
      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsEditing(false);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/logout', {
        method: 'GET',
        credentials: 'include',
      });
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
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('type', file.type);

    try {
      const response = await fetch('http://localhost:8000/api/upload-document', {
        method: 'POST',
        credentials: 'include',
        body: formDataUpload,
      });

      if (response.ok) {
        const newDoc = await response.json();
        setDocuments(prev => [...prev, newDoc.document]);
      } else {
        alert('Failed to upload document');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const deleteDocument = async (docId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/documents/${docId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setDocuments(prev => prev.filter(doc => doc.id !== docId));
      } else {
        alert('Failed to delete document');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete document');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
              <p className="text-gray-600">Manage your profile and account settings</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents ({documents.length})
            </button>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-teal-200"
                />
              ) : (
                <div className="w-24 h-24 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              )}
              <h3 className="font-bold text-gray-900 text-lg">{user.name || user.email.split('@')[0]}</h3>
              <p className="text-gray-600 text-sm mb-4">{user.email}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications:</span>
                  <span className="font-semibold text-teal-600">{user.applicationCount || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Documents:</span>
                  <span className="font-semibold text-teal-600">{documents.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-semibold">2024</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          {activeTab === 'profile' ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.name || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900 py-2">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.phone || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={formData.dateOfBirth || ''}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.dateOfBirth || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      {isEditing ? (
                        <select
                          value={formData.gender || ''}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 py-2">{user.gender || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      {isEditing ? (
                        <select
                          value={formData.category || ''}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="">Select category</option>
                          <option value="General">General</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="EWS">EWS</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 py-2">{user.category || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Address Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                      {isEditing ? (
                        <textarea
                          value={formData.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Enter your complete address"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.address || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.fatherName || ''}
                          onChange={(e) => handleInputChange('fatherName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.fatherName || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.motherName || ''}
                          onChange={(e) => handleInputChange('motherName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.motherName || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.parentPhone || ''}
                          onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.parentPhone || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Academic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.schoolName || ''}
                          onChange={(e) => handleInputChange('schoolName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Enter your school name"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.schoolName || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
                      {isEditing ? (
                        <select
                          value={formData.board || ''}
                          onChange={(e) => handleInputChange('board', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="">Select board</option>
                          <option value="CBSE">CBSE</option>
                          <option value="ICSE">ICSE</option>
                          <option value="State Board">State Board</option>
                          <option value="IB">IB</option>
                          <option value="IGCSE">IGCSE</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 py-2">{user.board || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={formData.yearOfPassing || ''}
                          onChange={(e) => handleInputChange('yearOfPassing', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="2025"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.yearOfPassing || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Overall Percentage</label>
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          value={formData.percentage || ''}
                          onChange={(e) => handleInputChange('percentage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="95.5"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.percentage ? `${user.percentage}%` : 'Not provided'}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject-wise Marks */}
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-3">12th Grade Marks (for JEE)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Physics</label>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={formData.physicsMarks || ''}
                            onChange={(e) => handleInputChange('physicsMarks', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="95"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.physicsMarks ? `${user.physicsMarks}%` : 'Not provided'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chemistry</label>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={formData.chemistryMarks || ''}
                            onChange={(e) => handleInputChange('chemistryMarks', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="92"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.chemistryMarks ? `${user.chemistryMarks}%` : 'Not provided'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mathematics</label>
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.01"
                            value={formData.mathsMarks || ''}
                            onChange={(e) => handleInputChange('mathsMarks', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="98"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{user.mathsMarks ? `${user.mathsMarks}%` : 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Preferences */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Application Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Grade/Class</label>
                      {isEditing ? (
                        <select
                          value={formData.grade || ''}
                          onChange={(e) => handleInputChange('grade', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="">Select grade</option>
                          <option value="11th">11th Grade</option>
                          <option value="12th">12th Grade</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Graduate">Graduate</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 py-2">{user.grade || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target JEE Score</label>
                      {isEditing ? (
                        <input
                          type="text"
                          placeholder="e.g., 250+ in JEE Main"
                          value={formData.targetScore || ''}
                          onChange={(e) => handleInputChange('targetScore', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{user.targetScore || 'Not provided'}</p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Colleges */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred College Types</label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['IITs', 'NITs', 'IIITs', 'Private Colleges', 'International'].map((college) => (
                          <label key={college} className="flex items-center">
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
                              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">{college}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.preferredColleges?.map((college, index) => (
                          <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                            {college}
                          </span>
                        )) || <p className="text-gray-500">No preferences set</p>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Documents</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <div className="text-sm text-gray-600 mb-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="font-medium text-teal-600 hover:text-teal-500">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
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
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                  {uploading && (
                    <div className="mt-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600 mx-auto"></div>
                      <p className="text-sm text-gray-600 mt-2">Uploading...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Your Documents</h2>

                {documents.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No documents uploaded</h3>
                    <p className="mt-1 text-sm text-gray-500">Upload your academic documents to use in applications.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={doc.type === 'application/pdf' ? 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' : 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'}/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.name}</h4>
                            <p className="text-sm text-gray-500">
                              {doc.size} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(doc.url, '_blank')}
                            className="px-3 py-1 text-teal-600 hover:text-teal-700 text-sm font-medium"
                          >
                            View
                          </button>
                          <button
                            onClick={() => deleteDocument(doc.id)}
                            className="px-3 py-1 text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Document Types Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Recommended Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• 10th & 12th Mark Sheets</div>
                    <div>• JEE Main/Advanced Score Card</div>
                    <div>• Passport Size Photo</div>
                    <div>• Category Certificate (if applicable)</div>
                    <div>• School Leaving Certificate</div>
                    <div>• Aadhaar Card / ID Proof</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;