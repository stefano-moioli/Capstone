import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/navbar/NavbarMenu';
import Homepage from './pages/Homepage';
import GuestHomepage from './pages/GuestHomepage';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import { useAuth } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NewProjectPage from './pages/NewProjectPage';
import ProjectPage from './pages/ProjectPage';
import PublicProfilePage from './pages/PublicProfilePage';
import ProjectDetails from './pages/ProjectDetails';
import PersonalProfile from './pages/PersonalProfile';

function App() {
  const  {user}   = useAuth();
  
  return (
      <BrowserRouter>
        <NavbarMenu />
        <Routes>
          <Route path="/" element={user ? <Homepage /> : <GuestHomepage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/projects/new' element={<ProtectedRoute><NewProjectPage /></ProtectedRoute>} />
          <Route path='/projects/:id' element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route path='/user/:userId/projects' element={<ProtectedRoute><PublicProfilePage /></ProtectedRoute>} />
          <Route path='/project/:projectId' element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path='/profile/edit' element={<ProtectedRoute><PersonalProfile /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;