import { CssBaseline } from '@mui/material';
import { useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AnimalDirectoryPage from './pages/AnimalDirectoryPage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import ZooMapPage from './pages/ZooMapPage';
import ConservationPage from './pages/ConservationPage';
import VisitorInfoPage from './pages/VisitorInfoPage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { theme } = useTheme();
  const { isInitialized } = useAuth();
  
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="animals" element={<AnimalDirectoryPage />} />
          <Route path="animals/:id" element={<AnimalDetailPage />} />
          <Route path="map" element={<ZooMapPage />} />
          <Route path="conservation" element={<ConservationPage />} />
          <Route path="visit" element={<VisitorInfoPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;