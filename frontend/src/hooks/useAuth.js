import { useMutation } from "@tanstack/react-query";
import {
  setToken,
  removeToken,
  setUserId,
  hasToken,
  setRole,
  removeUserId,
  removeRole,
  setAdminId,
  setStudentId,
  removeStudentId,
  removeAdminId,
} from "../services/jwt";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const loginUrl = `${API_URL}/api/auth/login`; // Dynamic endpoint based on role
      const { data } = await axios.post(loginUrl, { email, password });
      return data; // Expected to return a JWT token, userId & role
    },
    onSuccess: async (data) => {
      if (data.token) {
        setToken(data.token); // Store token securely
        setUserId(data.userId);
        setRole(data.role);

        data.adminId && setAdminId(data.adminId);
        data.studentId && setStudentId(data.studentId);

        // Navigate based on role
        const dashboardPath =
          data.role === "student" ? "/student/exam" : "/admin/dashboard";
        navigate(dashboardPath, { replace: true });
      } else {
        console.error("Login failed:", data.message);
      }
    },
    onError: (error) => {
      console.error(
        "Login failed:",
        error?.response?.data?.message || "Unknown error"
      );
    },
  });

  // Logout Function
  const logout = () => {
    removeToken(); // Remove token
    removeUserId();
    removeRole();
    removeStudentId();
    removeAdminId();

    if (hasToken()) {
      console.error("Failed to logout");
      return;
    }

    console.log("Logged out successfully");

    window.location.href = "/login";
  };

  // Check Authentication
  const isAuthenticated = () => !!hasToken();

  return {
    login: loginMutation.mutate,
    isPending: loginMutation.isPending,
    logout,
    isAuthenticated,
  };
};

export default useAuth;
