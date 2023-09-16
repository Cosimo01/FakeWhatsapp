/*** IMPORT DEI MODULI ***/
import React from 'react';
import { Routes, Route } from 'react-router-dom';
/*** FINE ***/


/*** IMPORT DEI COMPONENTI ***/
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import Signup from './pages/Signup'
import Chat from './pages/Chat';
import Help from './pages/Help'
/*** FINE ***/


/*** IMPORT DELLO STILE ***/
import 'bootstrap/dist/css/bootstrap.min.css';
/*** FINE ***/





/**********************************************/

function App() {
  return (
    <div id="container">
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/chat/:UserName" element={<Chat />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </div>
  );
}

export default App;

reportWebVitals();