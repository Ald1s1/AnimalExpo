import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatsPage from './pages/CatsPage';
import DogsPage from './pages/DogsPage';
import BirdsPage from './pages/BirdsPage';
import ContactUsPage from './pages/ContactUsPage';
import AboutUsPage from './pages/AboutUsPage';
import Header from './components/Header';
import Footer from './components/Footer'; 
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cats" element={<CatsPage />} />
        <Route path="/cats/:id" element={<CatsPage />} />
        <Route path="/dogs" element={<DogsPage />} />
        <Route path="/dogs/:id" element={<DogsPage />} />
        <Route path="/birds" element={<BirdsPage />} />
        <Route path="/birds/:id" element={<BirdsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
