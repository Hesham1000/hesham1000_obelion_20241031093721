import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SearchProvider.css';
import axios from 'axios';

function SearchProvider() {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  
  const searchProviders = async () => {
    try {
      const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/providers/search', {
        params: {
          specialty,
          location,
          availability
        }
      });
      setProviders(response.data.providers);
    } catch (error) {
      alert('Error fetching providers');
    }
  };

  const scheduleAppointment = async () => {
    try {
      if (selectedProvider) {
        const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/appointments/schedule', {
          providerId: selectedProvider.id,
          appointmentDate
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        alert(`Appointment confirmed with ${selectedProvider.name} on ${appointmentDate.toDateString()}`);
      }
    } catch (error) {
      alert('Error scheduling appointment');
    }
  };

  return (
    <div className="search-provider-container">
      <header>
        <div className="branding">Vezeta</div>
        <div className="title">Appointment Scheduling</div>
        <nav>
          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Appointments</li>
            <li>Help</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="search-form">
          <input
            type="text"
            placeholder="Specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
          <button onClick={searchProviders}>Search Providers</button>
        </div>
        <div className="provider-list">
          {providers.map((provider) => (
            <div key={provider.id} className="provider-item" onClick={() => setSelectedProvider(provider)}>
              <h3>{provider.name}</h3>
              <p>Specialty: {provider.specialty}</p>
              <p>Location: {provider.location}</p>
              <p>Availability: {provider.available ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
        {selectedProvider && (
          <div className="appointment-scheduler">
            <h2>Schedule Appointment with {selectedProvider.name}</h2>
            <Calendar onChange={setAppointmentDate} value={appointmentDate} />
            <button onClick={scheduleAppointment}>Schedule Appointment</button>
          </div>
        )}
      </main>
      <footer>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/contact">Contact</a>
      </footer>
    </div>
  );
}

export default SearchProvider;
