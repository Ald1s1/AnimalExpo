import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getCats = async () => {
  try {
    const response = await axios.get(`${API_URL}/cats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cats:', error);
  }
};

export const searchCatsByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/cats/search`, { params: { name } });
    return response.data;
  } catch (error) {
    console.error('Error searching cats by name:', error);
  }
};


export const getBirds = async () => {
  try {
    const response = await axios.get(`${API_URL}/birds`);
    return response.data;
  } catch (error) {
    console.error('Error fetching birds:', error);
  }
};

export const searchBirdsByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/birds/search`, { params: { name } });
    return response.data;
  } catch (error) {
    console.error('Error searching birds by name:', error);
  }
};

export const getDogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/dogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
  }
};

export const searchDogsByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/dogs/search`, { params: { name } });
    return response.data;
  } catch (error) {
    console.error('Error searching dogs by name:', error);
  }
};