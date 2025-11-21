# 🐱 Nekostep

A retro Tamagotchi-style virtual pet game that motivates users to stay active by converting their steps into pet energy!

## Overview

Nekostep combines the nostalgia of Tamagotchi pets with modern fitness tracking. Adopt a cute cat-like creature and care for it by logging physical steps. Your activity keeps your pet healthy, happy, and growing!

## Features

### Core Mechanics
- **Step Tracking**: Steps automatically increment in the background (simulated for desktop)
- **Energy System**:
  - Steps convert to Energy (100 steps = 100 energy)
  - Maximum energy cap of 1,000
  - Energy is spent on pet interactions

### Pet Growth System
- **5 Growth Stages**: Pet evolves as you earn cumulative energy
  - Stage 1: 1,000 total energy (~1 day at 10k steps/day)
  - Stage 2: 3,000 total energy (~3 days)
  - Stage 3: 7,000 total energy (~1 week)
  - Stage 4: 15,000 total energy (~2 weeks)
  - Stage 5: 30,000 total energy (~30 days) - Full grown!

### Interactions
Each interaction costs energy and contributes to pet growth:

**Stage 1** (250 energy each):
- Feed: Cat Food
- Play: Fetch
- Clean: Bath
- Train: Sit

**Stage 2** (400 energy each):
- Feed: Tuna Treat
- Play: Laser Pointer
- Clean: Brush Fur
- Train: Paw Shake

**Stage 3** (550 energy each):
- Feed: Gourmet Meal
- Play: Catnip Toy
- Clean: Full Grooming
- Train: Roll Over

**Stage 4** (700 energy each):
- Feed: Fancy Feast
- Play: Obstacle Course
- Clean: Spa Day
- Train: Jump Through Hoop

**Stage 5** (850 energy each):
- Feed: Deluxe Buffet
- Play: Treasure Hunt
- Clean: Premium Pampering
- Train: Advanced Tricks

### Visual Design
- **90s Tamagotchi Aesthetic**: Bright colors, pixel-art style, retro fonts
- **Animated Pet Sprites**: Pet grows and changes with each stage
- **5-Heart Progress Bar**: Visual tracking of growth milestones
- **Retro Sound Effects**: 8-bit style beeps and chirps for interactions

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Smooth animations
- **Web Audio API** - Retro sound effects
- **LocalStorage** - Game state persistence

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd nekostep
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser to `http://localhost:5173/`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist/` directory.

## Project Structure

\`\`\`
nekostep/
├── src/
│   ├── components/          # React components
│   │   ├── AdoptionScreen/
│   │   ├── PermissionScreen/
│   │   ├── MainGameScreen/
│   │   ├── PetDisplay/
│   │   ├── EnergyCounter/
│   │   ├── ProgressBar/
│   │   ├── InteractionMenu/
│   │   └── Modal/
│   ├── context/            # React Context for state management
│   │   └── GameContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useStepTracker.ts
│   │   └── useSounds.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions and constants
│   │   └── gameConstants.ts
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
└── package.json
\`\`\`

## Game Mechanics

### Energy Conversion
- Steps auto-increment every second (simulating walking)
- Conversion rate: 100 steps = 100 energy
- Energy automatically converts when step threshold is reached
- Energy is capped at 1,000 maximum

### Pet Progression
- Total energy earned is cumulative (never decreases)
- Pet growth is permanent (stages don't regress)
- New interactions unlock at each growth stage
- Visual pet changes reflect growth progress

### Data Persistence
- Game state auto-saves to localStorage
- Pet, energy, steps, and progress are preserved
- Resume your game anytime from where you left off

## Customization

### Adjusting Game Balance

Edit `src/utils/gameConstants.ts` to modify:
- Energy cap and starting values
- Step-to-energy conversion rates
- Growth milestone requirements
- Interaction costs per stage

### Adding New Pet Types

1. Add new pet type to `PET_TYPES` in `gameConstants.ts`
2. Create corresponding CSS styles in `AdoptionScreen.css` and `PetDisplay.css`

### Sound Effects

Sound effects are generated using the Web Audio API in `src/hooks/useSounds.ts`. Modify tone frequencies and durations to customize sounds.

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern browsers with ES6+ support

## Future Enhancements

- Multiple pet management
- Real mobile step tracking integration
- Pet customization (colors, accessories)
- Achievement system
- Daily challenges
- Cloud saves with backend
- Social features

## License

This project is open source and available for educational purposes.

## Credits

Developed with ❤️ for retro gaming enthusiasts and fitness lovers!
