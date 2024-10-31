import React, { useState } from 'react';
import './TwoFactorAuthentication.css';
import axios from 'axios';

const TwoFactorAuthentication = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);

  const handleAuthentication = async () => {
    setError('');
    try {
      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/utils/encryptionUtils', {
        email,
        code
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setError('Authentication failed. Please check your email and code.');
    }
  };

  return (
    <div className="two-factor-auth">
      <header className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Security Measures</h1>
      </header>
      <nav className="nav-tabs">
        <a href="#encryption">Encryption</a>
        <a href="#authentication">Authentication</a>
      </nav>
      <form className="auth-form">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />

        <label htmlFor="code">Authentication Code</label>
        <input type="text" id="code" value={code} onChange={handleCodeChange} />

        <button type="button" onClick={handleAuthentication} className="primary-action">
          Authenticate
        </button>
      </form>
      {isAuthenticated && <p>Authentication Successful!</p>}
      {error && <p className="error-message">{error}</p>}
      <footer className="footer">
        <p>© 2023 Your Company. All rights reserved.</p>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms and Conditions</a>
      </footer>
    </div>
  );
};

export default TwoFactorAuthentication;
