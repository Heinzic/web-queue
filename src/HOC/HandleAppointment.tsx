import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useEffect } from "react";

function HandleAppointment({ children, flow }: { children: React.ReactNode, flow: string }) {
    const { selectedOffice, selectedService } = useAppSelector((state: RootState) => state.appointment);
    const navigate = useNavigate();
    useEffect(() => {
        if (selectedOffice && selectedService) {
            navigate(`${flow}/appointment-datetime`);
        }
    }, [selectedOffice, selectedService]);

    return <>{children}</>;
}

export default HandleAppointment;