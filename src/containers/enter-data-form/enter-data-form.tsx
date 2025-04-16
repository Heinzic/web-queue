import { useMutation } from "@tanstack/react-query";
import { Button, FlexBox, Input, Text } from "../../ui";
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { instance } from "../../provider/client";
import { User } from "../../models";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { nav } from "../../pages";
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

    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; phoneNumber?: string }>({});
    const { selectedOffice, selectedService, amountOfPackages } = useAppSelector(state => state.appointment);

    useEffect(() => {
        if (!selectedOffice || !selectedService) {
            navigate(nav.index());            
        }
    }, [selectedOffice, selectedService]);

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