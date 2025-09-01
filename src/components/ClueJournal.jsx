import './ClueJournal.css';

function ClueJournal({ foundClues = [], allClues = [] }) { 
  
  // full clue object for each found clue ID
  const foundClueObjects = foundClues.map(clueId => 
    allClues.find(clue => clue.id === clueId)
  ).filter(clue => clue != null);

  return (
    <div className="clue-journal">
      <h2>Clue Journal</h2>
      
      {foundClueObjects.length === 0 ? (
        <p className="no-clues">No clues found yet. Examine the photographs closely.</p>
      ) : (
        <div className="clues-list">
          {foundClueObjects.map(clue => (
            <div key={clue.id} className="clue-item">
              <h3>{clue.title}</h3>
              <p>{clue.description}</p>
              <span className="clue-source">Found in: {clue.photoId}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClueJournal;