from flask import Flask, render_template, flash
from flask_compress import Compress

app = Flask(__name__)
app.secret_key = 'dev'  # Change this to a secure key in production
Compress(app)  # Enable compression for better performance

# Enable file modification detection
app.config['TEMPLATES_AUTO_RELOAD'] = True


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/career-options')
def career_options():
    return render_template('career-options.html')


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


if __name__ == '__main__':
    try:
        # Use port 8000 to avoid conflicts with AirPlay on macOS
        app.run(debug=True, port=8000, host='127.0.0.1')
    except Exception as e:
        print(f"Error starting server: {e}")
