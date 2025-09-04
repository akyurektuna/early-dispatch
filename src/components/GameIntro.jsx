import './GameIntro.css';

function GameIntro({ onStartGame }){
return (
    <div className="intro-overlay">
      <div className="intro-container">
        
        <div className="intro-header">
          <h1>EARLY DISPATCH</h1>
          <div className="intro-subtitle">A Noir Mystery</div>
        </div>

        <div className="intro-content">
          <div className="intro-story">
            <h2>The Case</h2>
              Luca "Ace" Santoro, a washed-up magician, was found dead in the alley behind his own club. 
              Stabbed with a prop knife from his act. The murder happened during a blackout at the weekly 
              high-stakes poker game.
            <p>
              Everyone had motive. Everyone had opportunity. But only one person had the <em>means</em> to 
              make Ace disappear for good.
            </p>
          </div>

          <div className="intro-instructions">
            <h2>Your Investigation</h2>
            <div className="instruction-item">
              <strong>1. Examine Evidence</strong> - Click photographs to search for clues in close-up view.
            </div>
            <div className="instruction-item">
              <strong>2. Interview Suspects</strong> - Question persons of interest about the murder.
            </div>
            <div className="instruction-item">
              <strong>3. Connect the Clues</strong> - Use your journal to piece together the truth.
            </div>
            <div className="instruction-item">
              <strong>4. Find the Killer</strong> - Uncover who had the means, motive, and opportunity.
            </div>
          </div>

          <div className="intro-quote">
            <em>"In this city, everyone has a secret. Your job is to find the one that leads to murder."</em>
          </div>
        </div>

        <button className="intro-start-button" onClick={onStartGame}>
          BEGIN INVESTIGATION
        </button>

      </div>
    </div>
  );

} export default GameIntro;