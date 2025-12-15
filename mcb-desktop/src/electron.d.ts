// Type definitions for Electron IPC
interface Window {
    electron?: {
        getBackendUrl: () => Promise<string>;
        browserNavigate: (tabId: string, url: string) => Promise<string>;
        browserBack: (tabId: string) => Promise<void>;
        browserForward: (tabId: string) => Promise<void>;
        browserReload: (tabId: string) => Promise<void>;
        browserGetUrl: () => Promise<string>;
        browserPaste: (text: string) => Promise<boolean>;
        browserUpdateBounds: (args: { tabId?: string; bounds: { x: number; y: number; width: number; height: number } }) => Promise<void>;
        browserSetViews: (tabIds: string[]) => Promise<void>;
        browserShow: () => Promise<void>;
        browserHide: (tabId?: string) => Promise<void>;
        browserHideAll: () => Promise<void>;
        startDrag: (fileName: string) => Promise<void>;
        onBrowserNavigated: (callback: (url: string, tabId: string) => void) => void;
        onBrowserTitleUpdated: (callback: (title: string, tabId: string) => void) => void;
        onToggleSidebar: (callback: () => void) => () => void;
        tabCreate: (tabId: string) => Promise<void>;
        tabSelect: (tabId: string) => Promise<void>;
        tabClose: (tabId: string) => Promise<void>;
        bookmarksGet: () => Promise<any[]>;
        bookmarksAdd: (bookmark: any) => Promise<any[]>;
        bookmarksRemove: (url: string) => Promise<any[]>;
        historyGet: () => Promise<any[]>;
        historyClear: () => Promise<any[]>;
        platform: string;
    };
}
