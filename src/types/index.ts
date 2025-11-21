// Core type definitions for Nekostep

export type PetType = 'cat1' | 'cat2' | 'cat3';

export type GrowthStage = 1 | 2 | 3 | 4 | 5;

export type InteractionType = 'feed' | 'play' | 'clean' | 'train';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  energyLevel: number;
  totalEnergyEarned: number;
  growthStage: GrowthStage;
  lastFed: number;
  lastPlayed: number;
  lastCleaned: number;
  lastTrained: number;
  cleanliness: number;
  happiness: number;
}

export interface InteractionOption {
  id: string;
  name: string;
  cost: number;
  unlockedAt: GrowthStage;
  type: InteractionType;
}

export interface GameState {
  currentScreen: 'adoption' | 'permission' | 'main';
  pet: Pet | null;
  steps: number;
  totalSteps: number;
  hasPermission: boolean;
}

export interface SoundType {
  click: string;
  success: string;
  energyGain: string;
  heartFill: string;
  stageUp: string;
  lowEnergy: string;
  error: string;
}
