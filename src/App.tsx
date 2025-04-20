import { HashRouter, Routes, Route } from 'react-router-dom';
import HandleAppointment from './HOC/HandleAppointment';
import {nav, SelectOfficeAndServicePage, AppointmentDateTimePage, HomePage, CancelAppointmentPage, LocationSelectionPage, EnterDataPage, ConfirmAppointmentPage, AppointmentSuccessPage} from './pages'
import './App.css';
import RouteGuard from './HOC/RouteGuard';

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
                <Route element={<RouteGuard requiredParams={['selectedOffice', 'selectedService']} redirectTo={nav.index()} />}>
                  <Route path={nav.appointmentDateTime()} element={<AppointmentDateTimePage />} />
                </Route>
                <Route element={<RouteGuard requiredParams={['selectedOffice', 'selectedService', 'timeSlot']} redirectTo={nav.index()} />}>
                  <Route path={nav.enterData()} element={<EnterDataPage />} />
                </Route>
                <Route element={<RouteGuard requiredParams={['userData', 'selectedOffice', 'selectedService', 'timeSlot']} redirectTo={nav.index()} />}>
                  <Route path={nav.confirmAppointment()} element={<ConfirmAppointmentPage />} />
                  <Route path={nav.appointmentSuccess()} element={<AppointmentSuccessPage />} />
                </Route>
              </Routes>
            </HandleAppointment>
          </div>
        </HashRouter>
    </div>
  );
};

export default App;