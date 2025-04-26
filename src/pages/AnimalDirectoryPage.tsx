import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  SelectChangeEvent,
  Pagination,
} from '@mui/material';
import { Search, ViewList, ViewModule } from '@mui/icons-material';
import {
  animalData,
  statusColors,
  habitats as habitatOptions,
  regions as regionOptions,
  conservationStatuses as statusOptions,
  activityTimes as activityOptions,
  highlightedAnimals
} from '../data/animalData';
import Carousel from 'react-material-ui-carousel';

// Utility function to chunk array into groups
const chunk = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const AnimalDirectoryPage = () => {
  const navigate = useNavigate();

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [habitat, setHabitat] = useState('All');
  const [region, setRegion] = useState('All');
  const [conservationStatus, setConservationStatus] = useState('All');
  const [activityTime, setActivityTime] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9; // Show 9 animals per page in grid view (3x3)

  // Handle filter changes
  const handleHabitatChange = (event: SelectChangeEvent) => {
    setHabitat(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleRegionChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setConservationStatus(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleActivityChange = (event: SelectChangeEvent) => {
    setActivityTime(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top of the animals section smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const handleAnimalClick = (animalId: number) => {
    navigate(`/animals/${animalId}`);
  };

  // Filter animals
  const filteredAnimals = animalData.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (animal.scientificName ? animal.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) : false);
    const matchesHabitat = habitat === 'All' || animal.habitat === habitat;
    const matchesRegion = region === 'All' || animal.region === region;
    const matchesStatus = conservationStatus === 'All' || animal.conservationStatus === conservationStatus;
    const matchesActivity = activityTime === 'All' || animal.activityTime === activityTime;

    return matchesSearch && matchesHabitat && matchesRegion && matchesStatus && matchesActivity;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const paginatedAnimals = filteredAnimals.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Animal Directory
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore our diverse collection of animals from around the world. Use the filters to find specific species.
        </Typography>

        {/* Highlighted Animals Section */}
        {highlightedAnimals && highlightedAnimals.length > 0 && (
          <Box sx={{ mb: 6, pb: 4, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{
              fontWeight: 600,
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 60,
                height: 4,
                bgcolor: 'primary.main',
                borderRadius: 2
              }
            }}>
              Featured Animals
            </Typography>
            <Carousel
              animation="slide"
              navButtonsAlwaysVisible
              interval={6000}
              indicators={true}
              sx={{
                minHeight: 500,
                '& .MuiIconButton-root': {
                  color: 'primary.main',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'background.paper',
                    opacity: 0.9
                  }
                }
              }}
            >
              {chunk(highlightedAnimals, 4).map((group, groupIndex) => (
                <Grid container spacing={3} key={groupIndex}>
                  {group.map((animal) => (
                    <Grid item xs={12} sm={6} md={3} key={`highlighted-${animal.id}`}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: 3,
                          border: '1px solid',
                          borderColor: 'primary.light',
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: 6
                          }
                        }}
                      >
                        <CardActionArea 
                          onClick={() => handleAnimalClick(animal.id)}
                          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: "100%" }}
                        >
                          <Box sx={{ position: 'relative' }}>
                            <CardMedia
                              component="img"
                              height="240"
                              image={animal.image}
                              alt={animal.name}
                              sx={{
                                width: '100%',
                                height: '240px',
                                objectFit: 'cover',
                                objectPosition: 'center'
                              }}
                            />
                            {/* <Box
                              sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                px: 1.5,
                                py: 0.75,
                                borderRadius: 1,
                                bgcolor: statusColors[animal.conservationStatus as keyof typeof statusColors] + 'CC',
                                color: 'white',
                                typography: 'caption',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                              }}
                            >
                              {animal.conservationStatus}
                            </Box> */}
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                px: 1.5,
                                py: 0.75,
                                borderRadius: 1,
                                bgcolor: 'primary.main',
                                color: 'white',
                                typography: 'caption',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                              }}
                            >
                              {animal.highlightReason}
                            </Box>
                          </Box>
                          <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
                              {animal.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
                              {animal.scientificName}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              {animal.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                              <Chip label={animal.habitat} size="small" />
                              <Chip label={animal.region} size="small" />
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Carousel>
          </Box>
        )}

        {/* Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search animals..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="habitat-label">Habitat</InputLabel>
                  <Select
                    labelId="habitat-label"
                    value={habitat}
                    label="Habitat"
                    onChange={handleHabitatChange}
                  >
                    {habitatOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="region-label">Region</InputLabel>
                  <Select
                    labelId="region-label"
                    value={region}
                    label="Region"
                    onChange={handleRegionChange}
                  >
                    {regionOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel id="status-label">Conservation Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={conservationStatus}
                    label="Conservation Status"
                    onChange={handleStatusChange}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="activity-label">Activity</InputLabel>
                  <Select
                    labelId="activity-label"
                    value={activityTime}
                    label="Activity"
                    onChange={handleActivityChange}
                  >
                    {activityOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="view mode"
                    size="small"
                  >
                    <ToggleButton value="grid" aria-label="grid view">
                      <ViewModule />
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                      <ViewList />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Results count */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {paginatedAnimals.length} of {filteredAnimals.length} animals
          </Typography>
        </Box>

        {/* Animals grid/list */}
        {viewMode === 'grid' ? (
          <Grid container spacing={3}>
            {paginatedAnimals.map((animal) => (
              <Grid item xs={12} sm={6} md={4} key={animal.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleAnimalClick(animal.id)}
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={animal.image}
                      alt={animal.name}
                      sx={{
                        height: '240px',
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1,
                          py: 0.5,
                          mb: 1,
                          borderRadius: 1,
                          bgcolor: statusColors[animal.conservationStatus as keyof typeof statusColors] + '20',
                          color: statusColors[animal.conservationStatus as keyof typeof statusColors],
                          typography: 'caption',
                          fontWeight: 'medium',
                        }}
                      >
                        {animal.conservationStatus}
                      </Box>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {animal.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
                        {animal.scientificName}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1.5 }}>
                        {animal.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                        <Chip label={animal.habitat} size="small" />
                        <Chip label={animal.region} size="small" />
                        <Chip label={animal.activityTime} size="small" />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            {paginatedAnimals.map((animal) => (
              <Card 
                key={animal.id} 
                sx={{ 
                  mb: 2, 
                  display: 'flex',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => handleAnimalClick(animal.id)}
                  sx={{ display: 'flex', width: '100%' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 240,
                      height: 240,
                      objectFit: 'cover',
                      objectPosition: 'center',
                      flexShrink: 0
                    }}
                    image={animal.image}
                    alt={animal.name}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6" component="h2">
                            {animal.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            {animal.scientificName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: statusColors[animal.conservationStatus as keyof typeof statusColors] + '20',
                            color: statusColors[animal.conservationStatus as keyof typeof statusColors],
                            typography: 'caption',
                            fontWeight: 'medium',
                          }}
                        >
                          {animal.conservationStatus}
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {animal.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                        <Chip label={`Habitat: ${animal.habitat}`} size="small" />
                        <Chip label={`Region: ${animal.region}`} size="small" />
                        <Chip label={`Activity: ${animal.activityTime}`} size="small" />
                      </Box>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}

        {/* Pagination */}
        {filteredAnimals.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}

        {/* No results */}
        {filteredAnimals.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" gutterBottom>
              No animals found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters to find what you're looking for.
            </Typography>
          </Box>
        )}

      </Container>
    </Box>
  );
};

export default AnimalDirectoryPage;