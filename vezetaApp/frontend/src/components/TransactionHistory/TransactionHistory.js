import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionHistory.css';

function TransactionHistory() {
  const [selectedTab, setSelectedTab] = useState('creditCard');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    walletEmail: '',
    insuranceId: ''
  });

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    try {
      let details;

      if (selectedTab === 'creditCard') {
        details = {
          cardNumber: formData.cardNumber,
          cardHolderName: formData.cardHolderName,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv
        };
      } else if (selectedTab === 'digitalWallet') {
        details = { walletEmail: formData.walletEmail };
      } else if (selectedTab === 'insurance') {
        details = { insuranceId: formData.insuranceId };
      }

      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/payment/processPayment', {
        paymentMethod: selectedTab,
        details
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        alert('Payment processed successfully');
      }
    } catch (error) {
      alert('Something went wrong! Please try again.');
    }
  };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/payment/getTransactionHistory', {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
          setTransactionHistory(response.data);
        }
      } catch (error) {
        alert('Unable to fetch transaction history');
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <div className="payment-processing">
      <header>
        <h1>Payment Processing</h1>
        <div className="tabs">
          <button onClick={() => handleTabChange('creditCard')}>Credit/Debit Card</button>
          <button onClick={() => handleTabChange('digitalWallet')}>Digital Wallet</button>
          <button onClick={() => handleTabChange('insurance')}>Insurance</button>
        </div>
      </header>
      <main>
        {selectedTab === 'creditCard' && (
          <form className="payment-form">
            <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleInputChange} />
            <input type="text" name="cardHolderName" placeholder="Cardholder Name" onChange={handleInputChange} />
            <input type="text" name="expiryDate" placeholder="Expiry Date" onChange={handleInputChange} />
            <input type="text" name="cvv" placeholder="CVV" onChange={handleInputChange} />
          </form>
        )}
        {selectedTab === 'digitalWallet' && (
          <form className="payment-form">
            <input type="email" name="walletEmail" placeholder="Wallet Email" onChange={handleInputChange} />
          </form>
        )}
        {selectedTab === 'insurance' && (
          <form className="payment-form">
            <input type="text" name="insuranceId" placeholder="Insurance ID" onChange={handleInputChange} />
          </form>
        )}
        <a href="/transaction-history" className="transaction-history-link">View Transaction History</a>
      </main>
      <footer>
        <button className="make-payment-button" onClick={handlePayment}>Make Payment</button>
        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default TransactionHistory;
