# MCB Mobile - College Application Platform

A cross-platform mobile app for managing college applications, built with React Native and Expo.

## Features

✨ **Dashboard** - Overview of your applications and quick access to important features
🏫 **Schools** - Browse and search top engineering colleges (IITs, NITs, BITS, etc.)
🎯 **Career Guidance** - Explore career paths and exam preparation roadmaps
📄 **Documents** - Manage and upload application documents
📅 **Deadlines** - Track important application deadlines

## Technology Stack

- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Lucide React Native** for beautiful icons
- **Apple-inspired design** with clean, minimal UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Navigate to the mobile app directory:
```bash
cd MCBMobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on specific platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
MCBMobile/
├── src/
│   ├── screens/          # Screen components
│   │   ├── DashboardScreen.tsx
│   │   ├── SchoolsScreen.tsx
│   │   ├── CareerScreen.tsx
│   │   ├── DocumentsScreen.tsx
│   │   └── DeadlinesScreen.tsx
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   └── components/       # Reusable components
├── App.tsx              # Main app component
└── package.json
```

## Design System

### Colors
- **Primary Blue**: `#3B82F6`
- **Dark Gray**: `#111827`
- **Medium Gray**: `#6B7280`
- **Light Gray**: `#F3F4F6`
- **Background**: `#F9FAFB`
- **White**: `#FFFFFF`

### Typography
- **Headings**: Bold, 18-28px
- **Body**: Regular, 14-16px
- **Small Text**: 12px

## Screens

### 1. Dashboard
- Application statistics
- Quick action buttons
- Recent activity feed

### 2. Schools
- Search and filter universities
- View detailed college information
- Compare colleges
- Apply directly from the app

### 3. Career Guidance
- Career path roadmaps
- Exam schedules (JEE, BITSAT, etc.)
- Study resources
- Mentorship options

### 4. Documents
- Upload and manage documents
- Document verification status
- Download and share documents

### 5. Deadlines
- Track application deadlines
- Priority-based sorting
- Countdown timers
- Notifications for upcoming deadlines

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Testing on Device

1. Install Expo Go app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the dev server:
```bash
npm start
```

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## Future Enhancements

- [ ] Push notifications for deadlines
- [ ] Offline mode support
- [ ] Document scanning with camera
- [ ] AI-powered college recommendations
- [ ] Chat with counselors
- [ ] Application status tracking
- [ ] Integration with college portals
- [ ] Financial aid calculator
- [ ] Scholarship finder

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@mcb.app or join our Slack channel.

---

Built with ❤️ for students aspiring to join top engineering colleges in India
