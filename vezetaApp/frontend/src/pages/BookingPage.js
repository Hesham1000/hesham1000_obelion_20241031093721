import React, { useState } from 'react';
import './BookingPage.css';
import axios from 'axios';

function BookingPage() {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const searchProviders = async () => {
    try {
      const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/providers/search', {
        params: { specialty, location, availability: availability === 'true' },
        headers: { 'Content-Type': 'application/json' }
      });
      setProviders(response.data.providers);
    } catch (error) {
      alert('Error fetching providers');
    }
  };

  const scheduleAppointment = async () => {
    if (!selectedProvider) return;
    try {
      const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/appointments/schedule', {
        providerId: selectedProvider.id,
        appointmentDate: new Date().toISOString()
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Appointment scheduled and added to your calendar.');
    } catch (error) {
      alert('Error scheduling appointment');
    }
  };

  return (
    <div className="booking-page">
      <header className="header">
        <div className="branding">VezetaApp</div>
        <h1>Appointment Scheduling</h1>
        <nav className="navigation">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="/appointments">Appointments</a>
          <a href="/help">Help</a>
        </nav>
      </header>
      <main className="main-content">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
          <button onClick={searchProviders}>Search Providers</button>
        </div>
        <div className="provider-list">
          {providers.map(provider => (
            <div key={provider.id} className="provider-item">
              <h3>{provider.name}</h3>
              <p>Specialty: {provider.specialty}</p>
              <p>Availability: {provider.availability}</p>
              <button onClick={() => setSelectedProvider(provider)}>Select Provider</button>
            </div>
          ))}
        </div>
        {selectedProvider && (
          <div className="schedule-section">
            <h2>Schedule Appointment with {selectedProvider.name}</h2>
            <button onClick={scheduleAppointment}>Schedule Appointment</button>
          </div>
        )}
      </main>
      <footer className="footer">
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/contact">Contact Information</a>
      </footer>
    </div>
  );
}

export default BookingPage;
