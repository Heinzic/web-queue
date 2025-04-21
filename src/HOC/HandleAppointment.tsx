import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useEffect } from "react";

function HandleAppointment({ children }: { children: React.ReactNode }) {
    const { selectedOffice, selectedService } = useAppSelector((state: RootState) => state.appointment);
    const navigate = useNavigate();
    useEffect(() => {
        if (selectedOffice && selectedService) {
            navigate('/appointment-datetime');
        }
    }, [selectedOffice, selectedService]);

    return <>{children}</>;
}

export default HandleAppointment;