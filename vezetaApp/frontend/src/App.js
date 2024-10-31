import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import SearchProvider from './components/SearchProvider';
import BookingAppointment from './components/BookingAppointment';
import Payment from './components/Payment';
import TransactionHistory from './components/TransactionHistory';
import TwoFactorAuthentication from './components/TwoFactorAuthentication';

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
