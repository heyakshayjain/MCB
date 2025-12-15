import React from 'react';
import { Insight } from '../../utils/instituteUtils';

interface AIInsightsProps {
    insights: Insight[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">AI Performance Insights</h2>
                        <p className="text-purple-100 max-w-2xl">
                            Our AI analyzes student performance, attendance, and application trends to provide actionable insights.
                            Focus on high-risk areas to improve overall institute performance.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((insight) => (
                    <InsightCard key={insight.id} insight={insight} />
                ))}
            </div>
        </div>
    );
};

const InsightCard = ({ insight }: { insight: Insight }) => {
    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'bg-red-50 text-red-700 border-red-100';
            case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            case 'low': return 'bg-blue-50 text-blue-700 border-blue-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'risk':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                );
            case 'opportunity':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                );
            case 'trend':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                );
            default: return null;
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${getSeverityColor(insight.severity)}`}>
                    {getIcon(insight.type)}
                </div>
                {insight.metric && (
                    <span className="text-lg font-bold text-gray-900">{insight.metric}</span>
                )}
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{insight.title}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {insight.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{insight.affectedStudents} Students Affected</span>
                </div>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    View Details →
                </button>
            </div>
        </div>
    );
};

export default AIInsights;
