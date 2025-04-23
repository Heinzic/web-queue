import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HandleAppointment from './HOC/HandleAppointment';
import { nav, general, mfc, uni } from './pages';
import './App.css';
import RouteGuard from './HOC/RouteGuard';
import { ThemeProvider } from '@emotion/react';
import { theme } from './ui'; 
import { colors } from './ui/theme/theme';

const App: React.FC = () => {
  const [flow, setFlow] = useState<keyof typeof colors>('general');
  const location = useLocation();

  useEffect(() => {
    switch (true) {
      case location.pathname.startsWith('/mfc'):
        setFlow('mfc');
        break;
      case location.pathname.startsWith('/uni'):
        setFlow('uni');
        break;
      default:
        setFlow('general');
        break;
    }
  }, [location.pathname]);

  return (  
    <div className="widget-container">
      <div className="queue-content">
        <HandleAppointment flow={flow}>
          <ThemeProvider theme={theme(flow)}>
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

              {/* MFC Routes */}
              <Route path={nav.mfc.index()} element={<mfc.HomePage />} />
              <Route path={nav.mfc.selectQueue()} element={<mfc.QueueSelectionPage/> }/>
              <Route path={nav.mfc.cancelAppointment()} element={<mfc.CancelAppointmentPage />} />
              <Route path={nav.mfc.selectLocation()} element={<mfc.LocationSelectionPage />} />
              <Route path={nav.mfc.selectOffice()} element={<mfc.SelectOfficeAndServicePage />} />
              <Route element={<RouteGuard requiredParams={['selectedOffice', 'selectedService']} redirectTo={nav.mfc.index()} />}>
                <Route path={nav.mfc.appointmentDateTime()} element={<mfc.AppointmentDateTimePage />} />
              </Route>
              <Route element={<RouteGuard requiredParams={['selectedOffice', 'selectedService', 'timeSlot']} redirectTo={nav.mfc.index()} />}>
                <Route path={nav.mfc.enterData()} element={<mfc.EnterDataPage />} />
              </Route>
              <Route element={<RouteGuard requiredParams={['userData', 'selectedOffice', 'selectedService', 'timeSlot']} redirectTo={nav.mfc.index()} />}>
                <Route path={nav.mfc.confirmAppointment()} element={<mfc.ConfirmAppointmentPage />} />
                <Route path={nav.mfc.appointmentSuccess()} element={<mfc.AppointmentSuccessPage />} />
              </Route>

              <Route path={nav.uni.index()} element={<uni.HomePage />} />
              <Route path={nav.uni.cancelAppointment()} element={<uni.CancelAppointmentPage />} />
              <Route path={nav.uni.selectOffice()} element={<uni.SelectServicePage />} />
              <Route element={<RouteGuard requiredParams={['selectedOffice', 'selectedService']} redirectTo={nav.uni.index()} />}>
                <Route path={nav.uni.appointmentDateTime()} element={<uni.AppointmentDateTimePage />} />
              </Route>
              <Route element={<RouteGuard requiredParams={['selectedOffice', 'selectedService', 'timeSlot']} redirectTo={nav.uni.index()} />}>
                <Route path={nav.uni.enterData()} element={<uni.EnterDataPage />} />
              </Route>
              <Route element={<RouteGuard requiredParams={['userData', 'selectedOffice', 'selectedService', 'timeSlot']} redirectTo={nav.uni.index()} />}>
                <Route path={nav.uni.confirmAppointment()} element={<uni.ConfirmAppointmentPage />} />
                <Route path={nav.uni.appointmentSuccess()} element={<uni.AppointmentSuccessPage />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </HandleAppointment>
      </div>
    </div>
  );
};

// Wrap App with HashRouter
const AppWithRouter = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default AppWithRouter;