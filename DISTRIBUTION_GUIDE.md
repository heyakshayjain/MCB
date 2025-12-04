# MCB Desktop App Distribution Guide

This guide explains how to build and distribute your desktop application.

## 📦 Step 1: Build Desktop Apps

### Build for macOS
```bash
cd mcb-desktop
npm run electron:build:mac
```
**Output:** `mcb-desktop/dist/MCB Cloud Browser-0.1.0.dmg`

### Build for Windows
```bash
cd mcb-desktop
npm run electron:build:win
```
**Output:** 
- `mcb-desktop/dist/MCB Cloud Browser Setup 0.1.0.exe` (installer)
- `mcb-desktop/dist/MCB Cloud Browser 0.1.0.exe` (portable)

### Build for Linux (Optional)
```bash
cd mcb-desktop
npm run electron:build:linux
```
**Output:** `mcb-desktop/dist/MCB Cloud Browser-0.1.0.AppImage`

---

## 🌐 Step 2: Host Installer Files

### Option A: GitHub Releases (Recommended - FREE)

1. **Create a new release on GitHub:**
   ```bash
   # Create a git tag
   git tag v0.1.0
   git push origin v0.1.0
   ```

2. **Upload installers:**
   - Go to: `https://github.com/heyakshayjain/MCB/releases/new`
   - Tag: `v0.1.0`
   - Title: `MCB Desktop v0.1.0`
   - Description: Add release notes
   - Attach files:
     - `MCB Cloud Browser-0.1.0.dmg` (macOS)
     - `MCB Cloud Browser Setup 0.1.0.exe` (Windows)
     - `MCB Cloud Browser-0.1.0.AppImage` (Linux)

3. **Get download URLs:**
   - macOS: `https://github.com/heyakshayjain/MCB/releases/download/v0.1.0/MCB.Cloud.Browser-0.1.0.dmg`
   - Windows: `https://github.com/heyakshayjain/MCB/releases/download/v0.1.0/MCB.Cloud.Browser.Setup.0.1.0.exe`
   - Linux: `https://github.com/heyakshayjain/MCB/releases/download/v0.1.0/MCB.Cloud.Browser-0.1.0.AppImage`

### Option B: Cloud Storage

Upload to:
- **Google Drive** (Make files publicly accessible)
- **Dropbox** (Get shareable links)
- **AWS S3** (Host in cloud)
- **Firebase Storage**

### Option C: Your Own Server

Upload to your web hosting and get direct URLs.

---

## 🎨 Step 3: Create Download Page

I've created a landing page at `mcb-website/index.html` with:
- Download buttons for Mac, Windows, Linux
- Feature highlights
- Screenshots section
- System requirements
- Support information

### Update Download URLs

Edit `mcb-website/index.html` and update the `href` attributes:

```html
<!-- Line 89 -->
<a href="YOUR_GITHUB_RELEASE_URL_MAC" class="download-btn primary">
  Download for macOS
</a>

<!-- Line 115 -->
<a href="YOUR_GITHUB_RELEASE_URL_WINDOWS" class="download-btn primary">
  Download for Windows
</a>

<!-- Line 141 -->
<a href="YOUR_GITHUB_RELEASE_URL_LINUX" class="download-btn primary">
  Download for Linux
</a>
```

---

## 🚀 Step 4: Deploy Website

### Option A: GitHub Pages (FREE)

1. **Create `gh-pages` branch:**
   ```bash
   cd mcb-website
   git checkout -b gh-pages
   git add .
   git commit -m "Add download page"
   git push origin gh-pages
   ```

2. **Enable GitHub Pages:**
   - Go to: `https://github.com/heyakshayjain/MCB/settings/pages`
   - Source: `gh-pages` branch
   - Your site will be at: `https://heyakshayjain.github.io/MCB/`

### Option B: Vercel (FREE)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd mcb-website
   vercel --prod
   ```

### Option C: Netlify (FREE)

1. **Drag & drop** the `mcb-website` folder to https://app.netlify.com/drop
2. Get instant URL: `https://your-site.netlify.app`

### Option D: Your Own Hosting

Upload `mcb-website` folder to your web hosting via FTP/cPanel.

---

## 📝 Complete Workflow Example

```bash
# 1. Build desktop apps
cd mcb-desktop
npm run electron:build:mac
npm run electron:build:win

# 2. Create GitHub release
git tag v0.1.0
git push origin v0.1.0

# 3. Upload installers to GitHub Releases
# (Do this via GitHub web interface)

# 4. Update website with download URLs
cd ../mcb-website
# Edit index.html with your URLs

# 5. Deploy website
git add .
git commit -m "Add download page"
git push origin main
vercel --prod  # or use GitHub Pages
```

---

## 🔄 Updates & Auto-Updates

### Manual Updates (Current)
Users download new versions from your website.

### Automatic Updates (Future)
To add auto-updates, configure `electron-builder`:

```json
// mcb-desktop/electron-builder.json
{
  "publish": {
    "provider": "github",
    "owner": "heyakshayjain",
    "repo": "MCB"
  }
}
```

Then in your Electron app:
```javascript
const { autoUpdater } = require('electron-updater');
autoUpdater.checkForUpdatesAndNotify();
```

---

## 📊 Analytics (Optional)

Track downloads with:
- **Google Analytics** on your download page
- **GitHub Release download stats**
- **Custom tracking** with services like Plausible/Umami

---

## ✅ Checklist

- [ ] Build Mac installer
- [ ] Build Windows installer
- [ ] Create GitHub Release
- [ ] Upload installers to release
- [ ] Update website with download URLs
- [ ] Deploy website
- [ ] Test downloads on both platforms
- [ ] Add release notes
- [ ] Share download links

---

## 🛠️ Troubleshooting

### macOS Security Warning
Users may see "App can't be opened because it's from an unidentified developer"

**Solution:** Users need to:
1. Right-click the app
2. Select "Open"
3. Click "Open" in the dialog

**Long-term:** Sign your app with Apple Developer account ($99/year)

### Windows SmartScreen
Users may see "Windows protected your PC"

**Solution:** Users need to:
1. Click "More info"
2. Click "Run anyway"

**Long-term:** Sign your app with EV Code Signing Certificate

---

## 📧 Support

Create support channels:
- GitHub Issues: `https://github.com/heyakshayjain/MCB/issues`
- Email: support@yourdomain.com
- Discord/Slack community

---

## 🎯 Next Steps

1. Build your apps
2. Create GitHub release
3. Deploy download page
4. Share with users!

Good luck with your distribution! 🚀
