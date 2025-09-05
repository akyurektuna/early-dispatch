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
    { id: 1, 
      name: 'Jester', 
      title: 'The Rival Magician', 
      status: 'Alibi: Working', 
      avatar: JesterAvatar,
      description: `Jester is all dramatic flair and bitter resentment. He sees magic as a competition he's losing, and Ace Santoro as the hack who stole his best tricks and his spotlight.`
    },
    { id: 2, 
      name: 'Scarlett Deluxe', 
      title: 'The Socialite', 
      status: 'Motive: Known rival', 
      avatar: ScarlettAvatar, 
      description: `Scarlett Deluxe owns the Rabbit Hole and everyone in it. She moves through the club like royalty, leaving a trail of vanilla perfume and broken hearts in her wake. Her smile doesn't reach her eyes.`
    },
    { id: 3,
      name: 'Vincent Cross', 
      title: 'The Businessman', 
      status: 'Opportunity: Present', 
      avatar: BusinessmanAvatar,
      description: `Vincent 'Fast Eddie' Cross runs the high-stakes games in the back room. He's got quick hands and quicker eyes, always watching, always calculating. He smells of expensive whiskey and cheap cigars.`

    },
    { id: 4, 
      name: 'Silas', 
      title: 'The Stageman', 
      status: 'Opportunity: Present', 
      avatar: StagemanAvatar,
      description: `Silas is more ghost than person - always there but never seen. He moves through the club with a quiet efficiency that makes him practically invisible. The perfect witness, if he bothered to look up from his work.`
     },
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