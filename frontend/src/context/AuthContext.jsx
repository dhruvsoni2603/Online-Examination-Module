/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { getToken } from '../services/jwt';
import useAuth from '../hooks/useAuth';

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { login, logout, isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user authentication on initial load
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Fetch user details using token, if needed
      setUser({ token }); // Replace this with an API call if user details are required
    }
    setLoading(false);
  }, []);

  const contextValue = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
