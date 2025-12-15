import { useState, useEffect, useRef, useCallback } from 'react';

interface BrowserTab {
    id: string;
    url: string;
    title: string;
    favicon?: string;
}

interface UseBrowserControllerProps {
    sessionId?: string;
}

interface BrowserState {
    isConnected: boolean;
    isLoading: boolean;
    currentUrl: string;
    canGoBack: boolean;
    canGoForward: boolean;
    isSecure: boolean;
    title: string;
}

export const useBrowserController = ({ sessionId }: UseBrowserControllerProps = {}) => {
    const [state, setState] = useState<BrowserState>({
        isConnected: false,
        isLoading: false,
        currentUrl: '',
        canGoBack: false,
        canGoForward: false,
        isSecure: false,
        title: 'New Tab'
    });

    const wsRef = useRef<WebSocket | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const frameQueueRef = useRef<string[]>([]);
    const isProcessingRef = useRef(false);

    // WebSocket connection
    const connect = useCallback(() => {
        const wsUrl = `${process.env.REACT_APP_WS_URL || 'ws://localhost:8000'}/stream${sessionId ? `?session=${sessionId}` : ''}`;

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('Browser WebSocket connected');
            setState(prev => ({ ...prev, isConnected: true }));
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'frame') {
                    // Queue frame for rendering
                    frameQueueRef.current.push(data.frame);
                    processFrameQueue();

                    // If we're receiving frames, we're connected and not loading
                    setState(prev => ({ ...prev, isLoading: false }));
                } else if (data.type === 'state') {
                    // Update browser state
                    setState(prev => ({
                        ...prev,
                        currentUrl: data.url || prev.currentUrl,
                        canGoBack: data.canGoBack ?? prev.canGoBack,
                        canGoForward: data.canGoForward ?? prev.canGoForward,
                        isSecure: data.isSecure ?? prev.isSecure,
                        title: data.title || prev.title,
                        isLoading: data.isLoading ?? prev.isLoading
                    }));
                }
            } catch (error) {
                console.error('Error processing WebSocket message:', error);
            }
        };

        ws.onerror = (error) => {
            // Suppress errors from React Strict Mode double-mounting
            if (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
                return; // Ignore errors on already closed connections
            }
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('Browser WebSocket disconnected');
            setState(prev => ({ ...prev, isConnected: false }));

            // Attempt reconnection after 3 seconds
            setTimeout(() => {
                if (wsRef.current?.readyState === WebSocket.CLOSED) {
                    connect();
                }
            }, 3000);
        };

        wsRef.current = ws;
    }, [sessionId]);

    // Process frame queue
    const processFrameQueue = useCallback(() => {
        if (isProcessingRef.current || frameQueueRef.current.length === 0) return;

        isProcessingRef.current = true;
        const frame = frameQueueRef.current.shift();

        if (frame && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    isProcessingRef.current = false;

                    // Process next frame
                    if (frameQueueRef.current.length > 0) {
                        requestAnimationFrame(processFrameQueue);
                    }
                };
                img.onerror = () => {
                    isProcessingRef.current = false;
                };
                img.src = `data:image/jpeg;base64,${frame}`;
            }
        } else {
            isProcessingRef.current = false;
        }
    }, []);

    // Send action to backend via REST
    const sendAction = useCallback(async (endpoint: string, data: any) => {
        try {
            const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
            // Map internal action names to API endpoints
            let apiEndpoint = endpoint;
            let method = 'POST';
            let body = data;

            if (endpoint === 'navigate') {
                method = 'GET';
                apiEndpoint = `/navigate?url=${encodeURIComponent(data.url)}`;
                body = undefined;
            } else if (endpoint === 'click') {
                apiEndpoint = '/click';
            } else if (endpoint === 'keypress') {
                apiEndpoint = '/type';
                body = { text: data.key, modifiers: data.modifiers || {} };
            } else if (endpoint === 'scroll') {
                apiEndpoint = '/scroll';
                body = { deltaY: data.deltaY };
            } else if (endpoint === 'reload') {
                apiEndpoint = '/reload';
            } else {
                // Unsupported endpoints (back, forward, mousemove, etc.)
                return;
            }

            await fetch(`${baseUrl}${apiEndpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : undefined,
            });
        } catch (error) {
            console.error('Error sending action:', error);
        }
    }, []);

    // Browser actions
    const navigate = useCallback(async (url: string) => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
            const response = await fetch(`${baseUrl}/navigate?url=${encodeURIComponent(url)}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                if (data.url) {
                    setState(prev => ({ ...prev, currentUrl: data.url, isLoading: false }));
                }
            }
        } catch (error) {
            console.error('Navigation error:', error);
        }

        // Clear loading state after 5 seconds as a fallback
        setTimeout(() => {
            setState(prev => ({ ...prev, isLoading: false }));
        }, 5000);
    }, []);

    const goBack = useCallback(() => {
        sendAction('back', {});
    }, [sendAction]);

    const goForward = useCallback(() => {
        sendAction('forward', {});
    }, [sendAction]);

    const reload = useCallback(() => {
        setState(prev => ({ ...prev, isLoading: true }));
        sendAction('reload', {});
    }, [sendAction]);

    const click = useCallback((x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        console.log('Sending click:', { x, y, width: canvas.width, height: canvas.height });

        sendAction('click', {
            x,
            y,
            width: canvas.width,
            height: canvas.height
        });
    }, [sendAction, canvasRef]);

    const scroll = useCallback((deltaX: number, deltaY: number) => {
        sendAction('scroll', { deltaX, deltaY });
    }, [sendAction]);

    const keypress = useCallback((key: string, modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean }) => {
        sendAction('keypress', { key, modifiers });
    }, [sendAction]);

    const mousemove = useCallback((x: number, y: number) => {
        sendAction('mousemove', { x, y });
    }, [sendAction]);

    // Initialize connection
    useEffect(() => {
        connect();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [connect]);

    return {
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
        isConnected: state.isConnected
    };
};
