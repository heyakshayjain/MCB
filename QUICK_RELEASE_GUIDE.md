# 🚀 Quick Release Guide - Desktop App

## Current Status
✅ Your website is live on GitHub Pages with download buttons  
⏳ Need to build desktop apps and create GitHub release

---

## Step 1: Build Desktop Apps (5-10 minutes)

### Build for macOS
```bash
cd /Users/akshay/Desktop/GitHub/MCB/mcb-desktop
npm run electron:build:mac
```
**Output file:** `dist/MCB Cloud Browser-0.1.0.dmg` (approximately 100-200 MB)

### Build for Windows
```bash
cd /Users/akshay/Desktop/GitHub/MCB/mcb-desktop
npm run electron:build:win
```
**Output files:** 
- `dist/MCB Cloud Browser Setup 0.1.0.exe` (installer)
- `dist/MCB Cloud Browser 0.1.0.exe` (portable)

---

## Step 2: Create GitHub Release (2 minutes)

### Option A: Via GitHub Web Interface (Easiest)

1. **Go to your releases page:**
   ```
   https://github.com/heyakshayjain/collegebuddyapp/releases/new
   ```

2. **Fill in the form:**
   - **Choose a tag:** Type `v0.1.0` and click "Create new tag"
   - **Release title:** `MCB Desktop v0.1.0`
   - **Description:** 
     ```
     # MCB Desktop App - First Release
     
     ## Features
     - Complete college application management
     - Document tracking and organization
     - Deadline reminders
     - Premium browser for filling applications
     - Career guidance and exam preparation
     
     ## Installation
     - **macOS:** Download the .dmg file, open it, and drag MCB to Applications
     - **Windows:** Download the .exe file and run the installer
     
     ## System Requirements
     - macOS 10.13 or later
     - Windows 10 or later
     ```

3. **Attach files:**
   - Drag and drop `MCB Cloud Browser-0.1.0.dmg`
   - Drag and drop `MCB Cloud Browser Setup 0.1.0.exe`

4. **Click "Publish release"**

### Option B: Via Command Line

```bash
cd /Users/akshay/Desktop/GitHub/MCB

# Create and push tag
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0

# Then upload files via web interface (easier)
```

---

## Step 3: Get Download URLs

After publishing, your URLs will be:

### macOS Download URL:
```
https://github.com/heyakshayjain/collegebuddyapp/releases/download/v0.1.0/MCB.Cloud.Browser-0.1.0.dmg
```

### Windows Download URL:
```
https://github.com/heyakshayjain/collegebuddyapp/releases/download/v0.1.0/MCB.Cloud.Browser.Setup.0.1.0.exe
```

**Note:** GitHub automatically URL-encodes spaces as dots in download URLs.

---

## Step 4: Update Website Download Links

Edit your website file:
```bash
cd /Users/akshay/Desktop/GitHub/MCB/mcb-website
# Edit src/components/Home.tsx
```

Find these lines (around line 546-574) and update:

```tsx
// Update lines 546, 560, 574 in src/components/Home.tsx

// macOS link (line 546):
href="https://github.com/heyakshayjain/collegebuddyapp/releases/download/v0.1.0/MCB.Cloud.Browser-0.1.0.dmg"

// Windows link (line 560):
href="https://github.com/heyakshayjain/collegebuddyapp/releases/download/v0.1.0/MCB.Cloud.Browser.Setup.0.1.0.exe"

// Linux link (line 574):
href="https://github.com/heyakshayjain/collegebuddyapp/releases/download/v0.1.0/MCB.Cloud.Browser-0.1.0.AppImage"
```

---

## Step 5: Deploy Updated Website

```bash
cd /Users/akshay/Desktop/GitHub/MCB/mcb-website

# Build website
npm run build

# Commit and push
git add .
git commit -m "Update download links to v0.1.0"
git push origin main
```

Your GitHub Pages will auto-update in 1-2 minutes!

---

## 🎯 Quick Commands (Copy-Paste)

```bash
# Navigate to desktop folder
cd /Users/akshay/Desktop/GitHub/MCB/mcb-desktop

# Build macOS app
npm run electron:build:mac

# Build Windows app  
npm run electron:build:win

# Check built files
ls -lh dist/*.dmg dist/*.exe
```

---

## ✅ Checklist

- [ ] Build macOS app (`npm run electron:build:mac`)
- [ ] Build Windows app (`npm run electron:build:win`)
- [ ] Create GitHub release at https://github.com/heyakshayjain/collegebuddyapp/releases/new
- [ ] Upload .dmg and .exe files
- [ ] Publish release
- [ ] Update website download links in `src/components/Home.tsx` (lines 546, 560, 574)
- [ ] Build and deploy website
- [ ] Test downloads from https://heyakshayjain.github.io/collegebuddyapp/

---

## 🐛 Troubleshooting

### Build fails on macOS
- Make sure you have Xcode command line tools: `xcode-select --install`

### Build fails on Windows
- You need to be on Windows to build Windows apps
- Alternative: Use GitHub Actions (CI/CD) to build on cloud

### "App can't be opened" on macOS
Users need to:
1. Right-click the app
2. Select "Open"
3. Click "Open" in dialog

This is normal for unsigned apps.

### "Windows protected your PC"
Users need to:
1. Click "More info"
2. Click "Run anyway"

This is normal for unsigned apps.

---

## 📧 Need Help?

- **Build issues:** Check `mcb-desktop/dist/` folder for logs
- **Release issues:** Ensure tag name matches (v0.1.0)
- **Website issues:** Check GitHub Pages deployment status

---

## 🎉 You're Done!

Once completed, users can download your app from:
**https://heyakshayjain.github.io/collegebuddyapp/**

The download buttons will work and install your desktop app! 🚀
