import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddBirdForm from './AddBirdForm';
import EditBirdForm from './EditBirdForm';
import './DCBPage.css';

function BirdsPage() {
  const { id } = useParams();
  const [birds, setBirds] = useState([]);
  const [filteredBirds, setFilteredBirds] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);
  const [editingBird, setEditingBird] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isAddBirdFormVisible, setAddBirdFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/birds')
      .then(response => response.json())
      .then(data => {
        setBirds(data);
        setFilteredBirds(data); 
      })
      .catch(error => console.error('Error fetching birds:', error));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/birds/${id}`)
        .then(response => response.json())
        .then(data => setSelectedBird(data))
        .catch(error => console.error('Error fetching bird:', error));
    }
  }, [id]);

  const handleViewMore = (bird) => {
    setSelectedBird(bird);
  };

  const closePopup = () => {
    setSelectedBird(null);
    setEditingBird(null);
    setAddBirdFormVisible(false);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchInput(query);
    filterBirds(query);
  };

  const filterBirds = (query) => {
    const filteredResults = birds.filter(bird =>
      bird.name.toLowerCase().includes(query.toLowerCase()) ||
      bird.kind.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBirds(filteredResults);
  };

  const handleBirdAdded = (newBird) => {
    setBirds([...birds, newBird]);
    setFilteredBirds([...birds, newBird]);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/birds/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      setBirds(birds.filter(bird => bird._id !== id));
      setFilteredBirds(filteredBirds.filter(bird => bird._id !== id));
    })
    .catch(error => console.error('Error deleting bird:', error));
  };

  const handleBirdUpdated = (updatedBird) => {
    setBirds(birds.map(bird => (bird._id === updatedBird._id ? updatedBird : bird)));
    setFilteredBirds(filteredBirds.map(bird => (bird._id === updatedBird._id ? updatedBird : bird)));
    setEditingBird(null);
  };

  const startEditing = (bird) => {
    setEditingBird(bird);
  };

  return (
    <div className="DCB-page">
      <h1 className="welcome-text">Welcome to the Birds Page!</h1>
      <p className="welcome-subtext">Discover various kinds of birds with their details below.</p>

      <div className="sidebar-container">
        <div className="not-looking-for-box">
          <p className="not-looking-for-text">Not what you're looking for?</p>
          <Link to="/cats">
            <button className="navigate-button">Go to Cats Page</button>
          </Link>
          <Link to="/dogs">
            <button className="navigate-button">Go to Dogs Page</button>
          </Link>
        </div>
      </div>
      
      <button 
        onClick={() => setAddBirdFormVisible(true)} 
        className='Add-cat-button'
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      
      <input
        type="text"
        placeholder="Search birds..."
        value={searchInput}
        onChange={handleSearchInputChange}
        className="search-bar"
      />

      <div className="DCB-cards-container">
        {filteredBirds.map(bird => (
          <div key={bird._id} className="DCB-card">
            <img src={bird.imageUrl} alt={bird.name} className="DCB-image" />
            <h2>{bird.name}</h2>
            <p>Age: {bird.age}</p>
            <p>Gender: {bird.gender}</p>
            <p>Kind: {bird.kind}</p>
            <p>{bird.shortDescription}</p>
            <button onClick={() => handleViewMore(bird)}>View More</button>
            <button onClick={() => handleDelete(bird._id)}>Delete</button>
            <button onClick={() => startEditing(bird)}>Update</button>
          </div>
        ))}
      </div>

      {selectedBird && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedBird.name}</h2>
            <p>Age: {selectedBird.age}</p>
            <p>Gender: {selectedBird.gender}</p>
            <p>Kind: {selectedBird.kind}</p>
            <p>{selectedBird.fullDescription}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {editingBird && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <EditBirdForm
              bird={editingBird}
              onBirdUpdated={handleBirdUpdated}
              onCancel={closePopup}
            />
          </div>
        </div>
      )}

      {isAddBirdFormVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <AddBirdForm 
              onBirdAdded={(newBird) => {
                handleBirdAdded(newBird);
                setAddBirdFormVisible(false); 
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BirdsPage;
