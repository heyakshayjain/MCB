# Cloud Browser Backend Implementation Guide

This document provides the backend implementation requirements for the Cloud Browser feature.

## Overview

The Cloud Browser requires a backend service that:
1. Runs a headless browser (Chrome/Chromium)
2. Captures screenshots at 20-30 FPS
3. Sends frames to frontend via WebSocket
4. Receives and executes browser actions from frontend

## Technology Stack

- **Python Flask** - Web server
- **Flask-SocketIO** - WebSocket support
- **Selenium** or **Playwright** - Browser automation
- **Pillow** - Image processing

## Installation

```bash
pip install flask flask-socketio selenium pillow python-socketio
# Or for Playwright
pip install flask flask-socketio playwright pillow python-socketio
playwright install chromium
```

## Backend Implementation

### 1. Flask Server Setup

```python
from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image
import threading
import time

app = Flask(__name__)
CORS(app, origins="*")
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# Store browser sessions
browser_sessions = {}
```

### 2. Browser Session Manager

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

class BrowserSession:
    def __init__(self, session_id):
        self.session_id = session_id
        self.driver = self._create_driver()
        self.is_active = True
        self.current_url = "about:blank"
        
    def _create_driver(self):
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--window-size=1280,720')
        chrome_options.add_argument('--disable-gpu')
        
        driver = webdriver.Chrome(options=chrome_options)
        driver.set_window_size(1280, 720)
        return driver
    
    def navigate(self, url):
        try:
            self.driver.get(url)
            self.current_url = self.driver.current_url
            return True
        except Exception as e:
            print(f"Navigation error: {e}")
            return False
    
    def click(self, x, y):
        try:
            actions = ActionChains(self.driver)
            # Execute JavaScript to click at coordinates
            self.driver.execute_script(f"document.elementFromPoint({x}, {y}).click()")
            return True
        except Exception as e:
            print(f"Click error: {e}")
            return False
    
    def scroll(self, delta_x, delta_y):
        try:
            self.driver.execute_script(f"window.scrollBy({delta_x}, {delta_y})")
            return True
        except Exception as e:
            print(f"Scroll error: {e}")
            return False
    
    def keypress(self, key, modifiers=None):
        try:
            actions = ActionChains(self.driver)
            element = self.driver.switch_to.active_element
            
            if modifiers:
                if modifiers.get('ctrl'):
                    actions.key_down(Keys.CONTROL)
                if modifiers.get('shift'):
                    actions.key_down(Keys.SHIFT)
                if modifiers.get('alt'):
                    actions.key_down(Keys.ALT)
            
            actions.send_keys(key)
            
            if modifiers:
                if modifiers.get('ctrl'):
                    actions.key_up(Keys.CONTROL)
                if modifiers.get('shift'):
                    actions.key_up(Keys.SHIFT)
                if modifiers.get('alt'):
                    actions.key_up(Keys.ALT)
            
            actions.perform()
            return True
        except Exception as e:
            print(f"Keypress error: {e}")
            return False
    
    def get_screenshot(self):
        try:
            screenshot = self.driver.get_screenshot_as_png()
            img = Image.open(BytesIO(screenshot))
            
            # Resize if needed
            img = img.resize((1280, 720), Image.LANCZOS)
            
            # Convert to JPEG for better compression
            buffer = BytesIO()
            img.convert('RGB').save(buffer, format='JPEG', quality=75)
            
            # Encode to base64
            img_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
            return img_base64
        except Exception as e:
            print(f"Screenshot error: {e}")
            return None
    
    def get_state(self):
        try:
            return {
                'url': self.driver.current_url,
                'title': self.driver.title,
                'canGoBack': len(self.driver.window_handles) > 0,
                'canGoForward': False,  # Selenium doesn't provide this easily
                'isSecure': self.driver.current_url.startswith('https://'),
                'isLoading': False
            }
        except:
            return {}
    
    def close(self):
        self.is_active = False
        try:
            self.driver.quit()
        except:
            pass
```

### 3. WebSocket Handlers

```python
@socketio.on('connect')
def handle_connect():
    session_id = request.args.get('session', 'default')
    print(f"Client connected: {session_id}")
    
    # Create browser session if doesn't exist
    if session_id not in browser_sessions:
        browser_sessions[session_id] = BrowserSession(session_id)
        
        # Start frame streaming thread
        thread = threading.Thread(
            target=stream_frames,
            args=(session_id, request.sid)
        )
        thread.daemon = True
        thread.start()
    
    emit('connected', {'session': session_id})

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

@socketio.on('message')
def handle_message(data):
    session_id = request.args.get('session', 'default')
    session = browser_sessions.get(session_id)
    
    if not session:
        return
    
    action = data.get('action')
    
    if action == 'navigate':
        url = data.get('url')
        session.navigate(url)
        emit('state', session.get_state())
        
    elif action == 'click':
        x = data.get('x')
        y = data.get('y')
        session.click(x, y)
        
    elif action == 'scroll':
        delta_x = data.get('deltaX', 0)
        delta_y = data.get('deltaY', 0)
        session.scroll(delta_x, delta_y)
        
    elif action == 'keypress':
        key = data.get('key')
        modifiers = data.get('modifiers')
        session.keypress(key, modifiers)
        
    elif action == 'back':
        session.driver.back()
        emit('state', session.get_state())
        
    elif action == 'forward':
        session.driver.forward()
        emit('state', session.get_state())
        
    elif action == 'reload':
        session.driver.refresh()
        emit('state', session.get_state())
        
    elif action == 'mousemove':
        # Optional: track mouse position
        pass

def stream_frames(session_id, client_sid):
    """Stream frames to client at ~25 FPS"""
    session = browser_sessions.get(session_id)
    
    while session and session.is_active:
        try:
            # Capture screenshot
            frame = session.get_screenshot()
            
            if frame:
                # Send frame to client
                socketio.emit('message', {
                    'type': 'frame',
                    'frame': frame
                }, room=client_sid)
            
            # ~25 FPS (40ms delay)
            time.sleep(0.04)
            
        except Exception as e:
            print(f"Frame streaming error: {e}")
            break
    
    # Cleanup
    if session:
        session.close()
        del browser_sessions[session_id]
```

### 4. Main Server

```python
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
```

## Environment Variables

Create a `.env` file:

```env
FLASK_ENV=development
FLASK_DEBUG=True
CORS_ORIGINS=http://localhost:3000
```

## Running the Server

```bash
python app.py
```

The server will start on `ws://localhost:5000/stream`

## Frontend Configuration

Update your React `.env` file:

```env
REACT_APP_WS_URL=ws://localhost:5000
```

## Production Considerations

1. **Authentication**: Add JWT or session-based auth
2. **Rate Limiting**: Limit concurrent sessions per user
3. **Resource Management**: Auto-close inactive sessions
4. **Scaling**: Use Redis for session storage
5. **Security**: Validate URLs, sanitize inputs
6. **Monitoring**: Add logging and metrics

## Alternative: Playwright Implementation

For better performance, use Playwright instead of Selenium:

```python
from playwright.async_api import async_playwright
import asyncio

class BrowserSession:
    def __init__(self, session_id):
        self.session_id = session_id
        self.browser = None
        self.page = None
        
    async def initialize(self):
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(headless=True)
        self.page = await self.browser.new_page(viewport={'width': 1280, 'height': 720})
        
    async def navigate(self, url):
        await self.page.goto(url)
        
    async def click(self, x, y):
        await self.page.mouse.click(x, y)
        
    async def get_screenshot(self):
        screenshot = await self.page.screenshot(type='jpeg', quality=75)
        return base64.b64encode(screenshot).decode('utf-8')
```

## Testing

Test the WebSocket connection:

```javascript
const ws = new WebSocket('ws://localhost:5000/stream?session=test');

ws.onopen = () => {
  console.log('Connected');
  ws.send(JSON.stringify({
    action: 'navigate',
    url: 'https://www.google.com'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data.type);
};
```

## Troubleshooting

1. **High CPU usage**: Reduce FPS or image quality
2. **Memory leaks**: Ensure sessions are properly closed
3. **Slow performance**: Use Playwright instead of Selenium
4. **CORS errors**: Check CORS configuration
5. **WebSocket disconnects**: Add reconnection logic

## License

MIT
