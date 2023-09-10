import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.jsx'
import Login from './Login.jsx'
import reportWebVitals from './reportWebVitals.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Login />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();