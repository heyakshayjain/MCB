from flask import Blueprint, request, jsonify, session
from browser_manager import browser_manager
import logging

navigation_bp = Blueprint('navigation', __name__)
logger = logging.getLogger(__name__)

def get_session_id():
    # Use user ID if logged in, otherwise session ID
    if 'user' in session:
        return str(session['user']['id'])
    return session.sid if hasattr(session, 'sid') else request.remote_addr

@navigation_bp.route('/navigate', methods=['GET'])
def navigate():
    url = request.args.get('url')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    # Prepend https:// if no protocol is specified
    if not url.startswith('http://') and not url.startswith('https://'):
        url = 'https://' + url
    
    session_id = get_session_id()
    logger.info(f"Navigating session {session_id} to {url}")
    
    success = browser_manager.navigate(session_id, url)
    
    if success:
        # Get the actual URL after navigation (in case of redirects)
        actual_url = browser_manager.get_current_url(session_id)
        return jsonify({'message': 'Navigation successful', 'url': actual_url or url})
    else:
        return jsonify({'error': 'Navigation failed'}), 500
