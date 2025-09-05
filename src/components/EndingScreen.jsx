import { useState } from 'react';

import './EndingScreen.css';

function EndingScreen({ accusedSuspect, isCorrect, onRestart, caseSolution}){
    const [showSolution, setShowSolution] = useState(false);
    return(
         <div className="ending-overlay">
      <div className="ending-container">
        
        <div className="ending-header">
          <h1>{isCorrect ? 'CASE SOLVED' : 'WRONG ACCUSATION'}</h1>
          <div className="ending-subtitle">
            {isCorrect ? 'Justice is served' : 'The killer remains free'}
          </div>
        </div>

        <div className="ending-content">
          {isCorrect ? (
            <div className="correct-ending">
              <p>You've identified the real killer: <strong>{accusedSuspect.name}</strong></p>
              <div className="ending-explanation">
                <h3>The Truth:</h3>
                <p>{caseSolution}</p>
              </div>
            </div>
          ) : (
            <div className="wrong-ending">
              <p>Your accusation against <strong>{accusedSuspect.name}</strong> didn't stick.</p>
              <p>The evidence wasn't strong enough to convince the commissioner.</p>
                
                {!showSolution ? (
                <div className="solution-prompt">
                  <p>Would you like to know the truth?</p>
                  <button 
                    className="reveal-solution-btn"
                    onClick={() => setShowSolution(true)}
                  >
                    REVEAL THE SOLUTION
                  </button>
                </div>
              ) : (
                <div className="ending-explanation">
                  <h3>The Real Solution:</h3>
                  <p>{caseSolution}</p>
                  <p className="hint">Remember this for your next case, detective...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="ending-actions">
          <button className="restart-button" onClick={onRestart}>
            {isCorrect ? 'SOLVE ANOTHER CASE' : 'TRY AGAIN'}
          </button>
        </div>

      </div>
    </div>
    );
} export default EndingScreen;