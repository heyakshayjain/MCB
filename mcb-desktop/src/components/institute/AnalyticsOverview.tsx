import React from 'react';
import { InstituteStats } from '../../utils/instituteUtils';

interface AnalyticsOverviewProps {
    stats: InstituteStats;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ stats }) => {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                    trend="+12% this month"
                    trendUp={true}
                />
                <StatCard
                    title="Active Applications"
                    value={stats.activeApplications}
                    icon={
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    }
                    trend="+5% this week"
                    trendUp={true}
                />
                <StatCard
                    title="Documents Verified"
                    value={stats.documentsVerified}
                    icon={
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                    trend="98% accuracy"
                    trendUp={true}
                />
                <StatCard
                    title="Avg. Completion"
                    value={`${stats.avgProfileCompletion}%`}
                    icon={
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    }
                    trend="+2% from last week"
                    trendUp={true}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Target Colleges */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Top Target Colleges</h3>
                    <div className="space-y-4">
                        {stats.topTargetColleges.map((college, index) => (
                            <div key={index} className="relative">
                                <div className="flex justify-between text-sm font-medium mb-1">
                                    <span className="text-gray-700">{college.name}</span>
                                    <span className="text-gray-900">{college.count} students</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${(college.count / stats.totalStudents) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Status Distribution */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Application Status</h3>
                    <div className="space-y-4">
                        {stats.applicationStatusDistribution.map((status, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status.status)}`}></div>
                                    <span className="font-medium text-gray-700">{status.status}</span>
                                </div>
                                <span className="font-bold text-gray-900">{status.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend, trendUp }: any) => (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-50 rounded-xl">
                {icon}
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {trend}
            </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
);

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Accepted': return 'bg-green-500';
        case 'Rejected': return 'bg-red-500';
        case 'Submitted': return 'bg-blue-500';
        case 'Under Review': return 'bg-yellow-500';
        default: return 'bg-gray-400';
    }
};

export default AnalyticsOverview;
