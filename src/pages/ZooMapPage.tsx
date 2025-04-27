import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SelectChangeEvent,
  useTheme,
  Grid,
  Tooltip,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Restaurant,
  Wc,
  LocalCafe,
  Store,
  DirectionsWalk,
  Accessible,
  Pets,
  Info,
  DirectionsBus,
  NavigateNext,
} from '@mui/icons-material';

// Mock map data
const mapAreas = [
  { id: 'af', name: 'African Savanna', animals: 12, facilities: ['Food', 'Restroom', 'Gift Shop'] },
  { id: 'as', name: 'Asian Rainforest', animals: 15, facilities: ['Food', 'Restroom'] },
  { id: 'au', name: 'Australian Outback', animals: 8, facilities: ['Restroom'] },
  { id: 'ar', name: 'Arctic Tundra', animals: 6, facilities: ['Food', 'Gift Shop'] },
  { id: 'aq', name: 'Aquatic World', animals: 25, facilities: ['Food', 'Restroom', 'Gift Shop'] },
  { id: 'rp', name: 'Reptile House', animals: 20, facilities: ['Restroom'] },
  { id: 'am', name: 'Amazonian Jungle', animals: 10, facilities: ['Food'] },
];

// Function to map zoo area names to habitat types
const getHabitatFromArea = (areaName: string): string => {
  const habitatMap: { [key: string]: string } = {
    'African Savanna': 'Savanna',
    'Asian Rainforest': 'Rainforest',
    'Australian Outback': 'Grassland',
    'Arctic Tundra': 'Tundra',
    'Aquatic World': 'Island',
    'Reptile House': 'Forest',
    'Amazonian Jungle': 'Rainforest'
  };
  return habitatMap[areaName] || areaName;
};

// Facility icons mapping
const facilityIcons = {
  'Food': <Restaurant />,
  'Restroom': <Wc />,
  'Cafe': <LocalCafe />,
  'Gift Shop': <Store />,
};

const MapArea = ({ 
  selected, 
  onClick, 
  style, 
  children 
}: { 
  selected: boolean;
  onClick: () => void;
  style: any;
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        filter: selected ? 'brightness(1.2)' : 'brightness(1)'
      }}
      whileHover={{ 
        scale: 1.05,
        filter: 'brightness(1.2)',
        transition: { duration: 0.2 }
      }}
      style={{
        position: 'absolute',
        ...style,
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          bgcolor: selected ? 'primary.main' : 'primary.light',
          opacity: !selected ? 0.6 : 1,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: selected 
            ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`
            : `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
          border: `2px solid ${selected ? theme.palette.primary.main : 'transparent'}`,
          transition: 'all 0.3s ease-in-out',
          backdropFilter: 'blur(8px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, transparent 100%)`,
            borderRadius: 4,
            opacity: selected ? 1 : 0.5,
            transition: 'opacity 0.3s ease-in-out',
          }
        }}
        onClick={onClick}
      >
        <Typography 
          color="white" 
          fontWeight={700}
          sx={{ 
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 1,
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            textAlign: 'center',
            px: 2
          }}
        >
          {children}
        </Typography>
      </Box>
    </motion.div>
  );
};

const PathLine = ({ style }: { style: any }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        ...style,
        backgroundColor: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.grey[400], 0.3)
          : alpha(theme.palette.grey[400], 0.5),
        backdropFilter: 'blur(4px)',
      }}
    />
  );
};

const ZooMapPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // State
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [facilityFilter, setFacilityFilter] = useState<string[]>([]);
  const [routeType, setRouteType] = useState('regular');
  
  // Handle selection and filter changes
  const handleAreaChange = (event: SelectChangeEvent) => {
    setSelectedArea(event.target.value);
  };
  
  const handleFacilityFilterChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFacilityFilter(typeof value === 'string' ? value.split(',') : value);
  };
  
  const handleRouteTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType !== null) {
      setRouteType(newType);
    }
  };
  
  // Mock itinerary
  const suggestedItinerary = [
    { time: '10:00 AM', activity: 'Arrival & Welcome', location: 'Main Entrance' },
    { time: '10:30 AM', activity: 'Elephant Feeding', location: 'African Savanna' },
    { time: '11:30 AM', activity: 'Reptile Demonstration', location: 'Reptile House' },
    { time: '12:30 PM', activity: 'Lunch Break', location: 'Central Food Court' },
    { time: '1:30 PM', activity: 'Penguin Exhibit', location: 'Arctic Tundra' },
    { time: '2:30 PM', activity: 'Tiger Viewing', location: 'Asian Rainforest' },
    { time: '3:30 PM', activity: 'Seal Show', location: 'Aquatic World' },
    { time: '4:30 PM', activity: 'Departure', location: 'Main Exit' },
  ];
  
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            mb: 3
          }}>
          Zoo Map & Planning
        </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Use our interactive map to navigate the zoo and plan your visit efficiently.
        </Typography>
        </motion.div>
        
        <Grid container spacing={3}>
          {/* Left column - Map and Filters */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 4,
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              }}
            >
              {/* Map container */}
              <Box
                sx={{
                  bgcolor: (theme) => theme.palette.mode === 'light' ? alpha('#e9f5db', 0.5) : alpha('#1c2a19', 0.5),
                  flexGrow: 1,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Map areas */}
                <Box sx={{ position: 'relative', width: '90%', height: '90%' }}>
                  <MapArea
                    selected={selectedArea === 'af'}
                    onClick={() => setSelectedArea('af')}
                    style={{ top: '10%', left: '20%', width: '25%', height: '30%' }}
                  >
                    African Savanna
                  </MapArea>

                  <MapArea
                    selected={selectedArea === 'as'}
                    onClick={() => setSelectedArea('as')}
                    style={{ top: '25%', right: '15%', width: '30%', height: '25%' }}
                  >
                    Asian Rainforest
                  </MapArea>

                  <MapArea
                    selected={selectedArea === 'aq'}
                    onClick={() => setSelectedArea('aq')}
                    style={{ bottom: '15%', left: '10%', width: '20%', height: '25%' }}
                  >
                    Aquatic World
                  </MapArea>

                  <MapArea
                    selected={selectedArea === 'ar'}
                    onClick={() => setSelectedArea('ar')}
                    style={{ bottom: '20%', right: '20%', width: '25%', height: '20%' }}
                  >
                    Arctic Tundra
                  </MapArea>
                  
                  {/* Entrance */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                      position: 'absolute', 
                      bottom: '5%', 
                      left: '45%', 
                      width: '10%', 
                      height: '10%', 
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: '100%',
                      bgcolor: 'secondary.main',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                      <Typography color="black" fontWeight={700} fontSize="0.8rem">
                        Entrance
                      </Typography>
                  </Box>
                  </motion.div>
                  
                  {/* Paths */}
                  <PathLine style={{ bottom: '10%', left: '50%', width: '2%', height: '10%' }} />
                  <PathLine style={{ bottom: '20%', left: '35%', width: '30%', height: '2%' }} />
                  <PathLine style={{ top: '40%', left: '45%', width: '2%', height: '40%' }} />
                </Box>
                
                {/* Map legend */}
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    p: 2,
                    bgcolor: (theme) => alpha(theme.palette.background.paper, 0.9),
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>
                    Legend:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      size="small"
                      label="Exhibit"
                      sx={{ 
                        bgcolor: 'primary.main',
                        color: 'white',
                        height: 24,
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      size="small"
                      label="Entrance/Exit"
                      sx={{ 
                        bgcolor: 'secondary.main',
                        color: 'black',
                        height: 24,
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      icon={<Restaurant fontSize="small" />}
                      size="small"
                      label="Food"
                      sx={{ height: 24, fontWeight: 600 }}
                    />
                    <Chip
                      icon={<Wc fontSize="small" />}
                      size="small"
                      label="Restroom"
                      sx={{ height: 24, fontWeight: 600 }}
                    />
                  </Box>
                </Box>
              </Box>
              
              {/* Filters */}
              <Box 
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                sx={{ 
                  mt: 3, 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  '& .MuiFormControl-root': {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        }
                      }
                    }
                  }
                }}
              >
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="area-select-label">Select Area</InputLabel>
                  <Select
                    labelId="area-select-label"
                    id="area-select"
                    value={selectedArea}
                    label="Select Area"
                    onChange={handleAreaChange}
                  >
                    <MenuItem value="">
                      <em>All Areas</em>
                    </MenuItem>
                    {mapAreas.map((area) => (
                      <MenuItem key={area.id} value={area.id}>
                        {area.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="facility-filter-label">Facilities</InputLabel>
                  <Select
                    labelId="facility-filter-label"
                    id="facility-filter"
                    multiple
                    value={facilityFilter}
                    onChange={handleFacilityFilterChange}
                    label="Facilities"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="Food">
                      <Restaurant fontSize="small" sx={{ mr: 1 }} />
                      Food
                    </MenuItem>
                    <MenuItem value="Restroom">
                      <Wc fontSize="small" sx={{ mr: 1 }} />
                      Restroom
                    </MenuItem>
                    <MenuItem value="Gift Shop">
                      <Store fontSize="small" sx={{ mr: 1 }} />
                      Gift Shop
                    </MenuItem>
                    <MenuItem value="Cafe">
                      <LocalCafe fontSize="small" sx={{ mr: 1 }} />
                      Cafe
                    </MenuItem>
                  </Select>
                </FormControl>
                
                <Box sx={{ ml: 'auto' }}>
                  <ToggleButtonGroup
                    value={routeType}
                    exclusive
                    onChange={handleRouteTypeChange}
                    aria-label="route type"
                    size="small"
                  >
                    <ToggleButton value="regular" aria-label="regular route">
                      <DirectionsWalk fontSize="small" sx={{ mr: 0.5 }} />
                      Regular
                    </ToggleButton>
                    <ToggleButton value="accessible" aria-label="accessible route">
                      <Accessible fontSize="small" sx={{ mr: 0.5 }} />
                      Accessible
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>
            </Paper>
            
            {/* Selected area info */}
            <AnimatePresence mode="wait">
            {selectedArea && (
                <motion.div
                  key={selectedArea}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 4,
                      mb: 3,
                      backdropFilter: 'blur(10px)',
                      bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                    }}
                  >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {mapAreas.find(area => area.id === selectedArea)?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mapAreas.find(area => area.id === selectedArea)?.animals} animals to discover
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<Pets />}
                    size="small"
                    onClick={() => {
                      const area = mapAreas.find(area => area.id === selectedArea);
                      if (area) {
                        navigate('/animals', { 
                          state: { 
                            presetHabitat: getHabitatFromArea(area.name),
                            fromZooMap: true 
                          } 
                        });
                      }
                    }}
                  >
                    View Animals
                  </Button>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  Available Facilities
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {mapAreas.find(area => area.id === selectedArea)?.facilities.map((facility) => (
                    <Chip
                      key={facility}
                      icon={facilityIcons[facility as keyof typeof facilityIcons]}
                      label={facility}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Paper>
                </motion.div>
            )}
            </AnimatePresence>
          </Grid>
          
          {/* Right column - Itinerary */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 4,
                  backdropFilter: 'blur(10px)',
                  bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                }}
              >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Suggested Itinerary
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  A recommended plan to make the most of your visit
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <List sx={{ py: 0 }}>
                  {suggestedItinerary.map((item, index) => (
                    <Box key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 42 }}>
                          {index === 0 || index === suggestedItinerary.length - 1 ? (
                            <DirectionsBus fontSize="small" color="secondary" />
                          ) : index === 3 ? (
                            <Restaurant fontSize="small" color="primary" />
                          ) : (
                            <Info fontSize="small" color="primary" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.activity}
                          secondary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                {item.location}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                {item.time}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < suggestedItinerary.length - 1 && (
                        <Box 
                          sx={{ 
                            ml: 2.6, 
                            height: 24, 
                            borderLeft: '1px dashed',
                            borderColor: 'divider' 
                          }} 
                        />
                      )}
                    </Box>
                  ))}
                </List>
                
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Customize Itinerary
                  </Button>
                </Box>
              </CardContent>
            </Card>
            </motion.div>
            
            {/* Tips card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 4,
                  mt: 3,
                  backdropFilter: 'blur(10px)',
                  bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                }}
              >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Visitor Tips
                </Typography>
                
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Visit popular exhibits early in the morning or late afternoon to avoid crowds."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Check feeding times at the information booth for the best animal viewing."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="The African Savanna and Reptile House are partially covered, ideal during rain."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Free guided tours start at 11:00 AM and 2:00 PM from the main entrance."
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ZooMapPage;