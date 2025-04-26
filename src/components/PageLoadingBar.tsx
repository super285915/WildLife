import { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

const PageLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    setIsVisible(true);
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 200);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [location]);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 2000,
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: `${progress}%`,
          background: isDark
            ? 'linear-gradient(90deg, #81c784, #2e7d32)'
            : 'linear-gradient(90deg, #4caf50, #2e7d32)',
          transition: 'all 0.3s ease-in-out',
          boxShadow: isDark
            ? '0 0 8px rgba(129, 199, 132, 0.5)'
            : '0 0 8px rgba(76, 175, 80, 0.5)',
          borderRadius: '0 3px 3px 0',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            width: '100px',
            height: '100%',
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))',
            animation: 'shimmer 1.5s infinite',
          },
          '@keyframes shimmer': {
            '0%': {
              transform: 'translateX(-100%)',
            },
            '100%': {
              transform: 'translateX(100%)',
            },
          },
        }}
      />
    </Box>
  );
};

export default PageLoadingBar; 