// features/timer/timerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  expirationTime: Date | null; 
  initialDuration: number;
}

const initialState: TimerState = {
  expirationTime: null,
  initialDuration: 5,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state, action: PayloadAction<number | undefined>) => {
      const duration = action.payload ?? state.initialDuration;
      state.expirationTime = new Date(Date.now() + duration * 60 * 1000) 
      state.initialDuration = duration;
    },
    clearTimer: (state) => {
      state.expirationTime = null;
    },
  },
});

export const { startTimer, clearTimer } = timerSlice.actions;
export default timerSlice.reducer;