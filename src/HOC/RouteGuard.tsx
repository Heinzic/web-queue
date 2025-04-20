// RouteGuard.tsx - Modified version
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';

type AppointmentState = RootState['appointment'];
type RouteGuardParams = Pick<AppointmentState, 'userData' | 'selectedOffice' | 'selectedService' | 'timeSlot'>;

interface RouteGuardProps {
  requiredParams: (keyof RouteGuardParams)[];
  redirectTo?: string;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ 
  requiredParams, 
  redirectTo = '/' 
}) => {
  const { userData, selectedOffice, selectedService, timeSlot } = useAppSelector(state => state.appointment);
  const params: RouteGuardParams = { userData, selectedOffice, selectedService, timeSlot };
  const isDataValid = requiredParams.every(param => params[param]);

  if (!isDataValid) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default RouteGuard;