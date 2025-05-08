import { CircularProgressbar } from 'react-circular-progressbar';
import { useTheme } from "@emotion/react";
import 'react-circular-progressbar/dist/styles.css';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { startTimer } from '../../../store/slices/timerSlice';
import { Text } from '../../../ui';
import { motion } from 'motion/react';

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

const StyledBlockTImer = styled.div`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[5]}`};
  border: 1px solid ${({ theme }) => theme.colors.neutral.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background: ${({ theme }) => theme.colors.background.secondary};
`

export const BookingTimer: React.FC<BookingTimerProps> = ({ onExpire, durationMinutes = 5, style }) => {
  const dispatch = useAppDispatch();
  const expirationTime = useAppSelector((state) => state.timer.expirationTime);
  const [remainingTime, setRemainingTime] = useState(() => {
    return expirationTime 
      ? Math.max(0, Math.floor((expirationTime.getTime() - Date.now()) / 1000))
      : durationMinutes * 60;
  });

  useEffect(() => {
    dispatch(startTimer(durationMinutes));

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onExpire) onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, durationMinutes, onExpire]);

  const theme = useTheme();
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  if (style === 'block') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15 }}>
        <StyledBlockTImer>
          <Text>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</Text>
        </StyledBlockTImer>
      </motion.div>
      
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}>
        <StyledProgressBar value={(remainingTime / (durationMinutes * 60)) * 100} text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`} theme={theme} />
    </motion.div>
  );
};