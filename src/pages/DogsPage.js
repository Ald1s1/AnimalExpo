import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddDogForm from './AddDogForm';
import EditDogForm from './EditDogForm';
import './DCBPage.css';

function DogsPage() {
  const { id } = useParams();
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [editingDog, setEditingDog] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isAddDogFormVisible, setAddDogFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(data => {
        setDogs(data);
        setFilteredDogs(data); 
      })
      .catch(error => console.error('Error fetching dogs:', error));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/dogs/${id}`)
        .then(response => response.json())
        .then(data => setSelectedDog(data))
        .catch(error => console.error('Error fetching dog:', error));
    }
  }, [id]);

  const handleViewMore = (dog) => {
    setSelectedDog(dog);
  };

  const closePopup = () => {
    setSelectedDog(null);
    setEditingDog(null);
    setAddDogFormVisible(false);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchInput(query);
    filterDogs(query);
  };

  const filterDogs = (query) => {
    const filteredResults = dogs.filter(dog =>
      dog.name.toLowerCase().includes(query.toLowerCase()) ||
      dog.kind.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDogs(filteredResults);
  };

  const handleDogAdded = (newDog) => {
    setDogs([...dogs, newDog]);
    setFilteredDogs([...dogs, newDog]);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      setDogs(dogs.filter(dog => dog._id !== id));
      setFilteredDogs(filteredDogs.filter(dog => dog._id !== id));
    })
    .catch(error => console.error('Error deleting dog:', error));
  };

  const handleDogUpdated = (updatedDog) => {
    setDogs(dogs.map(dog => (dog._id === updatedDog._id ? updatedDog : dog)));
    setFilteredDogs(filteredDogs.map(dog => (dog._id === updatedDog._id ? updatedDog : dog)));
    setEditingDog(null);
  };

  const startEditing = (dog) => {
    setEditingDog(dog);
  };

  return (
    <div className="DCB-page">
      <h1 className="welcome-text">Welcome to the Dogs Page!</h1>
      <p className="welcome-subtext">Discover various kinds of dogs with their details below.</p>

      <div className="sidebar-container">
        <div className="not-looking-for-box">
          <p className="not-looking-for-text">Not what you're looking for?</p>
          <Link to="/cats">
            <button className="navigate-button">Go to Cats Page</button>
          </Link>
          <Link to="/birds">
            <button className="navigate-button">Go to Birds Page</button>
          </Link>
        </div>
      </div>

      
      <button 
        onClick={() => setAddDogFormVisible(true)} 
        className='Add-cat-button'
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search dogs..."
        value={searchInput}
        onChange={handleSearchInputChange}
        className="search-bar"
      />

      <div className="DCB-cards-container">
        {filteredDogs.map(dog => (
          <div key={dog._id} className="DCB-card">
            <img src={dog.imageUrl} alt={dog.name} className="DCB-image" />
            <h2>{dog.name}</h2>
            <p>Age: {dog.age}</p>
            <p>Gender: {dog.gender}</p>
            <p>Kind: {dog.kind}</p>
            <p>{dog.shortDescription}</p>
            <button onClick={() => handleViewMore(dog)} >View More</button>
            <button onClick={() => handleDelete(dog._id)}>Delete</button>
            <button onClick={() => startEditing(dog)}>Update</button>
          </div>
        ))}
      </div>

      {selectedDog && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedDog.name}</h2>
            <p>Age: {selectedDog.age}</p>
            <p>Gender: {selectedDog.gender}</p>
            <p>Kind: {selectedDog.kind}</p>
            <p>{selectedDog.fullDescription}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {editingDog && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <EditDogForm
              dog={editingDog}
              onDogUpdated={handleDogUpdated}
              onCancel={closePopup}
            />
          </div>
        </div>
      )}

      {isAddDogFormVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <AddDogForm 
              onDogAdded={(newDog) => {
                handleDogAdded(newDog);
                setAddDogFormVisible(false); 
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DogsPage;
