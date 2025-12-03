from flask import Blueprint, request, jsonify, session
from browser_manager import browser_manager
import logging

actions_bp = Blueprint('actions', __name__)
logger = logging.getLogger(__name__)

def get_session_id():
    if 'user' in session:
        return str(session['user']['id'])
    return session.sid if hasattr(session, 'sid') else request.remote_addr

@actions_bp.route('/click', methods=['POST'])
def click():
    data = request.get_json() or {}
    x = data.get('x')
    y = data.get('y')
    viewer_width = data.get('width', 1280)
    viewer_height = data.get('height', 720)
    
    if x is None or y is None:
        return jsonify({'error': 'Coordinates x and y are required'}), 400
        
    session_id = get_session_id()
    browser_manager.perform_click(session_id, x, y, viewer_width, viewer_height)
    return jsonify({'message': 'Click performed'})

@actions_bp.route('/type', methods=['POST'])
def type_text():
    data = request.get_json() or {}
    text = data.get('text')
    modifiers = data.get('modifiers', {})
    
    if text is None:
        return jsonify({'error': 'Text is required'}), 400
    
    session_id = get_session_id()
    
    # Check if it's a special key
    special_keys = ['Enter', 'Backspace', 'Tab', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    
    # Check if it's a shortcut (has modifiers)
    if modifiers.get('ctrl') or modifiers.get('shift') or modifiers.get('alt'):
        browser_manager.perform_shortcut(session_id, text, modifiers)
    elif text in special_keys:
        browser_manager.perform_keypress(session_id, text)
    else:
        browser_manager.perform_type(session_id, text)
    
    return jsonify({'message': 'Type performed'})

@actions_bp.route('/scroll', methods=['POST'])
def scroll():
    data = request.get_json() or {}
    delta_y = data.get('deltaY', 0)
    
    session_id = get_session_id()
    browser_manager.perform_scroll(session_id, delta_y)
    return jsonify({'message': 'Scroll performed'})

@actions_bp.route('/reload', methods=['POST'])
def reload_page():
    session_id = get_session_id()
    browser_manager.perform_reload(session_id)
    return jsonify({'message': 'Reload performed'})
