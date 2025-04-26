import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button,
  Chip,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Penguin Feeding",
    description: "Watch our penguins enjoy their meal while learning about their diet and habits.",
    date: new Date(2025, 0, 15, 11, 0), // Jan 15, 2025, 11:00 AM
    duration: 30, // minutes
    location: "Penguin Habitat",
    category: "daily",
  },
  {
    id: 2,
    title: "Conservation Talk: Saving Tigers",
    description: "Join our conservationists for an informative presentation about tiger conservation efforts.",
    date: new Date(2025, 0, 16, 14, 0), // Jan 16, 2025, 2:00 PM
    duration: 45, // minutes
    location: "Education Center",
    category: "educational",
  },
  {
    id: 3,
    title: "Kids Safari Adventure",
    description: "A guided tour for children to explore and learn about various animals through fun activities.",
    date: new Date(2025, 0, 18, 10, 0), // Jan 18, 2025, 10:00 AM
    duration: 60, // minutes
    location: "Meeting Point: Main Entrance",
    category: "special",
  },
  {
    id: 4,
    title: "Night Safari Experience",
    description: "Discover nocturnal animals and their fascinating adaptations on this special night tour.",
    date: new Date(2025, 0, 20, 19, 0), // Jan 20, 2025, 7:00 PM
    duration: 90, // minutes
    location: "Night Safari Entrance",
    category: "special",
  },
];

// Event category colors
const categoryColors = {
  daily: 'primary',
  educational: 'info',
  special: 'secondary',
} as const;

const EventsSection = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Filter events based on selected tab
  const filteredEvents = tabValue === 0 
    ? eventsData 
    : eventsData.filter(event => {
        if (tabValue === 1) return event.category === 'daily';
        if (tabValue === 2) return event.category === 'educational';
        if (tabValue === 3) return event.category === 'special';
        return true;
      });
  
  return (
    <Box sx={{ py: 8, bgcolor: theme.palette.mode === 'light' ? '#f5f7fa' : 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Upcoming Events
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Check out our schedule of events and plan your visit accordingly.
          </Typography>
          
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            centered
            sx={{ mb: 4 }}
          >
            <Tab label="All Events" />
            <Tab label="Daily" />
            <Tab label="Educational" />
            <Tab label="Special" />
          </Tabs>
        </Box>
        
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'visible',
                  position: 'relative',
                }}
              >
                <Chip
                  label={event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  color={categoryColors[event.category as keyof typeof categoryColors]}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: 16,
                    fontWeight: 500,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontWeight: 500, display: 'block', mb: 1 }}
                  >
                    {format(event.date, 'EEEE, MMMM d, yyyy')} • {format(event.date, 'h:mm a')}
                  </Typography>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {event.location} • {event.duration} min
                    </Typography>
                    <Button size="small" variant="outlined">
                      Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" color="primary" size="large">
            View Full Calendar
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default EventsSection;