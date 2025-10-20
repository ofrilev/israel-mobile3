import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

// React Native compatible event system for countdown timer
type EventCallback = (data?: any) => void;

class CountdownEventEmitter {
  private listeners: { [key: string]: EventCallback[] } = {};

  emit(eventType: string, data?: any) {
    const callbacks = this.listeners[eventType] || [];
    callbacks.forEach(callback => callback(data));
  }

  addEventListener(eventType: string, callback: EventCallback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  removeEventListener(eventType: string, callback: EventCallback) {
    if (!this.listeners[eventType]) return;
    this.listeners[eventType] = this.listeners[eventType].filter(
      cb => cb !== callback
    );
  }
}

export const CountdownEvents = {
  TIMER_FINISHED: 'TIMER_FINISHED',
  emitter: new CountdownEventEmitter(),

  emit: (eventType: string, data?: any) => {
    CountdownEvents.emitter.emit(eventType, data);
  },

  addEventListener: (eventType: string, callback: EventCallback) => {
    CountdownEvents.emitter.addEventListener(eventType, callback);
  },

  removeEventListener: (eventType: string, callback: EventCallback) => {
    CountdownEvents.emitter.removeEventListener(eventType, callback);
  },
};

/**
 * useCountdown - runs a countdown timer starting from `initialSeconds`
 * and stops automatically when reaching 0. Emits TIMER_FINISHED event when done.
 */
export function useCountdown(initialSeconds: number = 45) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Clear any running interval on mount
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          // Emit event when timer reaches zero
          CountdownEvents.emit(CountdownEvents.TIMER_FINISHED, {
            message: 'Time is up!',
            timestamp: Date.now(),
          });
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

  return { reset, secondsLeft, addFiveSeconds };
}
