import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userLogin');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token in localStorage:', error);
      }
    }
  }, []);

  const login = (token) => {
    if (typeof token === 'string') {
      try {
        const decoded = jwtDecode(token);
        localStorage.setItem('userLogin', token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token during login:', error);
      }
    } else {
      console.error('Token is not a string:', token);
    }
  };

  const logout = () => {
    localStorage.removeItem('userLogin');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};