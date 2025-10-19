
import React from "react";
import { Text, View } from "react-native";
import { useGameBoard } from "../../src/Components/useGameBoard";
import { useTimerEvents } from "../../src/Components/useTimerEvents";
import { GhostModalContent } from "../../src/Components/GhostModalContent";
import { IsraelOnlyMap } from "../../src/maps/IsraeliMap.Native";
import GhostModal from "../../src/Components/animations/GhostModal";
import MapView from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";

export default function Board() {
    // Use modular hooks for clean separation of concerns
    const {
        gamePhase,
        gameState,
        currentPlace,
        totalScore,
        currentScore,
        progressionInfo,
        mapRef,
        onMapClick,
        StatsDisplay
    } = useGameBoard();

    const {
        showGhostModal,
        timerMessage,
        handleCloseModal
    } = useTimerEvents();

    return (
        <LinearGradient
    colors={["#4FC3F7", "#E0F7FA", "#FFFFFF"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    className="flex-1 items-center justify-center"
  >  
        <View className="flex flex-row items-center justify-center gap-4">
            <View className="h-100px flex flex-col items-center justify-center">
                <Text className="text-4xl font-bold">{gamePhase}</Text>
                <StatsDisplay />     
                <View className="flex flex-row items-center justify-center gap-4">
                    <View className="flex border-2 border-black-600 rounded-lg p-2 flex-row items-center justify-center gap-4">
                    <Text className="text-2xl font-bold">{currentPlace?.label}</Text>
                    </View>
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
        
        {/* Ghost Modal - appears when timer reaches zero with phase-specific content */}
        <GhostModal 
            visible={showGhostModal} 
            onClose={handleCloseModal}
        >
            <GhostModalContent
                gamePhase={gamePhase}
                timerMessage={timerMessage}
                totalScore={totalScore}
                onClose={handleCloseModal}
            />
        </GhostModal>
        </LinearGradient>
    );
}