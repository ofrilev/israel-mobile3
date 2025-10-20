module.exports = {
  expo: {
    name: 'israel-mobile3',
    slug: 'israel-mobile3',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      resizeMode: 'contain',
      backgroundColor: '#3b82f6',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.israelmobile3.app',
    },
    android: {
      package: 'com.israelmobile3.app',
    },
    plugins: ['expo-router', 'expo-asset', 'expo-font'],
    scheme: 'israel-mobile3',
  },
};
