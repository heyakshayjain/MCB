import React, { useState } from 'react';
import { useBrowserController } from '../../hooks/useBrowserController';
import { BrowserToolbar } from './BrowserToolbar';
import { BrowserTabs } from './BrowserTabs';
import { CloudBrowserViewer } from './CloudBrowserViewer';

interface Tab {
    id: string;
    url: string;
    title: string;
    favicon?: string;
}

export const CloudBrowser: React.FC = () => {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: '1', url: 'https://www.google.com', title: 'New Tab' }
    ]);
    const [activeTabId, setActiveTabId] = useState('1');
    const [inputUrl, setInputUrl] = useState('https://www.google.com');

    const {
        state,
        canvasRef,
        navigate,
        goBack,
        goForward,
        reload,
        click,
        scroll,
        keypress,
        mousemove,
        isConnected
    } = useBrowserController({ sessionId: activeTabId });

    // Handle URL navigation
    const handleNavigate = () => {
        let url = inputUrl.trim();

        // Add https:// if no protocol
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            // Check if it looks like a URL
            if (url.includes('.') && !url.includes(' ')) {
                url = 'https://' + url;
            } else {
                // Treat as search query
                url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
            }
        }

        navigate(url);

        // Update tab
        setTabs(prev =>
            prev.map(tab =>
                tab.id === activeTabId ? { ...tab, url } : tab
            )
        );
    };

    // Handle home button
    const handleHome = () => {
        const homeUrl = 'https://www.google.com';
        setInputUrl(homeUrl);
        navigate(homeUrl);
    };

    // Handle new tab
    const handleNewTab = () => {
        const newTabId = Date.now().toString();
        const newTab: Tab = {
            id: newTabId,
            url: 'https://www.google.com',
            title: 'New Tab'
        };

        setTabs(prev => [...prev, newTab]);
        setActiveTabId(newTabId);
        setInputUrl('https://www.google.com');
    };

    // Handle tab close
    const handleTabClose = (tabId: string) => {
        if (tabs.length === 1) return; // Don't close last tab

        setTabs(prev => prev.filter(tab => tab.id !== tabId));

        if (activeTabId === tabId) {
            const currentIndex = tabs.findIndex(tab => tab.id === tabId);
            const newActiveTab = tabs[currentIndex - 1] || tabs[currentIndex + 1];
            if (newActiveTab) {
                setActiveTabId(newActiveTab.id);
                setInputUrl(newActiveTab.url);
            }
        }
    };

    // Handle tab switch
    const handleTabClick = (tabId: string) => {
        setActiveTabId(tabId);
        const tab = tabs.find(t => t.id === tabId);
        if (tab) {
            setInputUrl(tab.url);
        }
    };

    // Update input URL when browser state changes
    React.useEffect(() => {
        if (state.currentUrl && state.currentUrl !== inputUrl) {
            setInputUrl(state.currentUrl);

            // Update tab URL and title
            setTabs(prev =>
                prev.map(tab =>
                    tab.id === activeTabId
                        ? { ...tab, url: state.currentUrl, title: state.title || tab.title }
                        : tab
                )
            );
        }
    }, [state.currentUrl, state.title, activeTabId, inputUrl]);

    return (
        <div className="h-full flex flex-col bg-[#F5F5F7]">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-sm z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Cloud Browser</h1>
                                <p className="text-xs text-gray-500 font-medium">AI-Powered Application Assistant</p>
                            </div>
                        </div>
                    </div>

                    {/* Connection Status */}
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isConnected
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-red-50 border-red-200 text-red-700'
                            }`}>
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} ${isConnected ? 'animate-pulse' : ''
                                }`}></div>
                            <span className="text-xs font-semibold">
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <BrowserTabs
                tabs={tabs}
                activeTabId={activeTabId}
                onTabClick={handleTabClick}
                onTabClose={handleTabClose}
                onNewTab={handleNewTab}
            />

            {/* Toolbar */}
            <BrowserToolbar
                url={inputUrl}
                onUrlChange={setInputUrl}
                onNavigate={handleNavigate}
                onBack={goBack}
                onForward={goForward}
                onReload={reload}
                onHome={handleHome}
                canGoBack={state.canGoBack}
                canGoForward={state.canGoForward}
                isLoading={state.isLoading}
                isSecure={state.isSecure}
                title={state.title}
            />

            {/* Browser Viewer */}
            <div className="flex-1 overflow-hidden">
                <CloudBrowserViewer
                    canvasRef={canvasRef}
                    onClick={click}
                    onScroll={scroll}
                    onKeyPress={keypress}
                    onMouseMove={mousemove}
                    isConnected={isConnected}
                    isLoading={state.isLoading}
                />
            </div>

            {/* Footer Info */}
            <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200 px-6 py-3">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-4">
                        <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">Session: {activeTabId}</span>
                        <span className="text-gray-300">|</span>
                        <span>Resolution: 1280x720</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Secure cloud connection</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
