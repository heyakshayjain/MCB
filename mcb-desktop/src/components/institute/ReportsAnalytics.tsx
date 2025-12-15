import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { ReportData, InstituteStats, Insight } from '../../utils/instituteUtils';
import AIInsights from './AIInsights';

interface ReportsAnalyticsProps {
    reports: ReportData[];
    stats: InstituteStats;
    insights: Insight[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface Report {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const AVAILABLE_REPORTS: Report[] = [
    {
        id: 'performance',
        title: 'Performance Trends',
        description: 'Track student performance over time across different exams',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        color: 'blue'
    },
    {
        id: 'attendance',
        title: 'Attendance Report',
        description: 'Monitor student attendance patterns and identify trends',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
        color: 'green'
    },
    {
        id: 'student-progress',
        title: 'Student Progress',
        description: 'Individual student performance and improvement analysis',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
        color: 'purple'
    },
    {
        id: 'college-targets',
        title: 'College Targets',
        description: 'Distribution of student college preferences and applications',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
        color: 'orange'
    },
    {
        id: 'top-performers',
        title: 'Top Performers',
        description: 'Recognize and analyze top-performing students',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
        color: 'yellow'
    },
    {
        id: 'needs-attention',
        title: 'Needs Attention',
        description: 'Students requiring additional support and intervention',
        icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
        color: 'red'
    }
];

const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({ reports, stats, insights }) => {
    const [viewMode, setViewMode] = useState<'reports' | 'insights'>('reports');
    const [selectedReport, setSelectedReport] = useState<string | null>(null);

    const renderReportDetail = (reportId: string) => {
        switch (reportId) {
            case 'performance':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Trend</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={reports}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="examName" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                        <Legend />
                                        <Line type="monotone" dataKey="avgScore" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} name="Average Score" />
                                        <Line type="monotone" dataKey="highestScore" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} name="Highest Score" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                );

            case 'attendance':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-sm text-gray-500 font-medium mb-1">Overall Attendance</p>
                                <h3 className="text-3xl font-bold text-gray-900">94%</h3>
                                <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded-lg mt-2 inline-block">-2% vs last month</span>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-sm text-gray-500 font-medium mb-1">Present Today</p>
                                <h3 className="text-3xl font-bold text-gray-900">47/50</h3>
                                <p className="text-xs text-gray-500 mt-1">Students</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-sm text-gray-500 font-medium mb-1">Avg. Weekly</p>
                                <h3 className="text-3xl font-bold text-gray-900">92%</h3>
                                <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg mt-2 inline-block">+3% vs last week</span>
                            </div>
                        </div>
                    </div>
                );

            case 'college-targets':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Student Targets Distribution</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={stats.topTargetColleges} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="count">
                                        {stats.topTargetColleges.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );

            case 'top-performers':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Top Performers</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center font-bold">#{i}</div>
                                        <div>
                                            <p className="font-bold text-gray-900">Student Name {i}</p>
                                            <p className="text-sm text-gray-500">Batch A • 12th Grade</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 text-lg">{98 - i}%</p>
                                        <p className="text-xs text-green-600">Avg. Score</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'needs-attention':
                return (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Students Needing Attention</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center font-bold border border-red-200">!</div>
                                        <div>
                                            <p className="font-bold text-gray-900">Student Name {i + 10}</p>
                                            <p className="text-sm text-gray-500">Batch B • Low attendance & scores</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">{35 + i}%</p>
                                        <p className="text-xs text-red-600">Avg. Score</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
                        <p className="text-gray-500">Report details coming soon...</p>
                    </div>
                );
        }
    };

    if (selectedReport) {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => setSelectedReport(null)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Reports
                </button>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {AVAILABLE_REPORTS.find(r => r.id === selectedReport)?.title}
                    </h2>
                    <p className="text-gray-500 mb-6">
                        {AVAILABLE_REPORTS.find(r => r.id === selectedReport)?.description}
                    </p>
                </div>

                {renderReportDetail(selectedReport)}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* View Toggle */}
            <div className="flex bg-white p-1 rounded-xl border border-gray-200 w-fit">
                <button
                    onClick={() => setViewMode('reports')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'reports'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    Analytics Reports
                </button>
                <button
                    onClick={() => setViewMode('insights')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'insights'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                >
                    AI Insights
                </button>
            </div>

            {viewMode === 'insights' ? (
                <AIInsights insights={insights} />
            ) : (
                <>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Reports</h2>
                        <p className="text-gray-500">Select a report to view detailed analytics and trends</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {AVAILABLE_REPORTS.map((report) => (
                            <button
                                key={report.id}
                                onClick={() => setSelectedReport(report.id)}
                                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group hover:border-${report.color}-200`}
                            >
                                <div className={`w-14 h-14 bg-${report.color}-50 rounded-xl flex items-center justify-center mb-4 text-${report.color}-600 group-hover:scale-110 transition-transform`}>
                                    {report.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                                <div className="flex items-center text-blue-600 font-semibold text-sm">
                                    View Report
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ReportsAnalytics;
