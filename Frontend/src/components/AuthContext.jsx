import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userLogin');
    if (token) {
      setUser(token); //Capire questo passaggio
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('userLogin', token);
    setUser(token);
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