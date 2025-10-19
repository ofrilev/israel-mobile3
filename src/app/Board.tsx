
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { calculateDistance, calculateScore } from "../Components/game";
import { useGame } from "../../src/Components/useGame";
import { useStats } from "../../src/Components/useStats";
import { GamePhase, Point } from "../../src/@types";
import { GameState } from "../../src/Classes/GameState";
import { IsraelOnlyMap } from "../../src/maps/IsraeliMap.Native"
// import CustomGeoJSONMap from "./CustomGeoJSONMap";
import MapView from "react-native-maps";

export default function Board() {
    const { gamePhase } = useLocalSearchParams<{ gamePhase: GamePhase }>();
    const gameState = GameState.getInstance(gamePhase || GamePhase.CITIES);
    const { currentPlace, pickPlace, totalScore, currentScore, updateScore } = useGame(gameState);
    const { StatsDisplay, updateTotalScore } = useStats(gameState);
    const mapRef = useRef<MapView | null>(null);
    
    // Get progression info with state to trigger re-renders
    const [progressionInfo, setProgressionInfo] = useState(gameState.getProgressionInfo());

    const onMapClick = (userPoint: Point) => {
        const cityDim = currentPlace?.point;
        if (!cityDim || !mapRef.current) return;
        
        const userDim = userPoint;
        const distance = calculateDistance(cityDim, userDim);
        const score = calculateScore(distance);
        
        // Update score in game state and get the final score
        const finalScore = updateScore(score);
        
        // Update stats (bonus points, etc)
        updateTotalScore(finalScore);
        
        // Wait a bit before picking new city to allow markers to be shown
        setTimeout(() => {
            pickPlace();
            // Update progression info and remaining places after picking new city
            setProgressionInfo(gameState.getProgressionInfo());
        }, 2500); // This matches the total time of markers display (500ms delay + 2000ms show time)
    }

    return (
        <View className="flex flex-row items-center justify-center gap-4">
            <View className="h-100px flex flex-col items-center justify-center">
                <Text className="text-4xl font-bold">{gamePhase}</Text>
                <StatsDisplay />
                
                {/* Progression Indicator */}
                {progressionInfo && (
                    <View className="flex flex-col items-center gap-2 mb-4 p-4 bg-gray-100 rounded-lg">
                        <Text className="text-lg font-semibold text-blue-600">
                            📍 {progressionInfo.regionDisplayName}
                        </Text>
                        
                        {progressionInfo.isRoundRobinMode && (
                            <View className="flex items-center gap-2">
                                <Text className="text-sm font-medium">רצף נוכחי:</Text>
                                <Text className="text-lg font-bold text-green-600">
                                    {progressionInfo.consecutiveScores} ✓
                                </Text>
                            </View>
                        )}
                    </View>
                )}
                
                <View className="flex flex-row items-center justify-center gap-4">
                    <Text className="text-2xl font-bold">City: {currentPlace?.label}</Text>
                </View>
                <View style={{ width: "100%", height: 400 }}>
                    <IsraelOnlyMap 
                        onMapClick={onMapClick} 
                        currentCityPoint={currentPlace?.point || { lat: 0, lng: 0 }}
                        mapRef={mapRef as React.RefObject<MapView>}
                    />
                </View>
            </View>
        </View>
    );
}