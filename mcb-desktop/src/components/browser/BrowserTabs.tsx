import React from 'react';

interface Tab {
    id: string;
    url: string;
    title: string;
    favicon?: string;
}

interface BrowserTabsProps {
    tabs: Tab[];
    activeTabId: string;
    onTabClick: (tabId: string) => void;
    onTabClose: (tabId: string) => void;
    onNewTab: () => void;
}

export const BrowserTabs: React.FC<BrowserTabsProps> = ({
    tabs,
    activeTabId,
    onTabClick,
    onTabClose,
    onNewTab
}) => {
    return (
        <div className="bg-gray-50/50 border-b border-gray-200 px-2 py-2 flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all min-w-[140px] max-w-[220px] shadow-sm border ${activeTabId === tab.id
                            ? 'bg-white text-gray-900 border-gray-200 shadow-md'
                            : 'bg-white/40 text-gray-500 border-transparent hover:bg-white/80 hover:text-gray-700'
                        }`}
                >
                    {/* Favicon */}
                    <div className="flex-shrink-0 w-4 h-4 opacity-80">
                        {tab.favicon ? (
                            <img src={tab.favicon} alt="" className="w-full h-full rounded-sm" />
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                            </svg>
                        )}
                    </div>

                    {/* Title */}
                    <span className="flex-1 text-sm font-medium truncate">{tab.title}</span>

                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onTabClose(tab.id);
                        }}
                        className={`flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ${activeTabId === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}

            {/* New Tab Button */}
            <button
                onClick={onNewTab}
                className="flex-shrink-0 p-2.5 rounded-xl hover:bg-white hover:shadow-sm text-gray-400 hover:text-blue-600 transition-all border border-transparent hover:border-gray-200"
                title="New Tab"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};
