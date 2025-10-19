import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { GamePhase } from "../@types";

export default function Index() {
  const handleStartGame = () => {
    router.navigate({
      pathname: "/Board" as any,
      params: { gamePhase: GamePhase.CITIES }
    });
  };
  const handleStartMap = () => {
    router.navigate({
      pathname: "/CustomGeoJSONMap" as any,
    });
  };
  return (
    <View className="flex-1 justify-center items-center">
      <Pressable onPress={handleStartGame} >
        <Text className="text-2xl font-bold">Start Game</Text>
      </Pressable>
      <Pressable onPress={handleStartMap} >
        <Text className="text-2xl font-bold">Map</Text>
      </Pressable>
    </View>
  );
}
