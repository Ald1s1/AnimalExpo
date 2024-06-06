import React, { useState } from 'react';
import './AddCatForm.css';

function AddCatForm({ onCatAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    kind: '',
    shortDescription: '',
    fullDescription: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === '') {
        alert('Please fill in all fields.');
        return;
      }
    }

    fetch('http://localhost:3000/cats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(newCat => {
        onCatAdded(newCat);
        setFormData({
          name: '',
          age: '',
          gender: '',
          kind: '',
          shortDescription: '',
          fullDescription: '',
          imageUrl: ''
        });
      })
      .catch(error => console.error('Error adding cat:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="cat-form">
      <div className="input-group">
      <h1>Add a new cat!</h1>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
      </div>

      <select 
        className='gender'
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value=''>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      
      <div className="input-group">
        <input
          type="text"
          name="kind"
          value={formData.kind}
          onChange={handleChange}
          placeholder="Kind"
          required
        />
      </div>
      <textarea
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleChange}
        placeholder="Short Description"
        required
      />
      <textarea
        name="fullDescription"
        value={formData.fullDescription}
        onChange={handleChange}
        placeholder="Full Description"
        required
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />
      <button type="submit">Add Cat</button>
    </form>
  );
}

export default AddCatForm;
