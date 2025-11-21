import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { PetType } from '../../types';
import { PET_TYPES } from '../../utils/gameConstants';
import './AdoptionScreen.css';

export function AdoptionScreen() {
  const { createPet, playSound } = useGame();
  const [selectedPet, setSelectedPet] = useState<PetType | null>(null);
  const [petName, setPetName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const handlePetSelect = (type: PetType) => {
    setSelectedPet(type);
    setShowNameInput(true);
    playSound('click');
  };

  const handleAdopt = () => {
    if (!selectedPet || !petName.trim()) {
      playSound('error');
      return;
    }

    createPet(petName.trim(), selectedPet);
  };

  return (
    <div className="adoption-screen">
      <motion.div
        className="adoption-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="title">NEKOSTEP</h1>
        <p className="subtitle">Choose your companion!</p>

        {!showNameInput ? (
          <div className="pet-selection">
            {PET_TYPES.map((pet) => (
              <motion.button
                key={pet.id}
                className={`pet-option ${selectedPet === pet.id ? 'selected' : ''}`}
                onClick={() => handlePetSelect(pet.id as PetType)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="pet-sprite" data-type={pet.id}></div>
                <h3>{pet.name}</h3>
                <p>{pet.description}</p>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            className="name-input-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="selected-pet-preview">
              <div className="pet-sprite large" data-type={selectedPet}></div>
              <h3>{PET_TYPES.find(p => p.id === selectedPet)?.name}</h3>
            </div>

            <label htmlFor="pet-name">Name your pet:</label>
            <input
              id="pet-name"
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              maxLength={15}
              placeholder="Enter name..."
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleAdopt()}
            />

            <div className="button-group">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowNameInput(false);
                  setPetName('');
                  playSound('click');
                }}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAdopt}
                disabled={!petName.trim()}
              >
                Adopt!
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
