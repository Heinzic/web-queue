import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CancelAppointmentPage from './pages/CancelAppointmentPage';
import SelectOfficePage from './pages/SelectOfficeAndServicePage';
import LocationSelectionPage from './pages/LocationSelectionPage';
import AppointmentDateTimePage from './pages/AppointmentDateTimePage';
import HandleAppointment from './HOC/handleAppointment';

const App: React.FC = () => {
  return (
    <div className="widget-container">
      <HashRouter>
        <div className="queue-content">
          <HandleAppointment>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cancel-appointment" element={<CancelAppointmentPage />} />
              <Route path="/select-location" element={<LocationSelectionPage />} />
              <Route path="/select-office" element={<SelectOfficePage />} />
              <Route path="/appointment-datetime" element={<AppointmentDateTimePage />} />
            </Routes>
          </HandleAppointment>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;