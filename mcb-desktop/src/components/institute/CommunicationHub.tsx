import React, { useState } from 'react';
import { Message } from '../../utils/instituteUtils';

interface CommunicationHubProps {
    messages: Message[];
}

const CommunicationHub: React.FC<CommunicationHubProps> = ({ messages: initialMessages }) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [recipientType, setRecipientType] = useState('all');
    const [selectedBatch, setSelectedBatch] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        const newMessage: Message = {
            id: `MSG-${Date.now()}`,
            subject,
            content,
            sender: 'Admin',
            recipients: recipientType === 'all' ? 'All Students' : selectedBatch,
            sentAt: new Date().toISOString(),
            type: 'announcement'
        };

        setMessages([newMessage, ...messages]);
        setSubject('');
        setContent('');
        alert('Message sent successfully!');
        setActiveTab('history');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Communication Hub</h2>
                    <p className="text-gray-500">Broadcast announcements, alerts, and reminders to students.</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('compose')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'compose' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Compose
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        History
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'compose' ? (
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <form onSubmit={handleSendMessage} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Recipients</label>
                                        <select
                                            value={recipientType}
                                            onChange={(e) => setRecipientType(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="all">All Students</option>
                                            <option value="batch">Specific Batch</option>
                                        </select>
                                    </div>
                                    {recipientType === 'batch' && (
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Batch</label>
                                            <select
                                                value={selectedBatch}
                                                onChange={(e) => setSelectedBatch(e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            >
                                                <option value="">Select a batch...</option>
                                                <option value="Batch A (Morning)">Batch A (Morning)</option>
                                                <option value="Batch B (Evening)">Batch B (Evening)</option>
                                                <option value="Batch C (Weekend)">Batch C (Weekend)</option>
                                            </select>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g., Important Exam Update"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message Content</label>
                                    <textarea
                                        required
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={6}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Type your message here..."
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                                            Send as Email
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                                            Send via SMS
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{msg.subject}</h3>
                                            <p className="text-sm text-gray-500">To: {msg.recipients}</p>
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                                            {new Date(msg.sentAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{msg.content}</p>
                                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-400 border-t border-gray-50 pt-3">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email Sent
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            SMS Sent
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">Quick Tips</h3>
                        <ul className="space-y-3 text-sm text-blue-800">
                            <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                Keep subject lines concise and clear.
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                Use "Important" in subject for urgent alerts.
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                Messages are automatically sent via Email and SMS.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <p className="text-sm text-gray-600">98% delivery rate for last campaign</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <p className="text-sm text-gray-600">Batch A schedule updated</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunicationHub;
