import React from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import SearchProvider from './components/SearchProvider/SearchProvider';
import BookingAppointment from './components/BookingAppointment/BookingAppointment';
import Payment from './components/Payment/Payment';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import TwoFactorAuthentication from './components/TwoFactorAuthentication/TwoFactorAuthentication';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Our Service</h1>
      </header>
      <main>
        <RegistrationForm />
        <SearchProvider />
        <BookingAppointment />
        <Payment />
        <TransactionHistory />
        <TwoFactorAuthentication />
      </main>
    </div>
  );
}

export default App;
