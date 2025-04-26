import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Paper, useTheme, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';

// Images for day and night modes
const dayTimeImage = 'https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const nightTimeImage = 'https://images.pexels.com/photos/3550651/pexels-photo-3550651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isNightTime, setIsNightTime] = useState(false);

  // Determine if it's day or night based on user's local time
  useEffect(() => {
    const checkDayNightCycle = () => {
      const hours = new Date().getHours();
      setIsNightTime(hours < 6 || hours >= 18); // Night time between 6pm and 6am
    };

    checkDayNightCycle();

    // Update every hour
    const interval = setInterval(checkDayNightCycle, 3600000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '90vh', md: '95vh' },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${isNightTime ? nightTimeImage : dayTimeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.75)',
          transition: 'all 1.5s ease-in-out',
          animation: 'zoomIn 20s infinite alternate ease-in-out',
          '@keyframes zoomIn': {
            '0%': {
              transform: 'scale(1)',
            },
            '100%': {
              transform: 'scale(1.1)',
            },
          },
        },
      }}
    >
      {/* Overlay gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isNightTime
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Animated particles effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0.4,
          background: isNightTime
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          animation: 'fadeInOut 8s infinite alternate ease-in-out',
          '@keyframes fadeInOut': {
            '0%': { opacity: 0.2 },
            '100%': { opacity: 0.5 },
          },
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Fade in={true} timeout={1000}>
          <Box maxWidth="md">
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '2.75rem', sm: '3.75rem', md: '5rem' },
                textShadow: '2px 4px 8px rgba(0,0,0,0.5)',
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: 0,
                  width: '80px',
                  height: '4px',
                  backgroundColor: isNightTime ? 'secondary.main' : 'primary.main',
                  borderRadius: '2px',
                },
              }}
            >
              {isNightTime
                ? 'Discover Nocturnal Wonders'
                : 'Experience Wildlife Up Close'}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'white',
                maxWidth: '650px',
                textShadow: '1px 2px 4px rgba(0,0,0,0.5)',
                mb: 5,
                mt: 3,
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              {isNightTime
                ? 'Explore our special night exhibits and see creatures that come alive after dark. A magical experience for the whole family.'
                : 'Get closer to amazing animals and learn about conservation efforts around the world. Every visit supports our wildlife protection programs.'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/visit')}
                sx={{
                  py: 1.75,
                  px: 4.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  boxShadow: '0 4px 14px rgba(27, 94, 32, 0.4)',
                }}
              >
                Plan Your Visit
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/animals')}
                sx={{
                  py: 1.75,
                  px: 4.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'white',
                  borderColor: 'white',
                  borderRadius: '50px',
                  borderWidth: '2px',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: '2px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  },
                }}
              >
                Explore Animals
              </Button>
            </Box>
          </Box>
        </Fade>

        {/* Scroll down indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 10,
          }}
          onClick={scrollToContent}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              mb: 1,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Scroll Down
          </Typography>
          <KeyboardArrowDown
            sx={{
              color: 'white',
              fontSize: '2rem',
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': {
                  transform: 'translateY(0)',
                },
                '40%': {
                  transform: 'translateY(-10px)',
                },
                '60%': {
                  transform: 'translateY(-5px)',
                },
              },
            }}
          />
        </Box>

        {/* Info card */}
        <Fade in={true} timeout={1500}>
          <Paper
            elevation={6}
            sx={{
              position: 'absolute',
              bottom: { xs: 100, md: 100 },
              right: { xs: 'auto', md: 32 },
              left: { xs: 16, md: 'auto' },
              width: { xs: 'calc(100% - 32px)', md: '360px' },
              zIndex: 10,
              p: 3.5,
              bgcolor: theme.palette.background.paper,
              borderRadius: 3,
              border: isNightTime
                ? `2px solid ${theme.palette.secondary.main}`
                : `2px solid ${theme.palette.primary.main}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '6px',
                height: '100%',
                backgroundColor: isNightTime ? 'secondary.main' : 'primary.main',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isNightTime ? 'secondary.main' : 'primary.main',
                pl: 1,
              }}
            >
              {isNightTime ? 'Night Safari Hours' : 'Today at the Zoo'}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'success.main',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(0.95)',
                      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
                    },
                    '70%': {
                      transform: 'scale(1)',
                      boxShadow: '0 0 0 6px rgba(76, 175, 80, 0)',
                    },
                    '100%': {
                      transform: 'scale(0.95)',
                      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
                    },
                  },
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {isNightTime
                  ? 'Open tonight: 6:00 PM - 11:00 PM'
                  : 'Open today: 9:00 AM - 5:00 PM'}
              </Typography>
            </Box>

            <Box sx={{ pl: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {isNightTime
                  ? '• Special nocturnal tours available'
                  : '• Elephant feeding: 11:00 AM & 3:00 PM'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {isNightTime
                  ? '• Bat cave exploration: 8:00 PM'
                  : '• Penguin parade: 2:00 PM'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isNightTime
                  ? '• Nocturnal predator feeding: 9:30 PM'
                  : '• Giraffe encounter: 12:00 PM'}
              </Typography>
            </Box>

            <Button
              variant="text"
              color={isNightTime ? 'secondary' : 'primary'}
              sx={{
                alignSelf: 'flex-start',
                mt: 1,
                pl: 1,
                fontWeight: 600,
              }}
            >
              See Full Schedule
            </Button>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default HeroSection;