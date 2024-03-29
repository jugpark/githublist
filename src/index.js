import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Index from './pages/mainPage/index'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
reportWebVitals();
