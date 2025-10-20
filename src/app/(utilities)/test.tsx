import { View, Text } from 'react-native';

// Simple test screen to verify NativeWind is working
// Navigate to /test to see this screen
export default function TestScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <View className="bg-white rounded-2xl p-8 shadow-lg">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          ✅ NativeWind Works!
        </Text>
        <Text className="text-gray-600">
          If you can see this styled card with:
        </Text>
        <View className="mt-4 gap-2">
          <Text className="text-gray-700">• Blue background</Text>
          <Text className="text-gray-700">• White card with shadow</Text>
          <Text className="text-gray-700">• Rounded corners</Text>
          <Text className="text-gray-700">• Proper spacing</Text>
        </View>
        <View className="mt-6 bg-green-100 p-4 rounded-xl">
          <Text className="text-green-800 font-bold text-center">
            Then NativeWind is 100% working! 🎉
          </Text>
        </View>
      </View>
    </View>
  );
}
