import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0–100
  duration?: number;
  children?: React.ReactNode;
  // Timer-specific props
  timerSeconds?: number;
  showTimer?: boolean;
};

const CircularProgressTimer = ({
  size = 100,
  strokeWidth = 15,
  progress,
  duration = 800,
  children,
  timerSeconds,
  showTimer = false,
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 🌀 Hold last visual progress smoothly
  const animatedProgress = useSharedValue(0);

  // Timer state and animation
  const [count, setCount] = useState(timerSeconds || 0);
  const scale = useSharedValue(1);

  // Responsive timer sizing
  const timerSize = size * 0.4 + 10; // 40% of circle size + 10 pixels
  const fontSize = timerSize * 1.4;

  useEffect(() => {
    // COMMENTED OUT: Animation to test re-render behavior
    // Only trigger animation if the value actually changes
    // if (animatedProgress.value !== progress) {
    //   animatedProgress.value = withTiming(progress, {
    //     duration: Math.max(400, duration),
    //     easing: Easing.out(Easing.cubic),
    //   });
    // }

    // Direct assignment without animation for testing
    animatedProgress.value = progress;
  }, [progress]);

  // Timer countdown effect
  useEffect(() => {
    if (showTimer && timerSeconds !== undefined) {
      setCount(timerSeconds);
    }
  }, [timerSeconds, showTimer]);

  useEffect(() => {
    if (showTimer && count > 0) {
      const timer = setTimeout(() => {
        // COMMENTED OUT: Scale animation to test re-render behavior
        // scale.value = 1.3;
        // setTimeout(() => (scale.value = withTiming(1, { duration: 300 })), 50);
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, showTimer]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (circumference * animatedProgress.value) / 100;
    return { strokeDashoffset };
  });

  const animatedTimerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="fillGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#A7C7E7" />
            <Stop offset="100%" stopColor="#E3F2FD" />
            <Stop offset="40%" stopColor="#81D4FA" />
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
      <View style={styles.centerContent}>
        {showTimer ? (
          <Animated.View style={[styles.timerContainer, animatedTimerStyle]}>
            <Svg height={timerSize} width={timerSize} viewBox="0 0 100 100">
              <Defs>
                <LinearGradient
                  id="timerGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#4A90E2" />
                  <Stop offset="100%" stopColor="#607D8B" />
                </LinearGradient>
              </Defs>
              <SvgText
                x="50%"
                y="60%"
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight="bold"
                fill="url(#timerGradient)"
                stroke="#00FF99"
                strokeWidth="1"
              >
                {count}
              </SvgText>
            </Svg>
          </Animated.View>
        ) : (
          children
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10, // Android shadow
  },
  centerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CircularProgressTimer;
