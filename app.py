from flask import Flask, request, redirect, url_for, session, flash, jsonify, render_template, send_from_directory
from flask_compress import Compress
from functools import wraps
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv, find_dotenv
import os
from datetime import datetime, UTC
import logging

# Load environment variables from .env files if present (robust resolution)
# 1) .env in project root (next to this file)
# 2) .env discovered via find_dotenv (walks up directories)
# 3) .env.local (optional) to override local settings
project_root_env = os.path.join(os.path.dirname(__file__), '.env')
loaded = False
if os.path.exists(project_root_env):
    load_dotenv(project_root_env)
    loaded = True
else:
    discovered = find_dotenv(usecwd=True)
    if discovered:
        load_dotenv(discovered)
        loaded = True

# Optional local overrides
local_env = os.path.join(os.path.dirname(__file__), '.env.local')
if os.path.exists(local_env):
    load_dotenv(local_env, override=True)
    loaded = True

# If still not loaded, attempt a last load with defaults (cwd)
if not loaded:
    load_dotenv()

app = Flask(__name__,
            static_folder=os.getenv('FLASK_STATIC_FOLDER', 'static'),
            template_folder=os.getenv('FLASK_TEMPLATE_FOLDER', 'templates'))
# Prefer SECRET_KEY from env; fall back to 'dev' for local/testing
app.secret_key = os.getenv('SECRET_KEY', 'dev')  # Change this to a secure key in production
Compress(app)  # Enable compression for better performance

# CORS configuration for React frontend
from flask_cors import CORS
# Allow both localhost and production domains
CORS(app, origins=['http://localhost:8000', 'http://localhost:3001', 'https://mcb.up.railway.app'], supports_credentials=True, allow_headers=['Content-Type'])

# Session cookie tweaks for local dev
app.config.setdefault('SESSION_COOKIE_SAMESITE', 'Lax')
app.config.setdefault('SESSION_COOKIE_SECURE', False)  # True behind HTTPS
app.config.setdefault('SESSION_COOKIE_HTTPONLY', True)

# Basic logging
logging.basicConfig(level=logging.INFO)

# ===== Google OAuth Configuration =====
# Read strictly from environment (no hardcoding)
app.config['GOOGLE_CLIENT_ID'] = os.getenv('GOOGLE_CLIENT_ID')
app.config['GOOGLE_CLIENT_SECRET'] = os.getenv('GOOGLE_CLIENT_SECRET')

if not app.config['GOOGLE_CLIENT_ID'] or not app.config['GOOGLE_CLIENT_SECRET']:
    print("WARNING: Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.")
    # Don't raise error for deployment - allow app to start without OAuth
    app.config['GOOGLE_CLIENT_ID'] = None
    app.config['GOOGLE_CLIENT_SECRET'] = None

# Initialize OAuth only if credentials are available
oauth = None
if app.config['GOOGLE_CLIENT_ID'] and app.config['GOOGLE_CLIENT_SECRET']:
    oauth = OAuth(app)
    oauth.register(
        name='google',
        client_id=app.config['GOOGLE_CLIENT_ID'],
        client_secret=app.config['GOOGLE_CLIENT_SECRET'],
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        client_kwargs={
            'scope': 'openid email profile'
        }
    )


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("user"):
            return redirect(url_for("login"))
        return view(*args, **kwargs)

    return wrapped


@app.route("/login", methods=["GET", "POST"])
def login():
    # If already authenticated, send to dashboard
    if request.method == "GET" and session.get("user"):
        return redirect(url_for("dashboard"))
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "").strip()
        if not email or not password:
            flash("Please enter email and password", "error")
            return redirect(url_for("login"))
        # TODO: replace with real auth check
        session["user"] = {"email": email}
        return redirect(url_for("dashboard"))
    # Return JSON for API calls, redirect to React app for web
    if request.headers.get('Content-Type') == 'application/json' or request.is_json:
        return jsonify({"message": "Please use Google OAuth for authentication"})
    # For web requests, serve the React app directly instead of redirecting
    return render_template("index.html")


@app.route('/login/google')
def login_google():
    if not oauth:
        return jsonify({'error': 'Google OAuth not configured'}), 500
    # Start Google OAuth flow - use environment-based redirect URI
    base_url = os.getenv('FRONTEND_URL', 'http://localhost:8000')
    redirect_uri = f"{base_url}/auth/google/callback"
    return oauth.google.authorize_redirect(redirect_uri)


@app.route('/auth/google/callback')
def auth_google_callback():
    try:
        token = oauth.google.authorize_access_token()
        logging.info('Google OAuth token received: %s', 'yes' if token else 'no')
        # Try to get userinfo from the OIDC UserInfo endpoint
        resp = oauth.google.get('https://openidconnect.googleapis.com/v1/userinfo')
        userinfo = resp.json() if resp and resp.json() else None
        logging.info('Google userinfo fetched: %s', 'yes' if userinfo else 'no')
        if not userinfo:
            # Fallback to ID token if userinfo not available
            userinfo = oauth.google.parse_id_token(token)
            logging.info('Parsed ID token for userinfo: %s', 'yes' if userinfo else 'no')

        if not userinfo:
            return jsonify({'error': 'Google authentication failed'}), 400

        # Save minimal user session
        session['user'] = {
            'email': userinfo.get('email'),
            'name': userinfo.get('name'),
            'picture': userinfo.get('picture'),
            'sub': userinfo.get('sub'),
            'provider': 'google',
            'premium': True  # Hardcoded for demo; in production, check database
        }

        # Return JSON for API calls, redirect for web
        if request.headers.get('Content-Type') == 'application/json' or request.is_json:
            return jsonify({
                'message': 'Authentication successful',
                'user': session['user']
            })
        # Redirect to appropriate dashboard URL based on environment
        dashboard_url = os.getenv('FRONTEND_URL', 'http://localhost:8000') + '/dashboard'
        return redirect(dashboard_url)
    except Exception as e:
        logging.exception('Google authentication error')
        if request.headers.get('Content-Type') == 'application/json' or request.is_json:
            return jsonify({'error': 'Google authentication error: %s' % str(e)}), 500
        # Redirect to appropriate login URL based on environment
        login_url = os.getenv('FRONTEND_URL', 'http://localhost:8000') + '/login'
        return redirect(login_url)


@app.route("/logout")
def logout():
    session.clear()
    if request.headers.get('Content-Type') == 'application/json' or request.is_json:
        return jsonify({'message': 'Logged out successfully'})
    # Redirect to appropriate home URL based on environment
    home_url = os.getenv('FRONTEND_URL', 'http://localhost:8000') + '/'
    return redirect(home_url)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/manifest.json")
def manifest():
    return send_from_directory(app.template_folder, "manifest.json")

@app.route("/<path:path>")
def catch_all(path):
    # Catch-all route for React Router - serve index.html for any unmatched routes
    if path.startswith("api/") or path.startswith("login") or path.startswith("logout") or path.startswith("auth/") or path.startswith("dashboard") or path.startswith("account") or path.startswith("static/"):
        # Let Flask handle API routes, specific pages, and static files
        return "Not Found", 404
    # For all other routes, serve the React app
    return render_template("index.html")


@app.route('/dashboard')
@login_required
def dashboard():
    # Always return JSON for API calls from React
    user = session.get('user', {})
    return jsonify({
        'user': user,
        'dashboard_data': {
            'applications': _demo_applications(),
            'stats': {
                'total_applications': 4,
                'active_applications': 3,
                'completed_applications': 1
            }
        }
    })


@app.route('/account')
@login_required
def account():
    # Return JSON for API calls
    if request.headers.get('Content-Type') == 'application/json' or request.is_json:
        user = session.get('user', {})
        return jsonify({'user': user})
    # Redirect to appropriate account URL based on environment
    account_url = os.getenv('FRONTEND_URL', 'http://localhost:8000') + '/account'
    return redirect(account_url)


# -------------------- API Routes (JSON responses for React frontend) --------------------

def _demo_applications():
    return [
        {
            'id': 1,
            'name': 'Stanford University',
            'type': 'Early Action',
            'status': 'In Progress',
            'deadline': '2025-11-01',
            'progress': 60,
            'docs_done': 3,
            'docs_total': 5,
            'logo': 'https://logo.clearbit.com/stanford.edu'
        },
        {
            'id': 2,
            'name': 'MIT',
            'type': 'Regular Decision',
            'status': 'Submitted',
            'deadline': '2025-01-05',
            'progress': 100,
            'docs_done': 5,
            'docs_total': 5,
            'logo': 'https://logo.clearbit.com/mit.edu'
        },
        {
            'id': 3,
            'name': 'SAT December',
            'type': 'Test Registration',
            'status': 'Draft',
            'deadline': '2025-12-01',
            'progress': 20,
            'docs_done': 1,
            'docs_total': 3,
            'logo': '/static/images/universities/sat.png'
        },
        {
            'id': 4,
            'name': 'Harvard University',
            'type': 'Regular Decision',
            'status': 'Accepted',
            'deadline': '2025-01-01',
            'progress': 100,
            'docs_done': 5,
            'docs_total': 5,
            'logo': 'https://logo.clearbit.com/harvard.edu'
        }
    ]


@app.route('/api/applications')
@login_required
def api_applications():
    apps = _demo_applications()
    return jsonify({'applications': apps})


@app.route('/api/applications/<int:app_id>')
@login_required
def api_application_detail(app_id: int):
    apps = _demo_applications()
    app_item = next((a for a in apps if a['id'] == app_id), None)
    if not app_item:
        return jsonify({'error': 'Application not found'}), 404
    return jsonify({'application': app_item})


@app.route('/api/applications/analytics')
@login_required
def api_applications_analytics():
    apps = _demo_applications()
    return jsonify({'analytics': apps})


@app.route('/api/schools')
@login_required
def api_schools():
    return jsonify({'schools': []})


@app.route('/api/deadlines')
@login_required
def api_deadlines():
    return jsonify({'deadlines': []})


@app.route('/api/mentor')
@login_required
def api_mentor():
    return jsonify({'mentor': {}})


if __name__ == '__main__':
    try:
        # Use port 8000 for Flask backend API - bind to all interfaces for Docker
        app.run(debug=True, host='0.0.0.0', port=8000)
    except Exception as e:
        print(f"Error starting Flask server: {e}")
