import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../components/images/AnimalExpo.png'; 

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, handleClickOutside]);

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/about" className="nav-button">About Us</Link>
        <Link to="/contact" className="nav-button">Contact Us</Link>
      </div>
      <div className="nav-dropdown-container" ref={dropdownRef}>
        <span className="nav-label">Categories</span>
        <button className="nav-button nav-dropdown-button" onClick={toggleDropdown}>
          Animal Categories <span className="arrow">&#9660;</span>
        </button>
        {isDropdownOpen && (
          <div className="nav-dropdown">
            <Link to="/cats" className="nav-button" onClick={closeDropdown}>Cats</Link>
            <Link to="/dogs" className="nav-button" onClick={closeDropdown}>Dogs</Link>
            <Link to="/birds" className="nav-button" onClick={closeDropdown}>Birds</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
