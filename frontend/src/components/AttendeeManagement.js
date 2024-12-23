// src/components/AttendeeManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendeeId, setAttendeeId] = useState(null);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/attendees');
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  const handleAddAttendee = async () => {
    try {
      if (attendeeId) {
        await axios.put(`http://localhost:3000/api/attendees/${attendeeId}`, {
          name: attendeeName,
          email: attendeeEmail,
        });
      } else {
        const response = await axios.post('http://localhost:3000/api/attendees', {
          name: attendeeName,
          email: attendeeEmail,
        });
        setAttendees([...attendees, response.data]);
      }
      clearForm();
      fetchAttendees();
    } catch (error) {
      console.error('Error adding/updating attendee:', error);
    }
  };

  const handleEditAttendee = (attendee) => {
    setAttendeeId(attendee._id);
    setAttendeeName(attendee.name);
    setAttendeeEmail(attendee.email);
  };

  const handleDeleteAttendee = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/attendees/${id}`);
      fetchAttendees();
    } catch (error) {
      console.error('Error deleting attendee:', error);
    }
  };

  const clearForm = () => {
    setAttendeeId(null);
    setAttendeeName('');
    setAttendeeEmail('');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Attendee Management</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddAttendee(); }} className="mb-4">
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Attendee Name"
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Attendee Email"
              value={attendeeEmail}
              onChange={(e) => setAttendeeEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Save Attendee</button>
        </div>
      </form>
      <ul className="list-group">
        {attendees.map(attendee => (
          <li key={attendee._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{attendee.name}</strong> - {attendee.email}
            </div>
            <div>
              <button className="btn btn-warning btn-sm" onClick={() => handleEditAttendee(attendee)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAttendee(attendee._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeManagement;