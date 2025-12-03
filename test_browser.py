import requests
import websocket
import json
import threading
import time
import sys

BASE_URL = "http://localhost:8000"
WS_URL = "ws://localhost:8000/stream"

def test_navigation():
    print("Testing Navigation...")
    try:
        res = requests.get(f"{BASE_URL}/navigate?url=https://example.com")
        print(f"Navigation Response: {res.status_code} - {res.text}")
        return res.status_code == 200
    except Exception as e:
        print(f"Navigation Failed: {e}")
        return False

def test_actions():
    print("Testing Actions...")
    try:
        # Click
        res = requests.post(f"{BASE_URL}/click", json={"x": 100, "y": 100, "width": 1280, "height": 720})
        print(f"Click Response: {res.status_code}")
        
        # Type
        res = requests.post(f"{BASE_URL}/type", json={"text": "Hello World"})
        print(f"Type Response: {res.status_code}")
        
        # Scroll
        res = requests.post(f"{BASE_URL}/scroll", json={"deltaY": 100})
        print(f"Scroll Response: {res.status_code}")
        
        return True
    except Exception as e:
        print(f"Actions Failed: {e}")
        return False

def test_websocket():
    print("Testing WebSocket...")
    def on_message(ws, message):
        print(f"Received frame of size: {len(message)}")
        ws.close()

    def on_error(ws, error):
        print(f"WebSocket Error: {error}")

    def on_close(ws, close_status_code, close_msg):
        print("WebSocket Closed")

    def on_open(ws):
        print("WebSocket Opened")

    ws = websocket.WebSocketApp(WS_URL,
                                on_open=on_open,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    
    # Run for a short time
    wst = threading.Thread(target=ws.run_forever)
    wst.daemon = True
    wst.start()
    
    time.sleep(3)
    if ws.keep_running:
        ws.close()
    
    print("WebSocket Test Completed")

if __name__ == "__main__":
    print("Starting Tests... (Ensure server is running)")
    
    # Wait a bit for server to be ready if we were running it programmatically
    # But here we assume user runs it.
    
    if test_navigation():
        test_actions()
        test_websocket()
    else:
        print("Skipping other tests due to navigation failure")
