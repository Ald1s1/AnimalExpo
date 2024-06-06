import React from 'react';
import './Slideshow.css';

function Slideshow({ data }) {
  return (
    <div className="slideshow">
      {data.map(item => (
        <div key={item._id} className="slideshow-card">
          <img src={item.imageUrl} alt={item.name} className="slideshow-image" />
          <h2>{item.name}</h2>
          <p>Age: {item.age}</p>
          <p>Gender: {item.gender}</p>
          <p>Kind: {item.kind}</p>
          <p>{item.shortDescription}</p>
        </div>
      ))}
    </div>
  );
}

export default Slideshow;
