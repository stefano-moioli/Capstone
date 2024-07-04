import React, { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('userLogin');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        setUser(decoded);

        const fetchFollowingUsers = async () => {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`
              }
            };
            const response = await axios.get('http://localhost:3005/following', config);
            setFollowingUsers(response.data);
          } catch (error) {
            console.error('Error fetching following users:', error);
          }
        };

        fetchFollowingUsers();
      } catch (error) {
        console.error('Invalid token in localStorage:', error);
      }
    }
  }, []);

  const login = (token) => {
    if (typeof token === 'string') {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token2:", decoded);
        localStorage.setItem('userLogin', token);
        setUser(decoded);

        const fetchFollowingUsers = async () => {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`
              }
            };
            const response = await axios.get('http://localhost:3005/following', config);
            setFollowingUsers(response.data);
          } catch (error) {
            console.error('Error fetching following users:', error);
          }
        };

        fetchFollowingUsers();
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
    setFollowingUsers([]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, followingUsers, setUser, setFollowingUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
