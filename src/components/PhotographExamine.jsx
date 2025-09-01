import './PhotographExamine.css';

function PhotographExamine({ photo, clues, foundClues, onClueFound, onClose }) {
  // ensure foundClues is always an array
  const safeFoundClues = foundClues || [];
  const safeClues = clues || [];

  const handleClueClick = (clueId) => {
    if (!safeFoundClues.includes(clueId)) {
      onClueFound(clueId);
    }
  };

  return (
    <div className="examine-overlay" onClick={onClose}>
      <div className="examine-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="examine-header">
          <h2>Examining: {photo?.title}</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        {/* the main photograph */}
        <div className="examine-photo-wrapper">
          <img 
            src={photo?.fullImage} 
            alt={photo?.title || 'Evidence photo'}
            className="examine-photo"
          />

          {/* clue hitboxes with safety check */}
          {safeClues.map((clue) => {
            const isFound = safeFoundClues.includes(clue.id);
            return (
              <div
                key={clue.id}
                className={`clue-hitbox ${isFound ? 'found' : ''}`}
                style={{
                  top: '30%',    // YAP: adjust these positions when placing the clues
                  left: '60%',   // this is for debugging purposes
                  width: '5%',
                  height: '8%',
                }}
                onClick={() => handleClueClick(clue.id)}
                title={isFound ? clue.title : 'Click to examine'}
              />
            );
          })}
        </div>

        {/* clue found notification */}
        <div className="examine-clues">
          <h3>Clues in this photo:</h3>
          <div className="clue-list">
            {safeClues.map(clue => (
              <div key={clue.id} className={`clue-status ${safeFoundClues.includes(clue.id) ? 'found' : 'missing'}`}>
                {safeFoundClues.includes(clue.id) ? '✓ ' : '○ '}{clue.title}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PhotographExamine;