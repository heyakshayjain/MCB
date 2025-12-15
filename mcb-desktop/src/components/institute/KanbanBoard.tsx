import React, { useState } from 'react';
import { Lead, CRM_STAGES } from '../../utils/crmUtils';

interface KanbanBoardProps {
    leads: Lead[];
    onUpdateLead: (leadId: string, newStage: Lead['stage']) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ leads, onUpdateLead }) => {
    const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, leadId: string) => {
        setDraggedLeadId(leadId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, stage: Lead['stage']) => {
        e.preventDefault();
        if (draggedLeadId) {
            onUpdateLead(draggedLeadId, stage);
            setDraggedLeadId(null);
        }
    };

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'Inquiry': return 'bg-blue-50 border-blue-200 text-blue-700';
            case 'Visited': return 'bg-purple-50 border-purple-200 text-purple-700';
            case 'Applied': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
            case 'Enrolled': return 'bg-green-50 border-green-200 text-green-700';
            case 'Lost': return 'bg-gray-50 border-gray-200 text-gray-700';
            default: return 'bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-250px)]">
            {CRM_STAGES.map((stage) => (
                <div
                    key={stage}
                    className="flex-shrink-0 w-80 flex flex-col bg-gray-50 rounded-xl border border-gray-200"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, stage)}
                >
                    {/* Column Header */}
                    <div className={`p-4 border-b border-gray-200 rounded-t-xl font-bold flex justify-between items-center ${getStageColor(stage)} bg-opacity-50`}>
                        <span>{stage}</span>
                        <span className="bg-white bg-opacity-50 px-2 py-1 rounded-lg text-xs">
                            {leads.filter(l => l.stage === stage).length}
                        </span>
                    </div>

                    {/* Cards Container */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3">
                        {leads.filter(l => l.stage === stage).map((lead) => (
                            <div
                                key={lead.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, lead.id)}
                                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all group"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900">{lead.name}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${lead.priority === 'High' ? 'bg-red-50 text-red-600' :
                                            lead.priority === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                                                'bg-green-50 text-green-600'
                                        }`}>
                                        {lead.priority}
                                    </span>
                                </div>

                                <div className="space-y-1 text-xs text-gray-500 mb-3">
                                    <p className="flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        {lead.phone}
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                        {lead.interestedCourse}
                                    </p>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="flex-1 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100">
                                        Call
                                    </button>
                                    <button className="flex-1 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-100">
                                        Email
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;
