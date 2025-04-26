import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
  Tab,
  Tabs,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Chip,
  useTheme,
} from '@mui/material';
import { Edit, Delete, Star, StarBorder, CalendarMonth, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProfilePage = () => {
  const theme = useTheme();
  const { user, updateProfile } = useAuth();
  
  // Form state
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Mock data
  const upcomingVisits = [
    { id: 1, date: new Date(2025, 0, 15), tickets: 2, ticketType: 'Adult' },
  ];
  
  const favoriteAnimals = [
    { id: 1, name: 'African Elephant', image: 'https://images.pexels.com/photos/307452/pexels-photo-307452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 2, name: 'Bengal Tiger', image: 'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];
  
  const membershipDetails = {
    type: 'Standard',
    number: 'M-10042389',
    validUntil: new Date(2025, 11, 31),
    benefits: [
      'Free entry to the zoo',
      'Member-only events',
      'Quarterly newsletter',
      'Discounts at zoo shops',
    ],
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ firstName, lastName, email });
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, gap: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Edit 
                fontSize="small" 
                sx={{ 
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '4px',
                  cursor: 'pointer',
                }}
              />
            }
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                fontSize: '2.5rem',
              }}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>
          </Badge>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Chip 
                color="primary" 
                label={`${membershipDetails.type} Member`} 
                icon={<Star />} 
                sx={{ mr: 1 }} 
              />
              <Typography variant="body2" color="text.secondary">
                Member since: January 2025
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            onClick={() => setEditing(!editing)}
            startIcon={<Edit />}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Box>
        
        {editing ? (
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button onClick={() => setEditing(false)}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                <Tab label="Membership" />
                <Tab label="Upcoming Visits" />
                <Tab label="Favorite Animals" />
              </Tabs>
            </Box>
            
            {/* Membership Tab */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Membership Details
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Membership Type
                        </Typography>
                        <Typography variant="body1">
                          {membershipDetails.type}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Membership Number
                        </Typography>
                        <Typography variant="body1">
                          {membershipDetails.number}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Valid Until
                        </Typography>
                        <Typography variant="body1">
                          {membershipDetails.validUntil.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Renew Membership</Button>
                      <Button size="small">Print Membership Card</Button>
                    </CardActions>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Membership Benefits
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <List>
                        {membershipDetails.benefits.map((benefit, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                <Star />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={benefit} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Upgrade Membership</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            
            {/* Upcoming Visits Tab */}
            <TabPanel value={tabValue} index={1}>
              {upcomingVisits.length > 0 ? (
                <Grid container spacing={3}>
                  {upcomingVisits.map((visit) => (
                    <Grid item xs={12} sm={6} md={4} key={visit.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Upcoming Visit
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CalendarMonth sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body1">
                              {visit.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {visit.tickets} x {visit.ticketType} Tickets
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">View Details</Button>
                          <Button size="small" color="secondary">
                            Reschedule
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    No upcoming visits
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    You don't have any upcoming visits scheduled.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Plan a Visit
                  </Button>
                </Box>
              )}
            </TabPanel>
            
            {/* Favorite Animals Tab */}
            <TabPanel value={tabValue} index={2}>
              {favoriteAnimals.length > 0 ? (
                <List>
                  {favoriteAnimals.map((animal) => (
                    <Paper 
                      key={animal.id} 
                      elevation={1} 
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <ListItem sx={{ py: 1 }}>
                        <ListItemAvatar>
                          <Avatar 
                            src={animal.image} 
                            variant="rounded" 
                            sx={{ width: 60, height: 60, mr: 1 }}
                          />
                        </ListItemAvatar>
                        <ListItemText 
                          primary={animal.name} 
                          primaryTypographyProps={{ fontWeight: 600 }}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="remove favorite">
                            <Favorite color="error" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Paper>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    No favorite animals
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    You haven't added any animals to your favorites yet.
                  </Typography>
                  <Button variant="contained" color="primary">
                    Explore Animals
                  </Button>
                </Box>
              )}
            </TabPanel>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;