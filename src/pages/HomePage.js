import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CatImage from '../components/images/CatImage.jpg';
import DogImage from '../components/images/DogImage.jpg';
import BirdImage from '../components/images/BirdImage.jpg';
import Slideshow from '../components/Slideshow';
import './HomePage.css';

function HomePage() {
  const [slideshowData, setSlideshowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catResponse = await fetch('http://localhost:3000/cats');
        const catData = await catResponse.json();

        const dogResponse = await fetch('http://localhost:3000/dogs');
        const dogData = await dogResponse.json();

        const birdResponse = await fetch('http://localhost:3000/birds');
        const birdData = await birdResponse.json();

        const newItems = [
          ...catData.slice(-3),
          ...dogData.slice(-3),
          ...birdData.slice(-3)
        ];

        setSlideshowData(newItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="homepage-title">Welcome To Animal Expo!</h1>
      <div className="homepage-container">
        <div className="homepage-item">
          <Link to="/cats">
            <img src={CatImage} alt="Cats" className="homepage-image" />
            <div className="overlay">Cats</div>
          </Link>
        </div>
        <div className="homepage-item">
          <Link to="/dogs">
            <img src={DogImage} alt="Dogs" className="homepage-image" />
            <div className="overlay">Dogs</div>
          </Link>
        </div>
        <div className="homepage-item">
          <Link to="/birds">
            <img src={BirdImage} alt="Birds" className="homepage-image" />
            <div className="overlay">Birds</div>
          </Link>
        </div>
      </div>
      <div className="slideshow-container">
        <h2 className="slideshow-title">Recently Added Animals</h2>
        <Slideshow data={slideshowData} />
      </div>
    </div>
  );
}

export default HomePage;
