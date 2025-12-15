import React, { useState } from 'react';

const Documents: React.FC = () => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        // Handle file upload logic here
        alert("File upload feature coming soon!");
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
                    <p className="text-gray-500 mt-1">Manage your transcripts, essays, and certificates.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Upload New
                </button>
            </div>

            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-3xl p-12 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Drag and drop your files here</h3>
                <p className="text-gray-500 mt-2">or <button className="text-blue-600 font-medium hover:underline">browse files</button> from your computer</p>
                <p className="text-xs text-gray-400 mt-4">Supported formats: PDF, DOCX, JPG (Max 10MB)</p>
            </div>

            {/* Recent Documents */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Recent Files</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {[
                        { name: "Transcript_Fall2024.pdf", type: "PDF", size: "2.4 MB", date: "2 hours ago" },
                        { name: "CommonApp_Essay_Final.docx", type: "DOCX", size: "1.1 MB", date: "Yesterday" },
                        { name: "Recommendation_Letter.pdf", type: "PDF", size: "850 KB", date: "3 days ago" },
                    ].map((doc, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{doc.name}</h4>
                                    <p className="text-xs text-gray-500">{doc.size} • {doc.date}</p>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Documents;
