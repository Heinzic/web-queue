import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Office, Service, User } from '../../models';

interface AppointmentState {
  selectedOffice: Office | null;
  selectedService: Service | null;
  amountOfPackages: number;
  userData: User | null;
  timeSlot: string | null;
}

const initialState: AppointmentState = {
  selectedOffice: null,
  selectedService: null,
  amountOfPackages: 1,
  userData: null,
  timeSlot: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setSelectedOffice: (state, action: PayloadAction<Office | null>) => {
      state.selectedOffice = action.payload;
    },
    setSelectedService: (state, action: PayloadAction<Service | null>) => {
      state.selectedService = action.payload;
    },
    setAmountOfPackages: (state, action: PayloadAction<number>) => {
      state.amountOfPackages = action.payload;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    resetAppointment: (state) => {
      state.selectedOffice = null;
      state.selectedService = null;
      state.amountOfPackages = 1;
    },
    setTimeSlot: (state, action: PayloadAction<string>) => {
      state.timeSlot = action.payload;
    },
  },
});

export const { 
  setSelectedOffice, 
  setSelectedService, 
  setAmountOfPackages,
  setUserData,
  resetAppointment,
  setTimeSlot,
} = appointmentSlice.actions;

export default appointmentSlice.reducer; 