# MCB Mobile App - Quick Start Guide

## 🚀 Running the App

Your mobile app is now ready! Follow these steps:

### 1. Start the Development Server

```bash
cd MCBMobile
npm start
```

This will open the Expo DevTools in your browser.

### 2. Run on Your Device

#### Option A: Physical Device (Easiest)

1. Install **Expo Go** on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Scan the QR code shown in the terminal:
   - iOS: Use the Camera app
   - Android: Use the Expo Go app

#### Option B: iOS Simulator (Mac only)

```bash
npm run ios
```

#### Option C: Android Emulator

```bash
npm run android
```

Make sure you have Android Studio installed and an emulator configured.

#### Option D: Web Browser

```bash
npm run web
```

## 📱 App Features

### Dashboard
- View application statistics
- Quick actions to access all features
- Recent activity timeline

### Schools
- Browse 10+ top Indian engineering colleges
- Filter by type (IIT, NIT, IIIT, Private)
- Search functionality
- View college details, rankings, and placements

### Career Guidance
- Career roadmaps (IIT Engineering, Software Engineer, Pilot, MBA)
- Upcoming exam schedules (JEE Main, JEE Advanced, BITSAT)
- Study resources and mentorship

### Documents
- Upload and manage application documents
- Track verification status
- Download and share documents

### Deadlines
- Track all application deadlines
- Priority-based sorting (High, Medium, Low)
- Visual countdown timers
- Summary cards for urgent tasks

## 🎨 Design System

The app follows an Apple-inspired minimal design:
- **Colors**: Blue (#3B82F6), Gray shades, Black, White
- **Typography**: Clean, readable fonts
- **Icons**: Lucide React Native icons
- **UI**: Glassmorphic cards, rounded corners, smooth animations

## 🔧 Development Tips

### Hot Reload
Changes to your code will automatically reload in the app. No need to rebuild!

### Debugging
- Shake your device to open the developer menu
- Enable "Debug Remote JS" to use Chrome DevTools
- Check the terminal for error logs

### Adding New Screens
1. Create a new file in `src/screens/`
2. Import it in `src/navigation/AppNavigator.tsx`
3. Add it to the Tab Navigator

### Customizing Colors
Edit the color constants in each screen's StyleSheet to match your brand.

## 📦 Building for Production

### Create Expo Account
```bash
expo login
```

### Build for iOS
```bash
eas build --platform ios
```

### Build for Android
```bash
eas build --platform android
```

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Metro bundler issues
```bash
npm start --clear
```

### iOS Simulator not found
Make sure Xcode is installed and configured properly.

### Android emulator not starting
Check that Android Studio is installed and ANDROID_HOME is set.

## 📚 Next Steps

1. **Customize** the app with your branding
2. **Add** real API integrations
3. **Implement** push notifications
4. **Test** on multiple devices
5. **Deploy** to App Store and Play Store

## 🤝 Need Help?

- Check the [React Native docs](https://reactnative.dev/)
- Browse [Expo documentation](https://docs.expo.dev/)
- Review [React Navigation guides](https://reactnavigation.org/)

---

Happy coding! 🎉
