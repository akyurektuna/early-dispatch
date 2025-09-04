import './DeskScene.css';
import { useState } from 'react';

import ClueJournal from './components/ClueJournal'
import SuspectPanel from './components/SuspectPanel'
import PhotographList from './components/PhotographList'
import PhotographExamine from './components/PhotographExamine'
import SuspectDialogue from './components/SuspectDialogue'



function DeskScene({ foundClues, addClue, onAccuse,suspects }) {
  const [examiningPhoto, setExaminingPhoto] = useState(null);
  const [talkingToSuspect, setTalkingToSuspect] = useState(null);
  const [conversationHistories, setConversationHistories] = useState({});

  // sample data
  const photographs = [
    { id: 'alleyway',
      title: 'Crime Scene',
      thumbnail: '/src/assets/Untitled_Artwork.png',
      fullImage: '/src/assets/Untitled_Artwork.png' },

    { id: 'closeup',
       title: 'Close Evidence',
        thumbnail: '/src/assets/Untitled_Artwork2.png',
        fullImage: '/src/assets/Untitled_Artwork2.png' 
       },
  ];

  const allClues = [
    { id: 'bloody_knife', title: 'Bloody Knife', description: 'A knife with traces of blood.', photoId: 'alleyway' },
    { id: 'torn_note', title: 'Torn Note', description: 'A piece of paper with writing.', photoId: 'alleyway' },
  ];

  const handlePhotoSelect = (photo) => {
    setExaminingPhoto(photo);
    console.log('Selected photo:', photo);
  };

    const handleCloseExamine = () => {
    setExaminingPhoto(null);
  };
  const handleClueFound = (clueId) => {
    addClue(clueId);
  };

   const handleSuspectSelect = (suspect) => {
    setTalkingToSuspect(suspect);

    if (!conversationHistories[suspect.id]) {
      setConversationHistories(prev => ({
        ...prev,
        [suspect.id]: [
          {
            speaker: 'suspect',
            text: suspect.description || `You're speaking with ${suspect.name}. ${suspect.title}.`,
            timestamp: new Date()
          }
        ]
      }));
    }
  };

  const handleCloseDialogue = () => {
    setTalkingToSuspect(null);
  };

  const updateConversationHistory = (suspectId, newEntries) => {
    setConversationHistories(prev => ({
      ...prev,
      [suspectId]: [...(prev[suspectId] || []), ...newEntries]
    }));
  };

  return (
    
    <div className="desk-container">
      <div className="panel left-panel">
        <ClueJournal foundClues={foundClues} allClues={allClues} />
      </div>

      <div className="panel middle-panel">
        <PhotographList 
          photographs={photographs} 
          onPhotoSelect={handlePhotoSelect}
        />
      </div>

<div className="panel right-panel">
  <div className="right-panel-content">
    <div className="suspects-section">
      <SuspectPanel 
        suspects={suspects} 
        onSuspectSelect={setTalkingToSuspect}
      />
    </div>
    <div className="accusation-section">
      <button 
        className="accuse-button"
        onClick={() => onAccuse()}
        disabled={foundClues.length < 3}
      >
        MAKE ACCUSATION
      </button>
      <p className="accusation-hint">
        {foundClues.length < 3 
          ? `Gather ${3 - foundClues.length} more clues to accuse` 
          : "Ready to confront the killer"
        }
      </p>
    </div>
     </div>
      </div>
            {examiningPhoto && (
        <PhotographExamine
          photo={examiningPhoto}
          clues={allClues.filter(clue => clue.photoId === examiningPhoto.id)}
          foundClues={foundClues}
          onClueFound={handleClueFound}
          onClose={handleCloseExamine}
        />
      )}

      {talkingToSuspect && (
        <SuspectDialogue
          suspect={talkingToSuspect}
          foundClues={foundClues}
          conversationHistory={conversationHistories[talkingToSuspect.id] || []}
          onUpdateConversation={updateConversationHistory} 
          onClose={handleCloseDialogue}
        />
      )}

    </div>

    
  );
}

export default DeskScene;