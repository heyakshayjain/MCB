# College Application Assistant

A comprehensive web application to help students manage their college applications with AI-powered assistance and premium browser features.

## Features

### Free Features
- Google OAuth authentication
- Application dashboard
- School search and tracking
- Application deadline management
- AI mentor chat
- JEE application guide

### Premium Features ($)
- **AI Application Assistant**: Intelligent form-filling help
- **Premium Browser**: Embedded browser for application sites
- **Document Management**: Drag-and-drop document uploads
- **Quick Copy Tools**: One-click copying of personal/academic data

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: PostgreSQL (Railway)
- **Authentication**: Google OAuth
- **Deployment**: Railway (Free tier)

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd college-app-assistant
   ```

2. **Backend Setup**
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt

   # Set environment variables
   export GOOGLE_CLIENT_ID="your-google-client-id"
   export GOOGLE_CLIENT_SECRET="your-google-client-secret"
   export SECRET_KEY="your-secret-key"

   # Run Flask app
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/dashboard
   npm install
   npm start
   ```

## Production Deployment (Railway - FREE)

### 1. Prepare for Deployment
```bash
# Build React production assets
cd frontend/dashboard
npm run build

# Copy build files to Flask static/templates
cd ../..
cp -r frontend/dashboard/build/* static/
cp frontend/dashboard/build/index.html templates/
```

### 2. Railway Deployment
1. **Create Railway Account**: https://railway.app
2. **Connect GitHub**: Link your repository
3. **Auto-deploy**: Railway detects Flask automatically
4. **Set Environment Variables**:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `SECRET_KEY`
5. **Add Database**: Click "Add PostgreSQL" in Railway dashboard

### 3. Update Google OAuth
- Add your Railway domain to Google OAuth authorized redirect URIs
- Format: `https://your-app-name.up.railway.app/auth/google/callback`

## Environment Variables

```bash
# Required
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SECRET_KEY=your_secure_random_key

# Optional (Railway provides automatically)
DATABASE_URL=postgresql://...
PORT=8000
```

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    school_name VARCHAR(255),
    application_type VARCHAR(255),
    status VARCHAR(255),
    deadline DATE,
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

- `GET /` - React app
- `POST /login` - Google OAuth login
- `GET /dashboard` - User dashboard data
- `GET /api/applications` - List user applications
- `GET /logout` - Logout

## Premium Features

### AI Application Assistant
- Contextual help for application forms
- Smart suggestions based on user data
- Form auto-fill capabilities

### Premium Browser
- Embedded iframe browser
- Direct access to application websites
- Drag-and-drop document uploads
- Quick copy tools for personal data

## Cost Structure

- **Free Tier**: Basic features, unlimited users
- **Premium Tier**: $9.99/month per user
  - AI Application Assistant
  - Premium Browser
  - Document management
  - Priority support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
