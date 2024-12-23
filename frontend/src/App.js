import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import EventManagement from './components/EventManagement';
import AttendeeManagement from './components/AttendeeManagement';
import TaskTracker from './components/TaskTracker';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<ProtectedRoute element={<EventManagement />} />} />
          <Route path="/attendees" element={<ProtectedRoute element={<AttendeeManagement />} />} />
          <Route path="/tasks" element={<ProtectedRoute element={<TaskTracker />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;