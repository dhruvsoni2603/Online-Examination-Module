import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { setToken, removeToken } from '../services/jwt';
import axios from 'axios';

const useAuth = () => {
  const [user, setUser] = useState(null);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password, role }) => {
      const { data } = await axios.post('/api/auth/login', { email, password, role });
      return data; // Expected to return a JWT token
    },
    onSuccess: (data) => {
      setToken(data.token); // Store token securely in cookies
      setUser(data.user); // Set user details if available
    },
    onError: (error) => {
      console.error('Login failed:', error.response.data.message);
    },
  });

  // Logout Function
  const logout = () => {
    removeToken(); // Remove JWT token from cookies
    setUser(null); // Clear user state
  };

  // Check if user is authenticated
  const isAuthenticated = () => !!setToken();

  return {
    user,
    login: loginMutation.mutate,
    isLoading: loginMutation.isLoading,
    logout,
    isAuthenticated,
  };
};

export default useAuth;
