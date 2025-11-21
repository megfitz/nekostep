import React from 'react';
import { motion } from 'framer-motion';
import { InteractionType } from '../../types';
import './InteractionMenu.css';

interface InteractionMenuProps {
  onInteraction: (type: InteractionType) => void;
}

const interactions: { type: InteractionType; label: string; icon: string }[] = [
  { type: 'feed', label: 'Feed', icon: '🍖' },
  { type: 'play', label: 'Play', icon: '🎾' },
  { type: 'clean', label: 'Clean', icon: '🧼' },
  { type: 'train', label: 'Train', icon: '🎯' },
];

export function InteractionMenu({ onInteraction }: InteractionMenuProps) {
  return (
    <div className="interaction-menu">
      <div className="menu-grid">
        {interactions.map((interaction) => (
          <motion.button
            key={interaction.type}
            className="menu-button"
            onClick={() => onInteraction(interaction.type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="menu-icon">{interaction.icon}</span>
            <span className="menu-label">{interaction.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
