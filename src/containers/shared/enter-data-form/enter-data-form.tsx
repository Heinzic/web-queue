import { Button, FlexBox, Input, Text } from "../../../ui";
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { nav } from "../../../pages";
import { User } from "../../../models";
import { setUserData } from "../../../store/slices/appointmentSlice";
import { UserService } from "../../../services/UserService";
import { TextArea } from "../../../ui/TextArea";

const schema = z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    patronymic: z.string().min(1, 'Отчество обязательно'),
    email: z.string().email('Неверный email'),
    phoneNumber: z.string().regex(/^\+7\d{10}$/, 'Неверный формат номера телефона'),
    comment: z.string().optional()
});

function EnterDataForm(props :{nextLink: string}) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string; phoneNumber?: string; patronymic?: string}>({});
    const { selectedOffice, selectedService, userData } = useAppSelector(state => state.appointment);

    const [data, setData] = useState<User>({
      firstName: userData?.firstName || '', 
      lastName: userData?.lastName || '', 
      email: userData?.email || '', 
      phoneNumber: userData?.phoneNumber || '+7',
      patronymic: userData?.patronymic || '',
      comment:''
    });

    useEffect(() => {
        if (!selectedOffice || !selectedService) {
            navigate(nav.general.index());          
        }
        const storedUserData = UserService.loadUserData();
        if (storedUserData && UserService.isValidUserData(storedUserData)) {
            dispatch(setUserData(storedUserData));
            setData(storedUserData);
        }
    }, []);

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
        
        setData({ ...data, phoneNumber: formattedValue });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name !== 'phoneNumber') {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            schema.parse(data);
            setErrors({});
            dispatch(setUserData(data));
            navigate(props.nextLink);
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: { firstName?: string; lastName?: string; email?: string; phoneNumber?: string; patronymic?: string } = {};
                err.errors.forEach((error) => {
                    switch (error.path[0]) {
                        case 'firstName':
                            fieldErrors.firstName = error.message;
                            break;
                        case 'lastName':
                            fieldErrors.lastName = error.message;
                            break;
                        case 'patronymic':
                            fieldErrors.patronymic = error.message;
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
                    <Text>ФИО</Text>
                    <FlexBox gap={4}>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Имя"
                            value={data.firstName}
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Фамилия"
                            value={data.lastName}
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            id="patronymic"
                            name="patronymic"
                            placeholder="Отчество"
                            value={data.patronymic}
                            onChange={handleChange}
                        />
                    </FlexBox>
                    
                    {errors.firstName && <Text color="error">{errors.firstName}</Text>}
                    {errors.patronymic && <Text color="error">{errors.patronymic}</Text>}
                </div>
                <div>
                    <FlexBox gap={4}>
                        <FlexBox direction="column" fullWidth>
                            <Text>Email:</Text>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                            {errors.email && <Text color="error">{errors.email}</Text>}
                        </FlexBox>
                        <FlexBox direction="column" fullWidth>
                            <Text>Телефон</Text>
                            <Input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={data.phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="+7XXXXXXXXXX"
                            />
                            {errors.phoneNumber && <Text color="error">{errors.phoneNumber}</Text>}
                        </FlexBox>
                    </FlexBox>
                </div>
                <div>
                    <Text>Комментарий (не обязательно)</Text>
                    <TextArea
                        id="comment"
                        name="comment"
                        value={data.comment}
                        onChange={handleChange}
                        placeholder="Комментарий"
                    />
                </div>
                <FlexBox justify="center">
                    <Button type="submit" variant="outlined"  size="large" disabled={!data.firstName || !data.lastName || !data.email || !data.phoneNumber || !data.patronymic}>
                        Записаться
                    </Button> 
                </FlexBox>
            </FlexBox>
        </form>
    );
}

export default EnterDataForm;