const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
    getBackendUrl: () => ipcRenderer.invoke('get-backend-url'),
    platform: process.platform,
    // Browser control
    browserNavigate: (tabId, url) => ipcRenderer.invoke('browser-navigate', tabId, url),
    browserBack: (tabId) => ipcRenderer.invoke('browser-back', tabId),
    browserForward: (tabId) => ipcRenderer.invoke('browser-forward', tabId),
    browserReload: (tabId) => ipcRenderer.invoke('browser-reload', tabId),
    browserGetUrl: () => ipcRenderer.invoke('browser-get-url'),
    browserPaste: (text) => ipcRenderer.invoke('browser-paste', text),
    browserUpdateBounds: (args) => ipcRenderer.invoke('browser-update-bounds', args),
    browserSetViews: (tabIds) => ipcRenderer.invoke('browser-set-views', tabIds),
    browserShow: () => ipcRenderer.invoke('browser-show'),
    browserHide: (tabId) => ipcRenderer.invoke('browser-hide', tabId),
    browserHideAll: () => ipcRenderer.invoke('browser-hide-all'),
    startDrag: (fileName) => ipcRenderer.invoke('start-drag', fileName),

    // Event listeners
    onBrowserNavigated: (callback) => {
        ipcRenderer.on('browser-navigated', (event, url) => callback(url));
    },
    onBrowserTitleUpdated: (callback) => {
        ipcRenderer.on('browser-title-updated', (event, title) => callback(title));
    },
    onToggleSidebar: (callback) => {
        const subscription = (event) => callback();
        ipcRenderer.on('toggle-sidebar', subscription);
        return () => ipcRenderer.removeListener('toggle-sidebar', subscription);
    },
    tabCreate: (tabId) => ipcRenderer.invoke('tab-create', tabId),
    tabSelect: (tabId) => ipcRenderer.invoke('tab-select', tabId),
    tabClose: (tabId) => ipcRenderer.invoke('tab-close', tabId),
    bookmarksGet: () => ipcRenderer.invoke('bookmarks-get'),
    bookmarksAdd: (bookmark) => ipcRenderer.invoke('bookmarks-add', bookmark),
    bookmarksRemove: (url) => ipcRenderer.invoke('bookmarks-remove', url),
    historyGet: () => ipcRenderer.invoke('history-get'),
    historyClear: () => ipcRenderer.invoke('history-clear')
});
