import React from 'react';
import { Text, View } from 'react-native';
import { GamePhase } from '../@types';

interface GhostModalContentProps {
  gamePhase: GamePhase;
  timerMessage: string;
  totalScore: number;
  onClose: () => void;
}

const getPhaseSpecificContent = (gamePhase: GamePhase) => {
  switch (gamePhase) {
    case GamePhase.CITIES:
      return {
        emoji: '🏙️',
        title: 'Cities Round Complete!',
        description: "Time's up for the cities challenge!",
        encouragement: "Great job exploring Israel's cities!",
        buttonText: 'Continue to Mountains',
      };
    case GamePhase.MOUNTAINS:
      return {
        emoji: '⛰️',
        title: 'Mountains Round Complete!',
        description: "Time's up for the mountains challenge!",
        encouragement: "You've conquered the peaks!",
        buttonText: 'Continue to Famous Places',
      };
    case GamePhase.FAMOUS_PLACES:
      return {
        emoji: '🏛️',
        title: 'Famous Places Round Complete!',
        description: "Time's up for the famous places challenge!",
        encouragement: "Amazing knowledge of Israel's landmarks!",
        buttonText: 'View Final Results',
      };
    default:
      return {
        emoji: '⏰',
        title: 'Round Complete!',
        description: "Time's up!",
        encouragement: 'Keep up the great work!',
        buttonText: 'Continue Game',
      };
  }
};

export const GhostModalContent: React.FC<GhostModalContentProps> = ({
  gamePhase,
  timerMessage,
  totalScore,
  onClose,
}) => {
  const content = getPhaseSpecificContent(gamePhase);

  return (
    <View className="items-center justify-center p-6">
      {/* Phase-specific emoji and title */}
      <Text className="text-6xl mb-4">{content.emoji}</Text>
      <Text className="text-2xl font-bold text-red-600 mb-2 text-center">
        {content.title}
      </Text>

      {/* Timer message */}
      <Text className="text-lg text-gray-700 text-center mb-3">
        {content.description}
      </Text>

      {/* Score display */}
      <View className="bg-blue-50 p-4 rounded-lg mb-4 w-full">
        <Text className="text-center text-lg font-semibold text-blue-800 mb-1">
          Your Score
        </Text>
        <Text className="text-center text-3xl font-bold text-blue-600">
          {totalScore} points
        </Text>
      </View>

      {/* Encouragement message */}
      <Text className="text-base text-gray-600 text-center mb-6">
        {content.encouragement}
      </Text>

      {/* Action button */}
      <View className="bg-blue-500 px-8 py-4 rounded-lg w-full">
        <Text className="text-white font-bold text-center text-lg">
          {content.buttonText}
        </Text>
      </View>

      {/* Phase indicator */}
      <Text className="text-sm text-gray-400 mt-4 text-center">
        Phase: {gamePhase.replace('_', ' ').toUpperCase()}
      </Text>
    </View>
  );
};
