import React, { useRef, useEffect, useState } from 'react';

interface CloudBrowserViewerProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    onClick: (x: number, y: number) => void;
    onScroll: (deltaX: number, deltaY: number) => void;
    onKeyPress: (key: string, modifiers?: { ctrl?: boolean; shift?: boolean; alt?: boolean }) => void;
    onMouseMove: (x: number, y: number) => void;
    isConnected: boolean;
    isLoading: boolean;
}

export const CloudBrowserViewer: React.FC<CloudBrowserViewerProps> = ({
    canvasRef,
    onClick,
    onScroll,
    onKeyPress,
    onMouseMove,
    isConnected,
    isLoading
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 1280, height: 720 });
    const [isFocused, setIsFocused] = useState(false);
    const mouseMoveThrottleRef = useRef<NodeJS.Timeout | null>(null);

    // Handle container resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });

                if (canvasRef.current) {
                    canvasRef.current.width = width;
                    canvasRef.current.height = height;
                }
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        // Add passive:false wheel listener to allow preventDefault
        const canvas = canvasRef.current;
        const wheelHandler = (e: WheelEvent) => {
            e.preventDefault();
            onScroll(e.deltaX, e.deltaY);
        };

        if (canvas) {
            canvas.addEventListener('wheel', wheelHandler, { passive: false });
        }

        return () => {
            window.removeEventListener('resize', updateDimensions);
            if (canvas) {
                canvas.removeEventListener('wheel', wheelHandler);
            }
        };
    }, [canvasRef, onScroll]);

    // Handle click events
    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();

        // Send raw coordinates relative to canvas, let backend scale
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        onClick(Math.round(x), Math.round(y));
    };

    // Handle scroll events (now handled by native listener above)
    const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
        // This won't be called due to native listener, but keep for compatibility
        e.preventDefault();
    };

    // Handle keyboard events
    const handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
        e.preventDefault();

        // Handle common shortcuts by sending them to the browser
        const isCmd = e.metaKey || e.ctrlKey;

        if (isCmd) {
            // For Cmd+V, we can optionally read clipboard and send the text
            // But it's better to send the actual Cmd+V to the browser
            if (e.key === 'v') {
                // Send Cmd+V to browser
                onKeyPress('v', { ctrl: true });
                return;
            }
            // Send other shortcuts directly (Cmd+A, Cmd+C, Cmd+X, etc.)
            if (['a', 'c', 'x', 'z', 'y'].includes(e.key.toLowerCase())) {
                onKeyPress(e.key, { ctrl: true });
                return;
            }
        }

        // Only send printable characters and special keys
        const specialKeys = ['Enter', 'Backspace', 'Tab', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
        if (e.key.length === 1 || specialKeys.includes(e.key)) {
            const modifiers = {
                ctrl: e.ctrlKey || e.metaKey,
                shift: e.shiftKey,
                alt: e.altKey
            };

            onKeyPress(e.key, modifiers);
        }
    };

    // Handle mouse move (throttled)
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;

        if (mouseMoveThrottleRef.current) return;

        mouseMoveThrottleRef.current = setTimeout(() => {
            const rect = canvasRef.current!.getBoundingClientRect();
            const scaleX = 1280 / rect.width;
            const scaleY = 720 / rect.height;

            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            onMouseMove(Math.round(x), Math.round(y));
            mouseMoveThrottleRef.current = null;
        }, 50); // Throttle to 20fps
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden"
        >
            {/* Connection Status Overlay */}
            {!isConnected && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-10">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-900 text-lg font-semibold">Connecting to cloud browser...</p>
                        <p className="text-gray-500 text-sm mt-2">Please wait while we establish a secure connection</p>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {isConnected && isLoading && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-lg flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-700 text-sm font-medium">Loading page...</span>
                    </div>
                </div>
            )}

            {/* Canvas Viewer */}
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                onWheel={handleWheel}
                onKeyDown={handleKeyDown}
                onMouseMove={handleMouseMove}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                tabIndex={0}
                className={`w-full h-full cursor-default outline-none ${isFocused ? 'ring-2 ring-blue-500/50' : ''
                    }`}
                style={{
                    imageRendering: 'auto',
                    objectFit: 'contain'
                }}
            />

            {/* Focus Hint */}
            {isConnected && !isFocused && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-200 shadow-lg">
                        <p className="text-gray-600 text-xs font-medium">Click to focus and interact with the browser</p>
                    </div>
                </div>
            )}

            {/* Keyboard Shortcuts Hint */}
            {isFocused && (
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-200 shadow-lg">
                        <p className="text-gray-600 text-xs font-medium">
                            <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs text-gray-500 font-sans mr-1">Esc</kbd>
                            to unfocus
                        </p>
                    </div>
                </div>
            )}

            {/* Watermark */}
            <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                <div className="bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20 text-xs text-gray-500 font-medium flex items-center gap-1.5 shadow-sm">
                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Cloud Browser
                </div>
            </div>
        </div>
    );
};
