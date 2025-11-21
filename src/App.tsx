import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { AdoptionScreen } from './components/AdoptionScreen/AdoptionScreen';
import { PermissionScreen } from './components/PermissionScreen/PermissionScreen';
import { MainGameScreen } from './components/MainGameScreen/MainGameScreen';
import './App.css';

function GameRouter() {
  const { gameState } = useGame();

  switch (gameState.currentScreen) {
    case 'adoption':
      return <AdoptionScreen />;
    case 'permission':
      return <PermissionScreen />;
    case 'main':
      return <MainGameScreen />;
    default:
      return <AdoptionScreen />;
  }
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}

export default App;
