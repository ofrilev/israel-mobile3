import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import CountdownClock from "./animations/CountDown";

/**
 * useCountdown - runs a countdown timer starting from `initialSeconds`
 * and stops automatically when reaching 0.
 */
export function useCountdown(initialSeconds: number = 45) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Clear any running interval on mount
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [initialSeconds]);

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSecondsLeft(initialSeconds);
  };
  const addFiveSeconds = () => {
    setSecondsLeft(secondsLeft + 5);
  };
  const TimerDisplay = () => {
    return (
      <View className="h-4 w-48 flex flex-col items-center justify-center">
        <View className="flex flex-row items-center justify-center">
          {/* <PulsingClock size={20}  color="text-yellow-600" />  */}
          <CountdownClock start={secondsLeft}  />
          <Text className={`flex items-center justify-center text-2xl font-medium mb-4 ${secondsLeft < 10 ? 'text-red-600' : 'text-yellow-600'}`}>
            {secondsLeft}
          </Text>
        </View>
      </View>
    );
  }

  return {  reset, TimerDisplay, addFiveSeconds };
}
