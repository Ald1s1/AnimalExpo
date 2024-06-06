import React from 'react';
import './ContactUsPage.css';

function ContactUsPage() {
  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us!</p>
        <form className="contact-form">
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Message:
            <textarea name="message" rows="5" required></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
