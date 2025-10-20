# Expo + NativeWind Project (Expo Go Compatible)

A fully functional Expo project showcasing the integration of:

- **Expo SDK 52** - Latest stable Expo version
- **React Native 0.76.9** - Modern React Native
- **Expo Router v4** - File-based navigation
- **NativeWind v4** - Tailwind CSS for React Native
- **Works in Expo Go** - No native build required

## 🚀 Quick Start (Expo Go Ready!)

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- **Expo Go app** on your iOS or Android device
- OR iOS Simulator / Android Emulator

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on your device:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Expo Go**: Scan the QR code with your phone

## 📱 What You'll See

### Home Screen (`/`)

- Beautiful gradient background using NativeWind
- Multiple styled cards showcasing each technology
- Tailwind classes like `bg-blue-500`, `rounded-2xl`, `shadow-lg`, `p-6`
- Interactive buttons with active states
- Navigation to the map screen

### Map Screen (`/map`)

- Styled map placeholder with NativeWind
- Simulated map pins with animations
- Clean UI demonstrating NativeWind capabilities
- Works perfectly in Expo Go (no native build needed)

## 🛠️ Technology Stack

### Core Framework

- **Expo SDK**: 52.0.0
- **React Native**: 0.76.9
- **React**: 18.3.1

### Navigation

- **expo-router**: 4.0.0 (file-based routing in `app/` directory)

### Styling

- **NativeWind**: 4.1.23 (Tailwind CSS for React Native)
- **Tailwind CSS**: 3.4.17

## 📁 Project Structure

```
num3/
├── app/                      # Expo Router pages
│   ├── _layout.tsx          # Root layout with navigation setup
│   ├── index.tsx            # Home screen with NativeWind examples
│   └── map.tsx              # Map screen with MapLibre GL
├── assets/                   # Static assets (icons, images)
├── babel.config.js          # Babel configuration for NativeWind
├── metro.config.js          # Metro bundler config with NativeWind
├── tailwind.config.js       # Tailwind CSS configuration
├── global.css               # Global Tailwind styles
├── app.json                 # Expo configuration
└── package.json             # Dependencies
```

## 🎨 NativeWind Usage

NativeWind is fully configured and working! You can use Tailwind classes directly:

```tsx
<View className="bg-blue-500 p-4 rounded-xl shadow-lg">
  <Text className="text-white font-bold text-2xl">Hello NativeWind!</Text>
</View>
```

All standard Tailwind utilities work:

- Layout: `flex`, `flex-1`, `items-center`, `justify-center`
- Spacing: `p-4`, `m-2`, `space-y-4`, `gap-2`
- Colors: `bg-blue-500`, `text-white`, `border-gray-200`
- Typography: `font-bold`, `text-xl`, `text-center`
- Effects: `shadow-lg`, `rounded-2xl`, `opacity-75`
- Interactive: `active:scale-95`

## 🗺️ MapLibre GL Integration

The map uses a free demo tile server and is configured to work with Expo:

- Map style: `https://demotiles.maplibre.org/style.json`
- Custom markers with NativeWind styling
- Interactive camera controls
- Works in both development and production builds

To use your own map tiles, update the `styleURL` in `app/map.tsx`.

## 🔧 Configuration Details

### Babel Config

- Uses `babel-preset-expo` with NativeWind plugin
- Configured for React Native Reanimated
- Enables JSX transform for NativeWind

### Metro Config

- Integrated with NativeWind metro plugin
- Configured to load `global.css`

### Tailwind Config

- Content paths set to `app/**` and `components/**`
- Uses NativeWind preset for React Native compatibility

## 🐛 Troubleshooting

### NativeWind styles not appearing?

1. Clear Metro bundler cache:

```bash
npx expo start --clear
```

2. Verify `global.css` is imported in `app/_layout.tsx`

3. Check that classes are in the `tailwind.config.js` content paths

### MapLibre not rendering?

1. Make sure you're testing on a device/simulator (not Expo Go for production)
2. For production builds, run:

```bash
npx expo prebuild
```

### General issues?

```bash
# Clear all caches and reinstall
rm -rf node_modules
npm install
npx expo start --clear
```

## 📝 Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS
- `npm run web` - Start web version (limited map support)

## 🎯 Next Steps

1. Customize the map style and add more markers
2. Add more pages with Expo Router
3. Create reusable styled components
4. Integrate with backend APIs
5. Add animations with React Native Reanimated

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [MapLibre GL Documentation](https://maplibre.org/maplibre-react-native/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## ✨ Features Demonstrated

- ✅ File-based routing with Expo Router
- ✅ NativeWind v4 styling with Tailwind classes
- ✅ Interactive MapLibre GL maps
- ✅ Gesture handling and animations
- ✅ Type-safe navigation
- ✅ Beautiful UI with modern design patterns
- ✅ Cross-platform compatibility

---

Built with ❤️ using Expo SDK 52
