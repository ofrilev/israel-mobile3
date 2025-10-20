import { useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import MapView from 'react-native-maps';
import { calculateDistance, calculateScore } from './game';
import { useGame } from './useGame';
import { useStats } from './useStats';
import { GamePhase, Point } from '../@types';
import { GameState } from '../Classes/GameState';

export const useGameBoard = () => {
  const { gamePhase } = useLocalSearchParams<{ gamePhase: GamePhase }>();
  const gameState = GameState.getInstance(gamePhase || GamePhase.CITIES);
  const { currentPlace, pickPlace, totalScore, currentScore, updateScore } =
    useGame(gameState);
  const { StatsDisplay, updateTotalScore } = useStats(gameState);
  const mapRef = useRef<MapView | null>(null);

  // Get progression info with state to trigger re-renders
  const [progressionInfo, setProgressionInfo] = useState(
    gameState.getProgressionInfo()
  );

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
    }, 500); // This matches the total time of markers display (500ms delay + 2000ms show time)
  };

  return {
    gamePhase,
    gameState,
    currentPlace,
    totalScore,
    currentScore,
    progressionInfo,
    mapRef,
    onMapClick,
    StatsDisplay,
  };
};
