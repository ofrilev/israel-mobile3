import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { LastScore } from "../../src/@types";
import { GameState } from "../Classes/GameState";
import { useFloatingPoint } from "./animations/useFloatingPoint";
import { useCountdown } from "./useCountDown";
export const useStats = (gameState: GameState) => {
    const [bonusPoints, setBonusPoints] = useState(0);
    const [bonusTimeProgress, setBonusTimeProgress] = useState(0);
    const [lastScoreTime, setLastScoreTime] = useState<LastScore | undefined>(undefined);
    const [isProgressReset, setIsProgressReset] = useState(false);
    // const [scoreComboTrack, setScoreComboTrack] = useState<number>(0);
    const { reset, TimerDisplay, addFiveSeconds } = useCountdown();
    const {  FloatingPoints: PlusFiveSeconds, triggerFloatingPoint: triggerPlusFiveSeconds } = useFloatingPoint("score",undefined,1500);
    const {  FloatingPoints: SpeedBonus, triggerFloatingPoint:  triggerSpeedBonus } = useFloatingPoint("speedBonus",undefined,900);
    const {  FloatingPoints: Score, triggerFloatingPoint:  triggerScore } = useFloatingPoint("score",undefined,900);
    const updateTotalScore = (score: number) => {
      let timeBonus = 0;
      if(lastScoreTime){
        const secondsSinceLastScore = (Date.now() - lastScoreTime.time) / 1000; 
        if(secondsSinceLastScore < 5){
          timeBonus = 45;
          triggerSpeedBonus();
        }
      }
      if(score === 0) {
        setBonusPoints(0);
        setLastScoreTime(undefined)
        return;
      }
      // Only handle bonus points here since actual score is managed by GameState
      // const newBonusPoints = bonusPoints + 1;
      setLastScoreTime({time: Date.now(), score: score});
      addBonusTimeProgress();
      // setBonusPoints(newBonusPoints);
      const finalScore = score + timeBonus;
      triggerScore(finalScore.toString());
      return finalScore;
    };
   
    const addBonusTimeProgress = () => {      
        setBonusTimeProgress((prev) => prev + 1 );
        return;
    };
    
        const BonusTimeProgressDisplay : React.FC<{ progress: number }> = ({ progress }) => {
            // Clamp progress between 0–100 for safety
            const clamped = progress / 6;
            
            return (
              <View className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <View
                  className="bg-yellow-500 h-full"
                  style={{ width: `${clamped * 100}%` }}
                />
              </View>
            );
          };
          useEffect(() => {
            //8 is the maximux
            if(bonusTimeProgress >= 5) {
              addFiveSeconds();
              triggerPlusFiveSeconds();
              setBonusTimeProgress(0);
              setIsProgressReset(true);
              setTimeout(() => {
                setIsProgressReset(false);
              }, 1000);
            }
          }, [bonusTimeProgress])
         
    const StatsDisplay = () => {
      const totalScore = gameState.getTotalScore();
      const currentScore = gameState.getCurrentScore();
      
      return (
        <View className="flex w-1/2 flex-row gap-4 items-center justify-center">
          <View className="flex flex-col gap-2 items-center justify-center">
            <SpeedBonus />
            <Text className="text-2xl font-bold text-black-600">ניקוד:</Text>
            <Text className="text-2xl font-bold text-yellow-600">{totalScore}</Text>
            <Score />
          </View>
          <View className="flex flex-col gap-2 items-center justify-center bg-green-100 rounded-lg p-2">
            <PlusFiveSeconds />
            <TimerDisplay />
            <BonusTimeProgressDisplay progress={bonusTimeProgress} />
          </View>
        </View>
      )
    }
    return {StatsDisplay, updateTotalScore }
}