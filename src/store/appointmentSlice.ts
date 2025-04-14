import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Office, Service } from '../models';

interface AppointmentState {
  selectedOffice: Office | null;
  selectedService: Service | null;
  amountOfPackages: number;
}

const initialState: AppointmentState = {
  selectedOffice: null,
  selectedService: null,
  amountOfPackages: 1,
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
    resetAppointment: (state) => {
      state.selectedOffice = null;
      state.selectedService = null;
      state.amountOfPackages = 1;
    },
  },
});

export const { 
  setSelectedOffice, 
  setSelectedService, 
  setAmountOfPackages,
  resetAppointment 
} = appointmentSlice.actions;

export default appointmentSlice.reducer; 