import logging
import time
import json
from flask import session, request
from browser_manager import browser_manager

logger = logging.getLogger(__name__)

def handle_stream(ws):
    """
    WebSocket handler for streaming browser frames.
    Expected to be registered with @sock.route('/stream') in app.py
    """
    # Simple workaround: client sends a 'init' message with session ID or we generate one
    # Or we just use the remote address as a fallback
    session_id = request.remote_addr
    
    # If the user is logged in, we might be able to access the cookie
    # cookie = request.cookies
    pass

    logger.info(f"WebSocket connected for session {session_id}")
    
    try:
        while ws.connected:
            # Capture screenshot
            frame = browser_manager.capture_screenshot(session_id)
            
            if frame:
                try:
                    ws.send(json.dumps({"type": "frame", "frame": frame}))
                except Exception as e:
                    logger.error(f"Failed to send frame: {e}")
                    break
            else:
                # logger.info("No frame available")
                pass
            
            # Target ~20 FPS -> 0.05s
            time.sleep(0.05)
            
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        logger.info(f"WebSocket disconnected for session {session_id}")
