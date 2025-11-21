import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Pet, GameState, PetType, InteractionType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useStepTracker } from '../hooks/useStepTracker';
import { useSounds } from '../hooks/useSounds';
import {
  MAX_ENERGY,
  STARTING_ENERGY,
  STEPS_PER_ENERGY,
  calculateGrowthStage,
} from '../utils/gameConstants';

interface GameContextType {
  gameState: GameState;
  createPet: (name: string, type: PetType) => void;
  grantPermission: () => void;
  performInteraction: (type: InteractionType, cost: number) => boolean;
  convertStepsToEnergy: () => void;
  playSound: (sound: Parameters<ReturnType<typeof useSounds>['play']>[0]) => void;
  steps: number;
  energyAvailable: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useLocalStorage<GameState>('nekostep-game', {
    currentScreen: 'adoption',
    pet: null,
    steps: 0,
    totalSteps: 0,
    hasPermission: false,
  });

  const [steps] = useStepTracker(gameState.steps);
  const { play: playSound } = useSounds();
  const [energyAvailable, setEnergyAvailable] = useState(0);

  // Convert steps to energy periodically
  useEffect(() => {
    if (!gameState.pet || !gameState.hasPermission) return;

    const newStepsSinceLastConversion = steps - gameState.steps;
    if (newStepsSinceLastConversion >= STEPS_PER_ENERGY) {
      convertStepsToEnergy();
    }
  }, [steps, gameState.pet, gameState.hasPermission]);

  // Calculate available energy whenever pet changes
  useEffect(() => {
    if (gameState.pet) {
      setEnergyAvailable(Math.min(gameState.pet.energyLevel, MAX_ENERGY));
    }
  }, [gameState.pet]);

  const createPet = (name: string, type: PetType) => {
    const newPet: Pet = {
      id: `${type}-${Date.now()}`,
      name,
      type,
      energyLevel: STARTING_ENERGY,
      totalEnergyEarned: 0,
      growthStage: 1,
      lastFed: Date.now(),
      lastPlayed: Date.now(),
      lastCleaned: Date.now(),
      lastTrained: Date.now(),
      cleanliness: 100,
      happiness: 100,
    };

    setGameState({
      ...gameState,
      pet: newPet,
      currentScreen: 'permission',
    });

    playSound('success');
  };

  const grantPermission = () => {
    setGameState({
      ...gameState,
      currentScreen: 'main',
      hasPermission: true,
    });
    playSound('success');
  };

  const convertStepsToEnergy = () => {
    if (!gameState.pet) return;

    const newSteps = steps - gameState.steps;
    const energyToAdd = Math.floor(newSteps / STEPS_PER_ENERGY) * STEPS_PER_ENERGY;

    if (energyToAdd > 0) {
      const currentEnergy = gameState.pet.energyLevel;
      const newEnergy = Math.min(currentEnergy + energyToAdd, MAX_ENERGY);
      const actualEnergyAdded = newEnergy - currentEnergy;

      if (actualEnergyAdded > 0) {
        setGameState({
          ...gameState,
          pet: {
            ...gameState.pet,
            energyLevel: newEnergy,
          },
          steps: steps,
          totalSteps: gameState.totalSteps + newSteps,
        });

        playSound('energyGain');
      }
    }
  };

  const performInteraction = (type: InteractionType, cost: number): boolean => {
    if (!gameState.pet) return false;

    // Check if enough energy
    if (gameState.pet.energyLevel < cost) {
      playSound('error');
      return false;
    }

    const previousStage = gameState.pet.growthStage;
    const newEnergyLevel = gameState.pet.energyLevel - cost;
    const newTotalEnergy = gameState.pet.totalEnergyEarned + cost;
    const newStage = calculateGrowthStage(newTotalEnergy);

    const updatedPet: Pet = {
      ...gameState.pet,
      energyLevel: newEnergyLevel,
      totalEnergyEarned: newTotalEnergy,
      growthStage: newStage,
      [`last${type.charAt(0).toUpperCase() + type.slice(1)}`]: Date.now(),
    };

    setGameState({
      ...gameState,
      pet: updatedPet,
    });

    // Play appropriate sound
    if (newStage > previousStage) {
      playSound('stageUp');
    } else {
      playSound('success');
    }

    return true;
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        createPet,
        grantPermission,
        performInteraction,
        convertStepsToEnergy,
        playSound,
        steps,
        energyAvailable,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
