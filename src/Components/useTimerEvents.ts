import { useEffect, useState } from 'react';
import { CountdownEvents } from './useCountDown';

export const useTimerEvents = () => {
  const [showGhostModal, setShowGhostModal] = useState(false);
  const [timerMessage, setTimerMessage] = useState('');

  // Listen for countdown timer events
  useEffect(() => {
    const handleTimerFinished = (data: any) => {
      const { message } = data;
      setTimerMessage(message);
      setShowGhostModal(true);
    };

    CountdownEvents.addEventListener(
      CountdownEvents.TIMER_FINISHED,
      handleTimerFinished
    );

    return () => {
      CountdownEvents.removeEventListener(
        CountdownEvents.TIMER_FINISHED,
        handleTimerFinished
      );
    };
  }, []);

  const handleCloseModal = () => {
    setShowGhostModal(false);
    setTimerMessage('');
  };

  return {
    showGhostModal,
    timerMessage,
    handleCloseModal,
  };
};
