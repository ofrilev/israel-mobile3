import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { GamePhase } from "../@types";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient
    colors={["#4FC3F7", "#E0F7FA", "#FFFFFF"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    className="flex-1 items-center justify-center"
  >  
    <View className="flex-1 justify-center items-center">
      <Pressable onPress={handleStartGame} >
        <Text className="text-2xl font-bold">Start Game</Text>
      </Pressable>
      <Pressable onPress={handleStartMap} >
          <Text className="text-2xl font-bold">Map</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
