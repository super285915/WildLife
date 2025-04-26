import { Box, Container, Typography, Card, Grid, LinearProgress, Button, useTheme } from '@mui/material';

// Conservation projects data
const conservationProjects = [
  {
    id: 1,
    title: "Tiger Conservation Initiative",
    description: "Supporting anti-poaching efforts and habitat restoration for wild tigers in Asia.",
    targetAmount: 50000,
    currentAmount: 32500,
    image: "https://images.pexels.com/photos/46251/sumatran-tiger-tiger-big-cat-stripes-46251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    title: "Coral Reef Restoration",
    description: "Rebuilding damaged coral reefs and educating communities on marine conservation.",
    targetAmount: 35000,
    currentAmount: 28000,
    image: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    title: "Elephant Protection Program",
    description: "Creating safe corridors for elephant migration and reducing human-wildlife conflict.",
    targetAmount: 75000,
    currentAmount: 45000,
    image: "https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const ConservationHighlight = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Conservation Efforts
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: '800px', mx: 'auto', mb: 2 }}
          >
            Join us in making a difference. Our conservation projects help protect endangered species and their habitats worldwide.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {conservationProjects.map((project) => {
            const progressPercentage = (project.currentAmount / project.targetAmount) * 100;
            
            return (
              <Grid item xs={12} md={4} key={project.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 200,
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        p: 2,
                      }}
                    >
                      <Typography variant="h5" component="h3" color="white" gutterBottom>
                        {project.title}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" paragraph>
                      {project.description}
                    </Typography>
                    
                    <Box sx={{ mt: 'auto' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          ${project.currentAmount.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${project.targetAmount.toLocaleString()}
                        </Typography>
                      </Box>
                      
                      <LinearProgress
                        variant="determinate"
                        value={progressPercentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          mb: 2,
                          bgcolor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            bgcolor: 'primary.main',
                            borderRadius: 4,
                          }
                        }}
                      />
                      
                      <Button variant="contained" color="primary" fullWidth>
                        Support This Project
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            href="/conservation"
          >
            Explore All Conservation Projects
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ConservationHighlight;