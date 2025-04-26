import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Switch,
  styled,
  useMediaQuery,
  useTheme as useMuiTheme,
  Badge,
  Tooltip,
  Fade
} from '@mui/material';
import {
  Menu as MenuIcon,
  LightMode,
  DarkMode,
  ShoppingCart,
  ExploreOutlined,
  InfoOutlined,
  PetsOutlined,
  NatureOutlined,
  EventOutlined,
  ShoppingBagOutlined,
  Close
} from '@mui/icons-material';
import { Option as Lion } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

// Navigation items with icons
const navItems = [
  { label: 'Home', path: '/', icon: null },
  { label: 'Animals', path: '/animals', icon: <PetsOutlined fontSize="small" /> },
  { label: 'Zoo Map', path: '/map', icon: <ExploreOutlined fontSize="small" /> },
  { label: 'Conservation', path: '/conservation', icon: <NatureOutlined fontSize="small" /> },
  { label: 'Visit', path: '/visit', icon: <EventOutlined fontSize="small" /> },
  { label: 'Shop', path: '/shop', icon: <ShoppingBagOutlined fontSize="small" /> },
];

// Styled components
const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'component'
})(({ theme }) => ({
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(2),
  padding: '8px 16px',
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '0.95rem',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(27, 94, 32, 0.08)'
      : 'rgba(76, 140, 74, 0.15)',
    '&::before': {
      opacity: 1,
    }
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  }
}));

// Styled icon button with hover effect
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(0, 0, 0, 0.04)'
      : 'rgba(255, 255, 255, 0.08)',
  },
}));

const Header = () => {
  const { mode, toggleMode } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle user menu
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // Handle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / windowHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(18, 18, 18, 0.8)',
          boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease-in-out',
        borderBottom: isScrolled ? 0 : `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
        py: { xs: 1, md: isScrolled ? 0.5 : 1 },
      }}
    >
        {/* Scroll Progress Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            bgcolor: 'rgba(0,0,0,0.05)',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${scrollProgress}%`,
              bgcolor: 'primary.main',
              transition: 'width 0.1s ease-out',
              background: 'linear-gradient(90deg, #2e7d32, #4caf50)',
              boxShadow: '0 0 8px rgba(46, 125, 50, 0.5)',
            }}
          />
        </Box>

        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'space-between',
              '& > *': {
                transition: 'all 0.3s ease-in-out',
              }
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  '& .logo-icon': {
                    transform: 'rotate(10deg)',
                  }
                },
              }}
            >
              <Box
                className="logo-icon"
                sx={{
                  bgcolor: 'primary.main',
                  borderRadius: '16px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(27, 94, 32, 0.25)',
                  transition: 'transform 0.3s ease-in-out',
              }}
            >
                <Lion size={32} color="white" />
            </Box>
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                  ml: 2,
                fontWeight: 800,
                fontFamily: '"Montserrat", sans-serif',
                textDecoration: 'none',
                  background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
                fontSize: { xs: '1.25rem', md: isScrolled ? '1.25rem' : '1.5rem' },
                transition: 'all 0.3s ease',
              }}
            >
              WILDLIFE
            </Typography>
          </Box>

          {/* Mobile menu button */}
          {isMobile && (
            <StyledIconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{
                mr: 2,
                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
              }}
            >
              <MenuIcon />
            </StyledIconButton>
          )}

          {/* Desktop navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              {navItems.map((item) => (
                <Tooltip
                  key={item.label}
                  title={item.label}
                  arrow
                  placement="bottom"
                  enterDelay={500}
                  enterNextDelay={500}
                >
                  <RouterLink to={item.path} style={{ textDecoration: 'none' }}>
                    <NavButton
                      sx={{
                        position: 'relative',
                        mx: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        color: location.pathname === item.path
                          ? 'primary.main'
                          : 'text.primary',
                        fontWeight: location.pathname === item.path ? 700 : 600,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: location.pathname === item.path ? '30%' : '0%',
                          height: '3px',
                          bottom: -2,
                          left: '35%',
                          backgroundColor: 'primary.main',
                          borderRadius: '3px',
                          transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                          width: '60%',
                          left: '20%',
                        },
                      }}
                    >
                      {item.icon && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: location.pathname === item.path
                              ? 'primary.main'
                              : 'text.secondary',
                          }}
                        >
                          {item.icon}
                        </Box>
                      )}
                      {item.label}
                    </NavButton>
                  </RouterLink>
                </Tooltip>
              ))}
            </Box>
          )}

          {/* Right side items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
            {/* Theme toggle */}
            <Tooltip title={mode === 'light' ? 'Dark Mode' : 'Light Mode'} arrow>
              <StyledIconButton
                onClick={toggleMode}
                color="inherit"
                sx={{
                  bgcolor: mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                }}
              >
                {mode === 'light' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
              </StyledIconButton>
            </Tooltip>

            {/* Cart button */}
            <Tooltip title="Shopping Cart" arrow>
              <StyledIconButton
                color="inherit"
                sx={{
                  bgcolor: mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                }}
              >
                <Badge badgeContent={3} color="secondary">
                  <ShoppingCart fontSize="small" />
                </Badge>
              </StyledIconButton>
            </Tooltip>

            {/* User menu or login button */}
            {isAuthenticated ? (
              <>
                <Tooltip title="Account" arrow>
                  <StyledIconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      ml: { xs: 0.5, md: 1 },
                      border: '2px solid',
                      borderColor: 'primary.main',
                      p: 0.2,
                    }}
                  >
                    <Avatar
                      alt={user?.firstName}
                      src={user?.avatar}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: 'primary.main',
                        fontWeight: 'bold',
                      }}
                    >
                      {user?.firstName?.charAt(0)}
                    </Avatar>
                  </StyledIconButton>
                </Tooltip>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseUserMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      borderRadius: 2,
                      minWidth: 180,
                      overflow: 'visible',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={handleCloseUserMenu}
                    sx={{
                      borderRadius: 1,
                      mx: 1,
                      my: 0.5,
                      px: 2,
                      py: 1,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: 'primary.main',
                          fontSize: '0.75rem',
                        }}
                      >
                        {user?.firstName?.charAt(0)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem
                    onClick={() => { handleCloseUserMenu(); logout(); }}
                    sx={{
                      borderRadius: 1,
                      mx: 1,
                      my: 0.5,
                      px: 2,
                      py: 1,
                      color: 'error.main',
                      '&:hover': {
                        bgcolor: 'error.light',
                        color: 'error.dark',
                      },
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <RouterLink to="/login" style={{ textDecoration: 'none' }}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    ml: { xs: 1, md: 2 },
                    borderRadius: '50px',
                    px: { xs: 2, md: 3 },
                    py: 1,
                    fontWeight: 600,
                    boxShadow: '0 4px 10px rgba(27, 94, 32, 0.25)',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(27, 94, 32, 0.35)',
                    },
                  }}
                >
                  Login
                </Button>
              </RouterLink>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: '0 16px 16px 0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }
        }}
      >
        <Box
          role="presentation"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  borderRadius: '10px',
                  p: 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 8px rgba(27, 94, 32, 0.25)',
                }}
              >
                <Lion size={22} color="white" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  ml: 1.5,
                  fontWeight: 800,
                  fontFamily: '"Montserrat", sans-serif',
                  color: 'primary.main',
                  letterSpacing: '0.5px',
                }}
              >
                WILDLIFE
              </Typography>
            </Box>
            <IconButton
              onClick={toggleDrawer}
              sx={{
                bgcolor: mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>

          <Divider sx={{ mx: 2 }} />

          <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                disablePadding
                sx={{ mb: 1 }}
              >
                <Button
                  component={RouterLink}
                  to={item.path}
                  fullWidth
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    justifyContent: 'flex-start',
                    backgroundColor: location.pathname === item.path
                      ? mode === 'light'
                        ? 'rgba(27, 94, 32, 0.1)'
                        : 'rgba(27, 94, 32, 0.2)'
                      : 'transparent',
                    color: location.pathname === item.path
                      ? 'primary.main'
                      : 'text.primary',
                    fontWeight: location.pathname === item.path ? 700 : 500,
                    '&:hover': {
                      backgroundColor: mode === 'light'
                        ? 'rgba(27, 94, 32, 0.08)'
                        : 'rgba(27, 94, 32, 0.15)',
                    },
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: 2,
                  }}>
                    {item.icon ? (
                      <Box sx={{
                        color: location.pathname === item.path
                          ? 'primary.main'
                          : 'text.secondary',
                      }}>
                        {item.icon}
                      </Box>
                    ) : (
                      <Box sx={{ width: 24 }} /* Empty space for alignment */ />
                    )}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'inherit',
                        flexGrow: 1,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </Button>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ mx: 2 }} />

          <Box
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 2,
                bgcolor: mode === 'light' ? 'grey.100' : 'grey.900',
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
              </Typography>
              <Switch
                checked={mode === 'dark'}
                onChange={toggleMode}
                color="primary"
                edge="end"
              />
            </Box>

            {!isAuthenticated && (
              <RouterLink to="/login" style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    boxShadow: '0 4px 10px rgba(27, 94, 32, 0.25)',
                  }}
                >
                  Login
                </Button>
              </RouterLink>
            )}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
    </>
  );
};

export default Header;