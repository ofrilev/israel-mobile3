import { useEffect, useMemo, useState } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { LastScore } from '../../src/@types';
import { GameState } from '../Classes/GameState';
import { useFloatingPoint } from './animations/useFloatingPoint';
import { useCountdown } from './useCountDown';
import CircularProgressTimer from './animations/AnimatedCircle';
import React from 'react';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const useStats = (gameState: GameState) => {
  const [bonusPoints, setBonusPoints] = useState(0);
  const [bonusTimeProgress, setBonusTimeProgress] = useState(0);
  const [lastScoreTime, setLastScoreTime] = useState<LastScore | undefined>(
    undefined
  );
  const [isProgressReset, setIsProgressReset] = useState(false);
  // const [scoreComboTrack, setScoreComboTrack] = useState<number>(0);
  const { reset, secondsLeft, addFiveSeconds } = useCountdown();

  const {
    FloatingPoints: PlusFiveSeconds,
    triggerFloatingPoint: triggerPlusFiveSeconds,
  } = useFloatingPoint('score', undefined, 1500);
  const {
    FloatingPoints: SpeedBonus,
    triggerFloatingPoint: triggerSpeedBonus,
  } = useFloatingPoint('speedBonus', undefined, 900);
  const { FloatingPoints: Score, triggerFloatingPoint: triggerScore } =
    useFloatingPoint('score', undefined, 900);
  const updateTotalScore = (score: number) => {
    let timeBonus = 0;
    if (lastScoreTime) {
      const secondsSinceLastScore = (Date.now() - lastScoreTime.time) / 1000;
      if (secondsSinceLastScore < 5) {
        timeBonus = 45;
        triggerSpeedBonus();
      }
    }
    if (score === 0) {
      setBonusPoints(0);
      setLastScoreTime(undefined);
      return;
    }
    // Only handle bonus points here since actual score is managed by GameState
    // const newBonusPoints = bonusPoints + 1;
    setLastScoreTime({ time: Date.now(), score: score });
    addBonusTimeProgress();
    // setBonusPoints(newBonusPoints);
    const finalScore = score + timeBonus;
    triggerScore(finalScore.toString());
    return finalScore;
  };

  const addBonusTimeProgress = () => {
    setBonusTimeProgress(prev => prev + 1);
    return;
  };
  const resetBonusTimeProgress = () => {
    setTimeout(() => {
      setBonusTimeProgress(0);
    }, 1000);
  };

  useEffect(() => {
    //8 is the maximux
    if (bonusTimeProgress >= 5) {
      addFiveSeconds();
      triggerPlusFiveSeconds();
      resetBonusTimeProgress();
      setIsProgressReset(true);
      setTimeout(() => {
        setIsProgressReset(false);
      }, 1000);
    }
  }, [bonusTimeProgress]);

  const StatsDisplay = () => {
    const totalScore = gameState.getTotalScore();
    const currentScore = gameState.getCurrentScore();

    const progressValue = useMemo(
      () => (bonusTimeProgress / 5) * 100,
      [bonusTimeProgress]
    );

    // Responsive sizing based on screen width
    const containerWidth = screenWidth * 0.45; // 45% of screen width
    const circleSize = Math.min(screenWidth * 0.18, 120); // 18% of screen width, max 120px
    const strokeWidth = circleSize * 0.12; // 12% of circle size
    const fontSize = {
      title: Math.min(screenWidth * 0.04, 18), // 4% of screen width, max 18px
      score: Math.min(screenWidth * 0.06, 28), // 6% of screen width, max 28px (increased)
    };

    return (
      <View
        style={{
          position: 'absolute',
          top: screenHeight * 0.06, // 6% from top (reduced)
          right: screenWidth * 0.02, // 2% from right
          width: containerWidth,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 16,
          padding: screenWidth * 0.02,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          zIndex: 1000, // Ensure it's on top but doesn't block map
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <SpeedBonus />
          <Text
            style={{
              fontSize: fontSize.title,
              fontWeight: 'bold',
              color: '#1F2937',
              textAlign: 'center',
            }}
          >
            ניקוד:
          </Text>
          <Text
            style={{
              fontSize: fontSize.score,
              fontWeight: '900', // Extra bold
              color: '#D97706',
              textAlign: 'center',
              textShadowColor: 'rgba(0, 0, 0, 0.3)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}
          >
            {totalScore}
          </Text>
          <Score />
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: screenWidth * 0.02,
          }}
        >
          <PlusFiveSeconds />
          <CircularProgressTimer
            progress={progressValue}
            size={circleSize}
            strokeWidth={strokeWidth}
            showTimer={true}
            timerSeconds={secondsLeft}
          />
        </View>
      </View>
    );
  };
  return { StatsDisplay, updateTotalScore };
};
