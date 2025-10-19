module.exports = {
  expo: {
    name: "num3",
    slug: "num3",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      resizeMode: "contain",
      backgroundColor: "#3b82f6"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.num3.app"
    },
    android: {
      package: "com.num3.app"
    },
    plugins: [
      "expo-router",
      "expo-asset",
      "expo-font"
    ],
    scheme: "num3"
  }
};

