import React, { useState } from 'react';

interface Ticket {
    id: string;
    subject: string;
    type: 'Bug' | 'Feature Request' | 'General Inquiry' | 'Billing';
    status: 'Open' | 'In Progress' | 'Resolved';
    date: string;
    description: string;
}

const MOCK_TICKETS: Ticket[] = [
    {
        id: 'TKT-1024',
        subject: 'Dashboard not loading on mobile',
        type: 'Bug',
        status: 'Resolved',
        date: '2024-03-10',
        description: 'When I try to access the dashboard from my iPad, the charts do not render.'
    },
    {
        id: 'TKT-1025',
        subject: 'Request for dark mode',
        type: 'Feature Request',
        status: 'Open',
        date: '2024-03-12',
        description: 'It would be great to have a dark mode for late night study sessions.'
    }
];

const HelpSupport: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
    const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

    // Form State
    const [subject, setSubject] = useState('');
    const [type, setType] = useState<Ticket['type']>('General Inquiry');
    const [description, setDescription] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTicket: Ticket = {
            id: `TKT-${Math.floor(Math.random() * 10000)}`,
            subject,
            type,
            status: 'Open',
            date: new Date().toISOString().split('T')[0],
            description
        };

        setTickets([newTicket, ...tickets]);
        setShowSuccess(true);
        setSubject('');
        setDescription('');
        setType('General Inquiry');

        setTimeout(() => {
            setShowSuccess(false);
            setActiveTab('history');
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
                <p className="text-gray-500">Need assistance? Submit a ticket or check your support history.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('create')}
                    className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === 'create'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Submit Request
                    {activeTab === 'create' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === 'history'
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Ticket History
                    {activeTab === 'history' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                </button>
            </div>

            {activeTab === 'create' ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    {showSuccess ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ticket Submitted!</h3>
                            <p className="text-gray-500">We've received your request and will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Brief summary of the issue"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value as any)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Bug">Report a Bug</option>
                                        <option value="Feature Request">Request a Feature</option>
                                        <option value="Billing">Billing Issue</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Please provide detailed information..."
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                                >
                                    Submit Ticket
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-mono text-xs text-gray-400">#{ticket.id}</span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${ticket.status === 'Resolved' ? 'bg-gray-100 text-gray-600' :
                                            ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                                                'bg-white border border-gray-200 text-gray-600'
                                        }`}>
                                        {ticket.status}
                                    </span>
                                    <span className="text-xs text-gray-400">• {ticket.date}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{ticket.subject}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">{ticket.description}</p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${ticket.type === 'Bug' ? 'bg-gray-900 text-white' :
                                        ticket.type === 'Feature Request' ? 'bg-blue-50 text-blue-600' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {ticket.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HelpSupport;
