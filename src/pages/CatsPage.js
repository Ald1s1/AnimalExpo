import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCatForm from './AddCatForm';
import EditCatForm from './EditCatForm';
import './DCBPage.css';

function CatsPage() {
  const { id } = useParams();
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isAddCatFormVisible, setAddCatFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/cats')
      .then(response => response.json())
      .then(data => {
        setCats(data);
        setFilteredCats(data); 
      })
      .catch(error => console.error('Error fetching cats:', error));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/cats/${id}`)
        .then(response => response.json())
        .then(data => setSelectedCat(data))
        .catch(error => console.error('Error fetching cat:', error));
    }
  }, [id]);

  const handleViewMore = (cat) => {
    setSelectedCat(cat);
  };

  const closePopup = () => {
    setSelectedCat(null);
    setEditingCat(null);
    setAddCatFormVisible(false);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchInput(query);
    filterCats(query);
  };

  const filterCats = (query) => {
    const filteredResults = cats.filter(cat =>
      cat.name.toLowerCase().includes(query.toLowerCase()) ||
      cat.kind.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCats(filteredResults);
  };

  const handleCatAdded = (newCat) => {
    setCats([...cats, newCat]);
    setFilteredCats([...cats, newCat]);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/cats/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      setCats(cats.filter(cat => cat._id !== id));
      setFilteredCats(filteredCats.filter(cat => cat._id !== id));
    })
    .catch(error => console.error('Error deleting cat:', error));
  };

  const handleCatUpdated = (updatedCat) => {
    setCats(cats.map(cat => (cat._id === updatedCat._id ? updatedCat : cat)));
    setFilteredCats(filteredCats.map(cat => (cat._id === updatedCat._id ? updatedCat : cat)));
    setEditingCat(null);
  };

  const startEditing = (cat) => {
    setEditingCat(cat);
  };

  return (
    <div className="DCB-page">
      <h1 className="welcome-text">Welcome to the Cats Page!</h1>
      <p className="welcome-subtext">Discover various kinds of cats with their details below.</p>
      
      <div className="sidebar-container">
        <div className="not-looking-for-box">
          <p className="not-looking-for-text">Not what you're looking for?</p>
          <Link to="/dogs">
            <button className="navigate-button">Go to Dogs Page</button>
          </Link>
          <Link to="/birds">
            <button className="navigate-button">Go to Birds Page</button>
          </Link>
        </div>
      </div>

      <button 
        onClick={() => setAddCatFormVisible(true)} 
        className='Add-cat-button'
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search cats..."
        value={searchInput}
        onChange={handleSearchInputChange}
        className="search-bar"
      />

      <div className="DCB-cards-container">
        {filteredCats.map(cat => (
          <div key={cat._id} className="DCB-card">
            <img src={cat.imageUrl} alt={cat.name} className="DCB-image" />
            <h2>{cat.name}</h2>
            <p>Age: {cat.age}</p>
            <p>Gender: {cat.gender}</p>
            <p>Kind: {cat.kind}</p>
            <p>{cat.shortDescription}</p>
            <button onClick={() => handleViewMore(cat)}>View More</button>
            <button onClick={() => handleDelete(cat._id)}>Delete</button>
            <button onClick={() => startEditing(cat)}>Update</button>
          </div>
        ))}
      </div>

      {selectedCat && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCat.name}</h2>
            <p>Age: {selectedCat.age}</p>
            <p>Gender: {selectedCat.gender}</p>
            <p>Kind: {selectedCat.kind}</p>
            <p>{selectedCat.fullDescription}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

      {editingCat && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <EditCatForm
              cat={editingCat}
              onCatUpdated={handleCatUpdated}
              onCancel={closePopup}
            />
          </div>
        </div>
      )}

      {isAddCatFormVisible && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <AddCatForm 
              onCatAdded={(newCat) => {
                handleCatAdded(newCat);
                setAddCatFormVisible(false); 
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CatsPage;
