import { GrowthStage, InteractionOption } from '../types';

// Energy System
export const MAX_ENERGY = 1000;
export const STARTING_ENERGY = 500;
export const STEPS_PER_ENERGY = 100; // 100 steps = 100 energy
export const STEP_INCREMENT_RATE = 1000; // milliseconds between auto-step increments
export const STEPS_PER_INCREMENT = 10; // steps added each increment (simulates walking)

// Growth Milestones (cumulative energy required)
export const GROWTH_MILESTONES: Record<GrowthStage, number> = {
  1: 1000,
  2: 3000,
  3: 7000,
  4: 15000,
  5: 30000,
};

// Interaction Costs by Stage
export const INTERACTION_COSTS: Record<GrowthStage, number> = {
  1: 250,
  2: 400,
  3: 550,
  4: 700,
  5: 850,
};

// Available Pet Types
export const PET_TYPES = [
  { id: 'cat1', name: 'Neko', description: 'A playful and energetic companion' },
  { id: 'cat2', name: 'Mochi', description: 'A gentle and cuddly friend' },
  { id: 'cat3', name: 'Luna', description: 'A mysterious and clever partner' },
] as const;

// All Available Interactions
export const INTERACTIONS: InteractionOption[] = [
  // FEED
  { id: 'feed1', name: 'Cat Food', cost: 250, unlockedAt: 1, type: 'feed' },
  { id: 'feed2', name: 'Tuna Treat', cost: 400, unlockedAt: 2, type: 'feed' },
  { id: 'feed3', name: 'Gourmet Meal', cost: 550, unlockedAt: 3, type: 'feed' },
  { id: 'feed4', name: 'Fancy Feast', cost: 700, unlockedAt: 4, type: 'feed' },
  { id: 'feed5', name: 'Deluxe Buffet', cost: 850, unlockedAt: 5, type: 'feed' },

  // PLAY
  { id: 'play1', name: 'Fetch', cost: 250, unlockedAt: 1, type: 'play' },
  { id: 'play2', name: 'Laser Pointer', cost: 400, unlockedAt: 2, type: 'play' },
  { id: 'play3', name: 'Catnip Toy', cost: 550, unlockedAt: 3, type: 'play' },
  { id: 'play4', name: 'Obstacle Course', cost: 700, unlockedAt: 4, type: 'play' },
  { id: 'play5', name: 'Treasure Hunt', cost: 850, unlockedAt: 5, type: 'play' },

  // CLEAN
  { id: 'clean1', name: 'Bath', cost: 250, unlockedAt: 1, type: 'clean' },
  { id: 'clean2', name: 'Brush Fur', cost: 400, unlockedAt: 2, type: 'clean' },
  { id: 'clean3', name: 'Full Grooming', cost: 550, unlockedAt: 3, type: 'clean' },
  { id: 'clean4', name: 'Spa Day', cost: 700, unlockedAt: 4, type: 'clean' },
  { id: 'clean5', name: 'Premium Pampering', cost: 850, unlockedAt: 5, type: 'clean' },

  // TRAIN
  { id: 'train1', name: 'Sit', cost: 250, unlockedAt: 1, type: 'train' },
  { id: 'train2', name: 'Paw Shake', cost: 400, unlockedAt: 2, type: 'train' },
  { id: 'train3', name: 'Roll Over', cost: 550, unlockedAt: 3, type: 'train' },
  { id: 'train4', name: 'Jump Through Hoop', cost: 700, unlockedAt: 4, type: 'train' },
  { id: 'train5', name: 'Advanced Tricks', cost: 850, unlockedAt: 5, type: 'train' },
];

// Helper function to get available interactions for current stage
export function getAvailableInteractions(
  stage: GrowthStage,
  type?: 'feed' | 'play' | 'clean' | 'train'
): InteractionOption[] {
  return INTERACTIONS.filter(
    (interaction) =>
      interaction.unlockedAt <= stage &&
      (!type || interaction.type === type)
  );
}

// Helper function to calculate current growth stage based on total energy
export function calculateGrowthStage(totalEnergy: number): GrowthStage {
  if (totalEnergy >= GROWTH_MILESTONES[5]) return 5;
  if (totalEnergy >= GROWTH_MILESTONES[4]) return 4;
  if (totalEnergy >= GROWTH_MILESTONES[3]) return 3;
  if (totalEnergy >= GROWTH_MILESTONES[2]) return 2;
  return 1;
}

// Helper function to calculate progress within current stage
export function calculateStageProgress(totalEnergy: number): number {
  const stage = calculateGrowthStage(totalEnergy);

  if (stage === 5 && totalEnergy >= GROWTH_MILESTONES[5]) {
    return 100; // Completed
  }

  const currentMilestone = GROWTH_MILESTONES[stage];
  const previousMilestone = stage > 1 ? GROWTH_MILESTONES[(stage - 1) as GrowthStage] : 0;
  const stageRange = currentMilestone - previousMilestone;
  const progressInStage = totalEnergy - previousMilestone;

  return Math.min(100, (progressInStage / stageRange) * 100);
}

// Helper function to get progress for each heart (0-100%)
export function getHeartProgresses(totalEnergy: number): number[] {
  const progresses: number[] = [];

  for (let stage = 1; stage <= 5; stage++) {
    const milestone = GROWTH_MILESTONES[stage as GrowthStage];
    const previousMilestone = stage > 1 ? GROWTH_MILESTONES[(stage - 1) as GrowthStage] : 0;
    const stageRange = milestone - previousMilestone;

    if (totalEnergy >= milestone) {
      progresses.push(100); // Filled
    } else if (totalEnergy > previousMilestone) {
      const progressInStage = totalEnergy - previousMilestone;
      progresses.push((progressInStage / stageRange) * 100);
    } else {
      progresses.push(0); // Empty
    }
  }

  return progresses;
}
