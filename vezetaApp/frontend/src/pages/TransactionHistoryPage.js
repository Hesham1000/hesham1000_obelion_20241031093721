import React, { useState } from 'react';
import './TransactionHistoryPage.css';
import axios from 'axios';

function TransactionHistoryPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [walletId, setWalletId] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');

  const handlePayment = async () => {
    try {
      const paymentMethod = cardNumber ? 'Credit/Debit Card' : walletId ? 'Digital Wallets' : 'Insurance';
      const details = {
        cardNumber,
        walletId,
        insuranceProvider,
      };
      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/payment/processPayment', {
        paymentMethod,
        details,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Payment processed successfully');
      }
    } catch (error) {
      alert('Error processing payment');
    }
  };

  const viewTransactionHistory = async () => {
    try {
      const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/payment/getTransactionHistory', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      alert('Error fetching transaction history');
    }
  };

  return (
    <div className="transaction-history-page">
      <header className="page-header">
        <img src="/logo.png" alt="Company Logo" className="company-logo" />
        <h1>Payment Processing</h1>
      </header>
      <nav className="payment-method-tabs">
        <ul>
          <li>Credit/Debit Card</li>
          <li>Digital Wallets</li>
          <li>Insurance</li>
        </ul>
      </nav>
      <section className="payment-details-section">
        <form className="payment-form">
          <div className="form-field">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="walletId">Wallet ID</label>
            <input type="text" id="walletId" value={walletId} onChange={(e) => setWalletId(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="insuranceProvider">Insurance Provider</label>
            <input type="text" id="insuranceProvider" value={insuranceProvider} onChange={(e) => setInsuranceProvider(e.target.value)} />
          </div>
        </form>
        <button onClick={viewTransactionHistory} className="transaction-history-link">
          View Transaction History
        </button>
      </section>
      <button className="make-payment-button" onClick={handlePayment}>Make Payment</button>
      <footer className="page-footer">
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
        <p>Contact Us</p>
      </footer>
    </div>
  );
}

export default TransactionHistoryPage;
