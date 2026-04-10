import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';           // Kinetic Volt design tokens FIRST
import './components/theme.css'; // Component classes SECOND
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
