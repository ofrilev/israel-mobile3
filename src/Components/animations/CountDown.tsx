import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from "react-native-svg";

type CountdownClockProps = {
  start: number;
  onComplete?: () => void;
};

export default function CountdownClock({ start, onComplete }: CountdownClockProps) {
  const [count, setCount] = useState(start);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        // animate scale on each tick
        scale.value = 1.3;
        setTimeout(() => (scale.value = withTiming(1, { duration: 300 })), 50);
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [count]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Svg height="150" width="150" viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#00FF99" />
            <Stop offset="100%" stopColor="#007F0E" />
          </LinearGradient>
        </Defs>
        <SvgText
          x="50%"
          y="60%"
          textAnchor="middle"
          fontSize="80"
          fontWeight="bold"
          fill="url(#greenGradient)"
          stroke="#00FF99"
          strokeWidth="1"
        >
          {count}
        </SvgText>
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
