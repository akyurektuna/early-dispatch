import './AccusationScreen.css';
import { useState } from 'react';

function AccusationScreen({ suspects, onAccuse, onCancel}){
  const [showConfirmation, setShowConfirmation] = useState(false);
  
    return(
        <div className="accusation-overlay">
      <div className="accusation-container">
        
        <div className="accusation-header">
          <h2>MAKE YOUR ACCUSATION</h2>
          <p>Choose the suspect you believe is guilty</p>
        </div>
        <div className="suspects-grid">
          {suspects.map(suspect => (
            <div 
              key={suspect.id}
              className="accusation-suspect-card"
              onClick={() => onAccuse(suspect)}
            >
              <img 
                src={suspect.avatar} 
                alt={suspect.name}
                className="accusation-avatar"
              />
              <div className="accusation-suspect-info">
                <h3>{suspect.name}</h3>
                <p className="suspect-title">{suspect.title}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="cancel-accusation" onClick={onCancel}>
          NOT READY TO ACCUSE
        </button>

      </div>
    </div>
    );
} export default AccusationScreen;