import React, { useState, useEffect } from 'react';
import AnalyticsOverview from './AnalyticsOverview';
import StudentList from './StudentList';
import ReportsAnalytics from './ReportsAnalytics';
import AIInsights from './AIInsights';
import CommunicationHub from './CommunicationHub';
import ResourceLibrary from './ResourceLibrary';
import AdmissionsCRM from './AdmissionsCRM';
import HelpSupport from '../common/HelpSupport';
import {
    generateMockStudents,
    calculateInstituteStats,
    Student,
    InstituteStats,
    MOCK_EXAMS,
    ReportData,
    generateMockReports,
    Insight,
    Message,
    Resource,
    generateMockInsights,
    generateMockMessages,
    generateMockResources
} from '../../utils/instituteUtils';

const InstituteDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'batches' | 'applications' | 'reports' | 'communication' | 'resources' | 'admissions' | 'support'>('overview');
    const [students, setStudents] = useState<Student[]>([]);
    const [stats, setStats] = useState<InstituteStats | null>(null);
    const [reports, setReports] = useState<ReportData[]>([]);
    const [insights, setInsights] = useState<Insight[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showAssignExamModal, setShowAssignExamModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
    const [newStudentPhone, setNewStudentPhone] = useState('');
    const [selectedExamIds, setSelectedExamIds] = useState<string[]>([]);

    useEffect(() => {
        // Simulate API fetch
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 800));
            const mockStudents = generateMockStudents(50);
            const mockStats = calculateInstituteStats(mockStudents);
            const mockReports = generateMockReports();
            const mockInsights = generateMockInsights();
            const mockMessages = generateMockMessages();
            const mockResources = generateMockResources();

            setStudents(mockStudents);
            setStats(mockStats);
            setReports(mockReports);
            setInsights(mockInsights);
            setMessages(mockMessages);
            setResources(mockResources);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleAddStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStudentPhone) return;

        // Simulate SMS invite
        alert(`SMS invite sent to ${newStudentPhone}!`);
        setShowAddStudentModal(false);
        setNewStudentPhone('');
    };

    const handleAssignExam = async () => {
        if (selectedExamIds.length === 0 || !selectedStudentId) return;

        const examsToAssign = MOCK_EXAMS.filter(e => selectedExamIds.includes(e.id));
        if (examsToAssign.length === 0) return;

        // Update local state to reflect assignment
        setStudents(prev => prev.map(stu => {
            if (stu.id === selectedStudentId) {
                const newExams = examsToAssign.map(exam => ({
                    id: exam.id,
                    name: exam.name,
                    status: 'Assigned' as const,
                    assignedAt: new Date().toISOString()
                }));

                return {
                    ...stu,
                    exams: [...(stu.exams || []), ...newExams]
                };
            }
            return stu;
        }));

        alert(`${examsToAssign.length} exam(s) assigned successfully!`);
        setShowAssignExamModal(false);
        setSelectedStudentId(null);
        setSelectedExamIds([]);
    };

    const openAssignExamModal = (studentId: string) => {
        setSelectedStudentId(studentId);
        setShowAssignExamModal(true);
    };

    const toggleExamSelection = (examId: string) => {
        setSelectedExamIds(prev =>
            prev.includes(examId)
                ? prev.filter(id => id !== examId)
                : [...prev, examId]
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden lg:flex lg:flex-col">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            M
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 leading-tight">MCB Institute</h1>
                            <p className="text-xs text-gray-500">Admin Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto pb-20">
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                        label="Overview"
                        active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                    />
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        label="Students"
                        active={activeTab === 'students'}
                        onClick={() => setActiveTab('students')}
                    />
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        label="Admissions CRM"
                        active={activeTab === 'admissions'}
                        onClick={() => setActiveTab('admissions')}
                    />
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        label="Batches"
                        active={activeTab === 'batches'}
                        onClick={() => setActiveTab('batches')}
                    />
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        label="Applications"
                        active={activeTab === 'applications'}
                        onClick={() => setActiveTab('applications')}
                    />
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        label="Reports & Insights"
                        active={activeTab === 'reports'}
                        onClick={() => setActiveTab('reports')}
                    />
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                        label="Communication"
                        active={activeTab === 'communication'}
                        onClick={() => setActiveTab('communication')}
                    />
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                        label="Resources"
                        active={activeTab === 'resources'}
                        onClick={() => setActiveTab('resources')}
                    />
                    <SidebarItem
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        label="Help & Support"
                        active={activeTab === 'support'}
                        onClick={() => setActiveTab('support')}
                    />
                </nav>

                <div className="p-4 border-t border-gray-100 bg-white">
                    <button
                        onClick={() => {
                            localStorage.removeItem('instituteAuth');
                            window.location.href = '/institute/login';
                        }}
                        className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-8">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h2>
                        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-2 text-gray-400 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setShowAddStudentModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all"
                        >
                            + New Student
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="animate-fade-in">
                    {activeTab === 'overview' && stats && <AnalyticsOverview stats={stats} />}
                    {activeTab === 'students' && (
                        <StudentList
                            students={students}
                            onAssignExam={openAssignExamModal}
                        />
                    )}
                    {activeTab === 'admissions' && (
                        <AdmissionsCRM />
                    )}
                    {activeTab === 'batches' && (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Batch Management</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-6">Create and manage student batches. Assign students to batches for better organization.</p>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-500/30 transition-all">
                                Create New Batch
                            </button>
                        </div>
                    )}
                    {activeTab === 'applications' && (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Applications Management</h3>
                            <p className="text-gray-500 max-w-md mx-auto">Detailed application tracking view is coming soon. You can view individual student applications in the Students tab.</p>
                        </div>
                    )}
                    {activeTab === 'reports' && stats && (
                        <ReportsAnalytics reports={reports} stats={stats} insights={insights} />
                    )}
                    {activeTab === 'communication' && (
                        <CommunicationHub messages={messages} />
                    )}
                    {activeTab === 'resources' && (
                        <ResourceLibrary resources={resources} />
                    )}
                    {activeTab === 'support' && (
                        <HelpSupport />
                    )}
                </div>
            </div>

            {/* Add Student Modal */}
            {showAddStudentModal && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Add New Student</h3>
                        <p className="text-gray-500 mb-6 text-sm">Enter the student's phone number to send them an invite link via SMS.</p>

                        <form onSubmit={handleAddStudent}>
                            <div className="mb-6">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={newStudentPhone}
                                    onChange={(e) => setNewStudentPhone(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddStudentModal(false)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-blue-500/30"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Assign Exam Modal */}
            {showAssignExamModal && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Assign Exams</h3>
                        <p className="text-gray-500 mb-6 text-sm">Select exams to assign to the selected student.</p>

                        <div className="space-y-3 mb-8 max-h-64 overflow-y-auto pr-2">
                            {MOCK_EXAMS.map((exam) => (
                                <label
                                    key={exam.id}
                                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedExamIds.includes(exam.id)
                                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            value={exam.id}
                                            checked={selectedExamIds.includes(exam.id)}
                                            onChange={() => toggleExamSelection(exam.id)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{exam.name}</p>
                                            <p className="text-xs text-gray-500">{exam.duration} • {exam.totalMarks} Marks</p>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAssignExamModal(false);
                                    setSelectedStudentId(null);
                                    setSelectedExamIds([]);
                                }}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssignExam}
                                disabled={selectedExamIds.length === 0}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-blue-500/30"
                            >
                                Assign {selectedExamIds.length > 0 ? `(${selectedExamIds.length})` : ''}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${active
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
    >
        {icon}
        {label}
    </button>
);

export default InstituteDashboard;
