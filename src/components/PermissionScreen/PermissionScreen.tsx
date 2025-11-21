import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import './PermissionScreen.css';

export function PermissionScreen() {
  const { grantPermission, gameState } = useGame();

  return (
    <div className="permission-screen">
      <motion.div
        className="permission-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="pet-icon"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="pet-sprite large" data-type={gameState.pet?.type}></div>
        </motion.div>

        <h2>{gameState.pet?.name} needs your steps!</h2>

        <div className="info-box">
          <p className="info-text">
            To keep <strong>{gameState.pet?.name}</strong> healthy and happy,
            you'll need to stay active!
          </p>
          <p className="info-text">
            Your steps will be converted into Energy that you can use to
            feed, play with, and care for your pet.
          </p>
          <p className="info-detail">
            💡 Since we're on desktop, steps will auto-increment in the background
            to simulate your daily activity!
          </p>
        </div>

        <motion.button
          className="btn btn-primary btn-large"
          onClick={grantPermission}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enable Step Tracking
        </motion.button>

        <p className="privacy-note">
          🔒 Your data stays on this device only
        </p>
      </motion.div>
    </div>
  );
}
