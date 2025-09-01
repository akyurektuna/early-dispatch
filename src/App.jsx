import './App.css';
import { useState } from 'react';

function App() {

    // State to track the selected photo
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [foundClues, setFoundClues] = useState([]);
  const addClue = (clueId) => {
    setFoundClues(prev => prev.includes(clueId) ? prev : [...prev, clueId]);
  };

  // Function to handle when a photo is clicked
  const handlePhotoSelect = (photoId) => {
    setSelectedPhoto(photoId);
  };

  // Function to close the enlarged photo
  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };

  const photographs = [
    { id: 'alleyway', title: 'Crime Scene Overview', src: '/src/assets/Untitled_Artwork.png' },
    { id: 'closeup', title: 'Evidence Close-up', src: '/src/assets/Untitled_Artwork.png' },
  ];

  const allClues = [
  { id: 'bloody_knife', photoId: 'alleyway', title: 'Bloody Knife', position: { top: '30%', left: '60%', width: '5%', height: '8%' } },
  { id: 'torn_note', photoId: 'alleyway', title: 'Torn Note', position: { top: '65%', left: '42%', width: '5%', height: '3%' } },
  { id: 'strange_key', photoId: 'closeup', title: 'Strange Key', position: { top: '50%', left: '50%', width: '4%', height: '3%' } },
];

return (
    <div className="scene-container">
      <div className="desk-background"></div>
      <h1>The Early Dispatch</h1>

{/* Container for the photographs on the desk */}
    <div className="photographs-on-desk">
      {photographs.map((photo) => (
        <div
          key={photo.id}
          // Apply the 'selected' class if this photo is the selected one
          className={`photograph ${selectedPhoto === photo.id ? 'selected' : ''}`}
          onClick={() => handlePhotoSelect(photo.id)}
        >
          <img src={photo.src} alt={photo.title} />
          <p>{photo.title}</p>
        </div>
      ))}
      
<div className="clue-journal">
  <h2>Clue Journal</h2>
  {foundClues.length === 0 ? (
    <p>No clues found yet. Examine the photographs closely.</p>
  ) : (
    <ul>
      {foundClues.map(clueId => {
        const clue = allClues.find(c => c.id === clueId);
        return <li key={clueId}>{clue.title}</li>;
      })}
    </ul>
  )}
</div>

      {selectedPhoto && (
  <div className="enlarged-overlay" onClick={handleClosePhoto}>
    <div className="enlarged-photo-container" onClick={(e) => e.stopPropagation()}>
      <img 
        src={photographs.find(p => p.id === selectedPhoto).src} 
        alt="Enlarged view" 
      />
      {allClues
        .filter(clue => clue.photoId === selectedPhoto)
        .map((clue) => {
          const isFound = foundClues.includes(clue.id);
          return (
            <div
              key={clue.id}
              className={`clue-hitbox ${isFound ? 'found' : ''}`}
              style={clue.position}
              onClick={(e) => {
                e.stopPropagation(); // Prevent closing the overlay
                if (!isFound) {
                  addClue(clue.id);
                  // You could add a sound effect here too!
                }
              }}
              title={isFound ? clue.title : 'Click to examine'}
            />
          );
        })
      }


      <button className="close-button" onClick={handleClosePhoto}>X</button>
    </div>
  </div>
)}
         
      </div>
    </div>
  );
}

export default App;