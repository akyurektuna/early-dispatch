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
    { id: 'bloody_knife', title: 'Bloody Knife', description: 'A stage prop knife with a jeweled handle. Traces of blood.', photoId: 'alleyway', position: { top: '65%', left: '34%', width: '5%', height: '8%' }  },
    { id: 'torn_ticket', title: 'VIP Ticket', description: 'White ticket with red lipstick stain, caught in drain grate.', photoId: 'closeup', position: { top: '5%', left: '50%', width: '5%', height: '8%' } },
    { id: 'stagehand_glove', title: 'Stagehand Glove', description: 'A black fingerless work glove.', photoId: 'alleyway' , position: { top: '40%', left: '6%', width: '5%', height: '8%' }},
    { id: 'ace_of_spades', title: 'Ace of Spades', description: 'Ace of Spades clutched in fingers.', photoId: 'closeup', position: { top: '35%', left: '48%', width: '5%', height: '8%' } },
    { id: 'muddy_footprint', title: 'Footprint', description: 'Sharp-heeled print in wet pavement.', photoId: 'closeup', position: { top: '2%', left: '70%', width: '5%', height: '8%' } },
    { id: 'vanilla_scent', title: 'Perfume', description: 'Scarletts signature perfume.', photoId: 'closeup', relatedSuspect: 'scarlett', position: { top: '38%', left: '42%', width: '5%', height: '8%' } },
    { id: 'fibers', title: 'Fibers', description: 'Fibers under nails', photoId: 'closeup', position: { top: '45%', left: '50%', width: '5%', height: '8%' } },
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