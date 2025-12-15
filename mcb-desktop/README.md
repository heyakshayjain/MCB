# MCB Desktop Application

Electron-based desktop application for college application management - for students and coaching institutes.

## Features

### For Students
- Complete profile management
- Application tracking and deadlines
- Document management
- AI-powered application assistant
- Premium browser for filling applications
- JEE/entrance exam guides

### For Institutes
- Student dashboard and analytics
- Batch management
- Exam assignment and tracking
- Performance reports
- Student progress monitoring

## Development

```bash
# Install dependencies
npm install

# Start development mode (React + Electron)
npm run electron:dev

# Build for production
npm run build
```

## Building Desktop Apps

### macOS
```bash
npm run electron:build:mac
```
Output: `dist/MCB-{version}.dmg`

### Windows
```bash
npm run electron:build:win
```
Output: `dist/MCB Setup {version}.exe`

### Linux
```bash
npm run electron:build:linux
```
Output: `dist/MCB-{version}.AppImage`

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Desktop**: Electron
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Routing**: React Router (Hash Router for Electron)

## Project Structure

```
mcb-desktop/
├── public/
│   ├── electron.js          # Electron main process
│   └── preload.js           # Electron preload script
├── src/
│   ├── components/          # React components
│   │   ├── institute/       # Institute-specific components
│   │   └── ...
│   ├── utils/               # Utility functions
│   └── App.tsx              # Main app router
└── package.json
```

## Distribution

1. Build the app for your target platform(s)
2. Upload to GitHub Releases or your preferred distribution method
3. Users download and install the appropriate version

## System Requirements

- **macOS**: 10.13 (High Sierra) or later
- **Windows**: Windows 10 or later
- **Linux**: 64-bit system with GTK+ 3.0

## License

Private - MCB Education Platform
