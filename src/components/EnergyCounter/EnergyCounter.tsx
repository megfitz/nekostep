import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAX_ENERGY } from '../../utils/gameConstants';
import './EnergyCounter.css';

interface EnergyCounterProps {
  energy: number;
}

export function EnergyCounter({ energy }: EnergyCounterProps) {
  const [prevEnergy, setPrevEnergy] = useState(energy);
  const [showChange, setShowChange] = useState(false);
  const [energyChange, setEnergyChange] = useState(0);

  useEffect(() => {
    if (energy !== prevEnergy) {
      const change = energy - prevEnergy;
      setEnergyChange(change);
      setShowChange(true);
      setPrevEnergy(energy);

      const timer = setTimeout(() => setShowChange(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [energy, prevEnergy]);

  const percentage = (energy / MAX_ENERGY) * 100;
  const isLow = percentage < 25;

  return (
    <div className="energy-counter">
      <div className="energy-label">ENERGY</div>
      <div className={`energy-display ${isLow ? 'low' : ''}`}>
        <motion.span
          key={energy}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="energy-value"
        >
          {energy}
        </motion.span>
        <span className="energy-max">/{MAX_ENERGY}</span>
      </div>

      <div className="energy-bar-container">
        <motion.div
          className={`energy-bar ${isLow ? 'low' : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence>
        {showChange && (
          <motion.div
            className={`energy-change ${energyChange > 0 ? 'positive' : 'negative'}`}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: -40 }}
          >
            {energyChange > 0 ? '+' : ''}{energyChange}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
