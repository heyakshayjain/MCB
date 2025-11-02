# MCB - College Application Assistant API

A REST API for managing college applications with Google OAuth authentication.

## Features

- 🔐 Google OAuth 2.0 authentication
- 📊 Application tracking and management
- 🎯 Step-by-step application guidance
- 🌐 Integrated browser automation for forms
- 🔍 Google Custom Search integration

## Tech Stack

- **Framework**: Flask, Python 3.11
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: Google OAuth 2.0
- **Deployment**: Docker, Railway

## Quick Start

### Prerequisites
- Python 3.11+
- Google OAuth credentials (Client ID & Secret)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/heyakshayjain/MCB.git
   cd MCB
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   SECRET_KEY=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run the API**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication

#### GET /
Returns API information and version.

**Response:**
```json
{
  "message": "MCB College Application Assistant API",
  "version": "1.0.0"
}
```

#### GET /login
Check current authentication status.

**Response (authenticated):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "profile_picture": "https://...",
    "google_id": "google-user-id",
    "created_at": "2025-01-01T00:00:00",
    "is_premium": true
  }
}
```

**Response (not authenticated):**
```json
{
  "message": "Please use Google OAuth for authentication"
}
```

#### POST /login
Traditional email/password login.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**Response (success):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "is_premium": false
  }
}
```

#### POST /register
User registration with email/password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```

**Response (success):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "is_premium": false
  }
}
```

#### POST /forgot-password
Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "If an account with this email exists, a password reset link has been sent"
}
```

#### POST /reset-password
Reset password using reset token.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "newsecurepassword"
}
```

**Response (success):**
```json
{
  "message": "Password reset successful"
}
```

#### GET /login/google
Initiate Google OAuth login flow.

**Redirects to:** Google OAuth authorization URL

#### GET /auth/google/callback
Handle Google OAuth callback.

**Response (success):**
```json
{
  "message": "Authentication successful",
  "user": {
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://...",
    "sub": "google-user-id",
    "provider": "google",
    "premium": true
  }
}
```

#### GET /logout
Logout current user.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Applications

#### GET /dashboard
Get dashboard data with applications and statistics.

**Auth Required:** Yes

**Response:**
```json
{
  "user": {...},
  "dashboard_data": {
    "applications": [...],
    "stats": {
      "total_applications": 4,
      "active_applications": 3,
      "completed_applications": 1
    }
  }
}
```

#### GET /api/applications
List all applications.

**Auth Required:** Yes

**Response:**
```json
{
  "applications": [
    {
      "id": 1,
      "name": "Stanford University",
      "type": "Early Action",
      "status": "In Progress",
      "deadline": "2025-11-01",
      "progress": 60,
      "docs_done": 3,
      "docs_total": 5,
      "logo": "https://logo.clearbit.com/stanford.edu"
    }
  ]
}
```

#### GET /api/applications/{id}
Get specific application details.

**Auth Required:** Yes

**Parameters:**
- `id` (int): Application ID

**Response:**
```json
{
  "application": {
    "id": 1,
    "name": "Stanford University",
    "type": "Early Action",
    "status": "In Progress",
    "deadline": "2025-11-01",
    "progress": 60,
    "docs_done": 3,
    "docs_total": 5,
    "logo": "https://logo.clearbit.com/stanford.edu"
  }
}
```

#### GET /api/applications/analytics
Get application analytics data.

**Auth Required:** Yes

**Response:**
```json
{
  "analytics": [...]
}
```

### User Account

#### GET /account
Get current user account information.

**Auth Required:** Yes

**Response:**
```json
{
  "user": {
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://...",
    "provider": "google",
    "premium": true
  }
}
```

### Additional Endpoints

#### GET /api/schools
Get list of schools (placeholder).

**Auth Required:** Yes

**Response:**
```json
{
  "schools": []
}
```

#### GET /api/deadlines
Get application deadlines (placeholder).

**Auth Required:** Yes

**Response:**
```json
{
  "deadlines": []
}
```

#### GET /api/mentor
Get mentor information (placeholder).

**Auth Required:** Yes

**Response:**
```json
{
  "mentor": {}
}
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SECRET_KEY` | Flask session secret | Yes | `dev` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes | - |
| `API_BASE_URL` | Base URL for API callbacks | No | `http://localhost:8000` |

## Docker Deployment

### Build and Run
```bash
# Build image
docker build -t mcb-api .

# Run container
docker run -p 8000:8000 --env-file .env mcb-api

# Or use Docker Compose
docker-compose up --build
```

## Railway Deployment

1. **Connect Repository**: Link your GitHub repository to Railway
2. **Set Environment Variables**: In Railway dashboard, add:
   - `SECRET_KEY`: Your Flask secret key
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
   - `API_BASE_URL`: `https://your-app-name.up.railway.app` (Railway will provide this)
3. **Deploy**: Push to main branch to trigger automatic deployment
4. **Access**: Your API will be available at the Railway-provided URL

## Project Structure

```
MCB/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── nixpacks.toml         # Railway deployment config
├── Procfile              # Heroku deployment config
├── .env                  # Environment variables (create from .env.example)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Authentication Flow

1. Client calls `GET /login/google`
2. User is redirected to Google OAuth
3. Google redirects back to `GET /auth/google/callback`
4. API returns user session data
5. Client stores session/token for subsequent requests
6. All protected endpoints require valid session

## Error Responses

All endpoints return JSON error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `python app.py`
5. Submit a pull request

## License

MIT License
