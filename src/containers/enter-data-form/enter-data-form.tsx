import { useMutation } from "@tanstack/react-query";
import { Button, FlexBox, Input, Text } from "../../ui";
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { instance } from "../../provider/client";
import { User } from "../../models";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { nav } from "../../pages";
import { setAmountOfPackages, setSelectedOffice, setSelectedService } from "../../store/appointmentSlice";

const schema = z.object({
  firstName: z.string().min(1, 'Имя обязательно'),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  email: z.string().email('Неверный email'),
  phoneNumber: z.string()
    .regex(/^\+7\d{10}$/, 'Неверный формат номера телефона'),
});

function EnterDataForm() {
    const [userData, setUserData] = useState<User>({
      firstName: '', 
      lastName: '', 
      email: '', 
      phoneNumber: '+7'
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; phoneNumber?: string }>({});
    const { selectedOffice, selectedService, amountOfPackages } = useAppSelector(state => state.appointment);

    useEffect(() => {
        if (!selectedOffice || !selectedService) {
            navigate(nav.index());            
        }
    }, []);

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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        // Ensure the input starts with +7
        if (!value.startsWith('+7')) {
            return;
        }
        
        // Remove any non-digit characters after +7
        const cleanedValue = '+7' + value.substring(2).replace(/\D/g, '');
        
        // Limit to 10 digits after +7
        const formattedValue = cleanedValue.substring(0, 12);
        
        setUserData({ ...userData, phoneNumber: formattedValue });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name !== 'phoneNumber') {
            setUserData({ ...userData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            schema.parse(userData);
            await createAppointment.mutate();
            setErrors({});
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: { firstName?: string; lastName?: string; email?: string; phoneNumber?: string } = {};
                err.errors.forEach((error) => {
                    switch (error.path[0]) {
                        case 'firstName':
                            fieldErrors.firstName = error.message;
                            break;
                        case 'lastName':
                            fieldErrors.lastName = error.message;
                            break;  
                        case 'email':
                            fieldErrors.email = error.message;
                            break;
                        case 'phoneNumber':
                            fieldErrors.phoneNumber = error.message;
                            break;
                        default:
                            break;
                    }   
                });
                setErrors(fieldErrors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FlexBox direction="column" gap={2}>
                <div>
                    <Text>Имя:</Text>
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <Text color="error">{errors.firstName}</Text>}
                </div>
                <div>
                    <Text>Фамилия:</Text>
                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <Text color="error">{errors.lastName}</Text>}
                </div>
                <div>
                    <Text>Email:</Text>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <Text color="error">{errors.email}</Text>}
                </div>
                <div>
                    <Text>Номер телефона:</Text>
                    <Input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="+7XXXXXXXXXX"
                    />
                    {errors.phoneNumber && <Text color="error">{errors.phoneNumber}</Text>}
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
                        <Button variant="text" onClick={() => {
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
                        <Button variant="text" onClick={() => {
                            dispatch(setAmountOfPackages(1));
                            navigate(nav.selectOffice());
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                            </svg>
                        </Button>
                    </FlexBox>
                </div>
                <FlexBox justify="center">
                   <Button type="submit" variant="primary" disabled={!userData.firstName || !userData.lastName || !userData.email || !userData.phoneNumber}>
                        Записаться
                    </Button> 
                </FlexBox>
            </FlexBox>
        </form>
    );
}

export default EnterDataForm;