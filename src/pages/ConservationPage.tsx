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
  alpha,
} from '@mui/material';
import { Public, Forest, Favorite, Park, Pets, Savings } from '@mui/icons-material';

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

const ConservationPage = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      </Container>
    </Box>
  );
};

export default ConservationPage;