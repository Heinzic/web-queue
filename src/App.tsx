import { HashRouter, Routes, Route } from 'react-router-dom';
import HandleAppointment from './HOC/HandleAppointment';
import {nav, general} from './pages'
import './App.css';
import RouteGuard from './HOC/RouteGuard';
import { ThemeProvider } from '@emotion/react';
import { theme } from './ui'; 

const App: React.FC = () => {
  return (  
    <div className="widget-container">
        <HashRouter>
          <div className="queue-content">
            <ThemeProvider theme={theme}>
              <HandleAppointment>
                <Routes>
                  <Route path={nav.general.index()} element={<general.HomePage />} />
                  <Route path={nav.general.cancelAppointment()} element={<general.CancelAppointmentPage />} />
                  <Route path={nav.general.selectLocation()} element={<general.LocationSelectionPage />} />
                  <Route path={nav.general.selectOffice()} element={<general.SelectOfficeAndServicePage />} />
                  <Route element={<RouteGuard requiredParams={['selectedOffice', 'selectedService']} redirectTo={nav.general.index()} />}>
                    <Route path={nav.general.appointmentDateTime()} element={<general.AppointmentDateTimePage />} />
                  </Route>
                  <Route element={<RouteGuard requiredParams={['selectedOffice', 'selectedService', 'timeSlot']} redirectTo={nav.general.index()} />}>
                    <Route path={nav.general.enterData()} element={<general.EnterDataPage />} />
                  </Route>
                  <Route element={<RouteGuard requiredParams={['userData', 'selectedOffice', 'selectedService', 'timeSlot']} redirectTo={nav.general.index()} />}>
                    <Route path={nav.general.confirmAppointment()} element={<general.ConfirmAppointmentPage />} />
                    <Route path={nav.general.appointmentSuccess()} element={<general.AppointmentSuccessPage />} />
                  </Route>
                </Routes>
              </HandleAppointment>
            </ThemeProvider>
          </div>
        </HashRouter>
    </div>
  );
};

export default App;