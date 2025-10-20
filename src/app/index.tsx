import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { GamePhase } from '../@types';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const handleStartGame = () => {
    router.navigate({
      pathname: '/(game)/board' as any,
      params: { gamePhase: GamePhase.CITIES },
    });
  };

  const handleOpenMap = () => {
    router.navigate('/(utilities)/map' as any);
  };

  const handleOpenTest = () => {
    router.navigate('/(utilities)/test' as any);
  };
  return (
    <LinearGradient
      colors={['#4FC3F7', '#E0F7FA', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 items-center justify-center"
    >
      <View className="flex-1 justify-center items-center p-8">
        {/* Main Title */}
        <View className="mb-12 items-center">
          <Text className="text-4xl font-bold text-gray-800 mb-2">🇮🇱</Text>
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Israel Geography
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            Test your knowledge of Israeli cities, mountains, and landmarks
          </Text>
        </View>

        {/* Main Game Button */}
        <Pressable
          onPress={handleStartGame}
          className="bg-blue-500 px-8 py-4 rounded-2xl mb-6 shadow-lg active:scale-95"
        >
          <Text className="text-white text-2xl font-bold text-center">
            🎮 Start Game
          </Text>
        </Pressable>

        {/* Utility Buttons */}
        <View className="flex-row gap-4">
          <Pressable
            onPress={handleOpenMap}
            className="bg-purple-500 px-6 py-3 rounded-xl shadow-md active:scale-95"
          >
            <Text className="text-white text-lg font-semibold">
              🗺️ Map Demo
            </Text>
          </Pressable>

          <Pressable
            onPress={handleOpenTest}
            className="bg-green-500 px-6 py-3 rounded-xl shadow-md active:scale-95"
          >
            <Text className="text-white text-lg font-semibold">
              🧪 Style Test
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View className="absolute bottom-8">
          <Text className="text-gray-500 text-sm text-center">
            Explore the beautiful geography of Israel
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
