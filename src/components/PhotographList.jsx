import { useState } from 'react';
import './PhotographList.css';

function PhotographList({ photographs, onPhotoSelect }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo.id);
    onPhotoSelect(photo);
  };

  return (
    <div className="photograph-list">
      <h2>Evidence Board</h2>
      
      <div className="photos-grid">
        {photographs.map(photo => (
          <div 
            key={photo.id}
            className={`photo-item ${selectedPhoto === photo.id ? 'selected' : ''}`}
            onClick={() => handlePhotoClick(photo)}
          >
            <img src={photo.thumbnail} alt={photo.title} />
            <div className="photo-overlay">
              <span>{photo.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotographList;