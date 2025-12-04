# MCB Desktop - Build Commands

## Run these commands one at a time:

### 1. Build macOS App (if on Mac)
```bash
cd /Users/akshay/Desktop/GitHub/MCB/mcb-desktop && npm run electron:build:mac
```
Wait for completion (5-10 minutes). Output: `dist/MCB Cloud Browser-0.1.0.dmg`

### 2. Build Windows App (if on Mac with Wine, or skip and build on Windows)
```bash
cd /Users/akshay/Desktop/GitHub/MCB/mcb-desktop && npm run electron:build:win
```
Wait for completion (5-10 minutes). Output: `dist/MCB Cloud Browser Setup 0.1.0.exe`

### 3. Check Built Files
```bash
cd /Users/akshay/Desktop/GitHub/MCB/mcb-desktop && ls -lh dist/
```

### 4. Create Git Tag
```bash
cd /Users/akshay/Desktop/GitHub/MCB && git tag v0.1.0 && git push origin v0.1.0
```

## Then:
1. Go to https://github.com/heyakshayjain/collegebuddyapp/releases/new
2. Upload the files from `mcb-desktop/dist/`
3. Publish release
4. Website is already configured with correct URLs at https://heyakshayjain.github.io/collegebuddyapp/
