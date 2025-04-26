import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Colors
const primaryColor = {
  main: '#1B5E20', // Deeper forest green
  light: '#4C8C4A',
  dark: '#003300',
  contrastText: '#ffffff',
};

const secondaryColor = {
  main: '#FF9800', // Vibrant orange
  light: '#FFB74D',
  dark: '#F57C00',
  contrastText: '#000000',
};

// Success, error, warning colors
const successColor = {
  main: '#4CAF50',
  light: '#80e27e',
  dark: '#087f23',
  contrastText: '#000000',
};

const errorColor = {
  main: '#F44336',
  light: '#ff7961',
  dark: '#ba000d',
  contrastText: '#ffffff',
};

const warningColor = {
  main: '#FF9800',
  light: '#ffc947',
  dark: '#c66900',
  contrastText: '#000000',
};

const infoColor = {
  main: '#03A9F4',
  light: '#67daff',
  dark: '#007ac1',
  contrastText: '#000000',
};

// Create theme based on mode
export const createAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: primaryColor,
      secondary: secondaryColor,
      success: successColor,
      error: errorColor,
      warning: warningColor,
      info: infoColor,
      background: {
        default: mode === 'light' ? '#f8f9fa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      grey: {
        50: '#f8f9fa',
        100: '#f1f3f5',
        200: '#e9ecef',
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#868e96',
        700: '#495057',
        800: '#343a40',
        900: '#212529',
        A100: '#f5f5f5',
        A200: '#eeeeee',
        A400: '#bdbdbd',
        A700: '#616161',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Montserrat", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 800,
        fontSize: '3rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: '"Montserrat", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: '2.25rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontFamily: '"Montserrat", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: '1.875rem',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontFamily: '"Montserrat", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.3,
      },
      h5: {
        fontFamily: '"Montserrat", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h6: {
        fontFamily: '"Montserrat", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.4,
      },
      body1: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        lineHeight: 1.6,
        fontSize: '1rem',
      },
      body2: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        lineHeight: 1.6,
        fontSize: '0.875rem',
      },
      button: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.02em',
      },
      caption: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0.03em',
      },
      overline: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 600,
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            padding: '10px 20px',
            boxShadow: 'none',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          },
          contained: {
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)',
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: mode === 'light'
                ? 'rgba(27, 94, 32, 0.05)'
                : 'rgba(255, 255, 255, 0.05)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0px 4px 12px rgba(0, 0, 0, 0.08)'
              : '0px 4px 12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            '&:hover': {
              transform: 'translateY(-6px) scale(1.01)',
              boxShadow: mode === 'light'
                ? '0px 12px 24px rgba(0, 0, 0, 0.12)'
                : '0px 12px 24px rgba(0, 0, 0, 0.7)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backdropFilter: 'blur(12px)',
            backgroundColor: mode === 'light'
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(18, 18, 18, 0.85)',
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === 'light'
              ? '#ffffff'
              : '#1e1e1e',
            boxShadow: mode === 'light'
              ? '0px 0px 20px rgba(0, 0, 0, 0.1)'
              : '0px 0px 20px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
          filled: {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: 'all 0.3s ease',
          },
          elevation1: {
            boxShadow: mode === 'light'
              ? '0px 4px 12px rgba(0, 0, 0, 0.05)'
              : '0px 4px 12px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.05)',
      '0px 4px 8px rgba(0, 0, 0, 0.05)',
      '0px 6px 12px rgba(0, 0, 0, 0.05)',
      '0px 8px 16px rgba(0, 0, 0, 0.05)',
      '0px 10px 20px rgba(0, 0, 0, 0.05)',
      '0px 12px 24px rgba(0, 0, 0, 0.05)',
      '0px 14px 28px rgba(0, 0, 0, 0.05)',
      '0px 16px 32px rgba(0, 0, 0, 0.05)',
      '0px 18px 36px rgba(0, 0, 0, 0.05)',
      '0px 20px 40px rgba(0, 0, 0, 0.05)',
      '0px 22px 44px rgba(0, 0, 0, 0.05)',
      '0px 24px 48px rgba(0, 0, 0, 0.05)',
      '0px 26px 52px rgba(0, 0, 0, 0.05)',
      '0px 28px 56px rgba(0, 0, 0, 0.05)',
      '0px 30px 60px rgba(0, 0, 0, 0.05)',
      '0px 32px 64px rgba(0, 0, 0, 0.05)',
      '0px 34px 68px rgba(0, 0, 0, 0.05)',
      '0px 36px 72px rgba(0, 0, 0, 0.05)',
      '0px 38px 76px rgba(0, 0, 0, 0.05)',
      '0px 40px 80px rgba(0, 0, 0, 0.05)',
      '0px 42px 84px rgba(0, 0, 0, 0.05)',
      '0px 44px 88px rgba(0, 0, 0, 0.05)',
      '0px 46px 92px rgba(0, 0, 0, 0.05)',
      '0px 48px 96px rgba(0, 0, 0, 0.05)',
    ],
  });
};