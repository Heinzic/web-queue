import { configureStore } from '@reduxjs/toolkit';
import {appointmentReducer, timerReducer} from './slices';

export const store = configureStore({
  reducer: {
    appointment: appointmentReducer,
    timer: timerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 