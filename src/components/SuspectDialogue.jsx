import './SuspectDialogue.css';
import { useState, useEffect } from 'react';

function SuspectDialogue({ suspect, foundClues, conversationHistory, onUpdateConversation, onClose }) {

  const safeFoundClues = foundClues || [];

  const getDialogueOptions = () => {
    const options = [];

    // always available options
    options.push({
      id: 'who-are-you',
      text: `Who are you?`,
      response: `I'm ${suspect?.name || 'the suspect'}. ${suspect?.title || ''}. But you already knew that, detective.`
    });

    options.push({
      id: 'where-were-you',
      text: `Where were you the night of the murder?`,
      response: suspect?.status || 'I was around.'
    });

    // clue specific options
    if (safeFoundClues.includes('bloody_knife')) {
      options.push({
        id: 'about-knife',
        text: `This knife was found at the scene. Care to explain?`,
        response: `That's a prop from the magic act! Anyone could have taken it from backstage. I was performing that night, my tools were in plain sight.`
      });
    }

    if (safeFoundClues.includes('torn_ticket')) {
      options.push({
        id: 'about-ticket',
        text: `We found a VIP ticket with lipstick at the scene.`,
        response: `Scarlett hands those out like candy. Half the club probably had one that night.`
      });
    }

    if (safeFoundClues.includes('stagehand_glove')) {
      options.push({
        id: 'about-glove',
        text: `We found a stagehand's glove near the body.`,
        response: `Silas is always losing those. The man is more ghost than person, always there but you never quite see him.`
      });
    }

    if (safeFoundClues.includes('ace_of_spades')) {
      options.push({
        id: 'about-card',
        text: `The victim was holding the Ace of Spades. What does it mean?`,
        response: `Ace was always dramatic. Probably just a final trick from beyond the grave. Or maybe he's trying to tell us something about the game that night.`
      });
    }

    return options;
  };

  const [dialogueOptions, setDialogueOptions] = useState(getDialogueOptions());

  const getUsedOptionIds = () => {
    const usedIds = new Set();
    conversationHistory.forEach(entry => {
      if(entry.speaker === 'player'){
        const matchingOption = dialogueOptions.find(opt => opt.text === entry.text);
        if(matchingOption){
          usedIds.add(matchingOption.id);
        }
      }
    });
    return usedIds;
  };

  const usedOptionIds = getUsedOptionIds();

  const handleOptionSelect = (option) => {
    const newEntries = [
      {
        speaker: 'player',
        text: option.text,
        timestamp: new Date()
      },
      {
        speaker: 'suspect',
        text: option.response,
        timestamp: new Date()
      }
    ];

    onUpdateConversation(suspect.id, newEntries);
  };

  // scroll to bottom whenever history updates
  useEffect(() => {
    const container = document.querySelector('.dialogue-history');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [conversationHistory]);

 return (
    <div className="dialogue-overlay" onClick={onClose}>
      <div className="dialogue-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="dialogue-header">
          <div className="suspect-dialogue-avatar">
            <img src={suspect?.avatar} alt={suspect?.name} />
          </div>
          <h2>Interview: {suspect?.name || 'Suspect'}</h2>
          <button className="close-dialogue-btn" onClick={onClose}>✕</button>
        </div>

        <div className="dialogue-content">
          
          <div className="dialogue-history">
            {conversationHistory.map((entry, index) => (
              <div key={index} className={`dialogue-bubble ${entry.speaker}`}>
                <div className="bubble-content">
                  <p>{entry.text}</p>
                </div>
                <span className="bubble-time">
                  {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          <div className="dialogue-options">
            <h4>Ask about:</h4>
            {dialogueOptions.map(option => {
              const isUsed = usedOptionIds.has(option.id);
              return (
                <button
                  key={option.id}
                  className={`dialogue-option ${isUsed ? 'used' : ''}`}
                  onClick={() => !isUsed && handleOptionSelect(option)}
                  disabled={isUsed}
                  title={isUsed ? "Already asked about this" : ""}
                >
                  {option.text}
                  {isUsed && <span className="option-status"> ✓</span>}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SuspectDialogue;