import React, { useState } from 'react';
import './AuthenticationPage.css';
import axios from 'axios';

function AuthenticationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/utils/encryptionUtils', {
        username,
        password,
        twoFactorCode
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="authentication-page">
      <header className="header">
        <div className="logo">System Logo</div>
        <h1>Security Measures</h1>
      </header>
      <nav className="navigation-tabs">
        <ul>
          <li><a href="#encryption">Encryption</a></li>
          <li><a href="#authentication">Authentication</a></li>
        </ul>
      </nav>
      <main className="form-container">
        <form className="encryption-authentication-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-field">
            <label htmlFor="2fa-code">Two-Factor Code</label>
            <input type="text" id="2fa-code" name="2fa-code" value={twoFactorCode} onChange={(e) => setTwoFactorCode(e.target.value)} required />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="primary-action-button">Submit</button>
        </form>
        <div className="additional-links">
          <a href="/help">Need Help?</a>
          <a href="/contact">Contact Us</a>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2023 Company Name</p>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms and Conditions</a>
      </footer>
    </div>
  );
}

export default AuthenticationPage;
