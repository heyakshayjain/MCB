# Cloud Browser Backend Instructions

## Prerequisites
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Install Playwright browsers:
   ```bash
   playwright install chromium
   ```

## Running the Server
The server uses `gevent` and `flask-sockets` for WebSocket support.

```bash
python app.py
```

The server will start on port 8000 (or $PORT).

## Testing
1. Run the server in one terminal.
2. Run the test script in another:
   ```bash
   python test_browser.py
   ```

## API Endpoints

### WebSocket
- `ws://localhost:8000/stream`: Streams JPEG frames (base64 encoded).

### REST
- `GET /navigate?url=<url>`: Navigate to a URL.
- `POST /click`: `{"x": 100, "y": 100, "width": 1280, "height": 720}`
- `POST /type`: `{"text": "hello"}`
- `POST /scroll`: `{"deltaY": 100}`
- `POST /reload`: `{}`

## Notes
- The backend runs a single browser session per user (keyed by session ID or IP).
- Playwright runs in headless mode.
- Images are streamed as Base64 encoded JPEGs.
