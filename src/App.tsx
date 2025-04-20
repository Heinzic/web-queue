import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HandleAppointment from './HOC/HandleAppointment';
import {nav, SelectOfficeAndServicePage, AppointmentDateTimePage, HomePage, CancelAppointmentPage, LocationSelectionPage, EnterDataPage, ConfirmAppointmentPage} from './pages'
import './App.css';
import { useAppDispatch } from './store/hooks';
import { setUserData } from './store/appointmentSlice';
import { UserService } from './services/UserService';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUserData = UserService.loadUserData();
    if (storedUserData && UserService.isValidUserData(storedUserData)) {
        dispatch(setUserData(storedUserData));
    }
  }, []);

  return (  
    <div className="widget-container">
        <HashRouter>
          <div className="queue-content">
            <HandleAppointment>
              <Routes>
                <Route path={nav.index()} element={<HomePage />} />
                <Route path={nav.cancelAppointment()} element={<CancelAppointmentPage />} />
                <Route path={nav.selectLocation()} element={<LocationSelectionPage />} />
                <Route path={nav.selectOffice()} element={<SelectOfficeAndServicePage />} />
                <Route path={nav.appointmentDateTime()} element={<AppointmentDateTimePage />} />
                <Route path={nav.enterData()} element={<EnterDataPage />} />
                <Route path={nav.confirmAppointment()} element={<ConfirmAppointmentPage />} />
              </Routes>
            </HandleAppointment>
          </div>
        </HashRouter>
    </div>
  );
};

export default App;