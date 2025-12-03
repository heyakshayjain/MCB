from flask import Flask, request, redirect, url_for, session, flash, jsonify
from flask_compress import Compress
from functools import wraps
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv, find_dotenv
import os
from datetime import datetime, UTC, timedelta
import logging
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_sock import Sock
from routes_navigation import navigation_bp
from routes_actions import actions_bp
from routes_stream import handle_stream

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

app = Flask(__name__)
# Prefer SECRET_KEY from env; fall back to 'dev' for local/testing
app.secret_key = os.getenv('SECRET_KEY', 'dev')  # Change this to a secure key in production
Compress(app)  # Enable compression for better performance
sock = Sock(app)

app.register_blueprint(navigation_bp)
app.register_blueprint(actions_bp)

@sock.route('/stream')
def stream_socket(ws):
    handle_stream(ws)

# Database configuration
database_url = os.getenv('DATABASE_URL')
if database_url:
    if 'railway' in database_url:
        # Railway provides PostgreSQL, ensure correct protocol
        database_url = database_url.replace('postgres://', 'postgresql://')
    elif 'mcbdatabase.railway.internal' in database_url:
        # Use Railway private networking for database
        pass  # Keep as-is, Railway handles the connection
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    # Fallback to SQLite for local development
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mcb.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=True)  # For traditional login
    name = db.Column(db.String(100), nullable=True)
    google_id = db.Column(db.String(100), unique=True, nullable=True)
    profile_picture = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_premium = db.Column(db.Boolean, default=False)
    reset_token = db.Column(db.String(100), unique=True, nullable=True)
    reset_token_expires = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'profile_picture': self.profile_picture,
            'google_id': self.google_id,
            'created_at': self.created_at.isoformat(),
            'is_premium': self.is_premium
        }

    def generate_reset_token(self):
        self.reset_token = secrets.token_urlsafe(32)
        self.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
        db.session.commit()
        return self.reset_token

    def verify_reset_token(self, token):
        if self.reset_token == token and self.reset_token_expires > datetime.utcnow():
            return True
        return False

    def clear_reset_token(self):
        self.reset_token = None
        self.reset_token_expires = None
        db.session.commit()

# CORS configuration for API access
from flask_cors import CORS
# Allow API access from frontend and other origins
CORS(app, origins=['https://mcb-frontend.up.railway.app', 'http://localhost:3000', 'http://localhost:3001'], supports_credentials=True, allow_headers=['Content-Type', 'Authorization'])

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


# Health check endpoint for Electron
@app.route('/health')
def health():
    return jsonify({'status': 'ok'}), 200

@app.route("/login", methods=["GET", "POST"])
def login():
    # If already authenticated, return user info
    if request.method == "GET" and session.get("user"):
        return jsonify({"user": session.get("user")})

    if request.method == "POST":
        data = request.get_json() or {}
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not email or not password:
            return jsonify({"error": "Please enter email and password"}), 400

        # Check database for user
        user = User.query.filter_by(email=email).first()
        if user and user.password_hash and check_password_hash(user.password_hash, password):
            session["user"] = user.to_dict()
            return jsonify({"message": "Login successful", "user": session["user"]})
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    # Return JSON for API calls
    return jsonify({"message": "Please use Google OAuth for authentication"})

@app.route("/api/login", methods=["POST"])
def api_login():
    """API endpoint for login"""
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"error": "Please enter email and password"}), 400

    # Check database for user
    user = User.query.filter_by(email=email).first()
    if user and user.password_hash and check_password_hash(user.password_hash, password):
        session["user"] = user.to_dict()
        return jsonify({"message": "Login successful", "user": session["user"]})
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route("/api/register", methods=["POST"])
def api_register():
    """API endpoint for user registration"""
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()
    name = data.get("name", "").strip()

    if not email or not password or not name:
        return jsonify({"error": "Please provide email, password, and name"}), 400

    # Validate password length
    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409

    # Create new user
    password_hash = generate_password_hash(password)
    new_user = User(
        email=email,
        password_hash=password_hash,
        name=name,
        is_premium=False  # Default for regular registration
    )

    db.session.add(new_user)
    db.session.commit()

    # Auto-login after registration
    session["user"] = new_user.to_dict()
    return jsonify({"message": "Registration successful", "user": session["user"]}), 201


@app.route('/login/google')
def login_google():
    if not oauth:
        return jsonify({'error': 'Google OAuth not configured'}), 500
    # Start Google OAuth flow - use frontend URL for callback since Google redirects to frontend
    frontend_url = os.getenv('FRONTEND_URL', request.headers.get('Referer', 'https://mcb-frontend.up.railway.app').split('/')[0] + '//' + request.headers.get('Referer', 'https://mcb-frontend.up.railway.app').split('/')[2])
    redirect_uri = f"{frontend_url}/auth/google/callback"
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

        # Check if user exists in database, create if not
        user = User.query.filter_by(google_id=userinfo.get('sub')).first()
        if not user:
            user = User.query.filter_by(email=userinfo.get('email')).first()
            if not user:
                # Create new user
                user = User(
                    email=userinfo.get('email'),
                    name=userinfo.get('name'),
                    google_id=userinfo.get('sub'),
                    profile_picture=userinfo.get('picture'),
                    is_premium=True  # Default for Google OAuth users
                )
                db.session.add(user)
                db.session.commit()
            else:
                # Update existing user with Google ID
                user.google_id = userinfo.get('sub')
                user.profile_picture = userinfo.get('picture')
                db.session.commit()

        # Save user session
        session['user'] = user.to_dict()

        # Return JSON for API calls
        return jsonify({
            'message': 'Authentication successful',
            'user': session['user']
        })
    except Exception as e:
        logging.exception('Google authentication error')
        return jsonify({'error': 'Google authentication error: %s' % str(e)}), 500


def send_reset_email(email, reset_token):
    """Send password reset email (placeholder - implement with your email service)"""
    try:
        # This is a placeholder - implement with your email service (SendGrid, Mailgun, etc.)
        print(f"Password reset requested for {email}. Token: {reset_token}")
        print(f"Reset link: https://your-frontend-url.com/reset-password?token={reset_token}")
        # In production, send actual email here
        return True
    except Exception as e:
        print(f"Error sending reset email: {e}")
        return False

@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json() or {}
    email = data.get("email", "").strip()

    if not email:
        return jsonify({"error": "Please provide an email address"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.password_hash:
        # Don't reveal if email exists or not for security
        return jsonify({"message": "If an account with this email exists, a password reset link has been sent"}), 200

    # Generate reset token
    reset_token = user.generate_reset_token()

    # Send reset email
    if send_reset_email(email, reset_token):
        return jsonify({"message": "If an account with this email exists, a password reset link has been sent"}), 200
    else:
        return jsonify({"error": "Failed to send reset email"}), 500

@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json() or {}
    token = data.get("token", "").strip()
    new_password = data.get("password", "").strip()

    if not token or not new_password:
        return jsonify({"error": "Please provide token and new password"}), 400

    # Find user by reset token
    user = User.query.filter_by(reset_token=token).first()
    if not user or not user.verify_reset_token(token):
        return jsonify({"error": "Invalid or expired reset token"}), 400

    # Update password
    user.password_hash = generate_password_hash(new_password)
    user.clear_reset_token()
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()
    name = data.get("name", "").strip()

    if not email or not password or not name:
        return jsonify({"error": "Please provide email, password, and name"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409

    # Create new user
    password_hash = generate_password_hash(password)
    new_user = User(
        email=email,
        password_hash=password_hash,
        name=name,
        is_premium=False  # Default for regular registration
    )

    db.session.add(new_user)
    db.session.commit()

    # Auto-login after registration
    session["user"] = new_user.to_dict()
    return jsonify({"message": "Registration successful", "user": session["user"]}), 201

@app.route("/api/users", methods=["POST"])
@login_required
def create_user():
    """Admin endpoint to create users (requires authentication)"""
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()
    name = data.get("name", "").strip()
    is_premium = data.get("is_premium", False)

    if not email or not password or not name:
        return jsonify({"error": "Please provide email, password, and name"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409

    # Create new user
    password_hash = generate_password_hash(password)
    new_user = User(
        email=email,
        password_hash=password_hash,
        name=name,
        is_premium=is_premium
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully",
        "user": new_user.to_dict()
    }), 201

@app.route("/api/users", methods=["GET"])
@login_required
def get_users():
    """Get all users (requires authentication)"""
    users = User.query.all()
    return jsonify({
        "users": [user.to_dict() for user in users]
    })

@app.route("/api/users/<int:user_id>", methods=["GET"])
@login_required
def get_user(user_id):
    """Get specific user by ID (requires authentication)"""
    user = User.query.get_or_404(user_id)
    return jsonify({"user": user.to_dict()})

@app.route("/api/users/<int:user_id>", methods=["PUT"])
@login_required
def update_user(user_id):
    """Update user (requires authentication)"""
    user = User.query.get_or_404(user_id)
    data = request.get_json() or {}

    # Update allowed fields
    if "name" in data:
        user.name = data["name"]
    if "is_premium" in data:
        user.is_premium = data["is_premium"]

    # Only update password if provided
    if "password" in data and data["password"]:
        user.password_hash = generate_password_hash(data["password"])

    db.session.commit()

    return jsonify({
        "message": "User updated successfully",
        "user": user.to_dict()
    })

@app.route("/api/users/<int:user_id>", methods=["DELETE"])
@login_required
def delete_user(user_id):
    """Delete user (requires authentication)"""
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"})

@app.route("/logout")
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'})


@app.route("/")
def home():
    return jsonify({"message": "MCB College Application Assistant API", "version": "1.0.0"})


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
    user = session.get('user', {})
    return jsonify({'user': user})


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


# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    try:
        # Use PORT environment variable for Railway, default to 8000 for local development
        port = int(os.getenv('PORT', 8000))
        print(f"Starting server on port {port}...")
        app.run(debug=True, host='0.0.0.0', port=port)
    except Exception as e:
        print(f"Error starting Flask server: {e}")
