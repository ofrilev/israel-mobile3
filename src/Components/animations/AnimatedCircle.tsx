import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0–100
  duration?: number;
  children?: React.ReactNode;
};

const  AnimatedCircularProgress = ({
  size = 150,
  strokeWidth = 15,
  progress,
  duration = 800,
  children,
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 🌀 Hold last visual progress smoothly
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    // Animate from current value → new target
    animatedProgress.value = withTiming(progress, {
      duration: Math.max(400, duration),
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (circumference * animatedProgress.value) / 100;
    return { strokeDashoffset };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="fillGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#A7C7E7" />
            <Stop offset="100%" stopColor="#E3F2FD" />
          </LinearGradient>
        </Defs>

        {/* Grey-white hollow ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(200,200,200,0.35)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated progress ring */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#fillGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // start from top
        />
      </Svg>

      {/* Center content */}
       <View style={styles.centerContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default React.memo(AnimatedCircularProgress);
