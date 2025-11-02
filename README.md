# MCB - College Application Assistant

A full-stack web application for managing college applications with Google OAuth authentication, built with React frontend and Flask backend.

## Features

- 🔐 Google OAuth authentication
- 📊 Application tracking dashboard
- 🎯 Step-by-step application guidance
- 🌐 Integrated browser for application forms
- 📱 Responsive design
- 🔍 Google Custom Search integration

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Flask, Python 3.11
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: Google OAuth 2.0
- **Deployment**: Docker, Railway

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Google OAuth credentials

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/heyakshayjain/MCB.git
   cd MCB
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   SECRET_KEY=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FRONTEND_URL=http://localhost:8000
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Open http://localhost:8000 in your browser

## Manual Development Setup

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Flask backend
python app.py
```

### Frontend Setup
```bash
# Install Node.js dependencies
cd frontend/dashboard
npm install

# Start React development server
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Flask secret key | `dev` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Required |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Required |
| `FRONTEND_URL` | Frontend URL for redirects | `http://localhost:3001` |
| `REACT_APP_API_BASE_URL` | API base URL for React | `http://localhost:8000` |

## Docker Commands

```bash
# Build the image
docker build -t mcb-app .

# Run the container
docker run -p 8000:8000 --env-file .env mcb-app

# Or use Docker Compose
docker-compose up -d
docker-compose down
```

## Deployment

### Railway (Recommended)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Other Platforms
The Docker setup works with any container platform:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## API Endpoints

- `GET /` - Serve React app
- `GET /login` - Login page
- `GET /login/google` - Start Google OAuth
- `GET /auth/google/callback` - OAuth callback
- `GET /logout` - Logout
- `GET /dashboard` - Dashboard data (JSON)
- `GET /api/applications` - List applications
- `GET /api/applications/<id>` - Application details

## Project Structure

```
MCB/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── nixpacks.toml         # Railway deployment config
├── templates/            # Flask HTML templates
├── static/               # Static assets (built React app)
├── frontend/
│   └── dashboard/        # React frontend
│       ├── src/
│       ├── public/
│       └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## License

MIT License - see LICENSE file for details
