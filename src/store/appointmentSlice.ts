import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Office } from '../models';

export interface Service {
  id: number;
  name: string;
  description?: string;
  duration?: string;
}

interface AppointmentState {
  selectedOffice: Office | null;
  selectedService: Service | null;
}

const initialState: AppointmentState = {
  selectedOffice: null,
  selectedService: null,
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
    resetAppointment: (state) => {
      state.selectedOffice = null;
      state.selectedService = null;
    },
  },
});

export const { 
  setSelectedOffice, 
  setSelectedService, 
  resetAppointment 
} = appointmentSlice.actions;

export default appointmentSlice.reducer; 