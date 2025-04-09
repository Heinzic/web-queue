import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import CancelAppointmentPage from './pages/CancelAppointmentPage';

const App: React.FC = () => {
  return (
      <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/cancel-appointment" element={<CancelAppointmentPage />} />
          </Routes>
      </HashRouter>
  );
};

export default App;