import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '5rem', sm: '8rem' },
            fontWeight: 800,
            background: 'linear-gradient(45deg, #2E7D32 30%, #FFC107 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 2,
          }}
        >
          404
        </Typography>
        
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Page Not Found
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mb: 4 }}
        >
          Oops! The page you're looking for seems to have wandered off into the wild. 
          Our zoo keepers are searching for it, but in the meantime, let's get you back to a safe area.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/animals')}
          >
            Explore Animals
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;