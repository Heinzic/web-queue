import { HashRouter, Routes, Route } from 'react-router-dom';
import HandleAppointment from './HOC/HandleAppointment';
import {nav, SelectOfficeAndServicePage, AppointmentDateTimePage, HomePage, CancelAppointmentPage, LocationSelectionPage, EnterDataPage, ConfirmAppointmentPage, AppointmentSuccessPage} from './pages'
import './App.css';

const App: React.FC = () => {
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
                <Route path={nav.appointmentSuccess()} element={<AppointmentSuccessPage />} />
              </Routes>
            </HandleAppointment>
          </div>
        </HashRouter>
    </div>
  );
};

export default App;