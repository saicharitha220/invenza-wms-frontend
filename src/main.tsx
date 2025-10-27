import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your App component
import './index.css';

// Create root and render the App
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>
);
