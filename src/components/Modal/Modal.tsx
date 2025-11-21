import { motion, AnimatePresence } from 'framer-motion';
import type { InteractionType, InteractionOption, GrowthStage } from '../../types';
import { getAvailableInteractions } from '../../utils/gameConstants';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  interactionType: InteractionType | null;
  currentStage: GrowthStage;
  currentEnergy: number;
  onSelectInteraction: (option: InteractionOption) => void;
}

const titles: Record<InteractionType, string> = {
  feed: '🍖 Feed Your Pet',
  play: '🎾 Play Time',
  clean: '🧼 Clean & Groom',
  train: '🎯 Training Session',
};

export function Modal({
  isOpen,
  onClose,
  interactionType,
  currentStage,
  currentEnergy,
  onSelectInteraction,
}: ModalProps) {
  if (!interactionType) return null;

  const availableOptions = getAvailableInteractions(currentStage, interactionType);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            <div className="modal-header">
              <h2>{titles[interactionType]}</h2>
              <button className="modal-close" onClick={onClose}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              {availableOptions.length === 0 ? (
                <p className="no-options">
                  No options available yet! Keep growing your pet to unlock more.
                </p>
              ) : (
                <div className="options-list">
                  {availableOptions.map((option) => {
                    const canAfford = currentEnergy >= option.cost;
                    return (
                      <motion.button
                        key={option.id}
                        className={`option-button ${!canAfford ? 'disabled' : ''}`}
                        onClick={() => canAfford && onSelectInteraction(option)}
                        disabled={!canAfford}
                        whileHover={canAfford ? { scale: 1.02 } : {}}
                        whileTap={canAfford ? { scale: 0.98 } : {}}
                      >
                        <span className="option-name">{option.name}</span>
                        <span className={`option-cost ${!canAfford ? 'insufficient' : ''}`}>
                          {option.cost} Energy
                        </span>
                        {!canAfford && (
                          <span className="insufficient-badge">Not enough energy</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
