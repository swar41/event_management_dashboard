// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import './index.css'; // Ensure you have this file for base styles
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: For measuring performance
reportWebVitals();