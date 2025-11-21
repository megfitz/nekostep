import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getHeartProgresses } from '../../utils/gameConstants';
import './ProgressBar.css';

interface ProgressBarProps {
  totalEnergy: number;
  onHeartFilled?: () => void;
}

export function ProgressBar({ totalEnergy, onHeartFilled }: ProgressBarProps) {
  const heartProgresses = getHeartProgresses(totalEnergy);
  const [previousProgresses, setPreviousProgresses] = useState(heartProgresses);

  useEffect(() => {
    // Check if any heart just filled
    heartProgresses.forEach((progress, index) => {
      if (progress === 100 && previousProgresses[index] < 100) {
        onHeartFilled?.();
      }
    });

    setPreviousProgresses(heartProgresses);
  }, [heartProgresses]);

  return (
    <div className="progress-bar">
      <div className="progress-label">PET PROGRESS</div>
      <div className="hearts-container">
        {heartProgresses.map((progress, index) => (
          <div key={index} className="heart-wrapper">
            <div className="heart-outline">
              <motion.div
                className="heart-fill"
                initial={{ height: 0 }}
                animate={{ height: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Heart filled={true} />
              </motion.div>
              <Heart filled={false} />
            </div>
            <div className="heart-stage">Stage {index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`heart-icon ${filled ? 'filled' : 'empty'}`}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
