import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/register', {
        email,
        phone,
        socialMedia
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/sms/send', {
          phoneNumber: phone,
          message: 'Registration successful!'
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <img src="logo.png" alt="App Logo" className="app-logo" />
        <h1>User Registration</h1>
      </header>
      <div className="register-form">
        <h2>Register using Email or Phone</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <h2>Or register using Social Media</h2>
        <button onClick={() => setSocialMedia('facebook')}>Facebook</button>
        <button onClick={() => setSocialMedia('google')}>Google</button>
        <button onClick={() => setSocialMedia('twitter')}>Twitter</button>
        <button className="register-button" onClick={handleRegister}>Register</button>
        <div className="additional-links">
          <a href="/terms">Terms and Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
      <footer className="register-footer">
        <a href="/contact">Contact Us</a>
        <a href="/about">About Us</a>
        <a href="/help">Help</a>
      </footer>
    </div>
  );
}

export default RegisterPage;
