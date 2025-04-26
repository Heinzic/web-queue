import { CircularProgressbar } from 'react-circular-progressbar';
import { useTheme } from "@emotion/react";
import 'react-circular-progressbar/dist/styles.css';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { startTimer } from '../../../store/slices/timerSlice';

interface BookingTimerProps {
    onExpire?: () => void;
    durationMinutes?: number;
    style: 'circle' | 'block'
}

const StyledProgressBar = styled(CircularProgressbar)`
  .CircularProgressbar-trail {
    stroke: ${({ theme }) => theme.colors.neutral.white};
  }
  .CircularProgressbar-path {
    stroke: ${({ theme }) => theme.colors.primary.main};
  }

  .CircularProgressbar-text {
    fill: ${({ theme }) => theme.colors.primary.main};
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']}
  }

  width: 57px;
`

export const BookingTimer: React.FC<BookingTimerProps> = ({onExpire, durationMinutes = 5}) => {
  const dispatch = useAppDispatch()
  const [remainingTime, setRemainingTime] = useState(durationMinutes * 60);

  useEffect(() => {
    dispatch(startTimer(durationMinutes)); // Pass durationMinutes to startTimer

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onExpire) onExpire(); // Call onExpire when countdown reaches zero
          return 0;
        }
        return prev - 1; // Decrement remaining time
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [dispatch, durationMinutes, onExpire]);

  const theme = useTheme()
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <>
      <StyledProgressBar value={(remainingTime / (durationMinutes * 60)) * 100} text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`} theme={theme}/>
    </>
  )
};