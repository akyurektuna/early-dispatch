import { useState } from 'react';
import GameIntro from './components/GameIntro';
import DeskScene from './DeskScene';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [foundClues, setFoundClues] = useState([]);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const addClue = (clueId) => {
    setFoundClues(prevClues => 
      prevClues.includes(clueId) ? prevClues : [...prevClues, clueId]
    );
  };

  if (!gameStarted) {
    return <GameIntro onStartGame={handleStartGame} />;
  }

  return (
    <DeskScene foundClues={foundClues} addClue={addClue} />
  );
}

export default App;