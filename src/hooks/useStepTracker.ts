import { useState, useEffect, useRef } from 'react';
import {
  STEP_INCREMENT_RATE,
  STEPS_PER_INCREMENT,
} from '../utils/gameConstants';

/**
 * Custom hook for automatically tracking steps
 * Steps increment automatically in the background to simulate walking
 * @param initialSteps - Starting step count
 * @returns [steps, addSteps, resetSteps] tuple
 */
export function useStepTracker(initialSteps: number = 0) {
  const [steps, setSteps] = useState(initialSteps);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Auto-increment steps in the background
    intervalRef.current = window.setInterval(() => {
      setSteps((prevSteps) => prevSteps + STEPS_PER_INCREMENT);
    }, STEP_INCREMENT_RATE);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const addSteps = (amount: number) => {
    setSteps((prevSteps) => prevSteps + amount);
  };

  const resetSteps = () => {
    setSteps(0);
  };

  return [steps, addSteps, resetSteps] as const;
}
