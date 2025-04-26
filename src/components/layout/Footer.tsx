import { Box, Container, Grid, Typography, Link, TextField, Button, Divider, IconButton, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';
import { Option as Lion } from 'lucide-react';

const SocialIconButton = ({ children }: { children: React.ReactNode }) => (
  <IconButton
    size="small"
    sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        backgroundColor: 'primary.main',
        '& svg': {
          color: 'white',
        }
      }
    }}
  >
    {children}
  </IconButton>
);

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 8,
        pt: 8,
        pb: 6,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.background.paper} 100%)`,
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and description */}
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  borderRadius: '16px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(27, 94, 32, 0.25)',
                }}
              >
                <Lion size={32} color="white" />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  fontFamily: '"Montserrat", sans-serif',
                  background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                WILDLIFE
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Our mission is to inspire conservation of wildlife and wild places through exceptional animal experiences.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <SocialIconButton><Facebook /></SocialIconButton>
              <SocialIconButton><Twitter /></SocialIconButton>
              <SocialIconButton><Instagram /></SocialIconButton>
              <SocialIconButton><YouTube /></SocialIconButton>
            </Box>
          </Grid>
          
          {/* Quick links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Animals', 'Zoo Map', 'Conservation', 'Plan Your Visit'].map((text) => (
                <Link
                  key={text}
                  href={`/${text.toLowerCase().replace(' ', '-')}`}
                  color="text.secondary"
                  underline="none"
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(8px)',
                      display: 'inline-block',
                    }
                  }}
                >
                  {text}
              </Link>
              ))}
            </Box>
          </Grid>
          
          {/* Information */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['About Us', 'Contact', 'Careers', 'Privacy Policy'].map((text) => (
                <Link
                  key={text}
                  href="#"
                  color="text.secondary"
                  underline="none"
                  sx={{
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(8px)',
                      display: 'inline-block',
                    }
                  }}
                >
                  {text}
              </Link>
              ))}
            </Box>
          </Grid>
          
          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Join Our Community
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Subscribe to our newsletter for updates, events, and animal news.
            </Typography>
            <Box 
              component="form" 
              sx={{ 
                display: 'flex', 
                gap: 1,
                '& .MuiTextField-root': {
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      '& fieldset': {
                        borderColor: 'primary.main',
                      }
                    }
                  }
                }
              }}
            >
              <TextField
                size="small"
                label="Email Address"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                sx={{
                  minWidth: '120px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(46, 125, 50, 0.25)',
                  }
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 6, opacity: 0.2 }} />
        
        {/* Copyright */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Wildlife Zoo. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {['Terms of Service', 'Privacy Policy', 'Accessibility'].map((text) => (
              <Link
                key={text}
                href="#"
                color="text.secondary"
                underline="none"
                sx={{
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
              <Typography variant="body2">
                  {text}
              </Typography>
            </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;