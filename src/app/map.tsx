import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function MapScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar style="dark" />
      
      {/* Map Placeholder - Works in Expo Go */}
      <View className="flex-1 bg-blue-100 items-center justify-center">
        {/* Simulated Map Pins */}
        <View className="absolute top-32 left-20">
          <View className="bg-red-500 w-10 h-10 rounded-full border-4 border-white shadow-lg items-center justify-center">
            <Text className="text-white text-sm">📍</Text>
          </View>
        </View>
        
        <View className="absolute top-48 right-24">
          <View className="bg-green-500 w-8 h-8 rounded-full border-3 border-white shadow-lg items-center justify-center">
            <Text className="text-white text-xs">📍</Text>
          </View>
        </View>
        
        <View className="absolute bottom-40 left-32">
          <View className="bg-purple-500 w-12 h-12 rounded-full border-4 border-white shadow-lg items-center justify-center">
            <Text className="text-white text-lg">📍</Text>
          </View>
        </View>

        {/* Map Grid Lines */}
        <View className="absolute inset-0 opacity-20">
          <View className="h-full w-px bg-gray-400 absolute left-1/4" />
          <View className="h-full w-px bg-gray-400 absolute left-2/4" />
          <View className="h-full w-px bg-gray-400 absolute left-3/4" />
          <View className="w-full h-px bg-gray-400 absolute top-1/4" />
          <View className="w-full h-px bg-gray-400 absolute top-2/4" />
          <View className="w-full h-px bg-gray-400 absolute top-3/4" />
        </View>
        
        {/* Center Text */}
        <View className="bg-white rounded-2xl p-6 shadow-xl m-4">
          <Text className="text-2xl text-center mb-2">🗺️</Text>
          <Text className="text-lg font-bold text-gray-800 text-center mb-2">
            Map View (Expo Go Compatible)
          </Text>
          <Text className="text-gray-600 text-center text-sm">
            This is a styled placeholder. MapLibre GL requires a development build.
          </Text>
          <View className="bg-blue-50 rounded-lg p-3 mt-3">
            <Text className="text-blue-800 text-xs text-center">
              Run: npx expo prebuild{'\n'}Then: npx expo run:ios
            </Text>
          </View>
        </View>
      </View>

      {/* Info Overlay - NativeWind Styles Working! */}
      <View className="absolute top-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl">
        <Text className="text-xl font-bold text-gray-800 mb-1">
          Map Screen 🗺️
        </Text>
        <Text className="text-gray-600 text-sm">
          NativeWind styling works perfectly in Expo Go!
        </Text>
      </View>

      {/* Control Panel */}
      <View className="absolute bottom-8 left-4 right-4 bg-white rounded-2xl p-4 shadow-2xl">
        <View className="flex-row items-center mb-3">
          <View className="bg-blue-500 w-3 h-3 rounded-full mr-2" />
          <Text className="text-gray-700 font-semibold">Location: San Francisco</Text>
        </View>
        
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-blue-500 rounded-full py-3 px-6 active:scale-95"
        >
          <Text className="text-white text-center font-bold">
            ← Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

