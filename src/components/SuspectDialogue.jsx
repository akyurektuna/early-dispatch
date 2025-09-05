import './SuspectDialogue.css';
import { useState, useEffect } from 'react';

function SuspectDialogue({ suspect, foundClues, conversationHistory, onUpdateConversation, onClose }) {

  const safeFoundClues = foundClues || [];
  const [availableFollowUps, setAvailableFollowUps] = useState({});

  const getDialogueOptions = () => {
    const options = [];

    // always available options
    options.push({
      id: 'who-are-you',
      text: `Who are you?`,
      responses: {
        all: `I'm ${suspect?.name || 'the suspect'}. ${suspect?.title || ''}. But you already knew that, detective.`
      }
    });

    options.push({
      id: 'where-were-you',
      text: `Where were you the night of the murder?`,
      responses: {
        'Vincent Cross': `I was working the bar all night. Dozens of people saw me.`,
        'Scarlett Deluxe': `In my office, doing paperwork. Alone, unfortunately.`,
        'Jester': `Performing on stage. The spotlight was on me all night.`,
        'Silas': `Setting up for the show. I'm always working in the shadows.`,
        all: suspect?.status || 'I was around.'
      }
    });

    // clue specific options
    if (safeFoundClues.includes('bloody_knife')) {
      options.push({
        id: 'about-knife',
        text: `This knife was found at the scene. Care to explain?`,
        responses: {
        'Vincent Cross': `That's from the magic act! I was dealing cards, not stage props. Talk to the performers.`,
        'Scarlett Deluxe': `A cheap theatrical piece. We have dozens like it backstage. Anyone could have taken one.`,
        'Jester': `That's MY knife! Someone must have stolen it from my dressing room to frame me!`,
        'Silas': `That's a standard prop knife. I maintain them all. It could have come from any of the acts.`,
        all: `That's a prop from the magic act. Could have been taken by anyone.`
      }
      });
    }

    if (safeFoundClues.includes('torn_ticket')) {
      options.push({
        id: 'about-ticket',
        text: `We found a VIP ticket with lipstick at the scene.`,
        responses: {
        'Vincent Cross': `Scarlett hands those out to her favorites. I focus on the high rollers, not the freebies.`,
        'Scarlett Deluxe': `I'm generous with compliments. Half the city has one of my tickets. Means nothing.`,
        'Jester': `Another of Scarlett's admirers. She collects them like trophies.`,
        'Silas': `I clean those up after every show. People leave them everywhere.`,
        all: `VIP tickets are common here. Doesn't prove anything.`
      }
      });
    }

    if (safeFoundClues.includes('stagehand_glove')) {
      options.push({
        id: 'about-glove',
        text: `We found a stagehand's glove near the body.`,
        responses: {
        'Vincent Cross': `Not my department. I deal with cards, not carpentry.`,
        'Scarlett Deluxe': `My staff is provided uniforms. That could belong to any of them.`,
        'Jester': `Probably that quiet one, Silas. He's always losing things.`,
        'Silas': `I... I must have dropped it during setup. I'm always back and forth through that alley.`,
        all: `Stagehands come and go all night. Could be anyone's.`
      },
      followUps: {
            'Jester': [
              {
                id: 'followup-silas',
                text: `Why do you think it's Silas?`,
                response: `The man's a walking disaster! Always dropping things, forgetting cues. I'm surprised the club hasn't fired him yet.`
              }
            ]
          }
      });
    }

    if (safeFoundClues.includes('ace_of_spades')) {
      options.push({
        id: 'about-card',
        text: `The victim was holding the Ace of Spades. What does it mean?`,
        responses: {
        'Vincent Cross': `In my game, that's the death card. Ace was sending a message about the stakes.`,
        'Scarlett Deluxe': `Dramatic to the end. Probably just another of his cheap tricks.`,
        'Jester': `The Ace of Spades? That's my signature card! He's trying to frame me from beyond the grave!`,
        'Silas': `The Ace... that was our act's name once. "The Two Aces." Before he went solo.`,
        all: `Could mean anything. Ace was always theatrical.`
      },
      followUps: {
      'Silas': [
        {
          id: 'followup-two-aces',
          text: `"The Two Aces?" What happened to the partnership?`,
          response: `He got greedy. Took the act solo and left me with nothing. The club, the fame... all his.`
        }
      ]
    }
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

  const handleFollowUpSelect = (followUp, parentOptionId) => {
        const newEntries = [
        {
          speaker: 'player',
          text: followUp.text,
          timestamp: new Date()
        },
        {
          speaker: 'suspect',
          text: followUp.response,
          timestamp: new Date()
        }
      ];

      setAvailableFollowUps(prev => {
        const updated = {...prev};
        delete updated[parentOptionId];
        return updated;
      });
      
      onUpdateConversation(suspect.id, newEntries);
    }


  const handleOptionSelect = (option) => {
    const response = option.responses[suspect?.name] || option.responses.all;
    const newEntries = [
      {
        speaker: 'player',
        text: option.text,
        timestamp: new Date()
      },
      {
        speaker: 'suspect',
        text: response,
        timestamp: new Date()
      }
    ];

    if(option.followUps && option.followUps[suspect?.name]){
      setAvailableFollowUps(prev => ({
        ...prev,
        [option.id]: option.followUps[suspect.name]
      }));
    }
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
        <div className="suspect-info-container">
          <div className="suspect-dialogue-avatar">
            <img src={suspect?.avatar} alt={suspect?.name} />
          </div>
          <div className="suspect-details">
          <h2> {suspect?.name || 'Suspect'}</h2>
              <p className="suspect-title">{suspect?.title}</p>
              <p className="suspect-description">
                {suspect?.description || `You're speaking with ${suspect?.name}.`}
                </p>
            </div>
          </div>
          <button className="close-dialogue-btn" onClick={onClose}>✕</button>
        </div>

        <div className="dialogue-content">
          
          <div className="dialogue-history">
            {conversationHistory.map((entry, index) => (
              <div key={index} 
              className={`dialogue-bubble ${entry.speaker}`}>
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

        {Object.entries(availableFollowUps).map(([parentOptionId, followUpList]) => (
        <div key={parentOptionId} className="follow-up-section">
          <div className="follow-up-label">Follow-up:</div>
          {followUpList.map((followUp, index) => (
            <button
              key={`${parentOptionId}-${index}`}
              className="dialogue-option follow-up-option"
              onClick={() => handleFollowUpSelect(followUp, parentOptionId)}
            >
              {followUp.text}
            </button>
          ))}
        </div>
        ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SuspectDialogue;