import React, { useState, useEffect } from 'react';
import { Lead, generateMockLeads } from '../../utils/crmUtils';
import KanbanBoard from './KanbanBoard';

const AdmissionsCRM: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const loadLeads = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            setLeads(generateMockLeads(25));
            setLoading(false);
        };
        loadLeads();
    }, []);

    const handleUpdateLead = (leadId: string, newStage: Lead['stage']) => {
        setLeads(prev => prev.map(lead =>
            lead.id === leadId ? { ...lead, stage: newStage } : lead
        ));
    };

    const stats = {
        totalLeads: leads.length,
        newToday: leads.filter(l => new Date(l.lastContacted).getDate() === new Date().getDate()).length,
        conversionRate: Math.round((leads.filter(l => l.stage === 'Enrolled').length / leads.length) * 100) || 0,
        pendingFollowups: leads.filter(l => l.stage === 'Inquiry' || l.stage === 'Visited').length
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Total Leads</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalLeads}</h3>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">New Today</p>
                    <h3 className="text-2xl font-bold text-green-600">+{stats.newToday}</h3>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Conversion Rate</p>
                    <h3 className="text-2xl font-bold text-blue-600">{stats.conversionRate}%</h3>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Pending Follow-ups</p>
                    <h3 className="text-2xl font-bold text-orange-600">{stats.pendingFollowups}</h3>
                </div>
            </div>

            {/* Board Area */}
            <div className="flex-1 min-h-0">
                <KanbanBoard leads={leads} onUpdateLead={handleUpdateLead} />
            </div>
        </div>
    );
};

export default AdmissionsCRM;
