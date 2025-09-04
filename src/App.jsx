import { useState } from 'react';
import GameIntro from './components/GameIntro';
import DeskScene from './DeskScene';
import AccusationScreen from './components/AccusationScreen';
import EndingScreen from './components/EndingScreen';

import ScarlettAvatar from './assets/avatar1.png';
import BusinessmanAvatar from './assets/avatar2.png';
import JesterAvatar from './assets/avatar3.png';
import StagemanAvatar from './assets/avatar4.png';

function App() {

  const [gameState, setGameState] = useState('intro'); // playing, accusing, ended
  const [accusedSuspect, setAccusedSuspect] = useState(null);
  const [foundClues, setFoundClues] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const suspects = [
    { id: 1, name: 'Vincent Cross', title: 'The Bartender', status: 'Alibi: Working', emoji: '🍸', avatar: JesterAvatar },
    { id: 2, 
      name: 'Eleanor Vance', 
      title: 'The Socialite', 
      status: 'Motive: Known rival', 
      avatar: ScarlettAvatar, 
      description: `Scarlett Deluxe owns the Rabbit Hole and everyone in it. She moves through the club like royalty, leaving a trail of vanilla perfume and broken hearts in her wake. Her smile doesn't reach her eyes.`
    },
    { id: 3, name: 'Arthur Finch', title: 'The Businessman', status: 'Opportunity: Present', emoji: '💼', avatar: BusinessmanAvatar },
    { id: 4, name: 'Arthur Finch', title: 'The Stageman', status: 'Opportunity: Present', emoji: '💼', avatar: StagemanAvatar },
  ];

  const caseSolution = "Silas was Ace's original partner, betrayed years ago. He caused the blackout and framed Jester using his prop knife, seeking revenge for his stolen career.";

  const handleStartGame = () => {
    setGameStarted(true);
    setGameState('playing');
  };

  const addClue = (clueId) => {
    setFoundClues(prevClues => 
      prevClues.includes(clueId) ? prevClues : [...prevClues, clueId]
    );
  };

  const handleAccuse = () => {
    setGameState('accusing');
  };

  const handleConfirmAccusation = (suspect) => {
    setAccusedSuspect(suspect);
    setGameState('ended');
  };

  const handleRestart = () => {
    setGameState('intro');
    setFoundClues([]);
    setAccusedSuspect(null);
  }

  if (gameState === 'intro') {
    return <GameIntro onStartGame={handleStartGame} />;
  }

  if (gameState === 'accusing') {
    return (
      <AccusationScreen
        suspects={suspects}
        onAccuse={handleConfirmAccusation}
        onCancel={() => setGameState('playing')}
      />
    );
  }

  if (gameState === 'ended') {
    return (
      <EndingScreen
        accusedSuspect={accusedSuspect}
        isCorrect={accusedSuspect?.name === 'Silas'}
        onRestart={handleRestart}
        caseSolution={caseSolution}
      />
    );
  }

  return (
    <DeskScene 
      foundClues={foundClues} 
      addClue={addClue}
      onAccuse={handleAccuse}
      suspects={suspects}
    />
  );
}

export default App;