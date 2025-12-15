import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Plus, X, Star, MoreVertical, Clock, Bookmark, Columns } from 'lucide-react';

interface EmbeddedBrowserProps {
    onToggleSidebar?: () => void;
}

interface Tab {
    id: string;
    title: string;
    url: string;
}

interface BookmarkItem {
    url: string;
    title: string;
    timestamp: number;
}

interface HistoryItem {
    url: string;
    title: string;
    timestamp: number;
}

export const EmbeddedBrowser: React.FC<EmbeddedBrowserProps> = ({ onToggleSidebar }) => {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);
    const [secondaryTabId, setSecondaryTabId] = useState<string | null>(null);
    const [isSplitView, setIsSplitView] = useState(false);
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showPanel, setShowPanel] = useState<'bookmarks' | 'history' | null>(null);
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);

    // Helper to generate IDs
    const generateId = () => Math.random().toString(36).substr(2, 9);

    // Initialize first tab
    useEffect(() => {
        if (tabs.length === 0) {
            handleNewTab();
        }
    }, []);

    // Listen for toggle-sidebar
    useEffect(() => {
        const removeListener = window.electron?.onToggleSidebar?.(() => {
            if (onToggleSidebar) onToggleSidebar();
        });
        return () => { if (removeListener) removeListener(); };
    }, [onToggleSidebar]);

    // Listen for navigation events
    useEffect(() => {
        if (window.electron?.onBrowserNavigated) {
            window.electron.onBrowserNavigated((newUrl: string, tabId: string) => {
                // Only update URL bar if the navigated tab is the active primary tab
                if (tabId === activeTabId) {
                    setUrl(newUrl);
                    setIsLoading(false);
                }

                // Update active tab URL
                setTabs(prev => prev.map(tab =>
                    tab.id === tabId ? { ...tab, url: newUrl } : tab
                ));
            });
        }

        if (window.electron?.onBrowserTitleUpdated) {
            window.electron.onBrowserTitleUpdated((title: string, tabId: string) => {
                setTabs(prev => prev.map(tab =>
                    tab.id === tabId ? { ...tab, title } : tab
                ));
            });
        }
    }, [activeTabId]);

    // Check bookmark status when URL changes
    useEffect(() => {
        checkBookmarkStatus();
    }, [url]);

    // Update bounds on resize
    useEffect(() => {
        const handleResize = () => updateBrowserBounds();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isSplitView, activeTabId, secondaryTabId]);

    const updateBrowserBounds = () => {
        if (!containerRef.current || !window.electron) return;
        const rect = containerRef.current.getBoundingClientRect();

        if (isSplitView && activeTabId && secondaryTabId) {
            const halfWidth = Math.floor(rect.width / 2);

            // Primary View (Left)
            window.electron.browserUpdateBounds({
                tabId: activeTabId,
                bounds: {
                    x: Math.round(rect.left),
                    y: Math.round(rect.top),
                    width: halfWidth,
                    height: Math.round(rect.height)
                }
            });

            // Secondary View (Right)
            window.electron.browserUpdateBounds({
                tabId: secondaryTabId,
                bounds: {
                    x: Math.round(rect.left) + halfWidth,
                    y: Math.round(rect.top),
                    width: rect.width - halfWidth, // Ensure full coverage
                    height: Math.round(rect.height)
                }
            });
        } else if (activeTabId) {
            // Single View
            window.electron.browserUpdateBounds({
                tabId: activeTabId,
                bounds: {
                    x: Math.round(rect.left),
                    y: Math.round(rect.top),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                }
            });
            // Hide secondary if it exists and we're not in split view
            if (secondaryTabId) {
                window.electron.browserHide(secondaryTabId);
            }
        }
    };

    // Update bounds when container changes size or active tab changes
    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver(() => updateBrowserBounds());
        resizeObserver.observe(containerRef.current);
        setTimeout(updateBrowserBounds, 100); // Force update
        return () => resizeObserver.disconnect();
    }, [containerRef.current, activeTabId, secondaryTabId, isSplitView]);

    const checkBookmarkStatus = async () => {
        if (!window.electron) return;
        const savedBookmarks = await window.electron.bookmarksGet();
        setBookmarks(savedBookmarks);
        setIsBookmarked(savedBookmarks.some((b: BookmarkItem) => b.url === url));
    };

    const toggleBookmark = async () => {
        if (!window.electron) return;
        if (isBookmarked) {
            await window.electron.bookmarksRemove(url);
            setIsBookmarked(false);
        } else {
            const activeTab = tabs.find(t => t.id === activeTabId);
            await window.electron.bookmarksAdd({
                url,
                title: activeTab?.title || url
            });
            setIsBookmarked(true);
        }
        checkBookmarkStatus();
    };

    const loadHistory = async () => {
        if (!window.electron) return;
        const data = await window.electron.historyGet();
        setHistory(data);
    };

    const handleMenuClick = (type: 'bookmarks' | 'history') => {
        setShowPanel(type);
        setShowMenu(false);
        if (type === 'bookmarks') checkBookmarkStatus();
        if (type === 'history') loadHistory();
    };

    // --- Tab Management ---

    const handleNewTab = async () => {
        if (!window.electron) return;
        const newTabId = generateId();
        const newTab: Tab = { id: newTabId, title: 'New Tab', url: 'https://www.google.com' };

        await window.electron.tabCreate(newTabId);
        setTabs(prev => [...prev, newTab]);

        if (isSplitView && !secondaryTabId && activeTabId) {
            // If in split view and no secondary tab, make this new tab the secondary
            setSecondaryTabId(newTabId);
            // Ensure both primary and secondary are visible
            window.electron.browserSetViews([activeTabId, newTabId]);
            window.electron.tabSelect(activeTabId);
            window.electron.tabSelect(newTabId);
            updateBrowserBounds();
        } else {
            handleSwitchTab(newTabId);
        }
    };

    const handleSwitchTab = async (tabId: string) => {
        if (!window.electron) return;

        if (isSplitView) {
            // In split view, clicking a tab sets it as primary (left)
            if (tabId === secondaryTabId) {
                // If the clicked tab is the current secondary, swap it with the primary
                const currentPrimary = activeTabId;
                setActiveTabId(tabId);
                setSecondaryTabId(currentPrimary);
                if (currentPrimary) {
                    await window.electron.tabSelect(currentPrimary); // Ensure old primary is still visible as secondary
                }
            } else if (tabId === activeTabId) {
                // If clicking the active primary tab, do nothing or bring it to front (already is)
            } else {
                // If clicking a non-active, non-secondary tab, make it the new primary
                setActiveTabId(tabId);
            }
            // Ensure both primary and secondary are visible
            if (activeTabId && secondaryTabId) {
                window.electron.browserSetViews([activeTabId, secondaryTabId]);
            }
            if (activeTabId) await window.electron.tabSelect(activeTabId);
            if (secondaryTabId) await window.electron.tabSelect(secondaryTabId);
        } else {
            setActiveTabId(tabId);
            window.electron.browserSetViews([tabId]);
            await window.electron.tabSelect(tabId);
        }

        // Update URL bar to current tab's URL
        const tab = tabs.find(t => t.id === tabId);
        if (tab) setUrl(tab.url);

        updateBrowserBounds();
    };

    const handleCloseTab = async (e: React.MouseEvent, tabId: string) => {
        e.stopPropagation();
        if (!window.electron) return;

        await window.electron.tabClose(tabId);

        const newTabs = tabs.filter(t => t.id !== tabId);
        setTabs(newTabs);

        if (tabId === activeTabId) {
            if (newTabs.length > 0) {
                setActiveTabId(newTabs[newTabs.length - 1].id);
            } else {
                setActiveTabId(null);
                handleNewTab();
            }
        }

        if (tabId === secondaryTabId) {
            setSecondaryTabId(null);
            setIsSplitView(false); // Exit split view if secondary closed
        }
        updateBrowserBounds();
    };

    const toggleSplitView = async () => {
        if (isSplitView) {
            setIsSplitView(false);
            if (secondaryTabId) {
                // We don't strictly need to hide it if we set views to just activeTabId, 
                // but keeping it for safety or if implementation requires explicit hide.
                // However, browserSetViews([activeTabId]) should handle it.
                // window.electron.browserHide(secondaryTabId); 
            }
            setSecondaryTabId(null);
            // Re-layout single view
            if (activeTabId) {
                window.electron?.browserSetViews([activeTabId]);
            }
            updateBrowserBounds();
        } else {
            // Try to find a candidate for secondary tab
            const candidate = tabs.find(t => t.id !== activeTabId);
            if (candidate) {
                setSecondaryTabId(candidate.id);
                setIsSplitView(true);
                // Ensure both primary and secondary are visible
                if (activeTabId) {
                    window.electron?.browserSetViews([activeTabId, candidate.id]);
                    await window.electron?.tabSelect(activeTabId);
                }
                await window.electron?.tabSelect(candidate.id);
                updateBrowserBounds();
            } else {
                // If only one tab exists, create a new one for split view
                await handleNewTab(); // This will create a new tab and make it active
                // After handleNewTab, the new tab is activeTabId. The old one is now the candidate.
                // We need to re-evaluate after handleNewTab completes.
                // This is a bit tricky due to async state updates.
                // For simplicity, let's just create a new tab and make it secondary.
                const newTabId = generateId();
                const newTab: Tab = { id: newTabId, title: 'New Tab', url: 'https://www.google.com' };
                await window.electron?.tabCreate(newTabId);
                setTabs(prev => [...prev, newTab]);
                setSecondaryTabId(newTabId);
                setIsSplitView(true);
                if (activeTabId) {
                    window.electron?.browserSetViews([activeTabId, newTabId]);
                    await window.electron?.tabSelect(activeTabId);
                }
                await window.electron?.tabSelect(newTabId);
                updateBrowserBounds();
            }
        }
    };

    // --- Navigation ---

    const handleNavigate = async () => {
        if (!window.electron || !url.trim() || !activeTabId) return;
        setIsLoading(true);
        try {
            const newUrl = await window.electron.browserNavigate(activeTabId, url);
            setUrl(newUrl);
        } catch (error) {
            console.error('Navigation failed:', error);
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (!activeTabId) return;
        window.electron?.browserBack(activeTabId);
    };
    const handleForward = () => {
        if (!activeTabId) return;
        window.electron?.browserForward(activeTabId);
    };
    const handleReload = () => {
        if (!activeTabId) return;
        setIsLoading(true);
        window.electron?.browserReload(activeTabId);
        setTimeout(() => setIsLoading(false), 1000);
    };
    const handleHome = () => {
        if (!activeTabId) return;
        setUrl('https://www.google.com');
        window.electron?.browserNavigate(activeTabId, 'https://www.google.com');
    };

    return (
        <div className="embedded-browser">
            {/* Tab Bar */}
            <div className="tab-bar">
                <div className="tabs-list">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`tab ${tab.id === activeTabId ? 'active' : ''} ${tab.id === secondaryTabId ? 'secondary' : ''} `}
                            onClick={() => handleSwitchTab(tab.id)}
                        >
                            <span className="tab-title">{tab.title}</span>
                            <button
                                className="tab-close"
                                onClick={(e) => handleCloseTab(e, tab.id)}
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}
                </div>
                <button className="new-tab-btn" onClick={handleNewTab}>
                    <Plus size={16} />
                </button>
            </div>

            {/* Browser Controls */}
            <div className="browser-controls">
                <div className="nav-buttons">
                    <button onClick={handleBack} className="nav-btn" title="Back"><ArrowLeft size={18} /></button>
                    <button onClick={handleForward} className="nav-btn" title="Forward"><ArrowRight size={18} /></button>
                    <button onClick={handleReload} className="nav-btn" title="Reload">
                        <RotateCw size={18} className={isLoading ? 'spinning' : ''} />
                    </button>
                    <button onClick={handleHome} className="nav-btn" title="Home"><Home size={18} /></button>
                    <button
                        onClick={toggleSplitView}
                        className={`nav-btn ${isSplitView ? 'text-blue-600 bg-blue-50' : ''}`}
                        title="Split Screen"
                    >
                        <Columns size={18} />
                    </button>
                    {onToggleSidebar && (
                        <button onClick={onToggleSidebar} className="nav-btn toggle-btn" title="Toggle Quick Copy">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="url-bar-container relative">
                    <input
                        type="text"
                        className="url-bar pr-8" // Add padding for star icon
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
                        placeholder="Enter URL..."
                    />
                    <button
                        onClick={toggleBookmark}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors ${isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
                        title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                    >
                        <Star size={16} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="nav-btn"
                        title="More options"
                    >
                        <MoreVertical size={18} />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                            <button
                                onClick={() => handleMenuClick('bookmarks')}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Bookmark size={16} /> Bookmarks
                            </button>
                            <button
                                onClick={() => handleMenuClick('history')}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Clock size={16} /> History
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Side Panel for History/Bookmarks */}
            {showPanel && (
                <div className="fixed top-[88px] right-0 bottom-0 w-80 bg-white shadow-2xl border-l border-gray-200 z-40 flex flex-col animate-slide-in overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 flex-shrink-0">
                        <h3 className="font-semibold text-gray-700 capitalize">{showPanel}</h3>
                        <button onClick={() => setShowPanel(null)} className="p-1 hover:bg-gray-200 rounded-full" title="Close">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                        {showPanel === 'bookmarks' && bookmarks.map((item, i) => (
                            <div key={i} className="p-2 hover:bg-gray-50 rounded-lg group cursor-pointer" onClick={() => {
                                setUrl(item.url);
                                handleNavigate(); // Need to ensure handleNavigate uses the new URL state or pass it directly
                                setShowPanel(null);
                            }}>
                                <div className="font-medium text-sm truncate">{item.title}</div>
                                <div className="text-xs text-gray-400 truncate">{item.url}</div>
                            </div>
                        ))}
                        {showPanel === 'history' && history.map((item, i) => (
                            <div key={i} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => {
                                setUrl(item.url);
                                // Trigger navigation logic
                                if (window.electron) window.electron.browserNavigate(activeTabId!, item.url);
                                setShowPanel(null);
                            }}>
                                <div className="font-medium text-sm truncate">{item.title || item.url}</div>
                                <div className="text-xs text-gray-400 truncate">{new Date(item.timestamp).toLocaleString()}</div>
                            </div>
                        ))}
                        {((showPanel === 'bookmarks' && bookmarks.length === 0) || (showPanel === 'history' && history.length === 0)) && (
                            <div className="text-center text-gray-400 mt-10 text-sm">No items found</div>
                        )}
                    </div>
                </div>
            )}

            {/* Browser View Container */}
            <div
                ref={containerRef}
                className="browser-view-container"
                style={{ flex: 1, position: 'relative', backgroundColor: '#fff' }}
            >
                {isSplitView && (
                    <div className="absolute inset-y-0 left-1/2 w-px bg-gray-300 z-10" />
                )}
            </div>

            <style>{`
    .embedded-browser {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background: #f3f4f6;
    }

    .tab-bar {
        display: flex;
        align-items: center;
        padding: 8px 8px 0;
        background: #dfe1e5;
        gap: 4px;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .tabs-list {
        display: flex;
        gap: 4px;
        overflow-x: auto;
        max-width: calc(100% - 40px);
        scrollbar-width: none; /* Firefox */
    }

    .tabs-list::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
    }

    .tab {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: transparent;
        border-radius: 8px 8px 0 0;
        font-size: 12px;
        color: #5f6368;
        cursor: pointer;
        max-width: 200px;
        min-width: 120px;
        transition: background 0.1s;
        position: relative;
        flex-shrink: 0;
    }

    .tab:hover {
        background: #e8eaed;
    }

    .tab.active {
        background: #fff;
        color: #202124;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
        z-index: 1;
    }

    .tab.secondary {
        background: #f1f3f4;
        color: #202124;
        border-bottom: 2px solid #1a73e8;
    }

    .tab-title {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .tab-close {
        padding: 2px;
        border-radius: 50%;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.1s, background 0.1s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tab:hover .tab-close {
        opacity: 1;
    }

    .tab-close:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .new-tab-btn {
        padding: 6px;
        border-radius: 50%;
        border: none;
        background: transparent;
        color: #5f6368;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .new-tab-btn:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .browser-controls {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px;
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        position: sticky;
        top: 44px;
        z-index: 9;
    }

    .nav-buttons {
        display: flex;
        gap: 8px;
    }

    .nav-btn {
        background: transparent;
        border: none;
        border-radius: 6px;
        padding: 6px;
        color: #555;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .nav-btn:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #000;
    }
    
    .toggle-btn {
        color: #7c3aed;
        background: rgba(124, 58, 237, 0.1);
    }
    
    .toggle-btn:hover {
        background: rgba(124, 58, 237, 0.15);
        color: #6d28d9;
    }

    .url-bar-container {
        flex: 1;
        max-width: 800px;
        margin: 0 auto;
    }

    .url-bar {
        width: 100%;
        padding: 8px 16px;
        border: 1px solid transparent;
        border-radius: 20px;
        background: #f1f3f4;
        color: #333;
        font-size: 13px;
        outline: none;
        transition: all 0.2s;
        text-align: left;
    }

    .url-bar:focus {
        background: #fff;
        border-color: #1a73e8;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
    }
    
    .url-bar:hover {
        background: #e8eaed;
    }
    
    .url-bar:focus:hover {
        background: #fff;
    }

    .browser-view-container {
        background: #fff;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .spinning {
        animation: spin 1s linear infinite;
    }
    .animate-slide-in {
        animation: slideIn 0.2s ease-out;
    }
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    /* Custom Scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
    }
`}</style>
        </div>
    );
};
