// src/components/EventManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCalendar from './EventCalendar';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async () => {
    try {
      if (eventId) {
        await axios.put(`http://localhost:3000/api/events/${eventId}`, {
          name: eventName,
          location: eventLocation,
          date: eventDate,
        });
      } else {
        const response = await axios.post('http://localhost:3000/api/events', {
          name: eventName,
          location: eventLocation,
          date: eventDate,
        });
        setEvents([...events, response.data]);
      }
      clearForm();
      fetchEvents();
    } catch (error) {
      console.error('Error adding/updating event:', error);
    }
  };

  const handleEditEvent = (event) => {
    setEventId(event._id);
    setEventName(event.name);
    setEventLocation(event.location);
    setEventDate(event.date);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const clearForm = () => {
    setEventId(null);
    setEventName('');
    setEventLocation('');
    setEventDate('');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Event Management</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }} className="mb-4">
        <div className="form-row">
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="date"
              className="form-control"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Save Event</button>
        </div>
      </form>
      
      {/* Integrate Event Calendar */}
      <EventCalendar events={events} />

      <ul className="list-group">
        {events.map(event => (
          <li key={event._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{event.name}</strong> - {event.location} ({event.date})
            </div>
            <div>
              <button className="btn btn-warning btn-sm" onClick={() => handleEditEvent(event)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManagement;
