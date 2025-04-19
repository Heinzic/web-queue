import { nav } from "../../pages";
import { setAmountOfPackages, setSelectedOffice, setSelectedService, setUserData } from "../../store/appointmentSlice";
import { Button, FlexBox, Input, Text } from "../../ui";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { instance } from "../../provider/client";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/UserService";
import { User } from "../../models";

function ConfirmAppointmentForm() {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { selectedOffice, selectedService, amountOfPackages, userData } = useAppSelector(state => state.appointment);

    const createAppointment = useMutation({
        mutationFn: async () => {
            const response = await instance.post('/api/create-appointment', {
                customer: userData,
                participantsNumber: amountOfPackages,
                placeId: selectedOffice?.id,
                serviceId: selectedService?.id,
            });
            return response.data;
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createAppointment.mutate();
        if (createAppointment.status === 'success') {
            UserService.saveUserData(userData as User);
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <FlexBox justify="center" direction="column" gap={2}>
                <div>
                    <Text>Имя:</Text>
                    <FlexBox align="center" gap={2}>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={userData?.firstName || ''}
                            readOnly
                        />
                        <Button variant="text" onClick={(e) => {
                            e.preventDefault();
                            dispatch(setUserData({
                                firstName: '',
                                lastName: userData?.lastName || '',
                                email: userData?.email || '',
                                phoneNumber: userData?.phoneNumber || ''
                            }));
                            navigate(nav.enterData());
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                            </svg>
                        </Button>
                    </FlexBox>
                </div>
                <div>
                    <Text>Фамилия:</Text>
                    <FlexBox align="center" gap={2}>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userData?.lastName || ''}
                            readOnly
                        />
                        <Button variant="text" onClick={(e) => {
                            e.preventDefault();
                            dispatch(setUserData({
                                firstName: userData?.firstName || '',
                                lastName: '',
                                email: userData?.email || '',
                                phoneNumber: userData?.phoneNumber || ''
                            }));
                            navigate(nav.enterData());
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                            </svg>
                        </Button>
                    </FlexBox>
                </div>
                <div>
                    <Text>Email:</Text>
                    <FlexBox align="center" gap={2}>
                        <Input
                            type="text"
                            id="email"
                            name="email"
                            value={userData?.email || ''}
                            readOnly
                        />
                        <Button variant="text" onClick={(e) => {
                            e.preventDefault();
                            dispatch(setUserData({
                                firstName: userData?.firstName || '',
                                lastName: userData?.lastName || '',
                                email: '',
                                phoneNumber: userData?.phoneNumber || ''
                            }));
                            navigate(nav.enterData());
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                            </svg>
                        </Button>
                    </FlexBox>
                </div>
                <div>
                    <Text>Телефон:</Text>
                    <FlexBox align="center" gap={2}>
                        <Input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={userData?.phoneNumber || ''}
                            readOnly
                        />
                        <Button variant="text" onClick={(e) => {
                            e.preventDefault();
                            dispatch(setUserData({
                                firstName: userData?.firstName || '',
                                lastName: userData?.lastName || '',
                                email: userData?.email || '',
                                phoneNumber: ''
                            }));
                            navigate(nav.enterData());
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                            </svg>
                        </Button>
                    </FlexBox>
                </div>
                <div>
                    <Text>Офис:</Text>
                    <FlexBox align="center" gap={2}>
                        <Input
                            type="text"
                            id="office"
                            name="office"
                            value={selectedOffice?.name + ' ' + selectedOffice?.address || ''}
                            readOnly
                        />
                        <Button variant="text" type="button" onClick={(e) => {
                            e.preventDefault();
                            dispatch(setSelectedOffice(null));
                            navigate(nav.selectOffice());
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                            </svg>
                        </Button>
                    </FlexBox>
                </div>
                <div>
                    <Text>Услуга:</Text>
                    <FlexBox align="center" gap={2}>
                        <Input
                            type="text"
                            id="service"
                            name="service"
                            value={selectedService?.name || ''}
                            readOnly
                        />
                        <Button variant="text" onClick={(e) => {
                            e.preventDefault();
                            dispatch(setSelectedService(null));
                            navigate(nav.selectOffice());
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                            </svg>
                        </Button>
                    </FlexBox>
                </div>
                <div>
                    <Text>Количество пакетов:</Text>
                    <FlexBox align="center" gap={2}>
                        <Input
                            type="number"
                            id="amountOfPackages"
                            name="amountOfPackages"
                            value={amountOfPackages || ''}
                            readOnly
                        />
                        <Button variant="text" onClick={(e) => {
                            e.preventDefault();
                            dispatch(setAmountOfPackages(1));
                            navigate(nav.appointmentDateTime());
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                            </svg>
                        </Button>
                    </FlexBox>
                </div>
                <FlexBox justify="center">
                    <Button type="submit" variant="primary">
                        Записаться
                    </Button> 
                </FlexBox>
            </FlexBox>
        </form>
     );
}

export default ConfirmAppointmentForm;