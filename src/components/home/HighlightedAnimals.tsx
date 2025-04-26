import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
  Grid,
  useTheme,
  Chip,
  Fade,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import { animalData, statusColors, regions, conservationStatuses, Animal } from '../../data/animalData';

const HighlightedAnimals = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [displayCount, setDisplayCount] = useState(8);

  // Filter animals based on selected region and status
  const filteredAnimals = animalData.filter((animal: Animal) =>
    (selectedRegion === 'All' || animal.region === selectedRegion) &&
    (selectedStatus === 'All' || animal.conservationStatus === selectedStatus)
  ).slice(0, displayCount);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setDisplayCount(8); // Reset display count when filter changes
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setDisplayCount(8); // Reset display count when filter changes
  };

  const handleShowMore = () => {
    setDisplayCount(prev => Math.min(prev + 4, animalData.length));
  };

  return (
    <Box sx={{ py: { xs: 10, md: 12 }, position: 'relative' }}>
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: '100%', md: '40%' },
          height: '100%',
          bgcolor: theme.palette.mode === 'light' ? 'rgba(76, 140, 74, 0.05)' : 'rgba(76, 140, 74, 0.03)',
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Chip
            label="MEET OUR ANIMALS"
            color="primary"
            size="small"
            sx={{
              mb: 3,
              fontWeight: 600,
              letterSpacing: '0.5px',
              py: 0.8,
              px: 1.5,
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, #1B5E20 0%, #4C8C4A 100%)'
                : 'linear-gradient(90deg, #4C8C4A 0%, #81C784 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Featured Animals
          </Typography>

          <Divider sx={{ width: '80px', mx: 'auto', mb: 3, borderWidth: 3, borderColor: 'primary.main' }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Meet some of our amazing animal residents and learn about their stories.
            Each visit helps support our conservation efforts worldwide.
          </Typography>

          {/* Filter options */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              Filter by:
            </Typography>

            {/* Region filters */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1,
                mb: 2,
              }}
            >
              {regions.map(region => (
                <Chip
                  key={region}
                  label={region}
                  onClick={() => handleRegionChange(region)}
                  color={selectedRegion === region ? 'primary' : 'default'}
                  variant={selectedRegion === region ? 'filled' : 'outlined'}
                  sx={{
                    m: 0.5,
                    fontWeight: 500,
                    px: 1,
                    '&:hover': {
                      backgroundColor: selectedRegion === region
                        ? 'primary.main'
                        : theme.palette.mode === 'light'
                          ? 'rgba(0,0,0,0.08)'
                          : 'rgba(255,255,255,0.08)',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Conservation status filters */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {conservationStatuses.map(status => (
                <Chip
                  key={status}
                  label={status}
                  onClick={() => handleStatusChange(status)}
                  color={selectedStatus === status ? 'secondary' : 'default'}
                  variant={selectedStatus === status ? 'filled' : 'outlined'}
                  sx={{
                    m: 0.5,
                    fontWeight: 500,
                    px: 1,
                    bgcolor: selectedStatus === status && status !== 'All'
                      ? statusColors[status as keyof typeof statusColors] + '99'
                      : undefined,
                    color: selectedStatus === status && status !== 'All'
                      ? 'white'
                      : undefined,
                    '&:hover': {
                      backgroundColor: selectedStatus === status
                        ? status !== 'All'
                          ? statusColors[status as keyof typeof statusColors] + '99'
                          : 'secondary.main'
                        : theme.palette.mode === 'light'
                          ? 'rgba(0,0,0,0.08)'
                          : 'rgba(255,255,255,0.08)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal: Animal, index: number) => (
            <Grid item xs={12} sm={6} md={3} key={animal.id}>
              <Fade in={true} timeout={500 + (index * 200)}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <CardActionArea
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      '&:hover .animal-image': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="220"
                        image={animal.image}
                        alt={animal.name}
                        className="animal-image"
                        sx={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                          height: '220px', /* Fixed height for all images */
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          label={animal.conservationStatus}
                          size="small"
                          sx={{
                            bgcolor: statusColors[animal.conservationStatus as keyof typeof statusColors] + 'CC', // CC is hex for 80% opacity
                            color: 'white',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3, height: '220px', overflow: 'hidden' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography
                          variant="h5"
                          component="h3"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            position: 'relative',
                            pb: 2,
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '40px',
                              height: '3px',
                              bgcolor: 'primary.main',
                              borderRadius: '2px',
                            },
                          }}
                        >
                          {animal.name}
                        </Typography>
                        <Chip
                          label={animal.region}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.800',
                            fontWeight: 500,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {animal.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Fade>
            </Grid>
          ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No animals found matching your filters.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSelectedRegion('All');
                    setSelectedStatus('All');
                  }}
                >
                  Reset Filters
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {/* Show more button - only visible when there are more animals to show */}
          {filteredAnimals.length > 0 &&
           filteredAnimals.length < animalData.filter((animal: Animal) =>
             (selectedRegion === 'All' || animal.region === selectedRegion) &&
             (selectedStatus === 'All' || animal.conservationStatus === selectedStatus)
           ).length && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowMore}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                mb: 2,
                fontWeight: 600,
              }}
            >
              Show More Animals
            </Button>
          )}

          {/* View all animals button */}
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/animals')}
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
              },
            }}
          >
            View All Animals
          </Button>

          {/* Filter stats */}
          {filteredAnimals.length > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Showing {filteredAnimals.length} of {
                animalData.filter((animal: Animal) =>
                  (selectedRegion === 'All' || animal.region === selectedRegion) &&
                  (selectedStatus === 'All' || animal.conservationStatus === selectedStatus)
                ).length
              } animals
              {selectedRegion !== 'All' && ` from ${selectedRegion}`}
              {selectedStatus !== 'All' && ` with ${selectedStatus} status`}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HighlightedAnimals;