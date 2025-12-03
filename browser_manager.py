import logging
import queue
import threading
import time
import base64
from playwright.sync_api import sync_playwright

logger = logging.getLogger(__name__)

class BrowserSession(threading.Thread):
    def __init__(self, session_id):
        super().__init__()
        self.session_id = session_id
        self.command_queue = queue.Queue()
        self.latest_frame = None
        self.running = True
        self.viewport = {"width": 1280, "height": 720}
        self.playwright = None
        self.browser = None
        self.context = None
        self.page = None
        self.daemon = True

    def run(self):
        logger.info(f"Starting BrowserSession thread for {self.session_id}")
        try:
            self.playwright = sync_playwright().start()
            
            # Launch in HEADED mode (visible browser) to bypass bot detection
            self.browser = self.playwright.chromium.launch(
                headless=False,  # Show browser window
                args=[
                    '--disable-blink-features=AutomationControlled',
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--window-size=1280,720',
                    '--window-position=2000,0'  # Position off-screen
                ]
            )
            
            # Create context with realistic settings
            self.context = self.browser.new_context(
                viewport=self.viewport,
                user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                locale='en-US',
                timezone_id='America/New_York',
                permissions=['geolocation', 'notifications']
            )
            
            self.page = self.context.new_page()
            
            # Enhanced stealth script
            self.page.add_init_script("""
                Object.defineProperty(navigator, 'webdriver', {
                    get: () => undefined
                });
                
                window.chrome = {
                    runtime: {}
                };
                
                Object.defineProperty(navigator, 'plugins', {
                    get: () => [1, 2, 3, 4, 5]
                });
                
                Object.defineProperty(navigator, 'languages', {
                    get: () => ['en-US', 'en']
                });
            """)
            
            # Main loop
            while self.running:
                # Process commands
                while not self.command_queue.empty():
                    try:
                        cmd, args, result_queue = self.command_queue.get_nowait()
                        self._handle_command(cmd, args, result_queue)
                    except queue.Empty:
                        break
                    except Exception as e:
                        logger.error(f"Error processing command: {e}")

                # Capture screenshot
                if self.page:
                    try:
                        screenshot_bytes = self.page.screenshot(type="jpeg", quality=70)
                        self.latest_frame = base64.b64encode(screenshot_bytes).decode('utf-8')
                    except Exception as e:
                        logger.error(f"Screenshot failed: {e}")
                
                time.sleep(0.03)  # ~30 FPS
            
        except Exception as e:
            logger.error(f"BrowserSession crash: {e}")
        finally:
            # Cleanup
            try:
                if self.context:
                    self.context.close()
                if self.browser:
                    self.browser.close()
                if self.playwright:
                    self.playwright.stop()
            except Exception as e:
                logger.error(f"Cleanup error: {e}")

    def _handle_command(self, cmd, args, result_queue):
        try:
            res = None
            if cmd == "navigate":
                self.page.goto(args['url'], timeout=30000, wait_until="domcontentloaded")
                res = True
            elif cmd == "click":
                logger.info(f"Click at ({args['x']}, {args['y']})")
                try:
                    # Element-based clicking with focus
                    element = self.page.evaluate(f'''
                        (x, y) => {{
                            const el = document.elementFromPoint({args['x']}, {args['y']});
                            if (el) {{
                                el.focus();
                                el.click();
                                return true;
                            }}
                            return false;
                        }}
                    ''')
                    
                    if not element:
                        self.page.mouse.click(args['x'], args['y'])
                    
                    time.sleep(0.15)
                except Exception as e:
                    logger.error(f"Click failed: {e}")
            elif cmd == "type":
                self.page.keyboard.type(args['text'])
            elif cmd == "keypress":
                self.page.keyboard.press(args['key'])
            elif cmd == "shortcut":
                modifiers = args.get('modifiers', {})
                key = args['key']
                
                if modifiers.get('ctrl'):
                    self.page.keyboard.down('Control')
                if modifiers.get('shift'):
                    self.page.keyboard.down('Shift')
                if modifiers.get('alt'):
                    self.page.keyboard.down('Alt')
                
                self.page.keyboard.press(key)
                
                if modifiers.get('alt'):
                    self.page.keyboard.up('Alt')
                if modifiers.get('shift'):
                    self.page.keyboard.up('Shift')
                if modifiers.get('ctrl'):
                    self.page.keyboard.up('Control')
                    
            elif cmd == "scroll":
                self.page.mouse.wheel(0, args['delta_y'])
            elif cmd == "reload":
                self.page.reload()
            elif cmd == "get_url":
                res = self.page.url
            elif cmd == "focus_and_select":
                try:
                    self.page.evaluate(f'''
                        (x, y) => {{
                            const el = document.elementFromPoint({args['x']}, {args['y']});
                            if (el) {{
                                el.focus();
                                if (el.tagName === 'SELECT') {{
                                    el.click();
                                    const event = new KeyboardEvent('keydown', {{ key: ' ', code: 'Space' }});
                                    el.dispatchEvent(event);
                                }}
                            }}
                        }}
                    ''', args['x'], args['y'])
                except Exception as e:
                    logger.error(f"Focus and select failed: {e}")
            
            if result_queue:
                result_queue.put(res)
        except Exception as e:
            logger.error(f"Command {cmd} failed: {e}")
            if result_queue:
                result_queue.put(e)

    def send_command(self, cmd, args, wait=False):
        result_queue = queue.Queue() if wait else None
        self.command_queue.put((cmd, args, result_queue))
        if wait:
            return result_queue.get(timeout=10)
        return None

    def stop(self):
        self.running = False


class BrowserManager:
    def __init__(self):
        self.sessions = {}
        self.viewport = {"width": 1280, "height": 720}

    def get_session(self, session_id):
        if session_id not in self.sessions:
            logger.info(f"Creating new session {session_id}")
            session = BrowserSession(session_id)
            session.start()
            self.sessions[session_id] = session
            time.sleep(2)  # Wait for browser to initialize
        return self.sessions[session_id]

    def navigate(self, session_id, url):
        session = self.get_session(session_id)
        return session.send_command("navigate", {"url": url}, wait=True)

    def perform_click(self, session_id, x, y, viewer_width, viewer_height):
        session = self.get_session(session_id)
        
        if viewer_width <= 0 or viewer_height <= 0:
            return

        scale_x = self.viewport["width"] / viewer_width
        scale_y = self.viewport["height"] / viewer_height
        
        actual_x = x * scale_x
        actual_y = y * scale_y
        
        session.send_command("click", {"x": actual_x, "y": actual_y})

    def perform_type(self, session_id, text):
        session = self.get_session(session_id)
        session.send_command("type", {"text": text})

    def perform_keypress(self, session_id, key):
        session = self.get_session(session_id)
        session.send_command("keypress", {"key": key})

    def perform_shortcut(self, session_id, key, modifiers):
        session = self.get_session(session_id)
        session.send_command("shortcut", {"key": key, "modifiers": modifiers})

    def perform_scroll(self, session_id, delta_y):
        session = self.get_session(session_id)
        session.send_command("scroll", {"delta_y": delta_y})

    def reload_page(self, session_id):
        session = self.get_session(session_id)
        session.send_command("reload", {})

    def capture_screenshot(self, session_id):
        session = self.get_session(session_id)
        return session.latest_frame

    def get_current_url(self, session_id):
        session = self.get_session(session_id)
        return session.send_command("get_url", {}, wait=True)

# Global instance
browser_manager = BrowserManager()
