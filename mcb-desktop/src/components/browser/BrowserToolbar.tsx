import React from 'react';

interface BrowserToolbarProps {
    url: string;
    onUrlChange: (url: string) => void;
    onNavigate: () => void;
    onBack: () => void;
    onForward: () => void;
    onReload: () => void;
    onHome: () => void;
    canGoBack: boolean;
    canGoForward: boolean;
    isLoading: boolean;
    isSecure: boolean;
    title: string;
}

export const BrowserToolbar: React.FC<BrowserToolbarProps> = ({
    url,
    onUrlChange,
    onNavigate,
    onBack,
    onForward,
    onReload,
    onHome,
    canGoBack,
    canGoForward,
    isLoading,
    isSecure,
    title
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNavigate();
    };

    return (
        <div className="bg-white/50 backdrop-blur-md border-b border-gray-200 px-6 py-3">
            <div className="flex items-center gap-4">
                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onBack}
                        disabled={!canGoBack}
                        className={`p-2 rounded-xl transition-all ${canGoBack
                                ? 'hover:bg-white hover:shadow-sm text-gray-600 hover:text-blue-600'
                                : 'text-gray-300 cursor-not-allowed'
                            }`}
                        title="Back"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={onForward}
                        disabled={!canGoForward}
                        className={`p-2 rounded-xl transition-all ${canGoForward
                                ? 'hover:bg-white hover:shadow-sm text-gray-600 hover:text-blue-600'
                                : 'text-gray-300 cursor-not-allowed'
                            }`}
                        title="Forward"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        onClick={onReload}
                        className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-600 hover:text-blue-600 transition-all"
                        title="Reload"
                    >
                        <svg
                            className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={onHome}
                        className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-600 hover:text-blue-600 transition-all"
                        title="Home"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </button>
                </div>

                {/* Address Bar */}
                <form onSubmit={handleSubmit} className="flex-1">
                    <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        {/* Security Icon */}
                        <div className="pl-4 pr-2">
                            {isSecure ? (
                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            )}
                        </div>

                        <input
                            type="text"
                            value={url}
                            onChange={(e) => onUrlChange(e.target.value)}
                            placeholder="Enter URL or search..."
                            className="flex-1 bg-transparent text-gray-900 text-sm py-3 px-2 outline-none placeholder-gray-400 font-medium"
                        />

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="pr-4">
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </form>

                {/* Page Title (optional, shown on hover) */}
                {title && title !== 'New Tab' && (
                    <div className="hidden lg:block max-w-xs">
                        <div className="text-xs text-gray-500 font-medium truncate bg-gray-100 px-3 py-1.5 rounded-lg" title={title}>
                            {title}
                        </div>
                    </div>
                )}            </div>
        </div>
    );
};
