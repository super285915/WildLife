import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  LinearProgress,
  Divider,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  useTheme,
  alpha,  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
  Alert,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Public, Forest, Favorite, Park, Pets, Savings, Close, Business, Person, Email, Phone, LocationOn } from '@mui/icons-material';

// Sample conservation projects
const conservationProjects = [
  {
    id: 1,
    title: "Tiger Conservation Initiative",
    description: "Supporting anti-poaching efforts and habitat restoration for wild tigers in Asia. This project works with local communities to reduce human-wildlife conflict.",
    targetAmount: 50000,
    currentAmount: 32500,
    image: "https://images.pexels.com/photos/46251/sumatran-tiger-tiger-big-cat-stripes-46251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "Southeast Asia",
    impacts: [
      "Protected 5,000+ acres of tiger habitat",
      "Reduced poaching by 60% in project areas",
      "Trained 200+ local conservation rangers"
    ]
  },
  {
    id: 2,
    title: "Coral Reef Restoration",
    description: "Rebuilding damaged coral reefs and educating communities on marine conservation. Our team is developing innovative techniques to accelerate coral growth.",
    targetAmount: 35000,
    currentAmount: 28000,
    image: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "Pacific Ocean",
    impacts: [
      "Restored 3,000+ square meters of coral reef",
      "Increased fish biodiversity by 45% in restored areas",
      "Trained 150 local divers in coral restoration techniques"
    ]
  },
  {
    id: 3,
    title: "Elephant Protection Program",
    description: "Creating safe corridors for elephant migration and reducing human-wildlife conflict through community engagement and education initiatives.",
    targetAmount: 75000,
    currentAmount: 45000,
    image: "https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "East Africa",
    impacts: [
      "Established 120 miles of protected migration corridors",
      "Reduced human-elephant conflicts by 70%",
      "Supported 15 communities with sustainable farming practices"
    ]
  },
  {
    id: 4,
    title: "Rainforest Preservation",
    description: "Protecting critical rainforest habitats from deforestation through land acquisition, community partnerships, and sustainable agriculture training.",
    targetAmount: 90000,
    currentAmount: 52000,
    image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    location: "Amazon Basin",
    impacts: [
      "Protected 12,000+ acres of primary rainforest",
      "Partnered with 25 indigenous communities",
      "Planted 50,000+ native trees in degraded areas"
    ]
  },
];

// Sample partners
const conservationPartners = [
  {
    id: 1,
    name: "World Wildlife Fund",
    logo: "https://images.pexels.com/photos/2682543/pexels-photo-2682543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Global conservation organization working to protect wildlife and reduce human impact on the environment."
  },
  {
    id: 2,
    name: "Ocean Conservation Alliance",
    logo: "https://images.pexels.com/photos/1477511/pexels-photo-1477511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Dedicated to protecting marine ecosystems through science, policy, and community engagement."
  },
  {
    id: 3,
    name: "Rainforest Trust",
    logo: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Purchases and protects threatened tropical forests to save endangered wildlife and sequester carbon."
  },
];

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
      id={`conservation-tabpanel-${index}`}
      aria-labelledby={`conservation-tab-${index}`}
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

const DonationDialog = ({ 
  open, 
  onClose, 
  project 
}: { 
  open: boolean; 
  onClose: () => void; 
  project: typeof conservationProjects[0] | null;
}) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDonationSubmit = () => {
    // Here you would typically handle the payment processing
    // For now, we'll just show a success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setDonationAmount('');
      setDonationType('one-time');
    }, 2000);
  };

  if (!project) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          position: 'relative'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
            Support {project.title}
          </Typography>
          <Button
            onClick={onClose}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <Close />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        {showSuccess ? (
          <Alert severity="success" sx={{ my: 2 }}>
            Thank you for your support! Your donation will help make a difference.
          </Alert>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Your contribution will directly support our conservation efforts for this project.
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
              <FormLabel component="legend">Donation Type</FormLabel>
              <RadioGroup
                row
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
              >
                <FormControlLabel 
                  value="one-time" 
                  control={<Radio />} 
                  label="One-time" 
                />
                <FormControlLabel 
                  value="monthly" 
                  control={<Radio />} 
                  label="Monthly" 
                />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel component="legend">Amount</FormLabel>
              <TextField
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                placeholder="Enter amount"
                sx={{ mt: 1 }}
              />
            </FormControl>

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              {[25, 50, 100, 250].map((amount) => (
                <Button
                  key={amount}
                  variant={donationAmount === amount.toString() ? "contained" : "outlined"}
                  onClick={() => setDonationAmount(amount.toString())}
                  sx={{ flex: 1 }}
                >
                  ${amount}
                </Button>
              ))}
            </Box>

            <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom>
                Project Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(project.currentAmount / project.targetAmount) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  mb: 1,
                  bgcolor: alpha('#4caf50', 0.1),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'success.main',
                    borderRadius: 4,
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary">
                ${project.currentAmount.toLocaleString()} raised of ${project.targetAmount.toLocaleString()} goal
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      {!showSuccess && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDonationSubmit}
            disabled={!donationAmount || parseFloat(donationAmount) <= 0}
            startIcon={<Favorite />}
          >
            Complete Donation
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

const PartnershipDialog = ({ 
  open, 
  onClose 
}: { 
  open: boolean; 
  onClose: () => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    type: 'individual',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    address: '',
    city: '',
    country: '',
    partnershipLevel: 'bronze',
    message: ''
  });

  const handleInputChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const steps = ['Basic Information', 'Partnership Details', 'Review'];

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return formData.type === 'individual' 
          ? (formData.firstName && formData.lastName && formData.email)
          : (formData.organization && formData.email);
      case 1:
        return formData.partnershipLevel && formData.phone && formData.address;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Submit form
      handleSubmit();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Here you would typically handle the form submission
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setFormData({
        type: 'individual',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        position: '',
        address: '',
        city: '',
        country: '',
        partnershipLevel: 'bronze',
        message: ''
      });
      setActiveStep(0);
    }, 2000);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
              <FormLabel component="legend">Partner Type</FormLabel>
              <RadioGroup
                row
                value={formData.type}
                onChange={handleInputChange('type')}
              >
                <FormControlLabel 
                  value="individual" 
                  control={<Radio />} 
                  label="Individual" 
                />
                <FormControlLabel 
                  value="organization" 
                  control={<Radio />} 
                  label="Organization" 
                />
              </RadioGroup>
            </FormControl>

            {formData.type === 'individual' ? (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      required
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Organization Name"
                  value={formData.organization}
                  onChange={handleInputChange('organization')}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Your Position"
                  value={formData.position}
                  onChange={handleInputChange('position')}
                  sx={{ mb: 2 }}
                />
              </>
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              sx={{ mt: 2 }}
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel component="legend">Partnership Level</FormLabel>
              <TextField
                select
                value={formData.partnershipLevel}
                onChange={handleInputChange('partnershipLevel')}
                sx={{ mt: 1 }}
              >
                <MenuItem value="bronze">Bronze Partner ($1,000/year)</MenuItem>
                <MenuItem value="silver">Silver Partner ($5,000/year)</MenuItem>
                <MenuItem value="gold">Gold Partner ($10,000/year)</MenuItem>
                <MenuItem value="platinum">Platinum Partner ($25,000/year)</MenuItem>
              </TextField>
            </FormControl>

            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Address"
              value={formData.address}
              onChange={handleInputChange('address')}
              required
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange('city')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={formData.country}
                  onChange={handleInputChange('country')}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Partnership Summary
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {formData.type === 'individual' ? <Person /> : <Business />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={formData.type === 'individual' 
                      ? `${formData.firstName} ${formData.lastName}`
                      : formData.organization}
                    secondary={formData.type === 'organization' ? formData.position : null}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Email />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={formData.email} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Phone />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={formData.phone} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <LocationOn />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={formData.address}
                    secondary={`${formData.city}${formData.country ? `, ${formData.country}` : ''}`}
                  />
                </ListItem>
              </List>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Selected Partnership Level:
                </Typography>
                <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
                  {formData.partnershipLevel.charAt(0).toUpperCase() + formData.partnershipLevel.slice(1)} Partner
                </Typography>
              </Box>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          position: 'relative'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
            Become a Conservation Partner
          </Typography>
          <Button
            onClick={onClose}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <Close />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        {showSuccess ? (
          <Alert severity="success" sx={{ my: 2 }}>
            Thank you for your interest in becoming a partner! We'll contact you soon to finalize the partnership.
          </Alert>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" paragraph>
              Join our conservation community and help make a lasting impact on wildlife preservation.
            </Typography>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStepContent(activeStep)}
          </>
        )}
      </DialogContent>

      {!showSuccess && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={onClose}
          >
            Cancel
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep > 0 && (
            <Button
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepComplete(activeStep)}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

const ConservationPage = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof conservationProjects[0] | null>(null);
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [partnershipDialogOpen, setPartnershipDialogOpen] = useState(false);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSupportProject = (project: typeof conservationProjects[0]) => {
    setSelectedProject(project);
    setDonationDialogOpen(true);
  };
  
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box 
          sx={{ 
            position: 'relative',
            height: 400,
            borderRadius: 4,
            overflow: 'hidden',
            mb: 6,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url(https://images.pexels.com/photos/572861/pexels-photo-572861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)',
            }}
          />
          
          <Container maxWidth="md" sx={{ position: 'relative', height: '100%', zIndex: 1 }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 800,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 2,
                }}
              >
                Conservation Efforts
              </Typography>
              <Typography 
                variant="h5"
                sx={{ 
                  maxWidth: 600,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  mb: 4,
                }}
              >
                Join us in protecting endangered species and preserving critical habitats around the world.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                sx={{ width: 'fit-content', py: 1.5, px: 4 }}
              >
                Support Our Mission
              </Button>
            </Box>
          </Container>
        </Box>
        
        {/* Impact Stats */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 6 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="h4" gutterBottom fontWeight={700}>
                Our Conservation Impact
              </Typography>
              <Typography variant="body1" paragraph>
                For over two decades, our conservation programs have made a significant difference in protecting endangered species and their habitats.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                endIcon={<Park />}
              >
                Read Annual Report
              </Button>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h3" 
                      color="primary.main" 
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      25+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Conservation Projects
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h3" 
                      color="primary.main" 
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      $2M+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Funds Raised
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h3" 
                      color="primary.main" 
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      50K+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Acres Protected
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h3" 
                      color="primary.main" 
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Countries Impacted
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Tabs */}
        <Paper elevation={2} sx={{ borderRadius: 2, mb: 6 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="conservation tabs"
              centered
            >
              <Tab 
                icon={<Forest />} 
                label="Current Projects" 
                id="conservation-tab-0"
                aria-controls="conservation-tabpanel-0"
              />
              <Tab 
                icon={<Public />} 
                label="Our Partners" 
                id="conservation-tab-1"
                aria-controls="conservation-tabpanel-1"
              />
              <Tab 
                icon={<Savings />} 
                label="How to Help" 
                id="conservation-tab-2"
                aria-controls="conservation-tabpanel-2"
              />
            </Tabs>
          </Box>
          
          {/* Projects Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              {conservationProjects.map((project) => {
                const progressPercentage = (project.currentAmount / project.targetAmount) * 100;
                
                return (
                  <Grid item xs={12} md={6} key={project.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Box sx={{ position: 'relative', height: 300 }}>
                        <CardMedia
                          component="img"
                          // height="300"
                          image={project.image}
                          alt={project.title}
                          sx={{ height: '100%',objectFit: 'cover' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            p: 3,
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="h5" component="h2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                              {project.title}
                            </Typography>
                            <Chip 
                              icon={<Public sx={{ color: 'white' }} />} 
                              label={project.location} 
                              size="small"
                              sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                backdropFilter: 'blur(4px)',
                                '& .MuiChip-icon': {
                                  color: 'white',
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {project.description}
                        </Typography>
                        
                        <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>
                          Key Impacts:
                        </Typography>
                        <List dense sx={{ mb: 3 }}>
                          {project.impacts.map((impact, index) => (
                            <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                              <ListItemAvatar sx={{ minWidth: 36 }}>
                                <Forest sx={{ color: 'success.main', fontSize: 20 }} />
                              </ListItemAvatar>
                              <ListItemText 
                                primary={impact} 
                                primaryTypographyProps={{
                                  variant: 'body2',
                                  color: 'text.secondary',
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                        
                        <Box sx={{ mt: 'auto' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                              ${project.currentAmount.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                              ${project.targetAmount.toLocaleString()}
                            </Typography>
                          </Box>
                          
                          <LinearProgress
                            variant="determinate"
                            value={progressPercentage}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              mb: 3,
                              bgcolor: alpha(theme.palette.success.main, 0.1),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: 'success.main',
                                borderRadius: 4,
                              }
                            }}
                          />
                          
                          <Button 
                            variant="contained" 
                            color="success" 
                            fullWidth
                            startIcon={<Favorite />}
                            onClick={() => handleSupportProject(project)}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            Support This Project
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>
          
          {/* Partners Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom>
              Conservation Partners
            </Typography>
            <Typography variant="body1" paragraph>
              We collaborate with leading organizations worldwide to maximize our conservation impact.
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 3 }}>
              {conservationPartners.map((partner) => (
                <Grid item xs={12} md={4} key={partner.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: 240,
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={partner.logo}
                        alt={partner.name}
                        sx={{
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                          p: 2,
                        }}
                      >
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                          {partner.name}
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
                      <Typography variant="body2" color="text.secondary">
                        {partner.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          
          {/* How to Help Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                  <Typography variant="h5" gutterBottom>
                    Ways to Support
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <Savings />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Make a Donation" 
                        secondary="Your contribution directly funds our conservation efforts worldwide."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <Pets />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Adopt an Animal" 
                        secondary="Symbolically adopt an endangered animal to support its conservation."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <Park />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Become a Member" 
                        secondary="Join our community with monthly contributions and exclusive benefits."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'info.main' }}>
                          <Public />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Volunteer Your Time" 
                        secondary="Participate in conservation events and activities at our zoo."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Become a Conservation Partner
                  </Typography>
                  <Typography variant="body2" paragraph>
                    As a Conservation Partner, you'll receive:
                  </Typography>
                  
                  <List dense>
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemAvatar sx={{ minWidth: 30 }}>
                        <Forest fontSize="small" color="primary" />
                      </ListItemAvatar>
                      <ListItemText primary="Quarterly impact reports on your supported projects" />
                    </ListItem>
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemAvatar sx={{ minWidth: 30 }}>
                        <Forest fontSize="small" color="primary" />
                      </ListItemAvatar>
                      <ListItemText primary="Invitations to exclusive conservation events" />
                    </ListItem>
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemAvatar sx={{ minWidth: 30 }}>
                        <Forest fontSize="small" color="primary" />
                      </ListItemAvatar>
                      <ListItemText primary="Recognition on our Conservation Partners wall" />
                    </ListItem>
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemAvatar sx={{ minWidth: 30 }}>
                        <Forest fontSize="small" color="primary" />
                      </ListItemAvatar>
                      <ListItemText primary="Behind-the-scenes tours of our conservation facilities" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemAvatar sx={{ minWidth: 30 }}>
                        <Forest fontSize="small" color="primary" />
                      </ListItemAvatar>
                      <ListItemText primary="Tax benefits for your charitable contribution" />
                    </ListItem>
                  </List>
                  
                  <Box sx={{ mt: 'auto', pt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      onClick={() => setPartnershipDialogOpen(true)}
                    >
                      Become a Partner
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
        
        {/* CTA Section */}
        <Box
          sx={{
            bgcolor: theme.palette.mode === 'light' ? 'primary.main' : 'primary.dark',
            color: 'white',
            borderRadius: 2,
            p: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              right: 0,
              width: '400px',
              height: '100%',
              background: `radial-gradient(circle at top right, ${theme.palette.secondary.main}40, transparent 70%)`,
              opacity: 0.7,
            }}
          />
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom fontWeight={700}>
                Join Our Conservation Community
              </Typography>
              <Typography variant="body1" paragraph>
                Subscribe to our newsletter to stay updated on our conservation efforts and learn how you can make a difference.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                sx={{ 
                  color: 'black', 
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                Sign Up for Updates
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Donation Dialog */}
        <DonationDialog
          open={donationDialogOpen}
          onClose={() => setDonationDialogOpen(false)}
          project={selectedProject}
        />

        {/* Partnership Dialog */}
        <PartnershipDialog
          open={partnershipDialogOpen}
          onClose={() => setPartnershipDialogOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default ConservationPage;