import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import {
  ExpandMore,
  AccessTime,
  LocationOn,
  Directions,
  LocalParking,
  RestaurantMenu,
  Accessible,
  CalendarMonth,
  Person,
  ChildCare,
  EventAvailable,
  Groups,
  Info,
  Bolt,
  FamilyRestroom,
  Store,
} from '@mui/icons-material';
import { format, addDays } from 'date-fns';

// FAQ data
const faqData = [
  {
    question: "What are your opening hours?",
    answer: "Our zoo is open every day from 9:00 AM to 5:00 PM, with last entry at 4:00 PM. We're open on most holidays, with special hours on Christmas and New Year's Day."
  },
  {
    question: "Can I bring my own food and drinks?",
    answer: "Yes, you are welcome to bring your own food and non-alcoholic beverages. We have several picnic areas throughout the zoo. However, we ask that you do not bring glass containers or straws for the safety of our animals."
  },
  {
    question: "Are pets allowed in the zoo?",
    answer: "For the safety and wellbeing of our zoo animals, pets are not permitted, with the exception of service animals. Service animals must be kept on a leash at all times and may be restricted from certain areas."
  },
  {
    question: "Do you offer wheelchair rentals?",
    answer: "Yes, we offer wheelchair rentals on a first-come, first-served basis for $10 per day. We recommend reserving in advance during peak seasons. Our zoo is fully accessible with ramps and paved pathways throughout."
  },
  {
    question: "Are there discounts for large groups?",
    answer: "Yes, we offer discounted rates for groups of 15 or more people. Please contact our Group Sales office at least two weeks in advance to make arrangements and secure your group rate."
  },
  {
    question: "What if it rains during my visit?",
    answer: "The zoo remains open during light to moderate rain. Many of our exhibits have covered viewing areas, and we have several indoor attractions. In case of severe weather, some outdoor exhibits may temporarily close."
  },
  {
    question: "Can I feed the animals?",
    answer: "No, visitors are not permitted to feed the animals. Our animals follow specially designed diets monitored by our nutritionists and veterinary staff. Unauthorized feeding can cause serious health problems."
  },
  {
    question: "Do you offer guided tours?",
    answer: "Yes, we offer guided tours daily at 10:00 AM and 2:00 PM. These tours last approximately 90 minutes and provide fascinating insights into our animals and conservation efforts. Tours can be booked online or at the information desk."
  },
];

// Ticket types and prices
const ticketTypes = [
  { id: 'adult', name: 'Adult (13-64)', price: 29.99 },
  { id: 'child', name: 'Child (3-12)', price: 19.99 },
  { id: 'senior', name: 'Senior (65+)', price: 24.99 },
  { id: 'toddler', name: 'Toddler (0-2)', price: 0 },
];

const VisitorInfoPage = () => {
  const theme = useTheme();
  
  // State for ticket calculator
  const [visitDate, setVisitDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [adultTickets, setAdultTickets] = useState(2);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [toddlerTickets, setToddlerTickets] = useState(0);
  const [packageType, setPackageType] = useState('standard');
  
  // Handle ticket changes
  const handlePackageChange = (event: SelectChangeEvent) => {
    setPackageType(event.target.value);
  };
  
  // Calculate total based on ticket counts and package
  const calculateTotal = () => {
    let adultPrice = ticketTypes.find(t => t.id === 'adult')?.price || 0;
    let childPrice = ticketTypes.find(t => t.id === 'child')?.price || 0;
    let seniorPrice = ticketTypes.find(t => t.id === 'senior')?.price || 0;
    
    // Apply package discounts
    if (packageType === 'premium') {
      adultPrice += 15;
      childPrice += 10;
      seniorPrice += 10;
    } else if (packageType === 'family') {
      // Family package has a special rate
      if (adultTickets >= 2 && childTickets >= 2) {
        return (adultTickets * 25) + (childTickets * 15) + (seniorTickets * seniorPrice);
      }
    }
    
    return (adultTickets * adultPrice) + (childTickets * childPrice) + (seniorTickets * seniorPrice);
  };
  
  // Get formatted visit date
  const getFormattedDate = () => {
    try {
      const date = new Date(visitDate);
      return format(date, 'EEEE, MMMM d, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  // Special events
  const upcomingEvents = [
    {
      id: 1,
      title: "Night Safari Experience",
      date: format(addDays(new Date(), 5), 'MMMM d, yyyy'),
      price: "$35.99",
      description: "Explore the zoo after hours and see nocturnal animals in action."
    },
    {
      id: 2,
      title: "Breakfast with Giraffes",
      date: format(addDays(new Date(), 12), 'MMMM d, yyyy'),
      price: "$49.99",
      description: "Enjoy a gourmet breakfast with our giraffe family in a private setting."
    },
    {
      id: 3,
      title: "Conservation Workshop",
      date: format(addDays(new Date(), 18), 'MMMM d, yyyy'),
      price: "$15.99",
      description: "Hands-on workshop learning about wildlife conservation techniques."
    },
  ];
  
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Plan Your Visit
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Everything you need to know to make the most of your zoo experience.
        </Typography>
        
        <Grid container spacing={4}>
          {/* Left column - Visitor Info */}
          <Grid item xs={12} md={8}>
            {/* Hours and Location */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" gutterBottom>
                    Hours
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTime color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Monday - Sunday" 
                        secondary="9:00 AM - 5:00 PM"
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Info color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Last Entry" 
                        secondary="4:00 PM"
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                  </List>
                  
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Special summer hours: Open until 7:00 PM on Fridays and Saturdays in July and August!
                  </Alert>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" gutterBottom>
                    Location
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="123 Zoo Avenue" 
                        secondary="San Francisco, CA 94123"
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Directions color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={
                        <Button variant="text" color="primary" sx={{ p: 0 }}>
                          Get Directions
                        </Button>
                      } />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Paper>
            
            {/* Facilities */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Facilities & Services
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <RestaurantMenu sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      4 Restaurants
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <LocalParking sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Ample Parking
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Accessible sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Fully Accessible
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <FamilyRestroom sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Family Restrooms
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Bolt sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Charging Stations
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Store sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      3 Gift Shops
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Info sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Information Desks
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Groups sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500}>
                      Group Services
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            
            {/* Getting Here */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Getting Here
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={500}>By Car</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      Our zoo is easily accessible by car. We offer a large parking lot with spaces for 500 vehicles. Parking is $10 per vehicle.
                    </Typography>
                    <Typography>
                      <strong>From the North:</strong> Take Highway 101 South to Exit 438, then follow the signs to the zoo.
                    </Typography>
                    <Typography>
                      <strong>From the South:</strong> Take Highway 101 North to Exit 435, then follow the signs to the zoo.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={500}>By Public Transit</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      Several public bus lines stop near the zoo entrance. The Zoo Express shuttle runs every 15 minutes from downtown.
                    </Typography>
                    <Typography>
                      <strong>Bus Lines:</strong> Routes 18, 25, and 33 all stop within a 5-minute walk of the main entrance.
                    </Typography>
                    <Typography>
                      <strong>Light Rail:</strong> The Central Line stops at Zoo Station, a 3-minute walk from the entrance.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight={500}>By Bicycle</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      We encourage environmentally friendly transportation! The zoo is accessible via the city's bike path network.
                    </Typography>
                    <Typography>
                      Secure bicycle racks are available near the main entrance. Cyclists receive a $2 discount on admission (please show helmet at ticket booth).
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Paper>
            
            {/* FAQ */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Frequently Asked Questions
              </Typography>
              <Box sx={{ mt: 2 }}>
                {faqData.map((faq, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography fontWeight={500}>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Paper>
          </Grid>
          
          {/* Right column - Ticket Calculator and Events */}
          <Grid item xs={12} md={4}>
            {/* Ticket Calculator */}
            <Card elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Plan & Calculate
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Calculate ticket costs and plan your visit.
                </Typography>
                
                <TextField
                  fullWidth
                  label="Visit Date"
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="package-select-label">Ticket Package</InputLabel>
                  <Select
                    labelId="package-select-label"
                    value={packageType}
                    label="Ticket Package"
                    onChange={handlePackageChange}
                  >
                    <MenuItem value="standard">Standard Admission</MenuItem>
                    <MenuItem value="premium">Premium (Includes special exhibits)</MenuItem>
                    <MenuItem value="family">Family Package (Discount for 2+ adults, 2+ kids)</MenuItem>
                  </Select>
                </FormControl>
                
                <Typography variant="subtitle2" gutterBottom>
                  Number of Tickets:
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="Adults"
                      type="number"
                      value={adultTickets}
                      onChange={(e) => setAdultTickets(Math.max(0, parseInt(e.target.value) || 0))}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person fontSize="small" />
                          </InputAdornment>
                        ),
                        inputProps: { min: 0 }
                      }}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Children"
                      type="number"
                      value={childTickets}
                      onChange={(e) => setChildTickets(Math.max(0, parseInt(e.target.value) || 0))}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ChildCare fontSize="small" />
                          </InputAdornment>
                        ),
                        inputProps: { min: 0 }
                      }}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Seniors"
                      type="number"
                      value={seniorTickets}
                      onChange={(e) => setSeniorTickets(Math.max(0, parseInt(e.target.value) || 0))}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person fontSize="small" />
                          </InputAdornment>
                        ),
                        inputProps: { min: 0 }
                      }}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Toddlers"
                      type="number"
                      value={toddlerTickets}
                      onChange={(e) => setToddlerTickets(Math.max(0, parseInt(e.target.value) || 0))}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ChildCare fontSize="small" />
                          </InputAdornment>
                        ),
                        inputProps: { min: 0 }
                      }}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography>Visit Date:</Typography>
                    <Typography fontWeight={500}>{getFormattedDate()}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography>Package:</Typography>
                    <Typography fontWeight={500}>
                      {packageType === 'standard' ? 'Standard' : 
                       packageType === 'premium' ? 'Premium' : 'Family Package'}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography>Total Visitors:</Typography>
                    <Typography fontWeight={500}>
                      {adultTickets + childTickets + seniorTickets + toddlerTickets}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">Total Price:</Typography>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                      ${calculateTotal().toFixed(2)}
                    </Typography>
                  </Stack>
                </Box>
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Book Tickets
                </Button>
              </CardContent>
            </Card>
            
            {/* Special Events */}
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Special Events
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Don't miss these upcoming special experiences.
                </Typography>
                
                <Stack spacing={2}>
                  {upcomingEvents.map((event) => (
                    <Paper
                      key={event.id}
                      elevation={1}
                      sx={{ p: 2, borderRadius: 2 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <EventAvailable color="primary" sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {event.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.date}
                          </Typography>
                        </Box>
                        <Chip 
                          label={event.price} 
                          size="small" 
                          color="primary" 
                          sx={{ ml: 'auto' }} 
                        />
                      </Box>
                      <Typography variant="body2">
                        {event.description}
                      </Typography>
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        Learn More
                      </Button>
                    </Paper>
                  ))}
                </Stack>
                
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisitorInfoPage;