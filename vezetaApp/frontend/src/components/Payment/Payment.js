import React, { useState } from 'react';
import './Payment.css';
import axios from 'axios';

function PaymentProcessing() {
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });
  const [walletId, setWalletId] = useState('');
  const [insuranceDetails, setInsuranceDetails] = useState({
    insuranceProvider: '',
    policyNumber: '',
  });

  const handleInputChange = (event, setState) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const paymentMethod = creditCardDetails.cardNumber ? 'Card' : walletId ? 'Wallet' : 'Insurance';
      const details = creditCardDetails.cardNumber ? creditCardDetails : walletId ? { walletId } : insuranceDetails;
      
      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/payment/processPayment', {
        paymentMethod,
        details,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleViewHistory = async () => {
    try {
      const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/payment/getTransactionHistory');
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleDownloadInvoices = async () => {
    try {
      const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/payment/downloadInvoices');
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="payment-processing">
      <header className="payment-header">
        <h1>Payment Processing</h1>
        <nav className="payment-nav">
          <ul>
            <li>Credit/Debit Cards</li>
            <li>Digital Wallets</li>
            <li>Insurance</li>
          </ul>
        </nav>
      </header>
      
      <section className="payment-details">
        <form onSubmit={handleSubmit}>
          <div className="payment-form-section">
            <h2>Credit/Debit Card</h2>
            <input type="text" name="cardNumber" placeholder="Card Number" onChange={(e) => handleInputChange(e, setCreditCardDetails)} />
            <input type="text" name="cardHolderName" placeholder="Card Holder Name" onChange={(e) => handleInputChange(e, setCreditCardDetails)} />
            <input type="text" name="expiryDate" placeholder="Expiry Date" onChange={(e) => handleInputChange(e, setCreditCardDetails)} />
            <input type="text" name="cvv" placeholder="CVV" onChange={(e) => handleInputChange(e, setCreditCardDetails)} />
          </div>
          <div className="payment-form-section">
            <h2>Digital Wallet</h2>
            <input type="text" name="walletId" placeholder="Wallet ID" onChange={(e) => setWalletId(e.target.value)} />
          </div>
          <div className="payment-form-section">
            <h2>Insurance</h2>
            <input type="text" name="insuranceProvider" placeholder="Insurance Provider" onChange={(e) => handleInputChange(e, setInsuranceDetails)} />
            <input type="text" name="policyNumber" placeholder="Policy Number" onChange={(e) => handleInputChange(e, setInsuranceDetails)} />
          </div>
          <button type="submit" className="make-payment-button">Make Payment</button>
        </form>
        
        <div className="transaction-history">
          <button onClick={handleViewHistory}>View Transaction History</button>
          <button onClick={handleDownloadInvoices}>Download Invoices</button>
        </div>
      </section>
      
      <footer className="payment-footer">
        <div className="footer-links">
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default PaymentProcessing;
