import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Close,
  Add,
  Remove,
} from '@mui/icons-material';

// Sample product data
const productData = [
  {
    id: 1,
    name: "Plush Elephant",
    description: "Soft and cuddly elephant plush toy, perfect for animal lovers of all ages.",
    price: 24.99,
    image: "https://images.pexels.com/photos/1741206/pexels-photo-1741206.jpeg",
    category: "Toys",
    inStock: true,
    bestseller: true,
  },
  {
    id: 2,
    name: "Wildlife Field Guide",
    description: "Comprehensive guide to the animals in our zoo, with facts, photos, and conservation information.",
    price: 18.99,
    image: "https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg",
    category: "Books",
    inStock: true,
    bestseller: false,
  },
  {
    id: 3,
    name: "Eco-Friendly Water Bottle",
    description: "Stainless steel water bottle with our zoo logo. Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 29.99,
    image: "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg",
    category: "Accessories",
    inStock: true,
    bestseller: true,
  },
  {
    id: 4,
    name: "Animal Print T-Shirt",
    description: "Comfortable cotton t-shirt featuring our zoo's logo and animal silhouettes.",
    price: 22.99,
    image: "https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg",
    category: "Apparel",
    inStock: true,
    bestseller: false,
  },
  {
    id: 5,
    name: "Wildlife Photography Book",
    description: "Stunning collection of wildlife photographs taken by renowned nature photographers.",
    price: 39.99,
    image: "https://images.pexels.com/photos/3697742/pexels-photo-3697742.jpeg",
    category: "Books",
    inStock: true,
    bestseller: false,
  },
  {
    id: 6,
    name: "Lion Cub Adoption Kit",
    description: "Symbolic adoption kit including a certificate, photo, and plush toy. Supports our lion conservation program.",
    price: 45.99,
    image: "https://images.pexels.com/photos/2265247/pexels-photo-2265247.jpeg",
    category: "Conservation",
    inStock: true,
    bestseller: true,
  },
  {
    id: 7,
    name: "Zoo Souvenir Mug",
    description: "Ceramic mug featuring colorful illustrations of our most popular animals.",
    price: 14.99,
    image: "https://images.pexels.com/photos/1793034/pexels-photo-1793034.jpeg",
    category: "Accessories",
    inStock: true,
    bestseller: false,
  },
  {
    id: 8,
    name: "Rainforest Jigsaw Puzzle",
    description: "1000-piece puzzle featuring a vibrant rainforest scene with hidden animals to find.",
    price: 19.99,
    image: "https://images.pexels.com/photos/3988542/pexels-photo-3988542.jpeg",
    category: "Toys",
    inStock: false,
    bestseller: false,
  },
  {
    id: 9,
    name: "Safari Adventure Hat",
    description: "Durable wide-brim hat perfect for sunny days at the zoo. Features embroidered zoo logo.",
    price: 27.99,
    image: "https://images.pexels.com/photos/5816934/pexels-photo-5816934.jpeg",
    category: "Apparel",
    inStock: true,
    bestseller: false,
  },
  {
    id: 10,
    name: "Penguin Plush Backpack",
    description: "Adorable penguin-shaped backpack for kids, perfect for carrying zoo essentials.",
    price: 32.99,
    image: "https://images.pexels.com/photos/1262971/pexels-photo-1262971.jpeg",
    category: "Accessories",
    inStock: true,
    bestseller: true,
  },
  {
    id: 11,
    name: "Animal Kingdom Calendar",
    description: "12-month wall calendar featuring stunning wildlife photography from our zoo.",
    price: 15.99,
    image: "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg",
    category: "Accessories",
    inStock: true,
    bestseller: false,
  },
  {
    id: 12,
    name: "Tiger Conservation Kit",
    description: "Support our tiger conservation efforts with this kit including adoption certificate and tiger plush.",
    price: 49.99,
    image: "https://images.pexels.com/photos/162203/panthera-tigris-altaica-tiger-siberian-amurtiger-162203.jpeg",
    category: "Conservation",
    inStock: true,
    bestseller: true,
  },
  {
    id: 13,
    name: "Zoo Animal Sticker Set",
    description: "Set of 50 high-quality vinyl stickers featuring various zoo animals.",
    price: 8.99,
    image: "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg",
    category: "Toys",
    inStock: true,
    bestseller: false,
  },
  {
    id: 14,
    name: "Wildlife Documentary DVD",
    description: "Exclusive documentary featuring behind-the-scenes footage of our zoo's conservation efforts.",
    price: 19.99,
    image: "https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg",
    category: "Books",
    inStock: true,
    bestseller: false,
  },
  {
    id: 15,
    name: "Zoo Adventure Kids' Hoodie",
    description: "Cozy hoodie with playful animal prints, perfect for young zoo enthusiasts.",
    price: 34.99,
    image: "https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg",
    category: "Apparel",
    inStock: true,
    bestseller: true,
  },
  {
    id: 16,
    name: "Animal Track Guide",
    description: "Educational guide to identifying animal tracks and signs in the wild.",
    price: 12.99,
    image: "https://images.pexels.com/photos/6913125/pexels-photo-6913125.jpeg",
    category: "Books",
    inStock: true,
    bestseller: false,
  }
];

// Product categories
const categories = ["All", "Toys", "Books", "Accessories", "Apparel", "Conservation"];

// Cart item type
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const ShopPage = () => {
  const theme = useTheme();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  
  // Handle category change
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setPage(1); // Reset to first page when category changes
  };
  
  // Handle sort change
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    setPage(1); // Reset to first page when sorting changes
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page when search changes
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top of the products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Add to cart
  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { 
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }]);
    }
  };
  
  // Update cart item quantity
  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };
  
  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  // Calculate cart total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Filter and sort products
  const filteredProducts = productData
    .filter(product => 
      (category === 'All' || product.category === category) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      } else if (sortBy === 'priceLow') {
        return a.price - b.price;
      } else if (sortBy === 'priceHigh') {
        return b.price - a.price;
      }
      return 0;
    });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Zoo Shop
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Browse our collection of souvenirs, apparel, books, and gifts. Every purchase helps support our conservation efforts.
        </Typography>
        
        {/* Filters and Search */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={5}>
              <TextField
                fullWidth
                placeholder="Search products..."
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
            
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="priceLow">Price: Low to High</MenuItem>
                  <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Badge badgeContent={getCartCount()} color="primary">
                <IconButton 
                  color="primary" 
                  onClick={() => setCartOpen(true)}
                  size="large"
                >
                  <ShoppingCart />
                </IconButton>
              </Badge>
            </Grid>
          </Grid>
        </Box>
        
        {/* Products */}
        <Grid container spacing={3}>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', height: 240 }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        p: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
                      }}
                    >
                    {product.bestseller && (
                      <Chip
                        label="Bestseller"
                        color="secondary"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 600,
                        }}
                      />
                    )}
                    {!product.inStock && (
                      <Chip
                        label="Out of Stock"
                        color="error"
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 600,
                        }}
                      />
                    )}
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="subtitle1" component="h2" gutterBottom fontWeight={600}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary.main" fontWeight={700}>
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Chip 
                        label={product.category} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      color="primary"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search or filter settings.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
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
        
        {/* Shopping Cart Drawer */}
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Box
            sx={{ width: { xs: '100vw', sm: 400 }, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
            role="presentation"
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Shopping Cart ({getCartCount()} items)
              </Typography>
              <IconButton onClick={() => setCartOpen(false)}>
                <Close />
              </IconButton>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {cart.length > 0 ? (
              <>
                <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                  {cart.map((item) => (
                    <Box key={item.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
                            <Close />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar 
                            src={item.image} 
                            variant="rounded" 
                            sx={{ width: 60, height: 60, mr: 1 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={
                            <Box component="span">
                              <Typography component="span" variant="body2">
                                ${item.price.toFixed(2)}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <IconButton 
                                  size="small" 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Remove fontSize="small" />
                                </IconButton>
                                <Typography variant="body2" sx={{ mx: 1 }}>
                                  {item.quantity}
                                </Typography>
                                <IconButton 
                                  size="small" 
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Add fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1">Subtotal:</Typography>
                    <Typography variant="subtitle1" fontWeight={700}>
                      ${calculateTotal().toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Checkout
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 1 }}
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" gutterBottom>
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Add some products to see them here.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </Box>
            )}
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default ShopPage;