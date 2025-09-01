import './SuspectPanel.css';

function SuspectPanel({ suspects, onSuspectSelect }) {
  return (
    <div className="suspect-panel">
      <h2>Persons of Interest</h2>
      
      <div className="suspects-grid">
        {suspects.map(suspect => (
          <div 
            key={suspect.id}
            className="suspect-card"
            onClick={() => onSuspectSelect(suspect)}
          >
            <div className="suspect-avatar">
              {suspect.emoji}
            </div>
            <div className="suspect-info">
              <h3>{suspect.name}</h3>
              <p className="suspect-title">{suspect.title}</p>
              <p className="suspect-status">{suspect.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuspectPanel;