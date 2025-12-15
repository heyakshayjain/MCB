const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let browserViews = new Map(); // Map<tabId, BrowserView>
let activeTabId = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        title: 'MCB - Premium Browser',
        icon: path.join(__dirname, 'favicon.ico')
    });

    // Load the React app at login page for desktop
    const startUrl = isDev
        ? 'http://localhost:3000/#/login'
        : `file://${path.join(__dirname, '../build/index.html')}#/login`;

    mainWindow.loadURL(startUrl);

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
        browserViews.forEach(view => view.webContents.destroy());
        browserViews.clear();
        activeTabId = null;
    });
}

// Create BrowserView for a specific tab
function createBrowserView(tabId) {
    if (browserViews.has(tabId)) {
        return browserViews.get(tabId);
    }

    const view = new BrowserView({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            webSecurity: true,
            preload: path.join(__dirname, 'browser-preload.js')
        }
    });

    browserViews.set(tabId, view);

    // Handle toggle-sidebar from browser view
    ipcMain.on('toggle-sidebar', () => {
        mainWindow.webContents.send('toggle-sidebar');
    });

    // Set initial bounds
    const bounds = mainWindow.getBounds();
    view.setBounds({
        x: 260,
        y: 120,
        width: bounds.width - 260,
        height: bounds.height - 120
    });

    view.setAutoResize({
        width: true,
        height: true
    });

    // Load initial page
    view.webContents.loadURL('https://www.google.com');

    // Force links to open in the same view
    view.webContents.setWindowOpenHandler(({ url }) => {
        view.webContents.loadURL(url);
        return { action: 'deny' };
    });

    // Forward navigation events to frontend
    view.webContents.on('did-navigate', (event, url) => {
        if (activeTabId === tabId) {
            mainWindow.webContents.send('browser-navigated', url);
        }
        // Record history
        const history = loadData(historyPath);
        history.push({ url, title: view.webContents.getTitle(), timestamp: Date.now() });
        if (history.length > 1000) history.shift();
        saveData(historyPath, history);
    });

    view.webContents.on('did-navigate-in-page', (event, url) => {
        if (activeTabId === tabId) {
            mainWindow.webContents.send('browser-navigated', url);
        }
    });

    view.webContents.on('page-title-updated', (event, title) => {
        if (activeTabId === tabId) {
            mainWindow.webContents.send('browser-title-updated', title);
        }
    });

    return view;
}

// IPC Handlers
// IPC Handlers for Tabs
ipcMain.handle('tab-create', (event, tabId) => {
    createBrowserView(tabId);
});

ipcMain.handle('tab-select', (event, tabId) => {
    if (browserViews.has(tabId)) {
        activeTabId = tabId;
        const view = browserViews.get(tabId);

        // In Electron 5+, we can use addBrowserView to have multiple views.
        // However, for simplicity and compatibility, we might just replace the view.
        // BUT, for split screen, we need TWO views.
        // Let's assume we are using a version that supports setBrowserView (single) or we need to manage it.
        // Actually, setBrowserView replaces all views. addBrowserView adds one.
        // To support split screen, we should use addBrowserView or setBrowserViews([]).

        // For now, let's just set this as the primary view. 
        // If the frontend is in split mode, it will call browser-update-bounds for both.
        // But we need to ensure both are attached.

        // Let's try to be smart:
        // If we are just switching tabs, we might be in single view mode.
        // If we are in split mode, the frontend manages the logic of "which views are visible".
        // But the backend needs to know which views to attach.

        // Current implementation of tab-select assumes single view.
        // Let's change it to just "make this tab active" and attach it.
        // If there was another view (secondary), it might get detached if we use setBrowserView.

        // Better approach:
        // The frontend should tell us WHICH views to show.
        // Let's add a new IPC `browser-set-views` taking an array of tabIds.

        mainWindow.setBrowserView(view);

        // Send current state to frontend
        mainWindow.webContents.send('browser-navigated', view.webContents.getURL());
        mainWindow.webContents.send('browser-title-updated', view.webContents.getTitle());
    }
});

ipcMain.handle('browser-set-views', (event, tabIds) => {
    const views = tabIds.map(id => browserViews.get(id)).filter(v => v);
    // mainWindow.setBrowserViews(views); // This is the API for multiple views
    // Check if setBrowserViews exists (Electron 10+)
    if (mainWindow.setBrowserViews) {
        mainWindow.setBrowserViews(views);
    } else {
        // Fallback for older electron: just set the first one
        if (views.length > 0) mainWindow.setBrowserView(views[0]);
    }
});

// Hide specific or all browser views
ipcMain.handle('browser-hide', (event, tabId) => {
    if (mainWindow) {
        if (tabId && browserViews.has(tabId)) {
            // Hide specific tab by removing it from the window
            const view = browserViews.get(tabId);
            mainWindow.removeBrowserView(view);
        } else {
            // Hide all views
            if (mainWindow.setBrowserViews) {
                mainWindow.setBrowserViews([]);
            } else {
                mainWindow.setBrowserView(null);
            }
        }
    }
});

// Hide all browser views (used when navigating away from Premium Browser)
ipcMain.handle('browser-hide-all', () => {
    if (mainWindow) {
        if (mainWindow.setBrowserViews) {
            mainWindow.setBrowserViews([]);
        } else {
            mainWindow.setBrowserView(null);
        }
    }
});

ipcMain.handle('tab-close', (event, tabId) => {
    if (browserViews.has(tabId)) {
        const view = browserViews.get(tabId);
        if (activeTabId === tabId) {
            mainWindow.setBrowserView(null);
            activeTabId = null;
        }
        view.webContents.destroy();
        browserViews.delete(tabId);
    }
});

ipcMain.handle('browser-navigate', async (event, tabId, url) => {
    const view = tabId ? browserViews.get(tabId) : null;
    if (!view) return;

    // Clean up the URL
    url = url.trim();

    // Check if it's a search query (contains spaces or no dots)
    const isSearchQuery = url.includes(' ') || (!url.includes('.') && !url.startsWith('http'));

    if (isSearchQuery) {
        // Convert to Google search
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // Add protocol if missing
        url = 'https://' + url;
    }

    try {
        await view.webContents.loadURL(url);
        return view.webContents.getURL();
    } catch (error) {
        console.error('Navigation error:', error);
        throw error;
    }
});

ipcMain.handle('browser-back', async (event, tabId) => {
    const view = tabId ? browserViews.get(tabId) : null;
    if (view && view.webContents.canGoBack()) {
        view.webContents.goBack();
    }
});

ipcMain.handle('browser-forward', async (event, tabId) => {
    const view = tabId ? browserViews.get(tabId) : null;
    if (view && view.webContents.canGoForward()) {
        view.webContents.goForward();
    }
});

ipcMain.handle('browser-reload', async (event, tabId) => {
    const view = tabId ? browserViews.get(tabId) : null;
    if (view) {
        view.webContents.reload();
    }
});

ipcMain.handle('browser-get-url', async () => {
    const view = activeTabId ? browserViews.get(activeTabId) : null;
    if (view) {
        return view.webContents.getURL();
    }
    return '';
});

ipcMain.handle('browser-paste', async (event, text) => {
    const view = activeTabId ? browserViews.get(activeTabId) : null;
    if (!view) return;

    // Execute JavaScript to paste text into focused element
    const script = `
        (function() {
            const activeElement = document.activeElement;
            if (activeElement && (
                activeElement.tagName === 'INPUT' || 
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.isContentEditable
            )) {
                // For input/textarea
                if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                    const start = activeElement.selectionStart;
                    const end = activeElement.selectionEnd;
                    const value = activeElement.value;
                    activeElement.value = value.substring(0, start) + ${JSON.stringify(text)} + value.substring(end);
                    activeElement.selectionStart = activeElement.selectionEnd = start + ${JSON.stringify(text)}.length;
                    
                    // Trigger input event
                    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
                    activeElement.dispatchEvent(new Event('change', { bubbles: true }));
                } 
                // For contentEditable
                else if (activeElement.isContentEditable) {
                    document.execCommand('insertText', false, ${JSON.stringify(text)});
                }
                return true;
            }
            return false;
        })();
    `;

    try {
        const result = await view.webContents.executeJavaScript(script);
        return result;
    } catch (error) {
        console.error('Paste failed:', error);
        return false;
    }
});

ipcMain.handle('browser-update-bounds', (event, { tabId, bounds }) => {
    const targetTabId = tabId || activeTabId;
    if (targetTabId && browserViews.has(targetTabId) && mainWindow) {
        const view = browserViews.get(targetTabId);
        const windowBounds = mainWindow.getBounds();
        view.setBounds({
            x: bounds.x || 0,
            y: bounds.y || 120,
            width: bounds.width || windowBounds.width,
            height: bounds.height || (windowBounds.height - 120)
        });
    }
});

ipcMain.handle('browser-show', () => {
    console.log('Browser show requested');
    if (activeTabId && browserViews.has(activeTabId)) {
        const view = browserViews.get(activeTabId);
        mainWindow.setBrowserView(view);
    }
});



const fs = require('fs');
const os = require('os');

// Data persistence
const userDataPath = app.getPath('userData');
const bookmarksPath = path.join(userDataPath, 'bookmarks.json');
const historyPath = path.join(userDataPath, 'history.json');

function loadData(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath));
        }
    } catch (e) {
        console.error(`Error loading ${filePath}:`, e);
    }
    return [];
}

function saveData(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(`Error saving ${filePath}:`, e);
    }
}

// IPC Handlers for Bookmarks & History
ipcMain.handle('bookmarks-get', () => loadData(bookmarksPath));

ipcMain.handle('bookmarks-add', (event, bookmark) => {
    const bookmarks = loadData(bookmarksPath);
    // Avoid duplicates
    if (!bookmarks.some(b => b.url === bookmark.url)) {
        bookmarks.push({ ...bookmark, timestamp: Date.now() });
        saveData(bookmarksPath, bookmarks);
    }
    return bookmarks;
});

ipcMain.handle('bookmarks-remove', (event, url) => {
    let bookmarks = loadData(bookmarksPath);
    bookmarks = bookmarks.filter(b => b.url !== url);
    saveData(bookmarksPath, bookmarks);
    return bookmarks;
});

ipcMain.handle('history-get', () => {
    const history = loadData(historyPath);
    return history.sort((a, b) => b.timestamp - a.timestamp).slice(0, 100); // Return last 100
});

ipcMain.handle('history-add', (event, entry) => {
    const history = loadData(historyPath);
    history.push({ ...entry, timestamp: Date.now() });
    // Keep only last 1000 entries
    if (history.length > 1000) {
        history.shift();
    }
    saveData(historyPath, history);
});

ipcMain.handle('history-clear', () => {
    saveData(historyPath, []);
    return [];
});

ipcMain.handle('start-drag', async (event, fileName) => {
    // Create a dummy file in temp directory
    const tempPath = path.join(os.tmpdir(), fileName);
    if (!fs.existsSync(tempPath)) {
        fs.writeFileSync(tempPath, 'Dummy content for ' + fileName);
    }

    event.sender.startDrag({
        file: tempPath,
        icon: path.join(__dirname, 'logo192.png')
    });
});

ipcMain.handle('get-profile-data', async () => {
    // Return mock profile data for autofill
    return {
        personalInfo: {
            firstName: "John",
            lastName: "Doe",
            fullName: "John Doe",
            email: "john.doe@example.com",
            phone: "+1-555-0123",
            dob: "2005-05-15",
            address: "123 Main St, City, State 12345"
        },
        academicInfo: {
            gpa: "3.8",
            sat: "1450",
            act: "32",
            school: "Lincoln High School",
            gradYear: "2025"
        }
    };
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
