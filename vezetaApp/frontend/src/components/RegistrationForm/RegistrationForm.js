import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [socialMedia, setSocialMedia] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/register', {
        email,
        phone,
        socialMedia,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        alert('User registered successfully');
        // Redirect to dashboard or another page if needed
      }
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="registration-form">
      <header className="registration-header">
        <img src="/logo.png" alt="App Logo" className="logo" />
        <h1>User Registration</h1>
      </header>
      <div className="form-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="social-media">
          <button onClick={() => setSocialMedia('Facebook')}>Facebook</button>
          <button onClick={() => setSocialMedia('Google')}>Google</button>
        </div>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        <div className="additional-links">
          <a href="/terms">Terms and Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
      <footer className="registration-footer">
        <a href="/contact">Contact Us</a>
        <a href="/about">About Us</a>
        <a href="/help">Help</a>
      </footer>
    </div>
  );
}

export default RegistrationForm;
