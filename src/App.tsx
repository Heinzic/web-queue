import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CancelAppointmentPage from './pages/CancelAppointmentPage';
import SelectClinicPage from './pages/SelectOfficePage';
import LocationSelectionPage from './pages/LocationSelectionPage';

const App: React.FC = () => {
  return (
    <div className="widget-container">
      <HashRouter>
        <div className="queue-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cancel-appointment" element={<CancelAppointmentPage />} />
            <Route path="/select-location" element={<LocationSelectionPage />} />
            <Route path="/select-clinic" element={<SelectClinicPage />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;