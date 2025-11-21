import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { InteractionType, InteractionOption } from '../../types';
import { PetDisplay } from '../PetDisplay/PetDisplay';
import { EnergyCounter } from '../EnergyCounter/EnergyCounter';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { InteractionMenu } from '../InteractionMenu/InteractionMenu';
import { Modal } from '../Modal/Modal';
import './MainGameScreen.css';

export function MainGameScreen() {
  const { gameState, performInteraction, playSound, energyAvailable } = useGame();
  const [selectedInteraction, setSelectedInteraction] = useState<InteractionType | null>(null);
  const [showLowEnergyMessage, setShowLowEnergyMessage] = useState(false);

  const pet = gameState.pet!;

  useEffect(() => {
    // Show low energy message when energy reaches 0
    if (energyAvailable === 0 && !showLowEnergyMessage) {
      setShowLowEnergyMessage(true);
      playSound('lowEnergy');
    } else if (energyAvailable > 0 && showLowEnergyMessage) {
      setShowLowEnergyMessage(false);
    }
  }, [energyAvailable, showLowEnergyMessage]);

  const handleInteractionClick = (type: InteractionType) => {
    setSelectedInteraction(type);
    playSound('click');
  };

  const handleSelectOption = (option: InteractionOption) => {
    const success = performInteraction(option.type, option.cost);

    if (success) {
      setSelectedInteraction(null);
    }
  };

  const handleHeartFilled = () => {
    playSound('heartFill');
  };

  return (
    <div className="main-game-screen">
      <div className="game-container">
        <div className="game-header">
          <h1 className="game-title">NEKOSTEP</h1>
        </div>

        <div className="game-layout">
          {/* Top row - Energy and Progress */}
          <div className="top-row">
            <EnergyCounter energy={energyAvailable} />
            <ProgressBar
              totalEnergy={pet.totalEnergyEarned}
              onHeartFilled={handleHeartFilled}
            />
          </div>

          {/* Pet display */}
          <PetDisplay pet={pet} />

          {/* Interaction menu */}
          <InteractionMenu onInteraction={handleInteractionClick} />
        </div>

        {/* Low energy message */}
        <AnimatePresence>
          {showLowEnergyMessage && (
            <motion.div
              className="low-energy-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="low-energy-message"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
              >
                <div className="message-icon">⚡</div>
                <h2>Out of Energy!</h2>
                <p>
                  Get walking to build up energy for {pet.name}!
                </p>
                <p className="message-detail">
                  Steps are being tracked automatically.
                  <br />
                  Walk around to earn more energy!
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowLowEnergyMessage(false)}
                >
                  Got it!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interaction modal */}
        <Modal
          isOpen={selectedInteraction !== null}
          onClose={() => setSelectedInteraction(null)}
          interactionType={selectedInteraction}
          currentStage={pet.growthStage}
          currentEnergy={energyAvailable}
          onSelectInteraction={handleSelectOption}
        />
      </div>
    </div>
  );
}
