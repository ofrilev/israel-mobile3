import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  FloatingPointConfig,
  FloatingPointsProps,
  FloatingPointVariant,
} from '../../../src/@types';

const variants: Record<FloatingPointVariant, FloatingPointConfig> = {
  default: {
    duration: 2,
    initialY: 20,
    animateY: -20,
    textColor: 'text-yellow-500',
    fontSize: 'text-3xl',
  },
  speedBonus: {
    duration: 1,
    initialY: 0,
    animateY: 10,
    textColor: 'text-green-200',
    fontSize: 'text-xl',
    customText: '🔥 speed bonus',
  },
  score: {
    duration: 2,
    initialY: 20,
    animateY: -20,
    textColor: 'text-yellow-500',
    fontSize: 'text-3md',
  },
};

const FloatingPointsComponent: React.FC<
  FloatingPointsProps & { variant: FloatingPointVariant }
> = ({ trigger, text, variant }) => {
  const config = variants[variant];
  const displayText = config.customText || text;

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(config.initialY || 20);

  useEffect(() => {
    if (trigger) {
      opacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(0, { duration: (config.duration || 2) * 1000 - 200 })
      );
      translateY.value = withTiming(config.animateY || -20, {
        duration: (config.duration || 2) * 1000,
        easing: Easing.out(Easing.ease),
      });
    } else {
      opacity.value = 0;
      translateY.value = config.initialY || 20;
    }
  }, [trigger]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const textColorClass = config.textColor?.replace('text-', '') || 'yellow-500';
  const fontSizeMap: Record<string, number> = {
    'text-xl': 20,
    'text-2xl': 24,
    'text-3xl': 30,
    'text-3md': 28,
  };
  const fontSize = fontSizeMap[config.fontSize || 'text-3xl'] || 30;

  if (!trigger) return null;

  return (
    <View className="absolute w-full items-center" style={{ top: 0 }}>
      <Animated.View style={animatedStyle}>
        <Text className={`${config.textColor} font-bold`} style={{ fontSize }}>
          {variant === 'score' ? `${displayText}+` : displayText}
        </Text>
      </Animated.View>
    </View>
  );
};

export const useFloatingPoint = (
  variant: FloatingPointVariant = 'default',
  defaultText = '+5',
  timeout: number = 1000
) => {
  const [trigger, setTrigger] = useState(false);
  const [currentText, setCurrentText] = useState(defaultText);

  const triggerFloatingPoint = (text?: string | number) => {
    if (text !== undefined) {
      setCurrentText(text.toString());
    } else {
      setCurrentText(defaultText);
    }
    setTrigger(true);
    setTimeout(() => {
      setTrigger(false);
    }, timeout);
  };

  const FloatingPoints = () => (
    <FloatingPointsComponent
      trigger={trigger}
      text={currentText}
      variant={variant}
    />
  );

  return { FloatingPoints, triggerFloatingPoint };
};
