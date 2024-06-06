import React, { useState, useEffect } from 'react';
import './AddCatForm.css';

function EditDogForm({ dog, onDogUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    kind: '',
    shortDescription: '',
    fullDescription: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (dog) {
      setFormData({
        name: dog.name,
        age: dog.age,
        gender: dog.gender,
        kind: dog.kind,
        shortDescription: dog.shortDescription,
        fullDescription: dog.fullDescription,
        imageUrl: dog.imageUrl
      });
    }
  }, [dog]);

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

    fetch(`http://localhost:3000/dogs/${dog._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(updatedDog => {
        onDogUpdated(updatedDog);
      })
      .catch(error => console.error('Error updating dog:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="cat-form">
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
      <select 
        className='gender'
        name="gender-update"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value=''>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        type="text"
        name="kind"
        value={formData.kind}
        onChange={handleChange}
        placeholder="Kind"
        required
      />
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
      <button type="submit">Update Dog</button>
      <button type="button" className="cancel" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditDogForm;
