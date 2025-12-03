# Desktop App Build and Distribution Guide

## Quick Start

### Build Desktop Installers

```bash
cd mcb-desktop

# macOS
npm run electron:build:mac

# Windows
npm run electron:build:win

# Linux
npm run electron:build:linux
```

---

## Part 1: Building the Desktop App

### Prerequisites

- Node.js 16+ installed
- Platform-specific build tools:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Visual Studio Build Tools
  - **Linux**: build-essential package

### Step 1: Prepare for Build

```bash
cd mcb-desktop

# Install dependencies (if not already done)
npm install

# Test the app first
npm run electron:dev
```

### Step 2: Build for Your Platform

#### macOS (.dmg)
```bash
npm run electron:build:mac
```
**Output**: `dist/MCB-1.0.0.dmg`
**Size**: ~100-150 MB
**Compatible**: macOS 10.13 (High Sierra) and later

#### Windows (.exe)
```bash
npm run electron:build:win
```
**Output**: `dist/MCB Setup 1.0.0.exe`
**Size**: ~100-150 MB
**Compatible**: Windows 10 and later

#### Linux (.AppImage)
```bash
npm run electron:build:linux
```
**Output**: `dist/MCB-1.0.0.AppImage`
**Size**: ~100-150 MB
**Compatible**: Most modern Linux distributions

### Step 3: Test the Built App

**macOS:**
```bash
open dist/MCB-1.0.0.dmg
# Install and test the app
```

**Windows:**
```bash
# Double-click dist/MCB Setup 1.0.0.exe
# Install and test the app
```

**Linux:**
```bash
chmod +x dist/MCB-1.0.0.AppImage
./dist/MCB-1.0.0.AppImage
```

---

## Part 2: Creating a GitHub Release

### Step 1: Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Release v1.0.0"
git push origin main
```

### Step 2: Create a Release on GitHub

1. Go to your repository: `https://github.com/YOUR_USERNAME/MCB`
2. Click **Releases** (right sidebar)
3. Click **Create a new release**

### Step 3: Configure the Release

**Tag version:**
- Click "Choose a tag"
- Type: `v1.0.0`
- Click "Create new tag: v1.0.0 on publish"

**Release title:**
```
MCB Desktop v1.0.0
```

**Description:**
```markdown
## MCB Desktop Application v1.0.0

### 🎉 First Release

A comprehensive college application management platform for students and institutes.

### ✨ Features

**For Students:**
- Complete profile management
- Application tracking and deadlines
- Document organization
- AI-powered application assistant
- Premium browser for filling applications

**For Institutes:**
- Student dashboard with analytics
- Batch management
- Exam assignment and tracking
- Performance reports and insights
- Multi-exam support

### 📥 Downloads

Choose the installer for your operating system:

- **macOS**: Download `MCB-1.0.0.dmg`
- **Windows**: Download `MCB-Setup-1.0.0.exe`
- **Linux**: Download `MCB-1.0.0.AppImage`

### 💻 System Requirements

- **macOS**: 10.13 (High Sierra) or later
- **Windows**: Windows 10 or later
- **Linux**: 64-bit with GTK+ 3.0

### 🐛 Known Issues

None reported yet!

### 📝 Installation Instructions

**macOS:**
1. Download the .dmg file
2. Open the .dmg file
3. Drag MCB to Applications folder
4. Open from Applications

**Windows:**
1. Download the .exe file
2. Run the installer
3. Follow the installation wizard
4. Launch from Start Menu

**Linux:**
1. Download the .AppImage file
2. Make it executable: `chmod +x MCB-1.0.0.AppImage`
3. Run: `./MCB-1.0.0.AppImage`

### 🔐 Demo Credentials

**Student Login:**
- Email: student@mcb.edu
- Password: student

**Institute Login:**
- Email: admin@mcb.edu
- Password: admin
```

### Step 4: Upload Installers

Drag and drop these files from `mcb-desktop/dist/`:
- `MCB-1.0.0.dmg` (macOS)
- `MCB Setup 1.0.0.exe` (Windows)
- `MCB-1.0.0.AppImage` (Linux)

### Step 5: Publish

- Check "Set as the latest release"
- Click **Publish release**

---

## Part 3: Updating Website Download Links

### Step 1: Get Download URLs

After publishing, your download URLs will be:

```
https://github.com/YOUR_USERNAME/MCB/releases/download/v1.0.0/MCB-1.0.0.dmg
https://github.com/YOUR_USERNAME/MCB/releases/download/v1.0.0/MCB-Setup-1.0.0.exe
https://github.com/YOUR_USERNAME/MCB/releases/download/v1.0.0/MCB-1.0.0.AppImage
```

### Step 2: Update Website

Edit `mcb-website/src/components/Home.tsx`:

Find the download section (around line 515) and update:

```tsx
// macOS
<a
  href="https://github.com/YOUR_USERNAME/MCB/releases/download/v1.0.0/MCB-1.0.0.dmg"
  className="group p-6 bg-white rounded-2xl..."
>
  {/* ... */}
</a>

// Windows
<a
  href="https://github.com/YOUR_USERNAME/MCB/releases/download/v1.0.0/MCB-Setup-1.0.0.exe"
  className="group p-6 bg-white rounded-2xl..."
>
  {/* ... */}
</a>

// Linux
<a
  href="https://github.com/YOUR_USERNAME/MCB/releases/download/v1.0.0/MCB-1.0.0.AppImage"
  className="group p-6 bg-white rounded-2xl..."
>
  {/* ... */}
</a>
```

### Step 3: Redeploy Website

```bash
cd mcb-website
npm run deploy
```

---

## Part 4: Future Updates

### Releasing a New Version

1. **Update version** in `mcb-desktop/package.json`:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. **Build new installers**:
   ```bash
   npm run electron:build:mac
   npm run electron:build:win
   npm run electron:build:linux
   ```

3. **Create new GitHub release** with tag `v1.1.0`

4. **Upload new installers**

5. **Update website** download links

### Auto-Updates (Advanced)

To enable automatic updates:

1. Install electron-updater:
   ```bash
   npm install electron-updater
   ```

2. Add to `electron.js`:
   ```javascript
   const { autoUpdater } = require('electron-updater');
   
   app.on('ready', () => {
     autoUpdater.checkForUpdatesAndNotify();
   });
   ```

3. Configure in `package.json`:
   ```json
   {
     "publish": {
       "provider": "github",
       "owner": "YOUR_USERNAME",
       "repo": "MCB"
     }
   }
   ```

---

## Troubleshooting

### Build Fails

**macOS:**
```bash
# Install Xcode Command Line Tools
xcode-select --install

# If still fails, try:
sudo xcode-select --reset
```

**Windows:**
- Install Visual Studio Build Tools
- Make sure Windows SDK is installed

**Linux:**
```bash
# Install build dependencies
sudo apt-get install build-essential
```

### App Won't Start

1. Check if all dependencies are installed:
   ```bash
   npm install
   ```

2. Try rebuilding:
   ```bash
   rm -rf dist
   npm run electron:build:mac  # or :win or :linux
   ```

### Large File Size

The app size is normal for Electron apps (~100-150 MB). To reduce:
- Remove unused dependencies
- Use `electron-builder` compression options
- Consider using `asar` archives

---

## Distribution Checklist

- [ ] Build app for all platforms
- [ ] Test each installer
- [ ] Create GitHub release with tag
- [ ] Write comprehensive release notes
- [ ] Upload all installers
- [ ] Get download URLs
- [ ] Update website download links
- [ ] Deploy website
- [ ] Test downloads from website
- [ ] Announce release

---

## Support

If users encounter issues:
- Direct them to GitHub Issues
- Provide demo credentials
- Share system requirements
- Link to this guide

## Next Steps

1. Build the installers
2. Create GitHub release
3. Update website links
4. Share with users!
