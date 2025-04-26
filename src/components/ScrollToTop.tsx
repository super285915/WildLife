import { useEffect, useState } from 'react';
import { Fab, Zoom, useTheme } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Fab
            color="primary"
            aria-label="scroll to top"
            onClick={scrollToTop}
            sx={{
              background: isDark
                ? 'linear-gradient(45deg, #388e3c 30%, #66bb6a 90%)'
                : 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
              boxShadow: isDark
                ? '0 8px 16px rgba(56, 142, 60, 0.3)'
                : '0 8px 16px rgba(46, 125, 50, 0.25)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDark
                  ? '0 12px 24px rgba(56, 142, 60, 0.4)'
                  : '0 12px 24px rgba(46, 125, 50, 0.3)',
              },
              '& svg': {
                color: isDark ? '#fff' : '#fff',
                transition: 'transform 0.3s ease-in-out',
              },
              '&:hover svg': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 