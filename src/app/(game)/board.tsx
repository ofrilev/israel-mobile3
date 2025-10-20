
import React from "react";
import { Text, View } from "react-native";
import { useGameBoard } from "../../../src/Components/useGameBoard";
import { useTimerEvents } from "../../../src/Components/useTimerEvents";
import { GhostModalContent } from "../../../src/Components/GhostModalContent";
import { IsraelOnlyMap } from "../../../src/maps/IsraeliMap.Native";
import GhostModal from "../../../src/Components/animations/GhostModal";
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
            style={{ flex: 1 }}
        >  
            {/* Stats Display - positioned absolutely in top right */}
            <StatsDisplay />
            
            <View style={{ 
                flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                paddingHorizontal: 16,
                paddingTop: 60 // Add top padding to avoid stats overlap
            }}>
                <Text style={{ 
                    fontSize: 32, 
                    fontWeight: 'bold', 
                    marginBottom: 16,
                    color: '#1F2937'
                }}>{gamePhase}</Text>
                
                <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 16, 
                    marginBottom: 16 
                }}>
                    <View style={{ 
                        borderWidth: 2, 
                        borderColor: '#1F2937', 
                        borderRadius: 8, 
                        padding: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }}>
                        <Text style={{ 
                            fontSize: 20, 
                            fontWeight: 'bold',
                            color: '#1F2937'
                        }}>{currentPlace?.label}</Text>
                    </View>
                </View>
                
                <View style={{ 
                    width: "100%", 
                    height: 400, 
                    borderRadius: 16,
                    overflow: 'hidden',
                    backgroundColor: 'transparent'
                }}>
                    <IsraelOnlyMap 
                        onMapClick={onMapClick} 
                        currentCityPoint={currentPlace?.point || { lat: 0, lng: 0 }}
                        mapRef={mapRef as React.RefObject<MapView>}
                    />
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