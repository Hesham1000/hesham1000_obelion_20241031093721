import React, { useState } from 'react';
import './PaymentPage.css';
import axios from 'axios';

function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/payment/processPayment', {
        paymentMethod: 'Credit/Debit Card',
        details: { cardNumber, expiryDate, cvv }
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error processing payment');
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/payment/getTransactionHistory');
      setTransactionHistory(response.data);
    } catch (error) {
      alert('Error fetching transaction history');
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/payment/downloadInvoices');
      setInvoices(response.data);
    } catch (error) {
      alert('Error downloading invoices');
    }
  };

  return (
    <div className="payment-page">
      <header className="payment-header">
        <img src="/logo.png" alt="Company Logo" className="company-logo" />
        <h1>Payment Processing</h1>
      </header>
      <nav className="payment-nav">
        <ul>
          <li>Credit/Debit Cards</li>
          <li>Digital Wallets</li>
          <li>Insurance</li>
        </ul>
      </nav>
      <section className="payment-form-section">
        <form className="payment-form" onSubmit={handlePaymentSubmit}>
          <div className="form-group">
            <label htmlFor="card-number">Card Number</label>
            <input type="text" id="card-number" name="card-number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="expiry-date">Expiry Date</label>
            <input type="text" id="expiry-date" name="expiry-date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" value={cvv} onChange={e => setCvv(e.target.value)} />
          </div>
          <button type="submit" className="make-payment-button">Make Payment</button>
        </form>
      </section>
      <section className="transaction-history">
        <button onClick={fetchTransactionHistory} className="transaction-history-link">View Transaction History</button>
        <button onClick={fetchInvoices} className="download-invoice-link">Download Invoices</button>
        <div>
          {transactionHistory.map((transaction, index) => (
            <div key={index}>{JSON.stringify(transaction)}</div>
          ))}
        </div>
        <div>
          {invoices.map((invoice, index) => (
            <div key={index}>{JSON.stringify(invoice)}</div>
          ))}
        </div>
      </section>
      <footer className="payment-footer">
        <p><a href="/terms-of-service">Terms of Service</a></p>
        <p><a href="/privacy-policy">Privacy Policy</a></p>
        <p><a href="/contact">Contact Us</a></p>
      </footer>
    </div>
  );
}

export default PaymentPage;
