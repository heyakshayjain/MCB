from flask import Flask, render_template, request, redirect, url_for, session, flash
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

app = Flask(__name__)
# Prefer SECRET_KEY from env; fall back to 'dev' for local/testing
app.secret_key = os.getenv('SECRET_KEY', 'dev')  # Change this to a secure key in production
Compress(app)  # Enable compression for better performance

# Enable file modification detection
app.config['TEMPLATES_AUTO_RELOAD'] = True
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
    raise RuntimeError(
        "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET. "
        "Create a .env file (use .env.example as a template) or export these variables in your shell, then restart."
    )

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


@app.context_processor
def inject_globals():
    # Provide current year to all templates
    return {
        'current_year': datetime.now(UTC).year
    }

@app.route('/')
def home():
    return render_template('home.html')


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
    return render_template("login.html")


@app.route('/login/google')
def login_google():
    # Start Google OAuth flow
    redirect_uri = url_for('auth_google_callback', _external=True)
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
            flash('Google authentication failed. Please try again.', 'error')
            return redirect(url_for('login'))

        # Save minimal user session
        session['user'] = {
            'email': userinfo.get('email'),
            'name': userinfo.get('name'),
            'picture': userinfo.get('picture'),
            'sub': userinfo.get('sub'),
            'provider': 'google'
        }
        flash(f"Welcome, { session['user'].get('name') or session['user'].get('email') }!", 'success')
        return redirect(url_for('dashboard'))
    except Exception as e:
        logging.exception('Google authentication error')
        flash('Google authentication error: %s' % str(e), 'error')
        return redirect(url_for('login'))


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))


@app.route('/career-options')
def career_options():
    return render_template('career-options.html')


@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')


@app.route('/account')
@login_required
def account():
    # Expose user profile details stored in session
    user = session.get('user', {})
    return render_template('account.html', user=user)


# -------------------- Applications (Demo data and routes) --------------------

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


@app.route('/applications')
@login_required
def applications():
    apps = _demo_applications()
    return render_template('applications.html', apps=apps)


@app.route('/applications/<int:app_id>')
@login_required
def application_detail(app_id: int):
    apps = _demo_applications()
    app_item = next((a for a in apps if a['id'] == app_id), None)
    if not app_item:
        flash('Application not found', 'error')
        return redirect(url_for('applications'))
    return render_template('application_detail.html', app_item=app_item)


@app.route('/applications/analytics')
@login_required
def applications_analytics():
    apps = _demo_applications()
    return render_template('applications_analytics.html', apps=apps)


@app.route('/schools')
@login_required
def schools():
    return render_template('schools.html')


@app.route('/deadlines')
@login_required
def deadlines():
    return render_template('deadlines.html')


@app.route('/mentor')
@login_required
def mentor():
    return render_template('mentor.html')


if __name__ == '__main__':
    try:
        # Use port 8000 to avoid conflicts with AirPlay on macOS
        app.run(debug=True, port=8000, host='127.0.0.1')
    except Exception as e:
        print(f"Error starting server: {e}")
