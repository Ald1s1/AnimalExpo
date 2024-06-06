import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are very passionate about animals and aim to provide the best information about various pets.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contacts</h4>
          <p>Email: animalexpo@gmail.com</p>
          <p>Phone: +355 6965 43 234</p>
        </div>
      </div>
      <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Animal Expo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
