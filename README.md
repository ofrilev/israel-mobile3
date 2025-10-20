# Israel Mobile Geography Game 🇮🇱

A React Native geography game built with Expo SDK 54, featuring interactive maps of Israel where users can test their knowledge of cities, mountains, and famous places.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd israel-mobile3

# Install dependencies
npm install

# Start the development server
npm start
```

## 📱 Development Commands

### Basic Commands

```bash
# Start Expo development server
npm start
# or
npx expo start

# Start with cache cleared
npx expo start --clear

# Start with tunnel (for testing on physical devices)
npx expo start --tunnel
```

### Platform-Specific Development

```bash
# Run on iOS Simulator
npm run ios
# or
npx expo run:ios

# Run on Android Emulator
npm run android
# or
npx expo run:android

# Run on web browser
npx expo start --web
```

### Code Formatting

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check

# Format only src directory
npm run format:src

# Format specific file
npm run format:file <filename>
```

## 🏗️ Building for Production

### Prerequisites for Building

1. **For iOS**:
   - macOS with Xcode installed
   - Apple Developer Account (for App Store distribution)
   - iOS Simulator or physical iOS device

2. **For Android**:
   - Android Studio with Android SDK
   - Java Development Kit (JDK)
   - Android device or emulator

### Build Commands

#### Development Builds

```bash
# Create development build for iOS
npx expo run:ios --configuration Debug

# Create development build for Android
npx expo run:android --variant debug
```

#### Production Builds

```bash
# Build for iOS (requires macOS)
npx expo run:ios --configuration Release

# Build for Android
npx expo run:android --variant release

# Build APK for Android
cd android && ./gradlew assembleRelease

# Build AAB (Android App Bundle) for Play Store
cd android && ./gradlew bundleRelease
```

#### Using EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
npx eas build:configure

# Build for all platforms
npx eas build --platform all

# Build for specific platform
npx eas build --platform ios
npx eas build --platform android

# Submit to app stores
npx eas submit --platform ios
npx eas submit --platform android
```

## 🏗️ Project Architecture

### Directory Structure

```
israel-mobile3/
├── src/
│   ├── app/                    # Expo Router pages
│   │   ├── (game)/            # Game-related screens
│   │   ├── (utilities)/       # Utility screens
│   │   └── _layout.tsx        # Root layout
│   ├── Components/            # Reusable components
│   │   ├── animations/        # Animation components
│   │   ├── useStats.tsx       # Statistics hook
│   │   ├── useGameBoard.ts    # Game board logic
│   │   └── useCountDown.tsx   # Timer functionality
│   ├── Classes/               # Game logic classes
│   ├── maps/                  # Map components and config
│   ├── consts/                # Constants and data
│   └── @types.ts             # TypeScript definitions
├── assets/                    # Static assets
├── .vscode/                   # VS Code configuration
└── Configuration files
```

## 🧩 Component Documentation

### Core Components

#### `CircularProgressTimer`

**Location**: `src/Components/animations/AnimatedCircle.tsx`

A unified component that combines circular progress indication with timer display.

```typescript
<CircularProgressTimer
  progress={progressValue}      // 0-100 progress value
  size={120}                   // Circle size in pixels
  strokeWidth={15}             // Progress ring thickness
  showTimer={true}             // Enable timer display
  timerSeconds={45}            // Timer countdown value
/>
```

**Features**:

- Animated progress ring with gradient
- Integrated countdown timer
- Responsive sizing
- Optimized re-render prevention

#### `IsraelOnlyMap`

**Location**: `src/maps/IsraeliMap.Native.tsx`

Interactive map component using WebView with MapLibre GL.

```typescript
<IsraelOnlyMap
  onMapClick={handleMapClick}
  currentCityPoint={cityLocation}
  mapRef={mapReference}
/>
```

**Features**:

- Interactive map of Israel
- Click handling for user guesses
- Dynamic marker placement
- Transparent background support

#### `GhostModal`

**Location**: `src/Components/animations/GhostModal.tsx`

Animated modal for game events and notifications.

```typescript
<GhostModal visible={showModal} onClose={handleClose}>
  <GhostModalContent gamePhase={phase} />
</GhostModal>
```

### Custom Hooks

#### `useStats(gameState)`

Manages game statistics, scoring, and timer display.

#### `useGameBoard()`

Handles main game logic, place selection, and map interactions.

#### `useCountdown(initialSeconds)`

Provides countdown timer functionality with event emission.

#### `useTimerEvents()`

Manages timer-related events and modal state.

### Game Classes

#### `GameState`

Singleton class managing overall game state and progression.

#### `Place`

Base class for game locations (cities, mountains, famous places).

#### `Cities`, `Mountains`, `FamousPlaces`

Specific implementations for different game phases.

## 🎮 Game Flow

1. **Start Screen**: User selects game mode
2. **Game Board**: Interactive map with timer and scoring
3. **User Interaction**: Click on map to guess location
4. **Feedback**: Visual markers show user guess vs correct location
5. **Scoring**: Points calculated based on accuracy
6. **Progression**: Move through cities → mountains → famous places
7. **Completion**: Final score and statistics

## 🔧 Configuration Files

### Key Configuration

- **`app.config.js`**: Expo app configuration
- **`package.json`**: Dependencies and scripts
- **`.prettierrc`**: Code formatting rules
- **`tsconfig.json`**: TypeScript configuration
- **`.gitignore`**: Git ignore patterns
- **`.vscode/settings.json`**: VS Code project settings

### Environment Setup

The project uses:

- **Expo SDK 54**
- **React 19.1.0**
- **React Native 0.81.4**
- **TypeScript 5.9.2**
- **React Native Reanimated 4.1.1**

## ⚠️ Potential Issues & Solutions

### Version Compatibility Issues

#### React 19 Migration Issues

**Problem**: Components not rendering or hooks behaving unexpectedly.
**Solution**:

```bash
# Ensure all React-related packages are compatible
npm install @types/react@~19.1.10
```

#### React Native Reanimated 4.x Issues

**Problem**: Animations not working or app crashing.
**Solution**:

```bash
# Install required peer dependency
npm install react-native-worklets
```

#### Expo Router 6.x Navigation Issues

**Problem**: Navigation not working after upgrade.
**Solution**:

```typescript
// Use new navigation syntax
import { router } from 'expo-router';
router.navigate('/(game)/board');
```

### Build Issues

#### iOS Build Failures

**Problem**: Build fails on iOS with module resolution errors.
**Solution**:

```bash
# Clean iOS build
cd ios && rm -rf build/ && cd ..
npx expo run:ios --clear
```

#### Android Build Failures

**Problem**: Gradle build errors or dependency conflicts.
**Solution**:

```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
npx expo run:android --clear
```

#### Metro Bundle Issues

**Problem**: Metro bundler cache issues.
**Solution**:

```bash
# Clear Metro cache
npx expo start --clear
# or
npx react-native start --reset-cache
```

### Development Issues

#### TypeScript Errors

**Problem**: Module resolution or type errors.
**Solution**:

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update module resolution in tsconfig.json
"moduleResolution": "bundler"
```

#### Dependency Conflicts

**Problem**: Peer dependency warnings or conflicts.
**Solution**:

```bash
# Check for issues
npx expo-doctor

# Fix dependency issues
npx expo install --fix

# Install with legacy peer deps if needed
npm install --legacy-peer-deps
```

#### WebView Issues

**Problem**: Map not displaying or WebView crashes.
**Solution**:

```typescript
// Ensure WebView has proper background
<WebView
  backgroundColor="rgba(255, 255, 255, 0.01)"
  // ... other props
/>
```

### Performance Issues

#### Re-render Problems

**Problem**: Components re-rendering too frequently.
**Solution**: The project uses optimized components with `React.memo` and conditional animations.

#### Animation Performance

**Problem**: Animations stuttering or causing performance issues.
**Solution**: Animations are optimized with `useSharedValue` and conditional updates.

## 🧪 Testing

### Running Tests

```bash
# Type checking
npx tsc --noEmit

# Lint checking (if configured)
npx eslint src/

# Format checking
npm run format:check
```

### Device Testing

```bash
# Test on iOS Simulator
npx expo run:ios

# Test on Android Emulator
npx expo run:android

# Test on physical device (requires Expo Go app)
npx expo start --tunnel
```

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://expo.github.io/router/)
- [React Native Reanimated Documentation](https://docs.swmansion.com/react-native-reanimated/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run formatting: `npm run format`
5. Test your changes
6. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Expo SDK 54, React 19, and React Native 0.81**
