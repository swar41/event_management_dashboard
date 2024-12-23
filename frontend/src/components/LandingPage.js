import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css'; // Import custom CSS

const LandingPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Welcome to Event Management System</h1>
      <p className="lead">Manage your events, attendees, and tasks efficiently!</p>
      <div className="mt-4">
        <Link to="/events" className="btn btn-primary btn-lg m-2">Manage Events</Link>
        <Link to="/attendees" className="btn btn-success btn-lg m-2">Manage Attendees</Link>
        <Link to="/tasks" className="btn btn-warning btn-lg m-2">Manage Tasks</Link>
      </div>
    </div>
  );
};

export default LandingPage;
