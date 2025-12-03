# MCB Deployment Guide - Complete Instructions

## Overview

- **mcb-website**: Static landing page → Deploy to GitHub Pages
- **mcb-desktop**: Electron desktop app → Distribute via GitHub Releases
- **Backend (Flask)**: Only needed for desktop app's Premium Browser feature

---

## Part 1: Deploy Website to GitHub Pages

### Prerequisites
- GitHub account
- Git installed
- Node.js installed

### Step 1: Prepare the Website

```bash
cd mcb-website

# Install dependencies (if not already done)
npm install

# Test locally first
npm start
# Visit http://localhost:3000 to verify everything works
```

### Step 2: Update package.json

Edit `mcb-website/package.json` and add/update:

```json
{
  "name": "mcb-website",
  "version": "1.0.0",
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/MCB",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

**Replace `YOUR_GITHUB_USERNAME`** with your actual GitHub username.

### Step 3: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 4: Initialize Git (if not already done)

```bash
# In the MCB root directory
cd /Users/akshay/Desktop/GitHub/MCB

# Initialize git if needed
git init

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/MCB.git
```

### Step 5: Deploy to GitHub Pages

```bash
cd mcb-website

# Deploy (this will build and push to gh-pages branch)
npm run deploy
```

This command will:
1. Build the production website (`npm run build`)
2. Create/update the `gh-pages` branch
3. Push the build folder to GitHub

### Step 6: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/YOUR_GITHUB_USERNAME/MCB`
2. Click **Settings**
3. Scroll to **Pages** (in the left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

Your website will be live at: `https://YOUR_GITHUB_USERNAME.github.io/MCB`

### Step 7: Update Download Links

After deploying desktop apps (see Part 2), update the download links in `mcb-website/src/components/Home.tsx`:

```tsx
// Find the download section and update hrefs:

// macOS
href="https://github.com/YOUR_GITHUB_USERNAME/MCB/releases/download/v1.0.0/MCB-1.0.0.dmg"

// Windows
href="https://github.com/YOUR_GITHUB_USERNAME/MCB/releases/download/v1.0.0/MCB-Setup-1.0.0.exe"

// Linux
href="https://github.com/YOUR_GITHUB_USERNAME/MCB/releases/download/v1.0.0/MCB-1.0.0.AppImage"
```

Then redeploy:
```bash
npm run deploy
```

---

## Part 2: Distribute Desktop App via GitHub Releases

### Step 1: Prepare the Desktop App

```bash
cd mcb-desktop

# Install dependencies (if not already done)
npm install

# Test locally first
npm run electron:dev
# The desktop app should open and work correctly
```

### Step 2: Build Desktop Installers

Build for your target platform(s):

**macOS:**
```bash
npm run electron:build:mac
```
Output: `dist/MCB-1.0.0.dmg`

**Windows:**
```bash
npm run electron:build:win
```
Output: `dist/MCB Setup 1.0.0.exe`

**Linux:**
```bash
npm run electron:build:linux
```
Output: `dist/MCB-1.0.0.AppImage`

### Step 3: Create GitHub Release

1. Go to your GitHub repository
2. Click **Releases** → **Create a new release**
3. Click **Choose a tag** → Type `v1.0.0` → Click **Create new tag**
4. **Release title**: `MCB v1.0.0 - Initial Release`
5. **Description**: Add release notes, e.g.:
   ```markdown
   ## MCB Desktop Application v1.0.0
   
   ### Features
   - Student profile and application management
   - Institute dashboard with analytics
   - Multi-exam assignment
   - Batch management
   - Premium browser for applications
   
   ### Downloads
   - **macOS**: Download the .dmg file
   - **Windows**: Download the .exe file
   - **Linux**: Download the .AppImage file
   
   ### System Requirements
   - macOS 10.13+
   - Windows 10+
   - Linux 64-bit with GTK+ 3.0
   ```

6. **Attach binaries**: Drag and drop the files from `mcb-desktop/dist/`:
   - `MCB-1.0.0.dmg`
   - `MCB Setup 1.0.0.exe`
   - `MCB-1.0.0.AppImage`

7. Click **Publish release**

### Step 4: Get Download URLs

After publishing, right-click each file and copy the link. The URLs will be:
```
https://github.com/YOUR_GITHUB_USERNAME/MCB/releases/download/v1.0.0/MCB-1.0.0.dmg
https://github.com/YOUR_GITHUB_USERNAME/MCB/releases/download/v1.0.0/MCB-Setup-1.0.0.exe
https://github.com/YOUR_GITHUB_USERNAME/MCB/releases/download/v1.0.0/MCB-1.0.0.AppImage
```

### Step 5: Update Website Download Links

Update `mcb-website/src/components/Home.tsx` with these URLs (see Part 1, Step 7) and redeploy the website.

---

## Part 3: Backend Configuration (Desktop App Only)

The Flask backend (`app.py`) is **only needed for the desktop app's Premium Browser feature**. The website is completely static and doesn't need the backend.

### For Desktop App Development:

If you're developing the Premium Browser feature:

```bash
# In the MCB root directory
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run the backend
python app.py
```

The desktop app will connect to `http://localhost:5000` for browser automation features.

### For Production Desktop App:

You have two options:

**Option 1: Deploy Backend Separately**
- Deploy Flask backend to Heroku, Railway, or similar
- Update desktop app to point to production backend URL

**Option 2: Disable Premium Browser**
- Comment out Premium Browser routes in desktop app
- Users won't have browser automation features

---

## Testing Checklist

### Website
- [ ] `cd mcb-website && npm install`
- [ ] `npm start` - Verify it works at http://localhost:3000
- [ ] Check all sections (Mission, Solutions, Download buttons)
- [ ] `npm run build` - Verify build succeeds
- [ ] `npm run deploy` - Deploy to GitHub Pages
- [ ] Visit deployed site and verify it's live

### Desktop App
- [ ] `cd mcb-desktop && npm install`
- [ ] `npm run electron:dev` - Verify app opens and works
- [ ] Test student login and features
- [ ] Test institute login and dashboard
- [ ] `npm run electron:build:mac` (or :win/:linux)
- [ ] Install and test the built app
- [ ] Upload to GitHub Releases
- [ ] Test download from GitHub Releases

---

## Troubleshooting

### Website Issues

**"404 - Page not found" on refresh:**
- GitHub Pages doesn't support client-side routing by default
- Solution: Add a `404.html` that redirects to `index.html`

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Deploy fails:**
```bash
# Make sure you're in mcb-website directory
cd mcb-website

# Check if gh-pages is installed
npm list gh-pages

# Try deploying again
npm run deploy
```

### Desktop App Issues

**Electron won't start:**
```bash
# Reinstall dependencies
cd mcb-desktop
rm -rf node_modules package-lock.json
npm install
```

**Build fails:**
- macOS: Install Xcode Command Line Tools
  ```bash
  xcode-select --install
  ```
- Windows: Install Visual Studio Build Tools
- Linux: Install build-essential
  ```bash
  sudo apt-get install build-essential
  ```

---

## Quick Reference

### Website Commands
```bash
cd mcb-website
npm install          # Install dependencies
npm start            # Run locally
npm run build        # Build for production
npm run deploy       # Deploy to GitHub Pages
```

### Desktop App Commands
```bash
cd mcb-desktop
npm install                  # Install dependencies
npm run electron:dev         # Run in development
npm run electron:build:mac   # Build for macOS
npm run electron:build:win   # Build for Windows
npm run electron:build:linux # Build for Linux
```

### Backend Commands (Optional)
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## Support

- **Issues**: Create an issue on GitHub
- **Email**: support@mcb.edu
- **Documentation**: See README files in each project folder
