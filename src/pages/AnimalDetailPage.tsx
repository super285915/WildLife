import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  IconButton,
  Breadcrumbs,
  Link,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  AccessTime,
  LocationOn,
  Pets,
  Restaurant,
  Warning,
} from '@mui/icons-material';
import { animalData, statusColors } from '../data/animalData';

const AnimalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the animal by ID
  const animal = animalData.find(a => a.id === Number(id));

  if (!animal) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Animal not found
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <IconButton onClick={() => navigate('/animals')} color="primary">
            <ArrowBack /> Back to Directory
          </IconButton>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs Navigation */}
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component="button"
              variant="body1"
              onClick={() => navigate('/')}
              color="inherit"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Home
            </Link>
            <Link
              component="button"
              variant="body1"
              onClick={() => navigate('/animals')}
              color="inherit"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Animals
            </Link>
            <Typography color="text.primary">{animal.name}</Typography>
          </Breadcrumbs>
        </Box>

        {/* Back Button */}
        <IconButton 
          onClick={() => navigate('/animals')} 
          sx={{ mb: 2 }}
          color="primary"
        >
          <ArrowBack /> <Typography sx={{ ml: 1 }}>Back to Directory</Typography>
        </IconButton>

        <Grid container spacing={4}>
          {/* Left Column - Image */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3}
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
                position: 'relative'
              }}
            >
              <Box
                component="img"
                src={animal.image}
                alt={animal.name}
                sx={{
                  width: '100%',
                  height: 500,
                  objectFit: 'cover',
                }}
              />
              {/* Conservation Status Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: statusColors[animal.conservationStatus as keyof typeof statusColors] + 'CC',
                  color: 'white',
                  typography: 'subtitle2',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {animal.conservationStatus}
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Information */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                {animal.name}
              </Typography>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                color="text.secondary"
                sx={{ fontStyle: 'italic' }}
              >
                {animal.scientificName}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Key Information Grid */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">Habitat & Region</Typography>
                    </Box>
                    <Typography variant="body1">{animal.habitat}</Typography>
                    <Typography variant="body2" color="text.secondary">{animal.region}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTime color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">Activity Pattern</Typography>
                    </Box>
                    <Typography variant="body1">{animal.activityTime}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Restaurant color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">Diet</Typography>
                    </Box>
                    <Typography variant="body1">{animal.diet}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Warning color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">Conservation Status</Typography>
                    </Box>
                    <Chip 
                      label={animal.conservationStatus}
                      sx={{
                        bgcolor: statusColors[animal.conservationStatus as keyof typeof statusColors] + '20',
                        color: statusColors[animal.conservationStatus as keyof typeof statusColors],
                        fontWeight: 'medium',
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>

              {/* Description */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Pets color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">About</Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {animal.description}
                </Typography>
                {animal.highlighted && (
                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label={animal.highlightReason}
                      color="primary"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Box>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AnimalDetailPage; 