# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy Python requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask app
COPY app.py .

# Copy React frontend
COPY frontend/dashboard/ ./frontend/dashboard/
WORKDIR /app/frontend/dashboard

# Install Node.js dependencies and build
RUN npm ci --only=production && npm run build

# Point Flask to use the React build folder directly
ENV FLASK_STATIC_FOLDER=/app/frontend/dashboard/build/static
ENV FLASK_TEMPLATE_FOLDER=/app/frontend/dashboard/build

# Go back to root directory
WORKDIR /app

# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/ || exit 1

# Start the application
CMD ["python", "app.py"]