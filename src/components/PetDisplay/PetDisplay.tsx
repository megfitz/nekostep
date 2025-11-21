import React from 'react';
import { motion } from 'framer-motion';
import { Pet } from '../../types';
import './PetDisplay.css';

interface PetDisplayProps {
  pet: Pet;
}

export function PetDisplay({ pet }: PetDisplayProps) {
  const isLowEnergy = pet.energyLevel < 100;

  return (
    <div className="pet-display">
      <div className="pet-name">{pet.name}</div>

      <motion.div
        className={`pet-container stage-${pet.growthStage}`}
        animate={{
          y: isLowEnergy ? [0, 2, 0] : [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: isLowEnergy ? 3 : 2,
          ease: 'easeInOut',
        }}
      >
        <div className={`pet-sprite-main ${isLowEnergy ? 'tired' : ''}`} data-type={pet.type} data-stage={pet.growthStage}>
          {/* Pet body - size increases with growth stage */}
          <div className="sprite-body"></div>

          {/* Eyes */}
          <div className={`sprite-eyes ${isLowEnergy ? 'sleepy' : ''}`}>
            <div className="eye left"></div>
            <div className="eye right"></div>
          </div>

          {/* Ears */}
          <div className="sprite-ears">
            <div className="ear left"></div>
            <div className="ear right"></div>
          </div>

          {/* Tail - wiggles when happy */}
          {!isLowEnergy && (
            <motion.div
              className="sprite-tail"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}

          {/* Stage indicator effects */}
          {pet.growthStage >= 3 && (
            <motion.div
              className="sparkle"
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>

        {isLowEnergy && (
          <motion.div
            className="zzz"
            animate={{ y: [-5, -15], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Zzz...
          </motion.div>
        )}
      </motion.div>

      <div className="pet-stats">
        <div className="stat">
          <span className="stat-label">Stage:</span>
          <span className="stat-value">{pet.growthStage}/5</span>
        </div>
        <div className="stat">
          <span className="stat-label">Total Energy:</span>
          <span className="stat-value">{pet.totalEnergyEarned.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
