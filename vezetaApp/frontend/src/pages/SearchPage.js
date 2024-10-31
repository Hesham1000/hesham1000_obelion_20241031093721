import React, { useState } from 'react';
import './SearchPage.css';
import axios from 'axios';

function SearchPage() {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');

  const searchProviders = async () => {
    try {
      const response = await axios.get('https://vezetaApp-backend.cloud-stacks.com/api/providers/search', {
        params: {
          specialty,
          location,
          availability
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setProviders(response.data.providers);
    } catch (error) {
      alert('Error fetching providers');
    }
  };

  const scheduleAppointment = async () => {
    if (selectedProvider && appointmentDate) {
      try {
        const response = await axios.post('https://vezetaApp-backend.cloud-stacks.com/api/appointments/schedule', {
          providerId: selectedProvider.id,
          appointmentDate
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        alert(`Appointment scheduled with ${selectedProvider.name} on ${appointmentDate}`);
        setAppointmentDate('');
        setSelectedProvider(null);
      } catch (error) {
        alert('Error scheduling appointment');
      }
    }
  };

  return (
    <div className="appointment-scheduling">
      <header>
        <div className="branding">Vezeta</div>
        <h1>Appointment Scheduling</h1>
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
          <button onClick={searchProviders}>Search</button>
        </div>
        <div className="provider-list">
          {providers.map((provider) => (
            <div key={provider.id} onClick={() => setSelectedProvider(provider)}>
              <h2>{provider.name}</h2>
              <p>Specialty: {provider.specialty}</p>
              <p>Availability: {provider.availability}</p>
            </div>
          ))}
        </div>
        {selectedProvider && (
          <div className="appointment-scheduler">
            <h2>Schedule with {selectedProvider.name}</h2>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <button onClick={scheduleAppointment}>Schedule Appointment</button>
          </div>
        )}
      </main>
      <footer>
        <ul>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Contact</li>
        </ul>
      </footer>
    </div>
  );
}

export default SearchPage;
