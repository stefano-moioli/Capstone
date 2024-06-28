import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavbarMenu from './components/NavbarMenu';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NewProjectPage from './pages/NewProjectPage';

function App() {
  return (
    
    <AuthProvider>
    <BrowserRouter>

    <NavbarMenu />

    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path='/auth/register' element={<RegisterPage />} />
    <Route path='/auth/login' element={<LoginPage />} />
    <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path='/projects/new' element={<ProtectedRoute><NewProjectPage /></ProtectedRoute>} />
    </Routes>

    <Footer />

    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
